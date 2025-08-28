import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma-safe';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const filter = searchParams.get('filter');

    // Verify case belongs to user
    const caseData = await prisma.case.findFirst({
      where: {
        id: params.id,
        clientId: session.user.id,
      },
    });

    if (!caseData) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    const where: any = { caseId: params.id };

    if (filter === 'pending_signature') {
      // Filter by metadata for signature required documents
      where.metadata = {
        path: ['signatureRequired'],
        equals: true,
      };
    } else if (filter === 'recent') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      where.createdAt = { gte: sevenDaysAgo };
    }

    const documents = await prisma.document.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Transform documents
    const transformedDocuments = documents.map(doc => {
      const metadata = (doc.metadata as any) || {};
      return {
        id: doc.id,
        name: doc.name,
        type: doc.type,
        size: doc.size,
        uploadedAt: doc.createdAt,
        uploadedBy: {
          name: metadata.uploadedByName || 'Unknown',
          role: metadata.uploadedByRole || 'client',
        },
        status: metadata.status || 'uploaded',
        category: metadata.category || doc.type,
        description: metadata.description || '',
        downloadUrl: `/api/portal/documents/${doc.id}/download`,
        signatureRequired: metadata.signatureRequired || false,
        signedAt: metadata.signedAt || null,
      };
    });

    return NextResponse.json({ success: true, documents: transformedDocuments });
  } catch (error) {
    logger.error('Failed to fetch documents:', error);
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}
