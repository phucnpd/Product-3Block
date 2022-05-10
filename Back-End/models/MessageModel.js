const mongoose = require("mongoose");
const { publicConnection } = require("../config/mongoDB/Connection");

const MessageUser = new mongoose.Schema(
    {
        username: String,
        content: String,
        isCheck: {
            type: String,
            default: false,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const MessageUserModel = publicConnection.model("message", MessageUser);

module.exports = MessageUserModel;
