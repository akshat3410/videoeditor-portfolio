import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { LuClock, LuEye, LuMessageCircle, LuPalette, LuSparkles, LuTarget } from "react-icons/lu";
import ScrollReveal from "./ui/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const values = [
    {
        icon: LuEye,
        title: "High-Retention Editing",
        description: "Hooks, pacing, and cuts designed to keep viewers watching till the end."
    },
    {
        icon: LuTarget,
        title: "Platform Optimized",
        description: "Tailored for YouTube, Reels, Shorts, or TikTok — each format gets what it needs."
    },
    {
        icon: LuClock,
        title: "Fast Turnaround",
        description: "Quality edits delivered quickly so you never miss your content schedule."
    },
    {
        icon: LuPalette,
        title: "Brand Consistency",
        description: "Colors, fonts, and style matched perfectly to your brand identity."
    },
    {
        icon: LuMessageCircle,
        title: "Clear Communication",
        description: "No ghosting. Regular updates and quick responses on revisions."
    },
    {
        icon: LuSparkles,
        title: "Premium Quality",
        description: "Motion graphics, sound design, and color grading that stands out."
    }
];

const ValueStack = () => {
    const container = useRef(null);
    const cardsRef = useRef([]);

    useGSAP(() => {
        gsap.from(cardsRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
                trigger: container.current,
                start: "top 75%"
            }
        });
    }, { scope: container });

    return (
        <section ref={container} className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <p className="text-sm uppercase tracking-widest text-accent-blurple mb-4">Why Work With Me</p>
                <ScrollReveal
                    containerClassName="text-3xl md:text-5xl font-bold tracking-tight"
                    baseRotation={1}
                    blurStrength={3}
                    as="h2"
                >
                    Everything You Need. Nothing You Don't.
                </ScrollReveal>
            </div>

            {/* Value Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {values.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div 
                            key={i}
                            ref={el => cardsRef.current[i] = el}
                            className="group p-8 rounded-2xl border border-white/5 hover:border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-accent-blurple/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Icon className="w-6 h-6 text-accent-blurple" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                            <p className="text-muted leading-relaxed">{item.description}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ValueStack;
