const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: {
            id: { type: String },
            url: { type: String }
        },
        price: { type: Number, required: true },
        sales: { type: Number, default: 0 }
    },
    { timestamps: true }
);

module.exports = Product = mongoose.model("Product", ProductSchema);
