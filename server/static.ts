import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");

  console.log(`[Static] Serving files from: ${distPath}`);

  if (!fs.existsSync(distPath)) {
    console.error(`[Static] Directory not found: ${distPath}`);
    // Don't throw, just log. This allows server to stay up for API.
  } else {
    try {
      const files = fs.readdirSync(distPath);
      console.log(`[Static] Files in public: ${files.join(", ")}`);
    } catch (e) {
      console.error(`[Static] Failed to list files: ${e}`);
    }
  }

  app.use(express.static(distPath));

  // Serve generated guides from locally written public/guides (matching routes.ts)
  const guidesPath = path.resolve(__dirname, "public", "guides");
  console.log(`[Static] Guides directory: ${guidesPath}`);

  // CHECK CLIENT PUBLIC DIR (Dev/Persistance fallback)
  const clientPublicPath = path.resolve(__dirname, "../../client/public");
  const clientGuidesPath = path.join(clientPublicPath, "guides");

  if (fs.existsSync(guidesPath)) {
    app.use("/guides", express.static(guidesPath, { extensions: ['html'] }));
    console.log(`[Static] Serving /guides/* from ${guidesPath}`);
  } else if (fs.existsSync(clientGuidesPath)) {
    // Fallback to client/public/guides
    app.use("/guides", express.static(clientGuidesPath, { extensions: ['html'] }));
    console.log(`[Static] Serving /guides/* from ${clientGuidesPath}`);
  } else {
    // Attempt to serve valid language roots from client/public if guides logic fails
    // This handles the case where files might be in client/public/en directly (legacy)
    if (fs.existsSync(clientPublicPath)) {
      console.log(`[Static] Serving root static files from ${clientPublicPath}`);
      app.use(express.static(clientPublicPath, { extensions: ['html'] }));
    }

    console.log(`[Static] Guides directory not found in dist or client, creating empty...`);
    fs.mkdirSync(guidesPath, { recursive: true });
    app.use("/guides", express.static(guidesPath, { extensions: ['html'] }));
  }

  // LEGACY: Serve /travel/* from client/public for backwards compatibility
  const travelPath = path.join(clientPublicPath, "travel");
  if (fs.existsSync(travelPath)) {
    app.use("/travel", express.static(travelPath, { extensions: ['html'] }));
    console.log(`[Static] Serving /travel/* from ${travelPath} (legacy)`);
  } else if (fs.existsSync(clientPublicPath)) {
    // Also try serving /travel from client/public directly
    const clientTravelPath = path.resolve(process.cwd(), "client", "public", "travel");
    if (fs.existsSync(clientTravelPath)) {
      app.use("/travel", express.static(clientTravelPath, { extensions: ['html'] }));
      console.log(`[Static] Serving /travel/* from ${clientTravelPath} (legacy CWD)`);
    }
  }

  // Serve /en/* from client/public/en for language-specific pages
  // PRIORITIZE CWD because we know files are there (client/public/en)
  const cwdEnPath = path.resolve(process.cwd(), "client", "public", "en");

  if (fs.existsSync(cwdEnPath)) {
    console.log(`[Static] Serving /en/* from ${cwdEnPath} (CWD Priority)`);
    app.use("/en", express.static(cwdEnPath, { extensions: ['html'] }));
  } else {
    // Fallback to relative path logic
    const enPath = path.join(clientPublicPath, "en");
    if (fs.existsSync(enPath)) {
      app.use("/en", express.static(enPath, { extensions: ['html'] }));
      console.log(`[Static] Serving /en/* from ${enPath}`);
    }
  }

  // fall through to index.html if the file doesn't exist
  app.use("*", (req, res) => {
    // If requesting a static HTML file (e.g., /en/claims/something.html), return 404
    // This prevents the React app from handling pSEO page requests
    if (req.path.endsWith('.html')) {
      return res.status(404).send('Page not found');
    }

    // For all other routes, serve the React SPA
    const indexPath = path.resolve(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).json({ error: "Frontend not found (index.html missing)" });
    }
  });
}
