'use client';

import React, { useState } from 'react';

import { 
  Phone, 
  Calendar,
  Clock,
  User,
  Globe,
  MessageSquare,
  Check,
  AlertCircle,
  Loader2,
  X,
  PhoneCall,
  PhoneIncoming
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logger } from '@/lib/safe-logger';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface CallbackFormData {
  name: string;
  phone: string;
  email?: string;
  preferredTime: string;
  preferredDate: string;
  language: 'en' | 'es';
  topic: string;
  urgency: 'normal' | 'urgent' | 'emergency';
  message?: string;
}

const timeSlots: TimeSlot[] = [
  { id: '9am', time: '9:00 AM', available: true },
  { id: '10am', time: '10:00 AM', available: true },
  { id: '11am', time: '11:00 AM', available: true },
  { id: '12pm', time: '12:00 PM', available: true },
  { id: '1pm', time: '1:00 PM', available: true },
  { id: '2pm', time: '2:00 PM', available: true },
  { id: '3pm', time: '3:00 PM', available: true },
  { id: '4pm', time: '4:00 PM', available: true },
  { id: '5pm', time: '5:00 PM', available: true },
];

const topics = [
  { value: 'immigration', label: 'Immigration', labelEs: 'Inmigración' },
  { value: 'personal-injury', label: 'Personal Injury', labelEs: 'Lesiones Personales' },
  { value: 'workers-comp', label: "Workers\' Compensation", labelEs: 'Compensación Laboral' },
  { value: 'criminal-defense', label: 'Criminal Defense', labelEs: 'Defensa Criminal' },
  { value: 'family-law', label: 'Family Law', labelEs: 'Derecho Familiar' },
  { value: 'general', label: 'General Inquiry', labelEs: 'Consulta General' },
];

export function RetellCallbackWidget({ 
  className,
  locale = 'en' 
}: { 
  className?: string;
  locale?: 'en' | 'es';
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<CallbackFormData>({
    name: '',
    phone: '',
    email: '',
    preferredTime: '',
    preferredDate: new Date().toISOString().split('T')[0] || '',
    language: locale ?? 'en',
    topic: 'general',
    urgency: 'normal',
    message: ''
  });

  const handleImmediateCall = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/retell/initiate-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'immediate',
          language: locale
        })
      });

      if (!response.ok) throw new Error('Failed to initiate call');

      const data = await response.json();
      
      // Show success message with phone number
      setSubmitStatus('success');
      
    } catch (error) {
      logger.error('Failed to initiate immediate call:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScheduleCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/retell/schedule-callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to schedule callback');

      setSubmitStatus('success');
      setTimeout(() => {
        setShowForm(false);
        setIsOpen(false);
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      logger.error('Failed to schedule callback:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const urgencyColors = {
    normal: 'bg-blue-100 text-blue-700',
    urgent: 'bg-orange-100 text-orange-700',
    emergency: 'bg-red-100 text-red-700'
  };

  return (
    <>
      {/* Floating Call Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-24 right-6 z-40 bg-gradient-to-r from-green-600 to-green-700",
          "text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 group",
          className
        )}
      >
        <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <span
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
        />
      </button>

      {/* Callback Modal */}
      <>
        {isOpen && (
          <div
className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setIsOpen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <PhoneCall className="w-6 h-6" />
                    {locale === 'es' ? 'Hablemos' : 'Let\'s Talk'}
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-white/20 p-1 rounded transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="mt-2 text-white/90">
                  {locale === 'es' 
                    ? 'Elija cómo le gustaría conectarse con nosotros'
                    : 'Choose how you\'d like to connect with us'}
                </p>
              </div>

              {!showForm ? (
                <div className="p-6 space-y-4">
                  {/* Call Now Option */}
                  <button
                    onClick={handleImmediateCall}
                    disabled={isSubmitting}
                    className="w-full p-4 bg-green-50 border-2 border-green-200 rounded-xl hover:bg-green-100 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-600 text-white rounded-full group-hover:bg-green-700 transition">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900">
                            {locale === 'es' ? 'Llamar Ahora' : 'Call Now'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {locale === 'es' 
                              ? 'Conéctese con un agente inmediatamente'
                              : 'Connect with an agent immediately'}
                          </p>
                        </div>
                      </div>
                      <PhoneIncoming className="w-5 h-5 text-green-600" />
                    </div>
                  </button>

                  {/* Schedule Callback Option */}
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full p-4 bg-blue-50 border-2 border-blue-200 rounded-xl hover:bg-blue-100 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-600 text-white rounded-full group-hover:bg-blue-700 transition">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900">
                            {locale === 'es' ? 'Programar Llamada' : 'Schedule Callback'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {locale === 'es' 
                              ? 'Nosotros le llamamos cuando le convenga'
                              : 'We\'ll call you at your convenience'}
                          </p>
                        </div>
                      </div>
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                  </button>

                  {/* Success/Error Messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-100 border border-green-300 rounded-lg"
                    >
                      <div className="flex items-center gap-2 text-green-700">
                        <Check className="w-5 h-5" />
                        <p className="font-medium">
                          {locale === 'es' 
                            ? '¡Conectando! Por favor espere...'
                            : 'Connecting! Please wait...'}
                        </p>
                      </div>
                      <p className="text-sm text-green-600 mt-1">
                        {locale === 'es'
                          ? 'Llame al 1-844-YO-PELEO si necesita ayuda'
                          : 'Call 1-844-YO-PELEO if you need assistance'}
                      </p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-100 border border-red-300 rounded-lg"
                    >
                      <div className="flex items-center gap-2 text-red-700">
                        <AlertCircle className="w-5 h-5" />
                        <p className="font-medium">
                          {locale === 'es' 
                            ? 'Error al conectar'
                            : 'Connection Error'}
                        </p>
                      </div>
                      <p className="text-sm text-red-600 mt-1">
                        {locale === 'es'
                          ? 'Por favor llame directamente al 1-844-YO-PELEO'
                          : 'Please call directly at 1-844-YO-PELEO'}
                      </p>
                    </div>
                  )}

                  {/* Direct Call Info */}
                  <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      {locale === 'es' ? 'O llame directamente:' : 'Or call directly:'}
                    </p>
                    <a href="tel:1-844-965-3536" className="text-2xl font-bold text-primary-600 hover:text-primary-700">
                      1-844-YO-PELEO
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleScheduleCallback} className="p-6 space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {locale === 'es' ? 'Nombre' : 'Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {locale === 'es' ? 'Teléfono' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  {/* Topic */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {locale === 'es' ? 'Tema' : 'Topic'}
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      {topics.map(topic => (
                        <option key={topic.value} value={topic.value}>
                          {locale === 'es' ? topic.labelEs : topic.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Urgency */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'es' ? 'Urgencia' : 'Urgency'}
                    </label>
                    <div className="flex gap-2">
                      {(['normal', 'urgent', 'emergency'] as const).map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setFormData({ ...formData, urgency: level })}
                          className={cn(
                            'flex-1 px-3 py-2 rounded-lg font-medium transition',
                            formData.urgency === level 
                              ? urgencyColors[level]
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          )}
                        >
                          {locale === 'es' 
                            ? level === 'normal' ? 'Normal' : level === 'urgent' ? 'Urgente' : 'Emergencia'
                            : level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {locale === 'es' ? 'Fecha' : 'Date'}
                      </label>
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {locale === 'es' ? 'Hora' : 'Time'}
                      </label>
                      <select
                        required
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">{locale === 'es' ? 'Seleccionar' : 'Select'}</option>
                        {timeSlots.map(slot => (
                          <option
                            key={slot.id}
                            value={slot.time}
                            disabled={!slot.available}>
                            {slot.time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      {locale === 'es' ? 'Atrás' : 'Back'}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                      ) : (
                        locale === 'es' ? 'Programar' : 'Schedule'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </>
    </>
  );
}
