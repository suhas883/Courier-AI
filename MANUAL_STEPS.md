# Final Manual Steps to Complete n8n Setup

Since the automated browser isn't working due to a system environment issue, please complete these final steps manually:

## Step 1: Open n8n UI
Navigate to: http://65.108.50.43:5678/

## Step 2: Open the Workflow
1. Click on "Workflows" in the left sidebar
2. Click on "LiveTrackings - V24 MULTILINGUAL (FR, ES, DE, IT, NL)"

## Step 3: Link Credential to Database Nodes
For each of these 3 nodes:
- **Restore Database**
- **Fetch Pending Offers**
- **Mark as Published**

Do the following:
1. Click on the node
2. In the "Credential to connect with" dropdown, select **"Neon Database"**
3. Make sure SSL is toggled ON

## Step 4: Save the Workflow
Click the "Save" button at the top right

## Step 5: Seed the Database
1. Click on the **"Restore Database"** node
2. Click the "Execute Node" button (play icon)
3. Wait for it to complete successfully

## Step 6: Activate the Workflow
Toggle the workflow switch to **"Active"** at the top right corner

## Verification
After activation, the workflow will run every 2 minutes. To verify:
1. Wait 2-3 minutes
2. Check the "Executions" tab to see if the workflow has run
3. Check your Replit site (livetrackings.com) to see if new pages are being published

---

**Why manual steps?**
The automated browser tool failed due to a Windows environment configuration issue ($HOME variable not set for Playwright). This is a system-level problem that requires administrative fixes on your machine.

The credential "Neon Database" was successfully created via CLI with ID: 1
The workflow exists with ID: WiSSG67QrVOWzGQI
