const db = require('../config/db');

const charging_stations = {
  // Creating a new charging station with latitude and longitude
  create: (station_name, latitude, longitude) => {
    return new Promise(async(resolve, reject) => {
      try{
        console.log('Executing DB insert for station:', station_name, latitude, longitude);
        
        // Perform the query
        const [result] = await db.query(
          'INSERT INTO charging_stations (station_name, latitude, longitude, status) VALUES (?, ?, ?, "available")',
          [station_name, latitude, longitude]
        );
        
        console.log('DB insert successful:', result); // Log success
        resolve(result);
      } catch (err) {
        console.error('Error during DB insert:', err); // Log any errors
        reject(err); // Reject the promise with error
      }
      }
      // console.log('Executing DB insert for station:', station_name, latitude, longitude); // Log data
      // db.query(
      //   'INSERT INTO charging_stations (station_name, latitude, longitude, status) VALUES (?, ?, ?, "available")',
      //   [station_name, latitude, longitude],
      //   (err, result) => {
      //     if (err) {
      //       console.error('Error during DB insert:', err);  // Log DB error
      //       return reject(err);
      //     }
      //     console.log('DB insert successful', result);  // Confirm successful insert
      //     resolve(result);
      //   }
      // );
    // }
  );
  },
  findByStationName: async(station_name) => {
    try{
        const [results] = await db.execute('SELECT * FROM charging_stations WHERE station_name = ?', [station_name]);
        return results.length > 0 ? results[0] : null; // Return the first result or null
      } catch (err) {
        throw err; // Rethrow to handle in calling function
      }
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
