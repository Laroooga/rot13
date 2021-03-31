/*var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'html'});
  res.end('<h1 style = "color: maroon">cheese</h1>');
}).listen(8080);*/


//MULTER
/*
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})*/

//var express = require('express')
//var multer  = require('multer')
//var upload = multer({ dest: 'uploads/' })

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dao = require('./dao.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).sendFile('rot13.html', {
        root: path.resolve('../public')
    });
});

app.get('/dffs', (request, response)  => {
    
    var ratee = request.query.ratee;
    var stars = request.query.stars;
    var comment = request.query.comment;
    
    dao.deleteRating(ratee, stars, comment);

    response.status(200).send( {});
})

app.get('/insertRating', (request, response)  => {
    
    var ratee = request.query.ratee;
    var stars = request.query.stars;
    var comment = request.query.comment;
    
    dao.insertRating(ratee, stars, comment);

    response.status(200).send( {});
})

app.get('/insertMeme', (request, response)  => {
    
    var url = request.query.filepath;
    
    dao.insertMeme(url);

    response.status(200).send( {});
})

app.get('/getMeme', async (request, response)  => {
    ////dao.getAllRatings();
    //TODO: connect to the database, select all ratings, and return them in an HTML table or similar
    //console.log("Waiting for result...");
    
    var ratingsHtml = await dao.getMemesAsHtml(); //getAllRatings

    console.log("Result from DAO: " + ratingsHtml);

    response.status(200).send( ratingsHtml );
})

app.get('/encrypt', async (request, response)  => {


    var plaintext = request.query.plaintext;
    var ciphertext = plaintext;

    function rot13(str) {
        var input     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var output    = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
        var index     = x => input.indexOf(x);
        var translate = x => index(x) > -1 ? output[index(x)] : x;
        return str.split('').map(translate).join('');
      }

    ciphertext = rot13(plaintext);
    
    response.status(200).send( ciphertext );
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});