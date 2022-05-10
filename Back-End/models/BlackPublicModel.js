const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { publicConnection } = require("../config/mongoDB/Connection");

const BlackListPublic = new mongoose.Schema(
    {
        url: { type: String, unique: true },
        level: String,
        result: Object,
        detail: Object,
        title: String,
        categories: Array,
        Definition: String,
        deleted: {
            default: false,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

BlackListPublic.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
});

const publicModel = publicConnection.model("BlackListPublic", BlackListPublic);

module.exports = publicModel;
