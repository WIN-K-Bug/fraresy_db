const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // ✅ Serve static files

// 📌 Connect to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "winkgg",
    database: "cab_booking"
});

db.connect((err) => {
    if (err) {
        console.error("❌ MySQL Connection Failed:", err);
    } else {
        console.log("✅ Connected to MySQL database.");
    }
});

// 📌 Signup API
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ message: "Username already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";

        db.query(sql, [username, email, hashedPassword], (err) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }
            res.status(201).json({ message: "User registered successfully" });
        });
    });
});

// 📌 Login API (Verify user & check hashed password)
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
        if (err) {
            console.error("❌ Database Error:", err);
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid login credentials" });
        }

        const user = results[0];

        // 🔹 Verify hashed password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid login credentials" });
        }

        res.json({ success: true, message: "Login successful!" });
    });
});


// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});