import React, { useState, useMemo } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';
import { bookDayTicket, errMessage } from '../api';
import { DAY_TICKET } from '../mock';
import { logger } from '../utils/logger';
import DayTicketFormFields from './DayTicketFormFields';

function computePrice(hours) {
  if (hours < 48) return 0;
  const extraDays = (hours - 48) / 24;
  return DAY_TICKET.base.price + extraDays * DAY_TICKET.extension.price;
}

function computeEndDate(start, hours) {
  if (!start) return null;
  const d = new Date(start);
  d.setHours(d.getHours() + hours);
  return d;
}

function Summary({ start, endDate, price }) {
  return (
    <div className="flex items-center justify-between p-4 bg-brand-cream rounded-sm mb-5">
      <div className="text-sm text-brand-dark/70">
        {start ? <span>{start.toLocaleDateString()} → {endDate?.toLocaleDateString()}</span> : 'Select a date'}
      </div>
      <div className="font-serif text-3xl text-brand-green">£{price}</div>
    </div>
  );
}

export default function DayTicketBookingForm() {
  const [start, setStart] = useState();
  const [hours, setHours] = useState(48);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const calendarDisabled = useMemo(() => ({ before: new Date() }), []);
  const price = useMemo(() => computePrice(hours), [hours]);
  const endDate = useMemo(() => computeEndDate(start, hours), [start, hours]);

  const validate = () => {
    if (!start || !form.name || !form.email) {
      toast({ title: 'Missing information', description: 'Please pick a date and fill in your details.' });
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await bookDayTicket({
        guest_name: form.name,
        email: form.email,
        phone: form.phone || null,
        start_date: start.toISOString().slice(0, 10),
        hours,
      });
      toast({ title: 'Booking Confirmed', description: `${hours}hr day ticket booked. Total £${res.price}. Confirmation sent to ${form.email}.` });
      setForm({ name: '', email: '', phone: '' });
      setStart(undefined);
    } catch (error) {
      logger.error('Day ticket booking failed:', error);
      toast({ title: 'Booking Failed', description: errMessage(error) });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="book" className="bg-white p-8 md:p-10 border border-black/5 rounded-sm shadow-sm">
      <p className="eyebrow text-brand-terracotta mb-3">Reserve Your Session</p>
      <h3 className="font-serif text-3xl text-brand-dark mb-6">Book Day Ticket</h3>
      <DayTicketFormFields
        start={start}
        setStart={setStart}
        calendarDisabled={calendarDisabled}
        hours={hours}
        setHours={setHours}
        form={form}
        setForm={setForm}
      />
      <Summary start={start} endDate={endDate} price={price} />
      <Button onClick={submit} disabled={submitting} className="w-full bg-brand-terracotta hover:bg-brand-terracottaHover text-white h-12">
        {submitting ? 'Reserving…' : 'Reserve Booking'} <ArrowRight className="ml-2 w-4 h-4" strokeWidth={1.5} />
      </Button>
      <p className="text-xs text-brand-dark/50 mt-3 flex items-center gap-2"><Check className="w-3 h-3" /> No card required for reservation. We’ll contact you to confirm.</p>
    </div>
  );
}
