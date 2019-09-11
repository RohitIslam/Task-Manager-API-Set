const app = require("./app");

//start server at port 5000
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
