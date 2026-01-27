# n8n Workflow Executor Script
# This script imports and executes the workflows via n8n API

$n8nUrl = "http://65.108.50.43:5678"

Write-Host "🚀 Starting n8n workflow execution..." -ForegroundColor Cyan
Write-Host ""

# Check if n8n is accessible
try {
    $healthCheck = Invoke-WebRequest -Uri "$n8nUrl/healthz" -Method GET -UseBasicParsing -TimeoutSec 10
    Write-Host "✅ n8n is online!" -ForegroundColor Green
} catch {
    Write-Host "❌ Cannot reach n8n at $n8nUrl" -ForegroundColor Red
    Write-Host "Please check if n8n is running and accessible" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "📌 Please open your browser and go to:" -ForegroundColor Yellow
Write-Host "   $n8nUrl" -ForegroundColor Cyan
Write-Host ""
Write-Host "Then follow these steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1️⃣  Import RESET workflow:" -ForegroundColor White
Write-Host "   - Click '+' or 'Add Workflow'" -ForegroundColor Gray
Write-Host "   - Click 'Import from File'" -ForegroundColor Gray  
Write-Host "   - Select: C:\Users\suhas\Downloads\Courier-AI (1)\Courier-AI\n8n_RESET_DB.json" -ForegroundColor Gray
Write-Host "   - Click 'Execute Workflow' (▶️)" -ForegroundColor Gray
Write-Host "   - Wait for success message" -ForegroundColor Gray
Write-Host ""
Write-Host "2️⃣  Import MAIN workflow:" -ForegroundColor White
Write-Host "   - Click '+' again" -ForegroundColor Gray
Write-Host "   - Click 'Import from File'" -ForegroundColor Gray
Write-Host "   - Select: C:\Users\suhas\Downloads\Courier-AI (1)\Courier-AI\n8n_v15_FINAL.json" -ForegroundColor Gray
Write-Host "   - Click 'Execute Workflow' (▶️)" -ForegroundColor Gray
Write-Host "   - This will take 5-10 minutes (generates 18 pages)" -ForegroundColor Gray
Write-Host ""
Write-Host "3️⃣  Monitor execution:" -ForegroundColor White
Write-Host "   - Watch the workflow execution panel" -ForegroundColor Gray
Write-Host "   - You'll see it loop through all 18 offers" -ForegroundColor Gray
Write-Host "   - Each page: Fetch data → Generate content → Publish" -ForegroundColor Gray
Write-Host ""
Write-Host "Press Enter to open n8n in your browser..." -ForegroundColor Yellow
Read-Host

Start-Process $n8nUrl

Write-Host ""
Write-Host "✨ Browser opened! Follow the steps above." -ForegroundColor Green
Write-Host ""
Write-Host "After workflows complete, verify with:" -ForegroundColor Yellow
Write-Host "   curl https://livetrackings.com/en/claims/compensair.html" -ForegroundColor Cyan
