const express = require('express');
const router = express.Router();
auth_control=require('../controllers/auth_controller')

// Registration route
router.post('/register', auth_control.register);

// Login route
router.post('/login', auth_control.login);

module.exports = router;