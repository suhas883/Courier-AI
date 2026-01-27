# Complete n8n Setup Script
$API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MmM5ODkxMy03MzgwLTQwZWItYjc5MS0zMzljZjNjYmExNzAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5MzQzNTQwLCJleHAiOjE3NzE5MDkyMDB9.yVueU1NIfpHzqCaBrlVm1eQJHgozLHiK10vViHqnth4"
$N8N_URL = "http://65.108.50.43:5678"
$SSH_KEY = "C:\Users\suhas\.ssh\hetzner_key"
$SERVER = "root@65.108.50.43"

Write-Host "Starting n8n setup automation..." -ForegroundColor Green

# Step 1: Get workflows
Write-Host "`n[1/6] Fetching workflows..." -ForegroundColor Cyan
$workflowsJson = ssh -i $SSH_KEY -o StrictHostKeyChecking=no $SERVER "curl -s -H 'X-N8N-API-KEY: $API_KEY' '$N8N_URL/api/v1/workflows?limit=100'"
$workflows = $workflowsJson | ConvertFrom-Json

$workflow = $workflows.data | Where-Object { $_.name -like "*V24 MULTILINGUAL*" }

if ($workflow) {
    Write-Host "Found workflow: $($workflow.name) (ID: $($workflow.id))" -ForegroundColor Green
    $workflowId = $workflow.id
}
else {
    Write-Host "Workflow not found!" -ForegroundColor Red
    exit 1
}

# Step 2: Query SQLite for credential
Write-Host "`n[2/6] Querying credential from database..." -ForegroundColor Cyan
$credQuery = "SELECT id, name FROM credentials_entity WHERE name LIKE '%Neon%';"
$credResult = ssh -i $SSH_KEY -o StrictHostKeyChecking=no $SERVER "docker exec n8n sqlite3 /root/.n8n/database.sqlite '$credQuery'"

if ($credResult) {
    $credId = ($credResult -split '\|')[0]
    Write-Host "Found credential ID: $credId" -ForegroundColor Green
}
else {
    Write-Host "Credential not found in database!" -ForegroundColor Red
    exit 1
}

# Step 3: Get full workflow JSON
Write-Host "`n[3/6] Fetching full workflow definition..." -ForegroundColor Cyan
$workflowJson = ssh -i $SSH_KEY -o StrictHostKeyChecking=no $SERVER "curl -s -H 'X-N8N-API-KEY: $API_KEY' '$N8N_URL/api/v1/workflows/$workflowId'"
$workflowData = $workflowJson | ConvertFrom-Json

# Step 4: Update credential references in nodes
Write-Host "`n[4/6] Linking credential to PostgreSQL nodes..." -ForegroundColor Cyan
$nodesToUpdate = @("Restore Database", "Fetch Pending Offers", "Mark as Published")
$updated = 0

foreach ($node in $workflowData.nodes) {
    if ($nodesToUpdate -contains $node.name) {
        if (-not $node.credentials) {
            $node.credentials = @{}
        }
        if (-not $node.credentials.postgres) {
            $node.credentials | Add-Member -NotePropertyName "postgres" -NotePropertyValue @{ id = $credId } -Force
        }
        else {
            $node.credentials.postgres.id = $credId
        }
        Write-Host "  Linked: $($node.name)" -ForegroundColor Green
        $updated++
    }
}

if ($updated -eq 3) {
    Write-Host "All 3 nodes updated" -ForegroundColor Green
}
else {
    Write-Host "Warning: Only $updated/3 nodes updated" -ForegroundColor Yellow
}

# Step 5: Save updated workflow
Write-Host "`n[5/6] Saving updated workflow..." -ForegroundColor Cyan
$updatePayload = @{
    name        = $workflowData.name
    nodes       = $workflowData.nodes
    connections = $workflowData.connections
    settings    = $workflowData.settings
    active      = $true
} | ConvertTo-Json -Depth 20 -Compress

$updatePayload | Out-File -FilePath ".\workflow_update.json" -Encoding UTF8

scp -i $SSH_KEY ".\workflow_update.json" "${SERVER}:/root/workflow_update.json"
ssh -i $SSH_KEY -o StrictHostKeyChecking=no $SERVER "curl -s -X PATCH -H 'X-N8N-API-KEY: $API_KEY' -H 'Content-Type: application/json' -d '@/root/workflow_update.json' '$N8N_URL/api/v1/workflows/$workflowId'" | Out-Null

Write-Host "Workflow updated and activated" -ForegroundColor Green

# Step 6: Execute Restore Database node
Write-Host "`n[6/6] Executing 'Restore Database' node to seed DB..." -ForegroundColor Cyan

$restoreNode = $workflowData.nodes | Where-Object { $_.name -eq "Restore Database" }
if ($restoreNode) {
    $executePayload = @{
        workflowId = $workflowId
        nodeId     = $restoreNode.id
    } | ConvertTo-Json -Compress
    
    $executePayload | Out-File -FilePath ".\execute.json" -Encoding UTF8
    scp -i $SSH_KEY ".\execute.json" "${SERVER}:/root/execute.json"
    
    ssh -i $SSH_KEY -o StrictHostKeyChecking=no $SERVER "curl -s -X POST -H 'X-N8N-API-KEY: $API_KEY' -H 'Content-Type: application/json' -d '@/root/execute.json' '$N8N_URL/api/v1/executions'" | Out-Null
    
    Write-Host "Database seeding initiated" -ForegroundColor Green
}
else {
    Write-Host "Could not find 'Restore Database' node" -ForegroundColor Yellow
}

# Verification
Write-Host "`n=== VERIFICATION ===" -ForegroundColor Magenta
Write-Host "Querying Neon database for offer count..." -ForegroundColor Cyan

Start-Sleep -Seconds 3

$verifyQuery = "SELECT COUNT(*) as total, COUNT(DISTINCT aff_link) as unique_links FROM offers;"
$verifyResult = ssh -i $SSH_KEY -o StrictHostKeyChecking=no $SERVER "docker exec n8n sh -c 'PGPASSWORD=npg_7rBYLqI6sfJj psql -h ep-super-fog-aetldu76-pooler.c-2.us-east-2.aws.neon.tech -U neondb_owner -d neondb -c ""$verifyQuery""'"

Write-Host $verifyResult

Write-Host "`nSetup complete!" -ForegroundColor Green
Write-Host "Workflow is now active and will run every 2 minutes." -ForegroundColor Cyan
Write-Host "Check the n8n UI at: $N8N_URL" -ForegroundColor Cyan
