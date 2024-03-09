// Importing of express
const express = require("express");

// Import cors
const cors = require("cors");

// Import db configuration
const { connectDB } = require("./application/config/dbConfig");

// Import routes
const routes = require("./application/routes/routes");

// starting express server
const app = express();

// Enable CORS for all routes
app.use(cors());

// creating a port variable
const myPort = 3000;

// Connecting to database
const dbRunner = async () => {
  await connectDB()
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));
};

dbRunner();

// make express use json
app.use(express.json());

// make express url encoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

// make express usethe route
app.use(routes);

// start the port
app.listen(myPort, () => {
  console.log("server is listening to port 3000");
});
