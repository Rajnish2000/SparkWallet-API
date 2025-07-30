import mongoose from "mongoose";

const db_url = "mongodb://localhost:27017/myuserdb";


const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(db_url);
        console.info(`😂🤫Database connected Successfully: ${connectionInstance.connection.host}👌✌️`);
    }
    catch(err){
        console.error(`😢😢Error connecting to the database: ${err.message}`);
    }
};


export default connectDB;
