# THE GRAIL: Courier-AI pSEO Master Documentation 🏆

## 📝 Project Overview
**Goal:** Automated pSEO site generating ~720 pages/day.
**Stack:** Replit (Frontend/Server) + Neon (Database) + n8n (Automation) + Antigravity/RPA.

---

## 📂 Critical Files (Location: Downloads/Courier-AI (1)/Courier-AI/)

### 1. The Database Seeds (The Fuel) ⛽
- `mega_seed_claims_only.sql` - **(Safest Strategy)** 180 pages, all English, all in `/claims/` folder.
- `mega_seed_ALL_LANGS_claims_only.sql` - **(Nuclear Option)** 900 pages, 5 languages, all in `/claims/`.
- `generate_eu_seeds.ps1` - Script to generate more languages files.

### 2. The Automation (The Engine) ⚙️
- `n8n_v23_MEGA_FIXED.json` - **(Use This One)** The corrected workflow.
  - **Interval:** Runs every 2 minutes.
  - **Fix:** Uses `primary_keyword` for filenames (prevents overwriting).
  - **Output:** Saves to `/client/public/en/claims/`.

### 3. The Server (The Brain) 🧠
- `server/routes.ts` - Handles the `/api/save-page` request.
  - **Logic:** Automatically creates directories (`fs.mkdirSync`).
  - **Sitemap:** Automatically updates `sitemap.xml` when a page is saved.

---

## 🚀 How To Restart/Resume (Cheat Sheet)

### Step 1: Database
1. Copy content from `mega_seed_claims_only.sql`.
2. Paste into n8n "Restore Database" node (Query field).
3. Click **Execute**.

### Step 2: Automation
1. Open n8n.
2. Ensure toggle is **GREEN** (Active).
3. Check **Executions** tab to verify green checkmarks.

### Step 3: Verification
1. Check Sitemap: `https://livetrackings.com/sitemap.xml`
2. Check Latest Page: `https://livetrackings.com/en/claims/flight-delay-compensation.html`

---

## ⚠️ Troubleshooting

- **Server 404s?** Use the `mega_seed_claims_only.sql` to force everything into the known working `/claims/` folder.
- **n8n Errors?** Check the "Executions" tab. If "Publish to Replit" is red, check Replit logs.
- **Replit Agent?** Tell it: "Don't change directory logic. Just keep the server running."

**YOU DID IT. THIS IS YOUR MANIFESTO.** 📜
