import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { trackWithTrackingMore } from "./trackingmore";
import { enhanceTrackingWithAI } from "./gemini";
import { db } from "./db";
import { offers, trackRequestSchema } from "@shared/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Detect carrier from tracking number pattern
function detectCarrierFromNumber(trackingNumber: string): string {
  const num = trackingNumber.trim().toUpperCase();

  // Indian carriers - DTDC can start with B, C, D, E, N, P, X followed by 8-9 digits
  if (/^[BCDENPX]\d{8,9}$/i.test(num)) return "DTDC";
  if (/^\d{13,14}$/.test(num) && num.length >= 13) return "Delhivery";
  if (/^\d{9}$/.test(num) || /^\d{11}$/.test(num)) return "Blue Dart";
  if (/^E[A-Z]\d{9}IN$/i.test(num) || /^R[A-Z]\d{9}IN$/i.test(num)) return "India Post";
  if (/^FMPP\d+$/i.test(num) || /^OD\d+$/i.test(num)) return "Ekart";
  if (/^XB\d+$/i.test(num)) return "Xpressbees";

  // US carriers  
  if (/^1Z[A-Z0-9]{16}$/i.test(num)) return "UPS";
  if (/^\d{12}$/.test(num) || /^\d{15}$/.test(num) || /^\d{20}$/.test(num)) return "FedEx";
  if (/^(94|93|92|91|90)\d{18,20}$/.test(num) || /^\d{20,22}$/.test(num)) return "USPS";
  if (/^TBA\d{12,}$/i.test(num)) return "Amazon";

  // Global carriers
  if (/^\d{10}$/.test(num)) return "DHL";
  if (/^[A-Z]{2}\d{9}[A-Z]{2}$/i.test(num)) return "International Post";
  if (/^LP\d{14,}$/i.test(num)) return "Cainiao";
  if (/^YT\d{13,}$/i.test(num)) return "YTO Express";
  if (/^SF\d{12,}$/i.test(num)) return "SF Express";

  // UK carriers
  if (/^[A-Z]{2}\d{9}GB$/i.test(num)) return "Royal Mail";

  return "Unknown Carrier";
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "LiveTrackings API"
    });
  });

  // Track a package
  app.post("/api/track", async (req, res) => {
    try {
      // Validate request body
      const validationResult = trackRequestSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          error: "Invalid request",
          details: validationResult.error.errors
        });
      }

      const { trackingNumber, carrier } = validationResult.data;

      // Basic validation - tracking number must be alphanumeric and reasonable length
      const cleanNumber = trackingNumber.trim().replace(/\s+/g, '');
      if (cleanNumber.length < 8 || cleanNumber.length > 40) {
        return res.status(400).json({
          error: "Invalid tracking number",
          message: "Please enter a valid tracking number (8-40 characters)"
        });
      }

      if (!/^[A-Za-z0-9]+$/.test(cleanNumber)) {
        return res.status(400).json({
          error: "Invalid tracking number format",
          message: "Tracking number should only contain letters and numbers"
        });
      }

      // Detect carrier from tracking number pattern FIRST
      const detectedCarrier = (carrier && carrier !== 'auto')
        ? carrier.toUpperCase()
        : detectCarrierFromNumber(cleanNumber);

      console.log(`[Track API] Tracking: ${cleanNumber}, Detected Carrier: ${detectedCarrier}`);

      // Use TrackingMore API as the ONLY source of truth (no hallucinations)
      let trackingInfo = null;

      if (process.env.TRACKINGMORE_API_KEY) {
        console.log(`[Track API] Using TrackingMore API...`);
        trackingInfo = await trackWithTrackingMore(cleanNumber, detectedCarrier);

        if (trackingInfo && !trackingInfo.notFound) {
          console.log(`[Track API] TrackingMore returned ${trackingInfo.events?.length || 0} events`);

          // Enhance with Gemini AI (via OpenRouter)
          // Check if user requested premium features (demo mode for testing)
          const isPremium = req.body.premium === true; // Pass premium: true in request body
          if (process.env.OPENROUTER_API_KEY) {
            console.log(`[Track API] Enhancing with Gemini AI...`);
            trackingInfo = await enhanceTrackingWithAI(trackingInfo, isPremium);
          }
        } else {
          console.log(`[Track API] TrackingMore had no data`);
        }
      }

      // If TrackingMore fails or has no data, return clear "not found" (NO FALLBACK = NO HALLUCINATIONS)
      if (!trackingInfo || trackingInfo.notFound) {
        console.log(`[Track API] No tracking data available - returning not found (no fallback)`);
        return res.status(404).json({
          error: "Tracking data not available",
          message: "Unable to retrieve tracking information from carrier. Please verify your tracking number or try again later.",
          trackingNumber: cleanNumber,
          carrier: detectedCarrier,
          notFound: true
        });
      }

      // If carrier is truly unknown and no events found, but still show results for recognized carriers
      // Only return 404 for completely unrecognized formats with no data
      const isUnknownCarrier = trackingInfo.courier === "Unknown" || trackingInfo.courier === "Unknown Carrier";
      const hasNoEvents = !trackingInfo.events || trackingInfo.events.length === 0;
      const hasNoPrediction = !trackingInfo.aiPrediction || trackingInfo.confidence < 50;

      if (isUnknownCarrier && hasNoEvents && hasNoPrediction) {
        return res.status(404).json({
          error: "Tracking number not found",
          message: "Unable to find tracking information. Please verify your tracking number and try again."
        });
      }

      // Save to database
      const record = await storage.createTrackingRecord({
        trackingNumber,
        courier: trackingInfo.courier,
        courierCode: trackingInfo.courierCode,
        status: trackingInfo.status,
        statusDescription: trackingInfo.statusDescription,
        origin: trackingInfo.origin,
        destination: trackingInfo.destination,
        estimatedDelivery: trackingInfo.estimatedDelivery,
        lastUpdate: trackingInfo.lastUpdate,
        events: trackingInfo.events,
        rawResponse: trackingInfo.rawResponse,
      });

      // Add to history
      await storage.createTrackingHistory({
        trackingNumber,
        courier: trackingInfo.courier,
        lastStatus: trackingInfo.status,
      });

      // Return response in format expected by frontend
      const hasRealEvents = (record.events || []).length > 0;
      const isNotFound = trackingInfo.notFound === true || trackingInfo.status === "not_found";

      // Format status for display (normalize to lowercase for comparison)
      const getDisplayStatus = () => {
        if (isNotFound) return "Not Found";
        const normalizedStatus = (trackingInfo.status || "").toLowerCase();
        if (normalizedStatus === "delivered") return "Delivered";
        if (normalizedStatus === "out_for_delivery" || normalizedStatus === "out for delivery") return "Out for Delivery";
        if (normalizedStatus === "in_transit" || normalizedStatus === "in transit" || normalizedStatus === "transit") return "In Transit";
        if (normalizedStatus === "exception") return "Exception";
        if (normalizedStatus === "pending" || normalizedStatus === "info received") return "Pending";
        if (normalizedStatus === "picked up" || normalizedStatus === "pickup") return "Picked Up";
        // If already capitalized properly, return as-is
        if (trackingInfo.status && trackingInfo.status !== "unknown") return trackingInfo.status;
        return "Processing";
      };

      // Always use the detected carrier, not the one from API
      const finalCarrier = detectedCarrier || trackingInfo.courier || "Unknown";

      return res.json({
        trackingNumber: record.trackingNumber,
        carrier: finalCarrier,
        status: getDisplayStatus(),
        notFound: isNotFound,
        estimatedDelivery: record.estimatedDelivery || trackingInfo.estimatedDelivery || null,
        lastUpdated: record.lastUpdate || trackingInfo.lastUpdate || null,
        events: (record.events || []).map((e: any) => ({
          status: e.status || "Update",
          location: e.location || "",
          city: e.city || "",
          state: e.state || "",
          country: e.country || "",
          date: e.date || "",
          time: e.time || "",
          timestamp: e.timestamp || e.date || "",
          description: e.description || e.status || ""
        })),
        origin: trackingInfo.origin,
        destination: trackingInfo.destination,
        trackingUrl: trackingInfo.trackingUrl,
        aiPrediction: trackingInfo.aiPrediction || {
          prediction: isNotFound
            ? `Tracking number ${trackingNumber} was not found. Please verify the number is correct.`
            : hasRealEvents
              ? "Package is being tracked"
              : "Awaiting tracking data from carrier.",
          confidence: isNotFound ? 90 : (hasRealEvents ? 80 : 50),
          reasoning: isNotFound
            ? "No shipment record exists for this tracking number in the carrier system"
            : hasRealEvents
              ? "Based on carrier tracking data"
              : "No tracking events found in carrier systems yet"
        },
        weatherImpact: trackingInfo.weatherImpact || null,
        delayRisk: trackingInfo.delayRisk || null,
        recommendations: trackingInfo.recommendations || (isNotFound
          ? [
            "Double-check the tracking number for typos",
            "Contact the sender to verify the tracking number",
            "Make sure the package has actually been shipped"
          ]
          : [
            "Check back in 24-48 hours for updates",
            "Contact the sender if no updates appear"
          ])
      });
    } catch (error) {
      console.error("Error tracking package:", error);
      return res.status(500).json({
        error: "Failed to track package",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Get a specific tracking record by ID
  app.get("/api/track/:id", async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Tracking ID is required" });
      }

      const record = await storage.getTrackingRecord(id);

      if (!record) {
        return res.status(404).json({ error: "Tracking record not found" });
      }

      return res.json(record);
    } catch (error) {
      console.error("Error fetching tracking record:", error);
      return res.status(500).json({ error: "Failed to fetch tracking record" });
    }
  });

  // Get tracking history
  app.get("/api/history", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const history = await storage.getTrackingHistory(limit);
      return res.json(history);
    } catch (error) {
      console.error("Error fetching history:", error);
      return res.status(500).json({ error: "Failed to fetch history" });
    }
  });

  // Delete a history item
  app.delete("/api/history/:id", async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "History ID is required" });
      }

      const deleted = await storage.deleteTrackingHistory(id);

      if (!deleted) {
        return res.status(404).json({ error: "History item not found" });
      }

      return res.json({ success: true });
    } catch (error) {
      console.error("Error deleting history:", error);
      return res.status(500).json({ error: "Failed to delete history item" });
    }
  });

  // AI Chat endpoint using Gemini via OpenRouter
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "AI service not configured" });
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://livetrackings.com",
          "X-Title": "LiveTrackings"
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-001",
          messages: [
            {
              role: "system",
              content: "You are a helpful package tracking assistant for LiveTrackings.com. Help users with tracking questions, explain shipping delays, provide delivery estimates, and answer questions about carriers like UPS, FedEx, USPS, DHL, DTDC, Delhivery, and 1500+ other global couriers. Be friendly and concise."
            },
            ...messages.slice(-10)
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices?.[0]?.message?.content || "I'm here to help with your tracking questions!";

      return res.json({ message: assistantMessage });
    } catch (error) {
      console.error("Chat error:", error);
      return res.json({
        message: "I can help you with tracking questions! Try asking about tracking numbers, delivery times, or carrier information."
      });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }

      // Log the contact submission
      // In production, this would send via SendGrid to ramarao2215@gmail.com
      console.log("[Contact Form] New submission:");
      console.log(`  From: ${name} <${email}>`);
      console.log(`  Subject: ${subject || 'No subject'}`);
      console.log(`  Message: ${message}`);
      console.log(`  Timestamp: ${new Date().toISOString()}`);

      // For now, just acknowledge receipt
      // TODO: Set up SendGrid integration to email submissions to owner

      return res.json({ success: true, message: "Message received" });
    } catch (error) {
      console.error("Contact form error:", error);
      return res.status(500).json({ error: "Failed to submit message" });
    }
  });

  // Validate license key
  app.post("/api/license/validate", async (req, res) => {
    try {
      const { licenseKey } = req.body;

      if (!licenseKey || typeof licenseKey !== 'string') {
        return res.status(400).json({ valid: false, error: "License key is required" });
      }

      const cleanKey = licenseKey.trim();
      if (cleanKey.length < 8) {
        return res.status(400).json({ valid: false, error: "Invalid license key format" });
      }

      const license = await storage.validateLicenseKey(cleanKey);

      if (license && license.isActive) {
        return res.json({
          valid: true,
          email: license.email,
          activatedAt: license.activatedAt
        });
      }

      return res.json({ valid: false, error: "License key not found or inactive" });
    } catch (error) {
      console.error("License validation error:", error);
      return res.status(500).json({ valid: false, error: "Failed to validate license" });
    }
  });

  // pSEO "Receiver": Save generated HTML pages with Enterprise SEO
  // Also available as /api/publish for compatibility
  // Accepts both 'content' and 'html' fields for n8n compatibility
  app.post(["/api/save-page", "/api/publish"], async (req, res) => {
    try {
      // DEBUG: File-based logging to catch n8n requests
      try {
        const logPath = path.join(process.cwd(), 'publish.log');
        const logData = {
          timestamp: new Date().toISOString(),
          method: req.method,
          url: req.originalUrl,
          headers: {
            'content-type': req.headers['content-type'],
            'x-publish-secret': req.headers['x-publish-secret'] ? '***MASKED***' : 'MISSING'
          },
          body: {
            filename: req.body.filename,
            language: req.body.language,
            subdirectory: req.body.subdirectory,
            hasContent: !!(req.body.content || req.body.html),
            contentSnippet: (req.body.content || req.body.html || '').substring(0, 200) + '...'
          }
        };
        fs.appendFileSync(logPath, JSON.stringify(logData, null, 2) + '\n---\n');
        console.log(`[Publish Debug] Logged request to ${logPath}`);
      } catch (e) {
        console.error(`[Publish Debug] Failed to log request:`, e);
      }

      const { filename, content, html, language, subdirectory, affiliate_link, api_secret } = req.body;
      const pageContentRaw = content || html || "";

      // GOD MODE CLEANING: Removes markdown backticks, "html" words, and any text before the first <
      let cleanedContent = pageContentRaw
        .replace(/```[a-z]*\n?/gi, "")
        .replace(/```/g, "")
        .replace(/<!DOCTYPE html>/gi, "")
        .replace(/<html>/gi, "")
        .replace(/<\/html>/gi, "")
        .replace(/<head>[\s\S]*?<\/head>/gi, "")
        .replace(/<body>/gi, "")
        .replace(/<\/body>/gi, "");

      // Find the first occurrence of < and strip everything before it (removes "html" artifact)
      const firstTagIndex = cleanedContent.indexOf("<");
      if (firstTagIndex > 0) {
        cleanedContent = cleanedContent.substring(firstTagIndex);
      }

      const pageContent = cleanedContent.trim();
      const activeAffiliateLink = affiliate_link || "https://livetrackings.com";
      const headerSecret = req.headers['x-publish-secret'] as string;
      const providedSecret = api_secret || headerSecret;

      console.log(`[Publish API] Received request:`, { filename, language, subdirectory, hasSecret: !!providedSecret, hasContent: !!pageContent });

      // STRICT Authentication checking
      const PUBLISH_SECRET = process.env.PUBLISH_SECRET || "livetrackings-pseo-2024";

      if (!providedSecret || providedSecret !== PUBLISH_SECRET) {
        console.error(`[Publish API] Security Alert: Unauthorized access attempt.`);
        return res.status(401).json({ error: "Unauthorized access - Invalid or missing secret" });
      }

      if (!filename || !pageContent || !language) {
        console.error(`[Publish API] Missing fields: filename=${!!filename}, content=${!!pageContent}, language=${!!language}`);
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Security: Prevent directory traversal
      const safeFilename = filename.replace(/[^a-z0-9-]/g, ""); // Slug friendly only
      const safeLanguage = language.replace(/[^a-z-]/g, "");
      const safeSubdirectory = (subdirectory || "travel").replace(/[^a-z0-9-]/g, "");

      // Enterprise URL Structure: /<language>/<subdirectory>/<filename>.html
      // STRICT FIX: Write to client/public/<language>/<subdirectory>/<filename>.html
      const clientPublicDir = path.join(process.cwd(), "client", "public");
      const targetDir = path.join(clientPublicDir, safeLanguage, safeSubdirectory);

      if (!fs.existsSync(targetDir)) {
        console.log(`[Publish API] Creating directory: ${targetDir}`);
        fs.mkdirSync(targetDir, { recursive: true });
      }

      console.log(`[Publish API] Target Directory: ${targetDir}`);

      // Build canonical URL
      const canonicalUrl = `https://livetrackings.com/en/${safeSubdirectory}/${safeFilename}.html`;

      // Build hreflang tags for all 5 languages
      const languages = ['en', 'de', 'fr', 'es', 'hi'];
      const hreflangTags = languages.map(lang =>
        `<link rel="alternate" hreflang="${lang}" href="https://livetrackings.com/${lang}/${safeSubdirectory}/${safeFilename}.html" />`
      ).join('\n    ');

      // Wrap content with full HTML structure including SEO tags
      const pageTitle = safeFilename.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
      const categoryTitle = safeSubdirectory.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
      const publishDate = new Date().toISOString();

      const fullHtml = `<!DOCTYPE html>
<html lang="${safeLanguage}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle} | LiveTrackings</title>
    <meta name="robots" content="index, follow">
    <meta name="description" content="${pageTitle} - Expert guide from LiveTrackings. Get resolution help for your logistics needs.">
    <meta property="og:title" content="${pageTitle} | LiveTrackings">
    <meta property="og:type" content="article">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:image" content="https://livetrackings.com/og-image.jpg">
    <link rel="canonical" href="${canonicalUrl}" />
    ${hreflangTags}
    <link rel="alternate" hreflang="x-default" href="https://livetrackings.com/en/${safeSubdirectory}/${safeFilename}.html" />
    
    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
      gtag('event', 'page_view', {
        'page_category': '${safeSubdirectory}',
        'page_language': '${safeLanguage}',
        'content_type': 'guide'
      });
    </script>

    <!-- Article Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${pageTitle}",
      "description": "Expert guide for ${pageTitle}",
      "datePublished": "${publishDate}",
      "dateModified": "${publishDate}",
      "author": {
        "@type": "Organization",
        "name": "LiveTrackings",
        "url": "https://livetrackings.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "LiveTrackings",
        "logo": {
          "@type": "ImageObject",
          "url": "https://livetrackings.com/logo.png"
        }
      },
      "mainEntityOfPage": "${canonicalUrl}"
    }
    </script>

    <!-- Breadcrumb Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://livetrackings.com/"},
        {"@type": "ListItem", "position": 2, "name": "Guides", "item": "https://livetrackings.com/guides/"},
        {"@type": "ListItem", "position": 3, "name": "${categoryTitle}", "item": "https://livetrackings.com/guides/${safeLanguage}/${safeSubdirectory}/"},
        {"@type": "ListItem", "position": 4, "name": "${pageTitle}"}
      ]
    }
    </script>

    <style>
      :root {
        --primary: #2563eb;
        --secondary: #1d4ed8;
        --text: #0f172a;
        --light: #64748b;
        --bg: #f8fafc;
        --card: #ffffff;
      }
      
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { 
        font-family: 'Inter', -apple-system, sans-serif; 
        line-height: 1.8; 
        color: var(--text); 
        background: var(--bg); 
      }
      
      h1, h2, h3, h4 { 
        font-family: 'Outfit', sans-serif; 
        color: var(--text); 
        margin: 1.6em 0 0.8em; 
        line-height: 1.3;
      }
      
      .container { max-width: 850px; margin: 0 auto; padding: 60px 24px; }
      
      .breadcrumb { font-size: 0.9em; color: var(--light); margin-bottom: 30px; display: flex; align-items: center; flex-wrap: wrap; }
      .breadcrumb a { color: var(--primary); text-decoration: none; transition: color 0.2s; }
      .breadcrumb a:hover { color: var(--secondary); text-decoration: underline; }
      .breadcrumb span { margin: 0 10px; opacity: 0.5; }
      
      h1 { font-size: 2.8rem; font-weight: 700; margin-top: 0; margin-bottom: 20px; letter-spacing: -0.02em; }
      h2 { font-size: 2rem; font-weight: 600; border-left: 5px solid var(--primary); padding-left: 15px; }
      h3 { font-size: 1.5rem; font-weight: 600; }
      p { margin: 1.2em 0; color: #334155; font-size: 1.1rem; }
      
      ul, ol { margin: 1.5em 0 1.5em 1.5em; }
      li { margin: 0.8em 0; padding-left: 5px; }
      
      .cta-box { 
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); 
        color: white; 
        padding: 40px; 
        border-radius: 20px; 
        text-align: center; 
        margin: 3em 0; 
        box-shadow: 0 20px 25px -5px rgba(37, 99, 235, 0.2);
      }
      .cta-box h3 { color: white; margin-top: 0; font-size: 1.8rem; }
      .cta-box p { color: rgba(255, 255, 255, 0.9); font-size: 1rem; margin-bottom: 25px; }
      .cta-box a { 
        display: inline-block; 
        background: white; 
        color: var(--primary); 
        padding: 18px 45px; 
        border-radius: 50px; 
        text-decoration: none; 
        font-weight: 700; 
        font-size: 1.2rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); 
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); 
      }
      .cta-box a:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
      
      .author-bio { 
        display: flex; 
        align-items: center; 
        gap: 20px; 
        background: #fff; 
        border: 1px solid #e2e8f0; 
        border-radius: 16px; 
        padding: 24px; 
        margin: 40px 0; 
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      }
      .author-bio .avatar { 
        width: 70px; 
        height: 70px; 
        flex-shrink: 0;
        border-radius: 50%; 
        background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        color: white; 
        font-weight: bold; 
        font-size: 1.8em; 
      }
      .author-bio h4 { margin: 0 0 4px; font-size: 1.2rem; }
      .author-bio p { margin: 0; font-size: 0.95rem; line-height: 1.5; color: var(--light); }
      
      .disclosure { margin-top: 50px; padding: 20px; border-top: 1px solid #e2e8f0; font-size: 0.85rem; color: var(--light); text-align: center; }
      
      .back-home { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 30px; text-decoration: none; font-weight: 500; font-size: 0.95rem; }

      @media (max-width: 768px) {
        .container { padding: 40px 20px; }
        h1 { font-size: 2.2rem; }
        h2 { font-size: 1.7rem; }
        .cta-box { padding: 30px 20px; }
        .cta-box a { display: block; width: 100%; padding: 16px 20px; }
      }
      
      /* Footer elements */
      .disclosure { background: #f1f5f9; padding: 15px; margin-top: 40px; border-radius: 8px; font-size: 0.85em; color: #64748b; }
      .back-home { display: inline-block; margin-top: 30px; color: #3b82f6; text-decoration: none; font-weight: 500; }
      .back-home:hover { text-decoration: underline; }
      
      /* Trust Badges */
      .trust-badges { display: flex; gap: 20px; flex-wrap: wrap; margin: 20px 0; font-size: 0.9em; color: #059669; }
      .trust-badges span { display: flex; align-items: center; gap: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Breadcrumb Navigation -->
        <nav class="breadcrumb">
          <a href="https://livetrackings.com/">Home</a>
          <span>›</span>
          <a href="https://livetrackings.com/guides/">Guides</a>
          <span>›</span>
          <a href="https://livetrackings.com/guides/${safeLanguage}/${safeSubdirectory}/">${categoryTitle}</a>
          <span>›</span>
          <strong>${pageTitle}</strong>
        </nav>

        <!-- Trust Badges -->
        <div class="trust-badges">
          <span>✅ Verified Guide</span>
          <span>⭐ Expert Reviewed</span>
          <span>🔒 Trusted by 50,000+ users</span>
        </div>

        <!-- Main Content -->
        <article class="main-article">
            ${pageContent}
        </article>

        <!-- Dynamic CTA Box -->
        <div class="cta-box">
            <h3>Ready to secure your experience?</h3>
            <p>Verified solutions for your logistics and travel needs. Get the best rates today.</p>
            <a href="${activeAffiliateLink}" target="_blank" rel="nofollow sponsored">Check Availability & Prices ➜</a>
        </div>
        
        <!-- Author Bio -->
        <div class="author-bio">
          <div class="avatar">LT</div>
          <div>
            <h4>LiveTrackings Research Team</h4>
            <p>Our logistics experts verify and update guides regularly to ensure accuracy. 10+ years of industry experience.</p>
          </div>
        </div>
        
        <!-- Disclosure -->
        <div class="disclosure">
            <strong>Affiliate Disclosure:</strong> This page contains affiliate links. If you click through and make a purchase, we may earn a commission at no additional cost to you. This helps us keep LiveTrackings free for everyone. We only recommend services we trust and have verified.
        </div>
        
        <a href="https://livetrackings.com" class="back-home">← Back to LiveTrackings - Free Package Tracking</a>
    </div>
</body>
</html>`;

      const filePath = path.join(targetDir, `${safeFilename}.html`);
      fs.writeFileSync(filePath, fullHtml, "utf-8");

      console.log(`[pSEO] Saved: /${safeLanguage}/${safeSubdirectory}/${safeFilename}.html`);

      // Update sitemap.xml
      const sitemapPath = path.join(clientPublicDir, 'sitemap.xml');
      const today = new Date().toISOString().split('T')[0];
      const newUrl = `    <url>
        <loc>${canonicalUrl}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`;

      let sitemapContent = '';
      if (fs.existsSync(sitemapPath)) {
        sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
        if (!sitemapContent.includes(canonicalUrl)) {
          // Insert before </urlset>
          sitemapContent = sitemapContent.replace('</urlset>', `${newUrl}\n</urlset>`);
          fs.writeFileSync(sitemapPath, sitemapContent);
          console.log(`[pSEO] Updated sitemap.xml with ${canonicalUrl}`);
        }
      } else {
        // Create new sitemap
        sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://livetrackings.com/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
${newUrl}
</urlset>`;
        fs.writeFileSync(sitemapPath, sitemapContent);
        console.log(`[pSEO] Created new sitemap.xml with ${canonicalUrl}`);
      }

      return res.json({
        success: true,
        url: `/${safeLanguage}/${safeSubdirectory}/${safeFilename}.html`
      });
    } catch (error) {
      console.error("Save page error:", error);
      return res.status(500).json({ error: "Failed to save page" });
    }
  });

  // DEMO: Serve a static sitemap or dynamic one from DB
  // Serve sitemap.xml directly from file system
  app.get("/sitemap.xml", (_req, res) => {
    const sitemapPath = path.join(process.cwd(), "client", "public", "sitemap.xml");
    if (fs.existsSync(sitemapPath)) {
      res.header("Content-Type", "application/xml");
      res.sendFile(sitemapPath);
    } else {
      // Return a basic sitemap if file doesn't exist yet
      const today = new Date().toISOString().split('T')[0];
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://livetrackings.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
      res.header("Content-Type", "application/xml");
      res.send(sitemap);
    }
  });

  // Dynamic robots.txt
  app.get("/robots.txt", (_req, res) => {
    const robots = `User-agent: *
Allow: /
Sitemap: https://livetrackings.com/sitemap.xml`;
    res.header("Content-Type", "text/plain");
    res.send(robots);
  });

  return httpServer;
}
