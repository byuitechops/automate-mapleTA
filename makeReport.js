const fs = require('fs'),
 const prettyJSON = require('json-stringify-pretty-compact');

modules.exports = function(courses){
    fs.writeFileSync(`coursesOut_${Date.now()}.json`, prettyJSON(courses), 'utf8')
}