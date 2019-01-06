var norm = require('./normalizeAssignmentName');
async function getCSV(courseCsvFile) {
    const stripBOM = require('strip-bom');
    const dsv = require('d3-dsv');
    const path = require('path');
    const fs =  require('fs');
    //resolve the path the user puts in
    courseCsvFile = path.resolve(courseCsvFile);
    //read it in and remove the potential BOM and then parse with DSV 
    var csvCourseData = dsv.csvParse(stripBOM(fs.readFileSync(courseCsvFile, 'utf8')));

    return csvCourseData;
}

async function main() {

    try {
        var csv = await getCSV('./csvs/ME 172 Maple TA quiz names.csv');

        csv = csv.filter( row => norm( row.nameCanvas) !== norm(row.nameMapleTA))
        console.log(JSON.stringify(csv,null,4));
    } catch (e) {
        console.log(e);
    }
}
main();