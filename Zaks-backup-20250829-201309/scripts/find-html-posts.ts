import { prisma } from '../src/lib/prisma';

async function findHTMLPosts() {
  try {
    // Get all published blog posts
    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'published',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        contentEs: true,
        category: true,
        publishedAt: true,
      },
    });

    console.log(`Total published posts: ${posts.length}\n`);

    // Check for HTML-encoded content patterns
    const htmlPatterns = [
      /&lt;/,      // < encoded as &lt;
      /&gt;/,      // > encoded as &gt;
      /&quot;/,    // " encoded as &quot;
      /&#39;/,     // ' encoded as &#39;
      /&amp;/,     // & encoded as &amp;
      /&nbsp;/,    // non-breaking space
      /&[a-z]+;/i, // any HTML entity
    ];

    const affectedPosts: any[] = [];
    
    posts.forEach(post => {
      let hasHTMLEntities = false;
      let entitiesFound: string[] = [];
      
      // Check English content
      if (post.content) {
        htmlPatterns.forEach(pattern => {
          if (pattern.test(post.content)) {
            hasHTMLEntities = true;
            const matches = post.content.match(pattern);
            if (matches) {
              entitiesFound.push(matches[0]);
            }
          }
        });
      }
      
      // Check Spanish content
      if (post.contentEs) {
        htmlPatterns.forEach(pattern => {
          if (pattern.test(post.contentEs)) {
            hasHTMLEntities = true;
            const matches = post.contentEs.match(pattern);
            if (matches) {
              entitiesFound.push(matches[0]);
            }
          }
        });
      }
      
      if (hasHTMLEntities) {
        // Get a sample of the content to show the issue
        const sample = post.content.substring(0, 200);
        
        affectedPosts.push({
          id: post.id,
          title: post.title,
          slug: post.slug,
          category: post.category,
          publishedAt: post.publishedAt,
          entitiesFound: [...new Set(entitiesFound)],
          sample: sample,
          url: `http://localhost:3004/blog/${post.slug}`,
        });
      }
    });

    console.log('='.repeat(80));
    console.log('BLOG POSTS WITH HTML ENCODING ISSUES');
    console.log('='.repeat(80));
    console.log(`\nFound ${affectedPosts.length} posts with HTML entities in content:\n`);
    
    // Group by category
    const byCategory: Record<string, any[]> = {};
    affectedPosts.forEach(post => {
      if (!byCategory[post.category]) {
        byCategory[post.category] = [];
      }
      byCategory[post.category].push(post);
    });
    
    // Display results by category
    Object.entries(byCategory).forEach(([category, posts]) => {
      console.log(`\n📁 ${category.toUpperCase()} (${posts.length} posts)`);
      console.log('-'.repeat(60));
      
      posts.forEach((post, index) => {
        console.log(`\n${index + 1}. ${post.title}`);
        console.log(`   ID: ${post.id}`);
        console.log(`   Slug: ${post.slug}`);
        console.log(`   URL: ${post.url}`);
        console.log(`   Published: ${post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Not published'}`);
        console.log(`   HTML Entities Found: ${post.entitiesFound.join(', ')}`);
        console.log(`   Sample: ${post.sample.substring(0, 100)}...`);
      });
    });
    
    // Summary statistics
    console.log('\n' + '='.repeat(80));
    console.log('SUMMARY');
    console.log('='.repeat(80));
    console.log(`Total affected posts: ${affectedPosts.length} out of ${posts.length} (${Math.round(affectedPosts.length / posts.length * 100)}%)`);
    console.log('\nAffected categories:');
    Object.entries(byCategory).forEach(([category, posts]) => {
      console.log(`  - ${category}: ${posts.length} posts`);
    });
    
    // Create a JSON file with the results
    const report = {
      totalPosts: posts.length,
      affectedPosts: affectedPosts.length,
      percentageAffected: Math.round(affectedPosts.length / posts.length * 100),
      generatedAt: new Date().toISOString(),
      posts: affectedPosts,
      byCategory: Object.fromEntries(
        Object.entries(byCategory).map(([cat, posts]) => [
          cat,
          posts.map(p => ({ id: p.id, title: p.title, slug: p.slug }))
        ])
      ),
    };
    
    // Save to file
    const fs = require('fs');
    const path = require('path');
    const reportPath = path.join(__dirname, 'html-posts-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n✅ Report saved to: ${reportPath}`);
    
  } catch (error) {
    console.error('Error finding HTML posts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
findHTMLPosts();