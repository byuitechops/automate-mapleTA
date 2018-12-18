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

module.exports = async (courseName, assignmentName) => {
    await selectCourse(courseName);
    await selectAssignment(assignmentName);
    await finish();
}