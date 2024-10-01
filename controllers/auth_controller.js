const User = require('../models/user_model');
const jwt = require('jsonwebtoken');

// Register a new user
const bcrypt = require('bcrypt');

// Register a new user
exports.register = async (req, res) => {
  const { username, email, password, phone_number, role } = req.body;
  try {
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    console.log('Registering user...');
    await User.register(username, email, hashedPassword, phone_number, role);

    console.log('Sending success response...');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log('Error occurred:', error.message);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  }
};

exports.login = async (req, res) => {
  console.log('Login attempt:', req.body); // Log incoming request
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

