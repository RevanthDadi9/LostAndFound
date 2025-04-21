import User from "../../models/user.js";

const handleGetUserDetailsById = async (req, res) => {
    const { id } = req.params;

    const userData = await User.findOne({ _id: id });
    if(!userData) {
        return res.send({ message: "Invalid Id "});
    }

    res.send({ userData });
}

export default handleGetUserDetailsById;