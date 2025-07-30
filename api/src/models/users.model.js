import mongoose from 'mongoose';
const Schema = mongoose.Schema;



const UserSchema = new Schema({
    username:{
        type: String,
        required:true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    profile_pic:{
        type: String
    },
    gender:{
        type: String,
    },
    mobile:{
        type: Number,
    },
    address:{
        type: String,
    },
    wallet:{
        type:Schema.Types.ObjectId,
        ref:'Wallet'
    },
    purchaseHistory:{
        type:[Schema.Types.ObjectId],
        ref:'Order'
    }
},{
    timestamps: true
});


const User = mongoose.model('User', UserSchema);



export default User;