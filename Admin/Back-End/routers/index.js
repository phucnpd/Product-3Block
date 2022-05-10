//require các function router here
// const test = require("./test");
const routeAPI = require("./routeAPI");
const routeURL = require("./routeURL");
const routeGray = require("./routeGray");

function route(app) {
    app.use("/api/3block/system", routeAPI);
    app.use("/db/api/system/3block", routeURL);
    app.use("/user/gray/system/3block", routeGray);
    // app.use("/test", test);
}

module.exports = route;
