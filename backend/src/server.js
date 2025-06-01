import dotenv from 'dotenv';
dotenv.config()
import express from 'express' 
import cors from 'cors'
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db.js'
import { setupAssociations } from './models/associations.js'
import productRouter from './routes/ProductRouter.js'
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import authRouter from './routes/authRouter.js'
import categoryRouter from './routes/categoryRouter.js'


const app = express()

app.use(cors())

app.use(morgan('dev'))

app.use(express.json())

async function connectDB(){
    try {
        await db.authenticate()
        console.log(colors.blue.bold('Conexion exitosa a la base de datos'))
        setupAssociations()
        await db.sync({force: true})
        
    } catch (error) {
        console.log(error)
        console.log(colors.red.bold('Falló la conexión a la base de datos'))
    }
}

connectDB()

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/auth', authRouter)
app.use('/api/categories', categoryRouter)



export default app