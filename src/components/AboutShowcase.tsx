import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star } from 'lucide-react';
import { STICKY_CARDS } from '../data/resortData';

gsap.registerPlugin(ScrollTrigger);

interface AboutShowcaseProps {
  onExplore: () => void;
}

interface WordToken {
  text: string;
  italic: boolean;
}

const ABOUT_WORDS: WordToken[] = [
  { text: 'A', italic: false },
  { text: 'soulful', italic: false },
  { text: 'mountain', italic: true },
  { text: 'retreat', italic: true },
  { text: 'where', italic: false },
  { text: 'comfort', italic: false },
  { text: 'meets', italic: false },
  { text: 'nature,', italic: true },
  { text: 'silence,', italic: false },
  { text: 'and', italic: false },
  { text: 'serenity.', italic: true },
];

export const AboutShowcase: React.FC<AboutShowcaseProps> = ({ onExplore }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const acresNumRef = useRef<HTMLSpanElement>(null);
  const villasNumRef = useRef<HTMLSpanElement>(null);
  const ratingNumRef = useRef<HTMLSpanElement>(null);

  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-scrubbed word opacity 0.2 -> 1.0 + gentle vertical settle
      const wordEls = headingRef.current?.querySelectorAll('.scrub-word');
      if (wordEls && wordEls.length && headingRef.current) {
        gsap.fromTo(
          wordEls,
          { opacity: 0.2, y: 8 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            ease: 'none',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 84%',
              end: 'bottom 45%',
              scrub: true,
            },
          }
        );
      }

      // Sticky cards depth stacking + inner photo parallax
      const stickyCards = sectionRef.current?.querySelectorAll('.sticky-showcase-card');
      stickyCards?.forEach((card, idx) => {
        const img = card.querySelector('.sticky-card-img');
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.12, yPercent: -5 },
            {
              scale: 1,
              yPercent: 5,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }

        // Subtle scale-down depth as the subsequent card slides over it
        if (idx < stickyCards.length - 1) {
          gsap.to(card, {
            scale: 0.94,
            filter: 'brightness(0.84)',
            ease: 'none',
            scrollTrigger: {
              trigger: stickyCards[idx + 1],
              start: 'top 85%',
              end: 'top 15%',
              scrub: true,
            },
          });
        }
      });

      // Count-up metrics + staggered card entrance when scrolled into view
      if (metricsRef.current) {
        const metricItems = metricsRef.current.querySelectorAll('.metric-card');
        gsap.fromTo(
          metricItems,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: metricsRef.current,
              start: 'top 86%',
              once: true,
            },
          }
        );

        ScrollTrigger.create({
          trigger: metricsRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            const acres = { v: 0 };
            gsap.to(acres, {
              v: 3,
              duration: 1.3,
              ease: 'power3.out',
              onUpdate: () => {
                if (acresNumRef.current) {
                  acresNumRef.current.textContent = `${Math.round(acres.v)}+ Acres`;
                }
              },
            });

            const villas = { v: 0 };
            gsap.to(villas, {
              v: 9,
              duration: 1.5,
              ease: 'power3.out',
              onUpdate: () => {
                if (villasNumRef.current) {
                  villasNumRef.current.textContent = `${Math.round(villas.v)}+ Villas`;
                }
              },
            });

            const rating = { v: 0 };
            gsap.to(rating, {
              v: 4.8,
              duration: 1.6,
              ease: 'power3.out',
              onUpdate: () => {
                if (ratingNumRef.current) {
                  ratingNumRef.current.textContent = `${rating.v.toFixed(1)} ★`;
                }
              },
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sanctuary"
      ref={sectionRef}
      className="mt-5 rounded-[32px] bg-[#F7F9F6] px-5 py-14 md:px-12 md:py-20 shadow-[0_12px_40px_rgba(20,34,24,0.06)]"
    >
      {/* Top Header & Section Label */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12 md:mb-16">
        <div className="max-w-4xl">
          <h2
            ref={headingRef}
            className="text-3xl sm:text-5xl lg:text-[3.65rem] font-normal leading-[1.12] tracking-[-0.025em] text-[#111A14]"
          >
            {ABOUT_WORDS.map((token, idx) => (
              <span
                key={idx}
                className={`scrub-word inline-block mr-[0.26em] opacity-20 ${
                  token.italic ? 'editorial-serif text-[1.12em] font-normal text-[#243829]' : ''
                }`}
              >
                {token.text}
              </span>
            ))}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 md:text-right"
        >
          <span className="inline-flex items-center rounded-full bg-[#E6ECE6] px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-[#243829] uppercase">
            01 / About Us
          </span>
        </motion.div>
      </div>

      {/* Stacked Sticky Showcase Cards */}
      <div className="relative space-y-8 pb-8">
        {STICKY_CARDS.map((card, index) => (
          <div
            key={card.id}
            style={{ top: `${48 + index * 16}px` }}
            className="sticky-showcase-card sticky top-12 h-[75vh] min-h-[500px] w-full rounded-[28px] overflow-hidden shadow-2xl border border-white/30 bg-[#142218] origin-top will-change-transform"
          >
            <img
              src={card.image}
              alt={card.title}
              className="sticky-card-img h-full w-full object-cover object-center will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#142218]/85 via-[#142218]/20 to-black/15" />

            {/* Top-Right Card Counter Pill */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="absolute top-5 right-5 z-20 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.2em] text-[#F4F6F3] uppercase"
            >
              0{index + 1} / 03 • {card.subtitle}
            </motion.div>

            {/* Floating Pulsing Glass Hotspot Pills */}
            {card.hotspots.map((spot) => {
              const isOpen = activeHotspot === spot.id;
              return (
                <div
                  key={spot.id}
                  style={{ left: spot.x, top: spot.y }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  onMouseEnter={() => setActiveHotspot(spot.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <motion.button
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => setActiveHotspot(isOpen ? null : spot.id)}
                    className="group relative flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-xl border border-white/35 px-3.5 py-1.5 text-xs font-medium text-[#F4F6F3] shadow-xl transition-colors duration-300 hover:bg-white/30"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="hotspot-ring absolute inline-flex h-full w-full rounded-full bg-white" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F4F6F3]" />
                    </span>
                    <span className="whitespace-nowrap">{spot.label}</span>
                  </motion.button>

                  {/* Tooltip */}
                  <div
                    className={`mt-2 w-60 rounded-2xl bg-[#142218]/92 backdrop-blur-xl border border-white/20 p-3.5 text-xs text-[#F4F6F3] shadow-2xl transition-all duration-300 ${
                      isOpen
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                        : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                    }`}
                  >
                    <p className="font-semibold text-white">{spot.label}</p>
                    <p className="mt-1 text-[#E6ECE6]/85 leading-relaxed">{spot.detail}</p>
                  </div>
                </div>
              );
            })}

            {/* Bottom-Left Frosted Glass Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-5 left-5 right-5 sm:right-auto z-20 backdrop-blur-md bg-black/40 border border-white/20 p-6 rounded-2xl max-w-sm text-[#F4F6F3] shadow-2xl"
            >
              <div className="flex items-center gap-1 text-[#E6ECE6]" aria-label="5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <h3 className="mt-3 text-xl font-medium tracking-tight text-white">
                {card.title}
              </h3>
              <p className="mt-2 text-xs md:text-sm text-[#F4F6F3]/85 leading-relaxed">
                {card.description}
              </p>
              <motion.button
                whileHover={{ scale: 1.04, x: 2 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={onExplore}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#F4F6F3] px-5 py-2.5 text-xs font-semibold text-[#142218]"
              >
                <span>Explore</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.button>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Animated Metrics Row */}
      <div
        ref={metricsRef}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-[#142218]/10"
      >
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="metric-card rounded-[24px] bg-[#E6ECE6]/70 p-7 border border-[#142218]/5 shadow-sm hover:shadow-md transition-shadow"
        >
          <span
            ref={acresNumRef}
            className="block text-4xl md:text-5xl font-medium tracking-tight text-[#142218]"
          >
            3+ Acres
          </span>
          <p className="mt-2 text-sm text-[#8A9A8E]">
            of lush highland sanctuary nestled amid Diyatalawa pines
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="metric-card rounded-[24px] bg-[#E6ECE6]/70 p-7 border border-[#142218]/5 shadow-sm hover:shadow-md transition-shadow"
        >
          <span
            ref={villasNumRef}
            className="block text-4xl md:text-5xl font-medium tracking-tight text-[#142218]"
          >
            9+ Villas
          </span>
          <p className="mt-2 text-sm text-[#8A9A8E]">
            cabanas, mud houses &amp; heritage highland bungalows
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="metric-card rounded-[24px] bg-[#E6ECE6]/70 p-7 border border-[#142218]/5 shadow-sm hover:shadow-md transition-shadow"
        >
          <span
            ref={ratingNumRef}
            className="block text-4xl md:text-5xl font-medium tracking-tight text-[#142218]"
          >
            4.8 ★
          </span>
          <p className="mt-2 text-sm text-[#8A9A8E]">
            rated for warm Sri Lankan hospitality &amp; pristine comfort
          </p>
        </motion.div>
      </div>
    </section>
  );
};
