const fs = require('fs');
const prettyJSON = require('json-stringify-pretty-compact');

// Make the end report for what ran and what didn't
module.exports = function (courses) {
    fs.writeFileSync(`coursesOut_${Date.now()}.json`, prettyJSON(courses), 'utf8')
}