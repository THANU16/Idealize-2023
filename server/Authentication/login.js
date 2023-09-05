// const express = require("express");
// const bcrypt = require("bcrypt");
// const generateSessionToken = require("./generateSessionToken");
// const { database } = require("../utils/databaseUtils"); // Import the database class

// const databaseObj = new database();

// const router = express.Router();

// const connection = databaseObj.connection;

// router.post("/", (req, res) => {
//   body = req.body;
//   const password = body.password;

//   // check the employee already exist or not
//   const getQuery =
//     "select employee_id, password, type_id from accountmanagement.employees where nic = ? ;";

//   connection.query(getQuery, [body.nic], (err, result) => {
//     if (err) {
//       res.send({
//         sucess: false,
//         isExist: false,
//         error: err,
//         result: null,
//       });
//     } else {
//       if (result.length == 0) {
//         res.send({
//           sucess: false,
//           isExist: false,
//           error: null,
//           result: result,
//         });
//       } else {
//         const employee_id = result[0].employee_id;
//         const hash = result[0].password;

//         bcrypt.compare(password, hash, function (err, result) {
//           if (result) {
//             // password is valid
//             // create the session token
//             const sessionToken = generateSessionToken(employee_id);
//             res.send({
//               sucess: true,
//               isExist: true,
//               error: null,
//               result: result,
//               sessionToken: sessionToken,
//             });
//           } else {
//             res.send({
//               sucess: false,
//               isExist: true,
//               error: null,
//               result: result,
//             });
//           }
//         });
//       }
//     }
//   });
// });

// module.exports = router;
