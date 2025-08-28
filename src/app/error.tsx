'use client';

import { useEffect, useState } from 'react';
import { logger } from '@/lib/safe-logger';
// import * as Sentry from '@sentry/nextjs';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  useEffect(() => {
    // Log the error to error reporting service
    logger.error('Application error occurred', error);

    // Temporarily disabled Sentry due to missing dependencies
    // TODO: Re-enable after fixing OpenTelemetry dependencies
    /*
    // Report to Sentry with context
    Sentry.captureException(error, {
      tags: {
        component: 'app-error-boundary',
        digest: error.digest,
        language,
      },
      level: 'error',
      contexts: {
        react: {
          componentStack: error.stack || 'No stack trace available',
        },
      },
    });
    */
  }, [error, language]);

  const content = {
    en: {
      title: 'Something went wrong!',
      subtitle: 'We apologize for the inconvenience.',
      description:
        'An unexpected error occurred. Our team has been notified and is working to fix the issue.',
      tryAgain: 'Try Again',
      goHome: 'Go Home',
      contactSupport: 'Contact Support',
      errorCode: 'Error Code',
      whatHappened: 'What happened?',
      whatToDo: 'What can you do?',
      suggestions: [
        'Refresh the page',
        'Clear your browser cache',
        'Try again in a few minutes',
        'Contact us if the problem persists',
      ],
    },
    es: {
      title: '¡Algo salió mal!',
      subtitle: 'Pedimos disculpas por las molestias.',
      description:
        'Ocurrió un error inesperado. Nuestro equipo ha sido notificado y está trabajando para solucionar el problema.',
      tryAgain: 'Intentar de Nuevo',
      goHome: 'Ir al Inicio',
      contactSupport: 'Contactar Soporte',
      errorCode: 'Código de Error',
      whatHappened: '¿Qué pasó?',
      whatToDo: '¿Qué puedes hacer?',
      suggestions: [
        'Actualizar la página',
        'Limpiar el caché del navegador',
        'Intentar de nuevo en unos minutos',
        'Contáctanos si el problema persiste',
      ],
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div
          className="text-center"
        >
          {/* Language Toggle */}
          <div className="flex justify-center gap-2 mb-8">
            <button
              onClick={() => setLanguage('en')}

                className={`px-3 py-1 text-sm rounded ${
                language === 'en'
                  ? 'bg-[#188bf6] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('es')}

                className={`px-3 py-1 text-sm rounded ${
                language === 'es'
                  ? 'bg-[#188bf6] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ES
            </button>
          </div>

          {/* Error Icon */}
          <div
            className="mb-8"
          >
            <div className="text-8xl mb-4">⚠️</div>
          </div>

          {/* Content */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-xl text-[#950e02] font-semibold mb-2">{t.subtitle}</p>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{t.description}</p>

          {/* Error Details */}
          {error.digest && (
            <div className="bg-gray-100 rounded-lg p-4 mb-8 max-w-md mx-auto">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">{t.errorCode}:</span> {error.digest}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={reset}

              className="px-8 py-3 bg-[#188bf6] text-white rounded-md font-semibold hover:bg-[#0e5ca8] transition-colors"
            >
              🔄 {t.tryAgain}
            </button>
            <Link
              href="/"
              className="px-8 py-3 border-2 border-[#188bf6] text-[#188bf6] rounded-md font-semibold hover:bg-[#188bf6] hover:text-white transition-colors"
            >
              🏠 {t.goHome}
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-[#950e02] text-white rounded-md font-semibold hover:bg-[#6b0a01] transition-colors"
            >
              📞 {t.contactSupport}
            </Link>
          </div>

          {/* Help Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.whatHappened}</h3>
              <p className="text-sm text-gray-600">
                {language === 'en'
                  ? 'A technical error occurred while processing your request. This could be due to a temporary issue with our servers or an unexpected problem with the page.'
                  : 'Ocurrió un error técnico al procesar su solicitud. Esto podría deberse a un problema temporal con nuestros servidores o un problema inesperado con la página.'}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.whatToDo}</h3>
              <ul className="space-y-2">
                {t.suggestions.map((suggestion, index) => (
                  <li key={index}

                    className="flex items-start text-sm text-gray-600">
                    <span
                      className="text-green-500 mr-2">✓</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Assistant */}
          <div className="mt-12 bg-gradient-to-r from-[#188bf6] to-[#0e5ca8] rounded-lg p-6 text-white max-w-2xl mx-auto">
            <div className="text-4xl mb-3">🤖</div>
            <p className="text-lg font-semibold mb-2">
              {language === 'en' ? 'Need Immediate Help?' : '¿Necesita Ayuda Inmediata?'}
            </p>
            <p className="text-sm mb-4">
              {language === 'en'
                ? 'Our AI assistant is available 24/7 to help you navigate our services'
                : 'Nuestro asistente de IA está disponible 24/7 para ayudarle a navegar nuestros servicios'}
            </p>
            <button className="px-6 py-2 bg-white text-[#188bf6] rounded-md font-medium hover:bg-gray-100 transition-colors">
              {language === 'en' ? 'Chat Now' : 'Chatear Ahora'}
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-gray-600">
            <p className="text-sm">📞 1-844-YO-PELEO (967-3536) | 📧 leads@vasquezlawfirm.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
