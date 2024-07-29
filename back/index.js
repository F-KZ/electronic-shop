import connectDatabase from "./db/database.js";
import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
//import path from 'path'
//import { fileURLToPath } from 'url';
const app = express();
// __filename and __dirname equivalents for ESM
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

// Load environment variables from .env file located at project root
dotenv.config(/*{ path: path.resolve(__dirname, '../.env') }*/);

connectDatabase()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
// CORS configuration
//const allowedOrigins = ['https://electronic-shop-back.vercel.app', 'http://localhost:5173'];
app.use(cors());

//Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);


// Static folder
//app.use('/data/images', express.static('/data/images'));


app.get('/', (req, res) => {
    res.send('Api is running...')
})

app.get('/', function (req, res) {
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)
  
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)
  })
  


app.get('/api/config/paypal', (req,res) => res.send({
    cliendId : process.env.PAYPAL_CLIENT_ID
}))


app.use(notFound);
app.use(errorHandler);

const port = 3001
app.listen(port, () => {
    console.log(`server on http://localhost:${port}/`);
  
   // console.log(process.env.TOKEN_SECRET)

})