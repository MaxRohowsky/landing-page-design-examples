const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '..', 'README.md');
const dataFilePath = path.join(__dirname, 'data.json');
const puppeteer = require('puppeteer');


const parseTableRow = (row) => {
    const tableRowRegex = /\|\s*\[([^\]]+)\]\(([^)]+)\)\s*\|\s*([^|]+)\s*\|/g;
    const match = tableRowRegex.exec(row);
    const companyName = match[1];
    const url = match[2];
    const tags = match[3].split(';').map(tag => tag.trim().replace('#', ''));
    return { companyName, url, tags };
};

const getH1Content = async (page) => {
    try {
        return await page.$eval('h1', element => element.textContent);
    } catch (error) {
        console.log('No h1 element found');
        return '';
    }
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
    });
}


const processFile = async (filePath) => {

    data = await fs.readFile(filePath, 'utf8');
    const browser = await puppeteer.launch();
    const tableRowRegex = /\|\s*\[([^\]]+)\]\(([^)]+)\)\s*\|\s*([^|]+)\s*\|/g;
    let dataObjects = [];

    while ((match = tableRowRegex.exec(data)) !== null) {

        const { companyName, url, tags } = parseTableRow(match[0]);
        const page = await browser.newPage();

        await page.setExtraHTTPHeaders({'Accept-Language': 'en-US,en'});
        await page.setViewport({ width: 1280, height: 720 });
        await page.goto(url);

        //const bodyContent = await page.$eval('body', element => element.innerHTML);
        //console.log(bodyContent);

        const websiteStack = await getWebsiteStack(page);
        const title = await page.title();
        const timeToPageLoad = await getPerformanceMetrics(page);

        const dataObject = {
            timestamp: new Date().toISOString(),
            title,
            url,
            companyName,
            screenshotPath: `screenshots/${companyName.replace(/\s/g, '')}.jpeg`,
            tags,
            stack: websiteStack,
            timeToPageLoad
        };
        console.log(dataObject);
        dataObjects.push(dataObject);
    }
    await browser.close(); 

    //const json = JSON.stringify(dataObjects, null, 2);
    //console.log(json);
}

processFile(filePath);

/*
// Read the file specified by dataFilePath
fs.readFile(dataFilePath, 'utf8', (err, data) => {

    // If there's an error reading the file, log the error and exit
    if (err) {
        console.error(err);
        return;
    }

    // Initialize an array to hold the existing users
    let existingUsers = [];

    // If the file has data, parse it as JSON and assign it to existingUsers
    if (data) {
        existingUsers = JSON.parse(data);
    }

    // Filter out the users that already exist in the data file
    const newUsers = users.filter(user => !existingUsers.some(existingUser => existingUser.githubProfile === user.githubProfile));

    // Combine the existing users and the new users
    const allUsers = [...existingUsers, ...newUsers];

    // Convert the allUsers array into a JSON string with a 2-space indentation
    const json = JSON.stringify(allUsers, null, 2);

    // Write the JSON string to the same file
    fs.writeFile(dataFilePath, `${json}`, 'utf8', err => {

        // If there's an error writing to the file, log the error and exit
        if (err) {
            console.error(err);
            return;
        }
        // Log a success message
        console.log('Data written to file');
    });
}); */
//});