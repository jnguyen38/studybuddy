const mysql = require('mysql')
const db = mysql.createConnection({
host: "localhost",
user: "bmackey",
password: "pwpwpwpw",
database:"bmackey"
})

module.exports = db;
