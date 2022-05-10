const mongoose = require("mongoose");
const { list4MConnection } = require("../config/mongoDB/Connection");

const List4M = new mongoose.Schema(
    {
        url: String,
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const M4Model = list4MConnection.model("m4lists", List4M);

module.exports = M4Model;
