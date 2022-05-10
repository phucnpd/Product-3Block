const urlScan = require("urlscan-api");

const URLScan = (url, APIKey) => {
    return new Promise((resolve, reject) => {
        new urlScan().submit(APIKey, url).then(function (submitOutput) {
            get_result(submitOutput.uuid);
            //console.log(JSON.stringify(submitOutput, null, 4))
        });

        get_result = (uuid) => {
            setTimeout(function () {
                new urlScan().result(uuid).then(function (objResult) {
                    console.log(
                        "Status code: " + objResult.statusCode,
                        "uuid: " + uuid
                    );
                    if (objResult.statusCode != 404) {
                        var temp = objResult;
                        var page = temp?.page;
                        var listResult = {};
                        //listHeaders
                        var date =
                            temp?.data?.requests[0]?.response?.response?.headers
                                ?.date;
                        var serverheader =
                            temp?.data?.requests[0]?.response?.response?.headers
                                ?.server;
                        if (!serverheader) {
                            serverheader =
                                temp?.data?.requests[0]?.response?.response
                                    ?.headers?.Server;
                        }
                        if (!date) {
                            date =
                                temp?.data?.requests[0]?.response?.response
                                    ?.headers?.Date;
                        }
                        //listReponse
                        var remotePort =
                            temp?.data?.requests[0]?.response?.response
                                ?.remotePort;
                        var remoteIPAddress =
                            temp?.data?.requests[0]?.response?.response
                                ?.remoteIPAddress;

                        //listAsn
                        var asn = temp?.data?.requests[0]?.response?.asn?.asn;
                        var asncountry =
                            temp?.data?.requests[0]?.response?.asn?.country;
                        var description =
                            temp?.data?.requests[0]?.response?.asn?.description;
                        var name = temp?.data?.requests[0]?.response?.asn?.name;

                        //listGeoip
                        var geoipcountry =
                            temp?.data?.requests[0]?.response?.geoip?.country;
                        var timezone =
                            temp?.data?.requests[0]?.response?.geoip?.timezone;
                        var country_name =
                            temp?.data.requests[0]?.response?.geoip
                                ?.country_name;

                        var links = temp?.data?.links;

                        //listLists
                        var countries = temp?.lists?.countries;
                        var linkDomains = temp?.lists?.linkDomains;

                        //listTask
                        var screenshotURL = temp.task?.screenshotURL;
                        var reportURL = temp?.task?.reportURL;

                        //Add value
                        listResult.page = page;

                        var listHeaders = {};
                        listHeaders.date = date;
                        listHeaders.server = serverheader;
                        listResult.headers = listHeaders;

                        listResult.port = remotePort;

                        listResult.ipaddress = remoteIPAddress;

                        var listAsn = {};
                        listAsn.asn = asn;
                        listAsn.country = asncountry;
                        listAsn.description = description;
                        listAsn.name = name;
                        listResult.asn = listAsn;

                        var listGeoip = {};
                        listGeoip.countries = geoipcountry;
                        listGeoip.timezone = timezone;
                        listGeoip.country_name = country_name;

                        listResult.geoip = listGeoip;

                        listResult.links = links;

                        listResult.countries = countries;

                        listResult.linkDomains = linkDomains;

                        listResult.screenshot = screenshotURL;

                        listResult.report = reportURL;
                        //console.log(listResult);
                        resolve(listResult);
                        // clearInterval(breakInterval);
                    } else {
                        // console.log(objResult);
                        reject(null);
                        console.log("Crash URLScan");
                        // clearInterval(breakInterval);
                    }
                });
            }, 10 * 1000); // re-check every 10 second
        };
    });
};
module.exports = URLScan;
// var a = async () => {
//     console.log("alo alo");
//     const result = await URLScan("pornhub.com");
//     console.log("Type of " + typeof result);
//     console.log("done!!!");
// };

// a();
