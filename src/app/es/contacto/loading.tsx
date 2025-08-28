export default function ContactoLoading() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-800 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-gray-800 rounded-lg w-96 mx-auto mb-2 animate-pulse" />
          <div className="h-4 bg-gray-800 rounded-lg w-80 mx-auto animate-pulse" />
        </div>

        {/* Form skeleton */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 rounded-lg p-8">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-800 rounded w-24 mb-2 animate-pulse" />
                  <div className="h-10 bg-gray-800 rounded animate-pulse" />
                </div>
              ))}
              <div className="h-12 bg-primary/20 rounded-lg animate-pulse mt-6" />
            </div>
          </div>

          {/* Contact info skeleton */}
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i}

                className="bg-gray-900 rounded-lg p-6">
                <div className="h-6 bg-gray-800 rounded w-32 mb-2 animate-pulse" />
                <div
                className="h-4 bg-gray-800 rounded w-48 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Map skeleton */}
        <div className="mt-12">
          <div className="h-96 bg-gray-900 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
