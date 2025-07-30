import mongoose from "mongoose";
const Schema = mongoose.Schema;


const TransactionSchema = new Schema({
    walletId:{
        type:Schema.Types.ObjectId,
        ref:'Wallet'
    },
    transactionAmount:{
        type:Number
    },
    transactionType:{
        type:String,
    },
    transactionReason:{
        type:String
    }
},{
    timestamps:true
});


const Transaction = mongoose.model('Transaction',TransactionSchema);


export default Transaction;