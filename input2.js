/**
 * Input
 * 1) Asks for file name of CSV containing course IDs
 * 2) Asks for file name of CSV containing assignment information which
 * will include Assignment name, Module ID/Name, and potentially their order
 **/

// require inquire package

/**
 * getCourseCSV
 * 
 * Prompt user for filename
 * Check if it's a valid file
 * parse and create array of course OUs
 */
function getCourseCSV() {

}

/**
 * getAssignmentsCSV
 * 
 * Prompt user for filename
 * Check to see if it's a valid file
 * parse and create array of assignments
 */
function getAssignmentCSV() {

}

/**
 * willCreateHomeLink
 * 
 * Prompts the user if they'd like to setup 
 * a link to the MapleTA home within their canvas course
 * 
 * Defaults no.
 */
function willCreateHomeLink() {
    // prompts y or n
    // Defaults n
}

module.exports = async () => {
    let courseList = await getCourseCSV();
    let assignmentList = await getAssignmentCSV();
    let willCreateHomeLink = await willCreateHomeLink();
    return {
        courseList,
        assignmentList,
        willCreateHomeLink
    }
}