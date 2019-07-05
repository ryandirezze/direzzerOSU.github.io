/*
<<<<<<< HEAD
 Your job is to complete that file to implement a very basic Node-based
 web server that satisfies the following requirements...

 Ryan DiRezze
 direzzer@oregonstate.edu

 NOTE: Node.js install output:
 This package has installed:
 	•	Node.js v10.9.0 to /usr/local/bin/node
 	•	npm v6.2.0 to /usr/local/bin/npm
 Make sure that /usr/local/bin is in your $PATH

*/

/*
// NOTE: (EXAMPLE) class' Node.js notes on how to create a web server

// import the HTTP module (for creating an HTTP server)
var http = require("http");

// create a basic server with the above variable
var server = http.createServer(requestHandler);

// once a server is created, you need to start it by running the server on some port
server.listen(8000);

// HTTP response
function requestHandler(request, response){
   response.statusCode = 200;
   response.end();
};

server.listen(8000);
*/

// class NOTE (EXAMPLE): "Serving with Express"
npm install --save express
var express = require('express');
var app = express();    // this is an application object

// need to specify (1) the TCP port(s) to 'listen' for requests
// can also specify a 'callback' function to indicate the server successfully started
app.listen(3000, function() {
   console.log("== Server is listening on port 3000");
})
=======
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name:
 * Email:
 */

var path = require('path');
var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
>>>>>>> d3f7636a9b4e37b7e17bd395381f8f8b2a89fc2a
