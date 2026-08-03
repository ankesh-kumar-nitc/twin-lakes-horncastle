import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoogleReviews from '../components/GoogleReviews';
import PageHero from '../components/PageHero';
import { IMAGES } from '../mock';
import { Sparkles, Users, GlassWater, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Events() {
  return (
    <div>
      <Header transparent />
      <PageHero eyebrow="The Gathering" title="Events & Reception" image={IMAGES.reception} />

      {/* Coming Soon banner */}
      <div className="bg-brand-terracotta text-white">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-6 flex items-center gap-4">
          <Sparkles className="w-6 h-6" strokeWidth={1.5} />
          <div>
            <p className="font-serif text-lg">Coming Soon</p>
            <p className="text-sm opacity-90">Our events hall is undergoing the final touches and will be opening soon.</p>
          </div>
        </div>
      </div>

      {/* Venue */}
      <section className="py-20 md:py-28 bg-brand-cream">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 text-center max-w-3xl">
          <p className="eyebrow text-brand-terracotta mb-4">Our Venue</p>
          <h2 className="font-serif text-4xl md:text-6xl text-brand-dark mb-6">A Setting <span className="italic">Beyond Compare</span></h2>
          <p className="text-brand-dark/70 leading-relaxed max-w-2xl mx-auto">Our reception hall combines the character of traditional oak craftsmanship with the elegance of contemporary design — all set against the breathtaking backdrop of Twin Lakes.</p>
        </div>

        <div className="max-w-[1300px] mx-auto px-6 md:px-10 mt-14 grid grid-cols-1 md:grid-cols-4 gap-5">
          {[
            { icon: Users, title: 'Up to 200 Guests', desc: 'Spacious layouts' },
            { icon: GlassWater, title: 'Full Bar Service', desc: 'Curated drinks list' },
            { icon: Music, title: 'Live Music Ready', desc: 'Stage & sound system' },
            { icon: Sparkles, title: 'Bespoke Packages', desc: 'Tailored to you' }
          ].map(item => (
            <div key={item.title} className="bg-white p-8 rounded-sm border border-black/5 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-sm bg-brand-green/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-brand-green" strokeWidth={1.5}/>
              </div>
              <p className="font-serif text-lg text-brand-dark mb-1">{item.title}</p>
              <p className="text-sm text-brand-dark/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="aspect-[4/5] overflow-hidden rounded-sm">
            <img src={IMAGES.reception} alt="Events venue interior" className="w-full h-full object-cover"/>
          </div>
          <div>
            <p className="eyebrow text-brand-terracotta mb-4">Weddings & Celebrations</p>
            <h3 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6">Your Day, <span className="italic">Perfectly Set</span></h3>
            <p className="text-brand-dark/70 leading-relaxed mb-6">From intimate ceremonies to corporate galas, we tailor every detail. Enjoy panoramic lake views, wood-beamed rafters, and warm lantern light as the sun sets over the water.</p>
            <Link to="/contact" className="inline-block px-7 py-3 bg-brand-green text-white text-sm hover:bg-brand-greenDeep transition-colors duration-200">Enquire About Events</Link>
          </div>
        </div>
      </section>

      <GoogleReviews />
      <Footer />
    </div>
  );
}
