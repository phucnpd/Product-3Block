const mongoose = require("mongoose");
const { publicConnection } = require("../config/mongoDB/Connection");

const LocalPlus18 = new mongoose.Schema(
    {
        url: { type: String, unique: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Model18Plus = publicConnection.model("LocalPlus18", LocalPlus18);

module.exports = Model18Plus;
