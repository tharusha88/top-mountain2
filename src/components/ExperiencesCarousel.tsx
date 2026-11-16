import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { EXPERIENCES_DATA } from '../data/resortData';

gsap.registerPlugin(ScrollTrigger);

export const ExperiencesCarousel: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0.18);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = titleRef.current?.querySelectorAll('.exp-word');
      if (words && words.length && titleRef.current) {
        gsap.fromTo(
          words,
          { opacity: 0.2, y: 12 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            ease: 'none',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              end: 'bottom 55%',
              scrub: true,
            },
          }
        );
      }

      // Staggered entrance for carousel cards when entering viewport
      const cards = trackRef.current?.querySelectorAll('.experience-card');
      if (cards && cards.length && trackRef.current) {
        gsap.fromTo(
          cards,
          { y: 48, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: trackRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const updateProgress = () => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setProgress(1);
      return;
    }
    const ratio = el.scrollLeft / maxScroll;
    setProgress(Math.min(1, Math.max(0.12, ratio)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    dragState.current = {
      startX: e.pageX - trackRef.current.offsetLeft,
      scrollLeft: trackRef.current.scrollLeft,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - dragState.current.startX) * 1.45;
    trackRef.current.scrollLeft = dragState.current.scrollLeft - walk;
    updateProgress();
  };

  const stopDragging = () => setIsDragging(false);

  const scrollByAmount = (dir: -1 | 1) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 400, behavior: 'smooth' });
  };

  return (
    <section
      id="dining"
      ref={sectionRef}
      className="mt-5 rounded-[24px] md:rounded-[32px] bg-[#F7F9F6] px-5 py-14 md:px-12 md:py-20 shadow-[0_12px_40px_rgba(20,34,24,0.06)] overflow-hidden"
    >
      {/* Split Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-8 md:mb-12">
        <div className="lg:col-span-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="inline-block rounded-full bg-[#E6ECE6] px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#243829] mb-4"
          >
            Taste of the Hills &amp; Experiences
          </motion.span>
          <h2
            ref={titleRef}
            className="text-[2.15rem] sm:text-5xl lg:text-6xl font-normal tracking-[-0.03em] leading-[1.08] text-[#111A14]"
          >
            <span className="exp-word inline-block mr-[0.22em] opacity-20">Nature</span>
            <span className="exp-word editorial-serif inline-block mr-[0.22em] opacity-20 text-[1.12em] text-[#243829]">
              and
            </span>
            <span className="exp-word inline-block opacity-20">calmness.</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 space-y-4"
        >
          <p className="text-sm md:text-base text-[#111A14]/75 leading-relaxed">
            From aromatic <strong className="font-medium text-[#142218]">Authentic Sri Lankan Curries</strong>{' '}
            and open-air <strong className="font-medium text-[#142218]">Mountain View Dining</strong> to
            crackling <strong className="font-medium text-[#142218]">Campfire BBQ &amp; Grills</strong>{' '}
            and our golden-hour <strong className="font-medium text-[#142218]">Sunset Ceylon Tea Experience</strong>,
            every flavor is rooted in Uva’s highlands. By day, unwind with spirited{' '}
            <strong className="font-medium text-[#142218]">Lawn Cricket</strong> and{' '}
            <strong className="font-medium text-[#142218]">Evening Badminton</strong> beneath pine canopies.
          </p>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs uppercase tracking-[0.18em] text-[#8A9A8E]">
              Swipe or drag
            </span>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={() => scrollByAmount(-1)}
                aria-label="Previous experience"
                className="flex h-11 w-11 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#142218]/15 bg-white text-[#142218] hover:bg-[#142218] hover:text-[#F4F6F3] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={() => scrollByAmount(1)}
                aria-label="Next experience"
                className="flex h-11 w-11 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#142218]/15 bg-white text-[#142218] hover:bg-[#142218] hover:text-[#F4F6F3] transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Horizontal Smooth-Scroll / Draggable Carousel */}
      <div id="experiences-track" className="relative">
        <div
          ref={trackRef}
          onScroll={updateProgress}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          className={`flex gap-5 overflow-x-auto pb-4 pt-2 select-none snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {EXPERIENCES_DATA.map((item) => (
            <motion.article
              key={item.id}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="experience-card snap-start shrink-0 w-[82vw] sm:w-[360px] md:w-[400px] h-[420px] sm:h-[460px] rounded-[24px] overflow-hidden group relative bg-[#142218] shadow-lg hover:shadow-2xl transition-shadow duration-500"
            >
              <img
                src={item.image}
                alt={item.title}
                draggable={false}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#142218]/92 via-[#142218]/30 to-black/15 transition-opacity duration-500 group-hover:opacity-95" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="rounded-full bg-white/15 backdrop-blur-xl border border-white/25 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[#F4F6F3] transition-transform duration-300 group-hover:translate-x-1">
                  {item.tag}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-black/35 backdrop-blur-md px-2.5 py-1 text-[11px] text-[#E6ECE6]">
                  <Clock className="h-3 w-3" /> {item.time}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-[#F4F6F3] transition-transform duration-500 group-hover:-translate-y-1">
                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs md:text-sm text-[#E6ECE6]/90 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Synchronized Minimal Line Progress Indicator */}
        <div className="mt-6 flex items-center gap-4">
          <div className="relative h-[3px] flex-1 rounded-full bg-[#142218]/12 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full bg-[#142218]"
              animate={{ width: `${Math.round(progress * 100)}%` }}
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            />
          </div>
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8A9A8E]">
            06 Highland Rituals
          </span>
        </div>
      </div>
    </section>
  );
};
