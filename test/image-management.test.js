// image-management.test.js
// Simple test script using node-fetch to verify image upload and retrieval
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const SERVER_URL = 'http://localhost:3000'; // adjust if server runs on different port

async function uploadImage(name, filePath) {
    const url = `${SERVER_URL}/api/upload?name=${encodeURIComponent(name)}`;
    const fileStream = fs.createReadStream(filePath);
    const response = await fetch(url, {
        method: 'POST',
        body: fileStream,
        headers: {
            'Content-Type': 'application/octet-stream',
        },
    });
    if (!response.ok) {
        throw new Error(`Upload failed for ${name}: ${response.status} ${response.statusText}`);
    }
    console.log(`Uploaded ${name} successfully.`);
}

async function getImage(name) {
    const url = `${SERVER_URL}/public/${encodeURIComponent(name)}.jpg`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Get image failed for ${name}: ${response.status}`);
    }
    const buffer = await response.buffer();
    console.log(`Fetched ${name} (${buffer.length} bytes).`);
    return buffer;
}

(async () => {
    try {
        const sampleTom = path.join(__dirname, 'samples', 'tom1.jpg');
        const sampleTom2 = path.join(__dirname, 'samples', 'tom2.jpg');
        const sampleJerry = path.join(__dirname, 'samples', 'jerry1.jpg');

        // Ensure sample directory exists
        if (!fs.existsSync(sampleTom) || !fs.existsSync(sampleTom2) || !fs.existsSync(sampleJerry)) {
            console.error('Sample images not found. Place tom1.jpg, tom2.jpg, jerry1.jpg in test/samples');
            process.exit(1);
        }

        // 1. Upload initial Tom image
        await uploadImage('tom', sampleTom);
        const tomBuffer1 = await getImage('tom');

        // 2. Replace Tom image
        await uploadImage('tom', sampleTom2);
        const tomBuffer2 = await getImage('tom');
        if (tomBuffer1.equals(tomBuffer2)) {
            throw new Error('Tom image was not replaced');
        }
        console.log('Tom image replacement verified.');

        // 3. Upload Jerry image and fetch
        await uploadImage('jerry', sampleJerry);
        await getImage('jerry');
        console.log('Jerry image upload and retrieval verified.');

        console.log('All image management tests passed.');
        process.exit(0);
    } catch (err) {
        console.error('Test failed:', err.message);
        process.exit(1);
    }
})();
