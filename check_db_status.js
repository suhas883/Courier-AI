
const { Client } = require('pg');

const client = new Client({
    connectionString: "postgres://neondb_owner:npg_602rIuRfqcvK@ep-black-water-a41065i1-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
});

async function checkStatus() {
    await client.connect();
    try {
        const res = await client.query("SELECT status, count(*) FROM offers GROUP BY status;");
        console.log("Offer Status Counts:");
        console.table(res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

checkStatus();
