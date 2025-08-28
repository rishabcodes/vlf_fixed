import { NextRequest, NextResponse } from 'next/server';

// Authorize.Net API integration
export async function POST(request: NextRequest) {
  try {
    const { amount, description, clientEmail, cardNumber, expiryDate, cvv, clientName } =
      await request.json();

    // Authorize.Net API credentials
    const apiLoginId = process.env.AUTHORIZE_NET_API_LOGIN_ID;
    const transactionKey = process.env.AUTHORIZE_NET_TRANSACTION_KEY;

    if (!apiLoginId || !transactionKey) {
      return NextResponse.json({ error: 'Payment service not configured' }, { status: 500 });
    }
    const apiUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://api.authorize.net/xml/v1/request.api'
        : 'https://apitest.authorize.net/xml/v1/request.api';

    // Create charge request
    const chargeRequest = {
      createTransactionRequest: {
        merchantAuthentication: {
          name: apiLoginId,
          transactionKey: transactionKey,
        },
        transactionRequest: {
          transactionType: 'authCaptureTransaction',
          amount: amount,
          payment: {
            creditCard: {
              cardNumber: cardNumber,
              expirationDate: expiryDate,
              cardCode: cvv,
            },
          },
          customer: {
            email: clientEmail,
          },
          billTo: {
            firstName: clientName.split(' ')[0],
            lastName: clientName.split(' ')[1] || '',
            email: clientEmail,
          },
          order: {
            description: description,
          },
          transactionSettings: {
            setting: [
              {
                settingName: 'emailCustomer',
                settingValue: 'true',
              },
            ],
          },
        },
      },
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chargeRequest),
    });

    const result = await response.json();

    if (result.messages.resultCode === 'Ok') {
      return NextResponse.json({
        success: true,
        transactionId: result.transactionResponse.transId,
        authCode: result.transactionResponse.authCode,
        message: 'Payment processed successfully',
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.messages.message[0].text,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: 'Payment processing error' }, { status: 500 });
  }
}
