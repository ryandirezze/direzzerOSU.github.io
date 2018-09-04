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

// interface

var http = require('http');
var port = process.env.port || 3000;
var express = require('express');
var handlebars = require('express3-handlebars');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', handlbars({ defaultLayout: 'main'}));
app.get('/', function(request, response) {
   response.render('index.handlebars', { someProp: 3 });
});

app.listen(3000);


//#################################################################################

// // enable the HTTP module
// var http = require("http");
//
// var dt = require("./myfirstmodule");   // module file fomat: "myfirstmodule" can be a plain text file or a .js file to work
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
//    var filename = "." + q.pathname;
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
