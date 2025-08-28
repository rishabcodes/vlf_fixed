import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Check if practice-areas directory exists
    const practiceAreasPath = path.join(process.cwd(), 'src/app/practice-areas');
    const exists = fs.existsSync(practiceAreasPath);

    let files: string[] = [];
    if (exists) {
      files = fs.readdirSync(practiceAreasPath);
    }

    // Get current working directory
    const cwd = process.cwd();

    // Check if we're in production
    const isProduction = process.env.NODE_ENV === 'production';

    // Get all app routes
    const appPath = path.join(process.cwd(), isProduction ? '.next/server/app' : 'src/app');
    let routes: string[] = [];

    try {
      const getAllRoutes = (dir: string, base = ''): string[] => {
        const items = fs.readdirSync(dir);
        const routes: string[] = [];

        for (const item of items) {
          const itemPath = path.join(dir, item);
          const stat = fs.statSync(itemPath);

          if (stat.isDirectory() && !item.startsWith('_') && !item.startsWith('.')) {
            const pagePath = path.join(itemPath, 'page.tsx');
            const pageJsPath = path.join(itemPath, 'page.js');

            if (fs.existsSync(pagePath) || fs.existsSync(pageJsPath)) {
              routes.push(path.join(base, item));
            }

            // Recurse
            routes.push(...getAllRoutes(itemPath, path.join(base, item)));
          }
        }

        return routes;
      };

      if (fs.existsSync(appPath)) {
        routes = getAllRoutes(appPath);
      }
    } catch (error) {
      // Ignore errors in route discovery
    }

    return NextResponse.json({
      diagnostic: {
        practiceAreasExists: exists,
        practiceAreasFiles: files,
        cwd: cwd,
        nodeEnv: process.env.NODE_ENV,
        isProduction,
        appPath,
        discoveredRoutes: routes,
        nextVersion: process.env.NEXT_RUNTIME_VERSION || 'unknown',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
