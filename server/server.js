const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:3000',
    // Additional CORS options
  };
  
  app.use(cors(corsOptions));
  

mongoose.connect('mongodb+srv://Iceman427:Iceman4real@deviceapi.w5d8xd9.mongodb.net/e-commerce-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new User({
      username,
      email,
      password, // In a production environment, you should hash the password
    });

    await user.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

const jwtSecret = process.env.JWT_SECRET; // Replace with your secret key

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored password (plain text for simplicity, not recommended for production)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: user._id }, jwtSecret);

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

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

app.post('/checkout', async (req, res) => {
    try {
      const lineItems = req.body.lineItems;
  
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
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

// //checkout route that verifies users authentication

// app.post('/checkout', verifyToken, async (req, res) => {
//   try {
//     const session = await stripe.checkout.session.create({
//       line_items: req.body.lineItems,
//       mode: 'payment',
//       payment_method_types: ['card'],
//       success_url: 'http://localhost:3000/success',
//       cancel_url: 'http://localhost:3000',
//     });
//     return res.status(200).json(session);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json(error);
//   }
// });

app.listen(process.env.PORT, () => console.log('Server is running successfully'));






//old index.js codes

// const express = require('express');
// const dotenv = require('dotenv').config();
// const cors = require('cors');
// const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
// const app = express();

// //MIDLEWARES
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

// console.log(process.env.STRIPE_PRIVATE_KEY);

// app.post('/checkout', async(req, res) => {
//     try {
//         const session = await stripe.checkout.session.create({
//             line_items: req.body.lineItems,
//             mode: 'payment',
//             payment_method_types: ['card'],
//             success_url: 'http://localhost:3000/success',
//             cancel_url: 'http://localhost:3000'
//         })
//         return res.status(200).json(session);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json(error)
//     }
// })

// app.listen(process.env.PORT, () => console.log('Server is running successfully'));