import User from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = "$piderman123";

const generateWebToken = (id) => {
    const token = jwt.sign({ id }, secretKey, {
        expiresIn: "24h"
    });

    return token;
}

const handleUserSignUp = async (req, res) => {
    try {
        const userData = req.body;
        
        const existingUser = await User.findOne({ email: userData.email });

        if (existingUser) {
            return res.status(409).send({ message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const user = new User({ ...userData, password: hashedPassword });
        await user.save();

        const token = generateWebToken(user._id);

        res.status(201).send({ message: "Signup Success!", token, userId: user._id, userName: user.firstname, userImage: user.img });
    } catch (error) {
        console.error("Sign-up error:", error);
        res.status(500).send({ message: "Server error" });
    }
};

export default handleUserSignUp;