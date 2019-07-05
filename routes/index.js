/*
 * Ryan DiRezze
 * Taborek Treasures
 */

var express = require('express');
var router = express.Router();

/*
    GET (opens/displays) the Home page
    [DOES NOT RESTRICT ACCESS TO VIEW THE WEBSITE'S CONTENT WITHOUT LOGGING IN;
    the website and its web pages can be accessed and viewed even if the user IS NOT logged into an account...
*/
router.get('/', function(req, res) {
    res.render('home');
});

/*
    [USING ACCESS CONTROL FOR WEBSITE WEB PAGE(S) ACCESSIBILITY WITHOUT LOGGING INTO A USER ACCOUNT]
    GET (opens/displays) the Home page
*/ /*
router.get('/', ensureAuthenticated, function(req, res) {
    res.render('home');
});
*/

// GET (opens/displays) the About Us page
router.get('/aboutUs', function(req, res) {
    res.render('aboutUs');
});

// /* 404 Error - displays (within the web browser) '404.handlebars', the "404 Error - Page Not Found" web page,
//  * when requesting a website URL path that does not exist/is not used to render a .handlebars file */
// router.use(function (req, res) {
//     res.status(404);
//     res.render('404');
// });
//
// /* 500 Error - displays (within the web browser) '500.handlebars', the "500 Error - Server is unable to process
//  * the (URL) request", when requesting a website URL path */
// router.use(function (err, req, res, next) {
//     console.log(err.stack);
//     res.type('plain/text');
//     res.status(500);
//     res.render('500');
// });

/*
    Access Control - Control & Restrict Website Web Page(s) Accessibility Unless Logged In
    DOES NOT allow users to access the home page (or other web pages) unless the user is logged in;
    redirects the user to the login web page IF the user is not logged in
*/
function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next;    // keep going...
    } else {
        // req.flash('error_msg', 'You are not logged in... Please login before accessing the website's content...');  // displays an
        res.redirect('/users/login');
    }
};

module.exports = router;
