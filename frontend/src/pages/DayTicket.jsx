import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoogleReviews from '../components/GoogleReviews';
import PageHero from '../components/PageHero';
import Gallery from '../components/Gallery';
import WhatsAppButton from '../components/WhatsAppButton';
import { IMAGES, DAY_TICKET, MYSTERY_POOL_GALLERY, WHATSAPP } from '../mock';
import { Fish, Clock, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Toaster } from '../components/ui/toaster';

const FEATURES = [
  { icon: Fish, title: 'Specimen Fish', sub: 'Carp to 20lb+' },
  { icon: Clock, title: 'Dawn to Dusk', sub: 'Full day sessions' },
  { icon: MapPin, title: '10+ Pegs', sub: 'Well spaced' },
  { icon: ShieldCheck, title: 'Secure', sub: 'On-site bailiff' },
];

const SPECIES = [
  'Carp to 20lb+', 'Tench to 6lb+', 'Bream to 5lb+', 'Crucians to 3lb+', 'Chub', 'Perch', 'Eels & plenty of silvers'
];

const RULES = [
  'No keepnets',
  '2 rods per person maximum',
  'Unhooking mats to be used',
  'No loud music',
  'Strictly no drunkenness',
  'Dogs to be kept on a lead',
  'No standing with fish',
  'BBQ to be raised off the ground',
  'Under 16s to be accompanied by an adult',
  'Strictly, all the garbage should be taken back',
  'All fish to be returned alive',
];

function FeatureTile({ icon: Icon, title, sub }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-white/60 rounded-sm border border-black/5">
      <div className="w-10 h-10 rounded-sm bg-brand-green/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-brand-green" strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-sm font-medium text-brand-dark">{title}</p>
        <p className="text-xs text-brand-dark/55">{sub}</p>
      </div>
    </div>
  );
}

function FeaturesBar() {
  return (
    <section className="py-10 bg-brand-cream border-b border-black/5">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURES.map(f => <FeatureTile key={f.title} {...f} />)}
      </div>
    </section>
  );
}

function BookingCard() {
  return (
    <div className="bg-brand-green text-white p-8 rounded-sm sticky top-24">
      <p className="eyebrow opacity-70 mb-3">Pricing</p>
      <div className="flex items-baseline gap-3 mb-2">
        <span className="font-serif text-5xl">£{DAY_TICKET.base.price}</span>
        <span className="opacity-80">/ 48 hrs</span>
      </div>
      <p className="text-sm opacity-80 mb-1">+ £{DAY_TICKET.extension.price} for every additional 24 hours</p>
      <p className="text-xs opacity-60 mb-6">Minimum booking 48 hours · exclusive hire of the whole lake, up to {DAY_TICKET.totalPegs} anglers.</p>

      <a
        href="https://swimbooker.com/fishery/14210"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-brand-terracotta hover:bg-brand-terracottaHover text-white text-sm font-medium transition-colors duration-200 mb-3"
      >
        Book on Swimbooker <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
      </a>

      <WhatsAppButton phone={WHATSAPP.mysteryPool} label="Chat with Lake Manager" className="w-full justify-center" />
    </div>
  );
}

export default function DayTicket() {
  return (
    <div>
      <Header transparent />
      <PageHero eyebrow="Exclusive Fisheries" title="The Mystery Pool" image={IMAGES.dayTicket} />

      <FeaturesBar />

      <section className="py-20 md:py-28 bg-brand-cream">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <p className="eyebrow text-brand-terracotta mb-4">Exclusive Fisheries</p>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6">The Mystery Pool <span className="italic">— Exclusive Lake Hire</span></h2>

            <div className="space-y-4 text-brand-dark/70 leading-relaxed mb-10">
              <p><span className="font-medium text-brand-dark">Overview</span></p>
              <p>Promotional price for exclusive hire of the lake is £200 for 48 hours and £100 for an additional 24 hours.</p>
              <p>Hidden away in the Lincolnshire countryside, The Mystery Pool offers a unique chance to take over your own water for the session.</p>
              <p>A stunning 2-acre mixed fishery set in peaceful and beautiful surroundings — perfect for mates, socials, club bookings, and families with kids learning how to fish.</p>

              <div>
                <p className="font-medium text-brand-dark mb-2">What's in the lake?</p>
                <div className="flex flex-wrap gap-2">
                  {SPECIES.map(s => (
                    <span key={s} className="text-xs px-3 py-1.5 bg-white rounded-sm border border-black/5 text-brand-dark/75">{s}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-medium text-brand-dark mb-2">The Setup</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>12 swims — max 12 anglers</li>
                  <li>Spacious pegs in a quiet, scenic setting</li>
                  <li>Camper vans & motorhomes welcome</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-brand-dark mb-2">Price</p>
                <p>£200 per 24 hours · minimum booking 48 hours.</p>
              </div>

              <p className="italic">No day tickets. No interruptions. Just you and your group on the lake.</p>
              <p>Perfect for a proper social, birthday session, or a relaxed family fishing trip.</p>
            </div>

            <div className="border-t border-black/10 pt-8">
              <p className="font-medium text-brand-dark mb-3">Rules</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-brand-dark/70 list-disc list-inside mb-6">
                {RULES.map(r => <li key={r}>{r}</li>)}
              </ul>
              <p className="text-xs text-brand-dark/50 leading-relaxed">
                We require 2 weeks' notice for cancellation and refund requests. Any requests with less than 2 weeks' notice will not be refunded. We will be pleased to check for alternative dates, subject to availability.
              </p>
            </div>
          </div>

          <BookingCard />
        </div>
      </section>

      <Gallery title="The Mystery Pool" images={MYSTERY_POOL_GALLERY} />

      <GoogleReviews rating={4.3} totalReviews={44} />
      <Footer />
      <Toaster />
    </div>
  );
}
