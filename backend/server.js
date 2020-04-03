var request = require("request"); // "Request" library
var cors = require("cors");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");

const express = require("express");
const authRouter = require("./auth/authRouter");

const server = express();

const corsOptions = {
  origin: [
    "https://didioverpay.com",
    "http://localhost:3000/",
    "http://localhost:8888"
  ],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,ETag"
};

server.use(cors());
server.use(express.json());
server.use(express.static(__dirname + "/public"));

server.use(cookieParser());
server.use("/auth", authRouter);
server.get("/", (req, res) => {
  res.send(`<h2>Spotify suggester API</h2>`);
});

module.exports = server;
