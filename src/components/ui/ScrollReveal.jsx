import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollReveal - Word-by-word text reveal with blur and rotation
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Text content to animate
 * @param {React.RefObject<HTMLElement>} [props.scrollContainerRef] - Custom scroll container
 * @param {boolean} [props.enableBlur=true] - Enable blur effect
 * @param {number} [props.baseOpacity=0.1] - Starting opacity
 * @param {number} [props.baseRotation=3] - Starting rotation in degrees
 * @param {number} [props.blurStrength=4] - Blur amount in pixels
 * @param {string} [props.containerClassName=''] - Additional container classes
 * @param {string} [props.textClassName=''] - Additional text classes
 * @param {string} [props.rotationEnd='bottom bottom'] - ScrollTrigger end for rotation
 * @param {string} [props.wordAnimationEnd='bottom bottom'] - ScrollTrigger end for word animation
 * @param {string} [props.as='h2'] - HTML element to render as
 */
const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'center center',
  wordAnimationEnd = 'center center',
  as: Component = 'h2'
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const scroller = scrollContainerRef?.current || window;

    // Rotation animation
    gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom',
          end: rotationEnd,
          scrub: true
        }
      }
    );

    const wordElements = el.querySelectorAll('.word');

    // Opacity animation
    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: 'opacity' },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=20%',
          end: wordAnimationEnd,
          scrub: 2
        }
      }
    );

    // Blur animation
    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: 2
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <Component ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <span className={`scroll-reveal-text ${textClassName}`}>{splitText}</span>
    </Component>
  );
};

export default ScrollReveal;
