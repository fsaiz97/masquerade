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

    app.get("/wizard", async (req, res) => {
        try {
            const data = await db.query("SELECT * FROM wizard");
            res.status(200).send(data.rows);
        } catch (err) {
            res.status(400).send({err: err})
        }
    })

    app.get("/wizard/:id", async (req, res) => {
        const id = parseInt(req.params.id);

        try {
            const data = await db.query("SELECT * FROM wizard WHERE id = $1", [id]);
            res.status(200).send(data.rows[0]);
        } catch (err) {
            res.status(404).send({err: err})
        }
    })

    app.get("/location", async (req, res) => {
        try {
            const data = await db.query("SELECT * FROM location")
            res.status(200).send(data.rows);

        } catch (err) {
            res.status(400).send({err: err});
        }
    });
    
    app.get("/location/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const data = await db.query("SELECT * FROM location WHERE id = $1", [id]);
            res.status(200).send(data.rows[0]);
            
        } catch (err) {
            res.status(404).send({err: err});
        }
    });
    
    app.get("/incident", async (req, res) => {
        try {
            const data = await db.query("SELECT * FROM incident");
            res.status(200).send(data.rows);
        } catch (err) {
            res.status(400).send({err: err})
        }
    })

    app.get("/incident/:id", async (req, res) => {
        const id = parseInt(req.params.id);

        try {
            const data = await db.query("SELECT * FROM incident WHERE id = $1", [id]);
            res.status(200).send(data.rows[0]);
        } catch (err) {
            res.status(404).send({err: err})
        }
    })

    // Post a new entity
    app.post("/wizard", async (req, res) => {
        // req.body = { name, age, power, location_id, weapon }
        try {
            const name = req.body.name;
            const age = parseInt(req.body.age);
            const power = req.body.power;
            const location_id = parseInt(req.body.location_id);
            const weapon = req.body.weapon;

            const logIncident = await db.query(
                `INSERT INTO wizard (name, age, power, location_id, weapon)
                VALUES ($1, $2, $3, $4, $5)`, [name, age, power, location_id, weapon])
            
            res.status(200).send(`Wizard ${name} created`);
            
        } catch (err) {
            res.status(400).send({err: err})
        }
    });

    // Post a new location

    // Log an incident with a specific time, severity level, and description
    app.post("/incident-log", async (req, res) => {
        // req.body = { time, severity_level, description }

        try {
            const logIncident = await db.query(
                `INSERT INTO incident (time, severity_level, description)
                VALUES ($1, $2, $3)`, [time, severity_level, description]
                )

        } catch (err) {
            res.status(400).send({err:err});
        }
    });
    
}

setupMiddleware(app);
addRoutes(app);

module.exports = app;
