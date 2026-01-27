
$ErrorActionPreference = "Stop"

$apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTVhM2EzNy1jNmU3LTRjNjMtODU5NC1hMWIxNTc5NzMyNDQiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5MjU5MDkxLCJleHAiOjE3NzE3ODUwMDB9.oBA9nqmaQ_NB7mUvW8IxHNcAD45_1cg_BblnyXqGRVI"
$n8nUrl = "http://65.108.50.43:5678/api/v1"
$headers = @{ "X-N8N-API-KEY" = $apiKey; "Content-Type" = "application/json" }

Write-Host "Connecting to n8n..."
try {
    $workflows = (Invoke-RestMethod "$n8nUrl/workflows" -Headers $headers).data
}
catch {
    Write-Error "Failed to connect to n8n: $($_.Exception.Message)"
}

function Upsert-Workflow ($name, $file) {
    Write-Host "-------------------------------------------"
    Write-Host "Processing: $name"
    
    if (-not (Test-Path $file)) { 
        Write-Error "File missing: $file" 
        return 
    }
    
    $json = Get-Content $file -Raw
    $existing = $workflows | Where-Object { $_.name -eq $name }
    
    if ($existing) {
        Write-Host "Found existing workflow (ID: $($existing.id)). Updating..."
        try {
            $response = Invoke-RestMethod "$n8nUrl/workflows/$($existing.id)" -Method PUT -Headers $headers -Body $json
            Write-Host "Updated successfully!"
             
            if ($name -like "*MASTER*") {
                Write-Host "Activating..."
                Invoke-RestMethod "$n8nUrl/workflows/$($existing.id)/activate" -Method POST -Headers $headers
                Write-Host "Active!"
            }
        }
        catch { 
            Write-Error "Update failed: $($_.Exception.Message)"
        }
    }
    else {
        Write-Host "Creating new workflow..."
        try {
            $new = Invoke-RestMethod "$n8nUrl/workflows" -Method POST -Headers $headers -Body $json
            Write-Host "Created successfully! ID: $($new.data.id)"
             
            if ($name -like "*MASTER*") {
                Write-Host "Activating..."
                Invoke-RestMethod "$n8nUrl/workflows/$($new.data.id)/activate" -Method POST -Headers $headers
                Write-Host "Active!"
            }
        }
        catch { 
            Write-Error "Create failed: $($_.Exception.Message)"
        }
    }
}

Upsert-Workflow "RESET DATABASE TOOL" "n8n_RESET_DB.json"
Upsert-Workflow "LiveTrackings MASTER (V15 - FINAL FIXED)" "n8n_v15_FINAL.json"

Write-Host "DONE! Workflows are synced."
