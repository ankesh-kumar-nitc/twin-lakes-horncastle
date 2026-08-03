import React from 'react';
import { Calendar } from './ui/calendar';
import { Input } from './ui/input';
import { Label } from './ui/label';

function Legend() {
  return (
    <div className="flex items-center gap-4 text-xs text-brand-dark/60 mb-5">
      <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-brand-green rounded-full" /> Selected</span>
      <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-black/20 rounded-full" /> Booked</span>
    </div>
  );
}

export default function RoomBookingFields({ range, setRange, calendarDisabled, form, setForm, room }) {
  const update = (key, transform) => (e) => setForm({ ...form, [key]: transform ? transform(e.target.value) : e.target.value });
  return (
    <div>
      <p className="eyebrow text-brand-terracotta mb-3">Availability</p>
      <h4 className="font-serif text-2xl text-brand-dark mb-5">Select Dates</h4>
      <div className="bg-white rounded-sm p-2 mb-6 flex justify-center">
        <Calendar mode="range" selected={range} onSelect={setRange} disabled={calendarDisabled} numberOfMonths={1} />
      </div>
      <Legend />

      <div className="grid grid-cols-1 gap-4 mb-5">
        <div>
          <Label className="text-xs uppercase tracking-widest text-brand-dark/60">Name</Label>
          <Input value={form.name} onChange={update('name')} className="mt-1 bg-white" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-xs uppercase tracking-widest text-brand-dark/60">Email</Label>
            <Input type="email" value={form.email} onChange={update('email')} className="mt-1 bg-white" />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-widest text-brand-dark/60">Guests</Label>
            <Input type="number" min={1} max={room.capacity} value={form.guests} onChange={update('guests', Number)} className="mt-1 bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
