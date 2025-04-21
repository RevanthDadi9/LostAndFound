const handleUserSignUp2 = async (req, res) => {
    try {
        console.log("SIGNUP REQUEST BODY:", req.body);
        console.log("FILE:", req.file);

        const userData = req.body;
        const existingUser = await User.findOne({ email: userData.email });

        if (existingUser) {
            return res.status(409).send({ message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const imageFile = req.file;
        const imagePath = imageFile ? imageFile.path : "No Image";

        const user = new User({ ...userData, password: hashedPassword, img: imagePath });
        await user.save();

        const token = generateWebToken(user._id);

        res.status(201).send({
            message: "Signup Success!",
            token,
            userId: user._id,
            userName: user.firstname,
            userImage: imagePath
        });
    } catch (error) {
        console.error(" Sign-up error:", error);
        res.status(500).send({ message: "Server error", error: error.message });
    }
};

export default handleUserSignUp2;