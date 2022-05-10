require("./constants2");
const fs = require("fs");
var calculatePercent = require("./analysisResVTAPI");
var hashURL = require("./hashURL.js");
const axios = require("axios").default;

async function checkURLFile(url, API_KEY) {
    const id = hashURL(url);

    const options = {
        method: "GET",
        url: "https://www.virustotal.com/api/v3/urls/" + id,
        headers: {
            Accept: "application/json",
            "x-apikey": API_KEY,
        },
    };

    return new Promise((resolve, reject) => {
        axios
            .request(options)
            .then(function (response) {
                return response.data.data.attributes;
            })
            .then((res) => {
                //console.log(calculatePercent(res));
                resolve(calculatePercent(res));
            })
            .catch(function (err) {
                //console.log(url, "err");
                //console.log(err);
                resolve("err");
            });
    });
}

async function test() {
    var listURL = [];
    var listError = [];
    var listResult = [];

    var data = fs.readFileSync("./URLMaliciousTestCase.txt", "utf8");
    listURL = data.split(/\r\n|\n/);
    // listURL.sort();
    // const newSet = [...new Set(listURL)];
    // console.log(newSet);
    // return;
    try {
        console.log(listURL.length);
        var x = 0,
            count = 0,
            k = 0;

        for (var i of listURL) {
            count++;
            const a = await checkURLFile(i, API_KEY_VIRUSTOTAL[x]);
            if (a.level != "none") {
                const dataAdd = {
                    url: a.url,
                    level: a.level,
                    Status: true,
                    number: k + 1,
                };
                var dataDanger = fs.readFileSync("./Danger.json", "utf8");
                if (dataDanger != "") {
                    var listURDanger = JSON.parse(dataDanger);
                    dataDanger = JSON.stringify(
                        [...listURDanger, dataAdd],
                        null,
                        4
                    );
                    fs.writeFileSync("./Danger.json", dataDanger, "utf8");
                } else {
                    fs.writeFileSync(
                        "./Danger.json",
                        JSON.stringify([dataAdd], null, 4),
                        "utf8"
                    );
                }
            } else {
                const dataAdd = {
                    url: a.url,
                    level: a.level,
                    Status: false,
                    number: k + 1,
                };
                var dataNone = fs.readFileSync("./None.json", "utf8");
                if (dataNone != "") {
                    var listURNone = JSON.parse(dataNone);
                    dataNone = JSON.stringify(
                        [...listURNone, dataAdd],
                        null,
                        4
                    );
                    fs.writeFileSync("./None.json", dataNone, "utf8");
                } else {
                    fs.writeFileSync(
                        "./None.json",
                        JSON.stringify([dataAdd], null, 4),
                        "utf8"
                    );
                }
            }
            if (a == "err") {
                listError.push(i);
                console.log(i, " - 404");
                // await new Promise((resolve) => setTimeout(resolve, 1000));
                continue;
            }
            // a.Definition = i[1];
            //const a = await checkURLFile(i, API_KEY_VIRUSTOTAL[x]);
            k++;
            // //console.log(a);
            console.log(k, i, " - done! ", x, API_KEY_VIRUSTOTAL[x]);
            x++;
            listResult.push(a);
            if (x == 30) {
                x = 0;
            }
            // await new Promise((resolve) => setTimeout(resolve, 1000));

            // if (count == 32) {
            //     break;
            // }
        }
    } catch (error) {
        console.log(error);
    }
    //console.log(listResult);
    try {
        // convert JSON object to a string
        const data = JSON.stringify(listResult, null, 4);

        // write file to disk
        fs.writeFileSync("./AllResult.json", data, "utf8");

        console.log(`File AllResult is written successfully!`);
    } catch (err) {
        console.log(`Error writing file: ${err}`);
    }
    //console.log(listError);
    try {
        // convert JSON object to a string
        const data = JSON.stringify(listError, null, 4);

        // write file to disk
        fs.writeFileSync("./error.json", data, "utf8");

        console.log(`File error is written successfully!`);
    } catch (err) {
        console.log(`Error writing file: ${err}`);
    }
}
test();
