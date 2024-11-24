// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const http = require('http');
const fs = require('fs');
const fileContent = fs.readFileSync('login.html')

// Initialize the Express application
const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_db' // Replace with your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Route to handle login requests
app.post('/submit_login', (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).send('All fields are required');
    }

    // Query to check user credentials
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal server error');
        }

        if (results.length > 0) {
            // Login successful
            res.send('Login successful! Welcome ' + results[0].name);
        } else {
            // Invalid credentials
            res.status(401).send('Invalid User ID or Password');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
