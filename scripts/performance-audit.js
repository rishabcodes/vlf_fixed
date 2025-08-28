#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const LIGHTHOUSE_CONFIG = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance'],
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    },
    throttling: {
      rttMs: 40,
      throughputKbps: 10 * 1024,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
  },
};

const PAGES_TO_TEST = [
  { name: 'Home', url: 'http://localhost:3000' },
  { name: 'Practice Areas', url: 'http://localhost:3000/practice-areas' },
  { name: 'Immigration', url: 'http://localhost:3000/practice-areas/immigration' },
  { name: 'Contact', url: 'http://localhost:3000/contact' },
  { name: 'About', url: 'http://localhost:3000/about' },
  { name: 'Attorney Profile', url: 'http://localhost:3000/attorneys/william-vasquez' },
];

const MOBILE_CONFIG = {
  ...LIGHTHOUSE_CONFIG,
  settings: {
    ...LIGHTHOUSE_CONFIG.settings,
    formFactor: 'mobile',
    screenEmulation: {
      mobile: true,
      width: 360,
      height: 640,
      deviceScaleFactor: 2,
      disabled: false,
    },
    throttling: {
      rttMs: 150,
      throughputKbps: 1.6 * 1024,
      cpuSlowdownMultiplier: 4,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
  },
};

async function runLighthouse(url, config, outputPath) {
  return new Promise((resolve, reject) => {
    const configPath = path.join(__dirname, 'lighthouse-config.json');
    fs.writeFileSync(configPath, JSON.stringify(config));

    const cmd = `npx lighthouse ${url} --config-path=${configPath} --output=html --output=json --output-path=${outputPath} --chrome-flags="--headless"`;

    exec(cmd, (error, stdout, stderr) => {
      fs.unlinkSync(configPath);

      if (error) {
        console.error(`Error running Lighthouse: ${error}`);
        reject(error);
        return;
      }

      // Parse JSON results
      const jsonPath = `${outputPath}.report.json`;
      if (fs.existsSync(jsonPath)) {
        const results = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        resolve(results);
      } else {
        reject(new Error('No results file found'));
      }
    });
  });
}

async function analyzeResults(results) {
  const performance = results.categories.performance;
  const metrics = results.audits;

  const criticalMetrics = {
    score: Math.round(performance.score * 100),
    FCP: metrics['first-contentful-paint'].numericValue,
    LCP: metrics['largest-contentful-paint'].numericValue,
    TBT: metrics['total-blocking-time'].numericValue,
    CLS: metrics['cumulative-layout-shift'].numericValue,
    SI: metrics['speed-index'].numericValue,
    TTI: metrics['interactive'].numericValue,
  };

  const opportunities = Object.values(results.audits)
    .filter(
      audit => audit.details && audit.details.type === 'opportunity' && audit.numericValue > 100
    )
    .sort((a, b) => b.numericValue - a.numericValue)
    .slice(0, 5);

  return { criticalMetrics, opportunities };
}

async function generateReport(allResults) {
  const timestamp = new Date().toISOString();
  let report = `# Performance Audit Report\n\n`;
  report += `Generated: ${timestamp}\n\n`;

  // Summary
  report += `## Summary\n\n`;
  report += `| Page | Desktop Score | Mobile Score | LCP (s) | TBT (ms) | CLS |\n`;
  report += `|------|---------------|--------------|---------|----------|-----|\n`;

  allResults.forEach(({ page, desktop, mobile }) => {
    report += `| ${page} | ${desktop.criticalMetrics.score} | ${mobile.criticalMetrics.score} | `;
    report += `${(desktop.criticalMetrics.LCP / 1000).toFixed(2)} | `;
    report += `${Math.round(desktop.criticalMetrics.TBT)} | `;
    report += `${desktop.criticalMetrics.CLS.toFixed(3)} |\n`;
  });

  // Detailed findings
  report += `\n## Detailed Findings\n\n`;

  allResults.forEach(({ page, desktop, mobile }) => {
    report += `### ${page}\n\n`;

    report += `#### Desktop Metrics\n`;
    report += `- Performance Score: ${desktop.criticalMetrics.score}/100\n`;
    report += `- First Contentful Paint: ${(desktop.criticalMetrics.FCP / 1000).toFixed(2)}s\n`;
    report += `- Largest Contentful Paint: ${(desktop.criticalMetrics.LCP / 1000).toFixed(2)}s\n`;
    report += `- Total Blocking Time: ${Math.round(desktop.criticalMetrics.TBT)}ms\n`;
    report += `- Cumulative Layout Shift: ${desktop.criticalMetrics.CLS.toFixed(3)}\n`;
    report += `- Speed Index: ${(desktop.criticalMetrics.SI / 1000).toFixed(2)}s\n`;
    report += `- Time to Interactive: ${(desktop.criticalMetrics.TTI / 1000).toFixed(2)}s\n\n`;

    if (desktop.opportunities.length > 0) {
      report += `#### Top Optimization Opportunities\n`;
      desktop.opportunities.forEach(opp => {
        report += `- **${opp.title}**: Potential savings of ${(opp.numericValue / 1000).toFixed(2)}s\n`;
      });
      report += `\n`;
    }
  });

  // Recommendations
  report += `## Recommendations\n\n`;

  const avgDesktopScore =
    allResults.reduce((sum, r) => sum + r.desktop.criticalMetrics.score, 0) / allResults.length;
  const avgMobileScore =
    allResults.reduce((sum, r) => sum + r.mobile.criticalMetrics.score, 0) / allResults.length;

  if (avgDesktopScore < 90) {
    report += `- **Critical**: Average desktop performance score is ${avgDesktopScore.toFixed(0)}/100. Target is 95+.\n`;
  }
  if (avgMobileScore < 90) {
    report += `- **Critical**: Average mobile performance score is ${avgMobileScore.toFixed(0)}/100. Target is 95+.\n`;
  }

  // Find common issues
  const allOpportunities = allResults.flatMap(r => r.desktop.opportunities.map(o => o.id));
  const opportunityCounts = allOpportunities.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  const commonIssues = Object.entries(opportunityCounts)
    .filter(([_, count]) => count >= 3)
    .sort((a, b) => b[1] - a[1]);

  if (commonIssues.length > 0) {
    report += `\n### Common Issues Across Pages:\n`;
    commonIssues.forEach(([id, count]) => {
      report += `- ${id.replace(/-/g, ' ')}: Found on ${count} pages\n`;
    });
  }

  return report;
}

async function main() {
  console.log('🚀 Starting Performance Audit...\n');

  // Create reports directory
  const reportsDir = path.join(__dirname, '..', 'performance-reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const timestamp = Date.now();
  const allResults = [];

  for (const page of PAGES_TO_TEST) {
    console.log(`📊 Testing ${page.name}...`);

    try {
      // Desktop test
      console.log('  - Running desktop test...');
      const desktopPath = path.join(
        reportsDir,
        `${timestamp}-${page.name.toLowerCase().replace(/\s+/g, '-')}-desktop`
      );
      const desktopResults = await runLighthouse(page.url, LIGHTHOUSE_CONFIG, desktopPath);
      const desktopAnalysis = await analyzeResults(desktopResults);

      // Mobile test
      console.log('  - Running mobile test...');
      const mobilePath = path.join(
        reportsDir,
        `${timestamp}-${page.name.toLowerCase().replace(/\s+/g, '-')}-mobile`
      );
      const mobileResults = await runLighthouse(page.url, MOBILE_CONFIG, mobilePath);
      const mobileAnalysis = await analyzeResults(mobileResults);

      allResults.push({
        page: page.name,
        desktop: desktopAnalysis,
        mobile: mobileAnalysis,
      });

      console.log(
        `  ✅ ${page.name} - Desktop: ${desktopAnalysis.criticalMetrics.score}, Mobile: ${mobileAnalysis.criticalMetrics.score}\n`
      );
    } catch (error) {
      console.error(`  ❌ Error testing ${page.name}: ${error.message}\n`);
    }
  }

  // Generate summary report
  const report = await generateReport(allResults);
  const reportPath = path.join(reportsDir, `${timestamp}-summary.md`);
  fs.writeFileSync(reportPath, report);

  console.log(`\n✅ Performance audit complete!`);
  console.log(`📄 Summary report: ${reportPath}`);

  // Print summary to console
  console.log('\n📊 Quick Summary:');
  allResults.forEach(({ page, desktop, mobile }) => {
    const desktopEmoji =
      desktop.criticalMetrics.score >= 90
        ? '✅'
        : desktop.criticalMetrics.score >= 50
          ? '⚠️'
          : '❌';
    const mobileEmoji =
      mobile.criticalMetrics.score >= 90 ? '✅' : mobile.criticalMetrics.score >= 50 ? '⚠️' : '❌';
    console.log(
      `${page}: Desktop ${desktopEmoji} ${desktop.criticalMetrics.score}/100 | Mobile ${mobileEmoji} ${mobile.criticalMetrics.score}/100`
    );
  });
}

// Run the audit
main().catch(console.error);
