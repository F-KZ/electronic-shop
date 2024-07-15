import connectDatabase from "./db/database.js";
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import path from 'path'
import { fileURLToPath } from 'url';

// __filename and __dirname equivalents for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file located at project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

connectDatabase()
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from these origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}))

//Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes);


// Static folder
//app.use('/data/images', express.static('/data/images'));


app.get('/', (req, res) => {
    res.send('Api is running...')
})

app.get('/fausseRoute', (req, res) => {
    res.send('juste pour voir si ça marche...')
})


const port = 3001
app.listen(port, () => {
    console.log(`server on http://localhost:${port}/`);
    console.log(process.env.TOKEN_SECRET)

})