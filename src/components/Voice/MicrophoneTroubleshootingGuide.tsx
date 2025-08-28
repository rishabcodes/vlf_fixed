'use client';

import React, { useState } from 'react';
import { Mic, AlertCircle, CheckCircle, Settings, RefreshCw } from 'lucide-react';

interface MicrophoneTroubleshootingGuideProps {
  language: 'en' | 'es';
  isOpen: boolean;
  onClose: () => void;
}

export const MicrophoneTroubleshootingGuide: React.FC<MicrophoneTroubleshootingGuideProps> = ({
  language,
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = language === 'es' ? [
    {
      title: "Verificar conexión del micrófono",
      description: "Asegúrate de que tu micrófono esté conectado y funcionando",
      icon: <Mic className="w-6 h-6" />,
      instructions: [
        "Conecta tu micrófono si es externo",
        "Verifica que esté encendido",
        "Prueba hablar y observa si hay actividad de audio"
      ]
    },
    {
      title: "Permitir acceso en el navegador",
      description: "Concede permisos de micrófono cuando se soliciten",
      icon: <Settings className="w-6 h-6" />,
      instructions: [
        "Busca el ícono de micrófono en la barra de direcciones",
        "Haz clic en 'Permitir' cuando aparezca la solicitud",
        "Si ya negaste el acceso, haz clic en el ícono de candado/micrófono"
      ]
    },
    {
      title: "Verificar configuración del sistema",
      description: "Revisa la configuración de audio de tu sistema operativo",
      icon: <Settings className="w-6 h-6" />,
      instructions: [
        "Windows: Configuración > Privacidad > Micrófono",
        "Mac: Preferencias > Seguridad > Privacidad > Micrófono", 
        "Asegúrate de que tu navegador tenga permisos"
      ]
    },
    {
      title: "Recargar la página",
      description: "Actualiza la página para aplicar los cambios",
      icon: <RefreshCw className="w-6 h-6" />,
      instructions: [
        "Presiona F5 o Ctrl+R (Cmd+R en Mac)",
        "O haz clic en el botón de recarga del navegador",
        "Vuelve a intentar usar el chat de voz"
      ]
    }
  ] : [
    {
      title: "Check microphone connection",
      description: "Make sure your microphone is connected and working",
      icon: <Mic className="w-6 h-6" />,
      instructions: [
        "Connect your microphone if it's external",
        "Verify it's turned on",
        "Try speaking and watch for audio activity"
      ]
    },
    {
      title: "Allow browser access",
      description: "Grant microphone permissions when prompted",
      icon: <Settings className="w-6 h-6" />,
      instructions: [
        "Look for the microphone icon in the address bar",
        "Click 'Allow' when the permission prompt appears",
        "If you already denied access, click the lock/microphone icon"
      ]
    },
    {
      title: "Check system settings",
      description: "Review your operating system's audio settings",
      icon: <Settings className="w-6 h-6" />,
      instructions: [
        "Windows: Settings > Privacy > Microphone",
        "Mac: System Preferences > Security & Privacy > Microphone",
        "Make sure your browser has permission"
      ]
    },
    {
      title: "Reload the page",
      description: "Refresh the page to apply changes",
      icon: <RefreshCw className="w-6 h-6" />,
      instructions: [
        "Press F5 or Ctrl+R (Cmd+R on Mac)",
        "Or click the browser's reload button",
        "Try the voice chat again"
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      <div        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div          className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-yellow-500" />
                {language === 'es' ? 'Solución de problemas de micrófono' : 'Microphone Troubleshooting'}
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={index}

                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    currentStep === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }` onClick={() => setCurrentStep(currentStep === index ? -1 : index)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      currentStep === index ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                    <div className={`transform transition-transform ${
                      currentStep === index ? 'rotate-180' : ''
                    }`}>
                      ▼
                    </div>
                  </div>

                  <>
                    {currentStep === index && (
                      <div                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <ul className="space-y-2">
                          {step.instructions.map((instruction, idx) => (
                            <li key={idx}

                className="flex items-start gap-2 text-sm text-gray-700">
                              <CheckCircle
                className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {instruction}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <strong>{language === 'es' ? 'Nota importante:' : 'Important note:'}</strong>
                  <p className="mt-1">
                    {language === 'es'
                      ? 'El acceso al micrófono puede requerir HTTPS en algunos navegadores. Si el problema persiste, contacta nuestro soporte técnico.'
                      : 'Microphone access may require HTTPS in some browsers. If the problem persists, contact our technical support.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {language === 'es' ? 'Cerrar' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
}
