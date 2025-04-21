import Item from "../../models/item.js"

const handleGetAllItems = async (req, res) => {
    const items = await Item.find({});

    if(!items){
        res.send({ message: "The database is empty "});
    };

    res.json({ items });
}

export default handleGetAllItems;