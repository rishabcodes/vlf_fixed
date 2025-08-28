# Stripe Webhook Handlers Implementation

## Overview

This document outlines all the Stripe webhook handlers implemented for the Vasquez Law Firm payment system.

## Implemented Webhook Handlers

### 1. Payment Intent Events

- **payment_intent.succeeded**: Updates payment status to SUCCEEDED
- **payment_intent.payment_failed**: Updates payment status to FAILED and sends failure notification

### 2. Charge Events

- **charge.refunded**: Handles both full and partial refunds
- **charge.dispute.created**: Alerts legal team about payment disputes

### 3. Subscription Events (Payment Plans)

- **customer.subscription.created**: Creates/updates payment plan based on subscription
- **customer.subscription.updated**: Updates payment plan status based on subscription status
- **customer.subscription.deleted**: Marks payment plan as CANCELLED
- **customer.subscription.paused**: Marks payment plan as PAUSED
- **customer.subscription.resumed**: Marks payment plan as ACTIVE

### 4. Invoice Events (Payment Plan Installments)

- **invoice.payment_succeeded**:

  - Updates payment plan with successful installment
  - Creates payment record for tracking
  - Calculates next payment date
  - Marks plan as COMPLETED when fully paid
  - Sends success notification

- **invoice.payment_failed**:

  - Tracks failed payment attempts
  - Marks plan as DEFAULTED after 3 failed attempts
  - Creates failed payment record
  - Sends failure notification to client
  - Notifies legal team if plan is defaulted

- **invoice.upcoming**: Sends payment reminder 3 days before due date

### 5. Checkout Events

- **checkout.session.completed**: Updates payment status after successful checkout

## Helper Functions

1. **calculateNextPaymentDate**: Calculates the next payment date based on frequency (monthly/biweekly)
2. **shouldMarkAsDefaulted**: Determines if a payment plan should be marked as defaulted
3. **updatePaymentPlanMetadata**: Safely updates payment plan metadata
4. **formatCurrency**: Formats amounts as USD currency

## Email Notifications

The following email notifications are sent:

- payment-failed
- payment-dispute
- payment-plan-failed
- payment-plan-installment-success
- payment-plan-cancelled
- payment-plan-reminder
- payment-plan-paused
- payment-plan-resumed
- payment-plan-defaulted

## Error Handling

- Validates required environment variables
- Checks for presence of stripe-signature header
- Proper error logging for all webhook events
- Returns appropriate HTTP status codes
- Handles webhook signature verification failures

## Security Considerations

- All webhook events are verified using Stripe's signature verification
- Sensitive data is not logged
- Failed webhooks are logged for monitoring
- Idempotency is maintained through proper database updates

## Testing Recommendations

1. Use Stripe CLI to test webhook events locally
2. Test all payment plan lifecycle events
3. Verify email notifications are sent correctly
4. Test error scenarios (missing signature, invalid events)
5. Monitor webhook logs for any failures

## Required Environment Variables

- `STRIPE_SECRET_KEY`: Stripe API secret key
- `STRIPE_WEBHOOK_SECRET`: Webhook endpoint secret for signature verification
- `LEGAL_TEAM_EMAIL`: Email for legal team notifications (defaults to legal@vasquezlawnc.com)
