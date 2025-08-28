import { NextRequest, NextResponse } from 'next/server';
import { apiLogger } from '@/lib/safe-logger';
import { resourceCatalog } from '@/resources';
import { ImmigrationProcessGuide } from '@/resources/guides/immigration-process-guide';
// import { renderToStream } from '@react-pdf/renderer'; // TODO: Install package
import React from 'react';

// Map resource IDs to their PDF components
const resourceComponents: Record<string, React.ComponentType> = {
  'immigration-process-guide': ImmigrationProcessGuide,
  // Add more PDF components as they are created
};

export async function GET(_request: NextRequest, { params }: { params: { resourceId: string } }) {
  try {
    const { resourceId } = params;

    // Find the resource metadata
    const resource = resourceCatalog.find(r => r.downloadUrl?.includes(resourceId));

    if (!resource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    // Get the PDF component for this resource
    const PDFComponent = resourceComponents[resourceId];

    if (!PDFComponent) {
      // For resources without PDF components yet, return a placeholder
      return NextResponse.json(
        {
          error: 'Resource PDF not yet available',
          message:
            'This resource is being prepared. Please check back soon or contact us for assistance.',
        },
        { status: 503 }
      );
    }

    // Generate the PDF
    // TODO: Implement when @react-pdf/renderer is installed
    throw new Error(
      'PDF generation not yet implemented - @react-pdf/renderer needs to be installed'
    );

    /* TODO: Uncomment when @react-pdf/renderer is installed
    const stream = await renderToStream(React.createElement(PDFComponent));
    
    // Convert stream to buffer
    const chunks: Uint8Array[] = [];
    const reader = stream.getReader();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    
    const buffer = Buffer.concat(chunks);
    
    // Set appropriate headers for PDF download
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', 'application/pdf');
    responseHeaders.set('Content-Disposition', `attachment; filename="${(resource?.title || 'resource').replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf"`);
    responseHeaders.set('Content-Length', buffer.length.toString());
    
    // Log download for analytics (in production, this would go to a database)
    apiLogger.info(`Resource downloaded: ${resourceId} at ${new Date().toISOString()}`);
    
    return new NextResponse(buffer, {
      status: 200,
      headers: responseHeaders,
    });
    */
  } catch (error) {
    apiLogger.error('Error generating resource PDF:', error);

    return NextResponse.json(
      {
        error: 'Failed to generate resource',
        message: 'An error occurred while generating the PDF. Please try again or contact support.',
      },
      { status: 500 }
    );
  }
}

// Handle preflight requests
export async function OPTIONS(_request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
