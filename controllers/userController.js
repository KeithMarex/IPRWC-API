// Used libraries
const db = require('../db');
const _ = require('lodash');
const { v4:uuidv4 } = require('uuid');
const cartController = require("./cartController.js");
const mailSender = require('../controllers/mailController');
const bcrypt = require('bcrypt');

// Database table name
const TABLE = 'user';

hashPassword = async (password) => {
    return await new Promise((resolve, reject) => {
        bcrypt.hash(password, 7, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
}

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
                    'create': true,
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
                    'create': true,
                    result: result
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
exports.checkUserLogin = async (req, res, next) => {
    const {email, wachtwoord} = req.body;

    if (typeof email === 'undefined' || typeof wachtwoord === 'undefined') {
        return res.status(200).json({login: 'failed', error: true});
    }

    db.query("SELECT * FROM ${table:name} WHERE email=${useremail}", {
        table: TABLE,
        useremail: email
    })
    .then(result => {
        bcrypt.compare(wachtwoord, result.wachtwoord, async (err, res) => {
            console.log(wachtwoord);
            console.log(result.wachtwoord);
            await console.log(result.wachtwoord);
            console.log('Compared result', wachtwoord, result, res, err); 
            if (res) {
                delete result.wachtwoord;
                res.status(200).json({
                    login: true,
                    result: result
                });
            } else {
                return res.status(200).json({login: 'failed', error: true, result: result});
            }
        });
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
exports.changePassword = async (req, res, next) => {

    const { email, oudWachtwoord, NieuwWachtwoord } = req.body;

    const password_hash = await hashPassword(NieuwWachtwoord);
    
    db.query('UPDATE ${table:name} SET wachtwoord = ${userPassword} WHERE email = ${userEmail}', {
        table: TABLE,
        userEmail: email,
        userPassword: Math.random().toString(36).substr(2, 8)
    }).then(result => {
        res.status(200).json({
            reset: true,
            result: result
        });
    }).catch(error => {
        res.status(404).json({
            error: error.message || error
        });
    });
};

exports.resetPassword =  async (req, res) => {
    const {email} = req.body;

    if (typeof email === 'undefined') {
        return res.status(200).json({error: true});
    }

    let password = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    for (let i = 0; i < 15; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // TODO send password via email to user
    mailSender.sendResetMail(email, password);

    const password_hash = await hashPassword(password);

    // const password_hash = await hashPassword(password);

    db.query('UPDATE ${table:name} SET wachtwoord = ${userPassword} WHERE email = ${userEmail}', {
        table: TABLE,
        userEmail: email,
        userPassword: password_hash
    }).then(result => {
        res.status(200).json({
            reset: true,
            result: result
        });
    }).catch(error => {
        res.status(404).json({
            error: error.message || error
        });
    });
};