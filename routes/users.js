/*
 * Ryan DiRezze
 * Taborek Treasures
 */

// include Passport and the required strategy
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// include Express and router
var express = require('express');
var router = express.Router();

// include external dependencies (e.g., from other files)
var User = require('../models/user.js');

/* setup roles */
var ConnectRoles = require('connect-roles');

var roles = new ConnectRoles({
    failureHandler: function(req, res, action) {
        // optional function to customize code that runs when user fails authorization
        var accept = req.headers.accept || '';
        res.status(403);
        if(~accept.indexOf('html')) {
            res.render('accessDenied', {action: action});
        } else {
            res.send('Access Denied - You don\'t have permission to: ' + action);
        }
    }
});

// setup user roles
// app.use(authentication);
// app.use(roles.middleware());

// only allow users with the 'admin' role to view the pages with 'admin' middleware in their route(s)
roles.use('admin', function(req) {
   if(req.user.role === 'admin') {
       return true;
   } else {
       req.flash('error_msg', 'You do not have access to this web page...');
       res.redirect('/');
   }
});

// route to the ADMIN dashboard for managing content within the website's store
router.get('/admindashboard', roles.can('admin'), function(req, res) {
    res.render('adminDashboard');
});

// Register web page
router.get('/register', function(req, res) {
    res.render('register');
});

// Register user
router.post('/register', function(req, res) {
    // get form variables
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var role = 'view';

    let error = [];

    // validations
    req.checkBody('name', 'Name is required...').notEmpty();
    req.checkBody('email', 'Email is required...').notEmpty();
    req.checkBody('email', 'Email is not valid...').isEmail();
    req.checkBody('username', 'Username is required...').notEmpty();
    req.checkBody('password', 'Password is required...').notEmpty();
    req.checkBody('password2', 'Passwords do not match...').equals(req.body.password);

    // define form validation error(s)
    var errors = req.validationErrors();

    // handle error(s)
    if(errors) {
        console.log("YES, there are errors...");
        req.session.errors = errors;
        req.session.success = false;
        res.redirect('/users/register', {
            errors:errors   // added this to reflect below code
        });

        // res.render('register', {
        //     errors:errors
        // });

    } else {
        console.log("NO, there are NOT errors...");
        req.session.success = true;

        // user model
        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
            role: role
        });

        // create a new user
        User.createUser(newUser, function(err, user) {
            if(err) throw err;
            console.log(user);
        });

        // notify the user that his/her account was successfully created
        req.flash('success_msg', 'You are registered and can now login...');

        // redirect the user to the login web page
        res.redirect('/users/login');
    }
})

// Login web page
router.get('/login', function(req, res) {
    res.render('login');
});

// this does the following two things: (1) gets the user name and matches the username that was input during login, and (2) validates password
passport.use(new LocalStrategy(
  function(username, password, done) {
      User.getUserByUsername(username, function(err, user) {
          if(err) throw err;
          if(!user) {
              return done(null, false, {message: 'Unknown User: Please register and create a new account...'});
          }
          // if there is a user match...
          User.comparePassword(password, user.password, function(error, isMatch) {
              if(err) throw err;
              if(isMatch) {
                  return done(null, user);  // if there IS a match
              } else {
                  return done(null, false, {message: 'Invalid Password. Please try again...'});
              }
          })
      })
  }
));

// determines which data of the user object should be stored in the session; the result of this function is attached to the session as: req.session.passport.user = {}
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// the entire user object is retrieved with the ID
passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

// Login POST request to verify the user login credentials are valid and correct
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',               // nevigate to (e.g., display/render) the home page if the user successfully logged in
        failureRedirect: '/users/login',    // navigate to (e.g., display/render) the login page if the user login attempt was unsuccessful
        failureFlash: true,                 // display a flash message if the user's login attempt was unsuccessful
    })(req, res, next);
});

// route to log the user out
router.get('/logout', function(req, res) {
    // log the user out of his/her account
    req.logout();

    // notify the user that he/she was successfully logged out of his/her account
    req.flash('success_msg', 'You are logged out...');

    // redirect to display a new web page after successfully logging out of his/her account
    res.redirect('/users/login');
});

module.exports = router;
