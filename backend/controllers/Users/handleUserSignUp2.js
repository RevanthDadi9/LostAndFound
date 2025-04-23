import User from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

const generateWebToken = (id) => {
    const token = jwt.sign({ id }, secretKey, {
        expiresIn: "24h"
    });

    return token;
}

const handleUserSignUp2 = async (req, res) => {
    try {
        const userData = req.body;
        const existingUser = await User.findOne({ email: userData.email });

        if (existingUser) {
            return res.status(409).send({ message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const imageUrl = req.file?.path || "https://icon2.cleanpng.com/20190702/jv/kisspng-computer-icons-portable-network-graphics-avatar-tr-clip-directory-professional-transparent-amp-png-1713882841073.webp";

        const user = new User({ ...userData, password: hashedPassword, img: imageUrl });
        await user.save();

        const token = generateWebToken(user._id);

        res.status(201).send({
            message: "Signup Success!",
            token,
            userId: user._id,
            userName: user.firstname,
            userImage: imageUrl
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).send({ message: "Server error", error: error.message });
    }
};

export default handleUserSignUp2;