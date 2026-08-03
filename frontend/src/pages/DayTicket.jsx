import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoogleReviews from '../components/GoogleReviews';
import PageHero from '../components/PageHero';
import DayTicketBookingForm from '../components/DayTicketBookingForm';
import { IMAGES, DAY_TICKET } from '../mock';
import { Fish, Clock, MapPin, ShieldCheck } from 'lucide-react';
import { Toaster } from '../components/ui/toaster';

const FEATURES = [
  { icon: Fish, title: 'Specimen Fish', sub: 'Carp to 20lb+' },
  { icon: Clock, title: 'Dawn to Dusk', sub: 'Full day sessions' },
  { icon: MapPin, title: '10+ Pegs', sub: 'Well spaced' },
  { icon: ShieldCheck, title: 'Secure', sub: 'On-site bailiff' },
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

function PricingCard() {
  return (
    <div className="bg-brand-green text-white p-8 rounded-sm">
      <p className="eyebrow opacity-70 mb-3">Pricing</p>
      <div className="flex items-baseline gap-3 mb-2">
        <span className="font-serif text-5xl">£{DAY_TICKET.base.price}</span>
        <span className="opacity-80">/ 48 hrs (full lake)</span>
      </div>
      <p className="text-sm opacity-80">+ £{DAY_TICKET.extension.price} for every additional 24 hours</p>
      <p className="text-xs opacity-60 mt-4">Entire lake is booked exclusively for you — up to {DAY_TICKET.totalPegs} pegs.</p>
    </div>
  );
}

export default function DayTicket() {
  return (
    <div>
      <Header transparent />
      <PageHero eyebrow="The Angler's Ledger" title="Day Ticket Fishing" image={IMAGES.dayTicket} />

      <section className="py-20 md:py-28 bg-brand-cream">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <p className="eyebrow text-brand-terracotta mb-4">Day Tickets</p>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6">Day Ticket Fishing</h2>
            <p className="text-brand-dark/70 leading-relaxed mb-8">
              Our day ticket lakes offer exceptional coarse and carp fishing in a peaceful, well-maintained setting. With spacious, clearly marked pegs and a rich stock of specimen fish, Twin Lakes provides the ideal day out for anglers of all abilities.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {FEATURES.map(f => <FeatureTile key={f.title} {...f} />)}
            </div>
            <PricingCard />
          </div>
          <DayTicketBookingForm />
        </div>
      </section>

      <GoogleReviews />
      <Footer />
      <Toaster />
    </div>
  );
}
