const mysql = require('mysql')
const db = mysql.createConnection({
host: "localhost",
user: "jnguyen5",
password: "pwpwpwpw",
database:"jnguyen5"
})

module.exports = db;
