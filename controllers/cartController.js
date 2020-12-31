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
    db.query('SELECT product.*, cp.count FROM "user" JOIN ${table:name} cp on "user".cart_id = cp.cart_id JOIN product on cp.product_id=product.product_id WHERE "user".cart_id=${cartid} GROUP BY cp.product_id, product.product_id, cp.count', {
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

    db.query('INSERT INTO ${table:name} (${columns:name}) VALUES (${cartid}, ${productid}, ${count})', {
        table: KOPPELTABEL,
        columns: ['cart_id', 'product_id', 'count'],
        cartid: cartid,
        productid: productid,
        count: 1
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

exports.changeValue = (req, res) => {
    const { cartid, productid, value } = req.body;

    db.query('UPDATE ${table:name} SET count=${value} WHERE cart_id=${cartId} AND product_id=${productId}', {
        table: KOPPELTABEL,
        cartId: cartid,
        productId: productid,
        value: value
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

exports.deleteProduct = (req, res) => {
    const { cartid, productid } = req.body;

    db.query('DELETE FROM ${table:name} WHERE cart_id=${cartId} and product_id=${productId}', {
        table: KOPPELTABEL,
        cartId: cartid,
        productId: productid
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