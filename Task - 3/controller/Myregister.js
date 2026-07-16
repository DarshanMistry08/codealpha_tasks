import Registration from "../models/Registration.js";
import Event from '../models/Event.js'

async function FindEventRegister(req, res) {
    try {

        // const event = await Event.find();
        // const event = await Event.find()

        // console.log("controller hit")
        const email = req.query.search;
        // console.log(email)
        if (!email) {
            return res.render("MyRegisters", {
                // event,
                registrations: [],
                message: "Please enter an email"
            });
        }

        const registrations = await Registration.find({ "personalInfo.email": email});
        console.log(registrations)
        if (registrations.length === 0) {
            return res.render("MyRegisters", {
                // event,
                registrations: [],
                message: "No registrations found Pl ease Register First "
            });
        }

        res.render("MyRegisters", {
            // event,
            registrations,
            message: null
        });

    } catch (error) {
        console.log(error);

        res.status(500).send("Server Error");
    }
}

export default FindEventRegister;