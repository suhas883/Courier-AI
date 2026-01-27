$N8N_URL = "http://65.108.50.43:5678/api/v1"
$API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MmM5ODkxMy03MzgwLTQwZWItYjc5MS0zMzljZjNjYmExNzAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5MzQzNTQwLCJleHAiOjE3NzE5MDkyMDB9.yVueU1NIfpHzqCaBrlVm1eQJHgozLHiK10vViHqnth4"

$headers = @{
    "X-N8N-API-KEY" = $API_KEY
    "Content-Type"  = "application/json"
}

# 1. Create Credential
Write-Host "🔑 Creating Neon Database credential..." -ForegroundColor Cyan

$credBody = @{
    name = "Neon Database"
    type = "postgres"
    data = @{
        host     = "ep-super-fog-aetldu76-pooler.c-2.us-east-2.aws.neon.tech"
        database = "neondb"
        user     = "neondb_owner"
        password = "npg_7rBYLqI6sfJj"
        port     = 5432
        ssl      = "allow"
    }
}

try {
    # Try creating WITHOUT passphrase first
    $jsonBody = $credBody | ConvertTo-Json -Depth 10
    $credResponse = Invoke-RestMethod -Uri "$N8N_URL/credentials" -Headers $headers -Method POST -Body $jsonBody
    $credId = $credResponse.id
    Write-Host "✅ Credential created! ID: $credId" -ForegroundColor Green
}
catch {
    Write-Host "⚠️ First attempt failed: $($_.Exception.Message)" -ForegroundColor Yellow
    # If failed, try WITH passphrase (sometimes specific n8n setups require it)
    # But usually API key auth shouldn't need it. 
    # Let's try to list credentials to see if we can find one to update instead?
    # No, let's assume valid key.
    
    # If it failed with 400, maybe it already exists?
    Write-Host "   Attempting to find existing credential..."
    try {
        $allCreds = Invoke-RestMethod -Uri "$N8N_URL/credentials" -Headers $headers -Method GET
        $existing = $allCreds.data | Where-Object { $_.name -eq "Neon Database" }
        if ($existing) {
            $credId = $existing.id
            Write-Host "✅ Found existing credential! ID: $credId" -ForegroundColor Green
        }
        else {
            throw "Could not create or find credential."
        }
    }
    catch {
        Write-Host "❌ FATAL: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

# 2. Update Workflow
Write-Host "🔄 Fetching workflow..." -ForegroundColor Cyan
try {
    $workflows = Invoke-RestMethod -Uri "$N8N_URL/workflows" -Headers $headers -Method GET
    $workflow = $workflows.data | Where-Object { $_.name -like "*V24 MULTILINGUAL*" } | Select-Object -First 1

    if (-not $workflow) {
        throw "Workflow not found! Please import it first."
    }

    $workflowId = $workflow.id
    Write-Host "   Found workflow: $($workflow.name) ($workflowId)" -ForegroundColor Gray

    # Get full details
    $fullWorkflow = Invoke-RestMethod -Uri "$N8N_URL/workflows/$workflowId" -Headers $headers -Method GET

    # 3. Modify Nodes
    Write-Host "🔗 Linking nodes to credential..." -ForegroundColor Cyan
    $nodesModified = 0
    
    foreach ($node in $fullWorkflow.nodes) {
        if ($node.name -in @("Restore Database", "Fetch Pending Offers", "Mark as Published")) {
            # Add credential reference
            $node | Add-Member -MemberType NoteProperty -Name "credentials" -Value @{
                postgres = @{
                    id   = $credId
                    name = "Neon Database"
                }
            } -Force
            $nodesModified++
            Write-Host "   - Linked '$($node.name)'" -ForegroundColor Gray
        }
    }

    # 4. Save Workflow
    if ($nodesModified -gt 0) {
        $updateBody = $fullWorkflow | ConvertTo-Json -Depth 100
        $updateResponse = Invoke-RestMethod -Uri "$N8N_URL/workflows/$workflowId" -Headers $headers -Method PUT -Body $updateBody
        Write-Host "✅ Workflow updated successfully with credentials!" -ForegroundColor Green
    }
    else {
        Write-Host "⚠️ No nodes matched for update." -ForegroundColor Yellow
    }

}
catch {
    Write-Host "❌ Workflow Update Failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "`n🎉 DONE! You can now go to n8n and click 'Execute' on the Restore Database node." -ForegroundColor Green
