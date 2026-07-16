import express from 'express'
import morgan from 'morgan';
import AuthRouter from '../src/routes/Auth.route.js';
import MenuRouter from '../src/routes/Menu.route.js';
import cookieParser from 'cookie-parser'


const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())


app.use('/api/auth', AuthRouter)

// For Menu
app.use('/api/v1', MenuRouter)



export default app;