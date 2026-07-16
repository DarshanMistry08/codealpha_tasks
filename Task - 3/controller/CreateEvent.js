import Event from "../models/Event.js";
async function createEvent(req, res) {
    try {

        const event = await Event.create({
            eventName: "Web Development Workshop",
            description: "Learn MERN Stack from scratch",
            date: "2026-06-25",
            location: "Ahmedabad",
            organizer: "GLS University"

        })
        console.log(event)
        res.send("event created successfully ")

    } catch (error) {
        console.error(error)
        res.send(error.message);

    }
}

export default createEvent