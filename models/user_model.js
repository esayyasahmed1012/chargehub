const db = require('../config/db');

const User = {
  // Register a new user with role
  register: (username, email, password_hash, phone_number, role = 'driver') => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('Starting DB insert...');
        
        // Perform the query
        const [result] = await db.query(
          'INSERT INTO users (username, email, password_hash, phone_number, role) VALUES (?, ?, ?, ?, ?)',
          [username, email, password_hash, phone_number, role]
        );
        
        console.log('DB insert successful:', result); // Log success
        resolve(result);
      } catch (err) {
        console.error('Error during DB insert:', err); // Log any errors
        reject(err); // Reject the promise with error
      }
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
