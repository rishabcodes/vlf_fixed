import { prisma } from '../src/lib/prisma';

// HTML entities that need to be decoded
const htmlEntities: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&nbsp;': ' ',
  '&#x27;': "'",
  '&#x2F;': '/',
  '&#x60;': '`',
  '&#x3D;': '=',
};

function decodeHTMLEntities(text: string): string {
  let decoded = text;
  
  // Decode HTML entities
  Object.entries(htmlEntities).forEach(([entity, char]) => {
    const regex = new RegExp(entity, 'g');
    decoded = decoded.replace(regex, char);
  });
  
  return decoded;
}

async function fixHTMLPosts() {
  try {
    console.log('Starting HTML post fix process...\n');
    
    // Get the affected posts by their IDs
    const affectedPostIds = [
      'cmdgwhzag00118ofuc4hbvjwc',
      'cmdgwhz4m000z8ofud8a2cdee',
      'cmdgwhz7z00108ofuozcbyewv',
      'cmdi8t02v003k8ojd8oql6bi6',
      'cmdi8t063003l8ojdb3tn6vpo',
    ];
    
    console.log(`Processing ${affectedPostIds.length} affected posts...\n`);
    
    for (const postId of affectedPostIds) {
      const post = await prisma.blogPost.findUnique({
        where: { id: postId },
      });
      
      if (!post) {
        console.log(`❌ Post not found: ${postId}`);
        continue;
      }
      
      console.log(`Processing: ${post.title}`);
      console.log(`  ID: ${post.id}`);
      console.log(`  Slug: ${post.slug}`);
      
      // Check if content has HTML entities
      const hasEntities = /&[a-z]+;/i.test(post.content);
      const hasEntitiesEs = post.contentEs ? /&[a-z]+;/i.test(post.contentEs) : false;
      
      if (!hasEntities && !hasEntitiesEs) {
        console.log(`  ✓ No HTML entities found, skipping\n`);
        continue;
      }
      
      // Decode the content
      const fixedContent = decodeHTMLEntities(post.content);
      const fixedContentEs = post.contentEs ? decodeHTMLEntities(post.contentEs) : post.contentEs;
      
      // Also fix excerpt if it has entities
      const fixedExcerpt = post.excerpt && /&[a-z]+;/i.test(post.excerpt) 
        ? decodeHTMLEntities(post.excerpt) 
        : post.excerpt;
      const fixedExcerptEs = post.excerptEs && /&[a-z]+;/i.test(post.excerptEs)
        ? decodeHTMLEntities(post.excerptEs)
        : post.excerptEs;
      
      // Update the post
      await prisma.blogPost.update({
        where: { id: postId },
        data: {
          content: fixedContent,
          contentEs: fixedContentEs,
          excerpt: fixedExcerpt,
          excerptEs: fixedExcerptEs,
        },
      });
      
      console.log(`  ✅ Fixed HTML entities in content\n`);
    }
    
    console.log('='.repeat(60));
    console.log('HTML POST FIX COMPLETE');
    console.log('='.repeat(60));
    console.log(`\n✅ Successfully processed ${affectedPostIds.length} posts`);
    console.log('\nThe following posts have been fixed:');
    console.log('1. North Carolina Immigration Impact: Governor Stein Tours Coca-Cola');
    console.log('2. North Carolina Immigration Impact: Governor Stein $204 Million');
    console.log('3. North Carolina Immigration Impact: Governor Stein $2 Million Trails');
    console.log('4. North Carolina Immigration Impact: Governor Josh Stein 2025 Awards');
    console.log('5. North Carolina Immigration Impact: SEED Program Honors Students');
    console.log('\n🔗 Check the posts at: http://localhost:3004/blog');
    
  } catch (error) {
    console.error('Error fixing HTML posts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
fixHTMLPosts();