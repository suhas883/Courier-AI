const fs = require('fs');
const http = require('http');

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MmM5ODkxMy03MzgwLTQwZWItYjc5MS0zMzljZjNjYmExNzAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5MzQzNTQwLCJleHAiOjE3NzE5MDkyMDB9.yVueU1NIfpHzqCaBrlVm1eQJHgozLHiK10vViHqnth4';

// Helper for HTTP requests
function request(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5678,
            path: `/api/v1${path}`,
            method: method,
            headers: {
                'X-N8N-API-KEY': API_KEY,
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        resolve(data);
                    }
                } else {
                    reject(new Error(`Request failed with status ${res.statusCode}: ${data}`));
                }
            });
        });

        req.on('error', (e) => reject(e));

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

function readJsonFile(path) {
    try {
        const data = fs.readFileSync(path, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading file from ${path}:`, err);
        return null;
    }
}

async function main() {
    console.log("🚀 Starting Debug Workflow Import...");

    try {
        // Read the debug workflow JSON
        // Note: In docker, we'll copy it to /tmp/n8n_debug_replit.json
        const workflowJson = readJsonFile('/tmp/n8n_debug_replit.json');
        if (!workflowJson) throw new Error("Could not read workflow file");

        // Import the workflow
        console.log("📥 Importing Debug Workflow...");
        const importedWorkflow = await request('POST', '/workflows', workflowJson);
        console.log(`✅ Workflow Imported! ID: ${importedWorkflow.id}`);

        // Execute the workflow
        console.log("▶️ Executing Debug Workflow...");
        // Use POST /workflows/{id}/execute
        const execution = await request('POST', `/workflows/${importedWorkflow.id}/execute`, {
            mode: 'manual'
        });

        console.log(`✅ Execution Started! Execution ID: ${execution.id}`);
        console.log(`👉 Check n8n UI or Replit to see if 'debug-test-n8n.html' appears at /claims/`);

        // Wait and check status?
        // Let's just exit

    } catch (err) {
        console.error("❌ Error:", err.message);
        process.exit(1);
    }
}

main();

