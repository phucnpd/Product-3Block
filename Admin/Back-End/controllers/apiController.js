const virusTotal = require("../function/virusTotal/3VVirusTotal");
const URLScan = require("../function/URLScan/scanURL");
const checkGGSafe = require("../function/SafeBrowser/GGsafeBrowsing");
const addTotalScanResult = require("../function/GrayList/totalScanList");
const addURLScanResult = require("../function/GrayList/urlScanList");
const totalScanModel = require("../models/totalScanModel");
const urlScanModel = require("../models/urlScanModel");
const M4Model = require("../models/M4Model");
const LocalPlus18 = require("../models/Plus18LocalModel");
const adultVision = require("../function/Plus18/ComputerVision");
const adultVirusTotal = require("../function/Plus18/virusTotal18");
const NoFoundPlus18 = require("../models/Plus18NoFoundModel");
const MessageModel = require("../models/MessageModel");

require("../function/virusTotal/constants");
require("dotenv").config();
var count = 0;

class apiController {
    // POST - /api/3block/system/virustotal/v3
    async virustotal(req, res, next) {
        var url = req.body.url.toLowerCase();
        try {
            const result = await virusTotal(url, API_KEY_VIRUSTOTAL[count++]);
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
            res.status(200).json(result);
            // });
        } catch (error) {
            res.status(404).json({ error: "error" });
            next(error);
        }
    }

    // POST - /api/3block/system/urlscan/v100
    async urlScan(req, res, next) {
        try {
            const URL = cannibalizationURL(req.body.url, false).toLowerCase();
            console.log(URL);
            const result = await URLScan(URL, process.env.API_KEY_URL_SCAN);
            console.log(
                "\x1b[41m%s\x1b[0m",
                "URLScan",
                "- URL: ",
                URL,
                "- Done!"
            );
            res.status(200).json(result);
            result.url = URL;
            addURLScanResult(result);
        } catch (error) {
            res.status(404).json({ error: "error" });
            next(error);
        }
    }

    // POST - /api/3block/system/googleSafe/v4
    async checkSafeGoogle(req, res, next) {
        try {
            const URL = req.body.url.toLowerCase();
            const result = await checkGGSafe(
                URL,
                process.env.API_KEY_GOOGLE_SAFE
            );
            console.log(
                "\x1b[41m%s\x1b[0m",
                "GG Safe Browsing",
                " - URL: ",
                URL,
                "- Done!"
            );
            //return True is Safe, return False is malicious
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: "error" });
            next(error);
        }
    }

    // GET - /api/3block/system/GetAllURLScan
    async GetAllURLScan(req, res, next) {
        urlScanModel
            .find({})
            .then((resp) => res.status(200).json(resp))
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //POST - /api/3block/system/is18Plus
    async is18Plus(req, res, next) {
        const url = cannibalizationURL(req.body.url, false);
        const isCheck = req.body.isCheck;

        //! Check DB cache 18+
        const cacheDB = await localCache18(url);
        if (cacheDB) {
            res.status(200).json({
                result: "success",
                found: "Cache 18+",
            });
            return;
        }

        //! Check DB not found
        const NotFoundDB = await NotFoundCache18(url);
        if (NotFoundDB) {
            res.status(200).json({
                result: "failure",
                found: "Not Found DB 18+",
            });
            return;
        }

        console.log("VirusTotal");
        //! Virus Total check 18+
        try {
            const virus18Plus = await virusTotal(
                url,
                API_KEY_VIRUSTOTAL[count++]
            );
            const resultVirus18Plus = adultVirusTotal(virus18Plus);
            if (resultVirus18Plus) {
                res.status(200).json({
                    result: "success",
                    found: "virusTotal",
                });
                addToLocalPlus18(url);
                return;
            } else {
                console.log("virusTotal 404!");
            }
        } catch {
            console.log("virusTotal Crash!");
        }
        console.log("4M URL");
        //! Black list 4M URL
        const checkIn4 = await URL4m18Plus(url);
        if (checkIn4) {
            res.status(200).json({
                result: "success",
                found: "list4M",
            });
            return;
        }

        if (isCheck) {
            //! URLScan take screenshot + computerVision Check
            const checkVision = await URLScan18Plus(url);
            if (checkVision == "true1") {
                res.status(200).json({
                    result: "success",
                    found: "ComputerVision_urlDB",
                });
                return;
            } else if (checkVision == "true2") {
                res.status(200).json({
                    result: "success",
                    found: "ComputerVision_urlScan",
                });
                return;
            }
        }

        console.log("EXIT");
        addToNotFoundPlus18(url);
        res.status(404).json({
            result: "failure",
            found: "All engine not found!",
        });
    }
    //GET - /api/3block/system/getCache18
    async getCache18(req, res, next) {
        LocalPlus18.find({})
            .then((resp) => {
                res.status(200).json(resp);
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //POST - /api/3block/system/postCache18
    async postCache18(req, res, next) {
        const url = cannibalizationURL(req.body.url, false);
        LocalPlus18.create({ url })
            .then((resp) => {
                res.status(200).json(resp);
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //GET - /api/3block/system/getNotFound18
    async getNotFound18(req, res, next) {
        NoFoundPlus18.find({})
            .then((resp) => {
                res.status(200).json(resp);
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //POST - /api/3block/system/postNotFound18
    async postNotFound18(req, res, next) {
        const url = cannibalizationURL(req.body.url, false);
        NoFoundPlus18.create({ url })
            .then((resp) => {
                res.status(200).json(resp);
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //DELETE - /api/3block/system/deleteNotFound18
    async deleteNotFound18(req, res, next) {
        const url = cannibalizationURL(req.body.url, false);
        NoFoundPlus18.deleteOne({ url })
            .then((resp) => {
                console.log(resp);
                res.status(200).json({ result: "success" });
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //GET - /api/3block/system/getMessage
    async getMessage(req, res, next) {
        MessageModel.find({})
            .then((resp) => {
                res.status(200).json(resp);
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //POST - /api/3block/system/postMessage
    async postMessage(req, res, next) {
        const username = req.body.username;
        const content = req.body.content;
        MessageModel.create({ username, content })
            .then((resp) => {
                res.status(200).json(resp);
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }

    //POST - /api/3block/system/checkMessage
    async checkMessage(req, res, next) {
        const _id = req.body.id;

        MessageModel.findByIdAndUpdate({ _id }, { isCheck: "true" })
            .then((resp) => {
                res.status(200).json(resp);
            })
            .catch((err) => {
                res.status(404).json({ error: "error" });
                next(err);
            });
    }
}

module.exports = new apiController();

function cannibalizationURL(url, isHttp) {
    var match;
    if (
        (match = url
            .toLowerCase()
            .match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im))
    ) {
        //console.log(match[1]);
        if (!isHttp) {
            return match[1];
        }

        return "http://" + match[1] + "/";
    }
}

function addToLocalPlus18(url) {
    LocalPlus18.findOne({ url }).then((res) => {
        // console.log(res);
        if (res == null) {
            LocalPlus18.create({ url });
        }
    });
}

function addToNotFoundPlus18(url) {
    NoFoundPlus18.findOne({ url }).then((res) => {
        // console.log(res);
        if (res == null) {
            NoFoundPlus18.create({ url });
        }
    });
}

function localCache18(url) {
    return new Promise((resolve, reject) => {
        LocalPlus18.findOne({ url })
            .then((res) => {
                // console.log("local = " + res);
                if (res != null) {
                    resolve(true);
                }
                console.log("Cache 18+ 404!");
                resolve(false);
            })
            .catch((err) => {
                console.log("Cache 18+ Crash!");
                resolve(false);
            });
    });
}

function NotFoundCache18(url) {
    return new Promise((resolve, reject) => {
        NoFoundPlus18.findOne({ url })
            .then((res) => {
                // console.log("local = " + res);
                if (res != null) {
                    resolve(true);
                }
                console.log("Not Found Cache 18+ 404!");
                resolve(false);
            })
            .catch((err) => {
                console.log("Not Found Cache 18+ Crash!");
                resolve(false);
            });
    });
}

function URL4m18Plus(url) {
    return new Promise(async (resolve, reject) => {
        await M4Model.findOne({ url })
            //Nếu ko tìm thấy sẽ trả về null
            .then(async (resp) => {
                if (resp != null) {
                    addToLocalPlus18(url);
                    resolve(true);
                } else {
                    console.log("4M URL 404!");
                    resolve(false);
                }
            })
            .catch((err) => {
                console.log("4M URL Crash!");
                resolve(false);
            });
    });
}

function URLScan18Plus(url) {
    return new Promise((resolve, reject) => {
        urlScanModel
            .findOne({ url })
            .then(async (resp) => {
                if (resp != null) {
                    //todo Check computer Vision
                    const visionCheck18 = await adultVision(resp.screenshot);
                    if (visionCheck18) {
                        addToLocalPlus18(url);
                        resolve("true1");
                    }
                    resolve(false);
                } else {
                    console.log("urlDB 404!");
                    //! Go to Scan new
                    console.log("Call API!");
                    const newURLScan18 = await URLScan(
                        url,
                        process.env.API_KEY_URL_SCAN
                    );
                    console.log("Check computer vision 404!");
                    const visionCheck18 = await adultVision(
                        newURLScan18.screenshot
                    );
                    if (visionCheck18) {
                        resolve("true2");
                        //todo Add URL Scan to DB
                        newURLScan18.url = url;
                        addToLocalPlus18(url);
                        addURLScanResult(newURLScan18);
                    } else {
                        console.log("urlScan 404!");
                        resolve(false);
                    }
                }
            })
            .catch((err) => {
                // console.log(err);
                console.log("urlScan new Crash!");
                resolve(false);
            });
    });
}
