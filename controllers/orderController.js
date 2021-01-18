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

    db.query('SELECT orders.order_id, JSON_agg(p.*) FROM orders JOIN order_product op on orders.order_id = op.order_id JOIN product p on op.product_id = p.product_id WHERE user_id = ${userId} GROUP BY orders.order_id;', {
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
    const {user_id, total_price} = req.body;
    const order_id = uuidv4();

    db.query('INSERT INTO ${table:name}(order_id, user_id, timestamp, total_price, tracking_status) VALUES (${order_id}, ${user_id}, now(), ${total_price}, ${tracking_status})', {
        table: TABLE,
        user_id: user_id,
        total_price: total_price,
        order_id: order_id,
        tracking_status: 'Order received'
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