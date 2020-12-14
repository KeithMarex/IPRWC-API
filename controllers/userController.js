// Used libraries
const db = require('../db');
const _ = require('lodash');
const { v4:uuidv4 } = require('uuid');
const cartController = require("./cartController.js");

// Database table name
const TABLE = 'user';

/**
 * Select all users
 * 
 * @param {req} req - necessary in order for result
 * @param {res} res - You always send a result back to the user
 * @param {next} next - Use in documentation, never used
 * 
 * @return {result} res - Always return an object with a message and status code
 */
exports.getAllUsers = (req, res, next) => {

    db.query('SELECT ${columns:name} FROM ${table:name}', {
        columns: ['user_id', 'voornaam', 'achternaam', 'email'],
        table: TABLE
    })
    .then(result => {
        res.status(200).json({
            result: result
        });
    })
    .catch(error => {
        res.status(404).json({
            error: error.message || error
        });
    });
};

exports.createUser = (req, res, next) => {

    const { voornaam, achternaam, email, wachtwoord, straatnaam, huisnummer, plaatsnaam } = req.body;
    const user_id = uuidv4();
    const winkelwagenid = uuidv4();

    db.query('SELECT ${columns:name} FROM ${table:name} WHERE email = ${useremail}', {
        columns: ['user_id', 'email'],
        table: TABLE,
        useremail: email
    })
    .then(result => {
        // Email is already in use
        if(_.isEmpty(result)) {
            // No email found - is empty
            db.query('INSERT INTO ${table:name} (${columns:name}) VALUES (${cartid})', {
                table: 'cart',
                columns: ['cart_id'],
                cartid: winkelwagenid
            })
            .then(result => {
                if(_.isEmpty(result)) {
                    res.status(200).json({
                        result: 'Cart has been created'
                    });
                }
            })
            .catch(error => {
                res.status(404).json({
                    error: error.message || error
                });
            });
            
            db.query('INSERT INTO ${table:name} (${columns:name}) VALUES (${userid}, ${firstname}, ${lastname}, ${useremail}, ${userpassword}, ${streetname}, ${housenumber}, ${placename}, ${cartid})', {
                table: TABLE,
                columns: ['user_id', 'voornaam', 'achternaam', 'email', 'wachtwoord', 'straatnaam', 'huisnummer', 'plaatsnaam', 'cart_id'],
                userid: user_id,
                firstname: voornaam,
                lastname: achternaam,
                useremail: email,
                userpassword: wachtwoord,
                streetname: straatnaam,
                housenumber: huisnummer,
                placename: plaatsnaam,
                cartid: winkelwagenid
            })
            .then(result => {
                res.status(200).json({
                    result: result
                });
            })
            .catch(error => {
                res.status(404).json({
                    error: error.message || error
                });
            });
        } else {
            // email is found - denied action
            res.status(400).json({
                code: 400,
                error: "email is already in use"
            });
        }
    })
    .catch(error => {
        // Email have not been found
        const user_id = uuidv4();
        const winkelwagenid = uuidv4();

        db.query('INSERT INTO ${table:name} (${columns:name}) VALUES (${cartid})', {
            table: 'cart',
            columns: ['cart_id'],
            cartid: winkelwagenid
        })
        .then(result => {
            if(_.isEmpty(result)) {
                res.status(200).json({
                    result: 'Cart has been created'
                });
            }
        })
        .catch(error => {
            res.status(404).json({
                error: error.message || error
            });
        });

        db.query('INSERT INTO ${table:name} (${columns:name}) VALUES (${userid}, ${firstname}, ${lastname}, ${useremail}, ${userpassword}, ${streetname}, ${housenumber}, ${placename}, ${cartid})', {
            table: TABLE,
            columns: ['user_id', 'voornaam', 'achternaam', 'email', 'wachtwoord', 'straatnaam', 'huisnummer', 'plaatsnaam', 'cart_id'],
            userid: user_id,
            firstname: voornaam,
            lastname: achternaam,
            useremail: email,
            userpassword: wachtwoord,
            streetname: straatnaam,
            housenumber: huisnummer,
            placename: plaatsnaam,
            cartid: winkelwagenid
        })
        .then(result => {
            res.status(200).json({
                result: result
            });
        })
        .catch(error => {
            res.status(404).json({
                error: error.message || error
            });
        });
    });
};

/**
 * Check if the user login is correct
 * 
 * @param {req} req - necessary in order to select user by email, password
 * @param {res} res - You always send a result back to the user
 * @param {next} next - Use in documentation, never used
 * 
 * @return {result} res - Always return an object with a message and status code
 */
exports.checkUserLogin = (req, res, next) => {
    const {email, wachtwoord} = req.params;

    db.query("SELECT * FROM ${table:name} WHERE email=${useremail} AND wachtwoord=${userpassword}", {
        table: TABLE,
        useremail: email,
        userpassword: wachtwoord
    })
    .then(result => {
        if (!_.isEmpty(result)) {
            res.status(200).json({
                'login': true,
            });
        } else {
            res.status(200).json({
                'login': false,
                'useremail': email,
                'userpassword': wachtwoord,
                result: result
            });
        }
    })
    .catch(error => {
        res.status(404).json({
            error: error.message || error
        });
    });
};

/**
 * change password by selecting the user on email
 * 
 * @param {req} req - necessary in order to select user by ID
 * @param {res} res - You always send a result back to the user
 * @param {next} next - Use in documentation, never used
 * 
 * @return {result} res - Always return an object with a message and status code
 */
exports.changePassword = (req, res, next) => {

    const { userEmail, userPassword } = req.body;
    
    db.query('UPDATE ${table:name} SET user_password = ${userPassword} WHERE user_email = ${userEmail}', {
        table: TABLE,
        userEmail: userEmail,
        userPassword: userPassword
    }).then(result => {
        res.status(200).json({
            result: result
        });
    }).catch(error => {
        res.status(404).json({
            error: error.message || error
        });
    });
};
