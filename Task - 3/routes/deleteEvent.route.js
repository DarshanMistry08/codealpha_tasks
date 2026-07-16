import express from 'express';
import {Router} from 'express';
const  router = express.Router();
import Registration from '../models/Registration.js';

router.get('/:email',async (req,res)=>{

    const registrations = await Registration.findOneAndDelete({
    "personalInfo.email": req.params.email
});
    res.redirect("/home");
    // res.send("i will going to delete ")
})

export default router;