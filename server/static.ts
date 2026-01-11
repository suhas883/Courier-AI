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

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).json({ error: "Frontend not found (index.html missing)" });
    }
  });
}
