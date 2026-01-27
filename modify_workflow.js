const fs = require('fs');

const workflow = JSON.parse(fs.readFileSync('n8n_v13_working.json', 'utf8'));

// 1. Remove Quality Check and Rate Limit nodes
workflow.nodes = workflow.nodes.filter(n => n.name !== "Quality Check" && n.name !== "Rate Limit Delay");

// 2. Update Qwen AI Writer node
const qwenNode = workflow.nodes.find(n => n.name === "Qwen AI Writer");
if (qwenNode) {
    qwenNode.parameters.url = "https://openrouter.ai/api/v1/chat/completions";
    // Update Auth Header
    const authHeader = qwenNode.parameters.headerParameters.parameters.find(p => p.name === "Authorization");
    if (authHeader) {
        authHeader.value = "Bearer YOUR_OPENROUTER_API_KEY";
    }
    // Update Model in JSON Body
    qwenNode.parameters.jsonBody = qwenNode.parameters.jsonBody.replace('"model": "qwen"', '"model": "google/gemini-2.0-flash-001"');
}

// 3. Fix Connections
// Connect Qwen (main:0) -> Publish (main:0)
if (workflow.connections["Qwen AI Writer"]) {
    workflow.connections["Qwen AI Writer"].main = [
        [{ node: "Publish to Replit", type: "main", index: 0 }]
    ];
}

// Remove deleted nodes from connections
delete workflow.connections["Quality Check"];
delete workflow.connections["Rate Limit Delay"];

// Fix "Mark as Published" to stop (remove output)
if (workflow.connections["Mark as Published"]) {
    workflow.connections["Mark as Published"].main = [];
}

fs.writeFileSync('n8n_force_publish.json', JSON.stringify(workflow, null, 2));
console.log("Workflow modified successfully");

