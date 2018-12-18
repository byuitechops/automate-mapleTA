/**
 * Course Loop
 * After logging and giving the program the data this will 
 * loop through each course and run the assignment-loop for each one
 */

const assignmentLoop = require('./assignment-loop.js');

/**
 * navigateToCourse
 * @param {Number} courseId 
 * 
 * uses puppeteer to navigate to course
 */
function navigateToCourse(courseId) {

}

/**
 * setUpMapleTA
 * @param {Boolean} willCreateHomeLink 
 * 
 * Creates prototype assignment to set up initial Maple TA stuff
 * 
 * Within this assignment it creates the Maple TA course.
 * 
 * If willCreateHomeLink is true, it will change this assignment to 
 * link to the Maple TA course home page
 */
function setUpMapleTA(willCreateHomeLink) {

    // Create prototype assignment to set up initial Maple TA stuff

    // Optionally create link to home page of Maple TA course

    // Also creates Maple TA course in assignment
}

module.exports = async (data) => {
    var courseList = data.courseList;
    var assignmentList = data.assignmentList;
    var willCreateHomeLink = data.willCreateHomeLink;
    courseList.forEach(course => {
        // Not sure if it will actually be course.id
        let courseId = course.id;
        await navigateToCourse(courseId);
        await setUpMapleTA(willCreateHomeLink);
        // Runs assignment-loop module
        await assignmentLoop(assignmentList, courseId);
    });
}