import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Compass,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from 'lucide-react';
import { HERO_IMAGES, ROOMS_DATA } from '../data/resortData';

gsap.registerPlugin(ScrollTrigger);

interface ContactFooterProps {
  onScrollTo: (sectionId: string) => void;
  onOpenBooking: (opts?: { roomId?: string }) => void;
  onInspectRoom: (roomId: string) => void;
}

const PROXIMITY_BADGES = [
  { name: 'Ella', note: 'Scenic Highland Town' },
  { name: 'Bandarawela Railway Station', note: '7.7 km' },
  { name: 'Horton Plains', note: 'Cloud Forest Reserve' },
  { name: 'Dhowa Rock Temple', note: 'Ancient Heritage' },
];

const FOOTER_NAV = [
  { label: 'Summit Hero', target: 'home' },
  { label: 'About Sanctuary', target: 'sanctuary' },
  { label: 'Dining & Rituals', target: 'dining' },
  { label: 'Estate Experiences', target: 'experiences-track' },
  { label: 'Villas & Cabanas', target: 'villas' },
  { label: 'Guest Stories', target: 'reviews' },
];

const FEATURED_SUITES = ROOMS_DATA.slice(0, 5);

export const ContactFooter: React.FC<ContactFooterProps> = ({
  onScrollTo,
  onOpenBooking,
  onInspectRoom,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dates, setDates] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);

  const footerRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const bannerBgRef = useRef<HTMLImageElement>(null);
  const sanctuaryWordRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [magOffset, setMagOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bannerRef.current && bannerBgRef.current) {
        gsap.fromTo(
          bannerBgRef.current,
          { scale: 1.15, yPercent: -6 },
          {
            scale: 1,
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: bannerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      if (bannerRef.current && sanctuaryWordRef.current) {
        gsap.fromTo(
          sanctuaryWordRef.current,
          { xPercent: -4, opacity: 0.05 },
          {
            xPercent: 4,
            opacity: 0.16,
            ease: 'none',
            scrollTrigger: {
              trigger: bannerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) * 0.22;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.28;
    setMagOffset({ x, y });
  };

  const resetMagnetic = () => setMagOffset({ x: 0, y: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setName('');
    setPhone('');
    setDates('');
    setMessage('');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterDone(true);
    setNewsletterEmail('');
  };

  return (
    <div ref={footerRef as React.RefObject<HTMLDivElement>} className="mt-5 space-y-5 pb-24">
      {/* Minimalist 2-Column Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[32px] bg-[#F7F9F6] px-5 py-14 md:px-12 md:py-20 shadow-[0_12px_40px_rgba(20,34,24,0.06)]"
      >
        <div className="mb-10 flex items-center justify-between">
          <span className="inline-block rounded-full bg-[#E6ECE6] px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#243829]">
            04 / Contact
          </span>
          <span className="text-xs text-[#8A9A8E]">topmountainresort.com</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Address, Hotlines & Highland Basecamp Badges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            <div>
              <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.025em] leading-[1.1] text-[#111A14]">
                Begin your <span className="editorial-serif text-[1.12em] text-[#243829]">quiet escape</span>{' '}
                to Diyatalawa.
              </h2>
            </div>

            <div className="space-y-4 text-sm text-[#111A14]/85">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E6ECE6] text-[#142218]">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A9A8E]">
                    Highland Estate Address
                  </p>
                  <p className="mt-0.5 font-medium text-[#111A14]">
                    122/1A, Pahala Kadurugamuwa Road, Diyatalawa 90150, Sri Lanka
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E6ECE6] text-[#142218]">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A9A8E]">
                    Direct Reservation Hotlines
                  </p>
                  <p className="mt-0.5 font-medium text-[#111A14] flex flex-wrap gap-x-3 gap-y-1">
                    <a href="tel:+94777368264" className="hover:underline">
                      +94 77 736 8264
                    </a>
                    <span className="text-[#8A9A8E]">|</span>
                    <a href="tel:+94572227143" className="hover:underline">
                      +94 57 222 7143
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Highland Basecamp Badges */}
            <div className="pt-2">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A9A8E] mb-3">
                <Compass className="h-3.5 w-3.5 text-[#243829]" /> Highland Basecamp Proximity
              </p>
              <div className="flex flex-wrap gap-2">
                {PROXIMITY_BADGES.map((badge, bIdx) => (
                  <motion.span
                    key={badge.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: bIdx * 0.07 }}
                    whileHover={{ y: -2, scale: 1.03 }}
                    className="inline-flex items-center gap-2 rounded-full border border-[#142218]/15 bg-[#E6ECE6]/70 px-3.5 py-1.5 text-xs font-medium text-[#142218] cursor-default"
                  >
                    <span>{badge.name}</span>
                    <span className="text-[10px] text-[#243829]/75">• {badge.note}</span>
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Minimalist Underline Inputs + Magnetic Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-[24px] bg-[#E6ECE6] p-8 text-center space-y-3 border border-[#142218]/10"
              >
                <CheckCircle2 className="mx-auto h-9 w-9 text-[#243829]" />
                <h3 className="text-xl font-medium text-[#142218]">Inquiry Sent to Diyatalawa</h3>
                <p className="text-sm text-[#111A14]/75 max-w-md mx-auto">
                  Thank you for reaching out to Top Mountain Resort. Our highland hosts will reply
                  via WhatsApp or phone shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-2 rounded-full bg-[#142218] px-5 py-2 text-xs font-medium text-[#F4F6F3]"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#8A9A8E]">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 w-full border-b border-[#142218]/25 bg-transparent pb-3 text-sm text-[#111A14] placeholder:text-[#8A9A8E]/70 focus:border-[#142218] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#8A9A8E]">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+94 7X XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-2 w-full border-b border-[#142218]/25 bg-transparent pb-3 text-sm text-[#111A14] placeholder:text-[#8A9A8E]/70 focus:border-[#142218] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#8A9A8E]">
                    Check-in &amp; Check-out Dates
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dec 18 – Dec 21 (4 Adults, 1 Child)"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    className="mt-2 w-full border-b border-[#142218]/25 bg-transparent pb-3 text-sm text-[#111A14] placeholder:text-[#8A9A8E]/70 focus:border-[#142218] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#8A9A8E]">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about your preferred villa, BBQ dinner, or travel plans..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-2 w-full border-b border-[#142218]/25 bg-transparent pb-3 text-sm text-[#111A14] placeholder:text-[#8A9A8E]/70 focus:border-[#142218] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    ref={btnRef}
                    type="submit"
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={resetMagnetic}
                    style={{
                      transform: `translate3d(${magOffset.x}px, ${magOffset.y}px, 0)`,
                    }}
                    className="group inline-flex items-center gap-3 rounded-full bg-[#142218] px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#F4F6F3] shadow-xl hover:bg-[#243829] transition-[background-color,transform] duration-200"
                  >
                    <span>Send Inquiry</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Atmospheric Finale Banner with Drifting Mist Clouds */}
      <div
        ref={bannerRef}
        className="relative h-[420px] md:h-[490px] w-full rounded-[32px] overflow-hidden bg-[#142218] shadow-2xl flex flex-col justify-between p-7 md:p-12 text-[#F4F6F3]"
      >
        <img
          ref={bannerBgRef}
          src={HERO_IMAGES.finaleMountain}
          alt="Top Mountain Resort hillside cabana in Diyatalawa"
          className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.68] contrast-[1.08] will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#142218]/92 via-[#142218]/38 to-[#142218]/55" />

        {/* Giant Subtle Background Letters: SANCTUARY */}
        <div
          ref={sanctuaryWordRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden will-change-transform"
        >
          <span className="text-[14vw] md:text-[13vw] font-semibold tracking-[0.04em] text-white/[0.14] uppercase leading-none">
            SANCTUARY
          </span>
        </div>

        {/* Animated Translucent Mist Clouds Drifting Horizontally */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-25%] top-[20%] h-56 opacity-60 animate-mist blur-xl"
          style={{
            background:
              'radial-gradient(ellipse at 25% 50%, rgba(230,236,230,0.48) 0%, transparent 55%), radial-gradient(ellipse at 70% 60%, rgba(244,246,243,0.4) 0%, transparent 52%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-25%] bottom-[12%] h-48 opacity-50 animate-mist-reverse blur-2xl"
          style={{
            background:
              'radial-gradient(ellipse at 40% 50%, rgba(230,236,230,0.52) 0%, transparent 55%), radial-gradient(ellipse at 85% 40%, rgba(255,255,255,0.34) 0%, transparent 50%)',
          }}
        />

        {/* Foreground Tropical / Pine Leaves Silhouettes Framing Bottom Corners */}
        <svg
          aria-hidden="true"
          viewBox="0 0 260 220"
          className="pointer-events-none absolute bottom-0 left-0 w-44 md:w-64 text-[#142218]/90 animate-leaf-sway"
        >
          <path
            fill="currentColor"
            d="M0,220 L0,90 C28,118 44,148 56,184 C54,132 72,82 104,48 C96,102 102,146 118,186 C132,142 158,108 194,94 C166,134 156,172 162,220 Z"
          />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 260 220"
          className="pointer-events-none absolute bottom-0 right-0 w-44 md:w-64 text-[#142218]/90 scale-x-[-1] animate-leaf-sway"
        >
          <path
            fill="currentColor"
            d="M0,220 L0,90 C28,118 44,148 56,184 C54,132 72,82 104,48 C96,102 102,146 118,186 C132,142 158,108 194,94 C166,134 156,172 162,220 Z"
          />
        </svg>

        {/* Top Banner Content */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <span className="rounded-full bg-white/15 backdrop-blur-xl border border-white/25 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em]">
            Top Mountain Resort • Est. Diyatalawa
          </span>
          <span className="text-xs text-[#E6ECE6]/85">
            1,450m Elevation • 16°C–22°C Highland Mist
          </span>
        </div>

        {/* Bottom Banner Bar */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-6 border-t border-white/20">
          <div>
            <p className="editorial-serif text-2xl md:text-4xl text-white">
              Where comfort meets nature, silence, and serenity.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={() => onOpenBooking()}
            className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full bg-[#F4F6F3] px-5 py-2.5 text-xs font-semibold text-[#142218] hover:bg-[#E6ECE6] transition-colors"
          >
            <span>Reserve Your Escape</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </motion.button>
        </div>
      </div>

      {/* Dedicated Dark Pine Editorial Luxury Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[32px] bg-[#142218] text-[#F4F6F3] px-6 py-12 md:px-12 md:py-16 shadow-2xl border border-white/10"
      >
        {/* Ambient Pine Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-[#243829]/60 blur-3xl"
        />

        {/* Top Brand Row */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-white/15">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#243829] border border-white/20 text-sm font-semibold tracking-widest text-[#F4F6F3]">
              TM
            </span>
            <div>
              <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white">
                Top Mountain Resort
              </h3>
              <p className="text-xs text-[#8A9A8E] tracking-[0.16em] uppercase">
                Diyatalawa • 3-Acre Highland Sanctuary
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3.5 py-2 text-xs text-[#E6ECE6]">
              <Clock className="h-3.5 w-3.5 text-[#8A9A8E]" />
              Check-in 14:00 • Check-out 11:00
            </span>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 rounded-full bg-[#F4F6F3] px-5 py-2 text-xs font-semibold text-[#142218] hover:bg-[#E6ECE6] transition-colors"
            >
              <span>Book Direct</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </motion.button>
          </div>
        </div>

        {/* 4-Column Structured Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 py-12">
          {/* Col 1: Brand Ethos & Quick Channels */}
          <div className="lg:col-span-4 space-y-5">
            <p className="text-sm text-[#E6ECE6]/80 leading-relaxed max-w-sm">
              A tranquil pine-forest sanctuary in the heart of Sri Lanka’s Uva highlands—crafted for
              slow mornings, warm Sri Lankan hospitality, and unforgettable misty sunsets.
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              <motion.a
                whileHover={{ y: -2 }}
                href="https://wa.me/94777368264"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#243829] hover:bg-[#314b37] border border-white/15 px-4 py-2 text-xs font-medium text-[#F4F6F3] transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Concierge
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="https://maps.google.com/?q=Top+Mountain+Resort+Diyatalawa"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-2 text-xs font-medium text-[#F4F6F3] transition-colors"
              >
                <MapPin className="h-3.5 w-3.5" /> Directions
              </motion.a>
            </div>
          </div>

          {/* Col 2: Sanctuary Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8A9A8E]">
              Explore
            </p>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_NAV.map((item) => (
                <li key={item.target}>
                  <button
                    type="button"
                    onClick={() => onScrollTo(item.target)}
                    className="text-[#E6ECE6]/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Signature Villas */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8A9A8E]">
              Signature Villas
            </p>
            <ul className="space-y-2.5 text-sm">
              {FEATURED_SUITES.map((suite) => (
                <li key={suite.id}>
                  <button
                    type="button"
                    onClick={() => onInspectRoom(suite.id)}
                    className="group w-full flex items-center justify-between gap-2 text-left text-[#E6ECE6]/80 hover:text-white transition-colors"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {suite.shortName}
                    </span>
                    <span className="text-[11px] text-[#8A9A8E] group-hover:text-[#E6ECE6]">
                      {suite.priceFormatted}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Seasonal Mist Dispatch */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8A9A8E]">
              Highland Mist Dispatch
            </p>
            <p className="text-xs text-[#E6ECE6]/75 leading-relaxed">
              Receive seasonal Uva retreat offers, long-weekend cabana availability, and bonfire
              dining notes.
            </p>
            {newsletterDone ? (
              <div className="rounded-2xl bg-[#243829] border border-white/15 p-3.5 text-xs text-[#E6ECE6] flex items-center gap-2">
                <Sparkles className="h-4 w-4 shrink-0 text-[#E6ECE6]" />
                <span>You’re on the Highland Dispatch list.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2.5">
                <div className="flex items-center rounded-full bg-white/10 border border-white/20 p-1 pl-4 focus-within:border-white/45 transition-colors">
                  <Mail className="h-3.5 w-3.5 text-[#8A9A8E] shrink-0 mr-2" />
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-transparent text-xs text-white placeholder:text-[#8A9A8E] focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to Highland Dispatch"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F4F6F3] text-[#142218] hover:bg-[#E6ECE6] transition-colors"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            )}
            <div className="pt-2 text-xs text-[#8A9A8E] space-y-1">
              <p>122/1A, Pahala Kadurugamuwa Rd</p>
              <p>Diyatalawa 90150, Sri Lanka</p>
            </div>
          </div>
        </div>

        {/* Oversized Subtle Footer Wordmark */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none overflow-hidden py-2 text-center border-t border-white/10"
        >
          <span className="block text-[11vw] md:text-[8.5vw] font-semibold tracking-[-0.04em] leading-[0.9] text-white/[0.06] uppercase whitespace-nowrap">
            TOP MOUNTAIN
          </span>
        </div>

        {/* Bottom Legal & Back to Summit Row */}
        <div className="relative z-10 mt-4 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#8A9A8E]">
          <p>
            © {new Date().getFullYear()} Top Mountain Resort, Diyatalawa. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="tel:+94777368264" className="hover:text-white transition-colors">
              +94 77 736 8264
            </a>
            <span>•</span>
            <a href="tel:+94572227143" className="hover:text-white transition-colors">
              +94 57 222 7143
            </a>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => onScrollTo('home')}
              className="rounded-full bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-1.5 text-[11px] font-medium text-[#F4F6F3] transition-colors"
            >
              Back to Summit ↑
            </motion.button>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};
