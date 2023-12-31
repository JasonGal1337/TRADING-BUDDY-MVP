const db = require('./connection.js');
const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    pair: String,
    userId: String,
});

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;