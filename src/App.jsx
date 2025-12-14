import { ReactLenis } from '@studio-freight/react-lenis';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import HorizontalScroll from './components/HorizontalScroll';
import About from './components/About';
import ValueStack from './components/ValueStack';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import FloatingCTA from './components/ui/FloatingCTA';
import './App.css'; 

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.8, smoothTouch: true }}>
      <div className="bg-background min-h-screen text-primary selection:bg-accent-green selection:text-black font-sans">
        {/* 1. Hero - 5 Second Decision Maker */}
        <Hero />
        
        {/* 2. Social Proof - Remove Doubt */}
        <SocialProof />
        
        {/* 3. Portfolio - Sell Results */}
        <HorizontalScroll />
        
        {/* 4. About - Build Trust */}
        <About />
        
        {/* 5. Value Stack - Why Pay You */}
        <ValueStack />
        
        {/* 6. Pricing - Make It Easy */}
        <Pricing />
        
        {/* 7. Contact - Close The Deal */}
        <Footer />
        
        {/* Floating CTA */}
        <FloatingCTA />
      </div>
    </ReactLenis>
  );
}

export default App;
