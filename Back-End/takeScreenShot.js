const puppeteer = require("puppeteer");

(async (domain = "https://3block.systems/dashboard/app") => {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(domain);
    await page.screenshot({
        path: domain.replace(/[^a-zA-Z0-9 ]/g, "-") + ".png",
    });

    await browser.close();
})();
