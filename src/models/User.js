const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password cannot contain 'password' as a password");
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    }
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner"
});

// Hiding private data like password and tokens from users to display
UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// custome function created for accessing this function through instances
UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "jwtsecret", {
    expiresIn: 7200
  });

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// custome function created for accessing this function through model
UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    return new Error("Incorrect Credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Incorrect Credentials");
  }

  return user;
};

// middleware for hashing password
UserSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

module.exports = User = mongoose.model("User", UserSchema);
