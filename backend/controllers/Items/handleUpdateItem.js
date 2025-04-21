import Item from "../../models/item.js";

const handleUpdateItem = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    const updateItem = await Item.findOneAndUpdate({ _id: id }, newData, {
        new: true
    });

    if(updateItem){
        return res.send({ message: "Item is updated" });
    }

    res.send({ message: "Item is not updated" });
};

export default handleUpdateItem;