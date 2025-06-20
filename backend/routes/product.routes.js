// routes/productRoutes.js
import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,

} from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.get('/getAllProducts', getAllProducts);
productRouter.get('/getProductById/:id', getProductById);
productRouter.post('/createProduct', createProduct);

export default productRouter;
