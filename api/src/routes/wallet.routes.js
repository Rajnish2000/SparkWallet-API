import { Router } from "express";
import Auth from '../middleware/auth.middleware.js';
import { addMoneyToWallet, getWalletBalance } from "../controllers/wallet.controller.js";

// wallet api routes;

const routes = Router();

routes.route('/addmoney/:id').patch(Auth,addMoneyToWallet);
routes.route('/getbalance/:id').get(Auth,getWalletBalance);

export default routes;