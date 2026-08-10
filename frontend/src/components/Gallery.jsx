import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function Gallery({ title = 'Gallery', images = [] }) {
  const [active, setActive] = useState(null);

  if (!images.length) return null;

  return (
    <section className="py-16 md:py-20 bg-brand-cream">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <p className="eyebrow text-brand-terracotta mb-3">{title}</p>
        <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-10">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(src)}
              className="relative aspect-[4/3] overflow-hidden rounded-sm group"
              aria-label={`View gallery image ${i + 1}`}
            >
              <img
                src={src}
                alt={`${title} ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <X className="w-8 h-8" strokeWidth={1.5} />
          </button>
          <img src={active} alt="Gallery preview" className="max-w-full max-h-full object-contain rounded-sm" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
