const inquirer = require('inquirer');

async function getInput() {
        return inquirer
            .prompt([{
                    type: 'input',
                    name: 'userName',
                    message: "Enter your username",
                    default: process.env.USERNAME || ""
                },
                {
                    type: 'password',
                    name: 'passWord',
                    message: 'Enter your password',
                    mask: '*',
                    default: process.env.PASSWORD || "" 
                },
                {
                    type: 'input',
                    name: 'courseCSV',
                    message: 'Enter the course list CSV filename',
                    default:"./csvs/josh.csv"
                },
                {
                    type: 'input',
                    name: 'assignmentCSV',
                    message: 'Enter the assignment CSV filename',
                    default:"./csvs/assignmentList.csv"
                }

            ])
            .then(answers => {

                return answers;

            });
}


module.exports = getInput