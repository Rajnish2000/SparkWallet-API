import { Router } from "express";
import { createProduct, deleteProduct, getAllProduct, getProductById, updateProduct } from "../controllers/product.controller.js";
import Auth from'../middleware/auth.middleware.js';
import orderRoutes from './order.routes.js';
const routes = Router();

// product api routes.

routes.route('/allProduct').get(Auth,getAllProduct);
routes.route('/create').post(Auth,createProduct);
routes.route('/update/:id').patch(Auth,updateProduct);
routes.route('/product/:id').get(Auth,getProductById);
routes.route('/delete/:id').delete(Auth,deleteProduct);

routes.use('/order',orderRoutes);


export default routes;