const db = require('../config/db');

const charging_stations = {
  // creating a new charging station
  create: (station_name, location) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO charging_stations (station_name, location, status) VALUES (?, ?, "available")',
        [station_name, location],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  // get all the charging sttions
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM charging_stations', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  // updating the charging stations
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
