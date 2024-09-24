const express = require('express');
const charging_station_controller = require('../controllers/charging_station_controller');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middlewares/auth');
// crreating new charging stations
router.post('/stations', isAuthenticated, isAdmin , charging_station_controller.createStation);

// geting all chargin stations
router.get('/stations', isAuthenticated, charging_station_controller.getStations);
router.put('/stations', isAuthenticated, isAdmin , charging_station_controller.createStation);
module.exports = router;
