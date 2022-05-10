const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { publicConnection } = require("../config/mongoDB/Connection");

const NameUser = new mongoose.Schema(
    {
        email: String,
        displayName: String,
        deleted: {
            default: false,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

NameUser.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
});

const nameUserModel = publicConnection.model("NameUser", NameUser);

module.exports = nameUserModel;
