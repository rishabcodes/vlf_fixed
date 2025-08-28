import { NextRequest, NextResponse } from 'next/server';

import { paymentLogger } from '@/lib/safe-logger';
// LawPay API integration
export async function POST(request: NextRequest) {
  try {
    const { amount, description, clientEmail, paymentMethod, trustAccount } = await request.json();

    // LawPay API credentials
    const publicKey = process.env.LAWPAY_PUBLIC_KEY;
    const secretKey = process.env.LAWPAY_SECRET_KEY;
    const apiUrl = 'https://api.lawpay.com/v1';

    if (!publicKey || !secretKey) {
      paymentLogger.error('LawPay credentials not configured');
      return NextResponse.json({ error: 'Payment service not configured' }, { status: 500 });
    }

    // Determine account type (trust or operating)
    const accountId = trustAccount
      ? process.env.LAWPAY_TRUST_ACCOUNT_ID
      : process.env.LAWPAY_OPERATING_ACCOUNT_ID;

    if (!accountId) {
      paymentLogger.error('LawPay account ID not configured');
      return NextResponse.json({ error: 'Payment account not configured' }, { status: 500 });
    }

    // Create payment token first
    const tokenResponse = await fetch(`${apiUrl}/tokens`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${publicKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_method: paymentMethod,
        email: clientEmail,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.id) {
      throw new Error('Failed to create payment token');
    }

    // Create charge
    const chargeResponse = await fetch(`${apiUrl}/charges`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(secretKey + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'USD',
        description: description,
        token_id: tokenData.id,
        account_id: accountId,
        reference: `VLF-${Date.now()}`,
        metadata: {
          client_email: clientEmail,
          matter_description: description,
          trust_account: trustAccount,
        },
        email: {
          to: clientEmail,
          subject: 'Payment Receipt - Vasquez Law Firm',
          receipt: true,
        },
      }),
    });

    const chargeData = await chargeResponse.json();

    if (chargeData.id && chargeData.status === 'succeeded') {
      // Log trust accounting if applicable
      if (trustAccount) {
        await logTrustTransaction(chargeData);
      }

      return NextResponse.json({
        success: true,
        chargeId: chargeData.id,
        reference: chargeData.reference,
        amount: chargeData.amount / 100,
        message: 'Payment processed successfully',
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: chargeData.error?.message || 'Payment failed',
        },
        { status: 400 }
      );
    }
  } catch (error) {
    paymentLogger.error('LawPay error:', error);
    return NextResponse.json({ error: 'Payment processing error' }, { status: 500 });
  }
}

// Helper function for trust accounting compliance
async function logTrustTransaction(charge: {
  id: string;
  amount: number;
  metadata: {
    client_email: string;
    matter_description: string;
  };
  status: string;
}) {
  // Log trust transaction for accounting compliance
  const trustLog = {
    date: new Date().toISOString(),
    chargeId: charge.id,
    amount: charge.amount / 100,
    clientEmail: charge.metadata.client_email,
    description: charge.metadata.matter_description,
    type: 'trust_deposit',
    status: charge.status,
  };

  // In production, this would save to a trust accounting database
  paymentLogger.info('Trust transaction logged:', trustLog);
}
