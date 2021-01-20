// Used libraries
const db = require('../db');
const _ = require('lodash');
const { v4:uuidv4 } = require('uuid');

// Database table name
const TABLE = 'product';

exports.getAll = (req, res, next) => {

    db.query('SELECT * FROM ${table:name}', {
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

exports.getProduct = (req, res, next) => {
    const {id} = req.params;

    db.query('SELECT * FROM ${table:name} WHERE product_id=${id}', {
        table: TABLE,
        id: id,
    }).then(result => {
        res.status(200).json({
            result: result,
        });
    })
    .catch(error => {
        res.status(404).json({
            error: error.message || error
        });
    });
}

exports.createProduct = (req, res, next) => {
    const { titel, beschrijving, prijs, voorraad, product_foto_path } = req.body;
    const product_id = uuidv4();

    db.query('INSERT INTO ${table:name} (${columns:name}) VALUES (${product_id}, ${prijs}, ${beschrijving}, ${voorraad}, ${product_foto_path}, ${titel})', {
        table: TABLE,
        columns: ['product_id', 'prijs', 'beschrijving', 'voorraad', 'product_foto_path', 'titel'],
        product_id: product_id,
        prijs: prijs,
        beschrijving: beschrijving,
        voorraad: voorraad,
        product_foto_path: product_foto_path,
        titel: titel
    })
    .then(result => {
        if(_.isEmpty(result)) {
            res.status(200).json({
                create: true
            });
        }
    })
    .catch(error => {
        res.status(404).json({
            error: error.message || error
        });
    });
};

exports.delete = (req, res, next) => {
    const { product_id } = req.body;

    db.query('DELETE FROM ${table:name} WHERE product_id = ${product_id};', {
        table: TABLE,
        product_id: product_id
    })
    .then(result => {
        if(_.isEmpty(result)) {
            res.status(200).json({
                delete: true
            });
        }
    })
    .catch(error => {
        res.status(404).json({
            error: error.message || error
        });
    });
};

exports.update = (req, res, next) => {
    const { product_id, beschrijving, prijs, voorraad, product_foto_path, titel } = req.body;

    db.query('UPDATE ${table:name} SET prijs=${prijs}, beschrijving=${beschrijving}, voorraad=${voorraad}, product_foto_path=${product_foto_path}, titel=${titel} WHERE product_id = ${product_id};', {
        table: TABLE,
        product_id: product_id,
        beschrijving: beschrijving,
        prijs: prijs,
        voorraad: voorraad,
        product_foto_path: product_foto_path,
        titel: titel
    })
    .then(result => {
        if(_.isEmpty(result)) {
            res.status(200).json({
                update: true
            });
        }
    })
    .catch(error => {
        res.status(404).json({
            error: error.message || error
        });
    });
};