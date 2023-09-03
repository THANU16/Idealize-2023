const express = require("express");
const bcrypt = require("bcrypt");
const decodedUserId = require("../Authentication/decodedToken");
const database = require("../utils/databaseUtils");

const databaseObj = new database();
const router = express.Router();

databaseObj.connectDatabase("Hospital");

const connection = database.connection;

router.post("/add", (req, res) => {
  body = req.body;
  const password = body.password;

  // check the employee already exist or not
  const checkQuery = "select * from lifeserver.hospital where email = ? ;";

  // type id is the forigen key so we set the forigen key correctly
  const insertQuery =
    "insert into lifeserver.hospital (name, location, type, noOfAmbulance, website, email, password, contactNumber) values(?,?,?,?,?,?,?,?);";

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
        // encrpt the user pasword
        bcrypt.hash(password, 10, function (err, hash) {
          // store hash in the database
          connection.query(
            insertQuery,
            [
              body.name,
              body.location,
              body.type,
              body.noOfAmbulance,
              body.website,
              body.email,
              hash,
              contactNumber,
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
        });
      }
    }
  });
});


router.post('/showDetail', (req, res) => {
  const body = req.body;
  const sessionToken = req.headers.authorization.replace("key ");

  const hospitalID = decodedUserId(sessionToken);
  
  const getQuery = "select * from lifeserver.hospital where hospitalID = ?;"

  connection.query(getQuery, hospitalID, (err, result) => {
    if (err){
      res.send({
        sucess: false,
        isExist: false,
        error: err,
        result: null
      })
    } else{
      if (result.length > 0){
        res.send({
          sucess: true,
          isExist: true,
          error: null,
          result: result
        })
      }
      else{
        res.send({
          sucess: false,
          isExist: false,
          error: null,
          result: result
        })
      }
    }
  })
});



router.post('/showAllDrivers', (req, res) => {
  const body = req.body;
  const sessionToken = req.headers.authorization.replace("key ");

  const hospitalID = decodedUserId(sessionToken);
  
  const getQuery = "select * from lifeserver.driver where hospitalID = ?;"

  connection.query(getQuery, hospitalID, (err, result) => {
    if (err){
      res.send({
        sucess: false,
        isExist: false,
        error: err,
        result: null
      })
    } else{
      if (result.length > 0){
        res.send({
          sucess: true,
          isExist: true,
          error: null,
          result: result
        })
      }
      else{
        res.send({
          sucess: false,
          isExist: false,
          error: null,
          result: result
        })
      }
    }
  })
});




router.post('/showAllDrivers', (req, res) => {
  const body = req.body;
  const sessionToken = req.headers.authorization.replace("key ");

  const hospitalID = decodedUserId(sessionToken);
  
  const getQuery = "select * from lifeserver.ambulance where hospitalID = ?;"

  connection.query(getQuery, hospitalID, (err, result) => {
    if (err){
      res.send({
        sucess: false,
        isExist: false,
        error: err,
        result: null
      })
    } else{
      if (result.length > 0){
        res.send({
          sucess: true,
          isExist: true,
          error: null,
          result: result
        })
      }
      else{
        res.send({
          sucess: false,
          isExist: false,
          error: null,
          result: result
        })
      }
    }
  })
});


module.exports = router;
