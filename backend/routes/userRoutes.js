import express from "express";
import handleUserSignIn from "../controllers/Users/handleUserSignIn";
import handleUserUpdateInfo from "../controllers/Users/handleUserUpdateInfo.js";
import handleGetUserDetails from "../controllers/Users/handleGetUserDetails.js";
import handleUserSignUp2, { upload } from "../controllers/Users/handle2Signup.js";
import handleGetUserDetailsById from "../controllers/Users/handleGetUserDetailsById.js";

const router = express.Router();

router.post("/signup", upload, handleUserSignUp2);
router.post("/signin", handleUserSignIn);
router.put("/update/:id", handleUserUpdateInfo);
router.get("/", handleGetUserDetails);
router.get("/:id", handleGetUserDetailsById);

export default router;