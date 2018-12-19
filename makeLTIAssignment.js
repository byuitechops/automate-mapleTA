var canvas = require('canvas-api-wrapper');
module.exports = async function (canvasId, assignment,LTITool, openInNewTab) {
    return canvas.post(`/api/v1/courses/${canvasId}/assignments`, {
        assignment: {
            'name': assignment.name,
            'description': assignment.description,
            'external_tool_tag_attributes': {
                'url': LTITool.launchURL,
                'content_type': "context_external_tool",
                "content_id": LTITool.toolId,
                'new_tab': openInNewTab ? 1 : 0
            },
            'submission_types': 'external_tool',
            'omit_from_final_grade': false,
            'published': true
        }
    });
}