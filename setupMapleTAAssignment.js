//make an array of all the drop downs in the selector.
//This function is being injected into the browser scope.
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

//match the option to find the right one unless there are too many
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


// being injected into the browser
function selectClassAndWaitForAssignment(classId, classOption, assignmentId) {
    return new Promise(function (fullfill, reject) {
        try{

            var courseSelect = document.querySelector(classId);
            var assignmentSelect = document.querySelector(assignmentId);
            var config = {
                attributes: false,
                childList: true,
                subtree: true
            };
            
            var callback = function () {
                fullfill();
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
module.exports = async function setupMapleTAAssignment(url, courseName, assignmentName, page) {
    const classId = '#classId';
    const assignmentId = '#assignmentId';
   
    const assignmentButtonSelector = '#assignmentMapping';

    await page.goto(url, {
        waitUntil: ['load', 'domcontentloaded']
    });
    
    //find the frame that we are jumping into
    const frame = await page.frames().find(frame => frame.name() == 'tool_content');
    //wait for the frame course element to load
    var courses = await frame.$eval(classId, getMapleTADropdownOptions);
    //wait for the frame assignment element to load
    var assignments = await frame.$eval(assignmentId, getMapleTADropdownOptions);
    
    await frame.waitForSelector(`${classId} option`);
    var course = findOption(courseName, courses);
    await frame.waitForSelector(`${assignmentId} option`);
    var assignment = findOption(assignmentName, assignments);
    
    
    
    await frame.evaluate(selectClassAndWaitForAssignment,classId,course, assignmentId, assignment);
    await frame.select(assignmentId, assignment.value);
    await Promise.all([frame.waitForNavigation({waitUntil: 'networkidle0'}, frame.click(assignmentButtonSelector))]);
    console.log(`created the "${assignmentName}" successfully`);
}



