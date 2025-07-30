import Router from 'express';
import { getAllUsers,createUser,getUserById,deleteUserById,updateUserById,loginUser,updateProfile } from '../controllers/users.controller.js';
const routes = Router();
import Auth from '../middleware/auth.middleware.js';
import uploadStorage from '../utils/fileStorage.js';

routes.get('/allUser', Auth, getAllUsers);
routes.get('/user/:id',Auth, getUserById);
routes.post('/registerUser',createUser);
routes.post('/loginuser',loginUser);
routes.patch('/updateUser/:id', Auth, updateUserById);
routes.delete('/deleteUser/:id',Auth, deleteUserById);
routes.patch('/profileUpdate/:id',Auth, uploadStorage.single('imagefile'), updateProfile);


export default routes;

