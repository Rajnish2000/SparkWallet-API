import mongoose from "mongoose";
const Schema = mongoose.Schema;


const OrderSchema = new Schema({
    orderUserId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    orderedProducts:[
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    totalPrice:{
        type:Number
    },
    totalItems:{
        type:Number
    },
    status:{
        type:String,
    }
},{
    timestamps:true
});


const Order = mongoose.model('Order',OrderSchema);


export default Order;