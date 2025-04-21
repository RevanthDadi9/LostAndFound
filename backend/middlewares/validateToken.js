import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

const validateToken = async (req, res) => {
    const token = req.header("token");

    if(!token){
        return res.send({ message: "Access Denied" });
    }

    const payload = jwt.verify(token, secretKey);
    req.id = payload.id;

    res.send({ message: "Valid Token"});
}

export default validateToken;