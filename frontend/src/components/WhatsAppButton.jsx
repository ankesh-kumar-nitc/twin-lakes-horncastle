import React from 'react';

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.697 4.611 1.902 6.484L4 29l7.694-1.877A11.93 11.93 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3Zm0 21.7a9.66 9.66 0 0 1-4.933-1.35l-.354-.21-4.566 1.114 1.132-4.45-.232-.365A9.66 9.66 0 0 1 5.7 15c0-5.688 4.613-10.3 10.301-10.3S26.3 9.312 26.3 15 21.688 24.7 16.001 24.7Zm5.652-7.719c-.31-.155-1.831-.903-2.115-1.006-.284-.104-.49-.155-.697.155-.207.31-.8 1.006-.981 1.213-.181.207-.362.233-.671.078-.31-.155-1.309-.482-2.494-1.536-.922-.822-1.545-1.837-1.726-2.146-.181-.31-.02-.478.136-.632.14-.14.31-.362.465-.543.155-.181.207-.31.31-.517.104-.207.052-.388-.026-.543-.078-.155-.697-1.68-.955-2.3-.251-.604-.507-.522-.697-.532l-.594-.01a1.14 1.14 0 0 0-.826.388c-.284.31-1.084 1.06-1.084 2.584s1.11 2.996 1.265 3.203c.155.207 2.185 3.336 5.293 4.679.74.32 1.317.511 1.767.654.742.236 1.418.203 1.952.123.596-.089 1.831-.749 2.089-1.472.259-.723.259-1.343.181-1.472-.077-.13-.284-.207-.594-.362Z" />
    </svg>
  );
}

export default function WhatsAppButton({ phone, label = 'Chat with Lake Manager', className = '' }) {
  const href = `https://wa.me/${phone}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-sm bg-[#25D366] hover:bg-[#1ebe5a] text-white text-sm font-medium transition-colors duration-200 ${className}`}
    >
      <WhatsAppIcon className="w-4 h-4" />
      {label}
    </a>
  );
}
