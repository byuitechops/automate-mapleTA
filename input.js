const inquirer = require('inquirer');
const fs = require('fs');
const d3 = require('d3-dsv');

async function getInput() {
        return inquirer
            .prompt([{
                    type: 'input',
                    name: 'username',
                    message: "Enter your username"
                },
                {
                    type: 'password',
                    name: 'password',
                    message: 'Enter your password',
                    mask: '*'
                },
                {
                    type: 'input',
                    name: 'courseCSV',
                    message: 'Enter the course CSV filename'
                },
                {
                    type: 'input',
                    name: 'assignmentCSV',
                    message: 'Enter the assignment CSV filename'
                }

            ])
            .then(answers => {

                return answers;

            });
}

async function getCourseCSV(courseCsvFile){

    var csvCourseData = d3.csvParse(fs.readFileSync(courseCsvFile, 'utf8'));
    return csvCourseData;
}
async function getAssignmentCSV(AssignmentCsvFile){

    var csvAssignmentData = d3.csvParse(fs.readFileSync(AssignmentCsvFile, 'utf8'));
    return csvAssignmentData;

}

module.exports = {
    
    getInput: getInput,
    getCourseCSV: getCourseCSV,
    getAssignmentCSV: getAssignmentCSV
}