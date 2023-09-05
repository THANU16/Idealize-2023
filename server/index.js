var http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const user = require("./components/user");
const login = require("./Authentication/login");
const hospital = require("./components/hospital");
const driver = require("./components/driver");
const ambulance = require("./components/Ambulance");

server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");
});

// Set up body parsing middleware
app.use(express.json());

app.use("/user", user);
app.use("/login", login);
app.use("/hospital", hospital);
app.use("/driver", driver);
app.use("/ambulance", ambulance);

app.listen(8000, () => {
  console.log("Listen port 8000");
});
