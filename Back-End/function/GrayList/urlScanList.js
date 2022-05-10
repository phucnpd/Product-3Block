const urlScanModel = require("../../models/urlScanModel");

function addURLScanResult(body) {
    urlScanModel.findOneAndUpdate({ url: body.url }, body).then((res) => {
        if (!res) {
            urlScanModel.create(body);
        } else {
            console.log("Update Document: ", body.url);
        }
    });
}

module.exports = addURLScanResult;
