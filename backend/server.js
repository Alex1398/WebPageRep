import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './Routes/productRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import orderRoutes from './Routes/orderRoutes.js'
import uploadRoutes from './Routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'


dotenv.config()

connectDB()

const app = express()

// Accept json data in the body
app.use(express.json())


app.get('/', (req, res) => {
    res.send('API is running......')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => 
    res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// custom error handler for any non-existent routes
app.use(notFound)
// custom error handler for any existing routes with bad format
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT , console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))
