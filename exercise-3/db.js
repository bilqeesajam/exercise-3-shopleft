const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Re367@mnh8422007',
    database: 'shopleft_database'
});

conn.connect((err) => {
    if (err) throw err;
    // console.log('Connected to MySQL Database');
});

module.exports = conn;
