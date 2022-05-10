const publicBlackListURL = require("../models/BlackPublicModel");
const M4Model = require("../models/M4Model");
const publicWhiteModel = require("../models/WhitePublicModel");
const virusTotal = require("../function/virusTotal/3VVirusTotal");
require("../function/virusTotal/constants");

var count = 0;
class urlController {
    // GET - /db/api/system/3block/getAllBlackPublic
    async getAllBlackPublic(req, res, next) {
        publicBlackListURL
            .find({})
            .then((resp) => {
                res.status(200).json(resp);
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    // GET - /db/api/system/3block/getAllWhitePublic
    async getAllWhitePublic(req, res, next) {
        publicWhiteModel
            .find({})
            .then((resp) => {
                res.status(200).json(resp);
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    // POST - /db/api/system/3block/checkBlackPublic
    async checkBlackPublic(req, res, next) {
        var url = cannibalizationURL(req.body.url, true);
        publicBlackListURL
            .findOne({ url })
            .then((resp) => {
                //Nếu ko tìm thấy sẽ trả về null
                res.status(200).json(resp);
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    // POST - /db/api/system/3block/checkWhitePublic
    async checkWhitePublic(req, res, next) {
        var url = cannibalizationURL(req.body.url, false);
        publicWhiteModel
            .findOne({ url })
            .then((resp) => {
                //Nếu ko tìm thấy sẽ trả về null
                res.status(200).json(resp);
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    // GET - /db/api/system/3block/getAll4MList
    async getAll4MList(req, res, next) {
        M4Model.find({})
            .then((resp) => {
                res.status(200).json(resp);
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    // POST - /db/api/system/3block/checkIn4MList
    async checkIn4MList(req, res, next) {
        var url = cannibalizationURL(req.body.url, false);
        M4Model.findOne({ url })
            //Nếu ko tìm thấy sẽ trả về null
            .then((resp) => res.status(200).json(resp))
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //POST - /db/api/system/3block/createBlackList
    async createBlackList(req, res, next) {
        req.body.deleted = false;
        var url = cannibalizationURL(req.body.url, true);
        const result = await virusTotal(url, API_KEY_VIRUSTOTAL[count++]);
        publicBlackListURL
            .create(result)
            .then(() => res.status(200).json({ result: "success" }))
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //POST - /db/api/system/3block/createWhiteList
    async createWhiteList(req, res, next) {
        req.body.deleted = false;
        req.body.url = cannibalizationURL(req.body?.url, false);
        publicWhiteModel
            .create(req.body)
            .then(() => res.status(200).json({ result: "success" }))
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //PUT - /db/api/system/3block/updateBlackList
    async updateBlackList(req, res, next) {
        var url = cannibalizationURL(req.body.url, true);
        var body = req.body;
        publicBlackListURL
            .findOneAndUpdate({ url }, body)
            .then(() => res.status(200).json({ result: "success" }))
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //PUT - /db/api/system/3block/updateWhiteList
    async updateWhiteList(req, res, next) {
        var url = cannibalizationURL(req.body.url, false);
        var body = req.body;
        publicWhiteModel
            .findOneAndUpdate({ url }, body)
            .then(() => res.status(200).json({ result: "success" }))
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //DELETE - /db/api/system/3block/softDeleteBlack
    async softDeleteBlack(req, res, next) {
        var url = cannibalizationURL(req.body.url, true);
        publicBlackListURL
            .delete({ url })
            .then(() => {
                res.status(200).json({ result: "success" });
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //DELETE - /db/api/system/3block/softDeleteWhite
    async softDeleteWhite(req, res, next) {
        var url = cannibalizationURL(req.body.url, false);
        console.log("url ==== " + url);
        publicWhiteModel
            .delete({ url })
            .then(() => {
                res.status(200).json({ result: "success" });
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //PATCH - /db/api/system/3block/restoreBlack
    async restoreBlack(req, res, next) {
        var url = cannibalizationURL(req.body.url, true);
        publicBlackListURL
            .restore({ url })
            .then((resp) => {
                res.status(200).json({ result: "success" });
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //PATCH - /db/api/system/3block/restoreWhite
    async restoreWhite(req, res, next) {
        var url = cannibalizationURL(req.body.url, false);
        publicWhiteModel
            .restore({ url })
            .then((resp) => {
                res.status(200).json({ result: "success" });
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //DELETE - /db/api/system/3block/realDeleteBlack
    async realDeleteBlack(req, res, next) {
        var url = cannibalizationURL(req.body.url, true);
        publicBlackListURL
            .deleteOne({ url })
            .then((resp) => {
                console.log(resp);
                res.status(200).json({ result: "success" });
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //DELETE - /db/api/system/3block/realDeleteWhite
    async realDeleteWhite(req, res, next) {
        var url = cannibalizationURL(req.body.url, false);
        publicWhiteModel
            .deleteOne({ url })
            .then((resp) => {
                console.log(resp);
                res.status(200).json({ result: "success" });
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //GET - /db/api/system/3block/getBlackTrash
    async getBlackTrash(req, res, next) {
        //var url = cannibalizationURL(req.body.url, true);
        publicBlackListURL
            .findDeleted({})
            .then((resp) => {
                res.status(200).json(resp);
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //GET - /db/api/system/3block/getWhiteTrash
    async getWhiteTrash(req, res, next) {
        //var url = cannibalizationURL(req.body.url, true);
        publicWhiteModel
            .findDeleted({})
            .then((resp) => {
                res.status(200).json(resp);
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }
}

module.exports = new urlController();

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
//Test build lại server em ơi
