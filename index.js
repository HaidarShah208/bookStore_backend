import express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { connectDB } from "./db/db.js";
import userRoutes from './routes/user.route.js'
import bookRoutes from './routes/book.route.js'
import orderRoutes from './routes/order.route.js'

dotenv.config();

const port = Number(process.env.PORT) || 3000;
const mongodbUrl = process.env.MONGODB_URI;

connectDB(mongodbUrl)
const app= express();
app.use(cors({
  origin:'https://book-store-backend-gamma-neon.vercel.app',
  credentials: true
}
))
app.use(express.json());
app.use(cookieParser())

app.get('/', (req, res) =>{
    res.send('Hello, World!')
})

app.use('/api/v1',userRoutes)
app.use('/api/v1',bookRoutes)
app.use('/api/v1',orderRoutes)

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });

export default app