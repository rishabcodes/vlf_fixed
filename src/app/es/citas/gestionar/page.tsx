import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Video, MapPin, Phone, Edit, Trash2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gestionar Citas - Bufete de Abogados Vásquez',
  description: 'Gestione sus citas legales con el Bufete de Abogados Vásquez',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/citas/gestionar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/appointments/manage',
      'es-ES': 'https://www.vasquezlawnc.com/es/citas/gestionar',
    },
  },
};

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'in-person' | 'virtual' | 'phone';
  attorney: string;
  location?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
}

const appointments: Appointment[] = [
  {
    id: '1',
    title: 'Consulta Inicial - Inmigración',
    date: '2025-01-15',
    time: '10:00 AM',
    type: 'in-person',
    attorney: 'Abogado William Vásquez',
    location: 'Oficina de Raleigh',
    status: 'confirmed',
    notes: 'Traer todos los documentos de inmigración',
  },
  {
    id: '2',
    title: 'Seguimiento de Caso',
    date: '2025-01-22',
    time: '2:00 PM',
    type: 'virtual',
    attorney: 'Abogada María García',
    status: 'confirmed',
    notes: 'Revisión de progreso del caso I-130',
  },
  {
    id: '3',
    title: 'Consulta de Accidente',
    date: '2025-01-08',
    time: '3:30 PM',
    type: 'phone',
    attorney: 'Abogado Juan Pérez',
    status: 'completed',
    notes: 'Discusión sobre acuerdo de compensación',
  },
];

export default function ManageAppointmentsPage() {
  const upcomingAppointments = appointments.filter(
    apt => apt.status === 'confirmed' || apt.status === 'pending'
  );
  const pastAppointments = appointments.filter(
    apt => apt.status === 'completed' || apt.status === 'cancelled'
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Mis Citas</h1>
                <p className="mt-2 text-gray-600">
                  Gestione sus citas programadas con nuestro bufete
                </p>
              </div>
              <Link href="/es/citas/nueva">
                <Button className="bg-secondary hover:bg-secondary-dark">
                  <Calendar className="mr-2 h-4 w-4" />
                  Nueva Cita
                </Button>
              </Link>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Próximas Citas</h2>
            {upcomingAppointments.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">No tiene citas programadas</p>
                  <Link href="/es/citas/nueva">
                    <Button variant="outline">Programar una Cita</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {upcomingAppointments.map(appointment => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-lg font-semibold mr-3">{appointment.title}</h3>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded ${
                                appointment.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {appointment.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              {new Date(appointment.date).toLocaleDateString('es-ES', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </div>

                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              {appointment.time}
                            </div>

                            <div className="flex items-center">
                              {appointment.type === 'in-person' && (
                                <MapPin className="h-4 w-4 mr-2" />
                              )}
                              {appointment.type === 'virtual' && (
                                <Video className="h-4 w-4 mr-2" />
                              )}
                              {appointment.type === 'phone' && (
                                <Phone className="h-4 w-4 mr-2" />
                              )}
                              {appointment.type === 'in-person' && appointment.location}
                              {appointment.type === 'virtual' && 'Reunión Virtual'}
                              {appointment.type === 'phone' && 'Llamada Telefónica'}
                            </div>

                            <div className="flex items-center">
                              <span className="font-medium mr-2">Con:</span>
                              {appointment.attorney}
                            </div>
                          </div>

                          {appointment.notes && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-md">
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Notas:</span> {appointment.notes}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 mt-4 md:mt-0 md:ml-6">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Past Appointments */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Citas Anteriores</h2>
            {pastAppointments.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-gray-600">No hay citas anteriores</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {pastAppointments.map(appointment => (
                  <Card key={appointment.id}

                className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3
                className="font-medium">{appointment.title}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <span>{new Date(appointment.date).toLocaleDateString('es-ES')}</span>
                            <span>{appointment.time}</span>
                            <span>{appointment.attorney}</span>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            appointment.status === 'completed'
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {appointment.status === 'completed' ? 'Completada' : 'Cancelada'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Help Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>¿Necesita Ayuda con sus Citas?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Cambiar o Cancelar</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Por favor notifíquenos con al menos 24 horas de anticipación si necesita cambiar
                    o cancelar su cita.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="tel:18449673536">
                      <Phone className="h-4 w-4 mr-2" />
                      Llamar Ahora
                    </a>
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Preparación para su Cita</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Asegúrese de traer todos los documentos relevantes y llegue 10 minutos antes de
                    su cita.
                  </p>
                  <Link href="/es/recursos/preparacion-cita">
                    <Button variant="outline" size="sm">
                      Ver Guía
                    </Button>
                  </Link>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Citas Virtuales</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Para citas virtuales, recibirá un enlace por correo electrónico 30 minutos antes
                    de la cita.
                  </p>
                  <Link href="/es/recursos/citas-virtuales">
                    <Button variant="outline" size="sm">
                      Más Información
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
