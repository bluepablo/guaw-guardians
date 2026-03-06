
import os

filepath = r'C:\Users\Pablo\Backend-Guaw\src\pages\landing\LandingPage.tsx'
temp_filepath = r'C:\Users\Pablo\.gemini\antigravity\scratch\guaw-guardians\src\pages\landing_temp_pricing.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    orig_content = f.read()

with open(temp_filepath, 'r', encoding='utf-8') as f:
    new_pricing = f.read()

# Define the markers
start_marker = '{/* Active Beta Row */}'
end_marker = '{/* Sovereign Tier — full width row */}'

start_idx = orig_content.find(start_marker)
end_idx = orig_content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    # We want to keep some leading whitespace if possible
    prefix = orig_content[:start_idx]
    suffix = orig_content[end_idx:]
    
    # The new_pricing already has some indentation, but let's be careful.
    # The start_marker in orig_content is likely indented.
    
    final_content = prefix + new_pricing.strip() + "\n\n            " + suffix
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(final_content)
    print("Successfully replaced pricing section.")
else:
    print(f"Markers not found. Start: {start_idx}, End: {end_idx}")
