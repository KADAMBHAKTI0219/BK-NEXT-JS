const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const axios = require('axios');
require('dotenv').config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

// Fetch 5 products from fakestoreapi
app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data.map((item, index) => ({
      id: item.id,
      name: item.title,
      price: Math.round(item.price * 100),  // assuming prices from API
      description: item.description,
      image: item.image,  // fixed from item.url to item.image
    }));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Fetch single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${req.params.id}`);
    const item = response.data;
    const product = {
      id: item.id,
      name: item.title,
      price: Math.round(item.price * 100),  // same as above
      description: item.description,
      image: item.image,
    };
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Create Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
  const { product } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: product.name },
            unit_amount: product.price,  // product.price is already in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log('Backend running on port 5000'));
