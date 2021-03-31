var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "sqluser2",
  password: "sqluserPW1@",
  database: "yelp"
});

/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var createTable = "CREATE TABLE IF NOT EXISTS rating (ratee VARCHAR(256), stars TINYINT, comment VARCHAR(1024));";
  con.query(createTable, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});*/

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var createTable = "CREATE TABLE IF NOT EXISTS memeShop (url VARCHAR(1024));";
  con.query(createTable, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
/*
function resultRowToHtml(ratee, stars, comment, spanId) {
  return "<span id=\"span-" + spanId + "\">Ratee: " + ratee + "<br>Stars: " + stars + "<br>Comment:" + comment + "</span><br>";
}*/

function resultRowToHtml(url) {
  //return "<span id=\"span-" + spanId + "\">Ratee: " + ratee + "<br>Stars: " + stars + "<br>Comment:" + comment + "</span><br>";
  return "<img src = '" + url + "'/>"
}

/*async function getAllRatings() {
  return new Promise(function(resolve, reject) {
    con.query("SELECT ratee, stars, comment FROM rating;", 
    function(err, result, fields) {
      if (err) return reject(err);

      var html = "";

      for(var n=0; n < result.lenght; n++) {
        html += resultToHtml(result[n].ratee, result[n].stars, result[n].comment, n); //resultRowToHtml        
      }

      console.log("Result inside getAllRatings: " + html);

      resolve(html);
    });
  });
}*/
/*
async function getRatingsAsHtml () {
  return new Promise(function (resolve, reject) {
  con.query("SELECT ratee, stars, comment FROM rating;", 
  function (err, result, fields) {
  if (err) return reject(err);
  
  var html = "";
  
  for(var n=0; n < result.length; n++) {
  html += resultRowToHtml(result[n].ratee, result[n].stars, result[n].comment, n);
  }
  
  console.log("Result inside DAO: " + html);
  
  resolve(html);
  });
  });
 }*/

 async function getMemesAsHtml () {
  return new Promise(function (resolve, reject) {
  con.query("SELECT url FROM memeShop;", 
  function (err, result, fields) {
  if (err) return reject(err);
  
  var html = "";
  
  var theNumber = Math.floor(Math.random() * result.length);
  //for(var n=0; n < result.length; n++) {
  //html += resultRowToHtml(result[n].url);
  //}

  html = resultRowToHtml(result[theNumber].url);
  
  console.log("Result inside DAO: " + html);
  
  resolve(html);
  });
  });
 }

module.exports = {
  getMemesAsHtml: getMemesAsHtml,
  //getAllRatings: getAllRatings,

  deleteRating: function (ratee, stars, comment) {
    //TODO
    con.query("DELETE FROM rating WHERE ratee=" + con.escape(ratee) + " AND stars=" + con.escape(stars) + " And comment=" + con.escape(comment), 
    function (err, result) {
        if (err) throw err;
        console.log("Deleted: " + result);
    });   
  },
  
  /*getAllRatings: async function() {
    return new Promise(function(resolve, reject) {

      con.query("SELECT ratee, stars, comment FROM rating;", 
      function(err, result, fields) {
        if (err) reject(err);

        var html = '';

        for(var n=0; n < result.lenght; n++) {
          html += resultToHtml(result[n].ratee, result[n].stars, result[n].comment, n);

          
        }
        console.log("Result inside getAllRatings: " + html);

        resolve(html);
      });
    });
  },*/

  
  /*insertRating: function (ratee, stars, comment) {
    con.query("INSERT INTO rating VALUES ( ? )", [[ratee, stars, comment]], 
    function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });    
  }*/

  insertMeme: function (url) {
    con.query("INSERT INTO memeShop VALUES ( ? )", [[url]], 
    function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });    
  }
};