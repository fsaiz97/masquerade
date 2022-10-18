const express = require("express");
const cors = require("cors");

const logRoute = require("./route-logger");
const db = require("./db");

const app = express();

function setupMiddleware(app) {
    app.use(express.json());
    app.use(cors());
    app.use(logRoute);
}

function addRoutes(app) {
    app.get("/", (req, res) => res.send("Welcome to the Masquerade API: We track wizards!"));
}

setupMiddleware(app);
addRoutes(app);

module.exports = app;
