const fs = require('fs');

const inputFile = './n8n_workflow_FIXED.json';
const outputFile = './n8n_workflow_PRODUCTION.json';

try {
    const rawData = fs.readFileSync(inputFile, 'utf8');
    const workflow = JSON.parse(rawData);

    // Node updates (main and activeVersion)
    const nodeTargetGroups = [workflow.nodes];
    if (workflow.activeVersion && workflow.activeVersion.nodes) {
        nodeTargetGroups.push(workflow.activeVersion.nodes);
    }

    nodeTargetGroups.forEach(nodes => {
        const node = nodes.find(n => n.name === 'Publish to Replit');
        if (node) {
            node.parameters.url = 'https://livetrackings.com/api/publish';
            node.parameters.method = 'POST';
            node.parameters.sendBody = true;
            node.parameters.specifyBody = 'string';
            node.parameters.headerParameters = {
                parameters: [
                    { name: 'X-Publish-Secret', value: 'livetrackings-pseo-2024' },
                    { name: 'Content-Type', value: 'application/json' }
                ]
            };
            // Gemini FIX: Simplified subdirectory logic (server handles language prefix)
            // Gemini FIX: JSON.stringify handles the HTML content perfectly
            node.parameters.body = `{
  "filename": "{{ $node["Fetch Pending Offers"].json["primary_keyword"].toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-z0-9 ]/g, '').replace(/ /g, "-") }}.html",
  "language": "{{ $node["Fetch Pending Offers"].json["language_code"] }}",
  "subdirectory": "{{ $node["Fetch Pending Offers"].json["subdirectory"] }}",
  "html": {{ JSON.stringify($json.candidates[0].content.parts[0].text) }}
}`;
            console.log('✅ Updated Publish to Replit node configuration');
        }
    });

    // Strategy FIX: Set concurrent execution limit to 1
    workflow.settings = workflow.settings || {};
    workflow.settings.executionLimit = 1;
    console.log('✅ Set concurrent execution limit to 1');

    fs.writeFileSync(outputFile, JSON.stringify(workflow, null, 4), 'utf8');
    console.log(`🚀 Final production workflow saved to: ${outputFile}`);
} catch (err) {
    console.error('❌ Error updating workflow:', err);
    process.exit(1);
}
