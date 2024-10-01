const charging_station_model = require('../models/charging_station_model');

// Create a new charging station
exports.createStation = async (req, res) => {
  const { station_name, location } = req.body;
  try {
    await charging_station_model.create(station_name, location);
    res.status(201).json({ message: 'Charging station created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating charging station', error });
  }
};

// Get all charging stations
exports.getStations = async (req, res) => {
  try {
    const stations = await charging_station_model.getAll();
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving charging stations', error });
  }
};
