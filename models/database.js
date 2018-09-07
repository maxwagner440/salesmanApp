const { Pool, Client } = require('pg')


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'salesman',
  password: 'Mw0395631',
  port: 5432,
})

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'salesman',
  password: 'Mw0395631',
  port: 5432,
})




function usernameGet(value) {
  // return new Promise(function(resolve, reject) {
  value = 'maxwagner440'
  pool.query("SELECT username FROM users", function (res, err) {
    return res;
    pool.end();
  })
  //})  
}





var username2 = pool.connect()
  .then(client => {
    return client.query('SELECT * FROM users')
      .then(res => {
        client.release()
        // console.log(res.rows[0].username)
      })
      .catch(e => {
        client.release()
        console.log(err.stack)
      })
  })


var getCustomerByName = pool.connect()
  .then(client => {
    name = "Max Wagner"
    sql = "SELECT * FROM customers WHERE cust_name = $1"
    return client.query(sql, [name])
      .then(res => {
        client.release()
        // console.log(res.rows[0])
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })


function query(sql, params, cb) {
  pg.connect(function (err, client, done) {
    if (err) {
      done(); // release client back to pool
      cb(err);
      return;
    }
    sql = 'SELECT * FROM customers'
    client.query(sql, params, cb).then(function (res) {
      console.log(res.rows[0])
    })
  });
}

function saveCustInfo(input) {

  if (input.custName != '' && input.custEmail != '' && input.custNumber != '') {
    var addrInsert = "INSERT INTO address (street_line_one, street_line_two, city, state, zip, country, create_date) VALUES($1, $2, $3, $4, $5, $6, $7)"
    var addrInsertArr = [input.streetOne, input.streetTwo, input.city, input.state, input.zip, input.country, "NOW()"]

    var saveAddress = pool.query(addrInsert, addrInsertArr
    ).then(function (res, err) {
      return pool.query(
        "SELECT addrkey FROM address WHERE street_line_one = $1 AND city = $2 AND state = $3 ORDER BY addrkey DESC", [input.streetOne, input.city, input.state]
      )
      pool.end();
    })

    saveAddress.then(function (data) {
      var addrkey = data.rows[0].addrkey
      var custInsert = "INSERT INTO customers (cust_name, cust_phone, cust_email, custAddrKey, create_date) VALUES($1, $2, $3, $4, $5)"
      var custInsertArr = [input.name, input.number, input.email, addrkey, "NOW()"]
      return pool.query(custInsert, custInsertArr)
    })
  }
}



function getAllCustomers(){
  var allCustSelect = " SELECT cust_name, cust_phone, cust_email, rs, a.street_line_one, "+
  "a.street_line_two, a.city, a.state, a.zip, a.country FROM customers c LEFT OUTER JOIN address a ON a.addrKey = c.custAddrKey" // WHERE user_num = " + userNum;
  return pool.query(allCustSelect)
  .then(function (res, err) {
    return res.rows
    pool.end();
  }) 
}

function searchAllCustomers(name, email){
  var allCustSelect = " SELECT cust_name, cust_phone, cust_email, rs, a.street_line_one, "
  + "a.street_line_two, a.city, a.state, a.zip, a.country FROM customers c LEFT OUTER JOIN address a ON a.addrKey = c.custAddrKey "
  + "WHERE UPPER(c.cust_name) LIKE UPPER( $1 ) OR UPPER(c.cust_email) LIKE UPPER( $1 ) ";
  name = "%" + name + "%";
  email = "%" + email + "%";
  var parms = [name];
  console.log(parms)
  console.log(allCustSelect)
  return pool.query(allCustSelect, parms)
  .then(function (res, err) {
    return res.rows
    pool.end();
  }) 
}

function getIndCustomer(theName){
  var custSelect = "SELECT * FROM customers WHERE cust_name = $1" // WHERE user_num = " + userNum;
  var parms = [theName]
    return pool.query(custSelect, parms)
    .then(function (res, err) {
      return res.rows
      pool.end();
    }) 
}

function AdjustCustomerPost(name, number, email, rs){
  var custSelect = "UPDATE customers SET cust_name = $1, cust_phone = $2, cust_email = $3 WHERE rs = $4" // WHERE user_num = " + userNum;
  var parms = [name, number, email, rs]
    return pool.query(custSelect, parms)
    
}

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}

module.exports.getIndCustomer = getIndCustomer
module.exports.AdjustCustomerPost= AdjustCustomerPost
module.exports.getAllCustomers = getAllCustomers
module.exports.saveCustInfo = saveCustInfo
module.exports.searchAllCustomers = searchAllCustomers





