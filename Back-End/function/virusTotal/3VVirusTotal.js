require("./constants");
var calculatePercent = require("./analysisResVTAPI");
var hashURL = require("./hashURL.js");
const axios = require("axios").default;

async function checkURLFile(url, API_KEY) {
    //const url = "http://pornhub.com/";
    const id = hashURL(url);
    // console.log(id);
    // console.log(url, API_KEY);

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
                reject(`${url} err`);
            });
    });
}
module.exports = checkURLFile;

// async function test(API_KEY) {
//     try {
//         const a = await checkURLFile("ae288.net", API_KEY);
//         console.log(a);
//     } catch (error) {
//         console.log(error);
//     }
// }

// test(API_KEY_VIRUSTOTAL[6]);
