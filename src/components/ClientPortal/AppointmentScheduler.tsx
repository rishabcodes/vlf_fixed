'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { logger } from '@/lib/safe-logger';

import {
  Calendar,
  Clock,
  Video,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  Edit,
  User,
  FileText,
  Phone,
} from 'lucide-react';
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isSameDay,
  isToday,
  isFuture,
} from 'date-fns';

interface Appointment {
  id: string;
  title: string;
  type: 'consultation' | 'court' | 'deposition' | 'meeting' | 'phone' | 'video';
  date: string;
  time: string;
  duration: number; // in minutes
  attorney: {
    name: string;
    email: string;
  };
  location?: string;
  videoLink?: string;
  phoneNumber?: string;
  notes?: string;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  reminder?: boolean;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface ClientData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  attorneys?: {
    id: string;
    name: string;
    specialty: string;
  }[];
}

export default function AppointmentScheduler({ clientData }: { clientData: ClientData }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [formData, setFormData] = useState({
    type: 'consultation',
    attorneyId: '',
    date: '',
    time: '',
    duration: 60,
    notes: '',
  });

  const appointmentTypes = [
    { value: 'consultation', label: 'Consultation', icon: User },
    { value: 'court', label: 'Court Appearance', icon: FileText },
    { value: 'deposition', label: 'Deposition', icon: FileText },
    { value: 'meeting', label: 'In-Person Meeting', icon: MapPin },
    { value: 'phone', label: 'Phone Call', icon: Phone },
    { value: 'video', label: 'Video Conference', icon: Video },
  ];

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/client/appointments');
      const data = await response.json();
      setAppointments(data.appointments || []);
    } catch (error) {
      logger.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableSlots = useCallback(
    async (date: string) => {
      try {
        const response = await fetch(
          `/api/client/appointments/slots?date=${date}&attorneyId=${formData.attorneyId}`
        );
        const data = await response.json();
        setAvailableSlots(data.slots || []);
      } catch (error) {
        logger.error('Error fetching available slots:', error);
      }
    },
    [formData.attorneyId]
  );

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (showScheduleModal && formData.date) {
      fetchAvailableSlots(formData.date);
    }
  }, [formData.date, showScheduleModal, fetchAvailableSlots]);

  const handleScheduleAppointment = async () => {
    try {
      const response = await fetch('/api/client/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchAppointments();
        setShowScheduleModal(false);
        resetForm();
      }
    } catch (error) {
      logger.error('Error scheduling appointment:', error);
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      const response = await fetch(`/api/client/appointments/${appointmentId}/cancel`, {
        method: 'POST',
      });

      if (response.ok) {
        await fetchAppointments();
      }
    } catch (error) {
      logger.error('Error cancelling appointment:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'consultation',
      attorneyId: '',
      date: '',
      time: '',
      duration: 60,
      notes: '',
    });
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const startWeek = startOfWeek(start);
    const endWeek = endOfWeek(end);

    const days: Date[] = [];
    let day = startWeek;

    while (day <= endWeek) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(apt => isSameDay(new Date(apt.date), date));
  };

  const getAppointmentTypeIcon = (type: string) => {
    const appointmentType = appointmentTypes.find(t => t.value === type);
    return appointmentType?.icon || Calendar;
  };

  const getAppointmentColor = (type: string) => {
    const colors = {
      consultation: 'bg-blue-100 text-blue-800',
      court: 'bg-red-100 text-red-800',
      deposition: 'bg-orange-100 text-orange-800',
      meeting: 'bg-green-100 text-green-800',
      phone: 'bg-purple-100 text-purple-800',
      video: 'bg-indigo-100 text-indigo-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B1F2E]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#6B1F2E] text-white rounded-lg hover:bg-[#8B2635] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Schedule Appointment
          </button>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentMonth(addDays(currentMonth, -30))}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-semibold text-gray-900">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              <button
                onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-2">
              {['month', 'week', 'day'].map(v => (
                <button
                  key={v}
                  onClick={() => setView(v as 'month' | 'week' | 'day')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    view === v
                      ? 'bg-[#6B1F2E] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {view === 'month' && (
          <div className="p-4">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth().map((day, index) => {
                const dayAppointments = getAppointmentsForDate(day);
                const isCurrentMonth = day.getMonth() === currentMonth.getMonth();

                return (
                  <div
                    key={index}
                    className={`min-h-[100px] p-2 border rounded-lg ${
                      isToday(day) ? 'bg-blue-50 border-blue-300' : 'border-gray-200'
                    } ${!isCurrentMonth ? 'bg-gray-50' : 'bg-white'} ${
                      isSameDay(day, selectedDate) ? 'ring-2 ring-[#6B1F2E]' : ''
                    } hover:bg-gray-50 cursor-pointer`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span
                        className={`text-sm font-medium ${
                          isToday(day)
                            ? 'text-blue-600'
                            : !isCurrentMonth
                              ? 'text-gray-400'
                              : 'text-gray-900'
                        }`}
                      >
                        {format(day, 'd')}
                      </span>
                      {dayAppointments.length > 0 && (
                        <span className="bg-[#6B1F2E] text-white text-xs px-1.5 py-0.5 rounded-full">
                          {dayAppointments.length}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      {dayAppointments.slice(0, 2).map(apt => {
                        const Icon = getAppointmentTypeIcon(apt.type);
                        return (
                          <div
                            key={apt.id}
                            className={`text-xs p-1 rounded truncate ${getAppointmentColor(apt.type)}`}
                            onClick={e => {
                              e.stopPropagation();
                              setSelectedAppointment(apt);
                            }}
                          >
                            <div className="flex items-center gap-1">
                              <Icon className="w-3 h-3" />
                              <span>{apt.time}</span>
                            </div>
                          </div>
                        );
                      })}
                      {dayAppointments.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayAppointments.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Upcoming Appointments List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
        </div>
        <div className="divide-y">
          {appointments
            .filter(apt => isFuture(new Date(apt.date)) && apt.status !== 'cancelled')
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5)
            .map(appointment => {
              const Icon = getAppointmentTypeIcon(appointment.type);
              return (
                <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${getAppointmentColor(appointment.type)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{appointment.title}</h4>
                        <div className="mt-1 space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{format(new Date(appointment.date), 'EEEE, MMMM d, yyyy')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>
                              {appointment.time} ({appointment.duration} minutes)
                            </span>
                          </div>
                          {appointment.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{appointment.location}</span>
                            </div>
                          )}
                          {appointment.videoLink && (
                            <div className="flex items-center gap-2">
                              <Video className="w-4 h-4" />
                              <a
                                href={appointment.videoLink}
                                className="text-[#6B1F2E] hover:underline"
                              >
                                Join Video Call
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedAppointment(appointment)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {appointments.filter(apt => isFuture(new Date(apt.date)) && apt.status !== 'cancelled')
          .length === 0 && (
          <div className="p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Upcoming Appointments</h3>
            <p className="text-gray-600 mb-4">You don't have any scheduled appointments.</p>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="px-4 py-2 bg-[#6B1F2E] text-white rounded-lg hover:bg-[#8B2635] transition-colors"
            >
              Schedule Your First Appointment
            </button>
          </div>
        )}
      </div>

      {/* Schedule Appointment Modal */}
      <>
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowScheduleModal(false)}
          >
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">Schedule Appointment</h3>
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Appointment Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {appointmentTypes.map(type => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.value}
                          onClick={() => setFormData({ ...formData, type: type.value })}
                          className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                            formData.type === type.value
                              ? 'border-[#6B1F2E] bg-[#6B1F2E] bg-current/5'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              formData.type === type.value ? 'text-[#6B1F2E]' : 'text-gray-600'
                            }`}
                          />
                          <span
                            className={
                              formData.type === type.value
                                ? 'text-[#6B1F2E] font-medium'
                                : 'text-gray-700'
                            }
                          >
                            {type.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Attorney Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Attorney
                  </label>
                  <select
                    value={formData.attorneyId}
                    onChange={e => setFormData({ ...formData, attorneyId: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                  >
                    <option value="">Choose an attorney...</option>
                    {clientData?.attorneys?.map(
                      (attorney: { id: string; name: string; specialty: string }) => (
                        <option key={attorney.id} value={attorney.id}>
                          {attorney.name} - {attorney.specialty}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                  />
                </div>

                {/* Time Slots */}
                {formData.date && availableSlots.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Time Slots
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {availableSlots.map(slot => (
                        <button
                          key={slot.time}
                          onClick={() => setFormData({ ...formData, time: slot.time })}
                          disabled={!slot.available}
                          className={`p-2 rounded-lg text-sm transition-colors ${
                            formData.time === slot.time
                              ? 'bg-[#6B1F2E] text-white'
                              : slot.available
                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Please describe the reason for your appointment..."
                    className="w-full px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                    rows={4}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleScheduleAppointment}
                    disabled={
                      !formData.type || !formData.attorneyId || !formData.date || !formData.time
                    }
                    className="flex-1 px-4 py-2 bg-[#6B1F2E] text-white rounded-lg hover:bg-[#8B2635] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Schedule Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>

      {/* Appointment Details Modal */}
      <>
        {selectedAppointment && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAppointment(null)}
          >
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedAppointment.title}</h3>
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-sm mt-2 ${getAppointmentColor(selectedAppointment.type)}`}
                    >
                      {selectedAppointment.type}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedAppointment(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Date & Time</p>
                  <p className="text-gray-900">
                    {format(new Date(selectedAppointment.date), 'EEEE, MMMM d, yyyy')} at{' '}
                    {selectedAppointment.time}
                  </p>
                  <p className="text-sm text-gray-600">
                    Duration: {selectedAppointment.duration} minutes
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Attorney</p>
                  <p className="text-gray-900">{selectedAppointment.attorney.name}</p>
                  <p className="text-sm text-gray-600">{selectedAppointment.attorney.email}</p>
                </div>

                {selectedAppointment.location && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="text-gray-900">{selectedAppointment.location}</p>
                  </div>
                )}

                {selectedAppointment.videoLink && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Video Conference</p>
                    <a
                      href={selectedAppointment.videoLink}
                      className="text-[#6B1F2E] hover:underline"
                    >
                      Join Video Call
                    </a>
                  </div>
                )}

                {selectedAppointment.notes && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Notes</p>
                    <p className="text-gray-900">{selectedAppointment.notes}</p>
                  </div>
                )}

                <div className="pt-4 flex gap-3">
                  {selectedAppointment.status !== 'cancelled' &&
                    isFuture(new Date(selectedAppointment.date)) && (
                      <>
                        <button
                          onClick={() => {
                            // Implement reschedule logic
                            setSelectedAppointment(null);
                          }}
                          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => {
                            handleCancelAppointment(selectedAppointment.id);
                            setSelectedAppointment(null);
                          }}
                          className="flex-1 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Cancel Appointment
                        </button>
                      </>
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
