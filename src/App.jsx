import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const heroModelRef = useRef(null);
  const horizontalRef = useRef(null);
  const horizontalWrapperRef = useRef(null);
  const portfolioRef = useRef(null);
  const portfolioCardsRef = useRef([]);
  const aboutRef = useRef(null);
  const aboutTextRef = useRef(null);
  const skillsContainerRef = useRef(null);
  const skillsRef = useRef([]);
  const contactRef = useRef(null);
  const contactFormRef = useRef(null);

  // Text animation refs
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const horizontalIntroRef = useRef(null);
  const horizontalCardsRef = useRef([]);
  const portfolioTitleRef = useRef(null);
  const portfolioSubtitleRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutParagraphsRef = useRef([]);
  const skillsTitleRef = useRef(null);
  const contactTitleRef = useRef(null);
  const contactSubtitleRef = useRef(null);
  const contactInfoRef = useRef(null);

  // Parallax background elements refs
  const heroBlobRef = useRef(null);
  const heroBlob2Ref = useRef(null);
  const portfolioBlobRef = useRef(null);
  const aboutBlobRef = useRef(null);
  const contactBlobRef = useRef(null);
  const horizontalBlobRef = useRef(null);

  const horizontalProjects = [
    { title: "Cinematic Travel Edit", description: "A breathtaking journey through landscapes and cultures." },
    { title: "AMV Edit – Anime Montage", description: "High-energy anime cuts synced to epic beats." },
    { title: "Transition Reel", description: "Smooth, creative transitions that captivate viewers." },
    { title: "Commercial Brand Video", description: "Premium product showcase with cinematic flair." },
    { title: "Music Video Edit", description: "Rhythmic storytelling through visual artistry." },
  ];

  const portfolioProjects = [
    { title: "Luxury Brand Showcase", description: "Elegant product reveal with premium aesthetics." },
    { title: "Wedding Highlight Reel", description: "Timeless moments captured cinematically." },
    { title: "Documentary Short", description: "Compelling narratives through visual storytelling." },
    { title: "Social Media Reel", description: "Scroll-stopping content for maximum engagement." },
    { title: "Event Highlight Video", description: "Dynamic coverage of memorable occasions." },
    { title: "Corporate Brand Film", description: "Professional storytelling for business impact." },
  ];

  const skills = ["Transitions", "Color Grading", "Sound Design", "SFX", "Motion Graphics", "Compositing"];

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      // ===== HERO TEXT ANIMATIONS =====
      // Hero title - split word animation
      if (heroTitleRef.current) {
        gsap.fromTo(heroTitleRef.current,
          { opacity: 0, y: 60, clipPath: "inset(100% 0% 0% 0%)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power4.out",
            delay: 0.2,
          }
        );
      }

      // Hero subtitle - fade slide up
      if (heroSubtitleRef.current) {
        gsap.fromTo(heroSubtitleRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.5,
          }
        );
      }

      // Hero buttons - stagger fade in
      if (heroButtonsRef.current) {
        gsap.fromTo(heroButtonsRef.current.children,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.5)",
            stagger: 0.15,
            delay: 0.8,
          }
        );
      }

      // ===== HERO SECTION PARALLAX =====
      gsap.to(heroBlobRef.current, {
        y: 200,
        x: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(heroBlob2Ref.current, {
        y: 150,
        x: 80,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(heroContentRef.current, {
        y: 100,
        opacity: 0.6,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(heroModelRef.current, {
        y: 150,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // ===== HORIZONTAL SCROLL SECTION =====
      const horizontalSection = horizontalWrapperRef.current;
      const horizontalContent = horizontalRef.current;

      if (horizontalSection && horizontalContent) {
        const totalScroll = horizontalContent.scrollWidth - window.innerWidth;

        gsap.to(horizontalContent, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSection,
            start: "top top",
            end: () => `+=${totalScroll}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        gsap.to(horizontalBlobRef.current, {
          x: -totalScroll * 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSection,
            start: "top top",
            end: () => `+=${totalScroll}`,
            scrub: 2,
          },
        });
      }

      // Horizontal intro text animation
      if (horizontalIntroRef.current) {
        gsap.fromTo(horizontalIntroRef.current,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: horizontalWrapperRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Horizontal cards text animation
      horizontalCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 40, rotateY: 5 },
            {
              opacity: 1,
              y: 0,
              rotateY: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: horizontalWrapperRef.current,
                start: "top 70%",
                toggleActions: "play none none none",
              },
              delay: 0.2 + index * 0.1,
            }
          );
        }
      });

      // ===== PORTFOLIO SECTION TEXT ANIMATIONS =====
      // Portfolio title
      if (portfolioTitleRef.current) {
        gsap.fromTo(portfolioTitleRef.current,
          { opacity: 0, y: 50, clipPath: "inset(100% 0% 0% 0%)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: portfolioTitleRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Portfolio subtitle
      if (portfolioSubtitleRef.current) {
        gsap.fromTo(portfolioSubtitleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: portfolioSubtitleRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            delay: 0.2,
          }
        );
      }

      // Portfolio background blob
      gsap.to(portfolioBlobRef.current, {
        y: -100,
        x: 50,
        ease: "none",
        scrollTrigger: {
          trigger: portfolioRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Portfolio cards animation
      portfolioCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 80, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none",
              },
              delay: index * 0.08,
            }
          );

          gsap.to(card, {
            y: -20 * (index % 3),
            ease: "none",
            scrollTrigger: {
              trigger: portfolioRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          });
        }
      });

      // ===== ABOUT SECTION TEXT ANIMATIONS =====
      // About title
      if (aboutTitleRef.current) {
        gsap.fromTo(aboutTitleRef.current,
          { opacity: 0, y: 50, clipPath: "inset(100% 0% 0% 0%)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: aboutTitleRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // About paragraphs - staggered slide in from left
      aboutParagraphsRef.current.forEach((paragraph, index) => {
        if (paragraph) {
          gsap.fromTo(paragraph,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: paragraph,
                start: "top 88%",
                toggleActions: "play none none none",
              },
              delay: index * 0.15,
            }
          );
        }
      });

      // Skills title
      if (skillsTitleRef.current) {
        gsap.fromTo(skillsTitleRef.current,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: skillsTitleRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // About background blob
      gsap.to(aboutBlobRef.current, {
        y: -80,
        x: -60,
        ease: "none",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      });

      // About text parallax
      gsap.to(aboutTextRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      // Skills container parallax
      gsap.to(skillsContainerRef.current, {
        y: 20,
        x: 15,
        ease: "none",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Skills pills stagger entrance
      gsap.fromTo(skillsRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: 0.08,
          scrollTrigger: {
            trigger: skillsContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // ===== CONTACT SECTION TEXT ANIMATIONS =====
      // Contact title
      if (contactTitleRef.current) {
        gsap.fromTo(contactTitleRef.current,
          { opacity: 0, y: 50, clipPath: "inset(100% 0% 0% 0%)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: contactTitleRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Contact subtitle
      if (contactSubtitleRef.current) {
        gsap.fromTo(contactSubtitleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactSubtitleRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            delay: 0.2,
          }
        );
      }

      // Contact form animation
      if (contactFormRef.current) {
        gsap.fromTo(contactFormRef.current,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactFormRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Contact info animation
      if (contactInfoRef.current) {
        gsap.fromTo(contactInfoRef.current,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactInfoRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: 0.2,
          }
        );
      }

      // Contact background blob
      gsap.to(contactBlobRef.current, {
        y: -60,
        x: 40,
        ease: "none",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    });

    // Mobile animations
    mm.add("(max-width: 768px)", () => {
      // ===== HERO SECTION - MOBILE =====
      // Hero title with clip-path reveal
      if (heroTitleRef.current) {
        gsap.fromTo(heroTitleRef.current,
          { opacity: 0, y: 50, clipPath: "inset(100% 0% 0% 0%)" },
          { 
            opacity: 1, 
            y: 0, 
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1, 
            ease: "power4.out", 
            delay: 0.1 
          }
        );
      }

      // Hero subtitle fade up
      if (heroSubtitleRef.current) {
        gsap.fromTo(heroSubtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
        );
      }

      // Hero buttons stagger entrance
      if (heroButtonsRef.current) {
        gsap.fromTo(heroButtonsRef.current.children,
          { opacity: 0, y: 25, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.7, 
            stagger: 0.12, 
            ease: "back.out(1.4)", 
            delay: 0.6 
          }
        );
      }

      // Hero model animation
      if (heroModelRef.current) {
        gsap.fromTo(heroModelRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1, ease: "power3.out", delay: 0.3 }
        );
      }

      // Hero blob subtle parallax (lightweight for mobile)
      gsap.to(heroBlobRef.current, {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(heroBlob2Ref.current, {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2.5,
        },
      });

      // ===== HORIZONTAL SCROLL SECTION - MOBILE =====
      const horizontalSection = horizontalWrapperRef.current;
      const horizontalContent = horizontalRef.current;

      if (horizontalSection && horizontalContent) {
        const totalScroll = horizontalContent.scrollWidth - window.innerWidth;

        // Horizontal intro text
        if (horizontalIntroRef.current) {
          gsap.fromTo(horizontalIntroRef.current,
            { opacity: 0, x: -40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: horizontalSection,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // Horizontal cards stagger animation
        horizontalCardsRef.current.forEach((card, index) => {
          if (card) {
            gsap.fromTo(card,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: horizontalSection,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
                delay: 0.1 + index * 0.08,
              }
            );
          }
        });

        // Horizontal scroll animation
        gsap.to(horizontalContent, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSection,
            start: "top top",
            end: () => `+=${totalScroll}`,
            scrub: 1,
            pin: true,
          },
        });

        // Horizontal blob parallax
        gsap.to(horizontalBlobRef.current, {
          x: -totalScroll * 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSection,
            start: "top top",
            end: () => `+=${totalScroll}`,
            scrub: 2.5,
          },
        });
      }

      // ===== PORTFOLIO SECTION - MOBILE =====
      // Portfolio title with clip-path
      if (portfolioTitleRef.current) {
        gsap.fromTo(portfolioTitleRef.current,
          { opacity: 0, y: 40, clipPath: "inset(100% 0% 0% 0%)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "power4.out",
            scrollTrigger: {
              trigger: portfolioTitleRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Portfolio subtitle
      if (portfolioSubtitleRef.current) {
        gsap.fromTo(portfolioSubtitleRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: portfolioSubtitleRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            delay: 0.15,
          }
        );
      }

      // Portfolio cards stagger
      portfolioCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                toggleActions: "play none none none",
              },
              delay: index * 0.06,
            }
          );
        }
      });

      // Portfolio blob parallax
      gsap.to(portfolioBlobRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: portfolioRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      // ===== ABOUT SECTION - MOBILE =====
      // About title with clip-path
      if (aboutTitleRef.current) {
        gsap.fromTo(aboutTitleRef.current,
          { opacity: 0, y: 40, clipPath: "inset(100% 0% 0% 0%)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "power4.out",
            scrollTrigger: {
              trigger: aboutTitleRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // About paragraphs slide in
      aboutParagraphsRef.current.forEach((paragraph, index) => {
        if (paragraph) {
          gsap.fromTo(paragraph,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: paragraph,
                start: "top 90%",
                toggleActions: "play none none none",
              },
              delay: index * 0.12,
            }
          );
        }
      });

      // Skills title
      if (skillsTitleRef.current) {
        gsap.fromTo(skillsTitleRef.current,
          { opacity: 0, x: 25 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: skillsTitleRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Skills pills stagger with bounce
      gsap.fromTo(skillsRef.current,
        { opacity: 0, y: 25, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: skillsContainerRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      // About blob parallax
      gsap.to(aboutBlobRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      // ===== CONTACT SECTION - MOBILE =====
      // Contact title with clip-path
      if (contactTitleRef.current) {
        gsap.fromTo(contactTitleRef.current,
          { opacity: 0, y: 40, clipPath: "inset(100% 0% 0% 0%)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "power4.out",
            scrollTrigger: {
              trigger: contactTitleRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Contact subtitle
      if (contactSubtitleRef.current) {
        gsap.fromTo(contactSubtitleRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactSubtitleRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            delay: 0.15,
          }
        );
      }

      // Contact form slide in from left
      if (contactFormRef.current) {
        gsap.fromTo(contactFormRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactFormRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Contact info slide in from right
      if (contactInfoRef.current) {
        gsap.fromTo(contactInfoRef.current,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactInfoRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            delay: 0.15,
          }
        );
      }

      // Contact blob parallax
      gsap.to(contactBlobRef.current, {
        y: -35,
        ease: "none",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent (demo)");
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#home" className="logo" onClick={(e) => scrollToSection(e, "#home")}>
            YourName Edits
          </a>
          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => scrollToSection(e, "#home")}>Home</a></li>
            <li><a href="#portfolio" onClick={(e) => scrollToSection(e, "#portfolio")}>Portfolio</a></li>
            <li><a href="#about" onClick={(e) => scrollToSection(e, "#about")}>About</a></li>
            <li><a href="#contact" onClick={(e) => scrollToSection(e, "#contact")}>Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero" ref={heroRef}>
        {/* Parallax Background Elements */}
        <div className="parallax-blob hero-blob-1" ref={heroBlobRef}></div>
        <div className="parallax-blob hero-blob-2" ref={heroBlob2Ref}></div>
        
        <div className="hero-content" ref={heroContentRef}>
          <div className="hero-text">
            <h1 className="hero-title" ref={heroTitleRef}>
              I Turn Raw Clips Into
              <span className="accent-text"> Cinematic Stories.</span>
            </h1>
            <p className="hero-subtitle" ref={heroSubtitleRef}>
              Specializing in reels, smooth transitions, anime edits, and cinematic videos
              that captivate your audience and elevate your brand.
            </p>
            <div className="hero-buttons" ref={heroButtonsRef}>
              <a href="#portfolio" className="btn btn-primary" onClick={(e) => scrollToSection(e, "#portfolio")}>
                Watch My Edits
              </a>
              <a href="#contact" className="btn btn-secondary" onClick={(e) => scrollToSection(e, "#contact")}>
                Hire Me
              </a>
            </div>
          </div>
          <div className="hero-visual" ref={heroModelRef}>
            <div className="model-placeholder">
              <div className="model-figure">
                <div className="model-head"></div>
                <div className="model-body"></div>
                <div className="model-arm model-arm-left"></div>
                <div className="model-arm model-arm-right"></div>
                <div className="model-laptop"></div>
                <div className="model-screen"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Section */}
      <section className="horizontal-wrapper" ref={horizontalWrapperRef}>
        {/* Parallax Background */}
        <div className="parallax-blob horizontal-blob" ref={horizontalBlobRef}></div>
        
        <div className="horizontal-section" ref={horizontalRef}>
          <div className="horizontal-intro" ref={horizontalIntroRef}>
            <h2>Featured Work</h2>
            <p>Scroll to explore my reel timeline</p>
          </div>
          {horizontalProjects.map((project, index) => (
            <div 
              className="horizontal-card" 
              key={index}
              ref={(el) => (horizontalCardsRef.current[index] = el)}
            >
              <div className="horizontal-thumbnail"></div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio" ref={portfolioRef}>
        {/* Parallax Background */}
        <div className="parallax-blob portfolio-blob" ref={portfolioBlobRef}></div>
        
        <div className="section-container">
          <h2 className="section-title" ref={portfolioTitleRef}>Portfolio</h2>
          <p className="section-subtitle" ref={portfolioSubtitleRef}>A selection of my finest work</p>
          <div className="portfolio-grid">
            {portfolioProjects.map((project, index) => (
              <div
                className="portfolio-card"
                key={index}
                ref={(el) => (portfolioCardsRef.current[index] = el)}
              >
                <div className="portfolio-thumbnail"></div>
                <div className="portfolio-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <a href="#" className="btn btn-small">View Project</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about" ref={aboutRef}>
        {/* Parallax Background */}
        <div className="parallax-blob about-blob" ref={aboutBlobRef}></div>
        
        <div className="section-container">
          <h2 className="section-title" ref={aboutTitleRef}>About Me</h2>
          <div className="about-content">
            <div className="about-text" ref={aboutTextRef}>
              <p ref={(el) => (aboutParagraphsRef.current[0] = el)}>
                With over <strong>5 years of experience</strong> in video editing, I specialize
                in creating stunning reels, anime edits, and cinematic content that tells
                compelling stories. My work combines technical precision with creative vision
                to deliver videos that leave a lasting impression.
              </p>
              <p ref={(el) => (aboutParagraphsRef.current[1] = el)}>
                I work with industry-leading tools including <strong>Adobe Premiere Pro</strong>,{" "}
                <strong>After Effects</strong>, and <strong>DaVinci Resolve</strong> to bring your
                vision to life with professional polish.
              </p>
            </div>
            <div className="skills-container" ref={skillsContainerRef}>
              <h3 ref={skillsTitleRef}>My Skills</h3>
              <div className="skills-list">
                {skills.map((skill, index) => (
                  <span
                    className="skill-pill"
                    key={index}
                    ref={(el) => (skillsRef.current[index] = el)}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact" ref={contactRef}>
        {/* Parallax Background */}
        <div className="parallax-blob contact-blob" ref={contactBlobRef}></div>
        
        <div className="section-container">
          <h2 className="section-title" ref={contactTitleRef}>Let's Work Together</h2>
          <p className="section-subtitle" ref={contactSubtitleRef}>Ready to bring your vision to life?</p>
          <div className="contact-content">
            <form className="contact-form" onSubmit={handleSubmit} ref={contactFormRef}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Project Details</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-full">Send Message</button>
            </form>
            <div className="contact-info" ref={contactInfoRef}>
              <div className="contact-item">
                <span className="contact-label">Email</span>
                <a href="mailto:youremail@example.com">youremail@example.com</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">WhatsApp</span>
                <a href="tel:+91XXXXXXXXXX">+91-XXXXXXXXXX</a>
              </div>
              <div className="contact-socials">
                <span className="contact-label">Follow Me</span>
                <div className="social-links">
                  <a href="#" target="_blank" rel="noopener noreferrer">YouTube</a>
                  <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
                  <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Your Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
