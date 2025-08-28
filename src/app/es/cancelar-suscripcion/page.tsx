import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Cancelar Suscripción | Bufete de Abogados Vasquez',
  description: 'Administre sus preferencias de correo electrónico',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cancelar-suscripcion',
    languages: {
      en: '/unsubscribe',
      es: '/es/cancelar-suscripcion',
    },
  },
};

export default function CancelarSuscripcionPage() {
  const post = {
    id: 'cancelar-suscripcion',
    title: 'Cancelar Suscripción',
    slug: 'cancelar-suscripcion',
    excerpt: 'Administre sus preferencias de suscripción de correo electrónico',
    content: `
      <div className="prose prose-lg max-w-none">
        <h2>Cancelar Suscripción de Correos Electrónicos</h2>
        
        <p>Lamentamos verlo irse. Si desea cancelar su suscripción a nuestros correos electrónicos, puede hacerlo a continuación.</p>
        
        <h3>Opciones de Cancelación de Suscripción</h3>
        
        <p>Por favor seleccione qué tipo de comunicaciones desea dejar de recibir:</p>
        
        <ul>
          <li><strong>Boletín Informativo:</strong> Actualizaciones mensuales sobre cambios legales importantes</li>
          <li><strong>Alertas de Casos:</strong> Notificaciones sobre actualizaciones de su caso</li>
          <li><strong>Promociones:</strong> Ofertas especiales y eventos del bufete</li>
          <li><strong>Todos los Correos:</strong> Cancelar toda comunicación por correo electrónico</li>
        </ul>
        
        <div className="bg-yellow-50 p-6 rounded-lg my-8">
          <p className="font-semibold mb-2">Nota Importante:</p>
          <p>Si cancela su suscripción a las alertas de casos, es posible que no reciba actualizaciones importantes sobre su caso legal. Recomendamos mantener activas las alertas de casos si tiene un asunto legal pendiente con nosotros.</p>
        </div>
        
        <h3>Proceso de Cancelación</h3>
        
        <p>Para cancelar su suscripción, por favor:</p>
        
        <ol>
          <li>Ingrese su dirección de correo electrónico a continuación</li>
          <li>Seleccione los tipos de correos que desea dejar de recibir</li>
          <li>Haga clic en "Confirmar Cancelación"</li>
          <li>Recibirá un correo de confirmación</li>
        </ol>
        
        <h3>¿Prefiere Actualizar Sus Preferencias?</h3>
        
        <p>Si prefiere recibir menos correos en lugar de cancelar completamente, puede actualizar sus preferencias de comunicación para recibir solo los tipos de mensajes que le interesan.</p>
        
        <h3>Contáctenos</h3>
        
        <p>Si tiene alguna pregunta sobre nuestras comunicaciones por correo electrónico o necesita ayuda con su suscripción, no dude en contactarnos:</p>
        
        <ul>
          <li>Teléfono: <a href="tel:+19193781525">(919) 378-1525</a></li>
          <li>Correo: <a href="mailto:info@vasquezlawnc.com">info@vasquezlawnc.com</a></li>
        </ul>
        
        <p className="mt-8 text-sm text-gray-600">Su privacidad es importante para nosotros. Para más información sobre cómo manejamos sus datos, consulte nuestra <a href="/es/politica-privacidad">Política de Privacidad</a>.</p>
      </div>
    `,
    practiceArea: 'general',
    language: 'es' as const,
    publishedAt: new Date(),
    readTime: 3,
    author: DEFAULT_BLOG_AUTHOR,
    tags: ['legal', 'privacidad', 'correo electrónico'],
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
