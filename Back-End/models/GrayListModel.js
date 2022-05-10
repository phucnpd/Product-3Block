const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { publicConnection } = require("../config/mongoDB/Connection");

const GrayListModel = new mongoose.Schema(
    {
        url: { type: String, unique: true },
        level: String,
        result: Object,
        detail: {
            type: Object,
        },
        title: String,
        categories: Array,
        Definition: {
            type: String,
            default: "Doc Hai",
        },
        user: {
            type: String,
            default: "anonymous",
        },
        image: {
            type: String,
            default:
                "https://votuenam.github.io/image-hosting/imageDefault.jpg",
        },
        isCheck: {
            type: String,
            default: "none",
        },
        deleted: {
            default: false,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

GrayListModel.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
});

const grayListModel = publicConnection.model("grayListForUser", GrayListModel);

module.exports = grayListModel;
