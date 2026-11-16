import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarCheck, CloudFog } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onScrollTo: (sectionId: string) => void;
}

const DOCK_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'sanctuary', label: 'Sanctuary' },
  { id: 'villas', label: 'Villas' },
  { id: 'dining', label: 'Dining' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
];

export const HeroTopBar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-30 flex items-center justify-between gap-4 px-5 pt-5 md:px-8 md:pt-7"
    >
      {/* Top-Left Monogram + Climate Chip */}
      <div className="flex items-center gap-2.5">
        <motion.a
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          href="#home"
          className="group flex items-center gap-3 rounded-full bg-white/15 px-3.5 py-2 backdrop-blur-xl border border-white/25 text-[#F4F6F3] transition-colors duration-300 hover:bg-white/25"
          aria-label="Top Mountain Resort Home"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#142218] text-[11px] font-semibold tracking-wider text-[#F4F6F3] transition-transform duration-500 group-hover:rotate-[360deg]">
            TM
          </span>
          <span className="hidden sm:inline text-xs font-medium tracking-[0.18em] uppercase text-[#F4F6F3]/95">
            Top Mountain
          </span>
        </motion.a>

        <div className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-black/25 backdrop-blur-xl border border-white/20 px-3 py-2 text-[11px] text-[#E6ECE6]">
          <CloudFog className="h-3.5 w-3.5 text-[#E6ECE6]" />
          <span>18°C • Misty Pines</span>
        </div>
      </div>

      {/* Top-Center Micro-Marquee Ticker */}
      <div className="hidden xl:flex max-w-[480px] overflow-hidden rounded-full bg-black/25 backdrop-blur-xl border border-white/20 py-2 px-4">
        <div className="flex whitespace-nowrap animate-marquee text-[11px] font-medium tracking-[0.22em] text-[#F4F6F3]/90 uppercase">
          <span className="mx-4">
            ESCAPE TO DIYATALAWA • PURE AIR &amp; ENDLESS GREENERY • 3-ACRE HIGHLAND ESTATE
          </span>
          <span className="mx-4">
            ESCAPE TO DIYATALAWA • PURE AIR &amp; ENDLESS GREENERY • 3-ACRE HIGHLAND ESTATE
          </span>
        </div>
      </div>

      {/* Top-Right Dark Glass Pill CTA */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        type="button"
        onClick={onOpenBooking}
        className="group flex items-center gap-2.5 rounded-full bg-[#142218]/75 hover:bg-[#142218] backdrop-blur-xl border border-white/25 px-4 py-2 text-xs md:text-sm font-medium text-[#F4F6F3] shadow-2xl transition-colors duration-300"
      >
        <span>Book Your Stay</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4F6F3] text-[#142218] transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </motion.button>
    </motion.header>
  );
};

export const BottomFloatingDock: React.FC<{
  onScrollTo: (sectionId: string) => void;
  onOpenBooking: () => void;
}> = ({ onScrollTo, onOpenBooking }) => {
  const [activeId, setActiveId] = useState('home');
  const navRef = useRef<HTMLElement>(null);

  // Keep the active item visible when the dock is horizontally scrollable (phones)
  useEffect(() => {
    const nav = navRef.current;
    const btn = nav?.querySelector<HTMLElement>(`[data-dock-id="${activeId}"]`);
    if (!nav || !btn || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({
      left: btn.offsetLeft - nav.clientWidth / 2 + btn.offsetWidth / 2,
      behavior: 'smooth',
    });
  }, [activeId]);

  useEffect(() => {
    const ids = [
      'home',
      'sanctuary',
      'dining',
      'experiences-track',
      'villas',
      'reviews',
      'contact',
    ];
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= scrollPos) {
            setActiveId(ids[i] === 'experiences-track' ? 'experiences' : ids[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      ref={navRef}
      initial={{ x: '-50%', y: 40, opacity: 0 }}
      animate={{ x: '-50%', y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Primary Resort Navigation"
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] sm:bottom-5 left-1/2 z-50 max-w-[calc(100vw-1.25rem)] overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-full bg-[#142218]/85 backdrop-blur-2xl border border-white/20 px-2 py-1.5 shadow-[0_20px_50px_rgba(17,26,20,0.42)]"
    >
      <div className="flex items-center gap-1.5 whitespace-nowrap">
        <ul className="relative flex items-center gap-1">
          {DOCK_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id} className="relative">
                <button
                  type="button"
                  data-dock-id={item.id}
                  onClick={() => {
                    setActiveId(item.id);
                    onScrollTo(item.id === 'experiences' ? 'experiences-track' : item.id);
                  }}
                  className={`relative z-10 px-3 sm:px-3.5 py-2.5 sm:py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors duration-300 ${
                    isActive ? 'text-[#142218]' : 'text-[#F4F6F3]/80 hover:text-[#F4F6F3]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="dockActivePill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full bg-[#F4F6F3] shadow-sm"
                    />
                  )}
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        <span className="h-4 w-[1px] bg-white/20 mx-0.5 hidden sm:block" aria-hidden="true" />

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onOpenBooking}
          className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#243829] hover:bg-[#314b37] border border-white/15 px-3.5 py-1.5 text-xs font-medium text-[#F4F6F3] transition-colors"
        >
          <CalendarCheck className="h-3.5 w-3.5" />
          <span>Reserve</span>
        </motion.button>
      </div>
    </motion.nav>
  );
};
