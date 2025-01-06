# Customer Management System

This is a web application built with Node.js and MySQL for managing customer accounts. It allows users to perform CRUD (Create, Read, Update, Delete) operations on customer data through an interactive frontend interface.

## Features

- Add new customer accounts.
- View all customer records.
- Update customer information.
- Delete customer records.
- Fully interactive frontend and backend integration.

## Prerequisites

- Node.js installed on your system.
- MySQL server installed and running.
- A text editor or IDE for development.

---

## Set Up the MySQL Database

1. **Create a New Database**  
   ```sql
   CREATE DATABASE accounts;
   USE accounts;
Create the Customer Table
Create a table with the following structure:

2.
CREATE TABLE customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(20),
    account_name VARCHAR(20),
    account_type VARCHAR(20),
    balance FLOAT(10),
    opening_date DATE,
    last_transaction_date DATE,
    status VARCHAR(20),
    branch VARCHAR(20)
);
Insert Sample Data
Insert a sample customer record to test the setup:
INSERT INTO customer (id, account_number, account_name, account_type, balance, opening_date, last_transaction_date, status, branch)
VALUES (1, 'ACC1234567890', 'John Doe', 'Savings', 1500.75, '2023-01-15', '2024-08-28', 'Active', 'Downtown Branch');
CRUD Functionality
Frontend:
index.html
Provides an interactive interface to perform CRUD operations:
Add new customers.
View all customers.
Update customer records.
Delete customer records.
style.css

Handles the styling of the application.
script.js

Manages communication with the backend.
Sends HTTP requests (GET, POST, PUT, DELETE) to the server and handles responses.
Backend
Server

Built with Node.js and Express.js.
Handles CRUD operations through RESTful API endpoints.
API Endpoints

GET All Customers
Retrieve all customer records:
GET /customers

GET a Specific Customer by ID
Retrieve details of a specific customer:
GET /customers/:id

POST
Add a new customer:
POST /customers

PUT
