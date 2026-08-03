import React, { useState } from 'react';
import { useToast } from '../hooks/use-toast';
import { applySyndicate, errMessage } from '../api';
import { logger } from '../utils/logger';
import SyndicateFormView from './SyndicateFormView';

function memberSuccessMessage(name, expiresAt, annualFee) {
  const until = new Date(expiresAt).toLocaleDateString();
  return `Membership secured for ${name}. Valid until ${until}. £${annualFee}/yr.`;
}

function waitingSuccessMessage(position, waitingMax) {
  return `You are position #${position} of ${waitingMax}.`;
}

export default function SyndicateApplicationForm({ status, isFull, slotsLeft, onApplied }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', experience: '' });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const notifyResult = (res) => {
    if (res.status === 'member') {
      toast({ title: 'Welcome to the Syndicate', description: memberSuccessMessage(form.name, res.expires_at, status.annual_fee) });
    } else {
      toast({ title: 'Added to Waiting List', description: waitingSuccessMessage(res.position, status.waiting_max) });
    }
  };

  const submit = async () => {
    if (!form.name || !form.email) {
      toast({ title: 'Missing details', description: 'Please provide your name and email.' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await applySyndicate({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        experience: form.experience || null,
      });
      notifyResult(res);
      setForm({ name: '', email: '', phone: '', experience: '' });
      if (onApplied) await onApplied();
    } catch (error) {
      logger.error('Syndicate application failed:', error);
      toast({ title: 'Application Failed', description: errMessage(error) });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SyndicateFormView
      form={form}
      setForm={setForm}
      submit={submit}
      submitting={submitting}
      isFull={isFull}
      slotsLeft={slotsLeft}
      status={status}
    />
  );
}
