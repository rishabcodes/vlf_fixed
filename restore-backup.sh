#!/bin/bash

echo "========================================"
echo "Zak's Backup Restoration Script"
echo "========================================"
echo ""
echo "This will restore all deleted files from the backup."
echo "Press Ctrl+C to cancel, or Enter to continue..."
read -r

echo ""
echo "Restoring directories..."

# Restore complete directories
if [ -d "Zaks-backup-20250829-201309/agents" ]; then
    echo "Restoring src/agents..."
    cp -r Zaks-backup-20250829-201309/agents src/
fi

if [ -d "Zaks-backup-20250829-201309/qwik" ]; then
    echo "Restoring src/components/qwik..."
    cp -r Zaks-backup-20250829-201309/qwik src/components/
fi

if [ -d "Zaks-backup-20250829-201309/animations" ]; then
    echo "Restoring src/components/animations..."
    cp -r Zaks-backup-20250829-201309/animations src/components/
fi

# Restore Voice components (except MinimalRetellClient.tsx)
if [ -d "Zaks-backup-20250829-201309/Voice-components" ]; then
    echo "Restoring Voice components..."
    for file in Zaks-backup-20250829-201309/Voice-components/*.tsx; do
        filename=$(basename "$file")
        if [ "$filename" != "MinimalRetellClient.tsx" ]; then
            cp "$file" src/components/Voice/
        fi
    done
fi

# Restore scripts
if [ -d "Zaks-backup-20250829-201309/scripts" ]; then
    echo "Restoring scripts..."
    cp Zaks-backup-20250829-201309/scripts/* scripts/
fi

# Restore CSS files
if [ -d "Zaks-backup-20250829-201309/css" ]; then
    echo "Restoring CSS files..."
    [ -f "Zaks-backup-20250829-201309/css/brand.css" ] && cp Zaks-backup-20250829-201309/css/brand.css src/styles/
    [ -f "Zaks-backup-20250829-201309/css/glassmorphic.css" ] && cp Zaks-backup-20250829-201309/css/glassmorphic.css src/styles/
    [ -f "Zaks-backup-20250829-201309/css/theme.css" ] && cp Zaks-backup-20250829-201309/css/theme.css src/design-system/styles/
fi

# Restore documentation
if [ -d "Zaks-backup-20250829-201309/docs" ]; then
    echo "Restoring documentation..."
    cp Zaks-backup-20250829-201309/docs/HREFLANG_*.md src/components/SEO/ 2>/dev/null
    cp Zaks-backup-20250829-201309/docs/AMPLIFY_*.md . 2>/dev/null
    cp Zaks-backup-20250829-201309/docs/AWS*.md . 2>/dev/null
    
    # Restore design system docs
    for file in Zaks-backup-20250829-201309/docs/*.md; do
        filename=$(basename "$file")
        case "$filename" in
            AUDIT-REPORT.md|IMPLEMENTATION-SUMMARY.md|MIGRATION-PLAN.md|QUICK-FIXES-GUIDE.md)
                cp "$file" src/design-system/
                ;;
        esac
    done
fi

# Restore misc files
[ -f "Zaks-backup-20250829-201309/git-remotes-backup.txt" ] && cp Zaks-backup-20250829-201309/git-remotes-backup.txt .
[ -f "Zaks-backup-20250829-201309/aws-deployment-config.json" ] && cp Zaks-backup-20250829-201309/aws-deployment-config.json .
[ -f "Zaks-backup-20250829-201309/aws-version.txt" ] && cp Zaks-backup-20250829-201309/aws-version.txt .
[ -f "Zaks-backup-20250829-201309/build-optimization.config.js" ] && cp Zaks-backup-20250829-201309/build-optimization.config.js .
[ -f "Zaks-backup-20250829-201309/page.example.tsx" ] && cp Zaks-backup-20250829-201309/page.example.tsx src/app/7-proven-strategies-that-immigration-lawyers-use-to-win-complex-cases/

echo ""
echo "========================================"
echo "Restoration complete!"
echo "========================================"
echo ""
echo "All backed up files have been restored."
echo "You may need to run 'pnpm install' if dependencies changed."
echo ""