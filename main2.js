const canvas = require('./login2');
const makeAssignment = require('./makeLTIAssignment');
const automation = require('./automation');
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

        var page = await canvas.login({
            userName: process.env.CANVAS_USERNAME || "asdkfj",
            passWord: process.env.CANVAS_PASSWORD || "1234"
        });

        assignment = await makeAssignment('80', assignmentData, ltiTool, false);

        console.log('Created assignment', JSON.stringify(assignment, null, 4));

        //call the automation
        await automation.goToAssignment(assignment.html_url, page);

        console.log(assignment.html_url);
        

    } catch (error) {
        console.error(error);
    }

})();