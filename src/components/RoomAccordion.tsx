import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, Maximize2, Users, X } from 'lucide-react';
import { ROOMS_DATA, RoomCategory } from '../data/resortData';

interface RoomAccordionProps {
  onBookRoom: (roomId: string) => void;
  focusedRoomId?: string | null;
}

const CATEGORIES: Array<'All' | RoomCategory['category']> = [
  'All',
  'Luxury Villa',
  'Bungalow',
  'Family Deluxe',
  'Mud House',
  'Wooden Cabana',
];

const SUPERSCRIPTS: Record<string, string> = {
  '01': '⁰¹',
  '02': '⁰²',
  '03': '⁰³',
  '04': '⁰⁴',
  '05': '⁰⁵',
  '06': '⁰⁶',
  '07': '⁰⁷',
  '08': '⁰⁸',
  '09': '⁰⁹',
};

export const RoomAccordion: React.FC<RoomAccordionProps> = ({ onBookRoom, focusedRoomId }) => {
  const [selectedCategory, setSelectedCategory] =
    useState<'All' | RoomCategory['category']>('All');
  const [activeRoomId, setActiveRoomId] = useState<string>(ROOMS_DATA[0].id);
  const [activePanelIndex, setActivePanelIndex] = useState<number>(0);
  const [shimmerKey, setShimmerKey] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  useEffect(() => {
    if (focusedRoomId && ROOMS_DATA.some((r) => r.id === focusedRoomId)) {
      setSelectedCategory('All');
      setActiveRoomId(focusedRoomId);
      setShimmerKey((k) => k + 1);
    }
  }, [focusedRoomId]);

  const filteredRooms = useMemo(() => {
    if (selectedCategory === 'All') return ROOMS_DATA;
    return ROOMS_DATA.filter((room) => room.category === selectedCategory);
  }, [selectedCategory]);

  const activeRoom = useMemo(
    () => ROOMS_DATA.find((r) => r.id === activeRoomId) || ROOMS_DATA[0],
    [activeRoomId]
  );

  const triggerShimmer = () => {
    setShimmerKey((k) => k + 1);
  };

  const selectRoom = (roomId: string) => {
    if (roomId === activeRoomId) return;
    setActiveRoomId(roomId);
    triggerShimmer();
  };

  const handleCategoryChange = (cat: 'All' | RoomCategory['category']) => {
    setSelectedCategory(cat);
    const matches =
      cat === 'All' ? ROOMS_DATA : ROOMS_DATA.filter((r) => r.category === cat);
    if (matches.length > 0 && !matches.some((m) => m.id === activeRoomId)) {
      setActiveRoomId(matches[0].id);
      triggerShimmer();
    }
  };

  const cycleRoom = (dir: -1 | 1) => {
    const idx = ROOMS_DATA.findIndex((r) => r.id === activeRoomId);
    const nextIdx = (idx + dir + ROOMS_DATA.length) % ROOMS_DATA.length;
    const nextRoom = ROOMS_DATA[nextIdx];
    setSelectedCategory('All');
    setActiveRoomId(nextRoom.id);
    triggerShimmer();
  };

  const handlePanelClick = (idx: number) => {
    if (idx === activePanelIndex) return;
    setActivePanelIndex(idx);
    triggerShimmer();
  };

  return (
    <motion.section
      id="villas"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="mt-5 rounded-[32px] bg-[#F7F9F6] px-5 py-14 md:px-12 md:py-20 shadow-[0_12px_40px_rgba(20,34,24,0.06)]"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <span className="inline-block rounded-full bg-[#E6ECE6] px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#243829] mb-4">
            02 / Accommodations
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-normal tracking-[-0.028em] leading-[1.08] text-[#111A14]">
            Find <span className="editorial-serif text-[1.12em] text-[#243829]">peace of mind</span>{' '}
            at Top Mountain.
          </h2>
        </div>

        <p className="max-w-sm text-xs md:text-sm text-[#8A9A8E] leading-relaxed">
          Nine distinct highland retreats—from expansive luxury cabanas and manor bungalows to
          handcrafted mud houses and pinewood cabins.
        </p>
      </div>

      {/* Category Filter Pills & Room Selector Strip */}
      <div className="mb-8 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-300 ${
                  active ? 'text-[#F4F6F3]' : 'bg-[#E6ECE6] text-[#243829] hover:bg-[#DCE5DC]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="roomCategoryPill"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-[#142218] shadow-sm"
                  />
                )}
                <span className="relative z-10">
                  {cat === 'All' ? 'All Suites (09)' : cat}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="flex flex-wrap items-center gap-2 pt-1">
          {filteredRooms.map((room) => {
            const isCurrent = room.id === activeRoom.id;
            return (
              <motion.button
                layout
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                key={room.id}
                type="button"
                onClick={() => selectRoom(room.id)}
                className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors duration-300 ${
                  isCurrent
                    ? 'border-[#142218] bg-[#243829] text-[#F4F6F3] font-medium shadow-sm'
                    : 'border-[#142218]/15 bg-white/80 text-[#111A14]/80 hover:border-[#142218]/40'
                }`}
              >
                <span className="opacity-65 mr-1.5">{room.index}</span>
                {room.name}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Split Layout: 4 cols Left Sage Card | 8 cols Right 3-Panel Interactive Accordion */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column (4 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 bg-[#DCE5DC] rounded-[28px] p-6 sm:p-8 flex flex-col justify-between border border-[#142218]/8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRoom.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              {/* Title + Superscript Index */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#243829]">
                    {activeRoom.category}
                  </span>
                  <div className="flex items-center gap-3 text-[11px] font-medium text-[#243829]">
                    <span className="inline-flex items-center gap-1">
                      <Maximize2 className="h-3 w-3" /> {activeRoom.size}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-3 w-3" /> {activeRoom.occupancy}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#111A14]">
                  {activeRoom.shortName}
                  <sup className="ml-1 text-base font-medium text-[#243829]">
                    {SUPERSCRIPTS[activeRoom.index] || activeRoom.index}
                  </sup>
                </h3>
                <p className="mt-0.5 text-xs text-[#243829]/80 font-medium">{activeRoom.name}</p>
              </div>

              {/* Quick Spec Strip */}
              <div className="grid grid-cols-3 gap-2 rounded-2xl bg-[#F7F9F6]/60 p-3 border border-[#142218]/8 text-center">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#8A9A8E]">Space</p>
                  <p className="mt-0.5 text-xs font-semibold text-[#142218]">{activeRoom.size}</p>
                </div>
                <div className="border-x border-[#142218]/10">
                  <p className="text-[10px] uppercase tracking-wider text-[#8A9A8E]">Capacity</p>
                  <p className="mt-0.5 text-xs font-semibold text-[#142218]">
                    {activeRoom.maxAdults}A / {activeRoom.maxChildren}C
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#8A9A8E]">View</p>
                  <p className="mt-0.5 text-xs font-semibold text-[#142218]">Pine Hills</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#111A14]/80 leading-relaxed">
                {activeRoom.description}
              </p>

              {/* 3x3 Grid of Bordered Amenity Pills */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#243829]/75 mb-2.5">
                  Included Sanctuary Amenities
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  {activeRoom.amenities.map((amenity, aIdx) => (
                    <motion.span
                      key={amenity}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.28, delay: aIdx * 0.03 }}
                      whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.95)' }}
                      className="rounded-lg border border-[#142218]/15 bg-[#F7F9F6]/65 px-2 py-1.5 text-center text-[10px] font-medium text-[#111A14] leading-tight flex items-center justify-center transition-colors"
                    >
                      {amenity}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Price Row & Full-Width Dark Pine Pill CTA */}
          <div className="mt-7 pt-5 border-t border-[#142218]/12 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-[0.16em] text-[#243829]">
                Price per night:
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeRoom.priceFormatted}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="text-xl sm:text-2xl font-semibold tracking-tight text-[#142218]"
                >
                  {activeRoom.priceFormatted}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2.5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => onBookRoom(activeRoom.id)}
                className="flex-1 rounded-full bg-[#142218] py-3.5 px-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#F4F6F3] hover:bg-[#243829] transition-colors"
              >
                Book This Stay
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08, rotate: 45 }}
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={() => onBookRoom(activeRoom.id)}
                aria-label="Open booking modal for this stay"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#142218] text-[#F4F6F3] hover:bg-[#243829] transition-colors"
              >
                <ArrowUpRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right Column (8 cols): 3 Vertical Arch/Pill-Rounded Interactive Panels */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between">
          <div className="h-[460px] sm:h-[520px] flex gap-3 sm:gap-4">
            {activeRoom.panels.map((panel, idx) => {
              const isExpanded = activePanelIndex === idx;
              return (
                <div
                  key={`${activeRoom.id}-panel-${idx}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => handlePanelClick(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handlePanelClick(idx);
                    }
                  }}
                  aria-expanded={isExpanded}
                  className={`relative h-full rounded-[32px] overflow-hidden text-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none group ${
                    isExpanded ? 'flex-[4]' : 'flex-[1] cursor-pointer'
                  }`}
                >
                  <img
                    src={panel.image}
                    alt={`${activeRoom.name} — ${panel.label}`}
                    className={`h-full w-full object-cover object-center transition-transform duration-700 ${
                      isExpanded
                        ? 'animate-ken-burns'
                        : 'scale-105 group-hover:scale-112 brightness-90 group-hover:brightness-100'
                    }`}
                  />

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isExpanded
                        ? 'bg-gradient-to-t from-[#142218]/75 via-transparent to-black/15'
                        : 'bg-[#142218]/45 group-hover:bg-[#142218]/25'
                    }`}
                  />

                  {/* Signature MistPeak Mosaic Pixel Grid Overlay Transition (600ms dissolve) */}
                  <div
                    key={`shimmer-${shimmerKey}-${idx}`}
                    className="mosaic-shimmer-overlay absolute inset-0 z-10"
                  />

                  {/* Fullscreen Preview Trigger on Expanded Panel */}
                  {isExpanded && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxOpen(true);
                      }}
                      aria-label="Open fullscreen gallery view"
                      className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-xl border border-white/25 text-[#F4F6F3] transition-colors"
                    >
                      <Expand className="h-4 w-4" />
                    </motion.button>
                  )}

                  {/* Expanded Bottom Label */}
                  {isExpanded ? (
                    <motion.div
                      key={`label-${activeRoom.id}-${idx}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between gap-4"
                    >
                      <div className="rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 px-4 py-3 text-[#F4F6F3]">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#E6ECE6]/80">
                          View 0{idx + 1}
                        </p>
                        <p className="text-base sm:text-lg font-medium text-white">
                          {panel.label}
                        </p>
                        <p className="text-xs text-[#E6ECE6]/85 mt-0.5">{panel.subtitle}</p>
                      </div>
                    </motion.div>
                  ) : (
                    /* Compressed Vertical Compact Label */
                    <div className="absolute inset-0 z-20 flex items-center justify-center p-2">
                      <span
                        className="whitespace-nowrap text-[10px] sm:text-xs font-medium tracking-[0.16em] sm:tracking-[0.18em] uppercase text-[#F4F6F3] bg-black/35 backdrop-blur-md border border-white/20 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full transition-transform duration-300 group-hover:scale-105"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        {panel.label}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom-Right Room Cycling Arrows & Panel Dots */}
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <p className="text-xs text-[#8A9A8E]">
                Suite{' '}
                <span className="font-medium text-[#142218]">{activeRoom.index} / 09</span>
              </p>
              <div className="hidden sm:flex items-center gap-1.5">
                {activeRoom.panels.map((p, pIdx) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => handlePanelClick(pIdx)}
                    aria-label={`View ${p.label}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activePanelIndex === pIdx
                        ? 'w-6 bg-[#142218]'
                        : 'w-1.5 bg-[#142218]/25 hover:bg-[#142218]/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={() => cycleRoom(-1)}
                aria-label="Previous accommodation"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#142218]/20 bg-white text-[#142218] hover:bg-[#142218] hover:text-[#F4F6F3] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={() => cycleRoom(1)}
                aria-label="Next accommodation"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#142218]/20 bg-white text-[#142218] hover:bg-[#142218] hover:text-[#F4F6F3] transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-[#142218]/90 backdrop-blur-xl p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-[28px] overflow-hidden bg-[#142218] border border-white/20 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close fullscreen preview"
                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-white hover:text-[#142218] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <img
                src={activeRoom.panels[activePanelIndex].image}
                alt={activeRoom.panels[activePanelIndex].label}
                className="w-full max-h-[75vh] object-cover"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#142218] text-[#F4F6F3]">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#8A9A8E]">
                    {activeRoom.name} • {activeRoom.panels[activePanelIndex].label}
                  </p>
                  <p className="text-sm text-[#E6ECE6] mt-0.5">
                    {activeRoom.panels[activePanelIndex].subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActivePanelIndex((prev) => (prev - 1 + 3) % 3)
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:bg-white/15"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePanelIndex((prev) => (prev + 1) % 3)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:bg-white/15"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
