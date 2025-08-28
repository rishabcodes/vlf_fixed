import type { Metadata } from 'next';
import { PageLayout } from '@/components/Layout/PageLayout';
import { Button } from '@/components/design-system/Button';
import { Heading, Text } from '@/components/design-system/Typography';

export const metadata: Metadata = {
  title: 'Immigration Lawyer Charlotte NC | Vasquez Law Firm',
  description:
    'Experienced immigration lawyers in Charlotte NC. Family visas, green cards, deportation defense. Call 1-844-YO-PELEO for a free consultation. Se habla español.',
  keywords:
    'immigration lawyer Charlotte NC, immigration attorney near me, visa lawyer Charlotte, green card attorney, deportation defense lawyer, citizenship attorney Charlotte, DACA lawyer NC, asylum attorney, family immigration lawyer, work visa attorney Charlotte',
};

export default function ImmigrationPage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-secondary/90 via-black/80 to-black py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Heading level={1}

                className="mb-6 text-white">
                Immigration Law Services
              </Heading>
              <Text size="xl" className="mx-auto mb-8 max-w-3xl">
                Need a trusted immigration lawyer in North Carolina? Our experienced attorneys help
                families navigate the complex immigration system with confidence.
              </Text>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button href="/contact" size="lg">
                  Free Consultation
                </Button>
                <Button href="tel:1-844-965-3536" variant="outline" size="lg">
                  Call 1-844-YO-PELEO
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300">
                At Vasquez Law Firm, we understand that immigration law can be complex and
                overwhelming. Our experienced team of immigration attorneys is dedicated to helping
                individuals and families navigate the U.S. immigration system with confidence and
                peace of mind.
              </p>

              <Heading level={2}

                className="mt-12 text-white">
                Our Immigration Services
              </Heading>
              <ul className="mt-6 space-y-2 text-gray-300">
                <li>Family-Based Immigration</li>
                <li>Employment-Based Visas</li>
                <li>Green Cards and Permanent Residency</li>
                <li>Citizenship and Naturalization</li>
                <li>Deportation Defense</li>
                <li>DACA Applications and Renewals</li>
                <li>Asylum and Refugee Protection</li>
                <li>U-Visas and T-Visas</li>
              </ul>

              <Heading level={2}

                className="mt-12 text-white">
                Why Choose Vasquez Law Firm?
              </Heading>
              <p className="text-gray-300">
                With over 30 years of combined experience, our immigration attorneys have
                successfully represented thousands of clients throughout North Carolina and Florida.
                We provide personalized attention to each case and offer services in both English
                and Spanish.
              </p>

              <Heading level={3}

                className="mt-8 text-white">
                Our Approach
              </Heading>
              <p className="text-gray-300">
                We believe in building strong relationships with our clients based on trust,
                communication, and results. Our team stays current with the ever-changing
                immigration laws to provide you with the most effective legal strategies.
              </p>

              <Heading level={3}

                className="mt-8 text-white">
                Free Consultation
              </Heading>
              <p className="text-gray-300">
                We offer free initial consultations to discuss your immigration needs and explore
                your options. Our attorneys will evaluate your case and provide honest,
                straightforward advice about the best path forward.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <Heading level={2}

                className="mb-4 text-black">
              Ready to Start Your Immigration Journey?
            </Heading>
            <Text size="lg" color="inverse" className="mb-8">
              Contact us today to schedule your free consultation and take the first step toward
              achieving your immigration goals.
            </Text>
            <Button href="/contact" variant="secondary" size="lg">
              Schedule Free Consultation
            </Button>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
