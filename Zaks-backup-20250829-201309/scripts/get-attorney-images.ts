import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getAttorneyImages() {
  const images = await prisma.image.findMany({
    where: {
      OR: [
        { category: 'ATTORNEY' },
        { entityType: 'attorney' }
      ]
    },
    select: {
      id: true,
      filename: true,
      entityId: true,
      category: true,
    },
    orderBy: {
      filename: 'asc',
    },
  });

  console.log('Attorney Images:');
  console.log('================');
  images.forEach(img => {
    const attorneyName = img.entityId || img.filename.replace(/\.(jpg|png|webp|HEIC)$/i, '');
    console.log(`${attorneyName}: '${img.id}', // ${img.filename}`);
  });

  await prisma.$disconnect();
}

getAttorneyImages().catch(console.error);