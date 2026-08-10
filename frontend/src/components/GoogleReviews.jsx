import React from 'react';
import { Star } from 'lucide-react';
import { GOOGLE_REVIEWS, GOOGLE_SUMMARY } from '../mock';

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`w-4 h-4 ${i <= count ? 'fill-[#f5b301] text-[#f5b301]' : 'text-gray-300'}`} strokeWidth={1.5} />
      ))}
    </div>
  );
}

export default function GoogleReviews({ rating = GOOGLE_SUMMARY.rating, totalReviews = GOOGLE_SUMMARY.totalReviews }) {
  return (
    <section className="bg-brand-cream py-24">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <p className="eyebrow text-brand-terracotta mb-4">What Guests Say</p>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6">Reviews from Google</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <svg width="22" height="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              <span className="font-medium text-brand-dark">Google</span>
            </div>
            <div className="h-6 w-px bg-black/15" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif text-brand-dark">{rating}</span>
              <Stars count={5} />
              <span className="text-sm text-brand-dark/60">({totalReviews} reviews)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GOOGLE_REVIEWS.map((r) => (
            <div key={`${r.name}-${r.date}`} className="bg-white p-7 border border-black/5 rounded-sm hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-brand-green text-white flex items-center justify-center font-medium text-sm">{r.avatar}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-brand-dark">{r.name}</div>
                  <div className="text-xs text-brand-dark/50">{r.date}</div>
                </div>
                <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              </div>
              <Stars count={r.rating} />
              <p className="text-sm leading-relaxed text-brand-dark/75 mt-3">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
