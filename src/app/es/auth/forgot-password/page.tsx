import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Recuperar Contraseña - Bufete de Abogados Vásquez',
  description: 'Recupere el acceso a su cuenta del portal de clientes',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/auth/forgot-password',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/auth/forgot-password',
      'es-ES': 'https://www.vasquezlawnc.com/es/auth/forgot-password',
    },
  },
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Recuperar Su Contraseña
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Ingrese su correo electrónico y le enviaremos instrucciones para restablecer su contraseña.
            </p>
          </div>
          
          <form className="mt-8 space-y-6" action="#" method="POST">
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
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-secondary-light group-hover:text-secondary-lighter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                Enviar Instrucciones
              </button>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                ¿Recordó su contraseña?{' '}
                <Link href="/es/auth/signin" className="font-medium text-secondary hover:text-secondary-dark">
                  Iniciar sesión
                </Link>
              </p>
              <p className="text-sm text-gray-600">
                ¿No tiene una cuenta?{' '}
                <Link href="/es/auth/signup" className="font-medium text-secondary hover:text-secondary-dark">
                  Crear cuenta
                </Link>
              </p>
            </div>
          </form>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Nota de Seguridad
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Por su seguridad, el enlace de restablecimiento expirará en 24 horas. Si no recibe el correo en 10 minutos, revise su carpeta de spam.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿Necesita ayuda inmediata? Llámenos al{' '}
              <a href="tel:18449673536" className="font-medium text-secondary hover:text-secondary-dark">
                1-844-YO-PELEO
              </a>
            </p>
          </div>
        </div>
      </div>
  );
}
