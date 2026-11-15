import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
  Users,
} from 'lucide-react';
import { HERO_IMAGES, ROOMS_DATA } from '../data/resortData';
import { HeroTopBar } from './Navbar';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenBooking: (opts?: {
    roomId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }) => void;
  onScrollTo: (sectionId: string) => void;
  onInspectRoom?: (roomId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onScrollTo, onInspectRoom }) => {
  const heroRef = useRef<HTMLElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const counterAcresRef = useRef<HTMLSpanElement>(null);
  const counterVillasRef = useRef<HTMLSpanElement>(null);

  const quickXBg = useRef<gsap.QuickToFunc | null>(null);
  const quickYBg = useRef<gsap.QuickToFunc | null>(null);
  const quickXText = useRef<gsap.QuickToFunc | null>(null);
  const quickYText = useRef<gsap.QuickToFunc | null>(null);
  const quickXFg = useRef<gsap.QuickToFunc | null>(null);
  const quickYFg = useRef<gsap.QuickToFunc | null>(null);

  const [switcherIndex, setSwitcherIndex] = useState(0);
  const [quickBookOpen, setQuickBookOpen] = useState(false);
  const [quickCheckIn, setQuickCheckIn] = useState(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [quickCheckOut, setQuickCheckOut] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [quickGuests, setQuickGuests] = useState(2);

  const activeMiniRoom = ROOMS_DATA[switcherIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSwitcherIndex((prev) => (prev + 1) % ROOMS_DATA.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = headlineRef.current?.querySelectorAll('.hero-word');
      if (words && words.length) {
        gsap.fromTo(
          words,
          {
            rotateX: -90,
            y: 52,
            opacity: 0,
            transformOrigin: '50% 100%',
          },
          {
            rotateX: 0,
            y: 0,
            opacity: 1,
            duration: 1.15,
            stagger: 0.085,
            ease: 'power4.out',
            delay: 0.15,
          }
        );
      }

      if (subRef.current) {
        gsap.fromTo(
          subRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.95, ease: 'power3.out', delay: 0.68 }
        );
      }

      const acresObj = { val: 0 };
      gsap.to(acresObj, {
        val: 3,
        duration: 1.4,
        ease: 'power2.out',
        delay: 0.4,
        onUpdate: () => {
          if (counterAcresRef.current) {
            counterAcresRef.current.textContent = `${Math.round(acresObj.val)} Acres`;
          }
        },
      });

      const villasObj = { val: 0 };
      gsap.to(villasObj, {
        val: 9,
        duration: 1.6,
        ease: 'power2.out',
        delay: 0.45,
        onUpdate: () => {
          if (counterVillasRef.current) {
            counterVillasRef.current.textContent = `${Math.round(villasObj.val)} Unique`;
          }
        },
      });

      if (heroRef.current && foregroundRef.current) {
        gsap.to(foregroundRef.current, {
          scale: 2.4,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (heroRef.current && bgLayerRef.current) {
        gsap.to(bgLayerRef.current, {
          scale: 1.18,
          y: 48,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (heroRef.current && watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          y: -70,
          scale: 1.12,
          opacity: 0.03,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (bgLayerRef.current) {
        quickXBg.current = gsap.quickTo(bgLayerRef.current, 'x', {
          duration: 0.9,
          ease: 'power3.out',
        });
        quickYBg.current = gsap.quickTo(bgLayerRef.current, 'y', {
          duration: 0.9,
          ease: 'power3.out',
        });
      }
      if (watermarkRef.current) {
        quickXText.current = gsap.quickTo(watermarkRef.current, 'x', {
          duration: 1.1,
          ease: 'power3.out',
        });
        quickYText.current = gsap.quickTo(watermarkRef.current, 'y', {
          duration: 1.1,
          ease: 'power3.out',
        });
      }
      if (foregroundRef.current) {
        quickXFg.current = gsap.quickTo(foregroundRef.current, 'x', {
          duration: 0.7,
          ease: 'power3.out',
        });
        quickYFg.current = gsap.quickTo(foregroundRef.current, 'y', {
          duration: 0.7,
          ease: 'power3.out',
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    quickXBg.current?.(nx * -18);
    quickYBg.current?.(ny * -14);
    quickXText.current?.(nx * 28);
    quickYText.current?.(ny * 18);
    quickXFg.current?.(nx * 36);
    quickYFg.current?.(ny * 16);
  };

  const handleMouseLeave = () => {
    quickXBg.current?.(0);
    quickYBg.current?.(0);
    quickXText.current?.(0);
    quickYText.current?.(0);
    quickXFg.current?.(0);
    quickYFg.current?.(0);
  };

  const headlineLines = ['UNLOCK YOUR', 'HIGHLAND SANCTUARY'];

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[92vh] min-h-[680px] w-full rounded-[32px] overflow-hidden bg-[#142218] shadow-[0_24px_60px_rgba(20,34,24,0.22)] flex flex-col justify-between"
    >
      {/* Background Enhanced Top Mountain Resort Cabana & Lush Highland Layer */}
      <div ref={bgLayerRef} className="absolute -inset-4 z-0 will-change-transform">
        <img
          src={HERO_IMAGES.mainMistyMountain}
          alt="Top Mountain Resort wooden cabana surrounded by lush green hills in Diyatalawa"
          className="h-full w-full object-cover object-center brightness-[0.82] contrast-[1.06] animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#142218]/65 via-[#142218]/28 to-[#142218]/85" />
      </div>

      {/* Giant Translucent Background Typography Layered Behind Foreground Depth Mask */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden select-none will-change-transform"
      >
        <span className="text-[16vw] md:text-[14vw] font-semibold tracking-[-0.04em] leading-none text-white/[0.13] whitespace-nowrap -translate-y-6">
          TopMountain
        </span>
      </div>

      {/* Foreground Mountain Silhouette & Mist Depth Mask (Z-Axis Zoom on Scroll) */}
      <div
        ref={foregroundRef}
        className="pointer-events-none absolute inset-0 z-20 will-change-transform origin-bottom"
      >
        <div
          className="absolute inset-x-[-15%] bottom-[12%] h-[52%] opacity-60 mix-blend-screen animate-mist"
          style={{
            background:
              'radial-gradient(ellipse at 28% 75%, rgba(230,236,230,0.48) 0%, transparent 55%), radial-gradient(ellipse at 74% 70%, rgba(244,246,243,0.4) 0%, transparent 52%)',
          }}
        />
        <div
          className="absolute inset-x-[-15%] bottom-0 h-[42%] opacity-45 mix-blend-screen animate-mist-reverse"
          style={{
            background:
              'radial-gradient(ellipse at 52% 85%, rgba(230,236,230,0.5) 0%, transparent 58%)',
          }}
        />
        <svg
          viewBox="0 0 1440 420"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-[46%] text-[#142218]/90"
        >
          <defs>
            <linearGradient id="ridgeGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#1E3124" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#142218" stopOpacity="0.98" />
            </linearGradient>
          </defs>
          <path
            fill="url(#ridgeGrad)"
            d="M0,255 L42,230 L74,248 L112,188 L145,222 L182,170 L215,212 L262,155 L302,208 L345,178 L392,226 L435,192 L488,242 L542,210 L595,256 L660,218 L720,248 L788,198 L845,236 L902,176 L954,218 L1012,162 L1068,205 L1126,148 L1182,196 L1238,166 L1292,212 L1348,172 L1395,206 L1440,185 L1440,420 L0,420 Z"
          />
          <path
            fill="#E6ECE6"
            fillOpacity="0.18"
            d="M0,295 Q360,230 720,285 T1440,265 L1440,420 L0,420 Z"
          />
        </svg>
      </div>

      {/* Top Bar Inside Hero */}
      <HeroTopBar onOpenBooking={() => onOpenBooking()} onScrollTo={onScrollTo} />

      {/* Center Kinetic Headline */}
      <div className="relative z-30 mx-auto max-w-5xl px-6 text-center my-auto pt-4 pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-[#F4F6F3]"
        >
          <MapPin className="h-3.5 w-3.5 text-[#E6ECE6] animate-pulse" />
          <span>Diyatalawa • Uva Highlands, Sri Lanka</span>
        </motion.div>

        <h1
          ref={headlineRef}
          className="perspective-1000 text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-medium tracking-[-0.03em] leading-[1.04] text-[#F4F6F3] drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
        >
          {headlineLines.map((line, lineIdx) => (
            <span key={lineIdx} className="block overflow-hidden py-0.5">
              {line.split(' ').map((word, wordIdx) => (
                <span
                  key={`${lineIdx}-${wordIdx}`}
                  className={`hero-word inline-block mr-[0.24em] last:mr-0 ${
                    word === 'SANCTUARY' ? 'editorial-serif font-normal text-[1.08em]' : ''
                  }`}
                >
                  {word}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p
          ref={subRef}
          className="mx-auto mt-5 max-w-xl text-sm md:text-base font-light text-[#F4F6F3]/90 leading-relaxed"
        >
          Perched amidst the cool mountain air and lush pine-covered hills of Diyatalawa.
        </p>

        {/* Scroll Cue Pill */}
        <motion.button
          type="button"
          onClick={() => onScrollTo('sanctuary')}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          whileHover={{ y: 2 }}
          className="mt-7 hidden md:inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#F4F6F3]/90 transition-colors"
        >
          <span>Scroll to Discover</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </motion.span>
        </motion.button>
      </div>

      {/* Bottom Floating Widgets Row */}
      <div className="relative z-30 flex flex-col lg:flex-row lg:items-end justify-between gap-4 px-5 pb-16 sm:pb-8 md:px-8">
        {/* Bottom-Left Floating Mini Card: Interactive Room Quick-Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
          className="glass-surface rounded-2xl p-3 flex items-center gap-3.5 max-w-sm text-[#F4F6F3]"
        >
          <button
            type="button"
            onClick={() => onInspectRoom?.(activeMiniRoom.id)}
            className="flex items-center gap-3.5 min-w-0 flex-1 text-left group"
            title="Inspect this villa"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMiniRoom.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3.5 min-w-0 flex-1"
              >
                <img
                  src={activeMiniRoom.thumbnail}
                  alt={activeMiniRoom.shortName}
                  className="h-14 w-16 rounded-xl object-cover shrink-0 border border-white/20 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#E6ECE6]/80">
                    Suite {activeMiniRoom.index} / 09
                  </p>
                  <p className="truncate text-sm font-medium text-white group-hover:underline underline-offset-4">
                    {activeMiniRoom.shortName}
                  </p>
                  <p className="text-xs text-[#E6ECE6]/90">
                    From {activeMiniRoom.priceFormatted}/night
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </button>

          <div className="flex items-center gap-1.5 shrink-0">
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={() =>
                setSwitcherIndex((prev) => (prev - 1 + ROOMS_DATA.length) % ROOMS_DATA.length)
              }
              aria-label="Previous room"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 hover:bg-white/30 border border-white/20 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={() => setSwitcherIndex((prev) => (prev + 1) % ROOMS_DATA.length)}
              aria-label="Next room"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 hover:bg-white/30 border border-white/20 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom-Right Floating HUD Widgets */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3.5">
          {/* Glass Card 1: Animated Counter */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="glass-surface rounded-2xl p-4 text-[#F4F6F3] sm:w-56 flex flex-col justify-between animate-float-gentle"
          >
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[#E6ECE6]/80">
              <span>Estate Scale</span>
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            </div>
            <div className="mt-3 space-y-0.5">
              <div className="text-lg font-semibold leading-tight">
                <span ref={counterAcresRef}>3 Acres</span>
              </div>
              <div className="text-xs text-[#E6ECE6]/90">
                <span ref={counterVillasRef}>9 Unique</span> Villa Categories
              </div>
            </div>
            <p className="mt-2.5 pt-2 border-t border-white/20 text-[11px] text-[#F4F6F3]/80">
              Plan your highland escape
            </p>
          </motion.div>

          {/* Glass Card 2: White/Sage Card with Tags & Expandable Quick-Booking Trigger */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="relative rounded-2xl bg-[#F7F9F6]/95 backdrop-blur-xl border border-white/60 shadow-2xl p-4 text-[#111A14] sm:w-72"
          >
            <div className="flex items-center gap-1.5">
              <span className="rounded-full bg-[#E6ECE6] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#243829]">
                Diyatalawa
              </span>
              <span className="rounded-full bg-[#E6ECE6] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#243829]">
                Nature
              </span>
            </div>

            <p className="mt-2 text-xs text-[#111A14]/75 leading-relaxed">
              Misty pine ridges, natural springs, and warm Sri Lankan highland hospitality.
            </p>

            {/* Expandable Quick Check-in / Check-out / Guests Bar */}
            <AnimatePresence>
              {quickBookOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-2 rounded-xl bg-[#E6ECE6]/75 p-2.5 border border-[#142218]/10 text-[11px]">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="flex items-center gap-1 text-[#243829] font-medium">
                          <Calendar className="h-3 w-3" /> In
                        </label>
                        <input
                          type="date"
                          value={quickCheckIn}
                          onChange={(e) => setQuickCheckIn(e.target.value)}
                          className="mt-0.5 w-full bg-white rounded-md px-1.5 py-1 text-[11px]"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1 text-[#243829] font-medium">
                          <Calendar className="h-3 w-3" /> Out
                        </label>
                        <input
                          type="date"
                          value={quickCheckOut}
                          onChange={(e) => setQuickCheckOut(e.target.value)}
                          className="mt-0.5 w-full bg-white rounded-md px-1.5 py-1 text-[11px]"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="flex items-center gap-1 font-medium text-[#243829]">
                        <Users className="h-3 w-3" /> Guests
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setQuickGuests(Math.max(1, quickGuests - 1))}
                          className="h-5 w-5 rounded-full bg-white text-center font-semibold"
                        >
                          -
                        </button>
                        <span className="font-semibold">{quickGuests}</span>
                        <button
                          type="button"
                          onClick={() => setQuickGuests(Math.min(16, quickGuests + 1))}
                          className="h-5 w-5 rounded-full bg-white text-center font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setQuickBookOpen((v) => !v)}
                className="text-[11px] font-medium underline underline-offset-4 text-[#243829] hover:text-[#142218]"
              >
                {quickBookOpen ? 'Hide Dates' : 'Select Dates'}
              </button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() =>
                  onOpenBooking({
                    roomId: activeMiniRoom.id,
                    checkIn: quickCheckIn,
                    checkOut: quickCheckOut,
                    guests: quickGuests,
                  })
                }
                className="group inline-flex items-center gap-2 rounded-full bg-[#142218] pl-4 pr-1.5 py-1.5 text-xs font-medium text-[#F4F6F3] hover:bg-[#243829] transition-colors"
              >
                <span>Book Now</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4F6F3] text-[#142218] transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
