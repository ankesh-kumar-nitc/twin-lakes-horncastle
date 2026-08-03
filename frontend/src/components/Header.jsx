import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Menu, X } from 'lucide-react';

const NAV = [
  { label: 'Home', path: '/' },
  { label: 'Day Ticket Lake', path: '/day-ticket-fishing' },
  { label: 'Syndicate Lake', path: '/syndicate-lake' },
  { label: 'Lakeside Lodge', path: '/stay-and-dine' },
  { label: 'Bar & Restaurant', path: '/stay-and-dine#restaurant' },
  { label: 'Events Hall', path: '/events' },
  { label: 'Contact', path: '/contact' }
];

export default function Header({ transparent = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = !transparent || scrolled;
  const textColor = solid ? 'text-brand-dark' : 'text-white';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${solid ? 'bg-brand-cream/95 backdrop-blur border-b border-black/5' : 'bg-transparent'}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-[70px] flex items-center justify-between">
        <Link to="/" className={`flex items-center gap-2 ${textColor}`}>
          <Compass className="w-5 h-5" strokeWidth={1.5} />
          <span className="font-serif text-[19px] font-semibold tracking-wide">Twin Lakes</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map(item => {
            const active = location.pathname === item.path.split('#')[0];
            return (
              <Link key={item.label} to={item.path} className={`text-[13.5px] transition-opacity duration-200 ${textColor} ${active ? 'opacity-100 font-medium' : 'opacity-85 hover:opacity-100'}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/day-ticket-fishing#book')} className="hidden sm:inline-flex items-center px-5 py-2 rounded-sm bg-brand-terracotta hover:bg-brand-terracottaHover text-white text-[13px] font-medium transition-colors duration-200">
            Book Now
          </button>
          <button onClick={() => setOpen(!open)} className={`lg:hidden ${textColor}`} aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-brand-cream border-t border-black/5">
          <div className="px-6 py-4 flex flex-col gap-4">
            {NAV.map(item => (
              <Link key={item.label} to={item.path} onClick={() => setOpen(false)} className="text-brand-dark text-sm">{item.label}</Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
