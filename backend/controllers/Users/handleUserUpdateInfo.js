import User from "../../models/user.js";

const handleUserUpdateInfo = async (req, res) => {
    const { id } = req.params;
    const newInfo = req.body;

    const imageUrl = req.file?.path;

    const updateData = { ...newInfo, img: imageUrl };

    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            updateData,
            { new: true }
        );

        if (updatedUser) {
            return res.send({ message: "User information updated successfully!" , userImage: imageUrl});
        }

        res.send({ message: "User info is not updated" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred while updating user info" });
    }
}

export default handleUserUpdateInfo;
