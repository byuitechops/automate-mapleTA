//const puppeteer = require('puppeteer');

// create all the steps in this one function and then export it over to the other side of things.
async function goToAssignment(url, page) {
    console.log('Made it');
    await page.goto(url, {
        waitUntil: ['load', 'domcontentloaded']
    });
    
}




function getMapleTADropdownOptions(dropdown) {
    //get all the option tags in the select tag, make array
    var assignments = Array.from(dropdown.querySelectorAll('option'));
    //map array of elements to assignment objs
    return assignments.map(ele => ({
        name: ele.text.trim(),
        value: ele.value
    }));
}


// var courses = await frame.$eval('#classId', getMapleTADropdownOptions);
// var assignements = await frame.$eval('#assignmentId', getMapleTADropdownOptions);



/**
 * Automation
 * This file will contain the puppeteer part
 */

/**
 * selectCourse
 * @param {String} courseName 
 * 
 * Matches the courseName with the correct course in the Maple TA list
 */
function selectCourse(courseName) {

}

/**
 * selectAssignment
 * @param {String} assignmentName 
 * 
 * Matches the assignmentName with the correct course in the Maple TA list
 */
function selectAssignment(assignmentName) {

}

/**
 * finish!
 * 
 * Assuming everything went well. Presses the link button
 */
function finish() {
    // presses done button.
}

module.exports = {
    goToAssignment: goToAssignment
}

//https://byui.instructure.com/courses/80/assignments/941981

// module.exports = async (courseName, assignmentName) => {
//     await selectCourse(courseName);
//     await selectAssignment(assignmentName);
//     await finish();
// }