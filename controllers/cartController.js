// Used libraries
const db = require('../db');
const _ = require('lodash');
const { v4:uuidv4 } = require('uuid');
const { result } = require('../db');

// Database table name
const TABLE = 'cart';
const KOPPELTABEL = 'cart_product'

exports.createCart = (req, res, next) => {
    const { cartid } = req.body;

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

exports.getProducts = (req, res) => {
    const { cartid } = req.body;

    db.query('SELECT product_id FROM ${table:name} WHERE cart_id=${cartid}', {
        table: KOPPELTABEL,
        cartid: cartid
    })
    .then(result => {
        res.status(200).json({
            result: result
        })
    })
    .catch(error => {
        res.status(404).json({
            error: error.message || error
        });
    });
}

exports.addProductToCart = (req, res) => {
    const { cartid, productid } = req.body;

    db.query('INSERT INTO ${table:name} (${columns:name}) VALUES (${cartid}, ${productid})', {
        table: KOPPELTABEL,
        columns: ['cart_id', 'product_id'],
        cartid: cartid,
        productid: productid
    })
    .then(result => {
        res.status(200).json({
            result: result
        })
    })
    .catch(error => {
        res.status(404).json({
            error: error.message || error
        });
    });
}