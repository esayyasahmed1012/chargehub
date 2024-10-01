const db = require('../config/db');

const User = {
  // Register a new user with role
  register: (username, email, password_hash, phone_number, role = 'driver') => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO users (username, email, password_hash, phone_number, role) VALUES (?, ?, ?, ?, ?)',
        [username, email, password_hash, phone_number, role],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  // Find user by email
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      console.log('Querying for user with email:', email); // Log the email being queried
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
          console.error('Error querying the database:', err); // Log any database errors
          return reject(err);
        }
        console.log('Query result:', result); 
        resolve(result[0]);
      });
    });
  } 
};

module.exports = User;
