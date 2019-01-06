const normalizeName = require('./normalizeAssignmentName');

module.exports = (assignmentListCSV, assignmentListCanvas) => {

    var canvasAssignmentObjs, combinedList;

    //Keep the Keys we want
    function makeCanvasAssignmentObjs(canvasAssignment) {
        return {
            name: canvasAssignment.name,
            normalizedName: normalizeName(canvasAssignment.name),
            url: canvasAssignment.html_url

        };
    }

    function makeMatches(csvAssignment) {
        
        //normalize the csv name for comparison
        csvAssignment.normalizedNameCanvas = normalizeName(csvAssignment.nameCanvas)
        var match = {
            csv: csvAssignment,
            hasCanvasAssignment: false
        };

        //search the canvas assignments to find a match  
        var matches = canvasAssignmentObjs.filter(canvas => canvas.normalizedName === match.csv.normalizedNameCanvas);

        //how many matches did we get?
        if (matches.length === 0) {
            //none
            match.message = `No match in Canvas`
        } else if (matches.length > 1) {
            //too many
            match.message = `Found ${matches.length} matches in Canvas`
            //save the matches for debugging
            match.tooManyMatches = matches;
        } else {
            //just right
            match.hasCanvasAssignment = true;
            match.canvas = matches[0];
        }

        return match;
    }
    //get just the parts of the canvas assignments we want to keep
    canvasAssignmentObjs = assignmentListCanvas.map(makeCanvasAssignmentObjs);

    //starting with the CSV list find the Canvas assignment matches 
    matches = assignmentListCSV.map(makeMatches);

    return matches;
}