const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Use the cors middleware
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

// Existing endpoint to get all users
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Existing endpoint to add a new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (Username, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: result.insertId, name, email });
  });
});

// Existing endpoint to get a single user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;

  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(results[0]);
  });
});

// New PUT endpoint to update user's email by ID
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  db.query('UPDATE users SET email = ? WHERE id = ?', [email, userId], (err, result) => {
    if (err) {
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

// Existing DELETE endpoint to delete all users
app.delete('/api/users', (req, res) => {
  db.query('DELETE FROM users', (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: 'All users deleted successfully', affectedRows: result.affectedRows });
  });
});

//deletes by ID
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;

  db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'User deleted successfully' });
  });
});


// New PUT endpoint to check user existence and create if not found
app.put('/api/users', (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'User already exists', user: results[0] });
    } else {
      db.query('INSERT INTO users (email) VALUES (?)', [email], (err, result) => {
        if (err) {
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
