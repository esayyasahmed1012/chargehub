const db = require('../config/db');

const portable_charger = {
  // Create a new portable charger
  create: (charger_name, location, status) => {
    return new Promise(async(resolve, reject) => {
      try{
        const [result]=await db.query(
          'INSERT INTO portable_chargers (charger_name, location, status) VALUES (?, ?, ?)',
          [charger_name, location, status])
          resolve(result)
      }catch(err){
        throw(err)
      }
    }
  );
  },

  // Update portable charger status or assign it to a car
  update: (charger_id, status) => {
    return new Promise(async(resolve, reject) => {
      try{
        const [result]= await db.query(
          'UPDATE portable_chargers SET status = ? WHERE charger_id = ?',
          [status, charger_id])
          resolve(result)
      }catch(err){
        throw(err)
      }
    }
  );
  }, 

  // Get all portable chargers
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM portable_chargers', (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  // Get available portable chargers
  getAvailable: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM portable_chargers WHERE status = 'available'", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
};

module.exports = portable_charger;
