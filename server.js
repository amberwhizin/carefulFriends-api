const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");

const app = express();
const router = express.Router();
const db = mongoose.connection;

const PORT = process.env.PORT || 5000;

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/" + "carefulfriends";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));
mongoose.connection.once("open", () => {
  console.log("connected to mongoose!");
});

db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

db.on("open", () => {});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
//or this....
// app.use("/", express.static(path.join(__dirname, "/client/build")));

// for heroku???
// app.use('/', router.get('/', function(req, res, next) {
//   res.sendFile(path.join(__dirname, './index.html'))
// }))

let baseURL;
// come back - back end not getting hit in heroku environment
if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:5000";
} else {
  baseURL = "https://carefulfriends-api.herokuapp.com";
}

console.log("current base URL:", baseURL);

// CONTROLLERS
// main
const activityController = require("./controllers/activities_controller");
app.use("/activities", activityController);

const signupController = require("./controllers/signup_controller");
const loginController = require("./controllers/login_controller");

app.use("/signup", signupController);
app.use("/login", loginController);

app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
