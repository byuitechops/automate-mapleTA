function selectClassAndAssignment(classId, classOption, assignmentId, assignmentOption) {
    return new Promise(function (fullfill, reject) {
        try{

            var courseSelect = document.querySelector(classId);
            var assignmentSelect = document.querySelector(assignmentId);
            var config = {
                attributes: false,
                childList: true,
                subtree: true
            };
            
            var callback = function (mutationsList, observer) {
                fullfill(true);
            };
            
            var observer = new MutationObserver(callback);
            
            // Start observing the assignment node for option changes
            observer.observe(assignmentSelect, config);
            
            //change the course select element
            courseSelect.selectedIndex = classOption.index;
            
            //Tell them we changed it
            var change = new Event('change');
            courseSelect.dispatchEvent(change);
        } catch(e){
            reject(e);
        }
    });
}



// create all the steps in this one function and then export it over to the other side of things.
module.exports = async function goToAssignment(url, page) {
    const classId = '#classId';
    const assignmentId = '#assignmentId';
    const courseName = 'Joshua McKinney Sandbox - Zach Heiner';
    const assignmentName = 'Maple Graded Questions';
    const assignmentButtonSelector = '#assignmentMapping';

    console.log('Made it');
    await page.goto(url, {
        waitUntil: ['load', 'domcontentloaded']
    });

    const frame = await page.frames().find(frame => frame.name() == 'tool_content');
    var courses = await frame.$eval(classId, getMapleTADropdownOptions);
    var assignments = await frame.$eval(assignmentId, getMapleTADropdownOptions);
    await frame.waitForSelector(`${classId} option`);
    var course = findOption(courseName, courses);
    await frame.waitForSelector(`${assignmentId} option`);
    var assignment = findOption(assignmentName, assignments);
    console.log(course);

    // var callback = await function(mutationList, observer){
    //     for(var mutation of mutationList){
    //         if (mutation.type == 'childlist'){
    //             console.log('got it')
    //         }
    //         else if (mutation.type == 'attributes'){
    //             console.log('didnt')
    //         }
    //     }
    // }    
    // var observer = new MutationObserver(callback);
    // await frame.waitFor(3000);
    // await frame.waitForFunction(listenForSelectOptionsChange, {},[classId]);

    
    // await Promise.all([frame.waitForFunction(listenForSelectOptionsChange, {},[assignmentId]),   frame.select(classId, course.value)]);
    
    //await Promise.all([observer.observe(assignmentId, config),  frame.select(assignmentId, assignment.value)]);
    // await frame.waitFor(3000);
    await frame.evaluate(selectClassAndAssignment,classId,course, assignmentId, assignment);
    await frame.select(assignmentId, assignment.value);
    await Promise.all([frame.waitForNavigation({waitUntil: 'networkidle0'}, frame.click(assignmentButtonSelector))]);
}






function getMapleTADropdownOptions(dropdown) {
    //get all the option tags in the select tag, make array
    var assignments = Array.from(dropdown.querySelectorAll('option'));
    //map array of elements to assignment objs
    return assignments.map((ele, i) => ({
        name: ele.text.trim(),
        value: ele.value,
        index: i
    }));
}

function findOption(name, dropDownOptions) {

    dropDownOptions = dropDownOptions.filter((option) => {
        return option.name === name;
    })

    if (dropDownOptions.length === 0) {
        throw new Error(`Did not find the option "${name}"`);
    } else if (dropDownOptions.length > 1) {
        throw new Error(`Found more than one option "${name}"`);
    } else {
        return dropDownOptions[0];
    }

}






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


//https://byui.instructure.com/courses/80/assignments/941981

// module.exports = async (courseName, assignmentName) => {
//     await selectCourse(courseName);
//     await selectAssignment(assignmentName);
//     await finish();
// }