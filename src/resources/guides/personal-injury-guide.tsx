import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';

// Register fonts for professional PDF appearance
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/v1/helvetica-regular.ttf' },
    { src: 'https://fonts.gstatic.com/s/helvetica/v1/helvetica-bold.ttf', fontWeight: 'bold' },
  ],
});

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottom: '2 solid #6B1F2E',
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#6B1F2E',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#1F2937',
    fontWeight: 'bold',
    marginBottom: 15,
    backgroundColor: '#F3F4F6',
    padding: 10,
  },
  subsectionTitle: {
    fontSize: 16,
    color: '#374151',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
  },
  paragraph: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 1.6,
    marginBottom: 10,
    textAlign: 'justify',
  },
  list: {
    marginLeft: 20,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 5,
    lineHeight: 1.6,
  },
  checklistBox: {
    border: '1 solid #D1D5DB',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#F9FAFB',
  },
  checklistItem: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 8,
    paddingLeft: 20,
  },
  importantBox: {
    backgroundColor: '#EBF8FF',
    border: '1 solid #3182CE',
    padding: 15,
    marginVertical: 15,
  },
  importantText: {
    fontSize: 11,
    color: '#2C5282',
    lineHeight: 1.5,
  },
  warningBox: {
    backgroundColor: '#FEF3C7',
    border: '1 solid #F59E0B',
    padding: 15,
    marginVertical: 15,
  },
  warningText: {
    fontSize: 11,
    color: '#92400E',
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 10,
    borderTop: '1 solid #E5E7EB',
    paddingTop: 10,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 40,
    fontSize: 10,
    color: '#6B7280',
  },
  timelineBox: {
    backgroundColor: '#F0FDF4',
    border: '1 solid #22C55E',
    padding: 15,
    marginVertical: 10,
  },
});

// NC Personal Injury Claim Guide PDF Document
const PersonalInjuryGuideDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>North Carolina Personal Injury Claim Guide</Text>
        <Text style={styles.subtitle}>Your Complete Guide to Personal Injury Claims in NC</Text>
        <Text style={styles.date}>Published by Vasquez Law Firm, PLLC | Updated: January 2024</Text>
      </View>

      {/* Introduction */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.paragraph}>
          If you've been injured due to someone else's negligence in North Carolina, you
          may be entitled to compensation for your injuries, medical expenses, lost wages, and pain
          and suffering. This guide provides essential information about the personal injury claim
          process in North Carolina, including important deadlines, types of damages, and steps to
          protect your rights.
        </Text>
      </View>

      {/* Immediate Steps After an Accident */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Immediate Steps After an Accident</Text>

        <View style={styles.importantBox}>
          <Text style={[styles.importantText, { fontWeight: 'bold', marginBottom: 5 }]}>
            🚨 CRITICAL FIRST 24-48 HOURS
          </Text>
          <Text style={styles.importantText}>
            The actions you take immediately after an accident can significantly impact your claim.
            Follow these steps to protect your health and legal rights.
          </Text>
        </View>

        <Text style={styles.subsectionTitle}>1. Seek Medical Attention</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Call 911 if you have serious injuries</Text>
          <Text style={styles.listItem}>• Visit an emergency room or urgent care facility</Text>
          <Text style={styles.listItem}>• Follow all medical advice and treatment plans</Text>
          <Text style={styles.listItem}>• Keep all medical records and receipts</Text>
          <Text style={styles.listItem}>• Document your injuries with photographs</Text>
        </View>

        <Text style={styles.subsectionTitle}>2. Report the Accident</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Car Accidents: Call police and get a report number</Text>
          <Text style={styles.listItem}>
            • Slip and Fall: Report to property owner/manager immediately
          </Text>
          <Text style={styles.listItem}>• Workplace Injury: Notify your supervisor in writing</Text>
          <Text style={styles.listItem}>• Dog Bite: Report to animal control and police</Text>
        </View>

        <Text style={styles.subsectionTitle}>3. Gather Evidence</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            • Take photos of the accident scene from multiple angles
          </Text>
          <Text style={styles.listItem}>
            • Photograph your injuries, property damage, and hazards
          </Text>
          <Text style={styles.listItem}>• Get contact information from all witnesses</Text>
          <Text style={styles.listItem}>• Keep damaged property (clothes, equipment, etc.)</Text>
          <Text style={styles.listItem}>• Save all receipts related to the accident</Text>
        </View>

        <Text style={styles.subsectionTitle}>4. What NOT to Do</Text>
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>• Do NOT admit fault or apologize</Text>
          <Text style={styles.warningText}>
            • Do NOT give recorded statements to insurance companies
          </Text>
          <Text style={styles.warningText}>• Do NOT sign any documents without legal review</Text>
          <Text style={styles.warningText}>• Do NOT post about the accident on social media</Text>
          <Text style={styles.warningText}>• Do NOT accept the first settlement offer</Text>
        </View>
      </View>

      <Text style={styles.pageNumber}>Page 1 of 3</Text>
    </Page>

    {/* Page 2 */}
    <Page size="A4" style={styles.page}>
      {/* Evidence Collection Checklist */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Evidence Collection Checklist</Text>

        <View style={styles.checklistBox}>
          <Text style={styles.subsectionTitle}>Accident Scene Evidence</Text>
          <Text style={styles.checklistItem}>
            ☐ Photos of accident location from multiple angles
          </Text>
          <Text style={styles.checklistItem}>☐ Weather and lighting conditions</Text>
          <Text style={styles.checklistItem}>☐ Traffic signs, signals, or warnings</Text>
          <Text style={styles.checklistItem}>☐ Skid marks, debris, or other physical evidence</Text>
          <Text style={styles.checklistItem}>
            ☐ Security camera locations (request footage ASAP)
          </Text>
        </View>

        <View style={styles.checklistBox}>
          <Text style={styles.subsectionTitle}>Medical Documentation</Text>
          <Text style={styles.checklistItem}>☐ Emergency room records</Text>
          <Text style={styles.checklistItem}>☐ Doctor's notes and treatment plans</Text>
          <Text style={styles.checklistItem}>
            ☐ Diagnostic test results (X-rays, MRIs, CT scans)
          </Text>
          <Text style={styles.checklistItem}>☐ Prescription receipts</Text>
          <Text style={styles.checklistItem}>☐ Physical therapy records</Text>
          <Text style={styles.checklistItem}>☐ Medical bills and insurance statements</Text>
        </View>

        <View style={styles.checklistBox}>
          <Text style={styles.subsectionTitle}>Financial Losses</Text>
          <Text style={styles.checklistItem}>☐ Lost wage statements from employer</Text>
          <Text style={styles.checklistItem}>☐ Pay stubs showing income before injury</Text>
          <Text style={styles.checklistItem}>☐ Self-employment income records</Text>
          <Text style={styles.checklistItem}>☐ Transportation costs to medical appointments</Text>
          <Text style={styles.checklistItem}>☐ Home modification or care expenses</Text>
          <Text style={styles.checklistItem}>☐ Out-of-pocket medical expenses</Text>
        </View>

        <View style={styles.checklistBox}>
          <Text style={styles.subsectionTitle}>Witness Information</Text>
          <Text style={styles.checklistItem}>☐ Full names and contact information</Text>
          <Text style={styles.checklistItem}>☐ Written or recorded statements</Text>
          <Text style={styles.checklistItem}>☐ Relationship to parties involved</Text>
          <Text style={styles.checklistItem}>☐ Their location during the accident</Text>
        </View>
      </View>

      {/* North Carolina Specific Laws */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>North Carolina Personal Injury Laws</Text>

        <Text style={styles.subsectionTitle}>Statute of Limitations</Text>
        <View style={styles.timelineBox}>
          <Text style={styles.listItem}>• Personal Injury: 3 years from date of injury</Text>
          <Text style={styles.listItem}>• Wrongful Death: 2 years from date of death</Text>
          <Text style={styles.listItem}>• Property Damage: 3 years from date of damage</Text>
          <Text style={styles.listItem}>• Medical Malpractice: 3 years (with some exceptions)</Text>
        </View>

        <Text style={styles.subsectionTitle}>Contributory Negligence Rule</Text>
        <View style={styles.warningBox}>
          <Text style={[styles.warningText, { fontWeight: 'bold', marginBottom: 5 }]}>
            ⚠️ CRITICAL: North Carolina Contributory Negligence
          </Text>
          <Text style={styles.warningText}>
            North Carolina is one of only 5 states that follows the harsh contributory negligence
            rule. If you are found to be even 1% at fault for your accident, you may be barred from
            recovering ANY compensation. This makes it crucial to work with an experienced attorney
            who can protect your rights and counter any allegations of fault.
          </Text>
        </View>

        <Text style={styles.subsectionTitle}>Damage Caps</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            • Medical Malpractice: $500,000 cap on non-economic damages
          </Text>
          <Text style={styles.listItem}>
            • Punitive Damages: Greater of 3x compensatory damages or $250,000
          </Text>
          <Text style={styles.listItem}>
            • No caps on economic damages in most personal injury cases
          </Text>
        </View>
      </View>

      <Text style={styles.pageNumber}>Page 2 of 3</Text>
    </Page>

    {/* Page 3 */}
    <Page size="A4" style={styles.page}>
      {/* Types of Compensation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Types of Compensation Available</Text>

        <Text style={styles.subsectionTitle}>Economic Damages</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Medical expenses (past and future)</Text>
          <Text style={styles.listItem}>• Lost wages and loss of earning capacity</Text>
          <Text style={styles.listItem}>• Property damage</Text>
          <Text style={styles.listItem}>• Out-of-pocket expenses</Text>
          <Text style={styles.listItem}>• Home modification costs</Text>
          <Text style={styles.listItem}>• Vocational rehabilitation</Text>
        </View>

        <Text style={styles.subsectionTitle}>Non-Economic Damages</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Pain and suffering</Text>
          <Text style={styles.listItem}>• Emotional distress</Text>
          <Text style={styles.listItem}>• Loss of enjoyment of life</Text>
          <Text style={styles.listItem}>• Disfigurement or scarring</Text>
          <Text style={styles.listItem}>• Loss of consortium (for spouses)</Text>
        </View>

        <Text style={styles.subsectionTitle}>Punitive Damages</Text>
        <Text style={styles.paragraph}>
          Available only in cases involving willful or wanton conduct, fraud, or malice. These are
          designed to punish the defendant and deter similar behavior.
        </Text>
      </View>

      {/* Insurance Company Tactics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Common Insurance Company Tactics</Text>
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>• Offering quick, lowball settlements</Text>
          <Text style={styles.warningText}>• Requesting unnecessary medical authorizations</Text>
          <Text style={styles.warningText}>
            • Claiming pre-existing conditions caused your injuries
          </Text>
          <Text style={styles.warningText}>• Surveillance of your activities and social media</Text>
          <Text style={styles.warningText}>• Delaying claim processing to pressure settlement</Text>
          <Text style={styles.warningText}>• Misrepresenting policy coverage or NC law</Text>
        </View>
      </View>

      {/* When to Contact an Attorney */}
      <View style={[styles.section, { backgroundColor: '#F3F4F6', padding: 20, marginTop: 30 }]}>
        <Text style={[styles.sectionTitle, { backgroundColor: 'transparent', padding: 0 }]}>
          When to Contact a Personal Injury Attorney
        </Text>
        <Text style={styles.paragraph}>You should contact an attorney immediately if:</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            • You have serious injuries requiring ongoing treatment
          </Text>
          <Text style={styles.listItem}>• The insurance company denies your claim</Text>
          <Text style={styles.listItem}>• Multiple parties may be liable</Text>
          <Text style={styles.listItem}>
            • The accident involved a commercial vehicle or government entity
          </Text>
          <Text style={styles.listItem}>• You're being blamed for causing the accident</Text>
          <Text style={styles.listItem}>• The insurance offer seems too low</Text>
        </View>

        <Text style={[styles.paragraph, { marginTop: 15, fontWeight: 'bold' }]}>
          Free Consultation Available
        </Text>
        <Text style={styles.paragraph}>
          The Vasquez Law Firm offers free consultations for all personal injury cases. We work on a
          contingency fee basis, meaning you pay nothing unless we win your case.
        </Text>
        <Text style={styles.paragraph}>
          Call: 1-866-302-3427{'\n'}
          Email: info@vasquezlawnc.com{'\n'}
          Website: www.vasquezlawnc.com
        </Text>
      </View>

      {/* Disclaimer */}
      <View style={[styles.warningBox, { position: 'absolute', bottom: 80, left: 40, right: 40 }]}>
        <Text style={[styles.warningText, { fontSize: 9 }]}>
          DISCLAIMER: This guide is for informational purposes only and does not constitute legal
          advice. Each case is unique, and outcomes depend on specific facts and circumstances. Past
          results do not guarantee future outcomes. Please consult with a qualified personal injury
          attorney for advice specific to your situation.
        </Text>
      </View>

      <Text style={styles.pageNumber}>Page 3 of 3</Text>
    </Page>
  </Document>
);

// Component to render the download link
export const PersonalInjuryGuide = () => {
  return (
    <PDFDownloadLink
      document={<PersonalInjuryGuideDocument />}
      fileName="NC-Personal-Injury-Claim-Guide-Vasquez-Law-Firm.pdf"
      className="inline-flex items-center gap-2 bg-[#6B1F2E] hover:bg-[#8B2635] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Preparing download...' : 'Download Personal Injury Guide (PDF)'
      }
    </PDFDownloadLink>
  );
};

export default PersonalInjuryGuide;
