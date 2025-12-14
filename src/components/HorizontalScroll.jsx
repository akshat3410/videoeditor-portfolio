import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { LuArrowUpRight, LuPlay } from "react-icons/lu";
import { MagneticButton } from "./ui/ConversionMotion";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    { 
        title: "Lifestyle Vlog", 
        category: "YouTube",
        result: "2.1M views in 30 days",
        goal: "Increase watch time",
        strategy: "Dynamic cuts, trending audio, retention hooks",
        color: "bg-rose-900"
    },
    { 
        title: "Product Launch", 
        category: "Instagram Reels",
        result: "340% engagement increase",
        goal: "Drive conversions",
        strategy: "Fast-paced editing, CTA overlays, brand colors",
        color: "bg-blue-900"
    },
    { 
        title: "Course Promo", 
        category: "YouTube Shorts",
        result: "125K organic views",
        goal: "Lead generation",
        strategy: "Hook in first 1s, value stacking, cliffhangers",
        color: "bg-amber-900"
    },
    { 
        title: "Brand Story", 
        category: "Documentary Style",
        result: "Featured on homepage",
        goal: "Build brand trust",
        strategy: "Cinematic grading, emotional pacing, pro audio",
        color: "bg-emerald-900"
    },
];

const HorizontalScroll = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    useGSAP(() => {
        const totalSections = projects.length;
        
        gsap.to(sectionRef.current, {
            xPercent: -100 * (totalSections - 1) / totalSections,
            ease: "none",
            scrollTrigger: {
                trigger: triggerRef.current,
                pin: true,
                scrub: 1,
                end: () => "+=" + triggerRef.current.offsetWidth * 2,
                invalidateOnRefresh: true,
            }
        });
    }, { scope: triggerRef });

    return (
        <section id="portfolio" ref={triggerRef} className="overflow-hidden bg-background relative">
            {/* Header */}
            <div className="absolute top-10 left-10 z-20 max-w-md">
                <p className="text-sm uppercase tracking-widest text-accent-blurple mb-2">Featured Work</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white">Results That Speak</h3>
            </div>
            
            {/* Horizontal Container */}
            <div ref={sectionRef} className="flex h-screen w-[400vw]">
                {projects.map((project, index) => (
                    <div key={index} className="w-screen h-full flex justify-center items-center relative p-8 md:p-16">
                        <div className="w-full h-full max-h-[80vh] bg-neutral-900/50 rounded-2xl border border-white/10 overflow-hidden relative group cursor-pointer">
                            {/* Background */}
                            <div className={`absolute inset-0 ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                            
                            {/* Play Button */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-110 transition-transform">
                                    <LuPlay className="text-white text-3xl ml-1" />
                                </div>
                            </div>
                            
                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 bg-gradient-to-t from-black via-black/80 to-transparent z-10">
                                {/* Result Badge */}
                                <div className="inline-flex items-center gap-2 bg-accent-green/20 text-accent-green px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                    ⚡ {project.result}
                                </div>
                                
                                <div className="flex justify-between items-end">
                                    <div className="max-w-lg">
                                        <p className="text-white/60 text-sm uppercase tracking-wider mb-2">{project.category}</p>
                                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{project.title}</h2>
                                        
                                        {/* Strategy */}
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <p className="text-sm text-muted mb-1"><strong className="text-white/80">Goal:</strong> {project.goal}</p>
                                            <p className="text-sm text-muted"><strong className="text-white/80">Strategy:</strong> {project.strategy}</p>
                                        </div>
                                    </div>
                                    
                                    {/* View Button */}
                                    <div className="hidden md:flex flex-col items-center gap-3">
                                        <span className="text-xs uppercase tracking-widest text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">View</span>
                                        <div className="p-4 rounded-full border border-white/20 text-white text-2xl group-hover:bg-white group-hover:text-black group-hover:rotate-45 transition-all duration-300">
                                            <LuArrowUpRight />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Background Index */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-bold text-white/[0.03] pointer-events-none select-none">
                            0{index + 1}
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA at bottom */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                <MagneticButton
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white/20 transition-colors flex items-center gap-2 cursor-pointer"
                    strength={0.2}
                    onClick={() => {
                        const el = document.getElementById('contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    Want edits like this?
                    <LuArrowUpRight className="group-hover:rotate-45 transition-transform" />
                </MagneticButton>
            </div>
        </section>
    );
};

export default HorizontalScroll;
