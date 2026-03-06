const fs = require('fs');
const path = require('path');

const filePath = path.join('C:', 'Users', 'Pablo', '.gemini', 'antigravity', 'scratch', 'guaw-guardians', 'src', 'pages', 'landing', 'LandingPage.tsx');
let fileContent = fs.readFileSync(filePath, 'utf-8');
let lines = fileContent.split('\n');

const heroEndIdx = lines.findIndex(l => l.includes('{/* Forensic Cryptography Section (The New Truth) */}'));
const whatIsStartIdx = lines.findIndex(l => l.includes('{/* What is GUAW & Differentials */}'));
const integrationsEndIdx = lines.findIndex(l => l.includes('{/* Universal Integrity Domains */}'));

if (heroEndIdx !== -1 && whatIsStartIdx !== -1 && integrationsEndIdx !== -1) {
    const blockToMove = lines.slice(whatIsStartIdx, integrationsEndIdx);
    lines.splice(whatIsStartIdx, integrationsEndIdx - whatIsStartIdx);
    lines.splice(heroEndIdx, 0, ...blockToMove);
    
    fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
    console.log("Sections moved successfully.");
} else {
    console.log("Could not find one or more markers.");
    console.log("heroEndIdx:", heroEndIdx);
    console.log("whatIsStartIdx:", whatIsStartIdx);
    console.log("integrationsEndIdx:", integrationsEndIdx);
}
