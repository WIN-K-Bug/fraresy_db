CREATE DATABASE cab_booking;
USE cab_booking;

-- In MySQL
USE cab_booking;
SELECT NOW() AS currentTime;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

GRANT ALL PRIVILEGES ON cab_booking.* TO 'root'@'localhost';
FLUSH PRIVILEGES;


select*from users;