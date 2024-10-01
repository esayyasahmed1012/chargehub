const db = require('../config/db');

const charging_stations = {
  // Creating a new charging station with latitude and longitude
  create: (station_name, latitude, longitude) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO charging_stations (station_name, latitude, longitude, status) VALUES (?, ?, ?, "available")',
        [station_name, latitude, longitude],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  // Get all the charging stations
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM charging_stations', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  // Updating the status of a charging station
  updateStatus: (station_id, status) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE charging_stations SET status = ? WHERE station_id = ?',
        [status, station_id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }
};

module.exports = charging_stations;
