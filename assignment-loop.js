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
const setupMapleTAAssignment = require('./setupMapleTAAssignment');

module.exports = async (courseId, assignmentList, assignmentCSV) => {
   
// got the nested loop running with forEach loops but according to Seth it wont run async that way, decided to switch to a reduce
   var assignmentsToRun =  assignmentList.reduce((acc, assignment) => {
        
        //nested loops to sort which assignments are there and which are not
        assignmentCSV.forEach(mapleta => {

            //regex and to Upper to do comparisons. Also for whatever reason a mystery character was showing up from the csv
            var capitalAssignment = assignment.name.replace(/&/gi, 'and').replace(/\W/gi, '').toUpperCase();
            var capitalMapleta = mapleta['﻿QUIZ'].replace(/&/gi, 'and').replace(/\W/gi, '').toUpperCase();
            
            //if they match do this
            if (capitalAssignment === capitalMapleta){
                console.log(assignment.name, mapleta['﻿QUIZ']);
                
                // theorectically outside of the loops after the fact, this statement should work with very little modification
                //await setupMapleTAAssignment(assignment.html_url, courseName, assignmentName, page);
            }
            
        })

    }, [])
    
    
    
    
    
    // {
    //     console.log(assignment['﻿QUIZ']);
    // })
    
    
    
    
    
    // assignmentList.forEach( assignment => {
        
    //     //console.log(assignment.name);
    //     console.log(assignmentCSV[0]);
    //     var isAssignThere = assignmentCSV;

    //     if(isAssignThere){
    //         console.log('Made it');
    //         console.log(assignment.name);

    //     }

        
    // });
}