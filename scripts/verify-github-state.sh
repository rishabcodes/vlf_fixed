#!/bin/bash

echo "🔍 Verifying GitHub state..."
echo ""

# Check latest commit on GitHub
echo "📌 Latest commit on GitHub:"
git ls-remote origin HEAD

echo ""
echo "📌 Latest local commit:"
git rev-parse HEAD

echo ""
echo "📋 Recent commits:"
git log --oneline -5

echo ""
echo "📁 Checking problematic files:"
echo "1. Contact page:"
head -20 src/app/contact/page.tsx

echo ""
echo "2. Scholarship page:"
head -20 src/app/scholarship/ScholarshipPageClient.tsx

echo ""
echo "3. Our Team page:"
head -20 src/app/our-team/OurTeamPageClient.tsx

echo ""
echo "4. Spanish Team page:"
head -20 src/app/es/nuestro-equipo/NuestroEquipoPageClient.tsx

echo ""
echo "✅ Verification complete!"