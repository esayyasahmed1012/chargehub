const Portable_charger = require('../models/Portable_charger');

// Create a new portable charger (Admin only)
exports.createCharger = async (req, res) => {
  const { charger_name, location, status } = req.body;
  try {
    const result = await Portable_charger.create(charger_name, location, status);
    console.log("Portable charger created successfull")
    res.status(201).json({ message: 'Portable charger created successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error creating portable charger', error });
  }
};

// Update portable charger status or assign to car (Admin only)
exports.updateCharger = async (req, res) => {
  // const { charger_id, status, assigned_to_car_id } = req.body;
  const { charger_id, status} = req.body;
  try {
    const result = await Portable_charger.update(charger_id, status);
    console.log("Portable charger updated successfully")
    res.status(200).json({ message: 'Portable charger updated successfully', result });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error updating portable charger', error });
    
  }
};

// Get all portable chargers (Accessible by both drivers and admins)
exports.getAllChargers = async (req, res) => {
  try {
    const chargers = await Portable_charger.getAll();
    res.status(200).json(chargers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portable chargers', error });
  }
};

// Get available portable chargers (Accessible by both drivers and admins)
exports.getAvailableChargers = async (req, res) => {
  try {
    const chargers = await Portable_charger.getAvailable();
    res.status(200).json(chargers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching available portable chargers', error });
  }
};
