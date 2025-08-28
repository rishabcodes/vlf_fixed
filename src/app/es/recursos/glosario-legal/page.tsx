import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glosario Legal - Términos Legales Comunes Explicados | Vasquez Law Firm',
  description:
    'Comprenda los términos legales comunes con nuestro glosario legal completo. Explicaciones claras para ayudarle a navegar el sistema legal.',
};

export default function GlosarioLegalPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Glosario Legal</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-8">
            Comprender la terminología legal es importante al navegar por el sistema legal. Nuestro
            glosario proporciona explicaciones claras de términos legales comunes.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold">Declaración Jurada</h3>
              <p>Una declaración escrita hecha bajo juramento.</p>
            </div>
            <div>
              <h3 className="font-bold">Demandado</h3>
              <p>La persona o entidad demandada o acusada en un procedimiento legal.</p>
            </div>
            <div>
              <h3 className="font-bold">Demandante</h3>
              <p>La persona o entidad que inicia una demanda.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
