// main.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import productRouter from './routes/product.routes.js';
import orderRouter from './routes/order.routes.js';
import cartsRouter from './routes/carts.routes.js';

import stripeRouter from './routes/Stripecheckout.routes.js';

import dotenv from 'dotenv';
dotenv.config();




const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());


// Enable CORS for requests from the frontend on localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',  // Adjust the origin to match your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// MongoDB connection string (replace with your actual URI)
const MONGO_URI = 'mongodb://localhost:27017/satish-mern-stripe'; // or use MongoDB Atlas URI

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('server Connected to ',MONGO_URI);
}).catch(err => {
  console.error(' MongoDB connection error:', err);
});



// Routes 
app.get('/', (req, res) => {
  res.send('Hello WORLD!');
});

app.use('/',productRouter)
app.use('/',orderRouter)
app.use('/',cartsRouter)

app.use('/', stripeRouter);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

