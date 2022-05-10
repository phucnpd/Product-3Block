const grayListModel = require("../models/GrayListModel");
const virusTotal = require("../function/virusTotal/3VVirusTotal");
const addTotalScanResult = require("../function/GrayList/totalScanList");
const publicBlackListURL = require("../models/BlackPublicModel");
const publicWhiteModel = require("../models/WhitePublicModel");
const NameUserModel = require("../models/NameUserModel");

require("../function/virusTotal/constants");

var count = 0;

class testController {
    //Gray list: create - get all - deleteOne - updateOne - confirm one -> add to BlackList

    //GET - /user/gray/system/3block/getAll
    async getAll(req, res, next) {
        grayListModel
            .find({})
            .then((resp) => res.status(200).json(resp))
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //POST - /user/gray/system/3block/createNew
    async createNew(req, res, next) {
        const url = cannibalizationURL(req.body.url, true);
        const user = req.body.user;
        const image = req.body?.image;
        console.log("image =" + image);
        try {
            const checkBlackIn = new Promise((resolve, reject) => {
                publicBlackListURL
                    .findOne({ url: url })
                    .then((resq) => {
                        resolve(resq);
                    })
                    .catch((err) => reject(false));
            });
            const checkWhiteIn = new Promise((resolve, reject) => {
                publicWhiteModel
                    .findOne({ url: cannibalizationURL(url, false) })
                    .then((resq) => {
                        resolve(resq);
                    })
                    .catch((err) => reject(false));
            });

            const checkGrayIn = new Promise((resolve, reject) => {
                grayListModel
                    .findOne({ url: url })
                    .then((resq) => {
                        resolve(resq);
                    })
                    .catch((err) => reject(false));
            });
            Promise.all([checkBlackIn, checkWhiteIn, checkGrayIn]).then(
                async (values) => {
                    // console.log(values);
                    if (values[0] || values[1] || values[2]) {
                        res.status(200).json({
                            result: "failURL",
                        });
                    } else {
                        const result = await virusTotal(
                            url,
                            API_KEY_VIRUSTOTAL[count++]
                        );
                        console.log(
                            "\x1b[41m%s\x1b[0m",
                            "Virus Total",
                            "=",
                            count - 1,
                            " - URL: ",
                            url,
                            "- Done!"
                        );
                        if (count == 15) {
                            count = 0;
                        }
                        addTotalScanResult(result);
                        // console.log(result);
                        result.user = user;
                        result.image = image;
                        result.deleted = false;
                        grayListModel
                            .create(result)
                            .then(() => res.status(200).json(result));
                    }
                }
            );
        } catch (error) {
            res.status(404).json({ error: "error" });
            next(error);
        }
    }

    //DELETE - /user/gray/system/3block/softDeleteOne
    async softDeleteOne(req, res, next) {
        var url = cannibalizationURL(req.body.url, true);
        grayListModel
            .delete({ url })
            .then(() => {
                res.status(200).json({ result: "success" });
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //PATCH - /user/gray/system/3block/restoreGray
    async restoreGray(req, res, next) {
        console.log("restore");
        var url = cannibalizationURL(req.body.url, true);
        grayListModel
            .restore({ url })
            .then(() => {
                res.status(200).json({ result: "success" });
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //DELETE - /user/gray/system/3block/realDeleteGray
    async realDeleteGray(req, res, next) {
        var url = cannibalizationURL(req.body.url, true);
        grayListModel
            .deleteOne({ url })
            .then(() => {
                res.status(200).json({ result: "success" });
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //GET - /user/gray/system/3block/getGrayTrash
    async getGrayTrash(req, res, next) {
        //var url = cannibalizationURL(req.body.url, true);
        grayListModel
            .findDeleted({})
            .then((resp) => {
                res.status(200).json(resp);
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    // todo Confirm and Reject by Administrator

    //POST - /user/gray/system/3block/confirmOne
    async confirmOne(req, res, next) {
        const url = cannibalizationURL(req.body.url, true);
        const isCheck = req.body.isCheck;
        try {
            if (isCheck == "true") {
                grayListModel
                    .findOneAndUpdate({ url }, { isCheck: "true" })
                    .then((resq) => {
                        // res.json(resq);
                        publicBlackListURL
                            .create(
                                // resq
                                {
                                    url: resq.url,
                                    level: resq.level,
                                    result: resq.result,
                                    detail: resq.detail,
                                    title: resq.title,
                                    categories: resq.categories,
                                    deleted: false,
                                }
                            )
                            .then(() => {
                                res.status(200).json({ result: "success" });
                            });
                    });
            } else {
                grayListModel
                    .findOneAndUpdate({ url }, { isCheck })
                    .then(() => {
                        publicBlackListURL.deleteOne({ url }).then(() => {
                            res.status(200).json({ result: "success" });
                        });
                    });
            }
        } catch (err) {
            res.status(404).json({ error: "error" });
            next(err);
        }
    }

    //GET - /user/gray/system/3block/getName
    async getName(req, res, next) {
        NameUserModel.find({})
            .then((resp) => res.status(200).json(resp))
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //POST - /user/gray/system/3block/postName
    async postName(req, res, next) {
        req.body.deleted = false;
        NameUserModel.create(req.body)
            .then(() => res.status(200).json({ result: "success" }))
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }
}

module.exports = new testController();

function cannibalizationURL(url, isHttp) {
    var match;
    if (
        (match = url
            .toLowerCase()
            .match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im))
    ) {
        console.log(match[1]);
        if (!isHttp) {
            return match[1];
        }

        return "http://" + match[1] + "/";
    }
}
