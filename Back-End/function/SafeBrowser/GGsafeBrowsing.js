async function checkGGSafe(url, API_KEY) {
    const lookup = require("safe-browse-url-lookup")({
        apiKey: API_KEY,
    });
    return new Promise((resolve, reject) => {
        lookup
            .checkSingle(url)
            .then((isMalicious) => {
                const c = isMalicious
                    ? "Hands off! This URL is evil!"
                    : "Everything's safe.";
                resolve(!isMalicious);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = checkGGSafe;

// checkGGSafe(
//     "http://testsafebrowsing.appspot.com",
//     "AIzaSyDvUNXbhbkvMp1uPRpq6me5-AZxP1djEoc"
// );
