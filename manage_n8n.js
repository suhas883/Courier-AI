const axios = require('axios');
const fs = require('fs');
const path = require('path');

const N8N_URL = 'http://65.108.50.43:5678/api/v1';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTVhM2EzNy1jNmU3LTRjNjMtODU5NC1hMWIxNTc5NzMyNDQiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5MjU5MDkxLCJleHAiOjE3NzE3ODUwMDB9.oBA9nqmaQ_NB7mUvW8IxHNcAD45_1cg_BblnyXqGRVI';

const headers = {
    'X-N8N-API-KEY': API_KEY,
    'Content-Type': 'application/json'
};

async function checkAndFix() {
    console.log('🔍 Checking n8n workflows...');

    try {
        // 1. Get existing workflows
        const response = await axios.get(`${N8N_URL}/workflows`, { headers });
        const workflows = response.data.data;

        console.log(`✅ Found ${workflows.length} existing workflows:`);
        workflows.forEach(w => console.log(`   - [${w.id}] ${w.name} (Active: ${w.active})`));

        // 2. Define workflows to sync
        const targetWorkflows = [
            {
                file: 'n8n_RESET_DB.json',
                name: 'RESET DATABASE TOOL'
            },
            {
                file: 'n8n_v15_FINAL.json',
                name: 'LiveTrackings MASTER (V15 - FINAL FIXED)'
            }
        ];

        for (const target of targetWorkflows) {
            const existing = workflows.find(w => w.name === target.name);
            const filePath = path.resolve(process.cwd(), target.file);

            if (!fs.existsSync(filePath)) {
                console.error(`❌ File not found: ${target.file}`);
                continue;
            }

            const workflowJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            // n8n API expects the workflow object directly (name, nodes, connections, settings)
            // But the file content is exactly that object.

            if (existing) {
                console.log(`\n🔄 Updating existing workflow: ${target.name}...`);
                // Update
                try {
                    await axios.put(`${N8N_URL}/workflows/${existing.id}`, workflowJson, { headers });
                    console.log(`   ✅ Updated successfully!`);

                    // Activate if it's the master workflow? Usually master workflows should be active for triggers.
                    // But these rely on Manual or Schedule trigger. 
                    // Let's activate the schedule one (MASTER)
                    if (target.name.includes('MASTER')) {
                        await axios.post(`${N8N_URL}/workflows/${existing.id}/activate`, {}, { headers });
                        console.log(`   ✅ Activated!`);
                    }

                } catch (err) {
                    console.error(`   ❌ Failed to update: ${err.message}`);
                    if (err.response) console.error(err.response.data);
                }
            } else {
                console.log(`\n➕ Creating new workflow: ${target.name}...`);
                // Create
                try {
                    const createRes = await axios.post(`${N8N_URL}/workflows`, workflowJson, { headers });
                    console.log(`   ✅ Created successfully! ID: ${createRes.data.data.id}`);

                    if (target.name.includes('MASTER')) {
                        await axios.post(`${N8N_URL}/workflows/${createRes.data.data.id}/activate`, {}, { headers });
                        console.log(`   ✅ Activated!`);
                    }
                } catch (err) {
                    console.error(`   ❌ Failed to create: ${err.message}`);
                    if (err.response) console.error(err.response.data);
                }
            }
        }

        console.log('\n✨ Done! You can now run the workflows from the n8n UI or they will run on schedule.');

    } catch (error) {
        console.error('❌ Error connecting to n8n:', error.message);
        if (error.response && error.response.status === 401) {
            console.error('   Auth failed. API Key might be invalid?');
        }
    }
}

// Needed to install axios usually, but let's try running. If missing, I'll install.
checkAndFix();

