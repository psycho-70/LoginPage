import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './model/User.js';

const app = express();
const port = 3001;
const secretKey = 'your_secret_key'; // Replace with a secure key

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/loginform', {
});

// Middleware to verify JWT
// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    console.log('No token provided');
    return res.status(403).json({ message: 'No token provided' });
  }

  const jwtToken = token.split(' ')[1]; // Extract the token part after "Bearer"
  console.log('JWT Token:', jwtToken); // Log the token being sent

  jwt.verify(jwtToken, secretKey, (err, decoded) => {
    if (err) {
      console.log('JWT verification error:', err); // Log the error details
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    req.userId = decoded.id; // Attach the decoded user ID to the request
    console.log('Decoded user ID:', decoded.id); // Log the decoded ID
    next();
  });
};

// Register a new user
// Register a new user
app.post('/register', async (req, res) => {
  const { fullName, email, password, address } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    fullName,
    email,
    password: hashedPassword,
    address,
  });

  await user.save();

  // Generate a JWT token for the newly registered user
  const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });

  res.status(201).json({ message: 'User registered successfully', token });
});

// Login and create a JWT token
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });

  res.status(200).json({ message: 'User authenticated successfully', token });
});



// Get user data
app.get('/user',verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user data' });
  }
});

// Update user profile
app.put('/user', verifyToken, async (req, res) => {
  const { fullName, email, address, password } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.address = address || user.address;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ message: 'User profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
