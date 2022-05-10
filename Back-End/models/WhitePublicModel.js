const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { publicConnection } = require("../config/mongoDB/Connection");

const WhiteListPublic = new mongoose.Schema(
    {
        url: { type: String, unique: true },
        deleted: {
            default: false,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

WhiteListPublic.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
});

const publicWhiteModel = publicConnection.model(
    "whiteListPublic",
    WhiteListPublic
);

module.exports = publicWhiteModel;
