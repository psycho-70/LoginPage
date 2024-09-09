import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3001;
const secretKey = 'your_secret_key'; // Replace with a secure key in a real app

app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests

let users = []; // Temporary storage, replace with a database in a real app

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const jwtToken = token.split(' ')[1];
  jwt.verify(jwtToken, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    next();
  });
};

// Endpoint to register/login and create a JWT token
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Simulate saving to database
  const user = { email, password };
  users.push(user);

  // Create a JWT token
  const token = jwt.sign({ id: email }, secretKey, { expiresIn: '1h' });

  console.log('Received:', { email, password });
  res.status(201).json({ message: 'User authenticated successfully', token });
});

// Protected route to get user data
app.get('/notes', verifyToken, (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
