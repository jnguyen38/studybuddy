const mysql = require('mysql')
const db = mysql.createConnection({
host: "localhost",
user: "bitnami",
password: "password",
database:"studybuddy"
})

module.exports = db;
