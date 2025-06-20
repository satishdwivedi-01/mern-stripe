# MERN Stripe E-commerce Project

This is a full-stack e-commerce project built with the MERN stack (MongoDB, Express, React, Node.js) and integrated with Stripe for payment processing.

## Features

- Product listing
- Add to cart
- Checkout using Stripe
- Order storage

## Technologies

- Frontend: React, Vite, Tailwind CSS
- Backend: Express, MongoDB, Mongoose
- Payments: Stripe API

## Getting Started

### Backend

```powershell
cd backend
npm install
npm run dev

FRONTEND :-

```powershell
cd frontend
npm install
npm run dev

frontend stripe :-
/frontend/src/components/CartsPage.jsx  ---> stripePromise = loadStripe(Replace with your stripe publishable key);


.env Setup  :-
STRIPE_SECRET=your_stripe_secret_key_here