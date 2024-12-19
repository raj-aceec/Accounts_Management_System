const express = require('express');
const path = require('path');
const db = require('./db');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.redirect('login.html')
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [user] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        if (user) {
            if (user[0].role == 'admin') {
                res.json({ success: true, redirectUrl: '/admin.html' });
            } else {
                res.json({ success: true, redirectUrl: '/user.html' });
            }
        } else {
            res.json({ success: false, message: 'Invalid username or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Invalid Credentials' });
    }
});

app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
