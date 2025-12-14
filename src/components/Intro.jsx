import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { CountUp } from "./ui/ConversionMotion";
import ScrollReveal from "./ui/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
    const container = useRef(null);
    const imagesRef = useRef([]);
    const statsRef = useRef(null);

    useGSAP(() => {
        // Image fan out parallax
        imagesRef.current.forEach((img, i) => {
            gsap.to(img, {
                y: -30 * (i + 1),
                scrollTrigger: {
                    trigger: container.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // Stats fade up
        if (statsRef.current) {
            gsap.from(statsRef.current.children, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 90%"
                }
            });
        }

    }, { scope: container });

    return (
        <section ref={container} className="min-h-screen py-24 px-6 md:px-12 w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div className="max-w-xl">
                <div>
                    <ScrollReveal 
                        containerClassName="text-3xl md:text-5xl font-medium leading-tight text-primary mb-0"
                        baseRotation={2}
                        blurStrength={3}
                    >
                        I create unconventional yet functional digital experiences.
                    </ScrollReveal>
                    <p className="mt-8 text-muted text-lg leading-relaxed">
                        Breaking the mold of traditional web design to deliver memorable, high-impact interactions that serve a purpose.
                    </p>
                    <div className="mt-8 flex gap-4">
                        <div className="h-[1px] w-20 bg-accent-green mt-3"></div>
                        <span className="text-sm uppercase tracking-widest text-accent-green">Philosophy</span>
                    </div>
                </div>
                
                {/* Trust Stats */}
                <div ref={statsRef} className="mt-16 pt-8 border-t border-white/10 grid grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white">
                            <CountUp end={50} suffix="+" />
                        </div>
                        <p className="text-xs uppercase tracking-widest text-muted mt-2">Projects</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white">
                            <CountUp end={7} suffix="+" />
                        </div>
                        <p className="text-xs uppercase tracking-widest text-muted mt-2">Years</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white">
                            <CountUp end={100} suffix="%" />
                        </div>
                        <p className="text-xs uppercase tracking-widest text-muted mt-2">Satisfaction</p>
                    </div>
                </div>
            </div>

            {/* Right: Image Stack */}
            <div className="relative h-[600px] w-full flex justify-center items-center">
                {[1, 2, 3].map((item, i) => (
                    <div 
                        key={i}
                        ref={el => imagesRef.current[i] = el}
                        className={`absolute w-64 h-96 bg-gray-800 rounded-xl border border-white/10 shadow-2xl overflow-hidden transform transition-transform`}
                        style={{ 
                            zIndex: 3 - i,
                            transform: `rotate(${i * 5 - 5}deg) translateX(${i * 20}px)`,
                            background: `linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)`
                         }}
                    >
                        <div className="w-full h-full p-4 flex flex-col gap-4">
                             <div className="w-full h-32 bg-white/5 rounded-lg animate-pulse"></div>
                             <div className="w-3/4 h-4 bg-white/5 rounded animate-pulse"></div>
                             <div className="w-1/2 h-4 bg-white/5 rounded animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Intro;
