import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { LuQuote, LuStar } from "react-icons/lu";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        quote: "Our video retention jumped 42% after working with him. The editing style perfectly matches our brand.",
        author: "Alex Chen",
        role: "YouTube Creator • 500K subs",
        result: "+42% retention"
    },
    {
        quote: "Finally found an editor who understands short-form. Our Reels consistently hit 100K+ now.",
        author: "Sarah Miller",
        role: "Brand Owner",
        result: "100K+ views"
    },
    {
        quote: "Fast turnaround, clear communication, and the quality speaks for itself. Best investment for our content.",
        author: "Marcus Johnson",
        role: "Agency Founder",
        result: "3x content output"
    }
];

const SocialProof = () => {
    const container = useRef(null);
    const cardsRef = useRef([]);

    useGSAP(() => {
        gsap.from(cardsRef.current, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%"
            }
        });
    }, { scope: container });

    return (
        <section ref={container} className="py-24 px-6 md:px-12 bg-background relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blurple/5 to-transparent pointer-events-none" />
            
            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-sm uppercase tracking-widest text-accent-green mb-4">Trusted by Creators</p>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Real Results From Real Clients
                    </h2>
                </div>

                {/* Testimonial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((item, i) => (
                        <div 
                            key={i}
                            ref={el => cardsRef.current[i] = el}
                            className="group bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-accent-blurple/30 transition-colors duration-300"
                        >
                            {/* Result Badge */}
                            <div className="inline-flex items-center gap-2 bg-accent-green/10 text-accent-green px-3 py-1 rounded-full text-sm font-medium mb-6">
                                <LuStar className="w-4 h-4" />
                                {item.result}
                            </div>
                            
                            {/* Quote */}
                            <div className="relative">
                                <LuQuote className="absolute -top-2 -left-2 w-8 h-8 text-white/10" />
                                <p className="text-lg text-white/80 leading-relaxed pl-4">
                                    "{item.quote}"
                                </p>
                            </div>
                            
                            {/* Author */}
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <p className="font-semibold text-white">{item.author}</p>
                                <p className="text-sm text-muted">{item.role}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Bar */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center items-center gap-8 text-muted">
                    <span className="text-sm uppercase tracking-widest">Worked with creators from:</span>
                    <div className="flex gap-8 text-white/40 text-lg font-semibold">
                        <span>YouTube</span>
                        <span>Instagram</span>
                        <span>TikTok</span>
                        <span>Agencies</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
