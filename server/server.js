// server.js
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const mongoose = require('mongoose'); // Import Mongoose for database
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import JWT for token generation

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/e-commerce-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Step 1: Define User model here (above the server listen function)

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  });
  
  const User = mongoose.model('User', userSchema);
  
  // Step 2: Create a route for user registration (below the User model)
  
  app.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      await user.save();
  
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
const jwtSecret = 'your-secret-key'; // Replace with your secret key

// Step 2: Define routes for user registration and login (above the server listen function)

app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, jwtSecret);
  
      return res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
// Step 3: Protect Stripe routes with JWT (below user login route)

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(403).json({ message: 'Token is missing' });
    }
  
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      req.userId = decoded.userId;
      next();
    });
  }
  
  app.post('/checkout', verifyToken, async (req, res) => {
    try {
      const session = await stripe.checkout.session.create({
        line_items: req.body.lineItems,
        mode: 'payment',
        payment_method_types: ['card'],
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000',
      });
      return res.status(200).json(session);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  });
  
app.listen(process.env.PORT, () => console.log('Server is running successfully'));
