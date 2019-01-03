var canvas = require('canvas-api-wrapper');
module.exports = async function (canvasId) {
    return canvas.get(`/api/v1/courses/${canvasId}/assignments`, {
        order_by: 'name'
    });

}