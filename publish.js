const fs = require('fs');
const https = require('https');

const data = fs.readFileSync('payload.json');

const options = {
    hostname: 'livetrackings.com',
    path: '/api/save-page',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Publish-Secret': 'livetrackings-pseo-2024',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (e) => {
    console.error(e);
});

req.write(data);
req.end();

