import express from 'express'
import { PORT } from './config/config.js'
import authRoutes from './routes/auth.routes.js'
import { connectDB } from './config/db.js'

const app = express()

connectDB()

app.use(express.json())
app.use('/api/auth', authRoutes)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
