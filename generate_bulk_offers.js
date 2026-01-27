
const fs = require('fs');

// Configuration
const TARGET_ROWS = 1000; // Start with 1k, user can increase
const PARTNERS = [
    { name: 'Compensair', link: 'https://tp.media/r?marker=605475&trs=488170&p=4129&u=https%3A%2F%2Fcompensair.com&campaign_id=86', keyword: 'flight delay compensation', subdir: 'claims' },
    { name: 'Airalo eSIM', link: 'https://tp.media/r?marker=605475&trs=488170&p=8310&u=https%3A%2F%2Fairalo.com&campaign_id=541', keyword: 'esim data plan', subdir: 'connectivity' },
    { name: 'KiwiTaxi', link: 'https://tp.media/r?marker=605475&trs=488170&p=647&u=https%3A%2F%2Fkiwitaxi.com&campaign_id=1', keyword: 'airport transfer', subdir: 'transfers' }
];

const LOCATIONS = [
    'London', 'Paris', 'New York', 'Tokyo', 'Dubai', 'Singapore', 'Berlin', 'Rome', 'Barcelona', 'Bangkok',
    'Mumbai', 'Delhi', 'Sydney', 'Toronto', 'Lagos', 'Cairo', 'Istanbul', 'Seoul', 'Mexico City', 'São Paulo'
];

// Generate SQL
let sql = `INSERT INTO offers (partner_name, affiliate_link, primary_keyword, target_country, subdirectory, status, language_code) VALUES\n`;
let count = 0;
const values = [];

for (const partner of PARTNERS) {
    for (const city of LOCATIONS) {
        // Variation 1
        values.push(`('${partner.name}', '${partner.link}', '${partner.keyword} in ${city}', '${city}', '${partner.subdir}', 'pending', 'en')`);
        count++;

        // Variation 2 (Guide)
        values.push(`('${partner.name}', '${partner.link}', 'Best ${partner.keyword} for ${city} trip', '${city}', '${partner.subdir}', 'pending', 'en')`);
        count++;
    }
}

sql += values.join(',\n') + ';';

fs.writeFileSync('seed_bulk_offers.sql', sql);
console.log(`Generated ${count} offers in seed_bulk_offers.sql`);
