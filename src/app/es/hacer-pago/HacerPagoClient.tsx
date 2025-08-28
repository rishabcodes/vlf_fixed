'use client';

import {
  CreditCard,
  Lock,
  Shield,
  CheckCircle,
  Phone,
  Mail,
  DollarSign,
  FileText,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function HacerPagoClient() {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentType, setPaymentType] = useState('invoice');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const paymentMethods = [
    {
      name: 'Tarjeta de Crédito/Débito',
      description: 'Visa, Mastercard, American Express, Discover',
      icon: <CreditCard className="w-8 h-8 text-blue-500" />,
      available: true,
    },
    {
      name: 'Transferencia Bancaria',
      description: 'ACH o transferencia directa',
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      available: true,
    },
    {
      name: 'Cheque o Money Order',
      description: 'Por correo o en persona',
      icon: <FileText className="w-8 h-8 text-purple-500" />,
      available: true,
    },
    {
      name: 'Plan de Pago',
      description: 'Opciones flexibles disponibles',
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      available: true,
    },
  ];

  const securityFeatures = [
    'Encriptación SSL de 256 bits',
    'Cumplimiento PCI DSS Nivel 1',
    'Protección contra fraude 24/7',
    'Garantía de transacción segura',
  ];

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process the payment
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div
className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Lock className="w-5 h-5 text-secondary-400" />
              <span className="text-sm font-medium">Portal de Pago Seguro</span>
            </div>

            <h1
className="text-4xl md:text-6xl font-bold mb-6"
            >
              Hacer un Pago
            </h1>

            <p
className="text-xl text-gray-200"
            >
              Pague su factura legal de manera segura y conveniente
            </p>
          </div>
        </div>
      </section>

      {/* Security Banner */}
      <section className="bg-green-50 border-b border-green-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 text-green-800">
            <Shield className="w-5 h-5" />
            <p className="text-sm font-medium">
              Todas las transacciones están protegidas con encriptación de nivel bancario
            </p>
          </div>
        </div>
      </section>

      {/* Payment Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Payment Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">Información de Pago</h2>

                  <form onSubmit={handlePayment} className="space-y-6">
                    {/* Payment Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Pago
                      </label>
                      <select
                        value={paymentType}
      onChange={e => setPaymentType(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="invoice">Pago de Factura</option>
                        <option value="retainer">Anticipo de Honorarios</option>
                        <option value="consultation">Consulta</option>
                        <option value="other">Otro</option>
                      </select>
                    </div>

                    {/* Amount */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monto a Pagar
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          value={paymentAmount}
      onChange={e => setPaymentAmount(e.target.value)}
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                          required
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Invoice Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número de Factura (Opcional)
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: INV-2025-001"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    {/* Client Information */}
                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-semibold">Información del Cliente</h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Nombre"
                          required
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Apellido"
                          required
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>

                      <input
                        type="email"
                        placeholder="Correo Electrónico"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />

                      <input
                        type="tel"
                        placeholder="Teléfono"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    {/* Payment Methods */}
                    <div className="pt-4 border-t">
                      <h3 className="font-semibold mb-4">Método de Pago</h3>
                      <div className="grid gap-3">
                        {paymentMethods.map((method, index) => (
                          <label
                            key={index}

                className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                              method.available ? '' : 'opacity-50 cursor-not-allowed'
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              disabled={!method.available}
                              className="w-4 h-4 text-primary-600"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                {method.icon}
                                <div>
                                  <p className="font-medium">{method.name}</p>
                                  <p className="text-sm text-gray-600">{method.description}</p>
                                </div>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Lock className="w-5 h-5" />
                      Procesar Pago Seguro
                    </button>

                    {/* Security Note */}
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <Shield className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-600">
                        Su información de pago está protegida con encriptación SSL de 256 bits.
                        Nunca almacenamos información de tarjetas de crédito en nuestros servidores.
                      </p>
                    </div>
                  </form>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Security Features */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary-600" />
                    Pago 100% Seguro
                  </h3>
                  <ul className="space-y-3">
                    {securityFeatures.map((feature, index) => (
                      <li key={index}

                className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span
                className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Support */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                    ¿Necesita Ayuda?
                  </h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Si tiene preguntas sobre su factura o necesita asistencia con el pago, estamos
                    aquí para ayudar.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="tel:1-844-967-3536"
                      className="flex items-center gap-3 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      <Phone className="w-5 h-5" />
                      1-844-YO-PELEO
                    </a>
                    <a
                      href="mailto:pagos@vasquezlawnc.com"
                      className="flex items-center gap-3 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      <Mail className="w-5 h-5" />
                      pagos@vasquezlawnc.com
                    </a>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="bg-yellow-50 rounded-xl p-6">
                  <h3 className="font-semibold mb-3">Opciones de Pago Flexibles</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Entendemos que cada situación es única. Ofrecemos planes de pago personalizados
                    para adaptarnos a su presupuesto.
                  </p>
                  <Link
                    href="/es/contacto"
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    Consultar sobre planes de pago →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">¡Pago Procesado!</h3>
            <p className="text-gray-600 mb-6">
              Su pago ha sido procesado exitosamente. Recibirá un recibo por correo electrónico en
              los próximos minutos.
            </p>
            <button
              onClick={() => setShowConfirmation(false)}

                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Preguntas Frecuentes sobre Pagos
            </h2>
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-3">¿Es seguro pagar en línea?</h3>
                <p className="text-gray-600">
                  Absolutamente. Utilizamos la misma tecnología de encriptación que los bancos
                  principales. Su información está completamente protegida.
                </p>
              </div>
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-3">¿Qué métodos de pago aceptan?</h3>
                <p className="text-gray-600">
                  Aceptamos tarjetas de crédito/débito (Visa, Mastercard, AmEx, Discover),
                  transferencias bancarias, cheques y money orders. También ofrecemos planes de
                  pago.
                </p>
              </div>
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-3">¿Cuándo recibiré mi recibo?</h3>
                <p className="text-gray-600">
                  Enviamos recibos electrónicos inmediatamente después de procesar su pago. Si no lo
                  recibe en 30 minutos, revise su carpeta de spam o contáctenos.
                </p>
              </div>
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-3">¿Puedo hacer pagos parciales?</h3>
                <p className="text-gray-600">
                  Sí, ofrecemos opciones de pago flexible. Contacte a nuestro departamento de
                  facturación para establecer un plan de pago que funcione para usted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
