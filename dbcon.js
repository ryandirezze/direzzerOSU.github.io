/*
 * Name: Ryan DiRezze
 * HW Assignment: Database Interactions and UI
 * File: SQL Database Connection Configuration
 * Due Date: June 7, 2019 (06/07/2019)
 */

/* setup SQL database connection */
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs290_direzzer',
    password: '6181',
    database: 'cs290_direzzer'
});

module.exports.pool = pool;