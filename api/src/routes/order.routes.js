import { Router } from "express";
import Auth from'../middleware/auth.middleware.js';
import { checkOut, createOrder, getAllOrder } from "../controllers/order.controller.js";
const routes = Router();


routes.route('/placeOrder').post(Auth,createOrder);
routes.route('/checkout/:id').post(Auth,checkOut);
routes.route('/allOrder').get(Auth, getAllOrder);


export default routes;