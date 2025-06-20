// routes/cartsRoutes.js
import express from 'express';
import { createCart,getCart, addProductToCart} from '../controllers/cart.controller.js';

const cartsRouter = express.Router();


cartsRouter.post('/createCart', createCart);
cartsRouter.get('/getCart', getCart);
cartsRouter.post('/addProductToCart', addProductToCart);

export default cartsRouter;