$N8N_URL = "http://65.108.50.43:5678/api/v1"
$API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2EwYzNhNC0wMzVlLTQyNWMtOWIyMC0wYTk0OWRlN2EwNzkiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5MzQyNDc4LCJleHAiOjE3NzE5MDkyMDB9.YLfZL5mIO077nluzfzkaisXXFKLr8cLmSHJOzz3aZJ0"

$headers = @{
    'X-N8N-API-KEY' = $API_KEY
    'Content-Type'  = 'application/json'
}

Write-Host "📦 Reading workflow JSON..." -ForegroundColor Cyan
$workflowJson = Get-Content "n8n_v24_MULTILINGUAL.json" -Raw

Write-Host "🔍 Checking for existing workflows..." -ForegroundColor Cyan
try {
    $existingWorkflows = Invoke-RestMethod -Uri "$N8N_URL/workflows" -Headers $headers -Method GET
    $workflowName = "LiveTrackings - V24 MULTILINGUAL (FR, ES, DE, IT, NL)"
    $existing = $existingWorkflows.data | Where-Object { $_.name -eq $workflowName }
    
    if ($existing) {
        Write-Host "♻️  Workflow already exists (ID: $($existing.id)). Updating..." -ForegroundColor Yellow
        $response = Invoke-RestMethod -Uri "$N8N_URL/workflows/$($existing.id)" -Headers $headers -Method PUT -Body $workflowJson -ContentType 'application/json'
        Write-Host "✅ Workflow updated successfully!" -ForegroundColor Green
        $workflowId = $response.id
    }
    else {
        Write-Host "➕ Creating new workflow..." -ForegroundColor Cyan
        $response = Invoke-RestMethod -Uri "$N8N_URL/workflows" -Headers $headers -Method POST -Body $workflowJson -ContentType 'application/json'
        Write-Host "✅ Workflow created successfully!" -ForegroundColor Green
        $workflowId = $response.id
    }
    
    Write-Host "`n📋 NEXT STEPS:" -ForegroundColor Yellow
    Write-Host "1. Go to: http://65.108.50.43:5678/workflow/$workflowId" -ForegroundColor White
    Write-Host "2. Click on 'Restore Database' node" -ForegroundColor White
    Write-Host "3. Add Postgres credential with your Neon connection string" -ForegroundColor White
    Write-Host "4. Apply same credential to 'Fetch Pending Offers' and 'Mark as Published' nodes" -ForegroundColor White
    Write-Host "5. Click 'Restore Database' to seed data" -ForegroundColor White
    Write-Host "6. Toggle 'Active' ON" -ForegroundColor White
    Write-Host "`n🎯 Workflow URL: http://65.108.50.43:5678/workflow/$workflowId" -ForegroundColor Green
    
}
catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails) {
        Write-Host "   Details: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
}
