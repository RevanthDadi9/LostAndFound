import User from "../../models/user.js";

const handleGetUserDetails = async (req, res) => {
    const userDetails = await User.find({});

    if(!userDetails){
        res.send({ message: "The database is empty "});
    };

    res.json({ userDetails });
}

export default handleGetUserDetails;