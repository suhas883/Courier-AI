/**
 * N8N Workflow Import and Execute Script
 * 
 * This script will:
 * 1. Import the fixed workflow (n8n_v14_fixed.json) into your n8n instance
 * 2. Activate it
 * 3. Execute it manually
 * 4. Check the execution results
 */

import fs from 'fs';
import fetch from 'node-fetch';

const N8N_URL = 'http://65.108.50.43:5678';
const N8N_API_KEY = process.env.N8N_API_KEY || 'YOUR_API_KEY_HERE';

async function importWorkflow() {
    console.log('📥 Importing workflow from n8n_v14_fixed.json...');

    const workflowData = JSON.parse(fs.readFileSync('./n8n_v14_fixed.json', 'utf-8'));

    // Import as a new workflow
    const response = await fetch(`${N8N_URL}/api/v1/workflows`, {
        method: 'POST',
        headers: {
            'X-N8N-API-KEY': N8N_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: workflowData.name,
            nodes: workflowData.nodes,
            connections: workflowData.connections,
            settings: workflowData.settings,
            active: true
        })
    });

    if (!response.ok) {
        console.error('❌ Failed to import workflow:', await response.text());
        return null;
    }

    const workflow = await response.json();
    console.log('✅ Workflow imported successfully! ID:', workflow.id);
    return workflow;
}

async function executeWorkflow(workflowId) {
    console.log('🚀 Executing workflow...');

    const response = await fetch(`${N8N_URL}/api/v1/workflows/${workflowId}/execute`, {
        method: 'POST',
        headers: {
            'X-N8N-API-KEY': N8N_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });

    if (!response.ok) {
        console.error('❌ Failed to execute workflow:', await response.text());
        return null;
    }

    const execution = await response.json();
    console.log('✅ Workflow execution started! Execution ID:', execution.id);
    return execution;
}

async function checkExecution(executionId) {
    console.log('🔍 Checking execution results...');

    // Wait a bit for execution to complete
    await new Promise(resolve => setTimeout(resolve, 3000));

    const response = await fetch(`${N8N_URL}/api/v1/executions/${executionId}`, {
        headers: {
            'X-N8N-API-KEY': N8N_API_KEY
        }
    });

    if (!response.ok) {
        console.error('❌ Failed to get execution:', await response.text());
        return;
    }

    const execution = await response.json();
    console.log('📊 Execution status:', execution.finished ? 'FINISHED' : 'RUNNING');
    console.log('📊 Success:', !execution.data?.resultData?.error);

    if (execution.data?.resultData?.error) {
        console.error('❌ Execution error:', execution.data.resultData.error);
    }

    return execution;
}

async function main() {
    console.log('🎯 Starting N8N workflow import and execution...\n');

    if (N8N_API_KEY === 'YOUR_API_KEY_HERE') {
        console.error('❌ Please set N8N_API_KEY environment variable or update the script!');
        console.log('\nTo get your API key:');
        console.log('1. Go to http://65.108.50.43:5678');
        console.log('2. Settings → API');
        console.log('3. Create a new API key');
        console.log('\nThen run: N8N_API_KEY=your-key-here node n8n_import_and_run.js');
        process.exit(1);
    }

    const workflow = await importWorkflow();
    if (!workflow) return;

    const execution = await executeWorkflow(workflow.id);
    if (!execution) return;

    await checkExecution(execution.id);

    console.log('\n✨ Done! Check https://livetrackings.com/guides/en/claims/compensair-en/');
}

main().catch(console.error);
