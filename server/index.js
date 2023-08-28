var http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const employee = require('./routerComponent/pages/employee');


server = http.createServer ((req, res)=> {
  res.setHeader('Content-Type', 'text/plain');
})

// Set up body parsing middleware
app.use(express.json());

app.use('/employee', employee);


app.listen(6000, () => {
    console.log("Listen port 6000");
  });

  