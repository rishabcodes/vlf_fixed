import { Metadata } from 'next';
import Link from 'next/link';
import { 
  FileText, 
  Download, 
  BookOpen, 
  Globe, 
  Shield, 
  Scale, 
  Users, 
  Heart,
  Briefcase,
  Home,
  AlertCircle,
  Phone
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Legal Resources | Vasquez Law Firm',
  description:
    'Access helpful legal resources, guides, forms, and information about immigration, personal injury, workers compensation, criminal defense, and family law in North Carolina and Florida.',
  keywords:
    'legal resources, immigration forms, legal guides, North Carolina law, Florida law, legal help, free consultation',
  openGraph: {
    title: 'Legal Resources | Vasquez Law Firm',
    description: 'Access helpful legal resources and guides for your legal needs.',
    images: ['/images/resources-hero.jpg'],
  },
};

export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: 'Immigration Resources',
      icon: Globe,
      description: 'Comprehensive guides, forms, and resources for all immigration matters',
      color: 'bg-blue-50 border-blue-500',
      iconColor: 'text-blue-600',
      resources: [
        {
          title: 'Immigration Guides & Forms',
          description: 'Step-by-step guides for green cards, citizenship, visas, and more',
          link: '/resources/immigration-guides',
          isPopular: true,
        },
        {
          title: 'Know Your Rights Cards',
          description: 'Downloadable cards with your rights during ICE encounters',
          link: '/resources/know-your-rights',
        },
        {
          title: 'USCIS Forms Directory',
          description: 'Links to all official USCIS forms and instructions',
          link: '/resources/immigration-guides#forms',
        },
        {
          title: 'Emergency Contact Information',
          description: '24/7 emergency hotline for immigration raids and detention',
          link: '/contact',
        },
      ],
    },
    {
      title: 'Personal Injury Resources',
      icon: Heart,
      description: 'Information and tools for accident victims seeking compensation',
      color: 'bg-red-50 border-red-500',
      iconColor: 'text-red-600',
      resources: [
        {
          title: 'After an Accident Checklist',
          description: 'Step-by-step guide on what to do after an accident',
          link: '/resources/accident-checklist',
          isPopular: true,
        },
        {
          title: 'Insurance Claim Guide',
          description: 'How to deal with insurance companies effectively',
          link: '/resources/insurance-guide',
        },
        {
          title: 'Medical Treatment Resources',
          description: 'Finding doctors who work with accident victims',
          link: '/resources/medical-providers',
        },
        {
          title: 'Case Value Calculator',
          description: 'Estimate the potential value of your injury claim',
          link: '/resources/case-calculator',
        },
      ],
    },
    {
      title: 'Criminal Defense Resources',
      icon: Shield,
      description: 'Essential information for those facing criminal charges',
      color: 'bg-purple-50 border-purple-500',
      iconColor: 'text-purple-600',
      resources: [
        {
          title: 'Rights During Arrest',
          description: 'Know your constitutional rights when arrested',
          link: '/resources/arrest-rights',
          isPopular: true,
        },
        {
          title: 'Court Process Guide',
          description: 'Understanding the criminal court process in NC and FL',
          link: '/resources/court-process',
        },
        {
          title: 'Expungement Information',
          description: 'Learn if you qualify to clear your criminal record',
          link: '/resources/expungement',
        },
        {
          title: 'DUI/DWI Resources',
          description: 'Information about drunk driving charges and defenses',
          link: '/resources/dui-resources',
        },
      ],
    },
    {
      title: 'Family Law Resources',
      icon: Users,
      description: 'Guides and forms for divorce, custody, and family matters',
      color: 'bg-green-50 border-green-500',
      iconColor: 'text-green-600',
      resources: [
        {
          title: 'Divorce Process Guide',
          description: 'Understanding divorce procedures in NC and FL',
          link: '/resources/divorce-guide',
        },
        {
          title: 'Child Custody Information',
          description: 'Types of custody and factors courts consider',
          link: '/resources/custody-guide',
        },
        {
          title: 'Child Support Calculator',
          description: 'Estimate child support obligations',
          link: '/resources/child-support',
        },
        {
          title: 'Domestic Violence Resources',
          description: 'Help and protection for domestic violence victims',
          link: '/resources/domestic-violence',
        },
      ],
    },
    {
      title: 'Workers\' Compensation Resources',
      icon: Briefcase,
      description: 'Information for injured workers seeking benefits',
      color: 'bg-orange-50 border-orange-500',
      iconColor: 'text-orange-600',
      resources: [
        {
          title: 'Workers\' Comp Guide',
          description: 'How to file and win your workers\' compensation claim',
          link: '/resources/workers-comp-guide',
        },
        {
          title: 'Injury Reporting Forms',
          description: 'Proper forms for reporting workplace injuries',
          link: '/resources/injury-forms',
        },
        {
          title: 'Benefits Calculator',
          description: 'Calculate your workers\' compensation benefits',
          link: '/resources/benefits-calculator',
        },
        {
          title: 'Return to Work Guide',
          description: 'Your rights when returning to work after injury',
          link: '/resources/return-to-work',
        },
      ],
    },
    {
      title: 'Legal Forms & Documents',
      icon: FileText,
      description: 'Commonly needed legal forms and document templates',
      color: 'bg-gray-50 border-gray-500',
      iconColor: 'text-gray-600',
      resources: [
        {
          title: 'Legal Forms Library',
          description: 'Downloadable legal forms for various needs',
          link: '/resources/legal-forms',
          isPopular: true,
        },
        {
          title: 'Power of Attorney Forms',
          description: 'Forms for granting legal authority to others',
          link: '/resources/power-of-attorney',
        },
        {
          title: 'Contract Templates',
          description: 'Basic contract templates for common situations',
          link: '/resources/contracts',
        },
        {
          title: 'Affidavit Templates',
          description: 'Templates for sworn statements and affidavits',
          link: '/resources/affidavits',
        },
      ],
    },
  ];

  const quickLinks = [
    {
      title: 'Free Consultation',
      description: 'Schedule your free case evaluation',
      icon: Phone,
      link: '/free-consultation',
      bgColor: 'bg-[#6B1F2E]',
    },
    {
      title: 'Emergency Hotline',
      description: '24/7 emergency legal help',
      icon: AlertCircle,
      link: 'tel:1-844-967-3536',
      bgColor: 'bg-red-600',
    },
    {
      title: 'Office Locations',
      description: 'Find an office near you',
      icon: Home,
      link: '/locations',
      bgColor: 'bg-blue-600',
    },
    {
      title: 'Client Portal',
      description: 'Access your case information',
      icon: Scale,
      link: '/client-portal',
      bgColor: 'bg-green-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Legal Resources Center
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Free guides, forms, and resources to help you navigate your legal journey. 
              Available in English and Spanish.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1-844-967-3536"
                className="bg-white text-[#6B1F2E] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                <Phone className="h-5 w-5 mr-2" />
                1-844-YO-PELEO
              </a>
              <Link
                href="/free-consultation"
                className="bg-[#D4AF37] text-black px-8 py-3 rounded-full font-bold hover:bg-[#B8941F] transition-colors inline-flex items-center justify-center"
              >
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.title}
                href={link.link}
                className={`${link.bgColor} text-white p-4 rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-1`}
              >
                <Icon className="h-8 w-8 mb-2" />
                <h3 className="font-bold">{link.title}</h3>
                <p className="text-sm text-gray-100">{link.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Resource Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {resourceCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className={`border-l-4 ${category.color} p-6`}>
                  <div className="flex items-start mb-4">
                    <Icon className={`h-8 w-8 ${category.iconColor} mr-3 flex-shrink-0`} />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                      <p className="text-gray-600 mt-1">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.resources.map((resource) => (
                      <Link
                        key={resource.title}
                        href={resource.link}
                        className="border border-gray-200 rounded-lg p-4 hover:border-[#6B1F2E] hover:shadow-md transition-all group"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-[#6B1F2E] transition-colors">
                              {resource.title}
                              {resource.isPopular && (
                                <span className="ml-2 text-xs bg-[#D4AF37] text-black px-2 py-1 rounded-full">
                                  Popular
                                </span>
                              )}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {resource.description}
                            </p>
                          </div>
                          <Download className="h-5 w-5 text-gray-400 group-hover:text-[#6B1F2E] transition-colors flex-shrink-0 ml-2" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Resources Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            📚 Additional Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Legal Blog</h3>
              <p className="text-sm text-blue-800 mb-2">
                Stay informed with our latest legal articles and updates.
              </p>
              <Link href="/blog" className="text-blue-600 font-semibold hover:underline">
                Visit Blog →
              </Link>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Video Library</h3>
              <p className="text-sm text-blue-800 mb-2">
                Watch educational videos about various legal topics.
              </p>
              <Link href="/testimonials" className="text-blue-600 font-semibold hover:underline">
                Watch Videos →
              </Link>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">FAQ Section</h3>
              <p className="text-sm text-blue-800 mb-2">
                Find answers to commonly asked legal questions.
              </p>
              <Link href="/faq" className="text-blue-600 font-semibold hover:underline">
                View FAQs →
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Personalized Legal Help?
          </h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            While our resources provide valuable information, every case is unique. 
            Get personalized advice from our experienced attorneys.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1-844-967-3536"
              className="bg-white text-[#6B1F2E] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now: 1-844-YO-PELEO
            </a>
            <Link
              href="/free-consultation"
              className="bg-[#D4AF37] text-black px-8 py-3 rounded-full font-bold hover:bg-[#B8941F] transition-colors"
            >
              Schedule Free Consultation
            </Link>
          </div>
          <p className="text-sm mt-4 text-gray-200">
            Available 24/7 • Se Habla Español • Payment Plans Available
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-gray-100 rounded-lg p-4">
          <p className="text-xs text-gray-600 text-center">
            <strong>Disclaimer:</strong> The resources provided on this page are for informational purposes only and do not constitute legal advice. 
            Laws vary by state and change frequently. For specific legal advice regarding your situation, please consult with a qualified attorney. 
            Using these resources does not create an attorney-client relationship with Vasquez Law Firm.
          </p>
        </div>
      </div>
    </div>
  );
}