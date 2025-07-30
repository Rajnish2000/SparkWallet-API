import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'api/uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + '_' + file.originalname);
    }
});

const uploadStorage = multer({storage:storage,limits:{fileSize:3*1024*1024},fileFilter:(req,file,cb)=>{
    const allowedTypes = 'jpeg|jpg|png';
    const exten = path.extname(file.originalname).toLowerCase();
    console.log('exten',exten,allowedTypes);
    if(allowedTypes.split('|').includes(exten.substring(1))){
        cb(null,true);
    }else{
        cb(new Error('Only image of jpeg,jpg,png types allowed to store.'));
    }
}});

export default uploadStorage;