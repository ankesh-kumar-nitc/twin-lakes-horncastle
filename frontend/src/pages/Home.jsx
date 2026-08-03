import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { IMAGES, OFFERINGS } from '../mock';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoogleReviews from '../components/GoogleReviews';

export default function Home() {
  return (
    <div>
      <Header transparent />

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <img src={IMAGES.hero} alt="Twin Lakes at dawn" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
        <div className="relative z-10 h-full flex items-end pb-24">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full text-white fade-in">
            <p className="eyebrow mb-5 opacity-90">Horncastle, Lincolnshire</p>
            <h1 className="font-serif text-6xl md:text-8xl leading-[1.02] mb-8">
              Twin Lakes<br/><span className="italic font-light">Fishing</span>
            </h1>
            <p className="max-w-lg text-base md:text-lg leading-relaxed opacity-90 mb-8">A premier fishing and leisure destination — where the spirit of the angler meets the refined elegance of modern hospitality.</p>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase">Discover</span>
          <ChevronDown className="w-4 h-4 animate-bounce" strokeWidth={1.5} />
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="py-24 md:py-32 bg-brand-cream">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="eyebrow text-brand-terracotta mb-5">What We Offer</p>
            <h2 className="font-serif text-4xl md:text-6xl text-brand-dark leading-tight">Your Destination <span className="italic">Awaits</span></h2>
            <p className="text-brand-dark/60 mt-6 leading-relaxed">From the thrill of the catch to the comfort of the lodge, Twin Lakes delivers an unmatched experience in the heart of Lincolnshire.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFERINGS.map((o) => (
              <Link key={o.title} to={o.link} className="group relative block overflow-hidden rounded-sm bg-brand-green aspect-[4/5]">
                <div className="absolute inset-0">
                  <img src={o.img} alt={o.title} className="card-hover-img w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute inset-0 p-7 flex flex-col justify-end text-white">
                  <h3 className="font-serif text-2xl md:text-3xl mb-2">{o.title}</h3>
                  <p className="text-sm opacity-85 mb-4 leading-relaxed">{o.desc}</p>
                  <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.25em] uppercase">
                    Discover <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="eyebrow text-brand-terracotta mb-5">About Twin Lakes</p>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-dark leading-tight mb-6">A Legacy of <span className="italic">Lakeside Excellence</span></h2>
            <p className="text-brand-dark/70 leading-relaxed mb-5">Set in the rolling countryside of Horncastle, Lincolnshire, Twin Lakes has been a sanctuary for anglers and nature lovers alike.</p>
            <p className="text-brand-dark/70 leading-relaxed mb-8">Our two pristine lakes are home to specimen carp, tench, bream, and pike — all within a setting that offers world-class dining, comfortable lodging, and a stunning events venue.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3 bg-brand-green text-white text-sm hover:bg-brand-greenDeep transition-colors duration-200">
              Get in Touch <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img src={IMAGES.reception} alt="Twin Lakes venue" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <GoogleReviews />
      <Footer />
    </div>
  );
}
