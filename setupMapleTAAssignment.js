// being injected into the browser
//don't run this till the selects are populated for the first time
async function interactWithBrowser(courseCSSSelector, courseName, assignmentCSSSelector, assignmentName) {

    function addMutationObserver(node, callback) {
        var options = {
                attributes: false,
                childList: true,
                subtree: true
            },
            observer = new MutationObserver(callback);

        // Start observing the assignment node for option changes
        observer.observe(node, options);

        return observer;
    }

    function selectOption(selectTag, optionName) {
        function findOption(optionText, selectElement) {

            //make an array of all the options in a selector tag.
            function getMapleTADropdownOptions(selectElement) {
                //get all the option tags in the select tag, make array
                var assignments = Array.from(selectElement.querySelectorAll(`option`));
                //map array of elements to assignment objs
                return assignments.map((ele, i) => ({
                    name: ele.text.trim(),
                    value: ele.value,
                    index: i
                }));
            }

            //match the option to find the right one unless there are too many
            function findMatches(name, dropDownOptions) {
                var matches = dropDownOptions.filter((option) => {
                    return option.name === name;
                })
                if (matches.length === 0) {
                    throw new Error(`Did not find the option "${name}"`);
                } else if (matches.length > 1) {
                    throw new Error(`Found more than one option "${name}"`);
                } else {
                    return matches[0];
                }
            }


            //get the list
            var options = getMapleTADropdownOptions(selectElement);
            // find the matches
            return findMatches(optionText, options);
        }

        function triggerEvent(node, eventString) {
            var event = new Event(eventString, {
                bubbles: true
            });
            node.dispatchEvent(event);
        }

        //find the option we need - if not only one then it throws
        var optionTag = findOption(optionName, selectTag);
        console.log(optionTag);
        //pick the class in the select tag
        selectTag.selectedIndex = optionTag.index;

        //tell them we changed it
        triggerEvent(selectTag, 'change');
    }

    return new Promise(function (fulfill, reject) {

        var courseSelect = document.querySelector(courseCSSSelector);
        var assignmentSelect = document.querySelector(assignmentCSSSelector);
        console.log(courseSelect);
        console.log(assignmentSelect);
        //add the mutation listeners for the selects
        //the courseSelect
        // addMutationObserver(courseSelect, function () {
        //     //finish the promise;
        //     fulfill();
        // });

        //the assignmentSelect - this callback is called when the options are switched out from changing the courseSelect
        addMutationObserver(assignmentSelect, function () {
            try {
                //pick the assignment
                selectOption(assignmentSelect, assignmentName);

                //finish the promise;
                fulfill();

            } catch (error) {
                reject(error.message);

            }
        });

        try {
            //pick the course
            selectOption(courseSelect, courseName);
        } catch (e) {
            reject(e.message);
        }

        //wait for the assignment list to change
    });
}


// create all the steps in this one function and then export it over to the other side of things.
module.exports = async function setupMapleTAAssignment(url, courseName, assignmentName, page) {
    const courseCSSSelector = '#classId';
    const assignmentCSSSelector = '#assignmentId';

    const assignmentButtonCSSSelector = '#assignmentMapping';

    await page.goto(url, {
        waitUntil: ['load', 'domcontentloaded']
    });

    //find the frame that we are jumping into
    const frame = await page.frames().find(frame => frame.name() == 'tool_content');

    //wait for the classId select tag to have options
    await frame.waitForSelector(`${courseCSSSelector} option`);
    
    //wait for the assignment select tag to have options
    await frame.waitForSelector(`${assignmentCSSSelector} option`);

    //set the mapleTA course, and assignment 
    await frame.evaluate(interactWithBrowser, courseCSSSelector, courseName, assignmentCSSSelector, assignmentName);




    //click mapleTA "save" button, wait for page change load
    await Promise.all([frame.waitForNavigation({
        waitUntil: 'networkidle0'
    }, frame.click(assignmentButtonCSSSelector))]);

    
}