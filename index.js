const getInput = require('./getInput')
const setupMapleTAAssignment = require('./setupMapleTAAssignment');
const browserCanvas = require('./puppeteerLogin');
const getAssignmentListFromCanvas = require('./getAssignmentListFromCanvas');
const matchCanvasAssignments = require('./matchCanvasAssignments');
const makeReport = require('./makeReport');


function getCSV(courseCsvFile) {
    const stripBOM = require('strip-bom');
    const dsv = require('d3-dsv');
    const path = require('path');
    const fs =  require('fs');
    //resolve the path the user puts in
    courseCsvFile = path.resolve(courseCsvFile);
    //read it in and remove the potential BOM and then parse with DSV 
    var csvCourseData = dsv.csvParse(stripBOM(fs.readFileSync(courseCsvFile, 'utf8')));

    return csvCourseData;
}

async function main() {

    try {
        var input, courseCSV, assignmentListCSV, page;
        //set up
        //get user input
        input = await getInput();
        //get courseCSV
        courseCSV = getCSV(input.courseCSV);
        //get the assignmentsCSV
        assignmentListCSV = getCSV(input.assignmentCSV).slice(0,5);

        //log in to Canvas
        page = await browserCanvas.login(input);


        //Course Loop
        for (let i = 0; i < courseCSV.length; i++) {
            const course = courseCSV[i];

            //get canvas assignments
            let assignmentListCanvas = await getAssignmentListFromCanvas(course.courseIdCanvas);

            //match up the assignmentListCanvas with assignmentListCSV
            let assignmentMatches = matchCanvasAssignments(assignmentListCSV, assignmentListCanvas)

            //save the matches to the course for the report 
            course.assignmentMatches = assignmentMatches;

            //Assignment Loop
            for (let j = 0; j < assignmentMatches.length; j++) {
                const assignment = assignmentMatches[j];

                //if we have what we need do it
                if(assignment.hasCanvasAssignment){
                    //run puppeteer 
                    try{
                        await setupMapleTAAssignment(assignment.canvas.url, course.courseNameMapleTA, assignment.csv.nameMapleTA, page);
                        //record progress
                        assignment.madeMapleTAAssignment = true;
                    } catch(puppeteerError){
                        //record error
                        assignment.madeMapleTAAssignment = false;
                        assignment.message = puppeteerError.message;
                    }
                }
            }
            
        }

        //write out report
        makeReport(courseCSV);


        //close puppeteer
        await browserCanvas.logout();

    } catch (e) {
        console.log(e);
    }
}

main();