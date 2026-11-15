import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from './components/Hero';
import { AboutShowcase } from './components/AboutShowcase';
import { ExperiencesCarousel } from './components/ExperiencesCarousel';
import { RoomAccordion } from './components/RoomAccordion';
import { Testimonials } from './components/Testimonials';
import { ContactFooter } from './components/ContactFooter';
import { BottomFloatingDock } from './components/Navbar';
import { BookingModal } from './components/BookingModal';

gsap.registerPlugin(ScrollTrigger);

interface BookingPrefill {
  roomId?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

export function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<BookingPrefill>({});
  const [focusedRoomId, setFocusedRoomId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -20 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInspectRoom = (roomId: string) => {
    setFocusedRoomId(roomId);
    handleScrollTo('villas');
  };

  const handleOpenBooking = (opts?: BookingPrefill) => {
    setBookingPrefill(opts || {});
    setBookingOpen(true);
  };

  return (
    <div className="p-3 md:p-5 bg-[#E6ECE6] min-h-screen text-[#111A14]">
      {/* Subtle Top Highland Scroll Progress Ribbon */}
      <motion.div
        style={{ scaleX: smoothProgress }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#243829] via-[#142218] to-[#8A9A8E] origin-left z-[60] pointer-events-none"
      />

      <main className="mx-auto max-w-[1600px]">
        <Hero
          onOpenBooking={handleOpenBooking}
          onScrollTo={handleScrollTo}
          onInspectRoom={handleInspectRoom}
        />

        <AboutShowcase onExplore={() => handleScrollTo('villas')} />

        <ExperiencesCarousel />

        <RoomAccordion
          focusedRoomId={focusedRoomId}
          onBookRoom={(roomId) => handleOpenBooking({ roomId })}
        />

        <Testimonials />

        <ContactFooter
          onScrollTo={handleScrollTo}
          onOpenBooking={handleOpenBooking}
          onInspectRoom={handleInspectRoom}
        />
      </main>

      <BottomFloatingDock
        onScrollTo={handleScrollTo}
        onOpenBooking={() => handleOpenBooking()}
      />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialRoomId={bookingPrefill.roomId}
        initialCheckIn={bookingPrefill.checkIn}
        initialCheckOut={bookingPrefill.checkOut}
        initialGuests={bookingPrefill.guests}
      />
    </div>
  );
}

export default App;
