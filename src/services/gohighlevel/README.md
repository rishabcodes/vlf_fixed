# GoHighLevel Service Integration

This service provides a comprehensive integration with GoHighLevel CRM for managing contacts, SMS messaging, campaigns, appointments, and opportunities.

## Configuration

Required environment variables:

```bash
GHL_API_KEY=your_api_key_here
GHL_LOCATION_ID=your_location_id_here
GHL_API_URL=https://rest.gohighlevel.com/v1  # Optional, defaults to v1
GHL_WEBHOOK_SECRET=your_webhook_secret  # For webhook validation

# Campaign IDs (optional)
GHL_APPOINTMENT_REMINDER_CAMPAIGN_ID=campaign_id
GHL_CASE_UPDATE_CAMPAIGN_ID=campaign_id
GHL_WELCOME_CAMPAIGN_ID=campaign_id
GHL_GENERAL_NOTIFICATION_CAMPAIGN_ID=campaign_id
GHL_AUTO_RESPONSE_CAMPAIGN_ID=campaign_id
GHL_PHONE_LEAD_CAMPAIGN_ID=campaign_id

# Practice area campaigns (optional)
GHL_IMMIGRATION_NURTURE_EN=campaign_id
GHL_IMMIGRATION_NURTURE_ES=campaign_id
GHL_PERSONAL_INJURY_NURTURE_EN=campaign_id
GHL_PERSONAL_INJURY_NURTURE_ES=campaign_id
# ... etc for each practice area
```

## Available Methods

### Contact Management

#### `upsertContact(data)`

Create or update a contact based on phone number.

```typescript
const contact = await ghlService.upsertContact({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  tags: ['website-lead'],
  source: 'contact-form',
  customFields: {
    practiceArea: 'immigration',
  },
});
```

#### `findContactByPhone(phone)`

Find a contact by phone number.

```typescript
const contact = await ghlService.findContactByPhone('+1234567890');
```

#### `findContactByEmail(email)`

Find a contact by email address.

```typescript
const contact = await ghlService.findContactByEmail('john@example.com');
```

#### `getOrCreateContact(data)`

Get existing contact or create new one.

```typescript
const contact = await ghlService.getOrCreateContact({
  phone: '+1234567890',
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Doe',
});
```

#### `searchContacts(query, filters)`

Search contacts with optional filters.

```typescript
const results = await ghlService.searchContacts('John', {
  tags: ['client'],
  limit: 10,
});
```

### SMS Messaging

#### `sendSMS(options)`

Send SMS to a specific contact.

```typescript
await ghlService.sendSMS({
  contactId: 'contact_id',
  message: 'Your appointment is confirmed',
  templateId: 'template_id', // optional
});
```

#### `sendSMSByPhone(phone, message, tags)`

Send SMS by phone number (creates contact if needed).

```typescript
await ghlService.sendSMSByPhone('+1234567890', 'Your consultation is scheduled', [
  'appointment-reminder',
]);
```

#### `sendBulkSMS(recipients, campaignId)`

Send bulk SMS via campaign.

```typescript
const results = await ghlService.sendBulkSMS(
  [
    { phone: '+1234567890', firstName: 'John', lastName: 'Doe' },
    { phone: '+0987654321', firstName: 'Jane', lastName: 'Smith' },
  ],
  'campaign_id'
);
```

### Campaign Management

#### `triggerCampaign(options)`

Trigger a campaign for a contact.

```typescript
await ghlService.triggerCampaign({
  contactId: 'contact_id',
  campaignId: 'campaign_id',
});
```

#### `addToCampaignByPhone(phone, campaignId, contactData)`

Add contact to campaign by phone.

```typescript
await ghlService.addToCampaignByPhone('+1234567890', 'campaign_id', {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  tags: ['new-lead'],
});
```

#### `getCampaigns()`

Get all available campaigns.

```typescript
const campaigns = await ghlService.getCampaigns();
```

### Appointment Management

#### `scheduleMeeting(data)`

Schedule a new appointment.

```typescript
const appointment = await ghlService.scheduleMeeting({
  contactId: 'contact_id',
  title: 'Legal Consultation',
  startTime: new Date('2024-01-15T14:00:00'),
  endTime: new Date('2024-01-15T15:00:00'),
  calendarId: 'calendar_id',
  appointmentStatus: 'new',
  notes: 'Immigration consultation',
  meetingLocation: '123 Main St',
});
```

#### `updateAppointment(appointmentId, data)`

Update existing appointment.

```typescript
await ghlService.updateAppointment('appointment_id', {
  appointmentStatus: 'confirmed',
  notes: 'Client confirmed via SMS',
});
```

#### `cancelAppointment(appointmentId, reason)`

Cancel an appointment.

```typescript
await ghlService.cancelAppointment('appointment_id', 'Client requested reschedule');
```

#### `getAvailableSlots(data)`

Get available appointment slots.

```typescript
const slots = await ghlService.getAvailableSlots({
  calendarId: 'calendar_id',
  startDate: new Date('2024-01-15'),
  endDate: new Date('2024-01-20'),
  timezone: 'America/New_York',
});
```

#### `sendAppointmentReminder(appointment)`

Send appointment reminder with automatic campaign selection.

```typescript
await ghlService.sendAppointmentReminder({
  id: 'appointment_id',
  clientPhone: '+1234567890',
  clientName: 'John Doe',
  date: new Date('2024-01-15'),
  time: '2:00 PM',
  attorneyName: 'Attorney Smith',
  type: 'Immigration Consultation',
  location: '123 Main St',
});
```

### Opportunity Management

#### `createOpportunity(data)`

Create a new opportunity in pipeline.

```typescript
const opportunity = await ghlService.createOpportunity({
  contactId: 'contact_id',
  name: 'John Doe - Immigration Case',
  pipelineId: 'pipeline_id',
  stageId: 'stage_id',
  value: 5000,
  customFields: {
    caseType: 'H1B Visa',
  },
});
```

#### `moveOpportunityStage(opportunityId, stageId)`

Move opportunity to different stage.

```typescript
await ghlService.moveOpportunityStage('opportunity_id', 'new_stage_id');
```

#### `getPipelines()`

Get all pipelines.

```typescript
const pipelines = await ghlService.getPipelines();
```

### Task Management

#### `createTask(data)`

Create a task for a contact.

```typescript
await ghlService.createTask({
  contactId: 'contact_id',
  title: 'Follow up on consultation',
  body: 'Call client to discuss next steps',
  dueDate: new Date('2024-01-20'),
  assignedTo: 'user_id',
  completed: false,
});
```

#### `addNote(contactId, note)`

Add a note to contact.

```typescript
await ghlService.addNote('contact_id', 'Client interested in H1B visa process');
```

### Call Management

#### `makeCall(data)`

Trigger call campaign.

```typescript
await ghlService.makeCall({
  contactId: 'contact_id',
  campaignId: 'call_campaign_id',
});
```

### Webhook Handling

#### `handleWebhook(event)`

Process incoming webhooks.

```typescript
await ghlService.handleWebhook({
  type: 'ContactCreate',
  contact: {
    /* contact data */
  },
});
```

#### `validateWebhookSignature(payload, signature)`

Validate webhook signature.

```typescript
const isValid = ghlService.validateWebhookSignature(payloadString, signatureHeader);
```

### Utility Methods

#### `getServiceStatus()`

Check service connection status.

```typescript
const status = await ghlService.getServiceStatus();
// Returns: { status: 'connected', message: '...' }
```

#### `isConfigured()`

Check if service is properly configured.

```typescript
const configured = ghlService.isConfigured();
```

#### `getCalendars()`

Get all calendars.

```typescript
const calendars = await ghlService.getCalendars();
```

#### `getCustomFields()`

Get custom field definitions.

```typescript
const customFields = await ghlService.getCustomFields();
```

#### `getLocationSettings()`

Get location settings.

```typescript
const settings = await ghlService.getLocationSettings();
```

## Webhook Events

The service handles the following webhook events:

- `ContactCreate` - New contact created
- `ContactUpdate` - Contact updated
- `InboundMessage` - Incoming SMS message
- `CampaignCompleted` - Campaign finished

## SMS Keywords

The service automatically handles these SMS keywords:

- **STOP/UNSUBSCRIBE/CANCEL** - Opt out of SMS
- **START/SUBSCRIBE/YES** - Opt in to SMS
- **CONFIRM** - Confirm appointment

## Error Handling

All methods include proper error handling and logging. When the API is not configured, mock responses are returned to allow development without GoHighLevel access.

## Usage Example

```typescript
import { ghlService } from '@/services/gohighlevel';

// Create a new lead
const contact = await ghlService.upsertContact({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  tags: ['website-lead', 'immigration'],
  source: 'contact-form',
});

// Schedule appointment
const appointment = await ghlService.scheduleMeeting({
  contactId: contact.id,
  title: 'Immigration Consultation',
  startTime: new Date('2024-01-15T14:00:00'),
  endTime: new Date('2024-01-15T15:00:00'),
  calendarId: 'calendar_id',
});

// Send confirmation SMS
await ghlService.sendSMS({
  contactId: contact.id,
  message: 'Your consultation is confirmed for Jan 15 at 2:00 PM',
});

// Create opportunity
await ghlService.createOpportunity({
  contactId: contact.id,
  name: 'John Doe - H1B Visa',
  pipelineId: 'pipeline_id',
  stageId: 'new_lead_stage_id',
  value: 5000,
});
```
