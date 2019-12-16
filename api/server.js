const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);
const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");

const server = express();

const sessionStorage = {
  name: "thecookie",
  secret: "cookiesaregoodtoeat",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, //true in production
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false, //GDPR laws against setting. customer had to accept the cookies

  store: new knexSessionStore({
    knex: require("../database/dbConfig.js"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionStorage));

server.use("/api/auth", authRouter);
server.use("/api/jokes", authenticate, jokesRouter);

module.exports = server;
