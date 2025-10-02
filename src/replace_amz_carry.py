#!/usr/bin/env python3
"""
Script to replace all remaining 'amz_carry' with 'amazoncarry' in the server file
"""

import re

# Read the file
with open('/supabase/functions/server/index.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all remaining amz_carry with amazoncarry
content = content.replace('amz_carry', 'amazoncarry')

# Write back
with open('/supabase/functions/server/index.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replaced all remaining 'amz_carry' with 'amazoncarry'")