'use client';

interface LottieLoaderProps {
  size?: number;
  message?: string;
}

export default function LottieLoader({ size = 100, message = 'Loading...' }: LottieLoaderProps) {
  return (
    <div
      className="flex flex-col items-center justify-center p-8"
    >
      <div
        className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
      {message && (
        <p
          className="mt-4 text-white/60"
        >
          {message}
        </p>
      )}
    </div>
  );
}
