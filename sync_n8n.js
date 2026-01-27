
const http = require('http');
const fs = require('fs');
const path = require('path');

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTVhM2EzNy1jNmU3LTRjNjMtODU5NC1hMWIxNTc5NzMyNDQiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5MjU5MDkxLCJleHAiOjE3NzE3ODUwMDB9.oBA9nqmaQ_NB7mUvW8IxHNcAD45_1cg_BblnyXqGRVI';
const HOST = '65.108.50.43';
const PORT = 5678;

// Helper to make HTTP requests
function request(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: HOST,
            port: PORT,
            path: '/api/v1' + path,
            method: method,
            headers: {
                'X-N8N-API-KEY': API_KEY,
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(data ? JSON.parse(data) : {});
                } catch (e) {
                    resolve({});
                }
            });
        });

        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

async function main() {
    console.log('🔍 Connecting to n8n...');

    // 1. List existing workflows
    try {
        const response = await request('GET', '/workflows');
        const existingWorkflows = response.data || [];
        console.log(`✅ Found ${existingWorkflows.length} workflows`);

        // 2. Define workflows to sync
        const workflowsToSync = [
            { name: 'RESET DATABASE TOOL', file: 'n8n_RESET_DB.json' },
            { name: 'LiveTrackings MASTER (V15 - FINAL FIXED)', file: 'n8n_v15_FINAL.json' }
        ];

        for (const wf of workflowsToSync) {
            console.log(`\nProcessing: ${wf.name}...`);
            const fileContent = fs.readFileSync(path.join(process.cwd(), wf.file), 'utf8');
            const json = JSON.parse(fileContent);

            const existing = existingWorkflows.find(w => w.name === wf.name);

            let id;
            if (existing) {
                console.log(`   🔄 Updating existing workflow (ID: ${existing.id})...`);
                await request('PUT', `/workflows/${existing.id}`, json);
                id = existing.id;
                console.log('   ✅ Updated!');
            } else {
                console.log('   ➕ Creating new workflow...');
                const res = await request('POST', '/workflows', json);
                id = res.data.id;
                console.log(`   ✅ Created! (ID: ${id})`);
            }

            // Activate if Master
            if (wf.name.includes('MASTER')) {
                console.log('   🚀 Activating...');
                await request('POST', `/workflows/${id}/activate`);
                console.log('   ✅ Active!');
            }
        }

        console.log('\n✨ All done! Workflows are synced and active.');

    } catch (err) {
        console.error('❌ Error:', err.message);
    }
}

main();
