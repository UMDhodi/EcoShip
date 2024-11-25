const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'awsdatabase.cvmkooke0uh1.us-east-1.rds.amazonaws.com',
  user: 'admin', // replace with your MySQL username
  password: 'tu13dekh', // replace with your MySQL password
  database: 'aws',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware
app.use(cors());
app.use(bodyParser.json()); // to parse JSON bodies

// Route to authenticate package_id
app.post('/api/authenticate', (req, res) => {
  const { package_id } = req.body; // Extract package_id from request body

  if (!package_id) {
    return res.status(400).json({ error: 'Package ID is required' });
  }

  // Query MySQL to check if package_id exists
  const query = 'SELECT * FROM packages WHERE package_id = ?';
  db.query(query, [package_id], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      // Package exists, return package details
      res.json({ success: true, package: results[0] });
    } else {
      // Package not found
      res.status(404).json({ success: false, error: 'Package not found' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
