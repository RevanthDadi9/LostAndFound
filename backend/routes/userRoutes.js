import express from "express";
import handleUserSignIn from "../controllers/Users/handleUserSignIn.js";
import handleUserUpdateInfo from "../controllers/Users/handleUserUpdateInfo.js";
import handleGetUserDetails from "../controllers/Users/handleGetUserDetails.js";
import handleGetUserDetailsById from "../controllers/Users/handleGetUserDetailsById.js";
import { upload } from "../cloudinaryConfig.js"
import { uploadImage } from "../controllers/uploadController.js";
import handleUserSignUp2 from "../controllers/Users/handleUserSignUp2.js";

const router = express.Router();

router.post("/signup", upload.single("image"), handleUserSignUp2);
router.post("/upload", upload.single("image"), uploadImage);
router.post("/signin", handleUserSignIn);
router.put("/update/:id", handleUserUpdateInfo);
router.get("/", handleGetUserDetails);
router.get("/:id", handleGetUserDetailsById);

export default router;