const express = require("express");
const bcrypt = require("bcrypt");
const decodedUserId = require("../Authentication/decodedToken");
const database = require("../utils/databaseUtils");

const databaseObj = new database();
const router = express.Router();

databaseObj.connectDatabase("Ambulance");

const connection = database.connection;

router.post("/add", (req, res) => {
  body = req.body;
  const password = body.password;

  // check the employee already exist or not
  const checkQuery = "select * from lifeserver.ambulance where Email = ? ;";

  // type id is the forigen key so we set the forigen key correctly
  const insertQuery =
    "insert into lifeserver.ambulance (Ambulance_Number, Hospital_ID, Ambulance_Location, Is_Available) values(?,?,?,?);";

  connection.query(checkQuery, [body.Email], (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        sucess: false,
        isExist: false,
        error: err,
        result: null,
      });
    } else {
      if (result.length > 0) {
        res.send({
          sucess: false,
          isExist: true,
          error: null,
          result: result,
        });
      } else {
        connection.query(
          insertQuery,
          [
            body.Ambulance_Number,
            body.Hospital_ID,
            body.Ambulance_Location,
            body.Is_Available,
          ],
          (err, result) => {
            if (err) {
              res.send({
                sucess: false,
                isExist: false,
                error: err,
                result: null,
              });
            } else {
              res.send({
                sucess: true,
                isExist: false,
                error: null,
                result: result,
              });
            }
          }
        );
      }
    }
  });
});

router.post("/showDetail", (req, res) => {
  const body = req.body;
  const sessionToken = req.headers.authorization.replace("key ");

  const ambulanceID = decodedUserId(sessionToken);

  const getQuery = "select * from lifeserver.ambulance where ambulanceID = ?;";

  connection.query(getQuery, ambulanceID, (err, result) => {
    if (err) {
      res.send({
        sucess: false,
        isExist: false,
        error: err,
        result: null,
      });
    } else {
      if (result.length > 0) {
        res.send({
          sucess: true,
          isExist: true,
          error: null,
          result: result,
        });
      } else {
        res.send({
          sucess: false,
          isExist: false,
          error: null,
          result: result,
        });
      }
    }
  });
});

module.exports = router;
