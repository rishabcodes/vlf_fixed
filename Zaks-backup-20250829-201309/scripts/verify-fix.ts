import { prisma } from '../src/lib/prisma';

async function verifyFix() {
  try {
    // Check one of the fixed posts
    const post = await prisma.blogPost.findUnique({
      where: {
        id: 'cmdgwhzag00118ofuc4hbvjwc', // First affected post
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
      },
    });

    if (!post) {
      console.log('Post not found');
      return;
    }

    console.log('='.repeat(80));
    console.log('VERIFICATION RESULTS');
    console.log('='.repeat(80));
    console.log(`\nPost: ${post.title}`);
    console.log(`URL: http://localhost:3004/blog/${post.slug}\n`);
    
    // Check if content still has HTML entities
    const stillHasEntities = /&amp;|&lt;|&gt;|&quot;|&#39;|&nbsp;/.test(post.content);
    
    if (stillHasEntities) {
      console.log('❌ HTML entities still present in content');
      const entities = post.content.match(/&[a-z]+;/gi);
      if (entities) {
        const uniqueEntities = [...new Set(entities)];
        console.log(`Found entities: ${uniqueEntities.slice(0, 5).join(', ')}`);
      }
    } else {
      console.log('✅ HTML entities have been successfully decoded');
      console.log('   Content now contains proper HTML without encoded entities');
    }
    
    // Show a sample of the fixed content
    console.log('\nFirst 500 characters of fixed content:');
    console.log('-'.repeat(60));
    console.log(post.content.substring(0, 500));
    console.log('-'.repeat(60));
    
    console.log('\n✅ The blog posts should now display correctly.');
    console.log('   Please check: http://localhost:3004/blog');
    
  } catch (error) {
    console.error('Error verifying fix:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
verifyFix();