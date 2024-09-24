const express = require('express');
const charging_session_controller = require('../controllers/charging_session_controller');
const router = express.Router();

// Start a new charging session
router.post('/sessions/start', charging_session_controller.start_session);

// End a charging session
router.post('/sessions/end', charging_session_controller.end_session);

// Get all sessions for a user
router.get('/sessions/:user_id', charging_session_controller.getUserSessions);

module.exports = router;
