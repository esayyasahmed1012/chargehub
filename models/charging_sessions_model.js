const db = require('../config/db');

const ChargingSession = {
  // Start a new charging session
  create: (user_id, station_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO charging_sessions (user_id, station_id, start_time) VALUES (?, ?, NOW())',
        [user_id, station_id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  // End a charging session
  end: (session_id, cost) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE charging_sessions SET end_time = NOW(), cost = ? WHERE session_id = ?',
        [cost, session_id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  // Get all charging sessions for a user
  getByUserId: (user_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM charging_sessions WHERE user_id = ?',
        [user_id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
};

module.exports = ChargingSession;
