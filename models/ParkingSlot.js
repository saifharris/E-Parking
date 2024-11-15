// models/ParkingSlot.js

const mongoose = require('mongoose');

const parkingSlotSchema = new mongoose.Schema({
    slotId: Number,
    status: { type: String, enum: ['available', 'occupied'], default: 'available' }
});

module.exports = mongoose.model('ParkingSlot', parkingSlotSchema);
