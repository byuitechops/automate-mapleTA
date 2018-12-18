/**
 * Main File
 * Runs the input
 * Parses CSV into an array of information.
 * Runs through array and runs the course-loop
 * which will run the assignment-loop
 * which will run puppeteer
 */

const login = require('./login.js');
const input = require('./input.js');
const courseLoop = require('./course-loop.js');

// async waterfall this?
// Check for defaults or prompt for credentials
login();

// Assuming they logged in correctly. . .
let data = input();

// Pass the data (assignmentList, courseList, and willCreateHomeLink) into the courseLoop
courseLoop(data);
