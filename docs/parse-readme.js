const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'companies.md');
const puppeteer = require('puppeteer');


const parseTableRow = (row) => {
    const tableRowRegex = /\|\s*\[([^\]]+)\]\(([^)]+)\)\s*\|\s*([^|]+)\s*\|/g;
    const match = tableRowRegex.exec(row);
    const companyName = match[1];
    const url = match[2];
    const tags = match[3].split(';').map(tag => tag.trim().replace('#', ''));
    return { companyName, url, tags };
};

const getPerformanceMetrics = async (page) => {
    const performanceMetrics = JSON.parse(
        await page.evaluate(() => JSON.stringify(performance.getEntriesByType("navigation")[0]))
    );
    return performanceMetrics.responseEnd - performanceMetrics.requestStart;
};

const getMetaDescription = async (page) => {
    try {
        return await page.$eval('meta[name="description"]', element => element.content);
    } catch (error) {
        console.log('No meta description found');
        return '';
    }

}


const getWebsiteStack = async (page) => {
    return page.evaluate(() => {
        if (!!window.React ||
            !!document.querySelector('[data-reactroot], [data-reactid]') ||
            Array.from(document.querySelectorAll('*')).some(e => e._reactRootContainer !== undefined || Object.keys(e).some(k => k.startsWith('__reactContainer')))
        )
            return 'React';

        if (!!window.jQuery)
            return 'jQuery';

        if (!!document.querySelector('script[id=__NEXT_DATA__]'))
            return 'Next.js';

        if (!!document.querySelector('[id=___gatsby]'))
            return 'Gatsby.js';

        if (!!window.angular ||
            !!document.querySelector('.ng-binding, [ng-app], [data-ng-app], [ng-controller], [data-ng-controller], [ng-repeat], [data-ng-repeat]') ||
            !!document.querySelector('script[src*="angular.js"], script[src*="angular.min.js"]')
        )
            return 'AngularJS';

        if (!!window.__VUE__ || !!window.Vue)
            return 'Vue.js';

        if (!!window.Backbone) console.log('Backbone.js');

        if (!!window.Ember) console.log('Ember.js');

        if (!!window.Meteor) console.log('Meteor.js');

        if (!!window.Zepto) console.log('Zepto.js');

        if (!!window.jQuery) console.log('jQuery.js');

        if (!!window.Nuxt || !!window.__NUXT__)
            return 'Nuxt.js';

        return '';
    });
}

const updateDataFile = async (dataObjects) => {
    const dataFilePath = path.join(__dirname, 'data.json');
    let existingData;

    try {
        existingData = JSON.parse(await fs.readFile(dataFilePath, 'utf8'));
    } catch (error) {
        existingData = [];
    }

    const newData = dataObjects.filter(dataObject =>
        !existingData.some(existingObject => existingObject.companyName === dataObject.companyName)
    );

    await fs.writeFile(dataFilePath, JSON.stringify([...existingData, ...newData], null, 2));
}



const processFile = async (filePath) => {

    data = await fs.readFile(filePath, 'utf8');
    const browser = await puppeteer.launch();
    const tableRowRegex = /\|\s*\[([^\]]+)\]\(([^)]+)\)\s*\|\s*([^|]+)\s*\|/g;
    let dataObjects = [];
    let match;

    // Read the file
    const dataJSON = fsSync.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
    // Parse the JSON string into an object
    const dataJSONArray = JSON.parse(dataJSON);


    while ((match = tableRowRegex.exec(data)) !== null) {

        const { companyName, url, tags } = parseTableRow(match[0]);

        if (dataJSONArray.some(entry => entry.companyName === companyName)) {
            console.log(`DataObject already exists for ${companyName}, skipping.`);
            continue;
        }

        const page = await browser.newPage();

        await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en' });
        await page.setViewport({ width: 1280, height: 720 });
        await page.goto(url);

        const websiteStack = await getWebsiteStack(page);
        const title = await page.title();
        const timeToPageLoad = await getPerformanceMetrics(page);

        const dataObject = {
            timestamp: new Date().toISOString(),
            title: title,
            url: url,
            companyName: companyName,
            screenshotPath: `screenshots/${companyName.replace(/\s/g, '')}.jpeg`,
            tags: tags,
            stack: websiteStack,
            timeToPageLoad: Math.round(timeToPageLoad),
        };
        console.log(dataObject);
        dataObjects.push(dataObject);
    }
    await browser.close();

    await updateDataFile(dataObjects);

    //const json = JSON.stringify(dataObjects, null, 2);
    //console.log(json);
}

processFile(filePath);

