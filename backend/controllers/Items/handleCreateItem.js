import Item from "../../models/item.js";
import multer from "multer";
import path from "path";
import fs from "fs";

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

export const upload = multer({ storage: storage }).array("images", 5); 

const handleCreateItem = async (req, res) => {
    try {
        const {
            name,
            userId,
            description,
            type,
            location,
            date,
            number
        } = req.body;

        const imageFiles = req.files || [];
        const imagePaths = imageFiles.map(file => file.filename);

        const newItem = new Item({
            name,
            userId,
            description,
            type,
            location,
            date,
            number,
            img: imagePaths,
        });

        await newItem.save();
        res.status(201).json({ message: "Item created", item: newItem });

    } catch (error) {
        console.error("Error creating item:", error);
        res.status(500).json({ error: "Failed to create item" });
    }
};

export default handleCreateItem;
