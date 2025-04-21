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

const handleUserSignIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user){
        return res.send({ message: "Email not found"});
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword){
        return res.send({ message: "Invalid Password"});
    }

    const token = generateWebToken(user._id);
    res.send({ message: "Login Success!", token, userId: user._id, userName: user.firstname, userImage: user.img });
}

export default handleUserSignIn;