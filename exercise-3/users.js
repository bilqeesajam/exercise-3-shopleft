const express = require("express");
const app = express();
const port = 3000;


const db = require('./db');

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).send('Errr fetching users');
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`View users at http://localhost:${port}/users`);
});