import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, CheckCircle2, Minus, Plus, Sparkles, Users, X } from 'lucide-react';
import { ROOMS_DATA, RoomCategory } from '../data/resortData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialRoomId,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
}) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 2);

  const fmt = (d: Date) => d.toISOString().split('T')[0];

  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    initialRoomId || ROOMS_DATA[0].id
  );
  const [checkIn, setCheckIn] = useState<string>(initialCheckIn || fmt(today));
  const [checkOut, setCheckOut] = useState<string>(initialCheckOut || fmt(tomorrow));
  const [adults, setAdults] = useState<number>(initialGuests || 2);
  const [children, setChildren] = useState<number>(0);
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (initialRoomId) setSelectedRoomId(initialRoomId);
    if (initialCheckIn) setCheckIn(initialCheckIn);
    if (initialCheckOut) setCheckOut(initialCheckOut);
    if (initialGuests) setAdults(initialGuests);
  }, [initialRoomId, initialCheckIn, initialCheckOut, initialGuests]);

  useEffect(() => {
    if (!isOpen) setSubmitted(false);
  }, [isOpen]);

  const activeRoom: RoomCategory = useMemo(
    () => ROOMS_DATA.find((r) => r.id === selectedRoomId) || ROOMS_DATA[0],
    [selectedRoomId]
  );

  const nights = useMemo(() => {
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return 1;
    return Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
  }, [checkIn, checkOut]);

  const totalPrice = nights * activeRoom.priceLkr;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#142218]/65 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-[#F7F9F6] text-[#111A14] border border-[#142218]/10 shadow-2xl p-6 md:p-9"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close booking modal"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#E6ECE6] text-[#142218] hover:bg-[#142218] hover:text-[#F4F6F3] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {submitted ? (
              <div className="py-10 text-center space-y-5">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#243829] text-[#F4F6F3]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#8A9A8E]">
                  Highland Reservation Request Received
                </p>
                <h3 className="text-3xl font-medium tracking-tight">
                  We await you in <span className="editorial-serif text-4xl">Diyatalawa</span>
                </h3>
                <p className="mx-auto max-w-md text-sm text-[#111A14]/75 leading-relaxed">
                  Thank you{guestName ? `, ${guestName}` : ''}. Your request for{' '}
                  <strong>{activeRoom.name}</strong> ({nights} night{nights > 1 ? 's' : ''},{' '}
                  {adults} Adults{children > 0 ? `, ${children} Children` : ''}) totaling{' '}
                  <strong>LKR {totalPrice.toLocaleString()}</strong> has been queued. Our estate
                  concierge will confirm shortly via WhatsApp or phone.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/94777368264?text=${encodeURIComponent(
                      `Hello Top Mountain Resort, I would like to book ${activeRoom.name} from ${checkIn} to ${checkOut} for ${adults} adults and ${children} children.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#142218] px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#F4F6F3] hover:bg-[#243829] transition-colors"
                  >
                    Fast-Track via WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-[#142218]/20 px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#142218] hover:bg-[#E6ECE6] transition-colors"
                  >
                    Return to Resort
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6ECE6] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#243829]">
                    <Sparkles className="h-3 w-3" /> Top Mountain Concierge
                  </span>
                  <h2 className="mt-3 text-2xl md:text-3xl font-medium tracking-tight">
                    Reserve Your <span className="editorial-serif text-3xl md:text-4xl">Highland Sanctuary</span>
                  </h2>
                  <p className="mt-1 text-sm text-[#8A9A8E]">
                    Direct estate rates • Complimentary morning mist &amp; Uva welcome tea
                  </p>
                </div>

                {/* Room Selector */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#8A9A8E] mb-2">
                    Select Villa / Accommodation
                  </label>
                  <select
                    value={selectedRoomId}
                    onChange={(e) => setSelectedRoomId(e.target.value)}
                    className="w-full rounded-2xl border border-[#142218]/15 bg-white px-4 py-3 text-sm font-medium text-[#111A14] focus:outline-none focus:ring-2 focus:ring-[#243829]"
                  >
                    {ROOMS_DATA.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.index} — {room.name} ({room.size} • {room.priceFormatted}/night)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dates & Guests */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-[#E6ECE6]/60 p-3.5 border border-[#142218]/10">
                    <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-[#243829]">
                      <Calendar className="h-3.5 w-3.5" /> Check-In
                    </label>
                    <input
                      type="date"
                      required
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="mt-1.5 w-full bg-transparent text-sm font-medium text-[#111A14] focus:outline-none"
                    />
                  </div>

                  <div className="rounded-2xl bg-[#E6ECE6]/60 p-3.5 border border-[#142218]/10">
                    <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-[#243829]">
                      <Calendar className="h-3.5 w-3.5" /> Check-Out
                    </label>
                    <input
                      type="date"
                      required
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="mt-1.5 w-full bg-transparent text-sm font-medium text-[#111A14] focus:outline-none"
                    />
                  </div>

                  <div className="rounded-2xl bg-[#E6ECE6]/60 p-3.5 border border-[#142218]/10">
                    <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-[#243829]">
                      <Users className="h-3.5 w-3.5" /> Guests (Max {activeRoom.maxAdults}A, {activeRoom.maxChildren}C)
                    </label>
                    <div className="mt-2 flex items-center justify-between text-xs font-medium">
                      <div className="flex items-center gap-2">
                        <span className="text-[#8A9A8E]">Adults</span>
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-[#142218]/15"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span>{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(Math.min(activeRoom.maxAdults, adults + 1))}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-[#142218]/15"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#8A9A8E]">Kids</span>
                        <button
                          type="button"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-[#142218]/15"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span>{children}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setChildren(Math.min(activeRoom.maxChildren, children + 1))
                          }
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-[#142218]/15"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guest Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full rounded-2xl border border-[#142218]/15 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#243829]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp Number *"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full rounded-2xl border border-[#142218]/15 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#243829]"
                  />
                </div>

                <textarea
                  rows={2}
                  placeholder="Special requests (e.g. Campfire BBQ, Sunset Ceylon Tea, airport/station pickup)..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-2xl border border-[#142218]/15 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#243829]"
                />

                {/* Summary Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-[#142218] p-5 text-[#F4F6F3]">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#8A9A8E]">
                      Estimated Total ({nights} Night{nights > 1 ? 's' : ''})
                    </p>
                    <p className="mt-1 text-2xl font-semibold">
                      LKR {totalPrice.toLocaleString()}
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="rounded-full bg-[#F4F6F3] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#142218] hover:bg-[#E6ECE6] transition-colors"
                  >
                    Confirm Stay Request
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
