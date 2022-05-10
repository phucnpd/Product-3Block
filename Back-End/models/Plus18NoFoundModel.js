const mongoose = require("mongoose");
const { publicConnection } = require("../config/mongoDB/Connection");

const LocalPlus18NotFound = new mongoose.Schema(
    {
        url: { type: String, unique: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Plus18NotFound = publicConnection.model(
    "Plus18NotFound",
    LocalPlus18NotFound
);

module.exports = Plus18NotFound;
