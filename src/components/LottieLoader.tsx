'use client';

// Lottie removed - use CSS animations instead;

// Simple loading animation data
const loadingAnimation = {
  v: '5.5.7',
  fr: 60,
  ip: 0,
  op: 120,
  w: 200,
  h: 200,
  nm: 'Loading',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Shape Layer 1',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] },
            { t: 120, s: [360] },
          ],
        },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'rc',
              d: 1,
              s: { a: 0, k: [80, 80] },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 10 },
            },
            {
              ty: 'st',
              c: { a: 0, k: [0.486, 0.114, 0.114, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 6 },
              lc: 2,
              lj: 1,
              ml: 4,
              bm: 0,
              d: [
                {
                  n: 'd',
                  nm: 'dash',
                  v: { a: 0, k: 200 },
                },
                {
                  n: 'o',
                  nm: 'offset',
                  v: {
                    a: 1,
                    k: [
                      {
                        i: { x: [0.833], y: [0.833] },
                        o: { x: [0.167], y: [0.167] },
                        t: 0,
                        s: [0],
                      },
                      { t: 120, s: [400] },
                    ],
                  },
                },
              ],
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
            },
          ],
          nm: 'Rectangle 1',
          np: 2,
          cix: 2,
          bm: 0,
          ix: 1,
        },
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0,
    },
  ],
};

interface LottieLoaderProps {
  size?: number;
  message?: string;
}

export default function LottieLoader({ size = 100, message = 'Loading...' }: LottieLoaderProps) {
  return (
    <div
className="flex flex-col items-center justify-center p-8"
    >
      <Lottie animationData={loadingAnimation} loop={true}} />
      {message && (
        <p
className="mt-4 text-white/60"
        >
          {message}
        </p>
      )}
    </div>
  );
