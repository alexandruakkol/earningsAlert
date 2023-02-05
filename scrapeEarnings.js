async function scrapeLatest(targetArr, page) {
    let url = `https://www.investing.com/earnings-calendar/`;

        await page.setExtraHTTPHeaders({   
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
            'content-type': 'text/plain;charset=UTF-8',
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9',
        });
        await page.goto(url,{ waitUntil: "domcontentloaded" },{ timeout: 0 });
        const rez = await page.evaluate((targetArr) => {
            const targetRez = [];
            const table = document.querySelector("#earningsCalendarData > tbody");
            const todaysEarnings = Array.from(table.childNodes);
            todaysEarnings.splice(0,2); 
            for(const row of todaysEarnings){
                if(row.nodeName === "#text")continue;
                if(row.getAttribute('tablesorterdivider') != null) break;
                const company = row.querySelector('.earnCalCompany');
                const ticker = company.querySelector('a')?.innerHTML;
                if(targetArr.includes(ticker)) targetRez.push(ticker);
            }
            return targetRez;
        }, targetArr)
    return rez;
}
module.exports=scrapeLatest;