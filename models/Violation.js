// models/Violation.js

const mongoose = require('mongoose');

const violationSchema = new mongoose.Schema({
    vehicleId: String,
    type: String, // e.g., "expired ticket", "unauthorized parking"
    reportedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Violation', violationSchema);
