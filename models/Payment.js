// models/Payment.js

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    challanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challan' },
    amount: Number,
    paidAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
