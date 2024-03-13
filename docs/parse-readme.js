const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'README.md');
const dataFilePath = path.join(__dirname, 'data.json');

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Regular expression to parse a markdown table row
    // \|\s* matches a '|' character followed by zero or more whitespace characters
    // \[([^\]]+)\] matches a '[' character, followed by one or more characters that are not ']', followed by a ']' character. This captures the page name
    // \(([^)]+)\) matches a '(' character, followed by one or more characters that are not ')', followed by a ')' character. This captures the URL
    // ([^|]+) matches one or more characters that are not '|'. This captures the hashtags
    // g at the end is a flag that enables "global" search, meaning the regular expression will find all matches rather than stopping after the first match
    const tableRowRegex = /\|\s*\[([^\]]+)\]\(([^)]+)\)\s*\|\s*([^|]+)\s*\|/g;


    let match;
    let dataObjects = [];



    while ((match = tableRowRegex.exec(data)) !== null) {
        const companyName = match[1];
        const url = match[2];
        const tags = match[3].split(';').map(tag => tag.trim().replace('#', '')); // Split the hashtags string into an array, trim whitespace, remove the '#' character

        console.log(`Name: ${name}`);
        console.log(`URL: ${url}`);
        console.log(`Tags: ${tags}`);


        


        dataObjects.push({
            timestamp: new Date().toISOString(),
            url,
            companyName,
            screenshotPath: `screenshots/${name}.jpeg`,
            tags,
            stack: [],
            timeToPageLoad: 0,
            timeToDOMLoad: 0,
            timeToInteractive: 0,
        });
    }

    const json = JSON.stringify(users, null, 2);
    //console.log(json);
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
});