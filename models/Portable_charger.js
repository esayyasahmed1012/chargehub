const db = require('../config/db');

const portable_charger = {
  // Create a new portable charger
  create: (charger_name, location, status) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO portable_chargers (charger_name, location, status) VALUES (?, ?, ?)',
        [charger_name, location, status],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  // Update portable charger status or assign it to a car
  update: (charger_id, status, assigned_to_car_id = null) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE portable_chargers SET status = ?, assigned_to_car_id = ? WHERE charger_id = ?',
        [status, assigned_to_car_id, charger_id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
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
