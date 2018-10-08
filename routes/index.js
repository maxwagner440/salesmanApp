var express = require('express');
var app = express();
var router = express.Router();
const { Pool, Client } = require('pg')
var path = require('path');
const db = require('../models/database')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'salesman',
  password: 'Mw0395631',
  port: 5432,
})


/* GET home page. */
router.get('/', function (req, res, next) {
  //db.getCustomerByName
  //db.findUserByUserId()
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

router.post('/home', function (req, res) {
  var username = req.body.username
  var password = req.body.password
  var login = pool.query("SELECT * FROM users").then(function (res, err) {
    if (username == res.rows[0].username && password == res.rows[0].password) {
      return "right";
    }
    else {
      return "wrong"
    }
    pool.end();
  })
  login.then(function (res) {
    console.log(res)
  })
  res.sendFile(path.join(__dirname + '/views/custManage.html'))
});


router.get('/custManage', function (req, res, next) {
  res.sendFile(path.join(__dirname + '/views/custManage.html'));
})

router.post('/custManageUser', function (req, res) {
  var input = {
    name: req.body.custName,
    email: req.body.custEmail,
    number : req.body.custNumber,
    streetOne : req.body.custStreetOne,
    streetTwo : req.body.custStreetTwo,
    city : req.body.custCity,
    state : req.body.custState,
    zip : req.body.custZip,
    country : req.body.custCountry
    }
    db.saveCustInfo(input)
    res.sendFile(path.join(__dirname + '/views/custManage.html'));
  })



  router.post('/custManageAddr', function (req, res) {
    console.log(req.body)

  });
  router.post('/custManageNotes', function (req, res) {
    console.log(req.body)

  });








  //API//


router.get('/api/custData', function(req, res){
  //var allCustSelect = "SELECT * FROM customers" // WHERE user_num = " + userNum;
  var getAll = db.getAllCustomers().then(
    function(data){
      res.send(data)        
    }
  )
});

router.get("/api/getInvidualCust", function(req,res){
  var indName = req.query.parm1;
  var getCUstomerX = db.getIndCustomer(indName).then(
    function(data){
      res.send(data)        
    }
  )
})


router.post("/api/adjustCust", function(req,res){
  var indName = req.body.adjustName;
  var indNumber = req.body.adjustNumber;
  var indEmail = req.body.adjustEmail;
  var rs = req.body.rs;
  
   var adjustCustomer = db.AdjustCustomerPost(indName, indNumber, indEmail, rs).then(
    function(data){
      return res.sendFile(path.join(__dirname + '/views/custManage.html')); 
    }
  ) 
})

router.get("/api/searchCust", function(req,res){
  name = req.query.parm1
   db.searchAllCustomers(name).then(
    function(data){
      res.send(data)
    }
  )
})

  module.exports = router;
