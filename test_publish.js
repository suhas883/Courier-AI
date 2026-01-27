
// Native fetch is available in Node 18+
async function testPublish() {
    const url = "https://livetrackings.com/api/save-page";
    const secret = "livetrackings-pseo-2024";

    const payload = {
        filename: "test-agent-publish-v1",
        language: "en",
        subdirectory: "test-debug",
        html: "<h1>Test Page</h1><p>This is a test page to verify publishing.</p>",
        api_secret: secret
    };

    try {
        console.log(`Sending request to ${url}...`);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Publish-Secret": secret
            },
            body: JSON.stringify(payload)
        });

        console.log(`Response Status: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.log("Response Body:", text);

    } catch (error) {
        console.error("Error:", error);
    }
}

testPublish();

