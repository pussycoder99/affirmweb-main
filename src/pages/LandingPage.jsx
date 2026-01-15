import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { TrustStrip } from '../components/sections/TrustStrip';
import { ProductSplit } from '../components/sections/ProductSplit';
import { PainPoints } from '../components/sections/PainPoints';
import { HowItWorks } from '../components/sections/HowItWorks';
import { FeatureGrid } from '../components/sections/FeatureGrid';
import { ControlPanelPreview } from '../components/sections/ControlPanelPreview';
import { WHMCSDeepDive } from '../components/sections/WHMCSDeepDive';
import { ComingSoon } from '../components/sections/ComingSoon';
import { Pricing } from '../components/sections/Pricing';
import { FAQ } from '../components/sections/FAQ';
import { FinalCTA } from '../components/sections/FinalCTA';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 font-sans">
            <Header />
            <main>
                <Hero />
                <TrustStrip />
                <ProductSplit />
                <PainPoints />
                <HowItWorks />
                <FeatureGrid />
                <ControlPanelPreview />
                <WHMCSDeepDive />
                <ComingSoon />
                <Pricing />
                <FAQ />
                <FinalCTA />
            </main>
            <Footer />
        </div>
    );
}
