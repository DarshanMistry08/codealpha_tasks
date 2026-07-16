import Event from "../models/Event.js";
import Registration from "../models/Registration.js";


async function AutoFilleventInfo(req, res) {
    // return res.send("hey i am on editing page")

    try {
        const registrations = await Registration.findById(req.params.id)
        // console.log(registrations)

        const events = await Event.find()

        res.render("Registration", {
            registrations,
            event: null,
            events
        })

    } catch (error) {

        console.log(error)
    }
}


export default AutoFilleventInfo;