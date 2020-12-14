// Used libraries
const db = require('../db');
const _ = require('lodash');
const { v4:uuidv4 } = require('uuid');

// Database table name
const TABLE = 'cart';

exports.createCart = (cartid, res, next) => {
    db.query('INSERT INTO ${table:name} (${columns:name}) VALUES (${cartid})', {
        table: TABLE,
        cartid: cartid
    })
    .then(result => {
        if(_.isEmpty(result)) {
            res.status(200).json({
                userid: userid,
                result: 'Cart has been created'
            });
        }
    })
    .catch(error => {
        res.status(404).json({
            error: error.message || error
        });
    });
};