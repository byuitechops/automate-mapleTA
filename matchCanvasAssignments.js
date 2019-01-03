const normalizeName = require('./normalizeAssignmentName');

module.exports = (assignmentListCSV, assignmentListCanvas) => {

    var canvasAssignmentObjs, combinedList,
        matchLists = {
            matches: [],
            noMatches: []
        };

    //Keep the Keys we want
    function makeCanvasAssignmentObjs(canvasAssignment) {
        return {
            name: canvasAssignment.name,
            normalizedName: normalizeName(canvasAssignment.name),
            url: canvasAssignment.url

        };
    }

    function makeMatches(matchLists, csvAssignment) {
        //normalize the csv name for comparison
        csvAssignment.normalizedNameCanvas = normalizeName(csvAssignment.nameCanvas)
        var match = {
            csv: csvAssignment
        };

        //search the canvas assignments to find a match  
        var matches = canvasAssignmentObjs.filter(canvas => canvas.normalizedName === match.csv.normalizedNameCanvas);

        //how many matches did we get?
        if (matches.length === 0) {
            //none
            match.message = `No match in Canvas`
            matchLists.noMatches.push(match);
        } else if (matches.length > 1) {
            //too many
            match.message = `Found ${matches.length} matches in Canvas`
            //save the matches for debugging
            match.tooManyMatches = matches;
            matchLists.noMatches.push(match);
        } else {
            //just right
            match.canvas = matches[0];
            matchLists.matches.push(match)
        }

        return matchLists;
    }
    //get just the parts of the canvas assignments we want to keep
    canvasAssignmentObjs = assignmentListCanvas.map(makeCanvasAssignmentObjs);

    //starting with the CSV list find the Canvas assignment matches 
    combinedList = assignmentListCSV.reduce(makeMatches, matchLists);

    return combinedList;
}