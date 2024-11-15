// models/Challan.js

const mongoose = require('mongoose');

const challanSchema = new mongoose.Schema({
    violationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Violation' },
    issuedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' }
});

module.exports = mongoose.model('Challan', challanSchema);
