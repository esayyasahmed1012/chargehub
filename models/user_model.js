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
  
  findByEmail: async (email) => {
    try {
      console.log('Executing query...');
      const [results] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
      console.log('DB query results:', results);
      return results.length > 0 ? results[0] : null; // Return the first result or null
    } catch (err) {
      console.error('Error during DB query:', err);
      throw err; // Rethrow to handle in calling function
    }
  }
  
  
};

module.exports = User;
