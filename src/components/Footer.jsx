import { useRef, useState } from "react";
import { LuArrowUpRight, LuCheck, LuClock, LuGift, LuMail, LuShield, LuCalendar, LuLoader } from "react-icons/lu";
import { MagneticButton, PulseCTA } from "./ui/ConversionMotion";
import ScrollReveal from "./ui/ScrollReveal";

const Footer = () => {
    const [formData, setFormData] = useState({ name: '', email: '', platform: '', goal: '', videoLink: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const formRef = useRef(null);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        
        if (!formData.platform) {
            newErrors.platform = 'Please select a platform';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        // Simulate form submission (replace with actual form service)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', platform: '', goal: '', videoLink: '' });
    };

    return (
        <footer className="relative bg-background">
            {/* Free Preview Edit CTA Section */}
            <section className="py-16 px-6 md:px-12 border-t border-white/5 bg-gradient-to-b from-accent-green/5 to-transparent">
                <div className="max-w-[800px] mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-accent-green/10 text-accent-green px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <LuGift className="w-4 h-4" />
                        Limited Time Offer
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        Get a Free Preview Edit
                    </h2>
                    <p className="text-lg text-muted mb-8 max-w-lg mx-auto">
                        Send me a 30-second clip and I'll edit it for free — so you can see my style before committing.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <PulseCTA idleDelay={3000} pulseScale={1.02}>
                            <MagneticButton
                                className="group bg-accent-green text-black px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-accent-green/90 transition-colors cursor-pointer"
                                strength={0.2}
                                onClick={() => {
                                    const el = document.getElementById('contact');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Claim Your Free Edit
                                <LuArrowUpRight className="group-hover:rotate-45 transition-transform" />
                            </MagneticButton>
                        </PulseCTA>
                        <a 
                            href="https://calendly.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors"
                        >
                            <LuCalendar className="w-5 h-5 text-accent-blurple" />
                            Book a Call Instead
                        </a>
                    </div>
                    <p className="mt-4 text-sm text-muted">
                        No payment required • 48-hour delivery • 1 revision included
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 px-6 md:px-12 border-t border-white/5">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Left: Copy */}
                        <div>
                            <p className="text-sm uppercase tracking-widest text-accent-green mb-4">Ready to Start?</p>
                            <ScrollReveal
                                containerClassName="text-4xl md:text-5xl font-bold tracking-tight leading-tight"
                                baseRotation={2}
                                blurStrength={4}
                                as="h2"
                            >
                                Let's Build Videos People Can't Ignore
                            </ScrollReveal>
                            
                            <p className="mt-6 text-lg text-muted max-w-md">
                                Tell me about your project and I'll get back within 24 hours with a free quote.
                            </p>

                            {/* Trust Signals */}
                            <div className="mt-8 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-muted">
                                    <LuClock className="text-accent-green" />
                                    <span>Response within 24 hours</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted">
                                    <LuShield className="text-accent-green" />
                                    <span>Free sample edit available</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted">
                                    <LuCheck className="text-accent-green" />
                                    <span>No obligation, no spam</span>
                                </div>
                            </div>

                            {/* Calendly Link */}
                            <div className="mt-8 p-4 bg-accent-blurple/10 border border-accent-blurple/20 rounded-xl">
                                <p className="text-sm text-white mb-2 font-medium">Prefer to talk first?</p>
                                <a 
                                    href="https://calendly.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-accent-blurple hover:underline"
                                >
                                    <LuCalendar className="w-4 h-4" />
                                    Book a free 15-min discovery call
                                    <LuArrowUpRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {/* Right: Form */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <LuCheck className="w-8 h-8 text-accent-green" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                    <p className="text-muted">I'll get back to you within 24 hours.</p>
                                </div>
                            ) : (
                                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm text-muted mb-2">Your Name *</label>
                                        <input 
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent-blurple transition-colors ${errors.name ? 'border-red-500' : 'border-white/10'}`}
                                            placeholder="John Doe"
                                        />
                                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm text-muted mb-2">Email Address *</label>
                                        <input 
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent-blurple transition-colors ${errors.email ? 'border-red-500' : 'border-white/10'}`}
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm text-muted mb-2">Platform *</label>
                                        <select 
                                            value={formData.platform}
                                            onChange={(e) => setFormData({...formData, platform: e.target.value})}
                                            className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blurple transition-colors ${errors.platform ? 'border-red-500' : 'border-white/10'}`}
                                        >
                                            <option value="" className="bg-neutral-900">Select platform</option>
                                            <option value="youtube" className="bg-neutral-900">YouTube</option>
                                            <option value="shorts" className="bg-neutral-900">YouTube Shorts</option>
                                            <option value="reels" className="bg-neutral-900">Instagram Reels</option>
                                            <option value="tiktok" className="bg-neutral-900">TikTok</option>
                                            <option value="other" className="bg-neutral-900">Other</option>
                                        </select>
                                        {errors.platform && <p className="text-red-400 text-xs mt-1">{errors.platform}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm text-muted mb-2">What's your goal?</label>
                                        <select 
                                            value={formData.goal}
                                            onChange={(e) => setFormData({...formData, goal: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blurple transition-colors"
                                        >
                                            <option value="" className="bg-neutral-900">Select goal</option>
                                            <option value="views" className="bg-neutral-900">More views</option>
                                            <option value="retention" className="bg-neutral-900">Better retention</option>
                                            <option value="brand" className="bg-neutral-900">Brand polish</option>
                                            <option value="growth" className="bg-neutral-900">Channel growth</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm text-muted mb-2">Video/Project Link (optional)</label>
                                        <input 
                                            type="url"
                                            value={formData.videoLink}
                                            onChange={(e) => setFormData({...formData, videoLink: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent-blurple transition-colors"
                                            placeholder="Dropbox, Google Drive, or YouTube link"
                                        />
                                    </div>

                                    <PulseCTA idleDelay={5000} pulseScale={1.02}>
                                        <MagneticButton
                                            as="button"
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full group bg-white text-black rounded-xl py-4 font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                            strength={0.15}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <LuLoader className="w-5 h-5 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Get My Videos Edited
                                                    <LuArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" />
                                                </>
                                            )}
                                        </MagneticButton>
                                    </PulseCTA>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Bar */}
            <div className="py-8 px-6 md:px-12 border-t border-white/5">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
                    <p>© 2025 Video Editor. All rights reserved.</p>
                    
                    <div className="flex items-center gap-6">
                        <a href="mailto:hello@example.com" className="flex items-center gap-2 hover:text-white transition-colors">
                            <LuMail className="w-4 h-4" />
                            Contact
                        </a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">YouTube</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
