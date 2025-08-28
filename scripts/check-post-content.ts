import { prisma } from '../src/lib/prisma';

async function checkPostContent() {
  try {
    // Get one of the affected posts
    const post = await prisma.blogPost.findUnique({
      where: {
        id: 'cmdgwhzag00118ofuc4hbvjwc', // First affected post
      },
    });

    if (!post) {
      console.log('Post not found');
      return;
    }

    console.log('='.repeat(80));
    console.log('POST DETAILS');
    console.log('='.repeat(80));
    console.log(`Title: ${post.title}`);
    console.log(`Slug: ${post.slug}`);
    console.log(`Category: ${post.category}`);
    console.log(`Status: ${post.status}`);
    
    console.log('\n' + '='.repeat(80));
    console.log('CONTENT ANALYSIS');
    console.log('='.repeat(80));
    
    // Show first 1000 characters of content
    console.log('\nFirst 1000 characters of content:');
    console.log('-'.repeat(60));
    console.log(post.content.substring(0, 1000));
    
    // Check if content contains actual HTML tags or encoded entities
    const hasActualHTML = /<[^>]+>/.test(post.content);
    const hasEncodedHTML = /&[a-z]+;/.test(post.content);
    
    console.log('\n' + '-'.repeat(60));
    console.log('Content analysis:');
    console.log(`- Contains actual HTML tags (<div>, <p>, etc.): ${hasActualHTML}`);
    console.log(`- Contains HTML entities (&lt;, &gt;, etc.): ${hasEncodedHTML}`);
    
    // Find all HTML entities
    const entities = post.content.match(/&[a-z]+;/gi);
    if (entities) {
      const uniqueEntities = [...new Set(entities)];
      console.log(`\nUnique HTML entities found (${uniqueEntities.length}):`);
      uniqueEntities.slice(0, 20).forEach(entity => {
        console.log(`  - ${entity}`);
      });
      if (uniqueEntities.length > 20) {
        console.log(`  ... and ${uniqueEntities.length - 20} more`);
      }
    }
    
  } catch (error) {
    console.error('Error checking post content:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
checkPostContent();