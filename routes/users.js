const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/add-account', async (req, res) => {
    const { account_number, account_name, account_type, balance, opening_date, last_transaction_date, status, branch } = req.body;
    await db.query('INSERT INTO customers (account_number, account_name, account_type, balance,opening_date,last_transaction_date,status, branch) VALUES (?, ?, ?, ?, ?,?,?,?)',
        [account_number, account_name, account_type, balance, opening_date, last_transaction_date, status, branch]);
    res.json({ message: 'Account added successfully' });
});

router.delete('/delete-account/:id', async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM customers WHERE id = ?', [id]);
    res.json({ message: 'Account deleted successfully' });
});

router.post('/request-account', async (req, res) => {
    const { user_id, account_number } = req.body;
    await db.query('INSERT INTO account_requests (user_id, account_number) VALUES (?, ?)', [user_id, account_number]);
    res.json({ message: 'Request submitted' });
});

module.exports = router;
