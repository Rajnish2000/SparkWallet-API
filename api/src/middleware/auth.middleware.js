import jwt from 'jsonwebtoken';
import User from '../models/users.model.js';
const secretKey = "jlfkjlksdfjlkfja;lkfjadsl;kf";
const Auth = async (req,res,next) => {
    try{
        const token = req.headers['authorization'].split(' ')[1];
        const decodedData = jwt.verify(token, secretKey);
        console.log(decodedData);
        if(!decodedData){
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized access. Invalid token.'
            });
        }
        const userData = await User.findById(decodedData.id);
        if(!userData){
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized access. login with correct Credential for Access.'
            });
        }
        req.userId = decodedData.id;
        next();
    }
    catch(err){
        return res.status(500).json({
            status: 'error',
            message: '🤦‍♀️Something went wrong! authorization failed.'
        });
    }
}


export default Auth;