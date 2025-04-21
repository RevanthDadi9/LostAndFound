import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        default: "No Description"
    },
    type: {
        type: String,
        enum: ["Lost", "Found"],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    img: [
        {
            type: String,
            default:"No image"
        }
    ]
},
{timestamps: true}

);

const Item = mongoose.model("Item", itemSchema);

export default Item;