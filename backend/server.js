import express from 'express';
const app = express();

import cors from 'cors';

import pg from 'pg';
const { Pool } = pg;

import dotenv from 'dotenv';
dotenv.config();

// const dbString = process.env.DATABASE_URL;
const PORT = process.env.PORT;

const client = new Pool ({
    // connectionString: dbString
    host: 'localhost',
    user: 'mduke978',
    password: process.env.PG_PASSWORD,
    port: '5432',
    database: 'migrainelog_db'
});

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.get('/entries', async (req, res) => {
    try {
        const results = await client.query('SELECT * FROM entries');
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Could not connect to database');
    }
});

app.get("/entries/:id", async (req, res) => {
    let id = req.params.id;
    try {
        const results = await client.query('SELECT * FROM entries WHERE entry_id = $1', [id]);
        if (!results.rows) {
            res.status(404).send('No entry data found');
        }
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Could not connect to database');
    }
});

app.post("/entries", async (req, res) => {
    const entrybody = req.body;
    try {
        const { date, severity, location, trigger, treatment_method, relief } = entrybody;
        const results = await client.query('INSERT INTO entries (date, severity, location, trigger, treatment_method, relief) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [date, severity, location, trigger, treatment_method, relief]);

        res.status(201).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error inserting entry into database');
    }
});

app.put("/entries/:id", async (req, res) => { 
    const id = req.params.id;
    const { date, severity, location, trigger, treatment_method, relief } = req.body;
    try {
        const results = await client.query(`UPDATE entries SET date = $1, severity = $2, location = $3, trigger = $4, treatment_method = $5, relief = $6 WHERE entry_id = $7 RETURNING *`, [date, severity, location, trigger, treatment_method, relief, id]);
        if (results.rowCount === 0) {
            res.status(404).send('Entry not found');
        }
        res.status(200).json(results.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).send('Could not connect to database');
    } 
  });

  app.delete("/entries/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const results = await client.query('DELETE FROM entries WHERE entry_id = ($1) RETURNING *', [id]);
        if (!results.rows) {
            res.status(404).send('No entry data found');
        }
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Could not connect to database');
    }
  });

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
});