#!/bin/bash

# Script to find hardcoded colors in the codebase
# Usage: ./scripts/find-hardcoded-colors.sh

echo "Finding hardcoded colors in components..."
echo "========================================="
echo ""

# Common color patterns to find
echo "Hex colors (#XXX or #XXXXXX):"
grep -rn "#[0-9a-fA-F]\{3\}\|#[0-9a-fA-F]\{6\}" src/components/ --include="*.tsx" --include="*.ts" | grep -v "design-tokens" | grep -v "node_modules" | grep -v ".tsx~" | head -20

echo ""
echo "RGB/RGBA colors:"
grep -rn "rgb\|rgba" src/components/ --include="*.tsx" --include="*.ts" | grep -v "design-tokens" | grep -v "node_modules" | grep -v ".tsx~" | head -20

echo ""
echo "Tailwind arbitrary values (bg-[#], text-[#], border-[#]):"
grep -rn "bg-\[#\|text-\[#\|border-\[#" src/components/ --include="*.tsx" --include="*.ts" | grep -v "design-tokens" | grep -v "node_modules" | grep -v ".tsx~" | head -20

echo ""
echo "Summary:"
echo "--------"
TOTAL=$(grep -rn "rgb\|rgba\|#[0-9a-fA-F]\{3\}\|#[0-9a-fA-F]\{6\}" src/components/ --include="*.tsx" --include="*.ts" | grep -v "design-tokens" | grep -v "node_modules" | grep -v ".tsx~" | wc -l)
echo "Total hardcoded colors found: $TOTAL"

echo ""
echo "Color mapping guide:"
echo "-------------------"
echo "#6B1F2E → secondary or secondary-700"
echo "#8B2635 → secondary-600"
echo "#551825 → secondary-800"
echo "#C9974D → primary or primary-500"
echo "#D4A574 → primary-400"
echo "#B08740 → primary-600"
echo "#E5B568 → primary-300"
echo "gray-XXX → neutral-XXX"