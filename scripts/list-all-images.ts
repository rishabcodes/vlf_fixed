import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listAllImages() {
  const images = await prisma.image.findMany({
    select: {
      id: true,
      filename: true,
      category: true,
      entityType: true,
      entityId: true,
    },
    orderBy: {
      filename: 'asc',
    },
  });

  // Group by category
  const grouped = images.reduce((acc, img) => {
    if (!acc[img.category]) acc[img.category] = [];
    acc[img.category].push(img);
    return acc;
  }, {} as Record<string, typeof images>);

  console.log('All Images in Database:');
  console.log('=======================\n');
  
  Object.entries(grouped).forEach(([category, imgs]) => {
    console.log(`\n${category} (${imgs.length} images):`);
    console.log('-'.repeat(40));
    imgs.forEach(img => {
      console.log(`  ${img.filename}`);
      console.log(`    ID: ${img.id}`);
      if (img.entityType) console.log(`    Entity: ${img.entityType}/${img.entityId}`);
    });
  });

  // Find attorney images specifically
  console.log('\n\nAttorney Images Mapping:');
  console.log('========================');
  const attorneyImages = images.filter(img => 
    img.filename.includes('william-vasquez') ||
    img.filename.includes('adriana-ingram') ||
    img.filename.includes('adrianna-ingram') ||
    img.filename.includes('christopher-afanador') ||
    img.filename.includes('jillian-baucom') ||
    img.filename.includes('judith-parkes') ||
    img.filename.includes('kelly-vega') ||
    img.filename.includes('mark-kelsey') ||
    img.filename.includes('rebecca-sommer') ||
    img.filename.includes('roselyn-torrellas')
  );
  
  attorneyImages.forEach(img => {
    const slug = img.filename
      .replace(/\.(jpg|png|webp|HEIC)$/i, '')
      .replace(/-original$/i, '')
      .replace(/^adriana-/, 'adrianna-'); // Handle adriana/adrianna variation
    console.log(`'${slug}': '${img.id}', // ${img.filename}`);
  });

  await prisma.$disconnect();
}

listAllImages().catch(console.error);