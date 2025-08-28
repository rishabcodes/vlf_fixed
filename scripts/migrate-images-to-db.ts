#!/usr/bin/env tsx
/**
 * Migration Script: Move all static images to database
 * This script reads all images from /public/images and stores them in the database
 */

import fs from 'fs';
import path from 'path';
import { PrismaClient, ImageCategory } from '@prisma/client';
import sharp from 'sharp';

const prisma = new PrismaClient();

// Image category mapping based on directory structure
const getCategoryFromPath = (filePath: string): ImageCategory => {
  if (filePath.includes('attorneys/')) return 'ATTORNEY';
  if (filePath.includes('offices/')) return 'OFFICE';
  if (filePath.includes('staff/')) return 'STAFF';
  if (filePath.includes('scholarship/')) return 'SCHOLARSHIP';
  if (filePath.includes('LOGO') || filePath.includes('logo')) return 'BRAND';
  if (filePath.includes('BANNER')) return 'BANNER';
  if (filePath.endsWith('.svg')) return 'ICON';
  return 'OTHER';
};

// Get entity info from file path
const getEntityInfo = (filePath: string, filename: string): { type?: string; id?: string } => {
  if (filePath.includes('/attorneys/')) {
    // Extract attorney slug from filename
    const slug = filename.replace(/\.(jpg|png|webp|HEIC)$/i, '')
      .replace('-original', '')
      .toLowerCase();
    return { type: 'attorney', id: slug };
  }
  if (filePath.includes('/offices/')) {
    const slug = filename.replace(/\.(jpg|png)$/i, '')
      .replace('-office', '')
      .replace('-original', '')
      .toLowerCase();
    return { type: 'office', id: slug };
  }
  if (filePath.includes('/staff/')) {
    const slug = filename.replace(/\.(png|jpg)$/i, '').toLowerCase();
    return { type: 'staff', id: slug };
  }
  if (filePath.includes('/scholarship/')) {
    const slug = filename.replace(/\.(png|jpg)$/i, '').toLowerCase();
    return { type: 'scholarship', id: slug };
  }
  return {};
};

// Generate alt text from filename
const generateAltText = (filename: string, category: string): string => {
  const name = filename.replace(/\.(jpg|png|webp|svg|HEIC|JPEG|PNG)$/i, '')
    .replace(/-/g, ' ')
    .replace(/_/g, ' ');
  
  switch (category) {
    case 'ATTORNEY':
      return `${name} - Attorney at Vasquez Law Firm`;
    case 'OFFICE':
      return `Vasquez Law Firm ${name} Office`;
    case 'STAFF':
      return `${name} - Staff Member at Vasquez Law Firm`;
    case 'SCHOLARSHIP':
      return `${name} - Scholarship Winner`;
    case 'BRAND':
      return `Vasquez Law Firm ${name}`;
    default:
      return name;
  }
};

async function migrateImages() {
  console.log('🚀 Starting image migration to database...\n');

  const imagesDir = path.join(process.cwd(), 'public', 'images');
  let totalImages = 0;
  let totalSize = 0;

  // Function to process images recursively
  async function processDirectory(dir: string) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Recursively process subdirectories
        await processDirectory(fullPath);
      } else if (stat.isFile()) {
        // Check if it's an image file
        const ext = path.extname(item).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.webp', '.svg', '.heic'].includes(ext)) {
          try {
            // Read file
            const fileBuffer = fs.readFileSync(fullPath);
            const fileSize = fileBuffer.length;
            totalSize += fileSize;

            // Convert to base64
            const base64Data = fileBuffer.toString('base64');
            
            // Get image metadata (dimensions)
            let width: number | undefined;
            let height: number | undefined;
            let thumbnail: string | undefined;

            // Don't process SVGs with sharp
            if (ext !== '.svg') {
              try {
                const metadata = await sharp(fileBuffer).metadata();
                width = metadata.width;
                height = metadata.height;

                // Generate thumbnail (max 200px width)
                if (width && width > 200) {
                  const thumbnailBuffer = await sharp(fileBuffer)
                    .resize(200, null, { withoutEnlargement: true })
                    .toBuffer();
                  thumbnail = thumbnailBuffer.toString('base64');
                }
              } catch (sharpError) {
                console.warn(`⚠️  Could not process ${item} with sharp:`, sharpError.message);
              }
            }

            // Determine MIME type
            const mimeTypes: Record<string, string> = {
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.png': 'image/png',
              '.webp': 'image/webp',
              '.svg': 'image/svg+xml',
              '.heic': 'image/heic',
            };
            const mimeType = mimeTypes[ext] || 'application/octet-stream';

            // Get category and entity info
            const relativePath = path.relative(imagesDir, fullPath);
            const category = getCategoryFromPath(relativePath);
            const entityInfo = getEntityInfo(relativePath, item);
            const altText = generateAltText(item, category);

            // Check if image already exists
            const existing = await prisma.image.findUnique({
              where: {
                category_filename: {
                  category,
                  filename: item,
                },
              },
            });

            if (existing) {
              console.log(`⏭️  Skipping ${item} (already exists)`);
            } else {
              // Insert into database
              const image = await prisma.image.create({
                data: {
                  filename: item,
                  alt: altText,
                  category,
                  data: base64Data,
                  mimeType,
                  size: fileSize,
                  width,
                  height,
                  entityType: entityInfo.type,
                  entityId: entityInfo.id,
                  thumbnail,
                  metadata: {
                    originalPath: relativePath,
                    migrated: new Date().toISOString(),
                  },
                },
              });

              totalImages++;
              console.log(`✅ Migrated: ${relativePath} (${(fileSize / 1024).toFixed(2)} KB) - ID: ${image.id}`);
            }
          } catch (error) {
            console.error(`❌ Failed to migrate ${item}:`, error);
          }
        }
      }
    }
  }

  try {
    // Process all images
    await processDirectory(imagesDir);

    console.log('\n' + '='.repeat(50));
    console.log(`✨ Migration Complete!`);
    console.log(`📊 Total images migrated: ${totalImages}`);
    console.log(`💾 Total size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);
    console.log('='.repeat(50) + '\n');

    // Display summary of images by category
    const summary = await prisma.image.groupBy({
      by: ['category'],
      _count: true,
    });

    console.log('📈 Images by category:');
    summary.forEach(item => {
      console.log(`   ${item.category}: ${item._count} images`);
    });

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run migration
migrateImages().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});