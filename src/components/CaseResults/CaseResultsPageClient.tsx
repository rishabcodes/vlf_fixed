'use client';

import PageLayout from '@/components/Layout/PageLayout';
import Section from '@/components/ui/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Heart, Briefcase, CheckCircle, DollarSign, Users } from 'lucide-react';

interface CaseResultsPageClientProps {
  language?: 'en' | 'es';
}

interface CaseResult {
  id: string;
  category: string;
  title: string;
  outcome: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: string;
}

const content = {
  en: {
    title: 'Proven Case Results',
    subtitle:
      "We're proud of our track record of success. Here are some recent victories we've achieved for our clients across all practice areas.",
    successfulCases: 'Successful Cases Shown',
    inSettlements: 'In Settlements Shown',
    familiesHelped: 'Families Helped',
    readyToAdd: 'Ready to Add Your Success Story?',
    readyText:
      'Every case is unique, but our commitment to winning for our clients never changes. Let us fight for you.',
    getStarted: 'Get Started Today',
    call: 'Call',
    disclaimer: 'Disclaimer:',
    disclaimerText:
      "The case results shown are specific to the facts and legal circumstances of each client's case. Past results do not guarantee or predict a similar outcome in any future case. Each case is unique and must be evaluated on its own merits. Some details have been modified to protect client confidentiality.",
    categories: {
      immigration: 'Immigration',
      personalInjury: 'Personal Injury',
      criminalDefense: 'Criminal Defense',
      workersComp: "Workers' Compensation",
    },
    caseResults: [
      {
        id: 'imm-1',
        category: 'Immigration',
        title: 'Deportation Defense Victory',
        outcome: 'Cancellation of Removal Granted',
        description:
          'Successfully obtained cancellation of removal for a client facing deportation after 15 years in the US. Client can now apply for green card.',
        icon: Shield,
        highlight: 'Family Kept Together',
      },
      {
        id: 'imm-2',
        category: 'Immigration',
        title: 'Complex Asylum Case',
        outcome: 'Asylum Granted',
        description:
          'Won asylum for a family fleeing persecution in their home country. Case involved extensive country condition evidence and expert testimony.',
        icon: Heart,
      },
      {
        id: 'imm-3',
        category: 'Immigration',
        title: 'H-1B Visa Approval',
        outcome: 'Visa Approved After RFE',
        description:
          'Successfully responded to Request for Evidence and secured H-1B approval for software engineer. Overcame specialty occupation challenges.',
        icon: Briefcase,
      },
      {
        id: 'imm-4',
        category: 'Immigration',
        title: 'DACA to Green Card',
        outcome: 'Adjustment of Status Approved',
        description:
          'Helped DACA recipient adjust status to permanent resident through marriage to US citizen. Navigated complex inadmissibility issues.',
        icon: CheckCircle,
      },
      {
        id: 'imm-5',
        category: 'Immigration',
        title: 'U-Visa Success',
        outcome: 'U-Visa Approved',
        description:
          'Obtained U-visa for crime victim who assisted law enforcement. Client received work authorization and path to green card.',
        icon: Shield,
      },
      {
        id: 'pi-1',
        category: 'Personal Injury',
        title: 'Major Car Accident Settlement',
        outcome: '$275,000 Settlement',
        description:
          'Secured substantial settlement for client who suffered back injuries in rear-end collision. Covered medical bills, lost wages, and pain and suffering.',
        icon: DollarSign,
        highlight: '$275,000',
      },
      {
        id: 'pi-2',
        category: 'Personal Injury',
        title: 'Workplace Injury Case',
        outcome: '$150,000 Recovery',
        description:
          'Won significant compensation for construction worker injured due to unsafe conditions. Included future medical care and disability benefits.',
        icon: DollarSign,
        highlight: '$150,000',
      },
      {
        id: 'pi-3',
        category: 'Personal Injury',
        title: 'Slip and Fall Victory',
        outcome: '$85,000 Settlement',
        description:
          'Obtained settlement for client injured in grocery store fall. Proved negligent maintenance despite contributory negligence defense.',
        icon: DollarSign,
        highlight: '$85,000',
      },
      {
        id: 'cd-1',
        category: 'Criminal Defense',
        title: 'DUI Charges Dismissed',
        outcome: 'Case Dismissed',
        description:
          'Successfully challenged traffic stop and breathalyzer procedures, resulting in complete dismissal of DUI charges.',
        icon: Shield,
        highlight: 'Charges Dropped',
      },
      {
        id: 'cd-2',
        category: 'Criminal Defense',
        title: 'Federal Drug Case',
        outcome: 'Reduced Sentence',
        description:
          'Negotiated plea agreement reducing potential 10-year sentence to 2 years. Client avoided mandatory minimum through cooperation.',
        icon: CheckCircle,
      },
      {
        id: 'cd-3',
        category: 'Criminal Defense',
        title: 'Domestic Violence Defense',
        outcome: 'Not Guilty Verdict',
        description:
          'Won not guilty verdict at trial for client falsely accused of domestic violence. Protected immigration status and employment.',
        icon: Shield,
        highlight: 'Not Guilty',
      },
      {
        id: 'wc-1',
        category: "Workers' Compensation",
        title: 'Back Injury Settlement',
        outcome: '$125,000 Settlement',
        description:
          'Secured settlement for warehouse worker with herniated discs. Included ongoing medical treatment and vocational rehabilitation.',
        icon: DollarSign,
        highlight: '$125,000',
      },
      {
        id: 'wc-2',
        category: "Workers' Compensation",
        title: 'Denied Claim Reversed',
        outcome: 'Benefits Approved',
        description:
          "Successfully appealed denied workers' comp claim. Client received back pay, medical treatment, and ongoing disability benefits.",
        icon: CheckCircle,
      },
    ],
  },
  es: {
    title: 'Resultados de Casos Comprobados',
    subtitle:
      'Estamos orgullosos de nuestro historial de éxito. Aquí hay algunas victorias recientes que hemos logrado para nuestros clientes en todas las áreas de práctica.',
    successfulCases: 'Casos Exitosos Mostrados',
    inSettlements: 'En Acuerdos Mostrados',
    familiesHelped: 'Familias Ayudadas',
    readyToAdd: '¿Listo para Agregar Su Historia de Éxito?',
    readyText:
      'Cada caso es único, pero nuestro compromiso de ganar para nuestros clientes nunca cambia. Permítanos luchar por usted.',
    getStarted: 'Comience Hoy',
    call: 'Llamar',
    disclaimer: 'Descargo de responsabilidad:',
    disclaimerText:
      'Los resultados de casos mostrados son específicos de los hechos y circunstancias legales del caso de cada cliente. Los resultados pasados no garantizan ni predicen un resultado similar en cualquier caso futuro. Cada caso es único y debe evaluarse por sus propios méritos. Algunos detalles han sido modificados para proteger la confidencialidad del cliente.',
    categories: {
      immigration: 'Inmigración',
      personalInjury: 'Lesiones Personales',
      criminalDefense: 'Defensa Criminal',
      workersComp: 'Compensación Laboral',
    },
    caseResults: [
      {
        id: 'imm-1',
        category: 'Inmigración',
        title: 'Victoria en Defensa de Deportación',
        outcome: 'Cancelación de Remoción Otorgada',
        description:
          'Obtuvimos exitosamente la cancelación de remoción para un cliente que enfrentaba deportación después de 15 años en EE.UU. El cliente ahora puede solicitar la tarjeta verde.',
        icon: Shield,
        highlight: 'Familia Mantenida Unida',
      },
      {
        id: 'imm-2',
        category: 'Inmigración',
        title: 'Caso de Asilo Complejo',
        outcome: 'Asilo Otorgado',
        description:
          'Ganamos asilo para una familia que huía de persecución en su país de origen. El caso involucró evidencia extensa de condiciones del país y testimonio experto.',
        icon: Heart,
      },
      {
        id: 'imm-3',
        category: 'Inmigración',
        title: 'Aprobación de Visa H-1B',
        outcome: 'Visa Aprobada Después de RFE',
        description:
          'Respondimos exitosamente a Solicitud de Evidencia y aseguramos aprobación H-1B para ingeniero de software. Superamos desafíos de ocupación especializada.',
        icon: Briefcase,
      },
      {
        id: 'imm-4',
        category: 'Inmigración',
        title: 'DACA a Tarjeta Verde',
        outcome: 'Ajuste de Estatus Aprobado',
        description:
          'Ayudamos a receptor de DACA a ajustar estatus a residente permanente a través de matrimonio con ciudadano estadounidense. Navegamos problemas complejos de inadmisibilidad.',
        icon: CheckCircle,
      },
      {
        id: 'imm-5',
        category: 'Inmigración',
        title: 'Éxito con Visa U',
        outcome: 'Visa U Aprobada',
        description:
          'Obtuvimos visa U para víctima de crimen que asistió a las autoridades. El cliente recibió autorización de trabajo y camino a la tarjeta verde.',
        icon: Shield,
      },
      {
        id: 'pi-1',
        category: 'Lesiones Personales',
        title: 'Acuerdo Mayor por Accidente de Auto',
        outcome: 'Acuerdo de $275,000',
        description:
          'Aseguramos acuerdo sustancial para cliente que sufrió lesiones de espalda en colisión trasera. Cubrió facturas médicas, salarios perdidos y dolor y sufrimiento.',
        icon: DollarSign,
        highlight: '$275,000',
      },
      {
        id: 'pi-2',
        category: 'Lesiones Personales',
        title: 'Caso de Lesión en el Trabajo',
        outcome: 'Recuperación de $150,000',
        description:
          'Ganamos compensación significativa para trabajador de construcción lesionado debido a condiciones inseguras. Incluyó atención médica futura y beneficios por discapacidad.',
        icon: DollarSign,
        highlight: '$150,000',
      },
      {
        id: 'pi-3',
        category: 'Lesiones Personales',
        title: 'Victoria por Resbalón y Caída',
        outcome: 'Acuerdo de $85,000',
        description:
          'Obtuvimos acuerdo para cliente lesionado en caída en tienda de comestibles. Probamos mantenimiento negligente a pesar de defensa de negligencia contributiva.',
        icon: DollarSign,
        highlight: '$85,000',
      },
      {
        id: 'cd-1',
        category: 'Defensa Criminal',
        title: 'Cargos de DUI Desestimados',
        outcome: 'Caso Desestimado',
        description:
          'Desafiamos exitosamente parada de tráfico y procedimientos de alcoholímetro, resultando en desestimación completa de cargos de DUI.',
        icon: Shield,
        highlight: 'Cargos Retirados',
      },
      {
        id: 'cd-2',
        category: 'Defensa Criminal',
        title: 'Caso Federal de Drogas',
        outcome: 'Sentencia Reducida',
        description:
          'Negociamos acuerdo de culpabilidad reduciendo sentencia potencial de 10 años a 2 años. Cliente evitó mínimo obligatorio a través de cooperación.',
        icon: CheckCircle,
      },
      {
        id: 'cd-3',
        category: 'Defensa Criminal',
        title: 'Defensa de Violencia Doméstica',
        outcome: 'Veredicto de No Culpable',
        description:
          'Ganamos veredicto de no culpable en juicio para cliente acusado falsamente de violencia doméstica. Protegimos estatus migratorio y empleo.',
        icon: Shield,
        highlight: 'No Culpable',
      },
      {
        id: 'wc-1',
        category: 'Compensación Laboral',
        title: 'Acuerdo por Lesión de Espalda',
        outcome: 'Acuerdo de $125,000',
        description:
          'Aseguramos acuerdo para trabajador de almacén con discos herniados. Incluyó tratamiento médico continuo y rehabilitación vocacional.',
        icon: DollarSign,
        highlight: '$125,000',
      },
      {
        id: 'wc-2',
        category: 'Compensación Laboral',
        title: 'Reclamo Denegado Revertido',
        outcome: 'Beneficios Aprobados',
        description:
          'Apelamos exitosamente reclamo de compensación laboral denegado. Cliente recibió pago retroactivo, tratamiento médico y beneficios por discapacidad continuos.',
        icon: CheckCircle,
      },
    ],
  },
};

const categoryIcons = {
  Immigration: Users,
  'Personal Injury': Heart,
  'Criminal Defense': Shield,
  "Workers' Compensation": Briefcase,
  Inmigración: Users,
  'Lesiones Personales': Heart,
  'Defensa Criminal': Shield,
  'Compensación Laboral': Briefcase,
};

export default function CaseResultsPageClient({ language = 'en' }: CaseResultsPageClientProps) {
  const isSpanish = language === 'es';
  const t = content[language];
  const caseResults = t.caseResults as CaseResult[];

  const categories = Array.from(new Set(caseResults.map(result => result.category)));

  // Calculate statistics
  const totalCases = caseResults.length;
  const settlementTotal = caseResults
    .filter(r => r.highlight?.includes('$'))
    .reduce((sum, r) => {
      const amount = parseInt(r.highlight?.replace(/\D/g, '') || '0');
      return sum + amount;
    }, 0);

  return (
    <PageLayout>
      <Section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-brand-charcoal mb-4">{t.title}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
            </div>

            {/* Statistics */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-brand-crimson mb-2">{totalCases}+</div>
                  <p className="text-gray-600">{t.successfulCases}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-brand-crimson mb-2">
                    ${(settlementTotal / 1000).toFixed(0)}K+
                  </div>
                  <p className="text-gray-600">{t.inSettlements}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-brand-crimson mb-2">1000+</div>
                  <p className="text-gray-600">{t.familiesHelped}</p>
                </CardContent>
              </Card>
            </div>

            {/* Case Results by Category */}
            {categories.map(category => {
              const CategoryIcon =
                categoryIcons[category as keyof typeof categoryIcons] || CheckCircle;
              const categoryResults = caseResults.filter(r => r.category === category);

              return (
                <div key={category}

                className="mb-12">
                  <div className="flex items-center mb-6">
                    <CategoryIcon className="w-8 h-8 text-brand-skyblue mr-3" />
                    <h2
                className="text-2xl font-bold text-brand-charcoal">{category}</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {categoryResults.map(result => {
                      const Icon = result.icon;
                      return (
                        <Card key={result.id}

                className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mr-4">
                                <div className="w-12 h-12 bg-brand-skyblue/10 rounded-full flex items-center justify-center">
                                  <Icon className="w-6 h-6 text-brand-skyblue" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <h3
                className="font-semibold text-lg text-brand-charcoal mb-2">
                                  {result.title}
                                </h3>
                                {result.highlight && (
                                  <div className="inline-block bg-brand-crimson text-white px-3 py-1 rounded-full text-sm font-bold mb-3">
                                    {result.highlight}
                                  </div>
                                )}
                                <p className="text-brand-skyblue font-semibold mb-2">
                                  {result.outcome}
                                </p>
                                <p className="text-gray-700">{result.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Call to Action */}
            <Card className="bg-gradient-to-br from-brand-skyblue to-brand-crimson text-white">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">{t.readyToAdd}</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">{t.readyText}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={isSpanish ? '/es/contacto' : '/contact'}

                className="inline-block bg-white text-brand-charcoal px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    {t.getStarted}
                  </a>
                  <a
                    href="tel:7043580470"
                    className="inline-block bg-transparent text-white px-8 py-3 rounded-lg font-semibold border-2 border-white hover:bg-white hover:text-brand-charcoal transition-colors"
                  >
                    {t.call} (704) 358-0470
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>{t.disclaimer}</strong> {t.disclaimerText}
              </p>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
