import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';

import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Workers Compensation - Vasquez Law Firm, PLLC',
  description: 'Legal insights and information from Vasquez Law Firm',
};

export default function WorkersCompensationPage() {
  const post = {
    id: 'workers-compensation',
    title: 'Workers Compensation',
    slug: 'workers-compensation',
    excerpt: 'Comprehensive information about workers compensation claims, benefits, and legal rights for injured workers in North Carolina and Florida.',
    content: `
      <div className="prose prose-lg max-w-none">
        <h2>Workers' Compensation Law: Protecting Injured Workers</h2>
        
        <p>When you're injured on the job, workers' compensation insurance should provide the medical care and wage replacement you need to recover. However, the reality is that many injured workers face denied claims, delayed benefits, and inadequate compensation. At Vasquez Law Firm, we fight to ensure injured workers receive the full benefits they deserve under the law.</p>

        <h3>Understanding Workers' Compensation</h3>
        
        <p>Workers' compensation is a no-fault insurance system designed to provide benefits to employees injured in the course of their employment. In exchange for these guaranteed benefits, employees generally cannot sue their employers for workplace injuries.</p>

        <h3>Benefits Available Under Workers' Compensation</h3>
        
        <h4>Medical Benefits</h4>
        <ul>
          <li>All necessary medical treatment related to your work injury</li>
          <li>Prescription medications</li>
          <li>Physical therapy and rehabilitation</li>
          <li>Medical equipment and prosthetics</li>
          <li>Travel expenses to and from medical appointments</li>
        </ul>

        <h4>Wage Replacement Benefits</h4>
        <ul>
          <li><strong>Temporary Total Disability:</strong> When you cannot work at all during recovery</li>
          <li><strong>Temporary Partial Disability:</strong> When you can work but earn less due to restrictions</li>
          <li><strong>Permanent Partial Disability:</strong> Compensation for permanent impairment</li>
          <li><strong>Permanent Total Disability:</strong> For injuries preventing any future work</li>
        </ul>

        <h4>Additional Benefits</h4>
        <ul>
          <li>Vocational rehabilitation and job retraining</li>
          <li>Death benefits for surviving family members</li>
          <li>Funeral expenses</li>
        </ul>

        <h3>Common Workplace Injuries We Handle</h3>
        
        <ul>
          <li><strong>Back and Spine Injuries:</strong> Herniated discs, strains, and chronic pain</li>
          <li><strong>Repetitive Stress Injuries:</strong> Carpal tunnel syndrome, tendinitis</li>
          <li><strong>Construction Accidents:</strong> Falls, equipment injuries, electrocutions</li>
          <li><strong>Manufacturing Injuries:</strong> Machine accidents, chemical exposure</li>
          <li><strong>Transportation Accidents:</strong> Delivery drivers, truckers, and other vehicle operators</li>
          <li><strong>Slip and Fall Injuries:</strong> Workplace hazards causing falls</li>
          <li><strong>Occupational Diseases:</strong> Illnesses caused by workplace conditions</li>
        </ul>

        <h3>Why Workers' Compensation Claims Are Denied</h3>
        
        <p>Insurance companies often deny legitimate claims for various reasons:</p>
        <ul>
          <li>Claiming the injury didn't occur at work</li>
          <li>Alleging the injury was pre-existing</li>
          <li>Missed deadlines for reporting or filing</li>
          <li>Insufficient medical documentation</li>
          <li>Disputes about the severity of injuries</li>
          <li>Claims of employee misconduct or intoxication</li>
        </ul>

        <h3>The Claims Process: What to Expect</h3>
        
        <ol>
          <li><strong>Report the Injury:</strong> Notify your employer immediately</li>
          <li><strong>Seek Medical Treatment:</strong> Get care from approved providers</li>
          <li><strong>File a Claim:</strong> Submit required forms within deadlines</li>
          <li><strong>Investigation:</strong> Insurance company reviews your claim</li>
          <li><strong>Decision:</strong> Claim approved or denied</li>
          <li><strong>Appeals:</strong> Challenge denials through proper channels</li>
        </ol>

        <h3>North Carolina Workers' Compensation Laws</h3>
        
        <p>Key provisions in North Carolina include:</p>
        <ul>
          <li>Employers with 3+ employees must carry coverage</li>
          <li>30-day deadline to report injuries</li>
          <li>2-year statute of limitations to file claims</li>
          <li>Wage replacement at 66.67% of average weekly wage</li>
          <li>500-week cap on temporary total disability benefits</li>
        </ul>

        <h3>Florida Workers' Compensation Laws</h3>
        
        <p>Important Florida requirements:</p>
        <ul>
          <li>Coverage required for construction with 1+ employees</li>
          <li>Other industries with 4+ employees</li>
          <li>30-day reporting deadline</li>
          <li>2-year statute of limitations</li>
          <li>Wage benefits at 66.67% of average weekly wage</li>
          <li>104-week limit on temporary benefits</li>
        </ul>

        <h3>Third-Party Claims</h3>
        
        <p>While you generally cannot sue your employer, you may have claims against third parties such as:</p>
        <ul>
          <li>Equipment manufacturers (defective machinery)</li>
          <li>Property owners (unsafe premises)</li>
          <li>Other drivers (vehicle accidents)</li>
          <li>Contractors or subcontractors</li>
        </ul>
        
        <p>These claims can provide additional compensation beyond workers' compensation benefits.</p>

        <h3>How Vasquez Law Firm Can Help</h3>
        
        <p>Our workers' compensation attorneys provide:</p>
        <ul>
          <li><strong>Free Consultation:</strong> Evaluate your claim at no cost</li>
          <li><strong>Claims Filing:</strong> Ensure proper documentation and timely submission</li>
          <li><strong>Medical Advocacy:</strong> Help you get appropriate treatment</li>
          <li><strong>Benefit Calculation:</strong> Maximize your compensation</li>
          <li><strong>Appeals Representation:</strong> Fight denied claims</li>
          <li><strong>Settlement Negotiation:</strong> Achieve fair resolutions</li>
        </ul>

        <h3>Don't Wait to Get Help</h3>
        
        <p>Workers' compensation cases have strict deadlines and complex procedures. The insurance company has lawyers protecting their interests – you deserve the same level of representation. Contact Vasquez Law Firm today for a free consultation about your workplace injury claim.</p>
        
        <p>Call (888) 888-8888 or fill out our online form. We handle workers' compensation cases on a contingency basis – you pay no attorney fees unless we win your case.</p>
      </div>
    `,
    practiceArea: 'workers-compensation',
    language: 'en' as const,
    publishedAt: new Date(),
    readTime: 7,
    author: DEFAULT_BLOG_AUTHOR,
    tags: ['workers compensation', 'workplace injury', 'work accident', 'disability benefits', 'north carolina', 'florida'],
  };

  const categories = [
    {
      id: 'immigration',
      name: { en: 'Immigration Law', es: 'Ley de Inmigración' },
      slug: { en: 'immigration', es: 'inmigracion' },
      icon: '🌐',
      postCount: 45,
    },
    {
      id: 'personal-injury',
      name: { en: 'Personal Injury', es: 'Lesiones Personales' },
      slug: { en: 'personal-injury', es: 'lesiones-personales' },
      icon: '🏥',
      postCount: 32,
    },
    {
      id: 'criminal-defense',
      name: { en: 'Criminal Defense', es: 'Defensa Criminal' },
      slug: { en: 'criminal-defense', es: 'defensa-criminal' },
      icon: '⚖️',
      postCount: 28,
    },
  ];

  return (
    <BlogPageTemplate
      posts={[]}
      categories={categories}
      isArticlePage={true}
      currentPost={post}
      relatedPosts={[]}
    />
  );
}
