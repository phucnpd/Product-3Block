const mongoose = require("mongoose");
const { publicConnection } = require("../config/mongoDB/Connection");

const URLScanDB = new mongoose.Schema(
    {
        url: { type: String, unique: true },
        page: Object,
        headers: Object,
        port: Number,
        ipaddress: String,
        asn: Object,
        geoip: Object,
        links: Array,
        countries: Array,
        linkDomains: Array,
        screenshot: String,
        report: String,
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const urlScanModel = publicConnection.model("scanURLResult", URLScanDB);

module.exports = urlScanModel;
