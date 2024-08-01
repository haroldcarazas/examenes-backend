import express from 'express'
import { PORT } from './config/config.js'
import authRoutes from './routes/auth.routes.js'
import examenesRoutes from './routes/examenes.routes.js'
import { connectDB } from './config/db.js'

const app = express()

connectDB()

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/examenes', examenesRoutes)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
