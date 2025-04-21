import Item from "../../models/item.js";

const handleCreateItem = async (req, res) => {
    const itemData = req.body;

    const newItem = new Item(itemData);
    await newItem.save();
    
    res.send({ message: "Item created", userId: newItem.userId });
}

export default handleCreateItem;