import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Briefcase, Clock, MessageSquare, FileText, Bell, Users, File } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Panel de Cliente - Bufete de Abogados Vásquez',
  description: 'Acceda a sus casos, documentos y citas en el portal de clientes',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/dashboard',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/dashboard',
      'es-ES': 'https://www.vasquezlawnc.com/es/dashboard',
    },
  },
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/es/auth/signin');
  }

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Bienvenido, {session.user.name || 'Cliente'}
                </h1>
                <p className="mt-1 text-sm text-gray-600">Panel de control de su cuenta</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Bell className="h-6 w-6 text-gray-400" />
                </button>
                <Link href="/es/dashboard/configuracion">
                  <Button variant="outline">Configuración</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Casos Activos</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 en progreso</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Próximas Citas</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Próxima: 15 de enero</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documentos</CardTitle>
                <File className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">3 pendientes de revisión</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mensajes</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">1 sin leer</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Link href="/es/citas/nueva">
                  <Button className="w-full" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Programar Cita
                  </Button>
                </Link>
                <Link href="/es/dashboard/documentos/subir">
                  <Button className="w-full" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Subir Documento
                  </Button>
                </Link>
                <Link href="/es/dashboard/mensajes">
                  <Button className="w-full" variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Enviar Mensaje
                  </Button>
                </Link>
                <Link href="/es/pago">
                  <Button className="w-full" variant="outline">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Hacer Pago
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-full mr-3">
                      <File className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Documento agregado</p>
                      <p className="text-xs text-gray-500">Formulario I-130 - Hace 2 días</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-full mr-3">
                      <Calendar className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Cita confirmada</p>
                      <p className="text-xs text-gray-500">15 de enero a las 10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-full mr-3">
                      <MessageSquare className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Nuevo mensaje</p>
                      <p className="text-xs text-gray-500">De: Abogado Vásquez - Hace 5 días</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cases */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Mis Casos</CardTitle>
                <Link href="/es/dashboard/casos">
                  <Button variant="ghost" size="sm">
                    Ver todos
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">Caso #2024-001</h4>
                        <p className="text-sm text-gray-600">Petición Familiar I-130</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                        En Proceso
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      Última actualización: Documentos adicionales solicitados
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      Actualizado hace 3 días
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">Caso #2024-002</h4>
                        <p className="text-sm text-gray-600">Accidente de Auto</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                        Activo
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      Última actualización: Negociando con aseguradora
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      Actualizado hace 1 semana
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Próximas Citas</CardTitle>
                <Link href="/es/citas">
                  <Button variant="ghost" size="sm">
                    Ver todas
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-secondary pl-4">
                    <h4 className="font-semibold text-sm">Consulta de Seguimiento</h4>
                    <p className="text-xs text-gray-600">15 de enero, 10:00 AM</p>
                    <p className="text-xs text-gray-500 mt-1">Con: Abogado Vásquez</p>
                  </div>
                  <div className="border-l-4 border-gray-300 pl-4">
                    <h4 className="font-semibold text-sm">Revisión de Documentos</h4>
                    <p className="text-xs text-gray-600">22 de enero, 2:00 PM</p>
                    <p className="text-xs text-gray-500 mt-1">Virtual - Zoom</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
}
