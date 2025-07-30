import User from "../models/users.model.js";
import Wallet from "../models/wallet.model.js";
import { createTransaction } from "../services/transactionService.js";


// wallet API.

const walletIntialized = async (res,uid) =>{
    try{
        const money = {walletAmount:50,walletUserId:uid};
        const wallet = await Wallet.create(money);
        console.log('wallet ',wallet);
        if(!wallet){
            return res.status(404).json({
                status:'failure',
                message:'🤦‍♀️🤦‍♀️ wallet create failed. ❌😢'
            });
        }
        const updatedDetails = await User.findByIdAndUpdate(uid,{wallet:wallet},{new:true});
        if(!updatedDetails){
            console.log('wallet not updated in user');
            return res.status(404).json({
                status:'failure',
                message:'🤦‍♀️🤦‍♀️ user wallet updation failed. ❌😢'
            });
        }
    }
    catch(err){
        return res.status(500).json({
            status:'error',
            data:err,
            message:`🤦‍♂️🤦‍♂️ something went wrong. wallet Initialization failed. ❌❌😢`
        });
    }
}

const getWalletBalance = async (req,res) =>{
    try{
        const wid = req.params.id;
        const balance = await Wallet.findById(wid);
        if(!balance){
            res.status(500).json({
                status:'error',
                message:`🤦‍♂️🤦‍♂️ balance not found. ❌❌😢`
            });
        }
        return res.status(200).json({
            status:'success',
            data:balance,
            message:`Your current Balance in wallet. 😍🤫👌😊`
        });
    }
    catch(err){
        return res.status(500).json({
            status:'error',
            data:err,
            message:`🤦‍♂️🤦‍♂️ something went wrong. wallet balance not found. ❌❌😢`
        });
    }

}



const addMoneyToWallet = async (req,res) =>{
    try{
        const money = req.body.walletAmount;
        const wId = req.params.id;
        // const updateWallet = await Wallet.findByIdAndUpdate(wId,{$inc:{walletAmount:money}},{new:true});
        let transactionData = {
            transactionAmount:money,
            transactionType:"credit",
            transactionReason:"add money to my wallet. I have to buy something."
        }
        const transaction = await createTransaction(transactionData,wId);
        console.log(transaction);
        if(!transaction){
            return res.status(404).json({
                status:'failure',
                message:'🤦‍♀️🤦‍♀️ wallet update failed. ❌😢'
            });
        }
        return res.status(201).json({
            status:'success',
            data:transaction,
            message:`money added to wallet successfully. 😍🤫👌😊`
        });
    }
    catch(err){
        return res.status(500).json({
            status:'error',
            data:err,
            message:`🤦‍♂️🤦‍♂️ something went wrong. adding money to  wallet failed. ❌❌😢`
        });
    }
}




export{
    walletIntialized,
    addMoneyToWallet,
    getWalletBalance
}