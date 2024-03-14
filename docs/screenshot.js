const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    const data = JSON.parse(fs.readFileSync('docs/data.json', 'utf-8'));
    const browser = await puppeteer.launch();

    for (const dataObject of data) {
        const screenshotPath = path.join('docs', dataObject.screenshotPath);
        if (fs.existsSync(screenshotPath)) {
            console.log(`Screenshot already exists for ${dataObject.companyName}, skipping.`);
            continue;
        }

        console.log(`Taking screenshot for ${dataObject.companyName} ...`);

        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 720 });
        await page.goto(dataObject.url);
        await new Promise(resolve => setTimeout(resolve, 3000));

         // Scroll to the bottom of the page
         await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
                var totalHeight = 0;
                var distance = 100;
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= scrollHeight){
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });



        await page.screenshot({ path: screenshotPath, fullPage: true });
        await page.close();
    }

    await browser.close();
})();