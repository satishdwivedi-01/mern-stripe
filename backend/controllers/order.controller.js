// controllers/orderController.js

import express from 'express';
import Stripe from 'stripe';
import Product from '../models/product.model.js';
import Order from "../models/order.model.js";

import dotenv from 'dotenv';
dotenv.config();

console.log("Loaded Stripe key:", process.env.STRIPE_SECRET);


const stripe = new Stripe(process.env.STRIPE_SECRET);

export const storeOrder = async (req, res) => {
  const { sessionId, productId, paymentStatus } = req.body;
 
  try {
    if (!productId || !sessionId) {
      return res.status(400).json({ error: 'Product ID and Session ID required' });
    }

    // Get session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const order = new Order({
      productItem: productId,
      email: session.customer_details?.email || "unknown",
      paymentStatus: paymentStatus || (session.payment_status === 'paid' ? 'Success' : 'Cancel'),
      transactionId: session.id,
    });

    await order.save();

    res.status(201).json({ message: 'Order stored successfully' });
  } catch (err) {
    console.error("Failed to store order:", err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default storeOrder





