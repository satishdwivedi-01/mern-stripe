// routes/orderRoutes.js
import express from 'express';
import {
  storeOrder
} from '../controllers/order.controller.js';

const orderRouter = express.Router();

orderRouter.post('/api/store-order', storeOrder);

export default orderRouter; 

