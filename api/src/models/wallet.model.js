
import mongoose from "mongoose";
const Schema = mongoose.Schema;


const WalletSchema = new Schema({
    walletAmount:{
        type:Number,
        default:0
    },
    walletUserId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    transactionHistory:{
        type:[Schema.Types.ObjectId],
        ref:'Transaction'
    }
},{
    timestamps:true
});


const Wallet = mongoose.model('Wallet',WalletSchema);


export default Wallet;

