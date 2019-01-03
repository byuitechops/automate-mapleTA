const inquirer = require('inquirer');
const fs = require('fs');
const d3 = require('d3-dsv');


async function getInput() {
        return inquirer
            .prompt([{
                    type: 'input',
                    name: 'username',
                    message: "Enter your username",
                    default:"sdfsdfsdf"
                },
                {
                    type: 'password',
                    name: 'password',
                    message: 'Enter your password',
                    mask: '*',
                    default:"sdfsdfsdf"
                },
                {
                    type: 'input',
                    name: 'courseCSV',
                    message: 'Enter the course CSV filename',
                    default:"courseList.csv"
                },
                {
                    type: 'input',
                    name: 'assignmentCSV',
                    message: 'Enter the assignment CSV filename',
                    default:"ME 172 Maple TA quiz names.csv"
                }

            ])
            .then(answers => {

                return answers;

            });
}


async function getAssignmentCSV(AssignmentCsvFile){

    var csvAssignmentData = d3.csvParse(stripBOM(fs.readFileSync('ME 172 Maple TA quiz names.csv', 'utf8')));
    return csvAssignmentData;

}

module.exports = {
    
    getInput: getInput,
    // getCourseCSV: getCourseCSV,
    getAssignmentCSV: getAssignmentCSV
}