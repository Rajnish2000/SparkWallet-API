// import Order from "../models/order.model.js";
import Order from "../models/order.model.js";
import Product from "../models/products.model.js";
import User from "../models/users.model.js";
import { createTransaction } from "../services/transactionService.js";


// Order API :

const createOrder = async (req,res) =>{
    const userId = req.userId;
    try{
        let {orderedProducts} = req.body;
        let totalPrice = 0,totalItems = 0;
        console.log(orderedProducts);
        for(let order of orderedProducts){
            let {price} = await Product.findOne({_id:order.product}).select('price');
            console.log(price);
            totalPrice += price*order.quantity;
            totalItems += order.quantity;
        }
        console.log(totalItems,totalPrice);
        let orderData = {orderedProducts,orderUserId:userId,totalPrice,totalItems,status:'created'};
        console.log(orderData);
        const placedOrder = await Order.create(orderData);
        if(!placedOrder){
            return res.status(404).json({
                status:'failure',
                message:`🤦‍♂️🤦‍♂️ ordering products failed. ❌❌`
            });
        }
        console.log(placedOrder);
        for(let order of orderedProducts){
            await Product.findByIdAndUpdate(order.product,{$inc: {stocks:-order.quantity}},{new:true});
        }
        return res.status(200).json({
            status:'success',
            data:placedOrder,
            message:'👌✌️ Order Created Successfully. ❤️🤣'
        });
    }
    catch(err){
        return res.status(500).json({
            status:'error',
            data:err,
            message:'something went wrong. placing order failed.🤦‍♂️🤦‍♀️❌'
        });
    }
}


const getAllOrder = async (req,res) =>{
    try{
        const userId = req.userId;
        const orderList = await Order.find({orderUserId:userId});
        console.log(orderList);
        return res.status(200).json({
            status:'success',
            data:orderList,
            message:'👌✌️ your order List are here. ❤️🤣'
        });
    }
    catch(err){
        return res.status(500).json({
            status:'error',
            data:err,
            message:'something went wrong. order list found.🤦‍♂️🤦‍♀️❌'
        });
    }
}




const checkOut = async (req,res) =>{
    try{
        const orderId = req.params.id;
        let {totalPrice} = await Order.findById(orderId).select('totalPrice');
        const {wallet} = await User.findById(req.userId).populate('wallet').select('wallet');
        console.log(wallet.walletAmount);
        if(totalPrice > wallet.walletAmount){
            return res.status(500).json({
                status:'failure',
                data: {currentWalletAmount:wallet.walletAmount,requiredAmount:totalPrice-wallet.walletAmount,totalPrice},
                message:`👌✌️ InSufficient balance to your wallet. Add ${totalPrice-wallet.walletAmount} amount to your wallet. . ❤️🤣`
            });
        }
        const result = await Order.findByIdAndUpdate(orderId,{status:'completed'},{new:true});
        console.log('object',result);
        await User.findByIdAndUpdate(req.userId,{$push: {purchaseHistory:orderId}},{new:true});
        let transactionData = {
            transactionAmount:totalPrice,
            transactionType:"debit",
            transactionReason:"I purchased some products."
        }
        const transaction = await createTransaction(transactionData,wallet.id);
        if(!transaction){
            return res.status(500).json({
                status:'failure',
                message:`👌✌️ something went wrong, transaction failed. ❤️🤣`
            });
        }
        return res.status(201).json({
            status:'success',
            data:transaction,
            message:'👌✌️ Payment done Successfully. ❤️🤣'
        });
    }
    catch(err){
         return res.status(500).json({
            status:'error',
            data:err,
            message:'something went wrong. payment failed.🤦‍♂️🤦‍♀️❌'
        });
    }
}


export{
    createOrder,
    checkOut,
    getAllOrder
}