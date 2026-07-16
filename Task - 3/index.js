import express from 'express'
const app = express()
const port = 3000
import RegistrationRoute from "./routes/Registration.route.js"
import EventRoute from './routes/event.route.js'
import ConnectDB from './DB.js'
import dotenv from "dotenv";
dotenv.config();
import Registration from './models/Registration.js' 
import MyRegisters from './routes/Myregister.route.js'
import AutoFilleventInfo from './routes/AutoFillEvent.route.js'
import deleteEvent from './routes/deleteEvent.route.js'
import UpdateUser from './routes/UpdateUser.route.js'

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

// if you use ejs then you must use this  
app.set('view engine','ejs');
app.set('views', './views');

ConnectDB()

app.use('/Registration/event', RegistrationRoute);
app.use('/Registration/edit', AutoFilleventInfo);
app.use('/Registration/delete', deleteEvent);
app.use('/Registration/update', UpdateUser);


app.use('/events',EventRoute);


app.use('/home',(req,res)=>{
    res.render("home")
})

app.use('/events',(req,res)=>{
    res.render("Events")
})


app.use('/about',(req,res)=>{
    res.render("About")
})
app.use('/contact',(req,res)=>{
    res.render("Contact")
})


app.use('/event', MyRegisters);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})