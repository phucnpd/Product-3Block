function validURL(url) {
    var results = "";
    var match;
    if (
        (match = url.match(
            /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im
        ))
    ) {
        results = match[1];
        // if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
        //     result = match[1]
        // }
    }
    results = "http://" + results + "/";
    // console.log(" url " + results);
    //! Hash here
    const input = results;

    const id = Buffer.from(input).toString("base64");

    function deQuyEqual(base64Encode) {
        const base64Encode2 = base64Encode.substring(
            0,
            base64Encode.length - 1
        );
        if (base64Encode2.endsWith("=")) {
            return deQuyEqual(base64Encode2);
        } else {
            return base64Encode2;
        }
    }
    // console.log("base64 ", id);
    var newId = id;
    if (id.endsWith("=")) {
        newId = deQuyEqual(id);
    }
    // console.log("new id " + newId);
    return newId;
}

module.exports = validURL;
