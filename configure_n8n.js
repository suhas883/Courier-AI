const https = require('http');

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MmM5ODkxMy03MzgwLTQwZWItYjc5MS0zMzljZjNjYmExNzAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5MzQzNTQwLCJleHAiOjE3NzE5MDkyMDB9.yVueU1NIfpHzqCaBrlVm1eQJHgozLHiK10vViHqnth4";
const BASE_URL = "http://65.108.50.43:5678/api/v1";

async function request(method, endpoint, body = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(BASE_URL + endpoint);
        const options = {
            method: method,
            headers: {
                'X-N8N-API-KEY': API_KEY,
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(parsed);
                    } else {
                        reject(new Error(`API Error ${res.statusCode}: ${JSON.stringify(parsed)}`));
                    }
                } catch (e) {
                    reject(new Error(`Failed to parse response: ${data}`));
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

async function main() {
    console.log("🚀 Starting n8n configuration...");

    // 1. Create Credential
    console.log("🔑 Creating Neon credential...");
    let credId;
    try {
        const credData = {
            name: "Neon Database",
            type: "postgres",
            data: {
                host: "ep-super-fog-aetldu76-pooler.c-2.us-east-2.aws.neon.tech",
                database: "neondb",
                user: "neondb_owner",
                password: "npg_7rBYLqI6sfJj",
                port: 5432,
                ssl: "allow" // Try allow first
            }
        };
        const cred = await request('POST', '/credentials', credData);
        credId = cred.id;
        console.log(`✅ Credential created! ID: ${credId}`);
    } catch (e) {
        console.log("⚠️ Creation failed, checking existing...");
        try {
            const allCreds = await request('GET', '/credentials');
            const existing = allCreds.data.find(c => c.name === "Neon Database");
            if (existing) {
                credId = existing.id;
                console.log(`✅ Found existing credential! ID: ${credId}`);
            } else {
                throw e; // Original error if not found
            }
        } catch (inner) {
            console.error("❌ Failed to create or find credential:", inner.message);
            process.exit(1);
        }
    }

    // 2. Get Workflow
    console.log("🔄 Fetching workflow...");
    let workflowId;
    let workflowData;
    try {
        const workflows = await request('GET', '/workflows');
        const wf = workflows.data.find(w => w.name.includes("V24 MULTILINGUAL"));
        if (!wf) throw new Error("Workflow not found! Please import it first.");

        workflowId = wf.id;
        workflowData = await request('GET', `/workflows/${workflowId}`);
        console.log(`✅ Found workflow: ${wf.name} (${workflowId})`);
    } catch (e) {
        console.error("❌ Workflow fetch failed:", e.message);
        process.exit(1);
    }

    // 3. Link Nodes
    console.log("🔗 Linking nodes...");
    let modified = false;
    const targetNodes = ["Restore Database", "Fetch Pending Offers", "Mark as Published"];

    workflowData.nodes = workflowData.nodes.map(node => {
        if (targetNodes.includes(node.name)) {
            node.credentials = {
                postgres: {
                    id: credId,
                    name: "Neon Database"
                }
            };
            console.log(`   - Linked '${node.name}'`);
            modified = true;
        }
        return node;
    });

    // 4. Update
    if (modified) {
        try {
            await request('PUT', `/workflows/${workflowId}`, workflowData);
            console.log("✅ Workflow updated successfully!");
        } catch (e) {
            console.error("❌ Workflow update failed:", e.message);
            process.exit(1);
        }
    } else {
        console.log("⚠️ No nodes needed linking.");
    }

    console.log("\n🎉 CONFIGURATION COMPLETE!");
    console.log("1. Go to n8n");
    console.log("2. Open workflow");
    console.log("3. Click 'Execute' on Restore Database node");
    console.log("4. Turn Active ON");
}

main();
