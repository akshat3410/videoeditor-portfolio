import { useEffect, useState } from 'react';
import { LuArrowUpRight } from 'react-icons/lu';
import { MagneticButton } from './ConversionMotion';

/**
 * Floating CTA - Appears after scrolling past hero
 * Keeps action accessible throughout journey
 */
const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show after scrolling past hero (100vh)
      setIsVisible(scrollY > windowHeight * 0.8);
      
      // Hide when near footer (last 500px)
      setIsNearFooter(scrollY + windowHeight > documentHeight - 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldShow = isVisible && !isNearFooter;

  return (
    <div 
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${
        shouldShow 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <MagneticButton
        className="group flex items-center gap-2 bg-white text-black px-5 py-3 rounded-full font-semibold text-sm shadow-lg shadow-black/20 hover:bg-gray-100 transition-colors cursor-pointer"
        strength={0.3}
        onClick={() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span>Book a Call</span>
        <LuArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" />
      </MagneticButton>
    </div>
  );
};

export default FloatingCTA;
