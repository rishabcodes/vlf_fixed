import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Glossary - Common Legal Terms Explained | Vasquez Law Firm',
  description:
    'Understand common legal terms with our comprehensive legal glossary. Clear explanations to help you navigate the legal system.',
};

export default function LegalGlossaryPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Legal Glossary</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-8">
            Understanding legal terminology is important when navigating the legal system. Our
            glossary provides clear explanations of common legal terms.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold">Affidavit</h3>
              <p>A written statement made under oath.</p>
            </div>
            <div>
              <h3 className="font-bold">Defendant</h3>
              <p>The person or entity being sued or accused in a legal proceeding.</p>
            </div>
            <div>
              <h3 className="font-bold">Plaintiff</h3>
              <p>The person or entity who initiates a lawsuit.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
