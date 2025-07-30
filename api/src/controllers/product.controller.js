import Product from "../models/products.model.js"


// Products API.

const getAllProduct = async (req,res) =>{
    try{
        const allProducts = await Product.find();
        return res.status(200).json({
            status:'success',
            data:allProducts,
            message:'👌✌️ Product retrived Successfully. ❤️🤣'
        });
    }
    catch(err){
        return res.status(500).json({
            status:'error',
            data:err,
            message:'❌🤦‍♀️ something went wrong. products retrival failed. 🤦‍♀️🤦‍♂️'
        });
    }
}

const getProductById = (req,res)=>{
    try{
        const productId = req.params.id;
        const product = Product.findById(productId);
        if(!product){
            return res.status(404).json({
                status:'failure',
                message:`🤦‍♂️🤦‍♂️ product not found with id ${productId} ❌❌`
            });
        }
        return res.status(200).json({
            status:'success',
            data:product,
            message:'😂🤫 product retrived succesfully. 👌😍'
        });
    }catch(err){
        return res.status(500).json({
            status:'error',
            data:err,
            message:`🤦‍♂️🤦‍♂️ something went wrong. product retrival failed. ❌❌😢`
        });
    }
}

const createProduct = async (req,res)=>{
    try{  
        const productData = req.body;
        const products = await Product.create(productData);
        if(!products){
            return res.status(500).json({
                status:'failure',
                message:'😢🤦‍♂️ prodcuct creation failed. try again.🤦‍♂️'
            });
        }
        return res.status(201).json({
            status:'success',
            data:products,
            message:'🤣😍 prodcuct created successfully.✌️'
        });
    }
    catch(err){
        return res.status(500).json({
            status:'failure',
            data:err,
            message:'😢🤦‍♂️ something went wrong, prodcuct creation failed, try again.🤦‍♂️'
        });
    }
}

const updateProduct = async (req,res)=>{
    const productId = req.params.id;
    try{
        const productData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(productId,productData,{new:true});
        if(!updatedProduct){
            return res.status(500).json({
                status:'failure',
                message:'🤦‍♂️🤦‍♂️ product update failed. 😢❌'
            });
        }
        return res.status(200).json({
            status:'success',
            data:updatedProduct,
            message:'😂🤫 product retrived succesfully. 👌😍'
        });
    }
    catch(err){
        return res.status(500).json({
            status:'error',
            data:err,
            message:'🤦‍♂️🤦‍♂️  something went wrong, product updation failed. 😢❌'
        });
    }
     
}

const deleteProduct = async (req,res)=>{
    const productId = req.params.id;
    try{
        const product = await Product.findByIdAndDelete(productId);
        if(!product){
            return res.status(500).json({
                status:'failure',
                message:'🤦‍♂️🤦‍♂️ product delete failed. 😢❌'
            });
        }
        return res.status(200).json({
            status:'success',
            data:product,
            message:'😂🤫 product retrived succesfully. 👌😍'
        });
    }
    catch(err){
        return res.status(500).json({
            status:'error',
            data:err,
            message:'🤦‍♂️🤦‍♂️  something went wrong, product deletion failed. 😢❌'
        });
    }
}

export{
    getAllProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}