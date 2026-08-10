import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-greenDeep text-white/85">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Compass className="w-5 h-5" strokeWidth={1.5} />
            <span className="font-serif text-xl font-semibold">Twin Lakes</span>
          </div>
          <p className="text-sm leading-relaxed opacity-80">A premier fishing and leisure destination in the heart of Lincolnshire.</p>
        </div>
        <div>
          <h4 className="eyebrow mb-4 opacity-70">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-white transition-colors" to="/day-ticket-fishing">Exclusive Fisheries</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/syndicate-lake">Syndicate Lake</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/stay-and-dine">Lakeside Lodge</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/stay-and-dine">Bar &amp; Restaurant</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/events">Events Hall</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-4 opacity-70">Visit</h4>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 opacity-70" strokeWidth={1.5}/> Twin Lakes, Horncastle, Lincolnshire, UK</li>
            <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 opacity-70" strokeWidth={1.5}/> 07436 378224</li>
            <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 opacity-70" strokeWidth={1.5}/> anubinjoy@gmail.com</li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-4 opacity-70">Hours</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li>Fishery: Dawn — Dusk</li>
            <li>Restaurant: 12pm — 10pm</li>
            <li>Reception: 8am — 8pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs opacity-70">
          <span>© {new Date().getFullYear()} Twin Lakes Horncastle. All rights reserved.</span>
          <span>Crafted with care in Lincolnshire</span>
        </div>
      </div>
    </footer>
  );
}
