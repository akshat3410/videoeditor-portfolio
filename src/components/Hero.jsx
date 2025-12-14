import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { LuArrowUpRight, LuPlay, LuZap } from "react-icons/lu";
import LightRays from "./ui/LightRays";
import { MouseParallax } from "./ui/Parallax";
import { MagneticButton, PulseCTA } from "./ui/ConversionMotion";

gsap.registerPlugin(ScrollTrigger);

// Smooth scroll to section
const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

const Hero = () => {
    const container = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);
    const imageContainerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Image reveal first
        tl.from(imageContainerRef.current, {
            opacity: 0,
            scale: 1.1,
            duration: 1.8,
            ease: "power3.out"
        })
        .from(contentRef.current.children, {
            y: 60,
            opacity: 0,
            duration: 1.0,
            stagger: 0.1,
            ease: "power4.out"
        }, "-=1.2");

        // Parallax effects
        gsap.to(imageRef.current, {
            y: 80,
            scale: 1.05,
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: 1.5
            }
        });

        gsap.to(contentRef.current, {
            y: -100,
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: 1.2
            }
        });
    }, { scope: container });

    return (
        <section ref={container} className="min-h-screen h-[100dvh] w-full relative overflow-hidden">
            {/* Light Rays Background */}
            <LightRays
                raysOrigin="top-center"
                raysColor="#ffffff"
                raysSpeed={1.5}
                lightSpread={0.8}
                rayLength={1.2}
                followMouse={true}
                mouseInfluence={0.15}
                noiseAmount={0.05}
                distortion={0.03}
            />

            {/* Main Grid */}
            <div className="relative z-10 h-full w-full max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center px-6 md:px-12 lg:px-20">
                
                {/* Left: Content */}
                <div ref={contentRef} className="flex flex-col justify-center pt-24 lg:pt-0 order-2 lg:order-1">
                    
                    {/* Trust Badge */}
                    <div className="flex items-center gap-2 mb-6">
                        <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                        <span className="text-sm text-muted">Available for new projects</span>
                    </div>

                    {/* Main Headline - Outcome Driven */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
                        I Turn Raw Footage Into
                    </h1>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-accent-blurple via-purple-400 to-accent-green">
                        Views & Revenue
                    </h1>
                    
                    {/* Transformation Subheading */}
                    <p className="mt-6 text-lg md:text-xl text-muted max-w-lg leading-relaxed">
                        High-retention video editing for creators and brands who want 
                        <span className="text-white font-medium"> more watch time, more followers, and more sales.</span>
                    </p>

                    {/* CTAs */}
                    <div className="mt-10 flex flex-wrap gap-4">
                        {/* Primary CTA - Scroll to Contact */}
                        <PulseCTA idleDelay={4000} pulseScale={1.03}>
                            <MagneticButton 
                                className="group relative overflow-hidden rounded-full bg-white text-black px-8 py-4 text-base font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
                                strength={0.25}
                                onClick={() => scrollToSection('contact')}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Get a Free Preview Edit
                                    <LuArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" />
                                </span>
                            </MagneticButton>
                        </PulseCTA>
                        
                        {/* Secondary CTA - Scroll to Portfolio */}
                        <MagneticButton 
                            className="group relative overflow-hidden rounded-full border border-white/20 px-8 py-4 text-base font-semibold hover:bg-white/5 transition-colors text-white cursor-pointer"
                            strength={0.2}
                            onClick={() => scrollToSection('portfolio')}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <LuPlay className="text-accent-green" />
                                See Results
                            </span>
                        </MagneticButton>
                    </div>

                    {/* Micro-copy - Trust Signals */}
                    <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
                        <div className="flex items-center gap-1">
                            <LuZap className="text-accent-green" />
                            <span>Response within 24h</span>
                        </div>
                        <span className="text-white/20">•</span>
                        <span>No long-term contracts</span>
                        <span className="text-white/20">•</span>
                        <span>Free sample edit</span>
                    </div>
                </div>

                {/* Right: Model Image */}
                <div ref={imageContainerRef} className="relative flex justify-center lg:justify-end items-end h-full order-1 lg:order-2 pt-20 lg:pt-0">
                    <MouseParallax range={15} direction="both" easing={0.03}>
                        <div className="relative">
                            {/* Glow */}
                            <div className="absolute inset-0 bg-gradient-to-t from-accent-blurple/30 via-transparent to-transparent blur-3xl scale-110 opacity-40" />
                            
                            {/* Gradient overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-transparent z-10 pointer-events-none lg:block hidden" />
                            
                            {/* Image - pointer-events-none to block Pinterest overlay */}
                            <img 
                                ref={imageRef}
                                src="/videoeditor-portfolio/hero-model.png" 
                                alt="Video Editor"
                                className="relative w-[320px] md:w-[480px] lg:w-[580px] xl:w-[650px] h-auto max-h-[90vh] object-cover object-top pointer-events-none select-none"
                                style={{
                                    maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                                    WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
                                }}
                                draggable="false"
                            />
                            
                            {/* Floating Stats */}
                            <div className="absolute bottom-[25%] -left-4 md:-left-16 bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 z-20">
                                <p className="text-3xl md:text-4xl font-bold text-white">50+</p>
                                <p className="text-xs text-muted uppercase tracking-wider">Projects Delivered</p>
                            </div>
                            
                            <div className="absolute top-[35%] -right-4 md:-right-12 bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 z-20">
                                <p className="text-3xl md:text-4xl font-bold text-accent-green">2M+</p>
                                <p className="text-xs text-muted uppercase tracking-wider">Views Generated</p>
                            </div>
                        </div>
                    </MouseParallax>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted z-10 flex flex-col items-center gap-2">
                <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-white/30 animate-pulse" />
                <p className="text-xs uppercase tracking-widest">Scroll</p>
            </div>
        </section>
    );
};

export default Hero;
