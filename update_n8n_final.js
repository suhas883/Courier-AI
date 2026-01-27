const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'n8n_workflow_FIXED.json');
const outputFile = path.join(__dirname, 'n8n_workflow_PRODUCTION.json');

try {
    const workflow = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

    const updateNodes = (nodes) => {
        const node = nodes.find(n => n.name === 'Publish to Replit');
        if (node) {
            node.parameters.url = 'https://livetrackings.com/api/publish';
            node.parameters.sendBody = true;
            node.parameters.specifyBody = 'string';
            node.parameters.headerParameters = {
                parameters: [
                    { name: 'X-Publish-Secret', value: 'livetrackings-pseo-2024' },
                    { name: 'Content-Type', value: 'application/json' }
                ]
            };
            node.parameters.body = JSON.stringify({
                filename: '{{ $node["Fetch Pending Offers"].json["primary_keyword"].toLowerCase().normalize(\'NFD\').replace(/[\\u0300-\\u036f]/g, \'\').replace(/[^a-z0-9 ]/g, \'\').replace(/ /g, "-") }}.html',
                language: '{{ $node["Fetch Pending Offers"].json["language_code"] }}',
                subdirectory: '{{ $node["Fetch Pending Offers"].json["language_code"] }}/{{ $node["Fetch Pending Offers"].json["subdirectory"] }}',
                html: '{{ JSON.stringify($json.candidates[0].content.parts[0].text) }}'
            }, null, 2).replace(/"\{\{/g, '{{').replace(/\}\}"/g, '}}');
        }
    };

    updateNodes(workflow.nodes);
    if (workflow.activeVersion && workflow.activeVersion.nodes) {
        updateNodes(workflow.activeVersion.nodes);
    }

    workflow.settings = workflow.settings || {};
    workflow.settings.executionLimit = 1;

    fs.writeFileSync(outputFile, JSON.stringify(workflow, null, 4), 'utf8');
    console.log('✅ Success: n8n_workflow_PRODUCTION.json created');
} catch (e) {
    console.error('❌ Error:', e.message);
    process.exit(1);
}
