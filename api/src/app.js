import express from 'express';
const port = 3000;
import connectDB from './db/connection.js';
import UserRoutes from './routes/users.routes.js';
import ProductRoutes from '../src/routes/product.routes.js';
import WalletRoutes from '../src/routes/wallet.routes.js';


const app = express();
app.use(express.json());

app.use('/api/v1/users/',UserRoutes);
app.use('/api/v1/products/',ProductRoutes);
app.use('/api/v1/wallets/',WalletRoutes);


const startServer = async () =>{
  try{
    await connectDB();
    app.listen(port, () => {
      console.log(`👌😊Server is running on port ${port}🤫`);
    });
  }catch(err){
    console.log(`🤦‍♀️ server failed ! something went wrong.🤦‍♂️`);
  }
}


await startServer();














