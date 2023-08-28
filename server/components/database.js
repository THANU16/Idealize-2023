const mysql = require("mysql");

class database {
  constructor() {
    this.host = "localhost";
    this.user = "root";
    this.password = "root";
    this.database = "accountmanagement";

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

module.exports = database;
