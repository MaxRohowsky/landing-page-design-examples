const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    const data = JSON.parse(fs.readFileSync('docs/data.json', 'utf-8'));
    const browser = await puppeteer.launch();

    for (const profile of data) {
        const screenshotPath = path.join('docs', profile.screenshotPath);
        if (fs.existsSync(screenshotPath)) {
            console.log(`Screenshot already exists for ${profile.firstName} ${profile.lastName}, skipping.`);
            continue;
        }

        console.log(`Taking screenshot for ${profile.firstName} ${profile.lastName}...`);

        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 720 });

        const navigationPromise = page.waitForNavigation();
        await page.goto(profile.githubProfile);
        await navigationPromise; // The promise resolves after navigation has finished





        const bodyHandle = await page.$('body');
        const html = await page.evaluate(body => body.innerHTML, bodyHandle);

        //console.log(html);
        const h1Content = await page.$eval('h1', element => element.textContent);
        console.log(h1Content);

        const windowWidth = await page.evaluate(() => {


            if (!!window.React ||
                !!document.querySelector('[data-reactroot], [data-reactid]') ||
                Array.from(document.querySelectorAll('*')).some(e => e._reactRootContainer !== undefined || Object.keys(e).some(k => k.startsWith('__reactContainer')))
            )
                return 'React';

            if (!!document.querySelector('script[id=__NEXT_DATA__]'))
                return 'Next.js';

            if (!!document.querySelector('[id=___gatsby]'))
                return 'Gatsby.js';

            if (!!window.angular ||
                !!document.querySelector('.ng-binding, [ng-app], [data-ng-app], [ng-controller], [data-ng-controller], [ng-repeat], [data-ng-repeat]') ||
                !!document.querySelector('script[src*="angular.js"], script[src*="angular.min.js"]')
            )
                return 'AngularJS';

            if(!!window.__VUE__ || !!window.Vue)
                return 'Vue.js';

            if (!!window.Backbone) console.log('Backbone.js');

            if (!!window.Ember) console.log('Ember.js');

            if (!!window.Meteor) console.log('Meteor.js');

            if (!!window.Zepto) console.log('Zepto.js');

            if (!!window.jQuery) console.log('jQuery.js');

            if(!!window.Nuxt || !!window.__NUXT__)
                return 'Nuxt.js';


        });



        console.log(windowWidth);
        await bodyHandle.dispose();






        const performanceMetrics = JSON.parse(
            await page.evaluate(() => JSON.stringify(performance.getEntriesByType("navigation")[0]))
        );

        console.log(`Page load time is ${performanceMetrics.duration} ms.`);
        console.log(`DOM Content Loaded Time: ${performanceMetrics.domContentLoadedEventEnd - performanceMetrics.startTime} ms`);
        console.log(`Time to Interactive: ${performanceMetrics.domInteractive - performanceMetrics.startTime} ms`);

        await new Promise(resolve => setTimeout(resolve, 2000));
        await page.screenshot({ path: screenshotPath, fullPage: true });
        await page.close();
    }

    await browser.close();
})();