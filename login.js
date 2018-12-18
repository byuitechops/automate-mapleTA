/**
 * Login
 * 1) Checks for default paths for username/password
 * 2) If there aren't any, prompt user for username/password
 * 3) Instantiates puppeteer and tries logging in
 * 4) Log results
 **/

// require inquire package

/**
 * checkForDefaults
 * 
 * Check to see if there are default variables
 * If so, set the username/password
 * 
 */
function checkForDefaults() {

}

/**
 * getCredentials
 * 
 * Prompts user for username
 * Prompts user for password
 * Stores both values in an object and passes it on
 */
function getCredentials() {
    // Get username
    let username;
    // Get password
    let password;
    return { username, password };
}

/**
 * Login
 * 
 * Creates instance of puppeteer
 * Uses credentials to try logging in
 * Reports back whether or not it worked
 */
function login(credentials) {
    // Start puppeteer
    // Try logging in with credentials
    // Return result / if fails, prompt for credentials again
}

module.exports = async () => {
    await checkForDefaults();
    let credentials = await getCredentials();
    await login(credentials);
}