const charging_sessions = require('../models/charging_sessions_model');
const charging_stations = require('../models/charging_station_model');

// Start a new charging session
exports.startSession = async (req, res) => {
  const { user_id, station_id } = req.body;
  try {
    await charging_sessions.create(user_id, station_id);
    await charging_stations.updateStatus(station_id, 'unavailable');
    res.status(201).json({ message: 'Charging session started successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error starting charging session', error });
  }
};

// End a charging session
exports.endSession = async (req, res) => {
  const { session_id, cost, station_id } = req.body;
  try {
    await charging_sessions.end(session_id, cost);
    await charging_stations.updateStatus(station_id, 'available');
    res.status(200).json({ message: 'Charging session ended successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error ending charging session', error });
  }
};

// Get all sessions for a user
exports.getUserSessions = async (req, res) => {
  const { user_id } = req.params;
  try {
    const sessions = await charging_sessions.getByUserId(user_id);
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving charging sessions', error });
  }
};
