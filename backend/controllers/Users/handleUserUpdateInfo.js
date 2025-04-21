import User from "../../models/user.js";

const handleUserUpdateInfo = async (req, res) => {
    const { id } = req.params;
    const newInfo = req.body;

    const updateUser = await User.findOneAndUpdate({ _id: id }, newInfo, {
        new: true
    });

    if(updateUser){
        return res.send({ message: "user Information Updated"});
    }

    res.send({message: "User Info is not updated"});

}

export default handleUserUpdateInfo;