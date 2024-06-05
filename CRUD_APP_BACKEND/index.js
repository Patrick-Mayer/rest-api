const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL');
});

// Update user's email by ID
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  db.query('UPDATE users SET email = ? WHERE id = ?', [email, userId], (err, result) => {
    if (err) {
      console.error('Error updating user email:', err.message);
      res.status(500).json({ error: err.message });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'User email updated successfully' });
  });
});

// Check user existence and create if not found
app.put('/api/users', (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error checking user existence:', err.message);
      res.status(500).json({ error: err.message });
      return;
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'User already exists', user: results[0] });
    } else {
      db.query('INSERT INTO users (email) VALUES (?)', [email], (err, result) => {
        if (err) {
          console.error('Error creating new user:', err.message);
          res.status(500).json({ error: err.message });
          return;
        }
        res.status(201).json({ message: 'New user created', id: result.insertId, email });
      });
    }
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
