const addURLScanResult = require("../function/GrayList/urlScanList");
class testController {
    test(req, res, next) {
        addURLScanResult({
            page: {
                url: "https://de.pornhub.com/",
                domain: "de.pornhub.com",
                country: "US",
                city: "",
                server: "openresty",
                ip: "66.254.114.41",
                ptr: "reflectededge.reflected.net",
                asn: "AS29789",
                asnname: "REFLECTED, US",
            },
            headers: {
                date: "Sat, 08 Jan 2022 09:16:28 GMT",
                server: "openresty",
            },
            port: 443,
            ipaddress: "66.254.114.41",
            asn: {
                asn: "29789",
                country: "US",
                description: "REFLECTED, US",
                name: "REFLECTED",
            },
            geoip: {
                countries: "US",
                timezone: "America/Chicago",
                country_name: "United States",
            },
            links: [
                {
                    href: "https://www.pornhubpremium.com/premium_signup?type=NetworkBar_Ph&compliance=1",
                    text: "Premium",
                },
                {
                    href: "https://www.modelhub.com/?utm_source=pornhub&utm_medium=network-bar&utm_campaign=pornhub-networkbar",
                    text: "Modelhub",
                },
                {
                    href: "https://www.pornhub.com/sex/?utm_source=pornhub&utm_medium=network-bar&utm_campaign=pornhub-networkbar",
                    text: "Sexual wellness",
                },
                {
                    href: "https://www.pornhub.com/insights/?utm_source=pornhub&utm_medium=network-bar&utm_campaign=pornhub-networkbar",
                    text: "Insights",
                },
                {
                    href: "https://www.pornhubselect.com/?utm_source=pornhub&utm_medium=network-bar&utm_campaign=pornhub-networkbar",
                    text: "Pornhub select",
                },
                {
                    href: "https://de.youporn.com/?utm_source=pornhub&utm_medium=network-bar&utm_campaign=pornhub-networkbar",
                    text: "YouPorn",
                },
                {
                    href: "https://de.redtube.com/?utm_source=pornhub&utm_medium=network-bar&utm_campaign=pornhub-networkbar",
                    text: "RedTube",
                },
                {
                    href: "https://de.tube8.com/?utm_source=pornhub&utm_medium=network-bar&utm_campaign=pornhub-networkbar",
                    text: "Tube8",
                },
                {
                    href: "https://www.pornmd.com/?utm_source=pornhub&utm_medium=network-bar&utm_campaign=pornhub-networkbar",
                    text: "PornMD",
                },
                {
                    href: "https://www.thumbzilla.com/?utm_source=pornhub&utm_medium=network-bar&utm_campaign=pornhub-networkbar",
                    text: "Thumbzilla",
                },
                {
                    href: "https://de.youporngay.com/?utm_source=pornhub&utm_medium=network-bar&utm_campaign=pornhub-networkbar",
                    text: "YouPorn gay",
                },
                {
                    href: "https://de.redtube.com/redtube/gay?utm_source=pornhub&utm_medium=network-bar&utm_campaign=pornhub-networkbar",
                    text: "RedTube gay",
                },
                {
                    href: "https://de.tube8.com/gay/?utm_source=pornhub&utm_medium=network-bar&utm_campaign=pornhub-networkbar",
                    text: "Tube8 gay",
                },
                {
                    href: "https://www.pornmd.com/gay/gay?utm_source=pornhub&utm_medium=network-bar&utm_campaign=pornhub-networkbar",
                    text: "PornMD gay",
                },
                {
                    href: "https://www.pornhubapparel.com/",
                    text: "Shop",
                },
                {
                    href: "https://help.pornhub.com/hc/en-us/categories/360002934613",
                    text: "Trust & Safety",
                },
                {
                    href: "https://www.pornhub.com/",
                    text: "English",
                },
                {
                    href: "https://fr.pornhub.com/",
                    text: "Français",
                },
                {
                    href: "https://es.pornhub.com/",
                    text: "Español",
                },
                {
                    href: "https://it.pornhub.com/",
                    text: "Italiano",
                },
                {
                    href: "https://pt.pornhub.com/",
                    text: "Português",
                },
                {
                    href: "https://pl.pornhub.com/",
                    text: "Polski",
                },
                {
                    href: "https://rt.pornhub.com/",
                    text: "Русский",
                },
                {
                    href: "https://jp.pornhub.com/",
                    text: "日本語",
                },
                {
                    href: "https://nl.pornhub.com/",
                    text: "Dutch",
                },
                {
                    href: "https://cz.pornhub.com/",
                    text: "Czech",
                },
                {
                    href: "https://cn.pornhub.com/",
                    text: "中文(简体)",
                },
                {
                    href: "https://guppy.link/click?ADR=SEAM-TAB-DESKTOP-PH",
                    text: "Live Cams",
                },
                {
                    href: "http://ads.trafficjunky.net/ads?zone_id=9642&format=directLP",
                    text: "ECHTE HUREN",
                },
                {
                    href: "https://www.pornhub.com/sextypeme",
                    text: "What’s your Sex Type?",
                },
                {
                    href: "https://help.pornhub.com/hc/en-us/categories/360003146993",
                    text: "FAQ",
                },
                {
                    href: "https://help.pornhub.com/hc/en-us/articles/360046354713",
                    text: "Parental Controls",
                },
                {
                    href: "http://feedback.pornhub.com/",
                    text: "Rückmeldung",
                },
                {
                    href: "https://www.pornhub.com/insights/",
                    text: "Einblicke-Blog",
                },
                {
                    href: "https://www.pornhub.com/sex/",
                    text: "Sexuelles Wellness Center",
                },
                {
                    href: "https://twitter.com/pornhub",
                    text: "",
                },
                {
                    href: "https://www.instagram.com/pornhub/",
                    text: "",
                },
                {
                    href: "https://www.youtube.com/pornhubofficial",
                    text: "",
                },
                {
                    href: "https://www.reddit.com/r/pornhub/",
                    text: "",
                },
                {
                    href: "https://discordapp.com/invite/CdGQXmE",
                    text: "",
                },
            ],
            countries: ["FR", "US", "DE", "BE"],
            linkDomains: [
                "www.pornhubpremium.com",
                "www.modelhub.com",
                "www.pornhub.com",
                "www.pornhubselect.com",
                "de.youporn.com",
                "de.redtube.com",
                "de.tube8.com",
                "www.pornmd.com",
                "www.thumbzilla.com",
                "de.youporngay.com",
                "www.pornhubapparel.com",
                "help.pornhub.com",
                "fr.pornhub.com",
                "es.pornhub.com",
                "it.pornhub.com",
                "pt.pornhub.com",
                "pl.pornhub.com",
                "rt.pornhub.com",
                "jp.pornhub.com",
                "nl.pornhub.com",
                "cz.pornhub.com",
                "cn.pornhub.com",
                "guppy.link",
                "ads.trafficjunky.net",
                "feedback.pornhub.com",
                "twitter.com",
                "www.instagram.com",
                "www.youtube.com",
                "www.reddit.com",
                "discordapp.com",
            ],
            screenshot:
                "https://urlscan.io/screenshots/5fcee0b7-1951-4bcf-92ea-08aba50bb26b.png",
            report: "https://urlscan.io/result/5fcee0b7-1951-4bcf-92ea-08aba50bb26b/",
        });
        res.json("done");
    }
}
module.exports = new testController();
