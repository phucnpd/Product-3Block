const virusTotal = require("../function/virusTotal/3VVirusTotal");
const URLScan = require("../function/URLScan/scanURL");
const addURLScanResult = require("../function/GrayList/urlScanList");
const totalScanModel = require("../models/totalScanModel");
const urlScanModel = require("../models/urlScanModel");
const M4Model = require("../models/M4Model");
const LocalPlus18 = require("../models/Plus18LocalModel");
const adultVision = require("../function/Plus18/ComputerVision");
const adultVirusTotal = require("../function/Plus18/virusTotal18");
const NoFoundPlus18 = require("../models/Plus18NoFoundModel");
const whiteListModel = require("../models/WhitePublicModel");
const fs = require("fs");
const path = require("path");
require("../function/virusTotal/constants2");
require("dotenv").config();
var count = 0;

class testController {
    //GET - /test
    async is18Plus(req, res) {
        // const url = cannibalizationURL(req.body.url, false);
        try {
            var listURL = [];
            var data = fs.readFileSync(
                path.join(__dirname, "linkTest18Plus.txt"),
                "utf8"
            );
            listURL = data.split(/\r\n|\n/);
            // console.log(listURL);
        } catch (error) {
            console.log(error);
        }
        // return;
        var countTest = 0;
        const listResult = [];
        const listNotFound = [];
        for (let i of listURL) {
            const result = await check1URL(listURL[countTest++], true);
            result.number = countTest;
            if (result.status) {
                listResult.push(result);
            } else {
                listNotFound.push(result);
            }
            console.log(result.status, " - ", result.url);
            if (countTest == 17) {
                break;
            }
        }

        res.status(200).json(listResult);

        const writeFile = JSON.stringify(listResult, null, 4);
        fs.writeFileSync(
            path.join(__dirname, "Result.json"),
            writeFile,
            "utf8"
        );

        const writeNotFound = JSON.stringify(listNotFound, null, 4);
        fs.writeFileSync(
            path.join(__dirname, "NotFound.json"),
            writeNotFound,
            "utf8"
        );
    }
}
module.exports = new testController();

async function check1URL(url, isCheck) {
    //! Check Whitelist
    const WhiteListCheck = await WhiteListGet(url);
    if (WhiteListCheck) {
        return {
            url,
            status: false,
            found: "It is in Whitelist",
        };
    }

    //! Check DB cache 18+
    const cacheDB = await localCache18(url);
    if (cacheDB) {
        return {
            url,
            status: true,
            found: "Cache 18+",
        };
    }

    //! Check DB not found
    const NotFoundDB = await NotFoundCache18(url);
    if (NotFoundDB) {
        return {
            url,
            status: false,
            found: "Not Found DB 18+",
        };
    }

    // console.log("VirusTotal");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    //! Virus Total check 18+
    try {
        const virusDBCheck = await TotalVirusGet("http://" + url + "/");
        var virus18Plus;

        if (virusDBCheck == false) {
            virus18Plus = await virusTotal(url, API_KEY_VIRUSTOTAL[count++]);
            // console.log("VirusTotal Scan new!");
            if (count >= 15) {
                count = 0;
            }
        } else {
            virus18Plus = virusDBCheck;
        }
        if (virus18Plus.level == "high") {
            return {
                url,
                status: true,
                found: "High level virus",
            };
        }
        const resultVirus18Plus = adultVirusTotal(virus18Plus);
        if (resultVirus18Plus) {
            addToLocalPlus18(url);
            return {
                url,
                status: true,
                found: "virusTotal",
            };
        } else {
            // console.log("virusTotal 404!");
        }
    } catch (err) {
        // console.log(err);
        console.log("virusTotal Crash! " + url);
    }

    // console.log("4M URL");
    //! Black list 4M URL
    const checkIn4 = await URL4m18Plus(url);
    if (checkIn4) {
        return {
            url,
            status: true,
            found: "list4M",
        };
    }

    if (isCheck) {
        //! URLScan take screenshot + computerVision Check
        const checkVision = await URLScan18Plus(url);
        if (checkVision == "true1") {
            return {
                url,
                status: true,
                found: "ComputerVision_urlDB",
            };
        } else if (checkVision == "true2") {
            return {
                url,
                status: true,
                found: "ComputerVision_urlScan",
            };
        }
    }

    // console.log("EXIT");
    if (url.includes("sex")) {
        addToLocalPlus18(url);
        return {
            url,
            status: true,
            found: "Include keyword in  URL",
        };
    } else {
        addToNotFoundPlus18(url);
        return {
            url,
            status: false,
            found: "All engine not found!",
        };
    }
}

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
    return new Promise((resolve) => {
        LocalPlus18.findOne({ url })
            .then((res) => {
                // console.log("local = " + res);
                if (res != null) {
                    resolve(true);
                } else {
                    // console.log("Cache 18+ 404!");
                    resolve(false);
                }
            })
            .catch(() => {
                console.log("Cache 18+ Crash!");
                resolve(false);
            });
    });
}

function NotFoundCache18(url) {
    return new Promise((resolve) => {
        NoFoundPlus18.findOne({ url })
            .then((res) => {
                // console.log("local = " + res);
                if (res != null) {
                    resolve(true);
                } else {
                    // console.log("Not Found Cache 18+ 404!");
                    resolve(false);
                }
            })
            .catch(() => {
                console.log("Not Found Cache 18+ Crash!");
                resolve(false);
            });
    });
}

function WhiteListGet(url) {
    return new Promise(async (resolve) => {
        await whiteListModel
            .findOne({ url })
            //Nếu ko tìm thấy sẽ trả về null
            .then((resp) => {
                if (resp == null) {
                    resolve(false);
                } else {
                    // console.log("URL: " + url + " in whitelist!");
                    resolve(true);
                }
            })
            .catch(() => {
                console.log("Whitelist Crash!");
                resolve(false);
            });
    });
}

function TotalVirusGet(url) {
    return new Promise(async (resolve) => {
        await totalScanModel
            .findOne({ url })
            //Nếu ko tìm thấy sẽ trả về null
            .then((resp) => {
                if (resp == null) {
                    resolve(false);
                } else {
                    // console.log("URL: " + url + " in DB Total!");
                    resolve(resp);
                }
            })
            .catch(() => {
                console.log("TotalDB Crash!");
                resolve(false);
            });
    });
}

function URL4m18Plus(url) {
    return new Promise(async (resolve) => {
        await M4Model.findOne({ url })
            //Nếu ko tìm thấy sẽ trả về null
            .then(async (resp) => {
                if (resp != null) {
                    addToLocalPlus18(url);
                    resolve(true);
                } else {
                    // console.log("4M URL 404!");
                    resolve(false);
                }
            })
            .catch(() => {
                console.log("4M URL Crash!");
                resolve(false);
            });
    });
}

function URLScan18Plus(url) {
    return new Promise((resolve) => {
        urlScanModel
            .findOne({ url })
            .then(async (resp) => {
                if (resp != null) {
                    //todo Check computer Vision
                    console.log("Vision: ", url, " Link: ", resp.screenshot);
                    const visionCheck18 = await adultVision(resp.screenshot);
                    if (visionCheck18) {
                        addToLocalPlus18(url);
                        resolve("true1");
                    }
                    resolve(false);
                } else {
                    // console.log("urlDB 404!");
                    //! Go to Scan new
                    console.log("Call API! " + url);
                    const newURLScan18 = await URLScan(
                        url,
                        process.env.API_KEY_URL_SCAN
                    );
                    console.log(newURLScan18.screenshot);
                    newURLScan18.url = url;
                    addURLScanResult(newURLScan18);

                    const visionCheck18 = await adultVision(
                        newURLScan18.screenshot
                    );
                    if (visionCheck18) {
                        resolve("true2");
                        //todo Add URL Scan to DB
                        newURLScan18.url = url;
                        addToLocalPlus18(url);
                    } else {
                        console.log("Check computer vision 404!");
                        resolve(false);
                    }
                }
            })
            .catch(() => {
                // console.log(err);
                console.log("urlScan new Crash!");
                resolve(false);
            });
    });
}
