const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;

const PORT = process.env.PORT || 5000;

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/" + "carefulfriends";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

db.on("open", () => {});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
