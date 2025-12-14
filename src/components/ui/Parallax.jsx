import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ParallaxEngine } from "../../lib/animation/parallax-engine";

gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {Object} ParallaxProps
 * @property {React.ReactNode} children
 * @property {number} [speed=0.5] - Scroll parallax depth multiplier (0 = static, 1 = full scroll speed)
 * @property {"x" | "y" | "both"} [direction="y"] - Movement axis
 * @property {number} [range=30] - Max movement in pixels for mouse/gyro parallax
 * @property {number} [easing=0.08] - Smoothness factor (0.01 = slow, 0.2 = snappy)
 * @property {"scroll" | "mouse" | "hybrid"} [mode="hybrid"] - Parallax type
 * @property {boolean} [disabledOnMobile=false] - Disable mouse parallax on mobile
 * @property {string} [className=""] - Additional CSS classes
 */

/**
 * Parallax Container Component
 * 
 * Applies production-ready parallax effects using a dual-layer architecture:
 * - Outer layer: Scroll-based parallax via GSAP ScrollTrigger
 * - Inner layer: Mouse/gyroscope-based parallax via requestAnimationFrame
 * 
 * Features:
 * - Respects `prefers-reduced-motion`
 * - GPU-accelerated (translate3d only)
 * - Clean unmount with no memory leaks
 * - SSR-safe
 * 
 * @param {ParallaxProps} props
 * 
 * @example
 * // Scroll-only parallax
 * <Parallax speed={0.3} mode="scroll">
 *   <img src="/hero.jpg" alt="Hero" />
 * </Parallax>
 * 
 * @example
 * // Mouse-only parallax
 * <Parallax range={20} mode="mouse">
 *   <div className="floating-badge">Badge</div>
 * </Parallax>
 * 
 * @example
 * // Hybrid (scroll + mouse micro-interaction)
 * <Parallax speed={0.5} range={15} mode="hybrid" direction="both">
 *   <div className="hero-content">...</div>
 * </Parallax>
 */
export const Parallax = ({ 
  children, 
  speed = 0.5,
  direction = "y",
  range = 30,
  easing = 0.08,
  mode = "hybrid",
  disabledOnMobile = false,
  className = "" 
}) => {
  const scrollRef = useRef(null);  // Outer wrapper for Scroll Parallax
  const mouseRef = useRef(null);   // Inner wrapper for Mouse Parallax
  const engineRef = useRef(null);
  const rafRef = useRef(null);
  
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference (SSR-safe)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Mouse/Gyroscope Parallax
  useEffect(() => {
    // Skip if reduced motion, SSR, or scroll-only mode
    if (typeof window === 'undefined') return;
    if (prefersReducedMotion) return;
    if (mode === 'scroll') return;
    
    // Check mobile + disabled preference
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (disabledOnMobile && isMobile) return;

    // Initialize engine
    engineRef.current = new ParallaxEngine({ 
      damping: easing, 
      range,
      useGyroscope: !disabledOnMobile,
      throttleMs: 16
    });
    engineRef.current.init();

    // Animation loop
    const applyTransform = () => {
      if (!mouseRef.current || !engineRef.current?.isRunning()) return;
      
      const offset = engineRef.current.getOffset(direction);
      
      // Use translate3d for GPU acceleration
      mouseRef.current.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0)`;
      
      rafRef.current = requestAnimationFrame(applyTransform);
    };
    
    rafRef.current = requestAnimationFrame(applyTransform);

    // Cleanup
    return () => {
      if (engineRef.current) {
        engineRef.current.destroy();
        engineRef.current = null;
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [direction, range, easing, mode, disabledOnMobile, prefersReducedMotion]);

  // Scroll Parallax
  useGSAP(() => {
    // Skip if reduced motion or mouse-only mode
    if (prefersReducedMotion) return;
    if (mode === 'mouse') return;
    if (!scrollRef.current) return;
    if (speed === 0) return;
    
    // Calculate scroll movement based on direction
    const scrollConfig = {
      ease: "none",
      scrollTrigger: {
        trigger: scrollRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5, // Smooth scrubbing
      }
    };

    // Apply movement based on direction
    const movement = speed * 100; // Convert to percentage
    
    if (direction === 'y' || direction === 'both') {
      scrollConfig.yPercent = movement;
    }
    if (direction === 'x' || direction === 'both') {
      scrollConfig.xPercent = movement;
    }

    gsap.to(scrollRef.current, scrollConfig);
    
  }, { 
    scope: scrollRef,
    dependencies: [speed, direction, mode, prefersReducedMotion] 
  });

  // If reduced motion, render children without parallax
  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <div 
      ref={scrollRef} 
      className={`parallax-wrapper ${className}`}
      style={{ willChange: mode !== 'mouse' ? 'transform' : undefined }}
    >
      <div 
        ref={mouseRef} 
        className="parallax-inner"
        style={{ 
          willChange: mode !== 'scroll' ? 'transform' : undefined
        }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * Lightweight mouse-only parallax for decorative elements
 * Uses less resources than full Parallax component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.range=20] - Max movement in pixels
 * @param {"x" | "y" | "both"} [props.direction="both"]
 * @param {number} [props.easing=0.1] - Smoothness factor
 * @param {string} [props.className=""]
 */
export const MouseParallax = ({
  children,
  range = 20,
  direction = "both",
  easing = 0.1,
  className = ""
}) => {
  return (
    <Parallax
      mode="mouse"
      range={range}
      direction={direction}
      easing={easing}
      className={className}
    >
      {children}
    </Parallax>
  );
};

/**
 * Scroll-only parallax for background layers
 * No mouse tracking overhead
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.speed=0.5] - Depth multiplier
 * @param {"x" | "y" | "both"} [props.direction="y"]
 * @param {string} [props.className=""]
 */
export const ScrollParallax = ({
  children,
  speed = 0.5,
  direction = "y",
  className = ""
}) => {
  return (
    <Parallax
      mode="scroll"
      speed={speed}
      direction={direction}
      className={className}
    >
      {children}
    </Parallax>
  );
};

export default Parallax;
