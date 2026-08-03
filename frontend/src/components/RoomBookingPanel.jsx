import React, { useState, useMemo } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';
import { bookRoom, errMessage } from '../api';
import { logger } from '../utils/logger';
import RoomBookingFields from './RoomBookingFields';

function computeNights(range) {
  if (!range?.from || !range?.to) return 0;
  const diff = (range.to - range.from) / (1000 * 60 * 60 * 24);
  return Math.max(1, Math.round(diff));
}

function rangeToPayload(range) {
  return {
    check_in: range.from.toISOString().slice(0, 10),
    check_out: range.to.toISOString().slice(0, 10),
  };
}

function PricingSummary({ nights, room, total }) {
  const label = nights > 0 ? `${nights} night${nights === 1 ? '' : 's'} × £${room.price}` : 'Select dates';
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-sm mb-5 border border-black/5">
      <div className="text-sm text-brand-dark/70">{label}</div>
      <div className="font-serif text-3xl text-brand-green">£{total || 0}</div>
    </div>
  );
}

export default function RoomBookingPanel({ room, bookedDates, onBooked }) {
  const [range, setRange] = useState();
  const [form, setForm] = useState({ name: '', email: '', guests: 2 });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const calendarDisabled = useMemo(() => [{ before: new Date() }, ...bookedDates], [bookedDates]);
  const nights = useMemo(() => computeNights(range), [range]);
  const total = nights * room.price;

  const validate = () => {
    if (!range?.from || !range?.to) {
      toast({ title: 'Select dates', description: 'Please choose check-in and check-out dates.' });
      return false;
    }
    if (!form.name || !form.email) {
      toast({ title: 'Missing details', description: 'Please provide name and email.' });
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await bookRoom(room.id, {
        guest_name: form.name,
        email: form.email,
        guests: form.guests,
        ...rangeToPayload(range),
      });
      toast({ title: 'Room Reserved', description: `${room.name} — ${res.nights} night${res.nights === 1 ? '' : 's'} · £${res.total}. Calendar updated.` });
      setRange(undefined);
      setForm({ name: '', email: '', guests: 2 });
      if (onBooked) await onBooked();
    } catch (error) {
      logger.error('Room booking failed:', error);
      toast({ title: 'Booking Failed', description: errMessage(error) });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-cream p-8 rounded-sm">
      <RoomBookingFields
        range={range}
        setRange={setRange}
        calendarDisabled={calendarDisabled}
        form={form}
        setForm={setForm}
        room={room}
      />
      <PricingSummary nights={nights} room={room} total={total} />
      <Button onClick={submit} disabled={submitting} className="w-full h-12 bg-brand-terracotta hover:bg-brand-terracottaHover text-white">
        {submitting ? 'Booking…' : 'Confirm Booking'} <ArrowRight className="ml-2 w-4 h-4" strokeWidth={1.5} />
      </Button>
      <p className="text-xs text-brand-dark/50 mt-3 flex items-center gap-2"><Check className="w-3 h-3" /> Calendar syncs instantly across all guests.</p>
    </div>
  );
}
