import express from "express";
import handleCreateItem, { upload } from "../controllers/Items/handleCreateItem.js";
import handleDeleteItem from "../controllers/Items/handleDeleteItem.js";
import handleUpdateItem from "../controllers/Items/handleUpdateItem.js";
import handleGetElementById from "../controllers/Items/handleGetElementById.js";
import handleGetAllItems from "../controllers/Items/handleGetAllItems.js";

const router = express.Router();

router.post("/create", upload, handleCreateItem);
router.put("/update/:id", handleUpdateItem);
router.delete("/delete/:id", handleDeleteItem);
router.get("/:id", handleGetElementById);
router.get("/", handleGetAllItems);



export default router;