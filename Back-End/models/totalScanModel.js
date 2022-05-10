const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { publicConnection } = require("../config/mongoDB/Connection");

const totalVirusScan = new mongoose.Schema(
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

totalVirusScan.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
});

const totalScanModel = publicConnection.model(
    "scanVirusTotalResult",
    totalVirusScan
);

module.exports = totalScanModel;
