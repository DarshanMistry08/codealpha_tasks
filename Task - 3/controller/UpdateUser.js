import Registration from "../models/Registration.js";

async function UpdateUserInfo(req, res) {
    try {
        const { name, email, number, age, address, city, state, education, college, semester, post, event, date_of_birth, role } = req.body
        const updateUser = await Registration.findByIdAndUpdate(req.params.id, {
            personalInfo: {
                name, email, number, age, address, city, state,
            },
            collegeInfo: {
                education, college, semester, post,
            },
            eventInfo: {
                event, date_of_birth, role,
            }
        }, { new: true });
        console.log("User Updated Successfully");
        res.redirect('http://localhost:3000/home')

    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
}


export default UpdateUserInfo;