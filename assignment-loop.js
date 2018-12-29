/**
 * Assignment Loop
 * For each course this loop will be run, which will then run the puppeteer
 */

// const automation = require('./automation.js');

// /**
//  * createAssignment
//  * @param {String} assignmentName 
//  * 
//  * Uses Canvas API to create/post assignment with
//  * specified assignment name
//  */
// function createAssignment(assignmentName) {

// }

// /**
//  * createModuleItem
//  * @param {String} moduleName 
//  * 
//  * Inserts new assignment in specified module.
//  * This should be done AFTER the Maple TA stuff is all hooked up 
//  * This is is ensure the assignment is completely "done" before 
//  * putting it in it's respsective module item
//  */

 // function createModuleItem(moduleName) {

// }

// module.exports = async (assignmentList, courseId) => {
//     assignmentList.forEach(assignment => {
//         // actual assignment variables prone to change
//         let assignmentName = assignment.name;
//         let moduleName = assignment.moduleName
//         // async waterfall? keep passing assignment object created in CreateAssignment?
//         await createAssignment(assignmentName);
        
//         // Runs automation module
//         await automation(courseName, assignmentName);

//         // After the assignment is created and linked up, 
//         // insert it into it's respective module
//         await createModuleItem(moduleName);
//     });
// }


module.exports = async (courseId, assignmentList, assignmentCSV) => {
   
    assignmentList.forEach( assignment => {
        let isAssignThere = assignmentCSV.quizNames.includes(assignment.name)
        //console.log(assignment.name);

        if(isAssignThere){
            console.log('Made it');
            console.log(assignment.name);

        }

        
    });
}