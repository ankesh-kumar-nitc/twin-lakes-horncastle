import React from 'react';
import { Sparkles } from 'lucide-react';

export default function ComingSoonBanner({ text = 'This area is undergoing the final touches and will be opening soon.' }) {
  return (
    <div className="bg-brand-terracotta text-white">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-6 flex items-center gap-4">
        <Sparkles className="w-6 h-6 flex-shrink-0" strokeWidth={1.5} />
        <div>
          <p className="font-serif text-lg">Coming Soon</p>
          <p className="text-sm opacity-90">{text}</p>
        </div>
      </div>
    </div>
  );
}
