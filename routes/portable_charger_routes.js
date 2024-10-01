const express = require('express');
const portable_charger_controller = require('../controllers/portable_charger_controller');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');
const router = express.Router();

// Create a new portable charger (Admin only)
router.post('/create', isAuthenticated, isAdmin, portable_charger_controller.createCharger);

// Update an existing portable charger (Admin only)
router.put('/update', isAuthenticated, isAdmin, portable_charger_controller.updateCharger);

// Get all portable chargers (Accessible by both drivers and admins)
router.get('/all', isAuthenticated, portable_charger_controller.getAllChargers);

// Get available portable chargers (Accessible by both drivers and admins)
router.get('/available', isAuthenticated, portable_charger_controller.getAvailableChargers);

module.exports = router;
