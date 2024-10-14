const db = require('../config/db');

const ChargingSession = {
  // Start a new charging session
  create: (user_id, station_id) => {
    return new Promise(async(resolve, reject) => {
      try{
      const [result] = await db.query(
        'INSERT INTO charging_sessions (user_id, station_id, start_time) VALUES (?, ?, NOW())',
        [user_id, station_id]);
    //     (err, result) => {
    //       if (err) reject(err);
    //       resolve(result);
    //     }
    // );
      resolve(result)
  }catch (err) {
    console.error('Error during session creation:', err); // Log any errors
    reject(err);
  }
  }
);
},

  // End a charging session
  end: async (session_id, cost) => {
      try {
        // Log inputs for debugging
        console.log(`Ending session with ID: ${session_id} and cost: ${cost}`);
        
        // Ensure the input session_id and cost are valid
        if (!session_id || isNaN(cost)) {
          throw new Error('Invalid session_id or cost');
        }
  
        // Execute the update query
        const [result] = await db.query(
          `UPDATE charging_sessions 
           SET end_time = NOW(), cost = ?, status = 'completed' 
           WHERE session_id = ?`,
          [cost, session_id]
        );
  
        // Check if any rows were affected
        if (result.affectedRows === 0) {
          throw new Error(`No session found with ID: ${session_id}`);
        }
  
        console.log('Session ended successfully:', result);
        return result;
      } catch (err) {
        console.error('Error during session end:', err); // Log the error
        throw err; // Re-throw the error to handle it in the controller
      }
    },

  // Get all charging sessions for a user
  getByUserId: (user_id) => {
    return new Promise(async(resolve, reject) => {
      const results =db.query(
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
