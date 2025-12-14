import { LuAward, LuFilm, LuGlobe } from "react-icons/lu";
import ScrollReveal from "./ui/ScrollReveal";

const About = () => {
    return (
        <section className="py-20 px-6 md:px-12 max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: About Text */}
                <div>
                    <p className="text-sm uppercase tracking-widest text-accent-blurple mb-4">About Me</p>
                    <ScrollReveal
                        containerClassName="text-3xl md:text-4xl font-bold tracking-tight leading-tight"
                        baseRotation={1}
                        blurStrength={3}
                        as="h2"
                    >
                        I'm a video editor who obsesses over watch time.
                    </ScrollReveal>
                    
                    <p className="mt-6 text-muted leading-relaxed">
                        With 7+ years of experience editing for creators and brands, I've learned that 
                        great editing isn't about flashy effects — it's about keeping viewers hooked 
                        from the first second to the last.
                    </p>
                    
                    <p className="mt-4 text-muted leading-relaxed">
                        I've helped creators grow from 0 to 100K+ subscribers and brands increase 
                        their video engagement by 3x. My approach combines data-driven retention 
                        tactics with cinematic storytelling.
                    </p>
                </div>

                {/* Right: Credentials */}
                <div className="space-y-6">
                    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex gap-4 items-start hover:border-white/20 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-accent-blurple/10 flex items-center justify-center flex-shrink-0">
                            <LuFilm className="w-6 h-6 text-accent-blurple" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-1">50+ Projects Delivered</h3>
                            <p className="text-sm text-muted">From YouTube videos to brand campaigns, I've edited it all.</p>
                        </div>
                    </div>
                    
                    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex gap-4 items-start hover:border-white/20 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-accent-green/10 flex items-center justify-center flex-shrink-0">
                            <LuGlobe className="w-6 h-6 text-accent-green" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-1">2M+ Views Generated</h3>
                            <p className="text-sm text-muted">Videos I've edited have reached millions of viewers.</p>
                        </div>
                    </div>
                    
                    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex gap-4 items-start hover:border-white/20 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                            <LuAward className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-1">100% Client Satisfaction</h3>
                            <p className="text-sm text-muted">Every client gets my full attention until they're happy.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
