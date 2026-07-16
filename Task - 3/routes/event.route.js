import express from "express";
import createEvent from "../controller/CreateEvent.js";
const router = express.Router();
import Event from "../models/Event.js";


// router.get("/create-event", createEvent);

// for get all events 
router.get("/",async (req,res)=>{
    const events = await Event.find();
    
    res.render("Events",{events})
});


export default router;