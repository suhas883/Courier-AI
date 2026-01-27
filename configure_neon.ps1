$N8N_URL = "http://65.108.50.43:5678/api/v1"
$API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2EwYzNhNC0wMzVlLTQyNWMtOWIyMC0wYTk0OWRlN2EwYzkiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5MzQyNDc4LCJleHAiOjE3NzE5MDkyMDB9.YLfZL5mIO077nluzfzkaisXXFKLr8cLmSHJOzz3aZJ0"

$headers = @{
    'X-N8N-API-KEY' = $API_KEY
    'Content-Type'  = 'application/json'
}

# Neon database credentials
$credentialData = @{
    name = "Neon Database"
    type = "postgres"
    data = @{
        host     = "ep-super-fog-aetldu76-pooler.c-2.us-east-2.aws.neon.tech"
        database = "neondb"
        user     = "neondb_owner"
        password = "npg_7rBYLqI6sfJj"
        port     = 5432
        ssl      = "require"
    }
} | ConvertTo-Json -Depth 10

Write-Host "Creating Neon Postgres credential..." -ForegroundColor Cyan

try {
    $credential = Invoke-RestMethod -Uri "$N8N_URL/credentials" -Headers $headers -Method POST -Body $credentialData -ContentType 'application/json'
    Write-Host "✅ Credential created successfully! ID: $($credential.id)" -ForegroundColor Green
    
    Write-Host "`n📋 Next: Manually update the workflow nodes:" -ForegroundColor Yellow
    Write-Host "1. Open the workflow at: http://65.108.50.43:5678/workflows" -ForegroundColor White
    Write-Host "2. Click 'Restore Database' node -> Select 'Neon Database' credential" -ForegroundColor White
    Write-Host "3. Click 'Fetch Pending Offers' node -> Select 'Neon Database' credential" -ForegroundColor White
    Write-Host "4. Click 'Mark as Published' node -> Select 'Neon Database' credential" -ForegroundColor White
    Write-Host "5. Save the workflow" -ForegroundColor White
    Write-Host "6. Click 'Restore Database' to seed data" -ForegroundColor White
    Write-Host "7. Toggle 'Active' ON" -ForegroundColor White
}
catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails) {
        Write-Host "Details: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
}
