import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        required: true
    },
    stocks:{
        type:Number,
        required:true
    },
    productImages:{
        type:Array
    },
    category:{
        type:String
    }
},{
    timestamps:true
});



const Product = mongoose.model('Product',ProductSchema);


export default Product;