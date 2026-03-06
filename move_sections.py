with open(r"C:\Users\Pablo\.gemini\antigravity\scratch\guaw-guardians\src\pages\landing\LandingPage.tsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

hero_end = next(i for i, l in enumerate(lines) if "{/* Forensic Cryptography Section (The New Truth) */}" in l)
whatis_start = next(i for i, l in enumerate(lines) if "{/* What is GUAW & Differentials */}" in l)
integrations_end = next(i for i, l in enumerate(lines) if "{/* Universal Integrity Domains */}" in l)

block_to_move = lines[whatis_start:integrations_end]

del lines[whatis_start:integrations_end]

lines[hero_end:hero_end] = block_to_move

with open(r"C:\Users\Pablo\.gemini\antigravity\scratch\guaw-guardians\src\pages\landing\LandingPage.tsx", "w", encoding="utf-8") as f:
    f.writelines(lines)
