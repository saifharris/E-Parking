// app.js

const express = require('express');
const mongoose = require('mongoose');
const ParkingSlot = require('./models/ParkingSlot');
const Violation = require('./models/Violation');
const Challan = require('./models/Challan');
const Payment = require('./models/Payment');

const app = express();
app.use(express.json());

const port = 3000;

// Connect to MongoDB
mongoose.connect( process.env.MONGO_URI ||'mongodb+srv://harrissaif01:harris1234@cluster0.i5ngqeq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// 1. Parking Slot Management Service
app.get('/parking-slots', async (req, res) => {
    const slots = await ParkingSlot.find();
    res.json(slots);
});

app.post('/parking-slots/book', async (req, res) => {
    const { slotId } = req.body;
    const slot = await ParkingSlot.findOne({ slotId });
    if (slot && slot.status === 'available') {
        slot.status = 'occupied';
        await slot.save();
        res.json({ message: 'Slot booked successfully', slot });
    } else {
        res.status(400).json({ error: 'Slot not available' });
    }
});

// 2. Violation Detection Service
app.get('/violations', async (req, res) => {
    const violations = await Violation.find();
    res.json(violations);
});

app.post('/violations/report', async (req, res) => {
    const violation = new Violation(req.body);
    await violation.save();
    res.json({ message: 'Violation reported', violation });
});

// 3. Challan Generation Service
app.post('/challans', async (req, res) => {
    const challan = new Challan(req.body);
    await challan.save();
    res.json({ message: 'Challan generated', challan });
});

// 4. Payment Service
app.post('/payments/pay', async (req, res) => {
    const payment = new Payment(req.body);
    await payment.save();
    res.json({ message: 'Payment successful', payment });
});

app.get('/payments/status', async (req, res) => {
    const payments = await Payment.find();
    res.json(payments);
});

// 5. Reporting and Analytics Service
app.get('/reports/violations', async (req, res) => {
    const totalViolations = await Violation.countDocuments();
    const violations = await Violation.find();
    res.json({ totalViolations, violations });
});

app.get('/reports/payments', async (req, res) => {
    const totalPayments = await Payment.countDocuments();
    const payments = await Payment.find();
    res.json({ totalPayments, payments });
});

// Start the server
app.listen(port, () => {
    console.log(`E-Parking Challan Generation System running at http://localhost:${port}`);
});
