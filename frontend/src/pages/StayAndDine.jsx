import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoogleReviews from '../components/GoogleReviews';
import PageHero from '../components/PageHero';
import ComingSoonBanner from '../components/ComingSoonBanner';
import RoomBookingPanel from '../components/RoomBookingPanel';
import { IMAGES, ROOMS } from '../mock';
import { Bed, Wifi, Coffee, Trees, Users, UtensilsCrossed, Flame, Wine } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Toaster } from '../components/ui/toaster';
import { getRoomAvailability } from '../api';
import { logger } from '../utils/logger';

const AMENITIES = [
  { icon: Bed, label: 'Comfortable Beds' },
  { icon: Wifi, label: 'Free Wi-Fi' },
  { icon: Coffee, label: 'Kitchenette' },
  { icon: Trees, label: 'Lakeside Views' },
];

const RESTAURANT_TILES = [
  { icon: UtensilsCrossed, label: 'Seasonal Menu' },
  { icon: Flame, label: 'Fireside Dining' },
  { icon: Wine, label: 'Craft Bar' },
];

function IntroSection() {
  return (
    <section className="py-20 md:py-24 bg-brand-cream">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <img src={IMAGES.lodge} alt="Lakeside lodge" className="w-full h-full object-cover blur-md scale-110" />
        </div>
        <div>
          <p className="eyebrow text-brand-terracotta mb-4">Short Stays</p>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6">Lakeside Lodges</h2>
          <p className="text-brand-dark/70 leading-relaxed mb-8">
            Our cosy lakeside lodges offer the perfect base for your fishing trip or countryside escape. Wake up to the sound of birdsong and step straight onto the bank. Each lodge is fully equipped with everything you need for a comfortable stay.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {AMENITIES.map(a => (
              <div key={a.label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-sm bg-brand-green/10 flex items-center justify-center">
                  <a.icon className="w-4 h-4 text-brand-green" strokeWidth={1.5} />
                </div>
                <span className="text-sm text-brand-dark">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoomShowcase({ room }) {
  return (
    <div>
      <div className="aspect-[4/3] overflow-hidden rounded-sm mb-6">
        <img src={room.size === 'small' ? IMAGES.lodge : IMAGES.reception} alt={room.name} className="w-full h-full object-cover blur-md scale-110" />
      </div>
      <h3 className="font-serif text-3xl text-brand-dark mb-2">{room.name}</h3>
      <p className="text-brand-dark/60 mb-6">{room.desc}</p>
      <div className="flex gap-6 mb-6">
        <div className="flex items-center gap-2 text-sm"><Users className="w-4 h-4 text-brand-green" strokeWidth={1.5} /> Up to {room.capacity} guests</div>
        <div className="flex items-center gap-2 text-sm"><Bed className="w-4 h-4 text-brand-green" strokeWidth={1.5} /> {room.size === 'small' ? '1 Bedroom' : '2 Bedrooms'}</div>
      </div>
      <div className="p-6 bg-brand-green text-white rounded-sm">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="eyebrow opacity-70 mb-1">From</p>
            <p className="font-serif text-4xl">£{room.price}<span className="text-sm opacity-80"> / night</span></p>
          </div>
          <p className="text-xs opacity-70">Minimum 1 night</p>
        </div>
      </div>
    </div>
  );
}

function RestaurantSection() {
  return (
    <section id="restaurant" className="py-20 md:py-28 bg-brand-green text-white">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="eyebrow opacity-70 mb-4">The Table & Hearth</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Onsite Bar & Restaurant</h2>
          <p className="opacity-85 leading-relaxed mb-8">
            Locally sourced cuisine served with sweeping views across the water. Our chefs craft seasonal dishes using Lincolnshire’s finest produce — accompanied by an intimate bar stocked with craft ales, wines, and single malts.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {RESTAURANT_TILES.map(a => (
              <div key={a.label} className="p-5 bg-white/5 rounded-sm border border-white/10">
                <a.icon className="w-5 h-5 mb-3 opacity-80" strokeWidth={1.5} />
                <p className="text-sm">{a.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <img src={IMAGES.restaurant} alt="Onsite Restaurant" className="w-full h-full object-cover blur-md scale-110" />
        </div>
      </div>
    </section>
  );
}

export default function StayAndDine() {
  const [selectedRoomId, setSelectedRoomId] = useState(ROOMS[0].id);
  const [bookedDatesByRoom, setBookedDatesByRoom] = useState({});

  const selectedRoom = useMemo(() => ROOMS.find(r => r.id === selectedRoomId) || ROOMS[0], [selectedRoomId]);

  const fetchAvailability = useCallback(async (roomId) => {
    try {
      const res = await getRoomAvailability(roomId);
      setBookedDatesByRoom(prev => ({ ...prev, [roomId]: res.booked_dates || [] }));
    } catch (error) {
      logger.error('Failed to fetch room availability:', error);
    }
  }, []);

  useEffect(() => { fetchAvailability(selectedRoomId); }, [selectedRoomId, fetchAvailability]);

  const bookedDates = useMemo(() => {
    const arr = bookedDatesByRoom[selectedRoomId] || [];
    return arr.map(dateStr => new Date(dateStr + 'T00:00:00'));
  }, [selectedRoomId, bookedDatesByRoom]);

  return (
    <div>
      <Header transparent />
      <PageHero eyebrow="The Lodge & Hearth" title="Lakeside Lodge" image={IMAGES.lodge} blur />
      <ComingSoonBanner text="Our lakeside lodges and onsite restaurant are undergoing the final touches and will be opening soon." />
      <IntroSection />

      <section id="booking" className="py-20 md:py-24 bg-white">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <p className="eyebrow text-brand-terracotta mb-3">Book Your Stay</p>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-4">Choose Your Cabin</h2>
            <p className="text-brand-dark/60">Two small cabins and two big lodges. Real-time availability synced across all guests.</p>
          </div>

          <Tabs value={selectedRoomId} onValueChange={setSelectedRoomId} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto p-1 bg-brand-cream w-full max-w-3xl mx-auto">
              {ROOMS.map(r => (
                <TabsTrigger key={r.id} value={r.id} className="py-3 data-[state=active]:bg-brand-green data-[state=active]:text-white text-sm">
                  {r.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {ROOMS.map(r => (
              <TabsContent key={r.id} value={r.id} className="mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <RoomShowcase room={r} />
                  <RoomBookingPanel
                    room={selectedRoom}
                    bookedDates={bookedDates}
                    onBooked={() => fetchAvailability(selectedRoomId)}
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <RestaurantSection />
      <GoogleReviews />
      <Footer />
      <Toaster />
    </div>
  );
}
