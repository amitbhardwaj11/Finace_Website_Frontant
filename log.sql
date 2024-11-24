CREATE DATABASE user_db;

USE user_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Add a test user
INSERT INTO users (name, email, password) VALUES ('Amit Bhardwaj', 'amitbhardwajghz11@gmail.com', 'password123');
