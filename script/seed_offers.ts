import { db } from "../server/db";
import { offers } from "../shared/schema";

/**
 * Empire Build: Seed 18 TravelPayouts Offers
 * These are the "Ammo" for the pSEO machine
 */
async function seedOffers() {
    console.log("🚀 Seeding Empire Offers...\n");

    const empireOffers = [
        // Flight & Claims
        {
            partner_name: "Compensair",
            affiliate_link: "https://tp.media/r?marker=605475&trs=488170&p=4129&u=https%3A%2F%2Fcompensair.com&campaign_id=86",
            primary_keyword: "flight delay compensation claim",
            target_country: "Germany",
            subdirectory: "claims",
        },
        // Connectivity
        {
            partner_name: "Airalo eSIM",
            affiliate_link: "https://tp.media/r?marker=605475&trs=488170&p=8310&u=https%3A%2F%2Fairalo.com&campaign_id=541",
            primary_keyword: "international esim data plan",
            target_country: "Global",
            subdirectory: "connectivity",
        },
        {
            partner_name: "Yesim",
            affiliate_link: "https://tp.media/r?marker=605475&trs=488170&p=5998&u=https%3A%2F%2Fyesim.tech&campaign_id=224",
            primary_keyword: "global sim card for travelers",
            target_country: "Europe",
            subdirectory: "connectivity",
        },
        {
            partner_name: "DrimSim",
            affiliate_link: "https://tp.media/r?marker=605475&trs=488170&p=2762&u=https%3A%2F%2Fw1.drimsim.com&campaign_id=102",
            primary_keyword: "roaming sim international travel",
            target_country: "USA",
            subdirectory: "connectivity",
        },
        // Insurance
        {
            partner_name: "EKTA Insurance",
            affiliate_link: "https://tp.media/r?marker=605475&trs=488170&p=5869&u=https%3A%2F%2Fektatraveling.com&campaign_id=225",
            primary_keyword: "travel cargo insurance protection",
            target_country: "India",
            subdirectory: "insurance",
        },
        // Transfers
        {
            partner_name: "KiwiTaxi",
            affiliate_link: "https://tp.media/r?marker=605475&trs=488170&p=647&u=https%3A%2F%2Fkiwitaxi.com&campaign_id=1",
            primary_keyword: "airport taxi transfer booking",
            target_country: "France",
            subdirectory: "transfers",
        },
        {
            partner_name: "GetTransfer",
            affiliate_link: "https://tp.media/r?marker=605475&trs=488170&p=4439&u=https%3A%2F%2Fgettransfer.com&campaign_id=147",
            primary_keyword: "private transfer airport hotel",
            target_country: "Spain",
            subdirectory: "transfers",
        },
        {
            partner_name: "Intui Travel",
            affiliate_link: "https://tp.media/r?marker=605475&trs=488170&p=657&u=https%3A%2F%2Fintui.travel&campaign_id=22",
            primary_keyword: "shuttle bus airport city center",
            target_country: "Italy",
            subdirectory: "transfers",
        },
        {
            partner_name: "Welcome Pickups",
            affiliate_link: "https://tp.media/r?marker=605475&trs=488170&p=8919&u=https%3A%2F%2Fwelcomepickups.com&campaign_id=627",
            primary_keyword: "meet greet airport pickup service",
            target_country: "Greece",
            subdirectory: "transfers",
        },
        // Activities & Tours
        {
            partner_name: "Klook",
            affiliate_link: "https://tp.media/r?marker=605475&trs=488170&p=4110&u=https%3A%2F%2Fklook.com&campaign_id=137",
            primary_keyword: "travel activities tours booking",
            target_country: "Asia",
            subdirectory: "activities",
        },
        {
            partner_name: "Tiqets",
            affiliate_link: "https://tp.media/r?marker=605475&trs=488170&p=2074&u=https%3A%2F%2Ftiqets.com&campaign_id=89",
            primary_keyword: "museum attraction tickets online",
            target_country: "Netherlands",
            subdirectory: "activities",
        },
        {
            partner_name: "WeGoTrip",
            affiliate_link: "https://tp.media/r?marker=605475&trs=488170&p=4487&u=https%3A%2F%2Fwegotrip.com&campaign_id=150",
            primary_keyword: "audio tour guides self guided",
            target_country: "UK",
            subdirectory: "activities",
        },
        {
            partner_name: "TicketNetwork",
            affiliate_link: "https://tp.media/r?marker=605475&trs=488170&p=1948&u=https%3A%2F%2Fticketnetwork.com&campaign_id=72",
            primary_keyword: "concert sports events tickets",
            target_country: "USA",
            subdirectory: "activities",
        },
        // Flights
        {
            partner_name: "Aviasales",
            affiliate_link: "https://tp.media/r?marker=605475&trs=488170&p=4114&u=https%3A%2F%2Faviasales.com&campaign_id=100",
            primary_keyword: "cheap flights comparison search",
            target_country: "Russia",
            subdirectory: "flights",
        },
        // Storage & Rentals
        {
            partner_name: "Radical Storage",
            affiliate_link: "https://tp.media/r?marker=605475&trs=488170&p=5867&u=https%3A%2F%2Fradicalstorage.com&campaign_id=209",
            primary_keyword: "luggage storage near me city",
            target_country: "Global",
            subdirectory: "storage",
        },
        {
            partner_name: "SeaRadar",
            affiliate_link: "https://tp.media/r?marker=605475&trs=488170&p=5907&u=https%3A%2F%2Fsearadar.com&campaign_id=258",
            primary_keyword: "yacht boat rental charter",
            target_country: "Mediterranean",
            subdirectory: "rentals",
        },
        // Security
        {
            partner_name: "NordVPN",
            affiliate_link: "https://tp.media/click?shmarker=605475&promo_id=8986&source_type=link&type=click&campaign_id=631&trs=488170",
            primary_keyword: "secure vpn travel public wifi",
            target_country: "Global",
            subdirectory: "security",
        },
        {
            partner_name: "NordPass",
            affiliate_link: "https://tp.media/click?shmarker=605475&promo_id=9023&source_type=link&type=click&campaign_id=631&trs=488170",
            primary_keyword: "password manager travel security",
            target_country: "Global",
            subdirectory: "security",
        },
    ];

    try {
        // Insert all offers
        for (const offer of empireOffers) {
            await db.insert(offers).values({
                ...offer,
                status: "pending",
                language_code: "en",
            });
            console.log(`✅ Added: ${offer.partner_name} (${offer.subdirectory})`);
        }

        console.log(`\n🎯 Successfully seeded ${empireOffers.length} offers!`);
        console.log("📍 Run the n8n workflow to generate 90 pages (18 offers × 5 languages)");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
    }

    process.exit(0);
}

seedOffers();
