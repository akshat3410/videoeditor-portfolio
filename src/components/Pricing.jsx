import { useRef } from "react";
import { LuArrowUpRight, LuCheck, LuSparkles } from "react-icons/lu";
import { MagneticButton } from "./ui/ConversionMotion";
import ScrollReveal from "./ui/ScrollReveal";

const plans = [
    {
        name: "Single Video",
        price: "$49",
        period: "/video",
        description: "One-time project, no commitment",
        features: [
            "1 video edit",
            "Basic cuts & transitions",
            "Background music",
            "1 revision round",
            "3-day turnaround"
        ],
        cta: "Order Now",
        popular: false
    },
    {
        name: "Starter",
        price: "$299",
        period: "/month",
        description: "Perfect for new creators testing the waters",
        features: [
            "4 videos per month",
            "Basic cuts & transitions",
            "Background music",
            "2 revision rounds",
            "48h turnaround"
        ],
        cta: "Get Started",
        popular: false
    },
    {
        name: "Growth",
        price: "$599",
        period: "/month",
        description: "For serious creators ready to scale",
        features: [
            "12 videos per month",
            "Advanced editing & effects",
            "Custom motion graphics",
            "Unlimited revisions",
            "24h turnaround",
            "Thumbnail design"
        ],
        cta: "Most Popular",
        popular: true
    },
    {
        name: "Pro",
        price: "Custom",
        period: "",
        description: "For brands and agencies with high volume",
        features: [
            "Unlimited videos",
            "Dedicated editor",
            "Priority support",
            "Brand guidelines",
            "Same-day turnaround",
            "Strategy calls"
        ],
        cta: "Contact Me",
        popular: false
    }
];

const Pricing = () => {
    const container = useRef(null);

    return (
        <section id="pricing" ref={container} className="py-20 px-6 md:px-12 bg-background relative">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-green/5 to-transparent pointer-events-none" />
            
            <div className="max-w-[1200px] mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-sm uppercase tracking-widest text-accent-green mb-4">Simple Pricing</p>
                    <ScrollReveal
                        containerClassName="text-3xl md:text-5xl font-bold tracking-tight"
                        baseRotation={1}
                        blurStrength={3}
                        as="h2"
                    >
                        Choose Your Growth Plan
                    </ScrollReveal>
                    <p className="mt-4 text-muted max-w-lg mx-auto">
                        No hidden fees. No long-term contracts. Just great edits.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {plans.map((plan, i) => (
                        <div 
                            key={i}
                            className={`relative rounded-2xl p-6 border transition-all duration-300 ${
                                plan.popular 
                                    ? 'bg-white/[0.05] border-accent-green/50 lg:scale-105' 
                                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                            }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-green text-black px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                    <LuSparkles className="w-4 h-4" />
                                    Most Popular
                                </div>
                            )}
                            
                            {/* Plan Header */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                                <p className="text-sm text-muted">{plan.description}</p>
                            </div>
                            
                            {/* Price */}
                            <div className="mb-6">
                                <span className="text-3xl md:text-4xl font-bold text-white">{plan.price}</span>
                                {plan.period && <span className="text-muted">{plan.period}</span>}
                            </div>
                            
                            {/* Features */}
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm text-white/80">
                                        <LuCheck className="w-4 h-4 text-accent-green flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            
                            {/* CTA */}
                            <MagneticButton
                                className={`w-full group rounded-xl py-4 font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                                    plan.popular 
                                        ? 'bg-white text-black hover:bg-gray-100' 
                                        : 'border border-white/20 text-white hover:bg-white/5'
                                }`}
                                strength={0.15}
                                onClick={() => {
                                    const el = document.getElementById('contact');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                {plan.cta}
                                <LuArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" />
                            </MagneticButton>
                        </div>
                    ))}
                </div>

                {/* Risk Reversal */}
                <div className="mt-12 text-center text-sm text-muted">
                    <p>✓ Free sample edit available • ✓ Cancel anytime • ✓ No hidden charges</p>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
