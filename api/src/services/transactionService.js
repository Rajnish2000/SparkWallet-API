import Transaction from "../models/transaction.model.js";
import Wallet from '../models/wallet.model.js';

const createTransaction = async (transactionData,wid) => {
    let transactionsData = {...transactionData,walletId:wid};
    const transaction = await Transaction.create(transactionsData);
    console.log(transaction);
    if(!transaction){
        throw new Error('🤦‍♂️ Tansaction failed. Try Again. ❌🤦‍♀️');
    }
    let wallet;
    if(transaction.transactionType == 'debit'){
        wallet = await Wallet.findByIdAndUpdate(wid,{$inc:{walletAmount:-transaction.transactionAmount},$push:{transactionHistory:transaction.id}},{new:true});
    }
    else if(transaction.transactionType == 'credit'){
        wallet = await Wallet.findByIdAndUpdate(wid,{$inc:{walletAmount:transaction.transactionAmount},$push:{transactionHistory:transaction.id}},{new:true});
    }
    console.log('wallet : ',wallet);
    if(!wallet){
        await Transaction.findByIdAndDelete(transaction.id);
        // return res.status(500).json({
        //     status:'failure',
        //     message:'🤦‍♂️ wallet tansaction failed. Try Again. ❌🤦‍♀️'
        // });
        throw new Error("🤦‍♂️ wallet tansaction failed. Try Again. ❌🤦‍♀️");
        
    }
    return transaction;
}



export{
    createTransaction
}