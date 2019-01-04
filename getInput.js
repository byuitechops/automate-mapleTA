const inquirer = require('inquirer');

async function getInput() {
        return inquirer
            .prompt([{
                    type: 'input',
                    name: 'userName',
                    message: "Enter your username",
                    default:"sdfsdfsdf"
                },
                {
                    type: 'password',
                    name: 'passWord',
                    message: 'Enter your password',
                    mask: '*',
                    default:"sdfsdfsdf"
                },
                {
                    type: 'input',
                    name: 'courseCSV',
                    message: 'Enter the course list CSV filename',
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


module.exports = getInput