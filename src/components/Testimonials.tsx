import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { GUEST_REVIEWS } from '../data/resortData';

export const Testimonials: React.FC = () => {
  const repeatedReviews = [...GUEST_REVIEWS, ...GUEST_REVIEWS];

  return (
    <motion.section
      id="reviews"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="mt-5 rounded-[24px] md:rounded-[32px] bg-[#F7F9F6] py-14 md:py-20 shadow-[0_12px_40px_rgba(20,34,24,0.06)] overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 md:px-12 mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-[#E6ECE6] px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#243829] mb-4"
          >
            03 / Guest Stories
          </motion.span>
          <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.025em] leading-[1.12] text-[#111A14]">
            We are pleased to have helped you{' '}
            <span className="editorial-serif text-[1.14em] text-[#243829]">find peace</span> of mind
            in the hills.
          </h2>
        </div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="rounded-2xl bg-[#E6ECE6]/80 px-5 py-3.5 border border-[#142218]/10 shrink-0"
        >
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A9A8E]">
            Guest Hospitality Score
          </p>
          <p className="mt-0.5 text-xl font-semibold text-[#142218]">
            8.9 / 10 <span className="text-xs font-normal text-[#243829]">• Staff &amp; Warmth</span>
          </p>
        </motion.div>
      </div>

      {/* Horizontal Auto-Scrolling Marquee (Pauses on Hover) */}
      <div className="relative group py-2">
        <div className="flex w-max gap-5 animate-marquee-slow group-hover:[animation-play-state:paused] px-5">
          {repeatedReviews.map((review, index) => (
            <motion.article
              key={`${review.id}-${index}`}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="w-[290px] sm:w-[340px] shrink-0 rounded-[24px] bg-[#243829] text-[#F4F6F3] p-6 sm:p-7 flex flex-col justify-between shadow-xl border border-white/10 cursor-default"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#E6ECE6]">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-[#E6ECE6]">
                    {review.rating}
                  </span>
                </div>

                <Quote className="mt-5 h-6 w-6 text-[#8A9A8E]/70" />
                <p className="mt-3 text-sm leading-relaxed text-[#F4F6F3]/90">
                  “{review.quote}”
                </p>
              </div>

              <div className="mt-7 pt-4 border-t border-white/15">
                <p className="text-sm font-medium text-white">{review.guest}</p>
                <p className="mt-0.5 text-xs text-[#8A9A8E]">
                  {review.origin} • {review.stayType}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
