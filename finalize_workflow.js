const fs = require('fs');

const workflowPath = './n8n_workflow_FIXED.json';
const outputPath = './n8n_workflow_PRODUCTION.json';

try {
    const rawData = fs.readFileSync(workflowPath, 'utf8');
    const workflow = JSON.parse(rawData);

    // Update Publish to Replit node
    const publishNode = workflow.nodes.find(n => n.name === 'Publish to Replit');
    if (publishNode) {
        publishNode.parameters.url = 'https://livetrackings.com/api/publish';
        publishNode.parameters.sendBody = true;
        publishNode.parameters.specifyBody = 'string';
        publishNode.parameters.contentType = 'application/json';

        // The robust Raw body expression for foolproof JSON escaping
        publishNode.parameters.body = `{
  "filename": "{{ $node["Fetch Pending Offers"].json["primary_keyword"].toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-z0-9 ]/g, '').replace(/ /g, "-") }}.html",
  "language": "{{ $node["Fetch Pending Offers"].json["language_code"] }}",
  "subdirectory": "{{ $node["Fetch Pending Offers"].json["language_code"] }}/{{ $node["Fetch Pending Offers"].json["subdirectory"] }}",
  "html": {{ JSON.stringify($json.candidates[0].content.parts[0].text) }}
}`;
        console.log('✅ Updated Publish to Replit node');
    }

    // Update workflow settings
    if (!workflow.settings) workflow.settings = {};
    workflow.settings.executionLimit = 1; // Sequential execution
    console.log('✅ Set concurrent execution limit to 1');

    fs.writeFileSync(outputPath, JSON.stringify(workflow, null, 4), 'utf8');
    console.log(`🚀 Production workflow saved to: ${outputPath}`);
} catch (err) {
    console.error('❌ Error transforming workflow:', err);
    process.exit(1);
}
