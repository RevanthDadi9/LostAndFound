import Item from "../../models/item.js";

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

    const imageUrls = imageFiles.map(file => file.path);

    const newItem = new Item({
      name,
      userId,
      description,
      type,
      location,
      date,
      number,
      img: imageUrls,
    });

    await newItem.save();
    res.status(201).json({ message: "Item created", item: newItem });

  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Failed to create item" });
  }
};

export default handleCreateItem;
