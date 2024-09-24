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
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }
};

module.exports = User;
