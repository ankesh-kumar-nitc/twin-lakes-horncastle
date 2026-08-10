import React from 'react';

export default function PageHero({ eyebrow, title, image, small = false, blur = false }) {
  return (
    <section className={`relative w-full ${small ? 'h-[60vh] min-h-[420px]' : 'h-[75vh] min-h-[520px]'} overflow-hidden`}>
      <img src={image} alt={title} className={`absolute inset-0 w-full h-full object-cover ${blur ? 'blur-md scale-110' : ''}`} />
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 flex items-end pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full text-white fade-in">
          {eyebrow && <p className="eyebrow mb-4 opacity-90">{eyebrow}</p>}
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] max-w-4xl">{title}</h1>
        </div>
      </div>
    </section>
  );
}
