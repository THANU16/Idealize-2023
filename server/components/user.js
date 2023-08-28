const express = require("express");
const database = require("../components/database");
const bcrypt = require("bcrypt");
const decodedUserId = require("../Authentication/decodedToken");


const router = express.Router();
const database = new database();

database.connectDatabase("Login");
const connection = database.connection;

router.post("/add", (req, res) => {
    body = req.body;
    const password = body.password;
  
    // check the employee already exist or not
    const checkQuery =
      "select * from accountmanagement.employees where nic = ? ;";
  
    // type id is the forigen key so we set the forigen key correctly
    const insertQuery =
      "insert into accountmanagement.employees (employee_name, address, mobile, email, nic, type_id, dob, password) values(?,?,?,?,?,?,?,?);";
  
    connection.query(checkQuery, [body.nic], (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          sucess: false,
          isExist: false,
          error: err,
          result : null
        });
      } else {
        if (result.length > 0) {
          res.send({
            sucess: false,
            isExist: true,
            error: null,
            result : result
          });
        } else {
          // encrpt the user pasword
          bcrypt.hash(password, 10, function (err, hash) {
            // store hash in the database
            connection.query(
              insertQuery,
              [
                body.employee_name,
                body.address,
                body.mobile,
                body.email,
                body.nic,
                body.type_id,
                body.dob,
                hash,
              ],
              (err, result) => {
                if (err) {
                  res.send({
                    sucess: false,
                    isExist: false,
                    error: err,
                    result : null
                  });
                } else {
                  res.send({
                    sucess: true,
                    isExist: false,
                    error: null,
                    result: result
                  });
                }
              }
            );
          });
        }
      }
    });
  });