'use client';

import React from 'react';
import Image from 'next/image';
import DbImage from '@/components/DbImage';

import { 
  Award, 
  CheckCircle, 
  Calendar, 
  DollarSign, 
  Mail, 
  Users, 
  GraduationCap,
  Palette,
  FileText,
  AlertCircle
} from 'lucide-react';

export default function ScholarshipPageClient() {
  const eligibilityRequirements = [
    'Must be a DACA recipient pursuing higher education',
    'Must have a 3.5 grade point average or higher',
    'Must be enrolled or planning to enroll in an accredited college/university for Fall 2024',
    'Must be at least 17 years of age'
  ];

  const applicationRequirements = [
    {
      icon: FileText,
      title: 'Complete Application',
      description: 'Fill out the complete application form with all required information'
    },
    {
      icon: GraduationCap,
      title: 'Academic Transcript',
      description: 'Submit unofficial academic transcript showing 3.5+ GPA'
    },
    {
      icon: Users,
      title: 'Enrollment Proof',
      description: 'Provide proof of enrollment in accredited institution'
    },
    {
      icon: FileText,
      title: 'DACA Documentation',
      description: 'Submit documentation proving current DACA status'
    },
    {
      icon: Palette,
      title: 'Original Artwork',
      description: 'Create and submit an original piece of art depicting your immigration experience'
    }
  ];

  const acceptedArtForms = [
    'Painting',
    'Sculpture', 
    'Canvas Art',
    'Pottery',
    'Poetry (video/recording)'
  ];

  const winners = [
    {
      name: 'Briseyda Bautista Gonzalez',
      image: '/images/scholarship/winner-briseyda.png',
      imageId: 'cmeublp38000xsfmz3d94dosu', // winner-briseyda.png
      semester: 'Previous Winner'
    },
    {
      name: 'Ahiram Lizeth Osorio Rizo',
      image: '/images/scholarship/winner-ahiram.png',
      imageId: 'cmeublomt000wsfmzvl732ydl', // winner-ahiram.png
      semester: 'Previous Winner'
    },
    {
      name: 'Jennifer Guzman Millan',
      image: '/images/scholarship/winner-jennifer.png',
      imageId: 'cmeublpiw000ysfmzr9ocv1lr', // winner-jennifer.png
      semester: 'Previous Winner'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-mesh-dark py-20 overflow-hidden">
        {/* Floating gradient orbs */}
        <div className="gradient-orb-burgundy w-96 h-96 top-0 right-0 animate-float-orb opacity-60" />
        <div className="gradient-orb-gold w-80 h-80 bottom-20 left-10 animate-float-orb-reverse opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div
className="text-center text-white"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-gradient">
              DACA Dreamer Scholarship
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-gray-300">
              Supporting the dreams of tomorrow's leaders
            </p>
            
            {/* Scholarship Amount */}
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20">
              <DollarSign className="w-8 h-8 text-gold-400" />
              <div className="text-left">
                <p className="text-3xl font-bold text-gold-400">$1,000</p>
                <p className="text-sm text-gray-300">Awarded to 2 students per semester</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Status Alert */}
      <section className="bg-burgundy-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            <AlertCircle className="w-6 h-6 text-gold-400" />
            <p className="text-lg">
              <strong>Application Status:</strong> Currently Closed | Spring 2025 Deadline: November 27, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Previous Winners Section */}
      <section className="py-16 bg-gradient-subtle-light">
        <div className="max-w-7xl mx-auto px-4">
          <div
className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-burgundy-900">Our Scholarship Winners</h2>
            <p className="text-lg text-gray-600">Celebrating the achievements of our DACA Dreamers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {winners.map((winner, index) => (
              <div
                key={winner.name}

                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square relative bg-gradient-to-b from-burgundy-100 to-burgundy-50">
                  {winner.imageId ? (
                    <DbImage
                      id={winner.imageId}
                      alt={winner.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src={winner.image}
                      alt={winner.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-burgundy-900 mb-2">{winner.name}</h3>
                  <p className="text-gold-600 font-semibold">{winner.semester}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Requirements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div>
            <h2 className="text-4xl font-bold mb-8 text-center text-burgundy-900">
              Eligibility Requirements
            </h2>
            
            <div className="max-w-3xl mx-auto bg-gradient-to-r from-burgundy-50 to-gold-50 rounded-2xl p-8 shadow-lg">
              <div className="space-y-4">
                {eligibilityRequirements.map((requirement, index) => (
                  <div
                    key={index}

                className="flex items-start gap-4"
                  >
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p
                className="text-lg text-gray-700">{requirement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Requirements */}
      <section className="py-16 bg-gradient-subtle-light">
        <div className="max-w-7xl mx-auto px-4">
          <div>
            <h2 className="text-4xl font-bold mb-8 text-center text-burgundy-900">
              Application Requirements
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applicationRequirements.map((req, index) => {
                const Icon = req.icon;
                return (
                  <div
                    key={index}

                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-burgundy-100 rounded-lg">
                        <Icon className="w-6 h-6 text-burgundy-700" />
                      </div>
                      <h3
                className="text-lg font-bold text-burgundy-900">{req.title}</h3>
                    </div>
                    <p className="text-gray-600">{req.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Art Submission Guidelines */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-8 text-center text-burgundy-900">
              Art Submission Guidelines
            </h2>
            
            <div className="bg-gradient-to-br from-gold-50 to-burgundy-50 rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    Accepted Art Forms
                  </h3>
                  <ul className="space-y-3">
                    {acceptedArtForms.map((form, index) => (
                      <li key={index}

                className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full" />
                        <span
                className="text-gray-700">{form}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6" />
                    Not Accepted
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full" />
                      <span className="text-gray-700">Digital Art</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full" />
                      <span className="text-gray-700">Pencil Drawings</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-white/70 rounded-lg">
                <p className="text-center text-gray-700">
                  <strong>Theme:</strong> Create an original piece depicting your immigration experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 bg-gradient-subtle-light">
        <div className="max-w-7xl mx-auto px-4">
          <div
className="text-center"
          >
            <h2 className="text-4xl font-bold mb-8 text-burgundy-900">Important Dates</h2>
            
            <div className="flex flex-col md:flex-row gap-8 justify-center">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <Calendar className="w-12 h-12 text-burgundy-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-burgundy-900 mb-2">Application Deadline</h3>
                <p className="text-2xl font-bold text-gold-600">November 27, 2025</p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <Award className="w-12 h-12 text-burgundy-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-burgundy-900 mb-2">Winners Announced</h3>
                <p className="text-2xl font-bold text-gold-600">January 8, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-burgundy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">Get Updates</h2>
            <p className="text-xl mb-8">
              Interested in applying for the next scholarship cycle?
            </p>
            
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20">
              <Mail className="w-6 h-6 text-gold-400" />
              <a 
                href="mailto:scholarship@vasquezlawfirm.com"
                className="text-lg text-gold-400 hover:text-gold-300 transition-colors"
              >
                scholarship@vasquezlawfirm.com
              </a>
            </div>
            
            <p className="mt-8 text-gray-300">
              Email us to be notified when applications open for the next semester
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
