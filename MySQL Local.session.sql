CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
 
INSERT INTO users (username, password) VALUES 
('admin', 'password'),
('user1', 'password1'),
('user2', 'password2');

SELECT * FROM users;