import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoogleReviews from '../components/GoogleReviews';
import PageHero from '../components/PageHero';
import { IMAGES } from '../mock';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import { Toaster } from '../components/ui/toaster';
import { sendContact, errMessage } from '../api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const submit = async () => {
    if (!form.name || !form.email || !form.message) {
      toast({ title: 'Missing details', description: 'Please complete all required fields.' });
      return;
    }
    setSubmitting(true);
    try {
      await sendContact({ name: form.name, email: form.email, subject: form.subject || null, message: form.message });
      toast({ title: 'Message Sent', description: 'Thanks for reaching out. We’ll be in touch within 24 hours.' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (e) {
      toast({ title: 'Send Failed', description: errMessage(e) });
    } finally { setSubmitting(false); }
  };

  return (
    <div>
      <Header transparent />
      <PageHero small eyebrow="Say Hello" title="Get in Touch" image={IMAGES.hero} />

      <section className="py-20 md:py-24 bg-brand-cream">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <p className="eyebrow text-brand-terracotta mb-3">Contact</p>
            <h2 className="font-serif text-4xl text-brand-dark mb-6">We’d love to hear from you</h2>
            <p className="text-brand-dark/70 leading-relaxed mb-8">Whether you’re planning a day of fishing, a lakeside stay, or an unforgettable celebration — our team is here to help.</p>
            <ul className="space-y-5">
              {[
                { icon: MapPin, title: 'Address', text: 'Twin Lakes, Horncastle, Lincolnshire, LN9 5PP' },
                { icon: Phone, title: 'Phone', text: '07436 378224' },
                { icon: Mail, title: 'Email', text: 'anubinjoy@gmail.com' },
                { icon: Clock, title: 'Hours', text: 'Open daily, Dawn – Dusk' }
              ].map(c => (
                <li key={c.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-4 h-4 text-brand-green" strokeWidth={1.5}/>
                  </div>
                  <div>
                    <p className="text-sm text-brand-dark/50 mb-1">{c.title}</p>
                    <p className="text-sm text-brand-dark">{c.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 bg-white p-8 md:p-10 rounded-sm border border-black/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label className="text-xs uppercase tracking-widest text-brand-dark/60">Name *</Label>
                <Input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="mt-1"/>
              </div>
              <div>
                <Label className="text-xs uppercase tracking-widest text-brand-dark/60">Email *</Label>
                <Input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="mt-1"/>
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs uppercase tracking-widest text-brand-dark/60">Subject</Label>
                <Input value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} className="mt-1"/>
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs uppercase tracking-widest text-brand-dark/60">Message *</Label>
                <Textarea rows={6} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="mt-1"/>
              </div>
            </div>
            <Button onClick={submit} disabled={submitting} className="mt-6 h-12 px-8 bg-brand-terracotta hover:bg-brand-terracottaHover text-white">
              {submitting ? 'Sending…' : 'Send Message'} <ArrowRight className="ml-2 w-4 h-4" strokeWidth={1.5}/>
            </Button>
          </div>
        </div>
      </section>

      <GoogleReviews />
      <Footer />
      <Toaster />
    </div>
  );
}
