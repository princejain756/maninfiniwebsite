import React from "react";

// IMPORTANT: In production builds, using "/src/..." image paths fails because Vite
// fingerprints assets. Use import.meta.glob to resolve the final URLs at build time.
const clientImages = [
  "ACPL.jpg",
  "Aurum Enterprise.jpg",
  "Balaji Bullion.jpg",
  "CSVBULLION.jpg",
  "Jiiyaaji Bullion.jpg",
  "Karnataka Innerwear Association.jpg",
  "Radhe Jewels.jpg",
  "Rc Bullion.jpg",
  "Rotatory Bangalore Junction.jpg",
  "SEC.jpg",
];

export default function ClientsSection() {
  // Map filenames to their built asset URLs
  const modules = import.meta.glob(
    "/src/assets/Clients/*.{jpg,jpeg,png,svg}",
    { eager: true } as any
  ) as Record<string, { default: string }>;

  const imagesMap: Record<string, string> = {};
  Object.entries(modules).forEach(([path, mod]) => {
    const filename = path.split("/").pop() as string;
    imagesMap[filename] = mod.default;
  });

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Our Clients</h2>
        <p className="text-center text-gray-500 mb-10">We are proud to work with these amazing organizations.</p>
        <div className="overflow-hidden relative">
          <div
            className="flex items-center gap-8 animate-marquee hover:pause-marquee"
            style={{
              animation: 'marquee 30s linear infinite',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.animationPlayState = 'paused';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.animationPlayState = 'running';
            }}
          >
            {[...clientImages, ...clientImages].map((img, idx) => (
              <div
                key={img + idx}
                className="flex items-center justify-center transition-transform duration-300 hover:scale-105 hover:shadow-lg rounded-lg bg-gray-50 p-4"
                style={{ minWidth: '160px' }}
              >
                <img
                  src={imagesMap[img] || imagesMap[encodeURIComponent(img)] || ''}
                  alt={img.replace(/\.jpg$/, "")}
                  className="h-20 w-auto object-contain"
                  loading="lazy"
                  onError={(e) => {
                    // graceful fallback: hide broken image tile in prod
                    (e.currentTarget.parentElement as HTMLElement).style.opacity = '0.4';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
}
