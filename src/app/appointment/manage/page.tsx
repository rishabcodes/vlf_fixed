'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logger, errorToLogMeta } from '@/lib/safe-logger';
import { isFuture, isPast, isToday, format, parseISO } from 'date-fns';
import { 
  Calendar, Clock, MapPin, Phone, Video, 
  CheckCircle, XCircle, AlertCircle, Search, 
  Edit2, X, ChevronLeft, ChevronRight 
} from 'lucide-react';

interface Appointment {
  id: string;
  title: string;
  type: 'consultation' | 'court' | 'deposition' | 'meeting' | 'phone' | 'video';
  date: string;
  time: string;
  duration: number;
  attorney: {
    name: string;
    email: string;
    phone?: string;
  };
  location?: string;
  videoLink?: string;
  phoneNumber?: string;
  notes?: string;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed' | 'rescheduled';
  reminder?: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AppointmentManagePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past' | 'cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/appointment/manage');
    }
  }, [status, router]);

  // Fetch appointments
  useEffect(() => {
    if (session?.user) {
      fetchAppointments();
    }
  }, [session]);

  // Apply filters
  useEffect(() => {
    let filtered = [...appointments];

    // Apply status filter
    switch (filter) {
      case 'upcoming':
        filtered = filtered.filter(
          apt => isFuture(new Date(`${apt.date} ${apt.time}`)) && apt.status !== 'cancelled'
        );
        break;
      case 'past':
        filtered = filtered.filter(
          apt => isPast(new Date(`${apt.date} ${apt.time}`)) || apt.status === 'completed'
        );
        break;
      case 'cancelled':
        filtered = filtered.filter(apt => apt.status === 'cancelled');
        break;
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        apt =>
          apt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.attorney.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by date (newest first for past, oldest first for upcoming)
    filtered.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return filter === 'past' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

    setFilteredAppointments(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [appointments, filter, searchTerm]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/client/appointments');
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments || []);
      }
    } catch (error) {
      logger.error('Error fetching appointments', errorToLogMeta(error));
    } finally {
      setLoading(false);
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
        setSelectedAppointment(null);
      }
    } catch (error) {
      logger.error('Error cancelling appointment', errorToLogMeta(error));
        }
};

  const handleRescheduleAppointment = async (appointmentId: string, newDate: string, newTime: string) => {
    try {
      const response = await fetch(`/api/client/appointments/${appointmentId}/reschedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: newDate, time: newTime }),
      });

      if (response.ok) {
        await fetchAppointments();
        setShowRescheduleModal(false);
        setSelectedAppointment(null);
      }
    } catch (error) {
      logger.error('Error rescheduling appointment', errorToLogMeta(error));
        }
};

  const getAppointmentIcon = (type: string) => {
    const icons = {
      consultation: Calendar,
      court: Calendar,
      deposition: Calendar,
      meeting: MapPin,
      phone: Phone,
      video: Video,
    };
    return icons[type as keyof typeof icons] || Calendar;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: 'text-blue-600 bg-blue-50',
      confirmed: 'text-green-600 bg-green-50',
      cancelled: 'text-red-600 bg-red-50',
      completed: 'text-gray-600 bg-gray-50',
      rescheduled: 'text-orange-600 bg-orange-50',
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-50';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      scheduled: Clock,
      confirmed: CheckCircle,
      cancelled: XCircle,
      completed: CheckCircle,
      rescheduled: AlertCircle,
    };
    return icons[status as keyof typeof icons] || AlertCircle;
  };

  // Pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Appointments</h1>
        <p className="text-gray-600 mt-2">View and manage all your appointments in one place</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Filter Tabs */}
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'all', label: 'All Appointments' },
              { value: 'upcoming', label: 'Upcoming' },
              { value: 'past', label: 'Past' },
              { value: 'cancelled', label: 'Cancelled' },
            ].map(option => (
              <button
                key={option.value}

                onClick={() => setFilter(option.value as any)}

                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="lg:ml-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow-sm border">
        {paginatedAppointments.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600">
              {filter === 'all'
                ? "You don't have any appointments yet."
                : `You don't have any ${filter} appointments.`}
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {paginatedAppointments.map(appointment => {
              const Icon = getAppointmentIcon(appointment.type);
              const StatusIcon = getStatusIcon(appointment.status);
              const appointmentDate = new Date(`${appointment.date} ${appointment.time}`);
              const isUpcoming = isFuture(appointmentDate) && appointment.status !== 'cancelled';
              
              return (
                <div
                  key={appointment.id}

                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedAppointment(appointment)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className={`p-3 rounded-lg ${
                        appointment.status === 'cancelled' ? 'bg-gray-100' : 'bg-blue-50'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          appointment.status === 'cancelled' ? 'text-gray-400' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-gray-900">{appointment.title}</h3>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            <StatusIcon className="w-3 h-3" />
                            {appointment.status}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {format(appointmentDate, 'EEEE, MMMM d, yyyy')}
                              {isToday(appointmentDate) && (
                                <span className="ml-2 text-blue-600 font-medium">Today</span>
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time} ({appointment.duration} minutes)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Attorney:</span>
                            <span>{appointment.attorney.name}</span>
                          </div>
                          {appointment.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{appointment.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {isUpcoming && (
                      <div className="flex gap-2">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setSelectedAppointment(appointment);
                            setShowRescheduleModal(true);
                          }}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleCancelAppointment(appointment.id);
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredAppointments.length)} of{' '}
              {filteredAppointments.length} appointments
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}

                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}

                onClick={() => setCurrentPage(page)}

                className={`px-3 py-1 rounded-lg ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}

                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Appointment Details Modal */}
      <>
        {selectedAppointment && !showRescheduleModal && (
          <div            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAppointment(null)}
          >
            <div              className="bg-white rounded-lg shadow-xl max-w-lg w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedAppointment.title}</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(selectedAppointment.status)}`}>
                      {React.createElement(getStatusIcon(selectedAppointment.status), { className: 'w-4 h-4' })}
                      {selectedAppointment.status}
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
                    {format(new Date(`${selectedAppointment.date} ${selectedAppointment.time}`), 'EEEE, MMMM d, yyyy')} at{' '}
                    {selectedAppointment.time}
                  </p>
                  <p className="text-sm text-gray-600">Duration: {selectedAppointment.duration} minutes</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Type</p>
                  <p className="text-gray-900 capitalize">{selectedAppointment.type}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Attorney</p>
                  <p className="text-gray-900">{selectedAppointment.attorney.name}</p>
                  <p className="text-sm text-gray-600">{selectedAppointment.attorney.email}</p>
                  {selectedAppointment.attorney.phone && (
                    <p className="text-sm text-gray-600">{selectedAppointment.attorney.phone}</p>
                  )}
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
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Join Video Call
                    </a>
                  </div>
                )}

                {selectedAppointment.phoneNumber && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <a
                      href={`tel:${selectedAppointment.phoneNumber}`}

                className="text-blue-600 hover:underline"
                    >
                      {selectedAppointment.phoneNumber}
                    </a>
                  </div>
                )}

                {selectedAppointment.notes && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Notes</p>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedAppointment.notes}</p>
                  </div>
                )}

                <div className="text-sm text-gray-500 pt-4 border-t">
                  <p>Created: {format(parseISO(selectedAppointment.createdAt), 'MMM d, yyyy h:mm a')}</p>
                  {selectedAppointment.updatedAt !== selectedAppointment.createdAt && (
                    <p>Last updated: {format(parseISO(selectedAppointment.updatedAt), 'MMM d, yyyy h:mm a')}</p>
                  )}
                </div>

                {selectedAppointment.status !== 'cancelled' && 
                 selectedAppointment.status !== 'completed' &&
                 isFuture(new Date(`${selectedAppointment.date} ${selectedAppointment.time}`)) && (
                  <div className="pt-4 flex gap-3">
                    <button
                      onClick={() => setShowRescheduleModal(true)}

                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => {
                        handleCancelAppointment(selectedAppointment.id);
        }}
 className="flex-1 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Cancel Appointment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </>

      {/* Reschedule Modal */}
      <>
        {showRescheduleModal && selectedAppointment && (
          <div            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowRescheduleModal(false);
              setSelectedAppointment(null);
            }}
          >
            <div              className="bg-white rounded-lg shadow-xl max-w-lg w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900">Reschedule Appointment</h3>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Please contact our office to reschedule your appointment. We'll help you find a new time that works for you.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 mb-6">
                  <p className="font-medium text-gray-900">Current Appointment:</p>
                  <p className="text-sm text-gray-600">{selectedAppointment.title}</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(`${selectedAppointment.date} ${selectedAppointment.time}`), 'EEEE, MMMM d, yyyy')} at {selectedAppointment.time}
                  </p>
                </div>

                <div className="space-y-3">
                  <a
                    href="tel:+19194234755"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    Call (919) 423-4755
                  </a>
                  <button
                    onClick={() => {
                      setShowRescheduleModal(false);
                      setSelectedAppointment(null);
        }}
 className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
