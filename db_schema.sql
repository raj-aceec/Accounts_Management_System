## Setup the Database
-- Create Database
CREATE DATABASE IF NOT EXISTS Accounts;
USE Accounts;

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') NOT NULL
);

-- Create Customers Table
CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_number VARCHAR(20) NOT NULL,
  account_name VARCHAR(20),
  account_type VARCHAR(20),
  balance FLOAT(10),
  opening_date DATE,
  last_transaction_date DATE,
  status VARCHAR(20),
  branch VARCHAR(20)
);

-- Create Account Requests Table
CREATE TABLE IF NOT EXISTS account_requests (
  request_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  account_number VARCHAR(20),
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create Audit Trail Table
CREATE TABLE audit_trail (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Users
INSERT INTO users (username, password, role) VALUES ('admin', 'admin123', 'admin');
INSERT INTO users (username, password, role) VALUES ('user1', 'user123', 'user');

-- Insert Sample Customers
INSERT INTO customers (account_number, account_name, account_type, balance, opening_date, last_transaction_date, status, branch) 
VALUES ('ACC001', 'John Doe', 'Savings', 1000.00, '2023-01-01', '2023-02-01', 'active', 'Main Branch'),
       ('ACC002', 'Jane Smith', 'Checking', 1500.00, '2023-03-01', '2023-04-01', 'inactive', 'Downtown Branch');

-- Insert Sample Account Requests
INSERT INTO account_requests (user_id, account_number, status) 
VALUES (2, 'ACC003', 'pending');

-- Insert Sample Audit Trail
INSERT INTO audit_trail (action) VALUES ('User admin created.');