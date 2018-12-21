const browserCanvas = require('./login');
const makeCanvasAssignment = require('./makeLTIAssignment');
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

        var page = await browserCanvas.login({
            userName: process.env.CANVAS_USERNAME || "asdkfj",
            passWord: process.env.CANVAS_PASSWORD || "1234"
        });

        assignment = await makeCanvasAssignment('80', assignmentData, ltiTool, false);

        //call the automation
        await setupMapleTAAssignment(assignment.html_url, courseName, assignmentName, page);

    } catch (error) {
        console.error(error);
    }

})();