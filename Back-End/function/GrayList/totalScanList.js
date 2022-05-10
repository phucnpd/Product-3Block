const totalScanModel = require("../../models/totalScanModel");

function addTotalScanResult(body) {
    totalScanModel.findOneAndUpdate({ url: body.url }, body).then((res) => {
        if (!res) {
            totalScanModel.create(body);
        } else {
            console.log("Update Document: ", body.url);
        }
    });
}

module.exports = addTotalScanResult;
