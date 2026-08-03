import React from 'react';
import { Calendar } from './ui/calendar';
import { Input } from './ui/input';
import { Label } from './ui/label';

const DURATION_OPTIONS = [48, 72, 96, 120, 144, 168];

function DurationSelector({ hours, setHours }) {
  return (
    <div className="mb-6">
      <Label className="text-xs uppercase tracking-widest text-brand-dark/60">Duration</Label>
      <div className="flex flex-wrap gap-2 mt-2">
        {DURATION_OPTIONS.map(h => {
          const active = hours === h;
          const cls = active
            ? 'bg-brand-green text-white border-brand-green'
            : 'bg-white text-brand-dark border-black/15 hover:border-brand-green';
          return (
            <button key={h} onClick={() => setHours(h)} className={`px-4 py-2 text-sm rounded-sm border transition-colors duration-200 ${cls}`}>
              {h}h
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GuestFields({ form, setForm }) {
  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  return (
    <div className="grid grid-cols-1 gap-4 mb-6">
      <div>
        <Label htmlFor="dt-name" className="text-xs uppercase tracking-widest text-brand-dark/60">Full Name</Label>
        <Input id="dt-name" value={form.name} onChange={update('name')} className="mt-1" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dt-email" className="text-xs uppercase tracking-widest text-brand-dark/60">Email</Label>
          <Input id="dt-email" type="email" value={form.email} onChange={update('email')} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="dt-phone" className="text-xs uppercase tracking-widest text-brand-dark/60">Phone</Label>
          <Input id="dt-phone" value={form.phone} onChange={update('phone')} className="mt-1" />
        </div>
      </div>
    </div>
  );
}

export default function DayTicketFormFields({ start, setStart, calendarDisabled, hours, setHours, form, setForm }) {
  return (
    <div>
      <div className="mb-6">
        <Label className="text-xs uppercase tracking-widest text-brand-dark/60">Start Date</Label>
        <div className="mt-2 border border-black/10 rounded-sm p-2 flex justify-center">
          <Calendar mode="single" selected={start} onSelect={setStart} disabled={calendarDisabled} />
        </div>
      </div>
      <DurationSelector hours={hours} setHours={setHours} />
      <GuestFields form={form} setForm={setForm} />
    </div>
  );
}
