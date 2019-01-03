const browserCanvas = require('./login');
const makeCanvasAssignment = require('./makeLTIAssignment');
const input = require('./input.js');
const setupMapleTAAssignment = require('./setupMapleTAAssignment');
const assignmentLoop = require('./assignment-loop');


const courseName = 'Joshua McKinney Sandbox - Zach Heiner';
const assignmentName = 'Maple Graded Questions';


// Josh
const matchCanvasAssignments = require('./matchCanvasAssignments')
const getAssignmentListFromCanvas = require('./getAssignmentListFromCanvas.js');
const courseID = '38650';
const dsv = require('d3-dsv');
const fs = require('fs');


async function getCSV(courseCsvFile) {
    const stripBOM = require('strip-bom');
    var csvCourseData = dsv.csvParse(stripBOM(fs.readFileSync(courseCsvFile, 'utf8')));
    return csvCourseData;
}


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
            assignmentListCanvas;

        //prompt the user for username and password
        var answers = await input.getInput(),
            credentials = {
                userName: answers.username,
                passWord: answers.password
            };

        //log in to canvas with puppeteer 
        // var page = await browserCanvas.login(credentials);

        assignmentListCanvas = await getAssignmentListFromCanvas(courseID);
        // console.log(assignmentListCanvas[0]);
        var assignmentListCSV = await getCSV(answers.assignmentCSV);
        console.log(assignmentListCSV[0]);

        var matches = matchCanvasAssignments(assignmentListCSV,assignmentListCanvas);
        
        console.log("Matches");
        console.log(matches.matches.slice(0,5));
        console.log("NO Matches");
        console.log(matches.noMatches.slice(0));




        //await assignmentLoop(courseID, assignmentList, assignCSV);

        // assignment = await makeCanvasAssignment('80', assignmentData, ltiTool, false);



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
        // await browserCanvas.logout();
    } catch (error) {
        console.error(error);
    }

})();