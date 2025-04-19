import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { amount, currency } = req.body;

      // Create a Payment Intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount, // Amount in cents (e.g., 1000 = $10.00)
        currency,
        payment_method_types: ['card'], // Add more methods as needed
      });

      // Return the client secret
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}