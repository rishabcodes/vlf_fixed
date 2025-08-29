'use client';

import React, { useState } from 'react';
import { ParallaxHero } from './ParallaxSection';
import { MorphingText, SplitText, GradientText } from './MorphingText';
import { FloatingParticles, ConfettiExplosion } from './ParticleSystem';
import { LiquidButton, LiquidReveal, BlobAnimation } from './LiquidTransitions';
import { Card3D, FlipCard, ParallaxTiltCard } from './Card3D';
import { MagneticButton, MagneticCard, MagneticNav } from './MagneticElements';
import {
  AnimatedCounter,
  ScrollProgressBar,
  Reveal,
  StaggeredList,
  ScrollMorphShape,
} from './ScrollTriggeredAnimations';
import {
  RippleButton,
  SuccessAnimation,
  MorphingLoader,
  ElasticInput,
  AnimatedToggle,
  HoverCard,
  NotificationToast,
} from './MicroInteractions';
import { Home, Users, Briefcase, Phone, Award } from 'lucide-react';

export function AnimationShowcase() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'About', href: '/about', icon: Users },
    { label: 'Services', href: '/services', icon: Briefcase },
    { label: 'Contact', href: '/contact', icon: Phone },
  ];

  const testimonials = [
    'Amazing legal services that exceeded our expectations!',
    "The team's dedication to our case was outstanding.",
    'Professional, responsive, and truly caring attorneys.',
    'They fought for us every step of the way.',
  ];

  return (
    <div className="min-h-screen">
      {/* Floating particles background */}
      <FloatingParticles density={20} />

      {/* Scroll progress bar */}
      <ScrollProgressBar />

      {/* Hero Section with Parallax */}
      <ParallaxHero
        title="Epic Animations for Vasquez Law Firm"
        subtitle="Experience the most visually stunning legal website ever created"
        backgroundImage="/images/hero-bg.jpg"
      />

      {/* Magnetic Navigation */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <MagneticNav items={navItems} />
        </div>
      </div>

      {/* Text Animations Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Reveal effect="slide">
            <h2 className="mb-12 text-center text-4xl font-bold">
              <GradientText text="Advanced Text Animations" />
            </h2>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="text-center">
              <h3 className="mb-4 text-2xl font-semibold">Morphing Text</h3>
              <div className="text-3xl font-bold text-[#6B1F2E]">
                <MorphingText
                  texts={['Innovation', 'Excellence', 'Justice', 'Success']} type="scramble"
                />
              </div>
            </div>

            <div className="text-center">
              <h3 className="mb-4 text-2xl font-semibold">Split Text Animation</h3>
              <div className="text-3xl font-bold">
                <SplitText text="We Fight For You" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Cards Section */}
      <LiquidReveal className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">3D Card Effects</h2>

          <div className="grid gap-8 md:grid-cols-3">
            <Card3D>
              <div className="p-8">
                <Award className="mb-4 h-12 w-12 text-[#6B1F2E]" />
                <h3 className="mb-2 text-xl font-bold">Award Winning</h3>
                <p className="text-gray-600">Recognized for excellence in legal services.</p>
              </div>
            </Card3D>

            <FlipCard
              front={
                <div className="flex h-64 items-center justify-center bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white">
                  <h3 className="text-2xl font-bold">Click to Flip</h3>
                </div>
              }
              back={
                <div className="flex h-64 items-center justify-center bg-gradient-to-br from-[#C9974D] to-[#D4A574] p-8 text-white">
                  <p className="text-center">30+ years of combined legal experience</p>
                </div>
              }
            />

            <ParallaxTiltCard>
              <h3 className="mb-2 text-xl font-bold">Parallax Tilt</h3>
              <p className="text-gray-600">Move your mouse to see the 3D effect!</p>
            </ParallaxTiltCard>
          </div>
        </div>
      </LiquidReveal>

      {/* Interactive Elements */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Interactive Elements</h2>

          <div className="mx-auto max-w-2xl space-y-8">
            {/* Magnetic Button */}
            <div className="text-center">
              <MagneticButton onClick={() => setShowConfetti(true)}>
                Click for Confetti!
              </MagneticButton>
              <ConfettiExplosion trigger={showConfetti} />
            </div>

            {/* Liquid Button */}
            <div className="text-center">
              <LiquidButton onClick={() => setShowSuccess(true)}>
                Show Success Animation
              </LiquidButton>
              <SuccessAnimation trigger={showSuccess} onComplete={() => setShowSuccess(false)} />
            </div>

            {/* Ripple Button */}
            <div className="text-center">
              <RippleButton
                className="rounded-lg bg-[#6B1F2E] px-8 py-4 text-white"
                onClick={() => setShowNotification(true)}
              >
                Ripple Effect Button
              </RippleButton>
              <NotificationToast
                message="Button clicked successfully!"
                type="success"
                isVisible={showNotification}
                onClose={() => setShowNotification(false)}
              />
            </div>

            {/* Form Elements */}
            <div className="space-y-4">
              <ElasticInput placeholder="Enter your name" />
              <AnimatedToggle
                checked={isToggled} onChange={setIsToggled}
                label="Enable notifications"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Counters */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Impressive Numbers</h2>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6B1F2E]">
                <AnimatedCounter value={50000} suffix="+" />
              </div>
              <p className="mt-2 text-gray-600">Clients Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6B1F2E]">
                <AnimatedCounter value={95} suffix="%" />
              </div>
              <p className="mt-2 text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6B1F2E]">
                <AnimatedCounter value={30} suffix="+" />
              </div>
              <p className="mt-2 text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6B1F2E]">
                <AnimatedCounter value={4.9} />
              </div>
              <p className="mt-2 text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Staggered List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Client Testimonials</h2>

          <StaggeredList
            items={testimonials.map((text, index) => (
              <MagneticCard key={index}

                className="p-6">
                <p
                className="italic text-gray-600">&quot;{text}&quot;</p>
                <div className="mt-4 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#6B1F2E] to-[#C9974D]" />
                  <div className="ml-3">
                    <p className="font-semibold">Client {index + 1}</p>
                    <p className="text-sm text-gray-500">Verified Review</p>
                  </div>
                </div>
              </MagneticCard>
            ))}
            className="grid gap-6 md:grid-cols-2"
            itemClassName="transform transition-all"
          />
        </div>
      </section>

      {/* Loading States */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Loading Animations</h2>

          <div className="flex justify-center">
            <MorphingLoader />
          </div>
        </div>
      </section>

      {/* Blob Animation Background */}
      <section className="relative overflow-hidden py-20">
        <BlobAnimation />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold">Ready to Experience Excellence?</h2>
          <p className="mb-8 text-xl text-gray-600">Contact us today for a free consultation</p>
          <HoverCard className="inline-block">
            <button className="rounded-lg bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] px-12 py-4 text-lg font-semibold text-white">
              Get Started Now
            </button>
          </HoverCard>
        </div>
      </section>

      {/* Morphing Shape */}
      <ScrollMorphShape />
    </div>
  );
}
