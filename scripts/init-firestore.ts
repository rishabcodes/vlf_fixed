#!/usr/bin/env node

import { Firestore } from '@google-cloud/firestore';
import dotenv from 'dotenv';
import path from 'path';
import chalk from 'chalk';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function initializeFirestore() {
  console.log(chalk.bold.blue('\n🔥 Initializing Firestore for CrewAI Agent Memory\n'));
  console.log('='.repeat(50));

  try {
    const firestore = new Firestore({
      projectId: process.env.GOOGLE_CLOUD_PROJECT,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });

    console.log(chalk.yellow('Creating initial collections...'));

    // Create collections for agent memory
    const collections = [
      {
        name: 'agent_memory',
        doc: 'init',
        data: {
          initialized: true,
          timestamp: new Date().toISOString(),
          purpose: 'Stores agent learning and memory',
        },
      },
      {
        name: 'agent_conversations',
        doc: 'init',
        data: {
          initialized: true,
          timestamp: new Date().toISOString(),
          purpose: 'Stores conversation history for learning',
        },
      },
      {
        name: 'agent_tasks',
        doc: 'init',
        data: {
          initialized: true,
          timestamp: new Date().toISOString(),
          purpose: 'Tracks agent tasks and performance',
        },
      },
    ];

    for (const collection of collections) {
      await firestore.collection(collection.name).doc(collection.doc).set(collection.data);
      console.log(chalk.green(`✅ Created collection: ${collection.name}`));
    }

    // Verify collections
    console.log(chalk.yellow('\nVerifying collections...'));
    const allCollections = await firestore.listCollections();
    console.log(
      chalk.green(`\n✅ Firestore initialized with ${allCollections.length} collections`)
    );

    allCollections.forEach(col => {
      console.log(`   - ${col.id}`);
    });

    console.log(chalk.bold.green('\n✨ Firestore is ready for CrewAI agents!'));
    console.log(chalk.cyan('\nYour agents now have:'));
    console.log('- Persistent memory across sessions');
    console.log('- Learning from past interactions');
    console.log('- Task history and performance tracking');
  } catch (error: any) {
    if (error.message.includes('NOT_FOUND')) {
      console.log(chalk.red('\n❌ Firestore is not initialized in Google Cloud Console'));
      console.log(chalk.yellow('\nTo fix this:'));
      console.log('1. Go to https://console.cloud.google.com');
      console.log('2. Select your project: vlf-site');
      console.log('3. Navigate to Firestore');
      console.log('4. Click "Create Database"');
      console.log('5. Choose "Native mode"');
      console.log('6. Select a location (us-central1 recommended)');
      console.log('7. Click "Create"');
      console.log('8. Run this script again');
    } else {
      console.log(chalk.red('\n❌ Error:'), error.message);
    }
  }
}

// Run initialization
initializeFirestore().catch(error => {
  console.error(chalk.red('\n❌ Failed:'), error);
  process.exit(1);
});
