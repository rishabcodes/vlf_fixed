'use client';

import React from 'react';

import Link from 'next/link';
import { ArrowRight, Phone, Mail, Shield, Award, Users, Clock } from 'lucide-react';

const PersonalInjuryPageClient: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-secondary-700 to-secondary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/images/legal-pattern.png')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div 
            className="grid lg:grid-cols-2 gap-12 items-center"

          >
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Injured in an Accident?
                  <span className="block text-primary">We Fight for the Compensation You Deserve</span>
                </h1>
              </div>
              
              <p 
                className="text-xl lg:text-2xl text-gray-200 leading-relaxed"
               
              >
                With over 30 years of experience, our expert personal injury attorneys have recovered millions for our clients. Don't settle for less than you deserve.
              </p>
              
              <div 
                className="flex flex-col sm:flex-row gap-4"
               
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-black font-bold text-lg rounded-lg hover:bg-primary-400 transition-colors shadow-lg hover:shadow-xl"
                >
                  Get Your Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href="tel:1-844-967-3536"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white hover:text-secondary transition-colors"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call 1-844-YO-PELEO
                </a>
              </div>
              
              <div 
                className="flex items-center space-x-6 text-sm"
               
              >
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  24/7 Available
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  30,000+ Cases Won
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  No Fee Unless We Win
                </div>
              </div>
            </div>
            
            <div 
              className="relative"
             
            >
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center space-y-6">
                  <div className="mx-auto w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                    <Shield className="h-12 w-12 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold">YO PELEO POR TI™</h3>
                  <p className="text-lg text-gray-200">
                    "I Fight for You" - Our commitment to maximum compensation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Personal Injury <span className="text-primary">Expertise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We handle all types of personal injury cases with the dedication and expertise you need to win.
            </p>
          </div>

          <div 
            className="grid md:grid-cols-3 gap-8"

          >
            {[
              {
                title: "Motor Vehicle Accidents",
                description: "Car, truck, motorcycle, bicycle, and pedestrian accidents. We investigate thoroughly and negotiate aggressively for maximum compensation.",
                icon: "🚗",
                features: ["Car Accidents", "Truck Collisions", "Motorcycle Crashes", "Bicycle Accidents", "Pedestrian Injuries"]
              },
              {
                title: "Premises Liability",
                description: "Injured on someone else's property? We hold property owners accountable for unsafe conditions.",
                icon: "🏢",
                features: ["Slip and Fall", "Property Defects", "Inadequate Security", "Swimming Pool Accidents", "Store Injuries"]
              },
              {
                title: "Boating & Water Accidents",
                description: "Specialized legal expertise for recreational water incidents and boating accidents.",
                icon: "⛵",
                features: ["Boat Collisions", "Jet Ski Accidents", "Swimming Incidents", "Dock Accidents", "Water Sports Injuries"]
              }
            ].map((area, index) => (
              <div
                key={index}

                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow"
              >
                <div
                className="text-4xl mb-4">{area.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{area.title}</h3>
                <p className="text-gray-600 mb-6">{area.description}</p>
                <ul className="space-y-2">
                  {area.features.map((feature, idx) => (
                    <li key={idx}

                className="flex items-center text-sm text-gray-700">
                      <div
                className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compensation Section */}
      <section className="py-20 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="grid lg:grid-cols-2 gap-12 items-center"

          >
            <div>
              <h2 
                className="text-4xl lg:text-5xl font-bold mb-8"
               
              >
                Maximum <span className="text-primary">Compensation</span> Recovery
              </h2>
              <p 
                className="text-xl text-gray-200 mb-8"
               
              >
                We fight to recover every dollar you're entitled to. Our experienced team knows how to value your case and negotiate with insurance companies.
              </p>
            </div>
            
            <div 
              className="grid grid-cols-2 gap-6"
             
            >
              {[
                { label: "Medical Expenses", icon: "🏥" },
                { label: "Lost Income", icon: "💼" },
                { label: "Pain & Suffering", icon: "❤️‍🩹" },
                { label: "Future Damages", icon: "📈" },
                { label: "Property Damage", icon: "🔧" },
                { label: "Emotional Distress", icon: "🧠" }
              ].map((item, index) => (
                <div key={index}

                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                  <div
                className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-semibold">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-primary">Vasquez Law Firm?</span>
            </h2>
          </div>

          <div 
            className="grid md:grid-cols-4 gap-8"

          >
            {[
              {
                title: "30+ Years Experience",
                description: "Decades of successful personal injury representation",
                icon: <Award className="h-8 w-8" />
              },
              {
                title: "Bilingual Services",
                description: "Full legal services in English and Spanish",
                icon: <Users className="h-8 w-8" />
              },
              {
                title: "No Fee Unless We Win",
                description: "You pay nothing unless we secure your compensation",
                icon: <Shield className="h-8 w-8" />
              },
              {
                title: "24/7 Consultations",
                description: "Available when you need us most",
                icon: <Clock className="h-8 w-8" />
              }
            ].map((feature, index) => (
              <div
                key={index}

                className="text-center p-6"
              >
                <div
                className="inline-flex items-center justify-center w-16 h-16 bg-primary text-black rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary-400 to-primary-600 text-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold">
              Schedule Your Free Consultation Today
            </h2>
            <p className="text-xl">
              Don't wait - the sooner you call, the better we can protect your rights and maximize your compensation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-white font-bold text-lg rounded-lg hover:bg-secondary-600 transition-colors shadow-lg hover:shadow-xl"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call 1-844-YO-PELEO (967-3536)
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-black text-black font-bold text-lg rounded-lg hover:bg-black hover:text-white transition-colors"
              >
                <Mail className="mr-2 h-5 w-5" />
                Request Free Consultation
              </Link>
            </div>
            <p className="text-sm opacity-90">
              Available 24/7 • Virtual and In-Person Consultations • Hablamos Español
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PersonalInjuryPageClient;