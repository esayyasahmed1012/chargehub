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
      res.status(500).json({ message: 'Error cd registering user', error: error.message });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(`Querying for user with email: ${email}`);
    const user = await User.findByEmail(email);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', user);

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Password matched');

    // Create token
    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    console.log('Sending success response with token');
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
