const path = require('path');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express(); 


app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); 

app.use(express.static(path.join(__dirname, '..'))); 


// الربط مع قاعدة البيانات 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'helunadb'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to helunadb database successfully!');
    }
});

// اختبار السيرفر
app.get('/', (req, res) => {
    res.send('Heluna Backend Server is Running!');
});

app.put('/api/cancel-appointment/:id', (req, res) => {
    const appointmentId = req.params.id;
    const sql = "UPDATE appointments SET status = 'Canceled' WHERE id = ?";
    db.query(sql, [appointmentId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'تم الإلغاء' });
    });
});

// تشغيل السيرفر على بورت 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


app.post('/api/contact', (req, res) => {
    const { first_name, last_name, gender, mobile, dob, email, language, message_content } = req.body;

    // --- Backend Validation (Entry & Length Check) ---
    if (!first_name || !mobile || !email || !message_content) {
        return res.status(400).json({ error: "جميع الحقول الأساسية مطلوبة!" });
    }
    // ------------------------------------------------
    const sql = "INSERT INTO contact_messages (first_name, last_name, gender, mobile, dob, email, language, message_content) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [first_name, last_name, gender, mobile, dob, email, language, message_content], (err, result) => {
        if (err) {
            console.error(" Database Error in Contact:", err.message); 
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Message saved successfully!' });
    });
   
});

//appointments 
// مسار استقبال الحجوزات (شخصي + إهداء)
app.post('/api/bookings', (req, res) => {
    const { 
        booking_type, service_name, appointment_date, 
        appointment_time, full_name, recipient_name, 
        phone_number, email_address, message_content 
    } = req.body;

    // --- Backend Validation ---
    if (!full_name || !phone_number || !service_name) {
        return res.status(400).json({ error: "بيانات الحجز غير مكتملة!" });
    }
    // --------------------------
    
    const sql = `INSERT INTO appointments 
        (booking_type, service_name, appointment_date, appointment_time, full_name, recipient_name, phone_number, email_address, message_content) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(sql, [
        booking_type, service_name, appointment_date, 
        appointment_time, full_name, recipient_name, 
        phone_number, email_address, message_content
    ], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "حدث خطأ في قاعدة البيانات" });
        }
        res.status(200).json({ message: 'تم تأكيد الحجز بنجاح!' });
    });
});

// البحث عن المواعيد برقم الجوال
app.get('/api/my-appointments/:phone', (req, res) => {
    const phone = req.params.phone;
    const sql = "SELECT * FROM appointments WHERE phone_number = ? ORDER BY created_at DESC";
    
    db.query(sql, [phone], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});