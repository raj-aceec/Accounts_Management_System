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

## CRUD using MySQL with Authentication
1. Install the necessary dependencies "npm init"
2. Create the server and configure the server
3. Start the Server "node server.js"

## Open your browser and go to http://localhost:3000/login.html to log in as admin or user.


## Login
-- Authenticates the user (admin or user) and redirects to the appropriate dashboard.

## Admin Dashboard
1. Create new users by filling out the form and submitting.
2. Update existing user details by providing a username and new details.
3. Delete users from the user list.
4. View Customer Accounts: Displays customer account details (account number, account name, balance).
5. View Account Requests: Displays pending account requests submitted by users.
6. View Audit Logs: Displays logs of admin activities.

## User Dashboard
1. Add Account: Users can add new accounts.
2. Delete Account: Users can delete their accounts.
3. Submit Account Request: Users can submit requests to open new accounts.
