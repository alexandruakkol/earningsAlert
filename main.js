const puppeteer = require("puppeteer"), 
    scrapeLatest = require("./scrapeEarnings");

const targetArr = ['IDXX', 'SPG', 'MSFT'];

async function makeBrowser() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    return { page, browser };
}

makeBrowser().then(async (init) => {
    const rez = await scrapeLatest(targetArr, init.page);
    console.log(rez)
    init.browser.close();
})
