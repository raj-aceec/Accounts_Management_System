const express = require('express');
const router = express.Router();
const db = require('../db'); 
router.get('/users', async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM users');
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

router.post('/create-user', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role]);
        res.json({ success: true });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Error creating user' });
    }
});

router.delete('/delete-user/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        await db.query('DELETE FROM users WHERE user_id = ?', [userId]);
        res.json({ success: true });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Error deleting user' });
    }
});

router.get('/customers', async (req, res) => {
    try {
        const [customers] = await db.query('SELECT * FROM customers');
        res.json(customers);
    } catch (err) {
        console.error('Error fetching customers:', err);
        res.status(500).json({ error: 'Error fetching customers' });
    }
});

router.get('/account-requests', async (req, res) => {
    try {
        const [requests] = await db.query('SELECT * FROM account_requests WHERE status = "pending"');
        res.json(requests);
    } catch (err) {
        console.error('Error fetching account requests:', err);
        res.status(500).json({ error: 'Error fetching account requests' });
    }
});

router.put('/approve-request/:id', async (req, res) => {
    const requestId = req.params.id;
    try {
        await db.query('UPDATE account_requests SET status = "approved" WHERE request_id = ?', [requestId]);
        res.json({ success: true });
    } catch (err) {
        console.error('Error approving request:', err);
        res.status(500).json({ error: 'Error approving request' });
    }
});

router.put('/update-user', async (req, res) => {
    const { username, newUsername, newPassword, newRole } = req.body;
    try {
        let query = 'UPDATE users SET username = ?, role = ?' + (newPassword ? ', password = ?' : '') + ' WHERE username = ?';
        let params = [newUsername, newRole, ...(newPassword ? [newPassword] : []), username];
        await db.query(query, params);
        res.json({ success: true });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ success: false, message: 'Error updating user' });
    }
});

router.get('/audit-logs', async (req, res) => {
    try {
        const [logs] = await db.query('SELECT * FROM audit_trail ORDER BY timestamp DESC');
        res.json(logs);
    } catch (err) {
        console.error('Error fetching audit logs:', err);
        res.status(500).json({ error: 'Error fetching audit logs' });
    }
});

module.exports = router;
