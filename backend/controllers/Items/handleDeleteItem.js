import Item from "../../models/item.js";

const handleDeleteItem = async (req, res) => {
    const { id } = req.params;
    
    const deleteItem = await Item.findOneAndDelete({ _id: id });

    if(deleteItem){
        return res.send({ message: "Item is deleted" });
    }

    res.send({ message: "Item is not deleted" });
}

export default handleDeleteItem;