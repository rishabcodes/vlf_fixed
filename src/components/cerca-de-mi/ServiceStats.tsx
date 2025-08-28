'use client';

import React from 'react';

import { TrendingUp, Users, Clock, DollarSign } from 'lucide-react';

interface ServiceStatsProps {
  service: string;
  city: string;
  language?: 'en' | 'es';
}

export default function ServiceStats({ service, city, language = 'en' }: ServiceStatsProps) {
  // Dynamic stats based on service type
  const stats = {
    'Car Accident Lawyer': {
      avgSettlement: '$47,500',
      avgTimeToResolve: '6-8 months',
      successRate: '96%',
      casesHandled: '2,500+',
    },
    'Personal Injury Lawyer': {
      avgSettlement: '$62,000',
      avgTimeToResolve: '8-12 months',
      successRate: '94%',
      casesHandled: '3,800+',
    },
    'Workers Compensation': {
      avgSettlement: '$35,000',
      avgTimeToResolve: '4-6 months',
      successRate: '98%',
      casesHandled: '1,900+',
    },
    'Criminal Defense': {
      avgSettlement: 'N/A',
      avgTimeToResolve: '3-6 months',
      successRate: '89%',
      casesHandled: '4,200+',
    },
    Immigration: {
      avgSettlement: 'N/A',
      avgTimeToResolve: '6-18 months',
      successRate: '92%',
      casesHandled: '5,100+',
    },
    'DUI DWI': {
      avgSettlement: 'N/A',
      avgTimeToResolve: '2-4 months',
      successRate: '87%',
      casesHandled: '1,600+',
    },
  };

  const currentStats = stats[service as keyof typeof stats] || stats['Personal Injury Lawyer'];

  const t =
    language === 'es'
      ? {
          title: `Estadísticas de ${service} en ${city}`,
          avgSettlement: 'Acuerdo Promedio',
          timeToResolve: 'Tiempo de Resolución',
          successRate: 'Tasa de Éxito',
          casesHandled: 'Casos Manejados',
          disclaimer: '*Basado en casos históricos. Los resultados individuales pueden variar.',
        }
      : {
          title: `${service} Statistics in ${city}`,
          avgSettlement: 'Average Settlement',
          timeToResolve: 'Time to Resolve',
          successRate: 'Success Rate',
          casesHandled: 'Cases Handled',
          disclaimer: '*Based on historical cases. Individual results may vary.',
        };

  const statItems = [
    {
      icon: DollarSign,
      value: currentStats.avgSettlement,
      label: t.avgSettlement,
      color: 'text-green-600',
    },
    {
      icon: Clock,
      value: currentStats.avgTimeToResolve,
      label: t.timeToResolve,
      color: 'text-blue-600',
    },
    {
      icon: TrendingUp,
      value: currentStats.successRate,
      label: t.successRate,
      color: 'text-purple-600',
    },
    {
      icon: Users,
      value: currentStats.casesHandled,
      label: t.casesHandled,
      color: 'text-orange-600',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div
className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-gray-600">{t.disclaimer}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statItems.map((stat, index) => (
            <div
              key={index}

                className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
            >
              <stat.icon
                className={`w-10 h-10 mx-auto mb-3 ${stat.color}`}
              />
              <div className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
