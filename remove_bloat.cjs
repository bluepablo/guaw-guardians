const fs = require('fs');
const path = require('path');

const filePath = path.join('C:', 'Users', 'Pablo', '.gemini', 'antigravity', 'scratch', 'guaw-guardians', 'src', 'pages', 'landing', 'LandingPage.tsx');
let fileContent = fs.readFileSync(filePath, 'utf-8');
let lines = fileContent.split('\n');

const threePillarsStart = lines.findIndex(l => l.includes('{/* Core Framework: The Three Pillars */}'));
const legalAndTrustStart = lines.findIndex(l => l.includes('{/* Legal & Trust */}'));
const latencyTableStart = lines.findIndex(l => l.includes('{/* Deterministic Latency Table — Technical Supremacy */}'));
const faqStart = lines.findIndex(l => l.includes('{/* Trust & Transparency FAQ */}'));

if (threePillarsStart !== -1 && legalAndTrustStart !== -1 && latencyTableStart !== -1 && faqStart !== -1) {
    // Delete chunks in reverse order to not mess up indices
    lines.splice(latencyTableStart, faqStart - latencyTableStart);
    lines.splice(threePillarsStart, legalAndTrustStart - threePillarsStart);
    
    fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
    console.log("Middle and bottom bloat removed.");
} else {
    console.log("Could not find markers.");
    console.log({threePillarsStart, legalAndTrustStart, latencyTableStart, faqStart});
}
