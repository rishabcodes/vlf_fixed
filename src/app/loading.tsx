export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative inline-flex">
          <div className="w-16 h-16 rounded-full border-4 border-gray-300 border-t-[#C9974D] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-4 border-gray-200 border-b-[#C9974D] animate-spin animate-reverse" />
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="mt-6 space-y-2">
          <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
          <p className="text-sm text-gray-500">Please wait while we prepare your content</p>
        </div>

        {/* Progress dots */}
        <div className="mt-4 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-[#C9974D] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-[#C9974D] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-[#C9974D] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
