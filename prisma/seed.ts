import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@vasquezlawnc.com' },
    update: {},
    create: {
      email: 'admin@vasquezlawnc.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
      language: 'en',
      phone: '1-844-967-3536',
      emailVerified: new Date(),
    },
  });

  console.log('✅ Created admin user');

  // Create sample attorneys
  const attorneyPassword = await bcrypt.hash('attorney123', 10);
  const attorneys = await Promise.all([
    prisma.user.upsert({
      where: { email: 'attorney1@vasquezlawnc.com' },
      update: {},
      create: {
        email: 'attorney1@vasquezlawnc.com',
        name: 'Attorney One',
        password: attorneyPassword,
        role: 'ATTORNEY',
        language: 'en',
        phone: '(919) 555-0101',
        emailVerified: new Date(),
      },
    }),
    prisma.user.upsert({
      where: { email: 'attorney2@vasquezlawnc.com' },
      update: {},
      create: {
        email: 'attorney2@vasquezlawnc.com',
        name: 'Attorney Two',
        password: attorneyPassword,
        role: 'ATTORNEY',
        language: 'es',
        phone: '(919) 555-0102',
        emailVerified: new Date(),
      },
    }),
  ]);

  console.log('✅ Created attorneys');

  // Create sample blog posts
  const practiceAreas = [
    'immigration',
    'personal-injury',
    'workers-compensation',
    'criminal-defense',
    'family-law',
    'traffic-violations',
  ];

  const blogPosts = [];

  for (const practiceArea of practiceAreas) {
    // English post
    const enPost = await prisma.blogPost.create({
      data: {
        title: `Understanding ${practiceArea.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Law in North Carolina`,
        slug: `understanding-${practiceArea}-law-nc`,
        content: `<h2>Introduction</h2><p>This is a comprehensive guide to ${practiceArea.replace('-', ' ')} law in North Carolina...</p>`,
        excerpt: `Learn everything you need to know about ${practiceArea.replace('-', ' ')} law in NC.`,
        metaDescription: `Complete guide to ${practiceArea.replace('-', ' ')} law in North Carolina. Free consultation available.`,
        metaKeywords: [practiceArea, 'north carolina', 'law', 'attorney', 'lawyer'],
        practiceArea,
        language: 'en',
        status: 'published',
        publishedAt: new Date(),
        author: 'Vasquez Law Team',
        keywords: [practiceArea, 'legal advice', 'NC law', 'attorney'],
        seoScore: 95,
        readTime: 8,
      },
    });

    // Spanish post
    const esPost = await prisma.blogPost.create({
      data: {
        title: `Entendiendo la Ley de ${practiceArea.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} en Carolina del Norte`,
        slug: `entendiendo-ley-${practiceArea}-nc`,
        content: `<h2>Introducción</h2><p>Esta es una guía completa sobre la ley de ${practiceArea.replace('-', ' ')} en Carolina del Norte...</p>`,
        excerpt: `Aprenda todo lo que necesita saber sobre la ley de ${practiceArea.replace('-', ' ')} en NC.`,
        metaDescription: `Guía completa de la ley de ${practiceArea.replace('-', ' ')} en Carolina del Norte. Consulta gratuita disponible.`,
        metaKeywords: [practiceArea, 'carolina del norte', 'ley', 'abogado'],
        practiceArea,
        language: 'es',
        status: 'published',
        publishedAt: new Date(),
        author: 'Equipo Legal Vasquez',
        keywords: [practiceArea, 'asesoría legal', 'ley NC', 'abogado'],
        originalId: enPost.id,
        seoScore: 95,
        readTime: 8,
      },
    });

    blogPosts.push(enPost, esPost);
  }

  console.log(`✅ Created ${blogPosts.length} blog posts`);

  // Create sample keywords
  const keywords = [
    {
      keyword: 'immigration lawyer raleigh',
      practiceArea: 'immigration',
      language: 'en',
      searchVolume: 1200,
      difficulty: 45,
    },
    {
      keyword: 'abogado de inmigracion raleigh',
      practiceArea: 'immigration',
      language: 'es',
      searchVolume: 800,
      difficulty: 35,
    },
    {
      keyword: 'car accident attorney charlotte',
      practiceArea: 'personal-injury',
      language: 'en',
      searchVolume: 2100,
      difficulty: 65,
    },
    {
      keyword: 'workers comp lawyer nc',
      practiceArea: 'workers-compensation',
      language: 'en',
      searchVolume: 900,
      difficulty: 40,
    },
    {
      keyword: 'criminal defense attorney raleigh',
      practiceArea: 'criminal-defense',
      language: 'en',
      searchVolume: 1500,
      difficulty: 55,
    },
    {
      keyword: 'divorce lawyer charlotte nc',
      practiceArea: 'family-law',
      language: 'en',
      searchVolume: 1800,
      difficulty: 60,
    },
    {
      keyword: 'traffic ticket lawyer nc',
      practiceArea: 'traffic-violations',
      language: 'en',
      searchVolume: 600,
      difficulty: 30,
    },
  ];

  for (const kw of keywords) {
    await prisma.keywordResearch.upsert({
      where: {
        keyword_language: {
          keyword: kw.keyword,
          language: kw.language,
        },
      },
      update: {},
      create: {
        ...kw,
        intent: 'transactional',
        cpc: Math.random() * 10 + 5, // Random CPC between $5-$15
      },
    });
  }

  console.log('✅ Created keyword research data');

  // Create sample cases
  const sampleCases = await Promise.all([
    prisma.case.create({
      data: {
        caseNumber: 'VLF-2024-001',
        clientId: admin.id,
        attorneyId: attorneys[0].id,
        practiceArea: 'immigration',
        status: 'open',
        description: 'Green card application - Family based',
      },
    }),
    prisma.case.create({
      data: {
        caseNumber: 'VLF-2024-002',
        clientId: admin.id,
        attorneyId: attorneys[1].id,
        practiceArea: 'personal_injury',
        status: 'in_progress',
        description: 'Car accident case - Highway 40',
      },
    }),
  ]);

  console.log('✅ Created sample cases');

  // Create sample tasks
  await Promise.all([
    prisma.task.create({
      data: {
        title: 'Review USCIS response',
        description: 'Review the latest USCIS response for case VLF-2024-001',
        type: 'document_preparation',
        priority: 'high',
        status: 'pending',
        assignedToId: attorneys[0].id,
        createdById: admin.id,
        caseId: sampleCases[0].id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      },
    }),
    prisma.task.create({
      data: {
        title: 'Schedule medical evaluation',
        description: 'Schedule medical evaluation for client',
        type: 'follow_up',
        priority: 'medium',
        status: 'pending',
        assignedToId: attorneys[1].id,
        createdById: admin.id,
        caseId: sampleCases[1].id,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      },
    }),
  ]);

  console.log('✅ Created sample tasks');

  console.log('🎉 Database seed completed!');
}

main()
  .catch(e => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
