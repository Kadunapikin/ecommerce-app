const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const app = express();

//MIDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

console.log(process.env.STRIPE_PRIVATE_KEY);

app.post('/checkout', async(req, res) => {
    try {
        const session = await stripe.checkout.session.create({
            line_items: req.body.lineItems,
            mode: 'payment',
            payment_method_types: ['card'],
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000'
        })
        return res.status(200).json(session);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error)
    }
})

app.listen(process.env.PORT, () => console.log('Server is running successfully'));