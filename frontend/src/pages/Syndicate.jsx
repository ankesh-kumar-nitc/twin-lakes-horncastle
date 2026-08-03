import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoogleReviews from '../components/GoogleReviews';
import PageHero from '../components/PageHero';
import SyndicateApplicationForm from '../components/SyndicateApplicationForm';
import { IMAGES } from '../mock';
import { Users, Trophy, Fish, Clock } from 'lucide-react';
import { Toaster } from '../components/ui/toaster';
import { getSyndicateStatus } from '../api';
import { logger } from '../utils/logger';

const DEFAULT_STATUS = { members: 0, total_slots: 25, waiting: 0, waiting_max: 10, annual_fee: 1450, duration_days: 365 };

const PERKS = [
  { icon: Users, title: 'Limited to 25 Members', desc: 'Uncrowded banks, always.' },
  { icon: Fish, title: 'Specimen Carp to 40lb+', desc: 'Meticulously stocked waters.' },
  { icon: Clock, title: '24-hour Fishing', desc: 'Round-the-clock access year round.' },
  { icon: Trophy, title: 'Priority Peg Booking', desc: 'Reserve prime swims in advance.' },
];

function StatCard({ label, value, sub, highlight }) {
  return (
    <div className={`p-8 rounded-sm border ${highlight ? 'bg-brand-green text-white border-brand-green' : 'bg-white text-brand-dark border-black/5'}`}>
      <p className={`eyebrow mb-3 ${highlight ? 'opacity-70' : 'text-brand-terracotta'}`}>{label}</p>
      <p className="font-serif text-4xl mb-2">{value}</p>
      <p className={`text-sm ${highlight ? 'opacity-80' : 'text-brand-dark/60'}`}>{sub}</p>
    </div>
  );
}

function IntroSection() {
  return (
    <section className="py-20 md:py-28 bg-brand-green text-white">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <img src={IMAGES.syndicate} alt="Syndicate lake" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="eyebrow opacity-70 mb-4">Exclusive Access</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-6">The Syndicate Lake</h2>
          <p className="opacity-85 leading-relaxed mb-8">
            Our syndicate lake is reserved for a limited number of dedicated anglers seeking low-pressure fishing and the chance to connect with truly exceptional fish. With strictly controlled membership, you’ll enjoy uncrowded banks, pristine conditions, and a genuine sense of exclusivity.
          </p>
          <ul className="space-y-3 mb-8">
            {PERKS.map(p => (
              <li key={p.title} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-sm bg-white/10 flex items-center justify-center flex-shrink-0">
                  <p.icon className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-sm opacity-70">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function StatsGrid({ status, loading, slotsLeft, waitLeft, isFull }) {
  return (
    <div className="max-w-[1300px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
      <StatCard
        label="Members"
        value={loading ? '—' : `${status.members} / ${status.total_slots}`}
        sub={isFull ? 'Fully subscribed' : `${slotsLeft} slot${slotsLeft === 1 ? '' : 's'} remaining`}
        highlight={!isFull}
      />
      <StatCard
        label="Waiting List"
        value={loading ? '—' : `${status.waiting} / ${status.waiting_max}`}
        sub={`${waitLeft} place${waitLeft === 1 ? '' : 's'} available`}
      />
      <StatCard
        label="Annual Fee"
        value={`£${status.annual_fee}`}
        sub={`Valid ${status.duration_days} days from join date`}
      />
    </div>
  );
}

export default function Syndicate() {
  const [status, setStatus] = useState(DEFAULT_STATUS);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const s = await getSyndicateStatus();
      setStatus(s);
    } catch (error) {
      logger.error('Failed to fetch syndicate status:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const slotsLeft = status.total_slots - status.members;
  const waitLeft = status.waiting_max - status.waiting;
  const isFull = slotsLeft <= 0;

  return (
    <div>
      <Header transparent />
      <PageHero eyebrow="Exclusive Access" title="The Syndicate Lake" image={IMAGES.syndicate} />
      <IntroSection />

      <section className="py-20 md:py-24 bg-brand-cream">
        <StatsGrid status={status} loading={loading} slotsLeft={slotsLeft} waitLeft={waitLeft} isFull={isFull} />
        <SyndicateApplicationForm status={status} isFull={isFull} slotsLeft={slotsLeft} onApplied={refresh} />
      </section>

      <GoogleReviews />
      <Footer />
      <Toaster />
    </div>
  );
}
