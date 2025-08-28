import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Crear Cuenta - Bufete de Abogados Vásquez',
  description: 'Cree una cuenta para acceder al portal de clientes del Bufete de Abogados Vásquez',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/auth/signup',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/auth/signup',
      'es-ES': 'https://www.vasquezlawnc.com/es/auth/signup',
    },
  },
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Crear Su Cuenta
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              O{' '}
              <Link href="/es/auth/signin" className="font-medium text-secondary hover:text-secondary-dark">
                inicie sesión en su cuenta existente
              </Link>
            </p>
          </div>
          
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                    placeholder="Juan"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Apellido
                  </label>
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                    placeholder="Pérez"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                  placeholder="juan.perez@ejemplo.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Número de Teléfono
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                  placeholder="(919) 555-0123"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                  placeholder="Mínimo 8 caracteres"
                />
              </div>

              <div>
                <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700">
                  Confirmar Contraseña
                </label>
                <input
                  id="password-confirm"
                  name="passwordConfirm"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                  placeholder="Repita su contraseña"
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agree-terms"
                    name="agreeTerms"
                    type="checkbox"
                    className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agree-terms" className="font-medium text-gray-700">
                    Acepto los{' '}
                    <Link href="/es/terminos-servicio" className="text-secondary hover:text-secondary-dark">
                      términos de servicio
                    </Link>{' '}
                    y la{' '}
                    <Link href="/es/politica-privacidad" className="text-secondary hover:text-secondary-dark">
                      política de privacidad
                    </Link>
                  </label>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="marketing-emails"
                    name="marketingEmails"
                    type="checkbox"
                    className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="marketing-emails" className="font-medium text-gray-700">
                    Deseo recibir actualizaciones legales y noticias del bufete
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-secondary-light group-hover:text-secondary-lighter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </span>
                Crear Cuenta
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">O regístrese con</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="ml-2">Google</span>
                  </button>
                </div>

                <div>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="ml-2">Facebook</span>
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿Necesita ayuda? Contáctenos al{' '}
              <a href="tel:18449673536" className="font-medium text-secondary hover:text-secondary-dark">
                1-844-YO-PELEO
              </a>
            </p>
          </div>
        </div>
      </div>
  );
}
