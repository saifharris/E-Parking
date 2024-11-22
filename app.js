const express = require('express');
const mongoose = require('mongoose');
const ParkingSlot = require('./models/ParkingSlot');
const Violation = require('./models/Violation');
const Challan = require('./models/Challan');
const Payment = require('./models/Payment');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.set('view engine', 'ejs'); // Set EJS as the template engine
app.use(express.static('public')); // Serve static files from "public" folder

const port = 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://harrissaif01:harris1234@cluster0.i5ngqeq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

// 1. Home Page
app.get('/', (req, res) => {
    res.render('index'); // Render the "index.ejs" file
});

// 2. Parking Slot Management Service
app.get('/parking-slots', async (req, res) => {
    const slots = await ParkingSlot.find();
    res.render('parking-slots', { slots });
});

app.post('/parking-slots/book', async (req, res) => {
    const { slotId } = req.body;
    const slot = await ParkingSlot.findOne({ slotId });
    if (slot && slot.status === 'available') {
        slot.status = 'occupied';
        await slot.save();
    }
    res.redirect('/parking-slots');
});

// 3. Violation Detection Service
app.get('/violations', async (req, res) => {
    const violations = await Violation.find();
    res.render('violations', { violations });
});

app.post('/violations/report', async (req, res) => {
    const violation = new Violation(req.body);
    await violation.save();
    res.redirect('/violations');
});

// 4. Challan Generation Service
app.get('/challans', async (req, res) => {
    const challans = await Challan.find();
    res.render('challans', { challans });
});

app.post('/challans', async (req, res) => {
    const challan = new Challan(req.body);
    await challan.save();
    res.redirect('/challans');
});

// 5. Payment Service
app.get('/payments', async (req, res) => {
    const payments = await Payment.find();
    res.render('payments', { payments });
});

app.post('/payments/pay', async (req, res) => {
    const payment = new Payment(req.body);
    await payment.save();
    res.redirect('/payments');
});

// 6. Reporting and Analytics Service
app.get('/reports', async (req, res) => {
    const totalViolations = await Violation.countDocuments();
    const totalPayments = await Payment.countDocuments();
    res.render('reports', { totalViolations, totalPayments });
});

// Start the server
app.listen(port, () => {
    console.log(`E-Parking Challan Generation System running at http://localhost:${port}`);
});
