import express from "express";
import Stripe from "stripe";

const stripeRouter = express.Router();
const stripe = new Stripe(
  process.env.STRIPE_SECRET
); // Replace with your real secret key

stripeRouter.post("/api/create-stripe-checkout-session", async (req, res) => {
  const { product } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url:
        "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}", 
      cancel_url: "http://localhost:5173/cancel",
    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    console.error("Stripe session error:", err.message);
    res.status(500).json({ error: "Unable to create checkout session" });
  }
});

export default stripeRouter;
