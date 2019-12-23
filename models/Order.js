const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
        status: { type: String, enum: ["pending", "paid"], default: "pending" },
        invoiceId: { type: String },
        transacId: { type: String }
    },
    { timestamps: true }
);

module.exports = Order = mongoose.model("Order", OrderSchema);
