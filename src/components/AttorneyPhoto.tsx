import Image from 'next/image';

interface AttorneyPhotoProps {
  name: string;
  title: string;
  imagePath?: string;
  className?: string;
}

export default function AttorneyPhoto({
  name,
  title,
  imagePath,
  className = '',
}: AttorneyPhotoProps) {
  const altText = `${name}, ${title} at Vasquez Law Firm`;

  if (imagePath) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={imagePath}

                alt={altText}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  // Placeholder when no image is available
  return (
    <div className={`relative bg-gray-200 ${className}`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-2">
          <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <p className="text-sm text-gray-500 text-center px-4">Professional photo coming soon</p>
      </div>
    </div>
  );
}
