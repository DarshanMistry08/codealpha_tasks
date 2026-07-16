import express from 'express'
import { Router } from 'express'
import CreateUser from '../controller/CreateUser.js';
import createEvent from '../controller/CreateEvent.js';
import Event from '../models/Event.js'

const router = express.Router();

router.get('/', async (req, res) => {

    const events = await Event.find();

    res.render("Registration", { event: null, events, registrations: {} });

});


router.get('/:id', async (req, res) => {

    const event = await Event.findById(req.params.id);

    res.render("Registration", { event, events: [],registrations: {} });

});



// optinal 
router.post('/',CreateUser)
router.get("/create-event", createEvent);


export default router;


