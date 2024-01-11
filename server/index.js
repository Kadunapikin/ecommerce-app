const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const app = express();

//MIDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
