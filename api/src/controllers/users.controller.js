import User from "../models/users.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { walletIntialized } from "./wallet.controller.js";

const secretKey = "jlfkjlksdfjlkfja;lkfjadsl;kf";

const loginUser = async (req,res)=>{
    const data = req.body;
    try{
        const userData = await User.findOne({email: data.email});    
        if(!userData){
            return res.status(404).json({
                status:"error",
                message:'Invalid credintial.'
            });
        }
        console.log(userData);
        if(!await bcrypt.compare(data.password, userData.password)){
            return res.status(404).json({
                status:"error",
                message:'Invalid credintial does not matched.'
            });
        }
        const token = jwt.sign({id: userData._id},secretKey, {expiresIn: '1h'});
        console.log(token);
        return res.status(200).json({
            status: 'success',
            data: token,
            message: '👌✌️😊User logged in successfully.'
        });
    }catch(err){
        return res.status(500).json({
            status: 'error',
            data:err,
            message: '🤦‍♀️Something went wrong while logging in.'
        });
    }
}




const getAllUsers = async (req,res) =>{
    try{
        const users = await User.find();
        return res.status(200).json({
            status: 'success',
            data: users,
            message: '👌✌️😊All users retrieved successfully.'
        });
    }catch(err){
        return res.status(500).json({
            status: 'error',
            data:err,
            message: '🤦‍♀️Something went wrong while retrieving users.'
        });
    }
}

const createUser = async (req, res) => {
    const userData = req.body;
    let password = userData.password;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUserData = {...userData, password: hashPassword};
    try {
        const newUser = await User.create(newUserData);
        
        await walletIntialized(res,newUser.id);
        return res.status(201).json({
            status: 'success',
            data: newUser,
            message: '👌✌️😊User created successfully.'
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            data:err,
            message: '🤦‍♀️Something went wrong while creating user.'
        });
    }
}

const getUserById = async (req,res) =>{
    const userId = req.params.id;
    console.log(userId);
    try{

        const user = await User.findById(userId);
        console.log(user);
        if(!user){
            return res.status(404).json({
                status: 'error',
                message: '🤦‍♂️User not found.'
            });
        }
        return res.status(200).json({
            status: 'success',
            data: user,
            message: '👌✌️😊User retrieved successfully.'
        });
    }catch(err){
        res.status(500).json({
            status: 'error',
            data:err,
            message: '🤦‍♀️Something went wrong while retrieving user.'
        });
    }
}

const updateUserById = async (req,res) => {
    const userId = req.params.id;
    const userData = req.body;
    try{
        if(req.userId !== userId){
            return res.status(401).json({
                status:'failure',
                message:'you are not a valid user to update this record.'
            });
        } 
        const updateUserData = await User.findByIdAndUpdate(userId, userData,{new: true});
        if(!updateUserData){
            return res.status(404).json({
                status: 'error',
                message: `🤦‍♂️User id ${userId} does not exist.`
            });
        }
        return res.status(201).json({
            status: 'success',
            data: updateUserData,
            message: '👌✌️😊User data updated successfully.'        
        });
    }catch(err){
        return res.status(500).json({
            status: 'error',
            data:err,
            message: '🤦‍♀️Something went wrong while updating user data.'
        })
    }
}
    
    
const deleteUserById = async (req,res) =>{
    const userId = req.params.id;
    console.log(userId);
    try{
        if(req.userId !== userId){
            return res.status(401).json({
                status:'failure',
                message:'you are not a valid user to delete this record.'
            });
        } 
        const user = await User.findByIdAndDelete(userId);
        console.log(user);
        if(!user){
            return res.status(404).json({
                status: 'error',
                message: `🤦‍♂️User id ${userId} does not exist.`
            });
        }
        return res.status(200).json({
            status: 'success',
            message: '👌✌️😊User deleted successfully.'
        });
    }
    catch(err){
        return res.status(500).json({
            status: 'error',
            data:err,
            message: '🤦‍♀️Something went wrong while deleting user data.'
        });
    }
}

const updateProfile = async (req,res)=>{
     const userId = req.params.id;
     console.log(req.file);
     try{
         if(req.userId !== userId){
             return res.status(401).json({
                 status:'error',
                 message:'can not update unauthorized Access.😊🤦‍♀️🤦‍♂️'
                });
        }
        const updatedProfile = await User.findByIdAndUpdate(userId,{profile_pic:req.file.path},{new: true});
        return res.status(201).json({
            status:'success',
            data: updatedProfile,
            message:'proflie Image uploaded Succesfully.😂🤣🤫👌✌️'
        });
    }
    catch(err){
        return res.status(500).json({
            status:'error',
            data:err,
            message:'something went wrong. Profile image upload failed.🤦‍♂️🤦‍♀️❌'
        });
    }
}



export {
    getAllUsers,
    createUser,
    getUserById,
    deleteUserById,
    updateUserById,
    loginUser,
    updateProfile
}
