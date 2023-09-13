// database.js
const mysql = require("mysql");

class database {
  constructor() {
    this.host = "localhost";
    this.user = "root";
    this.password = "root";
    this.database = "lifeserver";

    // // this.host = "sql107.infinityfree.com";
    // this.host = "192.168.219.247";
    // this.user = "if0_35023243";
    // this.password = "wmQYLUnlxQ7kaf";
    // this.database = "if0_35023243_lifeserver";

    this.connection = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
    });
  }

  connectDatabase(fileName) {
    this.connection.connect((err) => {
      if (err) {
        console.log(fileName + " error database connection");
        console.log(err);
      } else {
        console.log(fileName + " connected");
      }
    });
  }
}

module.exports = database; // Export the database class
