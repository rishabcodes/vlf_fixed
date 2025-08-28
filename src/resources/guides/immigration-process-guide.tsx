// TODO: Uncomment when @react-pdf/renderer is installed
import React from 'react';

const ImmigrationProcessGuide: React.FC = () => {
  return <div>Immigration Process Guide - PDF generation coming soon</div>;
};

export { ImmigrationProcessGuide };

/* Original implementation - uncomment when @react-pdf/renderer is installed
import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image, Font } from '@react-pdf/renderer';

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
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    borderBottom: '2 solid #c9974d',
    paddingBottom: 10,
  },
  logo: {
    width: 120,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c9974d',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c9974d',
    marginBottom: 10,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 10,
    textAlign: 'justify',
  },
  list: {
    marginLeft: 20,
    marginBottom: 10,
  },
  listItem: {
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: '1 solid #ccc',
    paddingTop: 10,
    fontSize: 9,
    color: '#666',
  },
  footerText: {
    textAlign: 'center',
  },
  importantBox: {
    backgroundColor: '#fef5e7',
    padding: 10,
    marginVertical: 10,
    borderLeft: '3 solid #c9974d',
  },
  table: {
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #eee',
    paddingVertical: 5,
  },
  tableHeader: {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
  disclaimer: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
});

// Main PDF Document Component
export const ImmigrationProcessGuide: React.FC = () => (
  <Document>
    {/* Page 1 - Cover and Overview * /}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Comprehensive Immigration Process Guide</Text>
        <Text style={styles.subtitle}>Your Step-by-Step Guide to U.S. Immigration</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Welcome</Text>
        <Text style={styles.paragraph}>
          This comprehensive guide has been prepared by Vasquez Law Firm, PLLC to help you understand 
          the U.S. immigration process. While this guide provides general information, each case is unique, 
          and we strongly recommend consulting with an experienced immigration attorney for personalized advice.
        </Text>
      </View>

      <View style={styles.importantBox}>
        <Text style={styles.subsectionTitle}>Important Notice</Text>
        <Text>
          Immigration law is complex and constantly changing. This guide reflects the law as of {new Date().toLocaleDateString()} 
          and may not reflect recent changes. Always verify current requirements with USCIS or consult an attorney.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Table of Contents</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>1. Overview of U.S. Immigration System</Text>
          <Text style={styles.listItem}>2. Family-Based Immigration</Text>
          <Text style={styles.listItem}>3. Employment-Based Immigration</Text>
          <Text style={styles.listItem}>4. The Green Card Process</Text>
          <Text style={styles.listItem}>5. Citizenship and Naturalization</Text>
          <Text style={styles.listItem}>6. Common Challenges and Solutions</Text>
          <Text style={styles.listItem}>7. Resources and Next Steps</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Vasquez Law Firm, PLLC | 1-844-YO-PELEO | www.vasquezlawfirm.com
        </Text>
      </View>
    </Page>

    {/* Page 2 - U.S. Immigration System Overview * /}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>1. Overview of U.S. Immigration System</Text>
      
      <Text style={styles.subsectionTitle}>Types of Immigration Status</Text>
      <Text style={styles.paragraph}>
        The U.S. immigration system recognizes several types of status:
      </Text>
      
      <View style={styles.list}>
        <Text style={styles.listItem}>• Nonimmigrant (Temporary) Visas: For tourism, business, study, or temporary work</Text>
        <Text style={styles.listItem}>• Immigrant Visas: For permanent residence (Green Card)</Text>
        <Text style={styles.listItem}>• Refugee/Asylee Status: For those fleeing persecution</Text>
        <Text style={styles.listItem}>• U.S. Citizenship: Through birth or naturalization</Text>
      </View>

      <Text style={styles.subsectionTitle}>Key Government Agencies</Text>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Agency</Text>
          <Text style={styles.tableCell}>Role</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>USCIS</Text>
          <Text style={styles.tableCell}>Processes immigration applications and petitions</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>DOS</Text>
          <Text style={styles.tableCell}>Issues visas at U.S. embassies and consulates</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>CBP</Text>
          <Text style={styles.tableCell}>Controls entry at U.S. borders</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>ICE</Text>
          <Text style={styles.tableCell}>Enforces immigration laws within the U.S.</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Page 2 | Immigration Process Guide</Text>
      </View>
    </Page>

    {/* Page 3 - Family-Based Immigration * /}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>2. Family-Based Immigration</Text>
      
      <Text style={styles.subsectionTitle}>Who Can Sponsor Family Members?</Text>
      <Text style={styles.paragraph}>
        U.S. citizens and lawful permanent residents (Green Card holders) can petition for certain family members:
      </Text>

      <Text style={styles.subsectionTitle}>U.S. Citizens Can Petition For:</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• Spouse (no waiting period)</Text>
        <Text style={styles.listItem}>• Unmarried children under 21 (no waiting period)</Text>
        <Text style={styles.listItem}>• Unmarried children over 21 (F1 category)</Text>
        <Text style={styles.listItem}>• Married children of any age (F3 category)</Text>
        <Text style={styles.listItem}>• Parents (if petitioner is over 21)</Text>
        <Text style={styles.listItem}>• Siblings (if petitioner is over 21) (F4 category)</Text>
      </View>

      <Text style={styles.subsectionTitle}>Green Card Holders Can Petition For:</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• Spouse (F2A category)</Text>
        <Text style={styles.listItem}>• Unmarried children under 21 (F2A category)</Text>
        <Text style={styles.listItem}>• Unmarried children over 21 (F2B category)</Text>
      </View>

      <View style={styles.importantBox}>
        <Text style={styles.subsectionTitle}>Processing Times</Text>
        <Text>
          Immediate relatives of U.S. citizens have no annual limits and typically process faster. 
          Other categories have annual limits and may wait years depending on the category and country of origin.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Page 3 | Immigration Process Guide</Text>
      </View>
    </Page>

    {/* Page 4 - The Green Card Process * /}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>4. The Green Card Process</Text>
      
      <Text style={styles.subsectionTitle}>Step-by-Step Process</Text>
      
      <Text style={styles.subsectionTitle}>Step 1: File the Petition</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• Form I-130 for family-based cases</Text>
        <Text style={styles.listItem}>• Form I-140 for employment-based cases</Text>
        <Text style={styles.listItem}>• Include all required supporting documents</Text>
        <Text style={styles.listItem}>• Pay the filing fee</Text>
      </View>

      <Text style={styles.subsectionTitle}>Step 2: Wait for Approval</Text>
      <Text style={styles.paragraph}>
        Processing times vary by service center and case type. Check current times at uscis.gov.
      </Text>

      <Text style={styles.subsectionTitle}>Step 3: Visa Availability</Text>
      <Text style={styles.paragraph}>
        For categories with annual limits, wait for your priority date to become current by checking 
        the monthly Visa Bulletin.
      </Text>

      <Text style={styles.subsectionTitle}>Step 4: Apply for Green Card</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• If in the U.S.: File Form I-485 (Adjustment of Status)</Text>
        <Text style={styles.listItem}>• If abroad: Complete consular processing at U.S. embassy</Text>
      </View>

      <Text style={styles.subsectionTitle}>Step 5: Biometrics and Interview</Text>
      <Text style={styles.paragraph}>
        Attend your biometrics appointment and interview when scheduled.
      </Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Page 4 | Immigration Process Guide</Text>
      </View>
    </Page>

    {/* Page 5 - Resources and Contact * /}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>7. Resources and Next Steps</Text>
      
      <Text style={styles.subsectionTitle}>Official Government Resources</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• USCIS Website: www.uscis.gov</Text>
        <Text style={styles.listItem}>• State Department Visa Bulletin: travel.state.gov</Text>
        <Text style={styles.listItem}>• USCIS Contact Center: 1-800-375-5283</Text>
      </View>

      <Text style={styles.subsectionTitle}>How Vasquez Law Firm Can Help</Text>
      <Text style={styles.paragraph}>
        Our experienced immigration attorneys can guide you through every step of your immigration journey:
      </Text>
      
      <View style={styles.list}>
        <Text style={styles.listItem}>• Case evaluation and strategy development</Text>
        <Text style={styles.listItem}>• Document preparation and filing</Text>
        <Text style={styles.listItem}>• Interview preparation</Text>
        <Text style={styles.listItem}>• Response to RFEs (Requests for Evidence)</Text>
        <Text style={styles.listItem}>• Appeals and motions</Text>
      </View>

      <View style={styles.importantBox}>
        <Text style={styles.subsectionTitle}>Schedule Your Consultation</Text>
        <Text>Call us at 1-844-YO-PELEO (1-844-967-3536)</Text>
        <Text>Visit: www.vasquezlawfirm.com</Text>
        <Text>Email: info@vasquezlawfirm.com</Text>
      </View>

      <Text style={styles.disclaimer}>
        This guide is for informational purposes only and does not constitute legal advice. 
        Each case is unique, and you should consult with an attorney for advice specific to your situation.
      </Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © {new Date().getFullYear()} Vasquez Law Firm, PLLC | All Rights Reserved
        </Text>
      </View>
    </Page>
  </Document>
);

// Component to render the PDF download link
export const ImmigrationGuideDownloadLink: React.FC = () => {
  return (
    <PDFDownloadLink
      document={<ImmigrationProcessGuide />}
      fileName="vasquez-law-firm-immigration-guide.pdf"
      className="inline-flex items-center px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors"
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Preparing download...' : 'Download Immigration Guide (PDF)'
      }
    </PDFDownloadLink>
  );
};

export default ImmigrationProcessGuide;
*/
