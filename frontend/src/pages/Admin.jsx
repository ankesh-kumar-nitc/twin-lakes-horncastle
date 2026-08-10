import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SECTIONS = [
  { key: 'day_tickets', title: 'Mystery Pool Bookings', cols: ['guest_name', 'email', 'phone', 'start_date', 'hours', 'price', 'created_at'] },
  { key: 'syndicate_members', title: 'Syndicate Members / Waiting List', cols: ['name', 'email', 'phone', 'experience', 'status', 'joined_at', 'expires_at'] },
  { key: 'room_bookings', title: 'Lodge Room Bookings', cols: ['guest_name', 'email', 'room_id', 'guests', 'check_in', 'check_out', 'total', 'created_at'] },
  { key: 'contact_messages', title: 'Contact Form Messages', cols: ['name', 'email', 'subject', 'message', 'created_at'] },
];

export default function Admin() {
  const [key, setKey] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BASE}/admin/all?key=${encodeURIComponent(key)}`);
      if (!res.ok) throw new Error(res.status === 403 ? 'Incorrect admin key' : 'Failed to load');
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <section className="pt-32 pb-24 max-w-[1300px] mx-auto px-6 md:px-10 min-h-[60vh]">
        <h1 className="font-serif text-3xl md:text-4xl text-brand-dark mb-8">Admin — Bookings & Messages</h1>

        {!data && (
          <form onSubmit={load} className="max-w-sm space-y-3">
            <label className="block text-sm text-brand-dark/70">Enter admin key to view submissions</label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full border border-black/15 rounded-sm px-4 py-2.5 text-sm"
              placeholder="Admin key"
            />
            <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-sm bg-brand-green text-white text-sm">
              {loading ? 'Checking…' : 'View'}
            </button>
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </form>
        )}

        {data && (
          <div className="space-y-14">
            {SECTIONS.map((sec) => (
              <div key={sec.key}>
                <h2 className="font-serif text-2xl text-brand-dark mb-4">{sec.title} ({data[sec.key]?.length || 0})</h2>
                <div className="overflow-x-auto border border-black/10 rounded-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-brand-cream">
                      <tr>
                        {sec.cols.map((c) => (
                          <th key={c} className="text-left px-3 py-2 font-medium text-brand-dark/70 whitespace-nowrap">{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(data[sec.key] || []).length === 0 && (
                        <tr><td className="px-3 py-3 text-brand-dark/40" colSpan={sec.cols.length}>No entries yet</td></tr>
                      )}
                      {(data[sec.key] || []).map((row, i) => (
                        <tr key={row.id || i} className="border-t border-black/5">
                          {sec.cols.map((c) => (
                            <td key={c} className="px-3 py-2 whitespace-nowrap max-w-[240px] truncate" title={String(row[c] ?? '')}>{String(row[c] ?? '-')}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
