const puppeteer = require('puppeteer');
const userNameInput = '#pseudonym_session_unique_id';
const passWordInput = '#pseudonym_session_password';
const button = 'button[type=submit]';
var browser;

async function login(inputs) {
    // set the view window for puppeteer
    browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 1900,
            height: 1080
        },
        args: ['--start-maximized'],
        // args: ['--start-maximized', '--debug-devtools'],
        // devtools: true
    });

    var pages = await browser.pages();
    // set the default amount of pages opened to one
    var page = pages[0];


    // go to the canvas login and input the login and password
    await page.goto('https://byui.instructure.com/login/canvas', {
        waitUntil: ['load', 'domcontentloaded']
    });
    await page.waitForSelector(userNameInput)
    await page.type(userNameInput, inputs.userName);
    await page.type(passWordInput, inputs.passWord);

    await Promise.all([page.waitForSelector('.ic-Dashboard-header__title'), page.click(button)]);
    return page;
}

// close the browser, killing the session when done.
async function logout() {

    await browser.close();

}


module.exports = {

    login: login,
    logout: logout
}