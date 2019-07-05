/*
 * Ryan DiRezze
 * Taborek Treasures
 */

 // include external dependencies (e.g., from other files)
 var Item = require('../models/item.js');
 var mongoose = require('mongoose');
 const MongoClient = require('mongodb').MongoClient;
 var base64Img = require('base64-img');
 var path = require('path');
 var buffer = require('buffer');

 // include Express and router
 var express = require('express');
 var router = express.Router();

 // managing and uploading images/files
 var fs = require('fs');
 var multer = require('multer');
 // var formidable = require('formidable');
 // var fileUpload = require('express-fileupload');
 var bodyParser = require('body-parser');
 router.use(bodyParser.urlencoded({   extended: true   }));     // already included within app.js

 // middleware to use Express' File Upload module
 // router.use(fileUpload());

 // router.use(multer({    dest: '../public/js/uploads/images'    }));
 // const upload = multer({dest: '../public/uploads/images'});     // choose where file uploads will be stored within the server's directory

 /* setup MULTER for file/image uploading via forms */
 // set storage
 const upload = multer({    dest: '../public/uploads/'  });
 // var storage = multer.diskStorage({
 //     destination: function(req, file, cb) {
 //         cb(null, 'uploads');
 //     },
 //     filename: function(req, file, cb) {
 //         cb(null, file.fieldname + '-' + Date.now());
 //     }
 // });
 //
 // var upload = multer({  storage: storage    });

 /* permissible loading a single file, the value of the attribute, "name," in the form of "image" */
 var type = upload.single('image');

 // MongoDB connection settings (options)
  const options = {
      useNewUrlParser: true,
      keepAlive: 300000,
      // useCreateIndex: true,
      // autoIndex: false,                  // do NOT build indexes indices
      // reconnectTries: Number.MAX_VALUE,  // NEVER stop trying to reconnect
      // reconnectInterval: 500,            // reconnect every 500ms
      // poolSize: 10,                      // maintain up to 10 socket connections
      // if not connected, return errors immediately rather than waiting for attempts to reconnect
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000,           // give up initial connection after 10 seconds
      socketTimeoutMS: 45000,            // close sockets after 45 seconds of inactivity
      // family: 4,                         // use IPv4, skip trying IP6
      db: "TaborekTreasures"
  }

  MongoClient.connect("mongodb+srv://direzzer:092494@projectwebsite-gigij.mongodb.net/TaborekTreasures?retryWrites=true&w=majority", {  useNewUrlParser: true   }, (err, client) => {
      if(err) return console.log(err);
      db = client.db('TaborekTreasures');
  });

  // connect to MongoDB's database
  // var conn = mongoose.connect("mongodb+srv://direzzer:092494@projectwebsite-gigij.mongodb.net/TaborekTreasures?retryWrites=true&w=majority", {  useNewUrlParser: true   }, (err) => {
  //     if(err) return console.log(err);
  // });
  // var conn = mongoose.connect("mongodb+srv://direzzer:092494@projectwebsite-gigij.mongodb.net/TaborekTreasures?retryWrites=true&w=majority", options, (err, client) => {
  //     if(err) return console.log(err);
  //     // db = client.db('TaborekTreasures');
  // });

  // add a new item & upload a picture/image (via: (source code) https://github.com/tutsplus/file-upload-with-multer-in-node <-- (article) https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088)
  router.post('/additem', upload.single('image'), (req, res) => {
      // print content to the console
      console.log('\nreq:\n', req);
      console.log('\nreq.body:\n', req.body);

      // define variables from form inputs
      var name = req.body.name;
      var description = req.body.description;
      var size = req.body.size;
      var price = req.body.price;
      var image = null;  // will assign the server directory-based path

      // process image for sending to MongoDB (database)
      var img = fs.readFileSync(req.file.path);
      var encode_image = img.toString('base64');


      // define a JSON object for the image attributes for saving to database
      var finalImg = {
          name: name,
          description: description,
          size: size,
          price: price,
          contentType: req.file.mimetype,
          image: Buffer.from(encode_image, 'base64')     // new
          // image: new Buffer(encode_image, 'base64')     // old
      };

      // image = finalImg;

      let error = [];

      // validations
      req.checkBody('name', 'Name is required...').notEmpty();
      req.checkBody('description', 'Description is required...').notEmpty();
      req.checkBody('size', 'Size is requied...').notEmpty();
      req.checkBody('price', 'Price is not valid...').notEmpty();
      // req.checkBody('image', 'Image is required...').notEmpty();

      // define form validation error(s)
      var errors = req.validationErrors();

      // handle error(s)
      if(errors) {
          console.log("YES, there are errors...", errors);
          req.session.errors = errors;
          req.session.success = false;
          res.redirect('/users/admindashboard');
      } else {
          console.log("NO, there are NOT errors...");
          req.session.success = true;

          // // item model
          // var newItem = new Item({
          //     name: name,
          //     description: description,
          //     price: price,
          //     // contentType: req.file.mimetype,
          //     image: Buffer.from(encode_image, 'base64')
          // });

          const fileName = req.file.originalName;
          fs.readFile(req.file.path, (err, data) => {
              const newPath = '../public/uploads/' + fileName;
              fs.writeFile(newPath, data, error => {
                  if(error) {
                      console.log(error);
                      res.end();
                  } else {
                      res.end(fileName);

                      db.collection('items').insertOne(finalImg, (err, result) => {
                          console.log(result);

                          if(err) return console.log(err);

                          console.log('Saved to the MongoDB database!');

                          // notify the user that his/her account was successfully created
                          req.flash('success_msg', 'New item added to your store!');

                          // redirect the user to the login web page
                          res.redirect('/users/admindashboard');
                      });
                  }
              })
          })

          // // the name of the input field (e.g., "sampleFile") is used to retrieve the uploaded file
          // let images = req.files.image;
          //
          // // new file path to the image
          // image = '../public/uploads/' + req.files.image.name;

          // if(req.file) {
          //     res.json(req.file);
          // }
          // else {
          //     throw err;
          // }

          // db.collection('items').insertOne(finalImg, (err, result) => {
          //     console.log(result);
          //
          //     if(err) return console.log(err);
          //
          //     console.log('Saved to the MongoDB database!');
          //
          //     // notify the user that his/her account was successfully created
          //     req.flash('success_msg', 'New item added to your store!');
          //
          //     // redirect the user to the login web page
          //     res.redirect('/users/admindashboard');
          // });

          // // create a new item
          // Item.createItem(newItem, function(err, item) {
          //     if(err) throw err;
          //     console.log(item);
          // });
      }

      // db.collection('items').insertOne(finalImg, (err, result) => {
      //     console.log(result);
      //
      //     if(err) return console.log(err);
      //
      //     console.log('Item and image were successfully saved to the MongoDB database!');
      //     res.redirect('/users/admindashboard');
      // });

      // const file = req.file;
      // if(!file) {
      //     const error = new Error('Please upload a file...');
      //     error.httpStatusCode = 400;
      //     return next(error);
      // }
      // res.send(file);
  });

 // display items in the store based on items within the MongoDB database table (items)
 router.get('/store', function(req, res) {
     // define variable that will contain all data attributes for each item
     var data = [];
     var context = {};

     // query MongoDB for all items within the database table/collection
     Item.find({}, function(err, items) {
         // error handling
         if(err) {
             return handleError(err);
         // print query results from MongoDB
         } else {
             console.log('\nQuery Results (Items):\n', items);
         }

         // add items from the query to the object of items
         for(var k in items) {
             var newImg = null;
             if(items[k].image != null) {
                 decode_base64(items[k].image.Binary.buffer, items[k].name);
                 // newImg = base64Img.img(items[k].image, '../public/uploads', items[k].name, function(err, filepath) {});
             }

             data.push({    'name': items[k].name, 'price': items[k].price, 'description': items[k].description, 'image': path.join('../public/uploads/', items[k].name)    });
         }

         context.item = data;

         // 'items' contains the list of items that match the (find) criteria
         res.render('store', context);
     })

     // // define the query, which will return all results b/c there are no filters
     // const query = items.find();
     // query.setOptions({ lean : true });
     // query.collection(items.collection);

     // parse query results for use with handlebars for rendering page content

 });

 // decode base64 string to image
 function decode_base64(base64str, filename) {
     var buf = Buffer.from(base64str, 'base64');

     fs.writeFile('../public/uploads', buf, function(error) {
         if(error) {
             throw error;
         } else {
             console.log('File created from base64 string!');
             return true;
         }
     });
 }

 // [STATIC] GET (opens/displays) the 'Store' page
 router.get('/storestatic', function(req, res) {
     res.render('store_static');
 });

 module.exports = router;
