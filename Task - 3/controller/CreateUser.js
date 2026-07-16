import Registration from "../models/Registration.js";

async function CreateUser(req, res) {
    console.log(req.body);
    console.log(req.body.event);
    try {
        const { name, email, number, age, address, city, state, education, college, semester, post, event, date_of_birth, role } = req.body
        console.log(req.body)
        console.log("Event value:", event);
        const user = await Registration.create({
            personalInfo: {
                name, email, number, age, address, city, state,
            },
            collegeInfo: {
                education, college, semester, post,
            },
            eventInfo: {
                event, date_of_birth, role,
            }
        });
        console.log("User Created Successfully")
        return res.redirect("/home");

    } catch (error) {

        console.error("Error in Creating User:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: error.message
        });
    }

}

export default CreateUser;