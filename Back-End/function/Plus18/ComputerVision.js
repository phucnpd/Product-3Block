const axios = require("axios");
require("dotenv").config();
module.exports = function adultVision(urlReceived) {
    // console.log(urlReceived);
    return new Promise((resolve, reject) => {
        axios
            .post(
                "https://3block18plus.cognitiveservices.azure.com/vision/v3.2/analyze?visualFeatures=Adult",
                JSON.stringify({
                    url: urlReceived,
                }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Ocp-Apim-Subscription-Key":
                            process.env.API_KEY_AZURE_COPUTERVISION,
                    },
                }
            )
            .then((response) => response.data)
            .then((json) => {
                // console.log(json);
                const dataCheck18Plus = [
                    json.adult.isAdultContent,
                    json.adult.isGoryContent,
                    json.adult.isRacyContent,
                ];
                // console.log(dataCheck18Plus);
                if (dataCheck18Plus.includes(true)) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch((err) => reject(err));
    });
};
