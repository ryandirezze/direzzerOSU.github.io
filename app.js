/*
 * Ryan DiRezze
 * Taborek Treasures
 */

 /* include npm dependencies */
 var express = require('express');
 var path = require('path');
 var cookieParser = require('cookie-parser');
 var bodyParser = require('body-parser');
 var handlebars = require('express-handlebars').create({    defaultLayout: 'main'   });
 var expressValidator = require('express-validator');
 var flash = require('connect-flash');
 var session = require('express-session');
 var passport = require('passport');
 var LocalStrategy = require('passport-local').Strategy;
 var mongo = require('mongodb');
 var mongoose = require('mongoose');
 var helpers = require('handlebars-helpers')();
 // var comparison = helpers.comparison();

// MongoDB connection settings (options)
 const options = {
     useNewUrlParser: true,
     useCreateIndex: true,
     autoIndex: false,                  // do NOT build indexes indices
     reconnectTries: Number.MAX_VALUE,  // NEVER stop trying to reconnect
     reconnectInterval: 500,            // reconnect every 500ms
     poolSize: 10,                      // maintain up to 10 socket connections
     // if not connected, return errors immediately rather than waiting for attempts to reconnect
     bufferMaxEntries: 0,
     connectTimeoutMS: 10000,           // give up initial connection after 10 seconds
     socketTimeoutMS: 45000,            // close sockets after 45 seconds of inactivity
     // family: 4,                         // use IPv4, skip trying IP6
     dbName: "TaborekTreasures"
 }

 // connect to MongoDB's database
 mongoose.connect("mongodb+srv://direzzer:092494@projectwebsite-gigij.mongodb.net/TaborekTreasures?retryWrites=true&w=majority", options);

 // define the database connection with MongoDB
 var db = mongoose.connection;

 // notify us of an unsuccessful connection to the database
 db.on('error', console.error.bind(console, 'connection error:'));

 // notify us of a SUCCESSFUL connection to the database - a CALLBACK will be called once the connection opens
 db.once('open', function() {
     // we're successfully connected to the MongoDB database
     console.log("Connection to MongoDB Successful...");
 })

var routes = require('./routes/index.js');
var users = require('./routes/users.js');
var items = require('./routes/items.js');

// init Application
var app = express();

// view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// bodyParser & Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Express session
app.use(session({
    secret: 'hKwoEViY0FmqzXCA',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator (Middleware)
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }

        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Connect Flash (Middleware)
app.use(flash());

// Global Variables (for Flash Messages)
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    // if the user is created, then the user can be accessed from anywhere within the website/application
    res.locals.user = req.user || null;

    next();
});



// Middleware to handle routing
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/items', require('./routes/items.js'));

// set port
app.set('port', 5210);

// run the Node.js Express Server
app.listen(app.get('port'), function () {
    console.log('Express server started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate...');
});
