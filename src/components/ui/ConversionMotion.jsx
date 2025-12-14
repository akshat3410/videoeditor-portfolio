import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

/**
 * Magnetic Button — Button gently attracts to cursor on hover
 * Creates premium, interactive feel for CTAs
 */
export const MagneticButton = ({ 
  children, 
  className = '', 
  strength = 0.3,
  as: Component = 'button',
  ...props 
}) => {
  const buttonRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    if (isHovered) {
      button.addEventListener('mousemove', handleMouseMove);
    }

    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovered, strength]);

  return (
    <Component
      ref={buttonRef}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Pulse CTA — Subtle attention pulse after idle time
 * Draws eye without being aggressive
 */
export const PulseCTA = ({ 
  children, 
  className = '',
  idleDelay = 3000,
  pulseScale = 1.02,
  ...props 
}) => {
  const ctaRef = useRef(null);
  const timeoutRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const startPulse = () => {
      if (!ctaRef.current) return;
      
      animationRef.current = gsap.to(ctaRef.current, {
        scale: pulseScale,
        boxShadow: '0 0 20px rgba(255,255,255,0.2)',
        duration: 1,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    };

    const stopPulse = () => {
      if (animationRef.current) {
        animationRef.current.kill();
        gsap.to(ctaRef.current, {
          scale: 1,
          boxShadow: 'none',
          duration: 0.3
        });
      }
    };

    // Start pulse after idle
    timeoutRef.current = setTimeout(startPulse, idleDelay);

    // Stop on any interaction
    const handleInteraction = () => {
      stopPulse();
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(startPulse, idleDelay);
    };

    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('scroll', handleInteraction);

    return () => {
      clearTimeout(timeoutRef.current);
      stopPulse();
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };
  }, [idleDelay, pulseScale]);

  return (
    <div ref={ctaRef} className={className} {...props}>
      {children}
    </div>
  );
};

/**
 * CountUp — Animated number counter triggered on scroll
 * Builds instant credibility with stats
 */
export const CountUp = ({ 
  end, 
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
  trigger = null
}) => {
  const countRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!countRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            gsap.fromTo(
              countRef.current,
              { innerText: 0 },
              {
                innerText: end,
                duration,
                ease: 'power2.out',
                snap: { innerText: 1 },
                onUpdate: function() {
                  if (countRef.current) {
                    countRef.current.innerText = prefix + Math.round(this.targets()[0].innerText) + suffix;
                  }
                }
              }
            );
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(countRef.current);

    return () => observer.disconnect();
  }, [end, duration, prefix, suffix, hasAnimated]);

  return (
    <span ref={countRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
};

/**
 * RevealOnHover — Text/content reveals on parent hover
 * Creates curiosity and interactivity
 */
export const RevealOnHover = ({ 
  children, 
  className = '',
  direction = 'up'
}) => {
  const transforms = {
    up: 'translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100',
    down: '-translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100',
    left: 'translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100',
    right: '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100',
    fade: 'opacity-0 group-hover:opacity-100'
  };

  return (
    <div className={`transition-all duration-300 ease-out ${transforms[direction]} ${className}`}>
      {children}
    </div>
  );
};

/**
 * TimelineBar — Video editor-style progress bar on hover
 * Speaks to video editors, shows professionalism
 */
export const TimelineBar = ({ 
  className = '',
  duration = 1.5
}) => {
  return (
    <div className={`h-1 bg-white/10 rounded-full overflow-hidden ${className}`}>
      <div 
        className="h-full bg-accent-green rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform ease-out"
        style={{ transitionDuration: `${duration}s` }}
      />
    </div>
  );
};
