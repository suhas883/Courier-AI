import fs from "fs";
import path from "path";
import { db } from "../server/db";
import { offers } from "../shared/schema";
import { eq } from "drizzle-orm";

/**
 * UTILITY: Retroactive Affiliate Link Injection
 * 
 * If you have generated pages that are missing affiliate links,
 * run this script to inject them into the HTML based on the database content.
 * 
 * Usage: npx tsx script/inject_affiliate_links.ts
 */

const PUBLIC_DIR = path.join(process.cwd(), "client", "public", "guides");

async function injectLinks() {
    console.log("💉 Starting Affiliate Link Injection...");

    // 1. Fetch all published offers
    const publishedOffers = await db.select().from(offers).where(eq(offers.status, "published"));
    console.log(`Found ${publishedOffers.length} published offers.`);

    let totalUpdated = 0;

    for (const offer of publishedOffers) {
        if (!offer.slug || !offer.affiliate_link) continue;

        // Construct path: /guides/[lang]/[subdirectory]/[slug]/index.html
        const languages = ['en', 'de', 'fr', 'es', 'it'];

        for (const lang of languages) {
            // Re-construct the slug based on our V2 logic (id-keyword-lang)
            // Or search for the folder that matches
            // Since directory structure is: public/guides/lang/subdirectory/slug

            const langDir = path.join(PUBLIC_DIR, lang, offer.subdirectory || "guides");

            if (!fs.existsSync(langDir)) continue;

            // Find folders that contain the keyword (heuristic)
            const keywordSlug = (offer.primary_keyword || "").toLowerCase().replace(/ /g, '-');
            const dirs = fs.readdirSync(langDir);

            for (const dirName of dirs) {
                if (dirName.includes(keywordSlug)) {
                    const filePath = path.join(langDir, dirName, "index.html");

                    if (fs.existsSync(filePath)) {
                        let content = fs.readFileSync(filePath, "utf-8");

                        // Check if link is missing
                        if (!content.includes(offer.affiliate_link)) {
                            console.log(`❌ Missing link in: ${lang}/${dirName} ... Injecting!`);

                            // Strategic Injection
                            // 1. Replace empty # links
                            content = content.replace(/href="#"/g, `href="${offer.affiliate_link}"`);

                            // 2. Inject into CTA box if generic
                            content = content.replace(/href='guides\/'/g, `href='${offer.affiliate_link}'`);

                            // 3. Append Bottom Sticky CTA (if not present)
                            if (!content.includes('sticky-bottom-cta')) {
                                const stickyCta = `
                 <div style="position: fixed; bottom: 0; left: 0; width: 100%; background: #3b82f6; color: white; padding: 15px; text-align: center; z-index: 1000; box-shadow: 0 -4px 10px rgba(0,0,0,0.1);">
                   <span style="font-weight: bold; margin-right: 15px;">Resolve your issue using the industry standard:</span>
                   <a href="${offer.affiliate_link}" style="background: white; color: #3b82f6; padding: 8px 20px; border-radius: 4px; text-decoration: none; font-weight: bold;">Check Resolution Now →</a>
                 </div>`;
                                content = content.replace('</body>', `${stickyCta}</body>`);
                            }

                            fs.writeFileSync(filePath, content);
                            totalUpdated++;
                        }
                    }
                }
            }
        }
    }

    console.log(`\n✨ Injection Complete! Updated ${totalUpdated} pages.`);
    process.exit(0);
}

injectLinks();
