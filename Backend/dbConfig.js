const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "xhr_crud",

});

db.connect((err) => {
    if(err) return console.log({DATABASE:"ERROR : " + err})
    console.log({DATABASE:"connected successfuly ...".toUpperCase()})
});

module.exports = db;
