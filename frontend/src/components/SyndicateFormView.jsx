import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

function getFormHeading(isFull) {
  return isFull ? 'Join the Waiting List' : 'Apply for Membership';
}

function getFormSubheading(isFull, slotsLeft) {
  if (isFull) {
    return 'Membership is currently full. Join our waiting list of up to 10 anglers and be the first considered when a place opens.';
  }
  const label = slotsLeft === 1 ? '' : 's';
  return `Only ${slotsLeft} membership${label} remaining for this year. Applications reviewed within 48 hours.`;
}

function getSubmitLabel(isFull, submitting) {
  if (submitting) return 'Submitting…';
  return isFull ? 'Join Waiting List' : 'Submit Application';
}

function FormFields({ form, setForm }) {
  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <Label className="text-xs uppercase tracking-widest text-brand-dark/60">Full Name</Label>
        <Input value={form.name} onChange={update('name')} className="mt-1" />
      </div>
      <div>
        <Label className="text-xs uppercase tracking-widest text-brand-dark/60">Email</Label>
        <Input type="email" value={form.email} onChange={update('email')} className="mt-1" />
      </div>
      <div className="md:col-span-2">
        <Label className="text-xs uppercase tracking-widest text-brand-dark/60">Phone</Label>
        <Input value={form.phone} onChange={update('phone')} className="mt-1" />
      </div>
      <div className="md:col-span-2">
        <Label className="text-xs uppercase tracking-widest text-brand-dark/60">Angling Experience</Label>
        <Textarea rows={4} value={form.experience} onChange={update('experience')} className="mt-1" placeholder="Tell us about your fishing background…" />
      </div>
    </div>
  );
}

export default function SyndicateFormView({ form, setForm, submit, submitting, isFull, slotsLeft, status }) {
  return (
    <div className="max-w-[900px] mx-auto bg-white p-8 md:p-12 rounded-sm border border-black/5 shadow-sm">
      <p className="eyebrow text-brand-terracotta mb-3">Application</p>
      <h3 className="font-serif text-3xl md:text-4xl text-brand-dark mb-3">{getFormHeading(isFull)}</h3>
      <p className="text-sm text-brand-dark/60 mb-8">{getFormSubheading(isFull, slotsLeft)}</p>

      <FormFields form={form} setForm={setForm} />

      <Button onClick={submit} disabled={submitting} className="w-full mt-8 h-12 bg-brand-terracotta hover:bg-brand-terracottaHover text-white">
        {getSubmitLabel(isFull, submitting)} <ArrowRight className="ml-2 w-4 h-4" strokeWidth={1.5} />
      </Button>
      <p className="text-xs text-brand-dark/50 mt-4 flex items-center gap-2">
        <Check className="w-3 h-3" strokeWidth={2} /> {status.duration_days}-day membership · renewable annually · non-transferable.
      </p>
    </div>
  );
}
