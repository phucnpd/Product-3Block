module.exports = function adultVirusTotal(dataTotal) {
    const check18VirusTotal = [
        dataTotal.categories.includes("adult content"),
        dataTotal.categories.includes("sexually explicit"),
        dataTotal.categories.includes("porn"),
        // dataTotal.categories.includes("sex"),
        dataTotal.categories.includes("Pornography"),
        ...dataTotal.categories.map((i) => {
            if (i.toLowerCase().includes("sex education")) {
                return false;
            }
            if (
                i.toLowerCase().includes("sex") ||
                i.toLowerCase().includes("adult")
            ) {
                return true;
            }
        }),
    ];
    // console.log(check18VirusTotal);
    if (check18VirusTotal.includes(true)) {
        return true;
    } else if (dataTotal.title.includes("sex")) {
        return true;
    } else {
        return false;
    }
};
