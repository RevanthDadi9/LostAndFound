import User from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";

const secretKey = process.env.JWT_SECRET;

const generateWebToken = (id) => {
    const token = jwt.sign({ id }, secretKey, {
        expiresIn: "24h"
    });

    return token;
}

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    }
});

export const upload = multer({ storage: storage }).single("image"); 

const handleUserSignUp2 = async (req, res) => {
    try {
        const userData = req.body;
        const existingUser = await User.findOne({ email: userData.email });

        if (existingUser) {
            return res.status(409).send({ message: "Email already in use" });
        }

          

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const imageFile = req.file;
        const imagePath = imageFile ? imageFile.filename: "No Image"; 

        const user = new User({ ...userData, password: hashedPassword, img: imagePath });
        await user.save();

        const token = generateWebToken(user._id);

        res.status(201).send({ message: "Signup Success!", token, userId: user._id, userName: user.firstname, userImage: user.img });
    } catch (error) {
        console.error("Sign-up error:", error);
        res.status(500).send({ message: "Server error" });
    }
};

export default handleUserSignUp2;