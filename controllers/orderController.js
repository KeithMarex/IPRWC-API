// Used libraries
const db = require('../db');
const _ = require('lodash');
const { v4:uuidv4 } = require('uuid');
const { use } = require('../routes/userRoutes');

// Database table name
const TABLE = 'orders';
const KOPPELTABEL = 'order_product'

exports.get = (req, res) => {
    const {userId} = req.params;

    db.query('SELECT orders.order_id, orders.timestamp, orders.tracking_status, JSON_agg((p.*, op.count)::product_json) FROM orders JOIN order_product op on orders.order_id = op.order_id JOIN product p on op.product_id = p.product_id WHERE user_id = ${userId} GROUP BY orders.order_id;', {
        table: KOPPELTABEL,
        userId: userId,
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

exports.create = (req, res) => {
    const {user_id} = req.body;
    const order_id = uuidv4();

    db.query('INSERT INTO ${table:name}(order_id, user_id, timestamp, tracking_status) VALUES (${order_id}, ${user_id}, now(), ${tracking_status})', {
        table: TABLE,
        user_id: user_id,
        order_id: order_id,
        tracking_status: 'Bestelling ontvangen'
    }).then(result => {
        res.status(200).json({
            insert: true,
            order_id: order_id
        });
    })
    .catch(error => {
        res.status(404).json({
            error: error.message || error
        });
    });
}

exports.add = (req, res) => {
    const {order_id, product_id, count} = req.body;

    db.query('INSERT INTO ${table:name}(order_id, product_id, count) VALUES (${order_id}, ${product_id}, ${count})', {
        table: KOPPELTABEL,
        order_id: order_id,
        product_id: product_id,
        count: count
    }).then(result => {
        res.status(200).json({
            insert: true
        })
    }).catch(error => {
        res.status(404).json({
            error: error.message || error
        });
    });
}