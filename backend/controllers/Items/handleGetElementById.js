import Item from "../../models/item.js";

const handleGetElementById = async (req, res) => {
    const { id } = req.params;

    const itemData = await Item.findOne({ _id: id });

    if(!itemData){
        return res.json({ message: "Invalid Item Id" });
    }

    res.send({itemData});
}

export default handleGetElementById;