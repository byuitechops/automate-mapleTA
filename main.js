const browserCanvas = require('./login');
const makeCanvasAssignment = require('./makeLTIAssignment');
const input = require('./input.js');
const setupMapleTAAssignment = require('./setupMapleTAAssignment');
const courseName = 'Joshua McKinney Sandbox - Zach Heiner';
const assignmentName = 'Maple Graded Questions';


(async function () {
    try {
        
        var assignmentData = {
                name: "The Best Name Ever",
                description: "This is the description."
            },
            ltiTool = {
                launchURL: "https://byui-canvas.mapleta.com:443/byui-canvas/lti/",
                toolId: "127"
            },
            assignment;

        //prompt the user for username and password
        var answers  = await input.getInput();

        var page = await browserCanvas.login({
            userName: answers.username,
            passWord: answers.password
        });

        assignment = await makeCanvasAssignment('80', assignmentData, ltiTool, false);

        //call the automation
        await setupMapleTAAssignment(assignment.html_url, courseName, assignmentName, page);

        // make nested loop
        // reporting
        // accept inputs
        // course list
        // mapleta assign list
        // username password - login
        // conditionally find a canvas assignment instead of making one
        // do we need to clone the mapleta course
        // setup a homepage link?
        // do we need to impersonate?
        // Blueprint?
        // 
        await browserCanvas.logout();
    } catch (error) {
        console.error(error);
    }

})();