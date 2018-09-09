/*
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

// ANSWER - acquired from assignment 5's file content
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

//#################################################################################

// // interface
// var express = require('express');
// var app = express();
// var path = require('path');
//
// // specifies that all paths should route to files within the 'public' folder
// app.use(express.static('public'));  // /public/ must be located in the same path/folder as server.js
//
// // if the URL's path doesn't correspond to a /public/[file], then send 404.html
//    // since this executes in order, if no file is found, display 404.html
// app.get('*', function(req, res) {
//    // console.log(res.statusCode);  // returns 200
//    res.status(404);
//    // sendFile requires the full path
//    res.sendFile(path.join(__dirname + '/public/404.html'));
//    // console.log(res.statusCode);  // returns 404
// });
//
// app.listen(3000);

// NOTE: server works (w/ module - express)
// var express = require('express');
// var app = express();
// var server = app.listen(3000, listening);
// function listening() {
//    console.log("listening...");
//    app.use(express.static('public'));
// }


//#################################################################################

// // enable the HTTP module
// var http = require("http");
//
// // var dt = require("./myfirstmodule");   // module file fomat: "myfirstmodule" can be a plain text file or a .js file to work
// var url = require("url");
// var fs = require("fs");
//
// // create a Server (tells the computer to print "Hello World!" if anyone
// // (i.e., web browser) tries to access your computer on port 3000)
//    // NOTE: when using Terminal to access a folder path with a space, fill out
//    //   the first word and hit 'Tab', and Terminal will autocomplete the folder path
//    //   server address: http://localhost:[PORT] = http://localhost:3000
// var server = http.createServer(function(request, response) {   // function within 'createServer()' will execute when someone tries to access the computer on the specified port
//    // response.writeHead(200, {'Content-Type': 'text/html'});  // specifies the format of the interface's respnose message | required if you want the response to be displayed as HTML instead of plain text
//    var q = url.parse(request.url, true);
//    var filename = "/public" + q.pathname;
//    fs.readFile(filename, function(error, data) {
//       if (error) {
//          response.writeHead(404, {'Content-Type': 'text/html'});
//          return response.end("404 Not Found");
//       }
//       response.writeHead(200, {'Content-Type': 'text/html'});
//       response.write(data);
//       return response.end();
//    });
// }).listen(3000);  // 'listen' to port 3000, per the README


//#################################################################################

// NOTE: Sample practices from class notes

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

/*
// class NOTE (EXAMPLE): "Serving with Express"
npm install --save express
var express = require('express');
var app = express();    // this is an application object

// need to specify (1) the TCP port(s) to 'listen' for requests
// can also specify a 'callback' function to indicate the server successfully started
app.listen(3000, function() {
   console.log("== Server is listening on port 3000");
})
*/
