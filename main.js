const browserCanvas = require('./login');
const makeCanvasAssignment = require('./makeLTIAssignment');
const input = require('./input.js');
const setupMapleTAAssignment = require('./setupMapleTAAssignment');
const courseName = 'Joshua McKinney Sandbox - Zach Heiner';
const assignmentName = 'Maple Graded Questions';
const makeAssignmentList = require('./get-assignment-list.js');
const assignmentLoop = require('./assignment-loop');


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
            assignment,
            assignmentList;

        //prompt the user for username and password
        var answers  = await input.getInput();

        var page = await browserCanvas.login({
            userName: answers.username,
            passWord: answers.password
        });

        assignmentList = await makeAssignmentList('38650');
        //console.log(assignmentList);
        var assignCSV = await input.getAssignmentCSV(answers.assignmentCSV);
        //console.log(assignCSV);
        await assignmentLoop('38650', assignmentList, assignCSV);

        assignment = await makeCanvasAssignment('80', assignmentData, ltiTool, false);



        //call the automation
        //await setupMapleTAAssignment(assignment.html_url, courseName, assignmentName, page);

        // make nested loop
        // reporting
        // course list
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