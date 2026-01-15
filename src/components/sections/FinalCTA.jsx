import { Section } from '../ui/Section';
import { Button } from '../ui/Button';

export function FinalCTA() {
    return (
        <Section className="bg-slate-950 py-24 border-t border-slate-900">
            <div className="relative max-w-4xl mx-auto text-center px-4">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to scale your automation?
                    </h2>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                        Join the hosting providers and agencies already building their future on AffirmWeb infrastructure.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Button size="lg" className="w-full sm:w-auto" onClick={() => window.location.href = 'https://portal.affirmweb.com/cart.php'}>
                            Get Started Now
                        </Button>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => window.location.href = 'https://portal.affirmweb.com/contact.php'}>
                            Contact Sales
                        </Button>
                    </div>

                    <div className="flex justify-center">
                        <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-lg w-full text-left">
                            <h3 className="text-white font-semibold mb-4">Request a Demo</h3>
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Name" className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                                    <input type="email" placeholder="Work Email" className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                                </div>
                                <input type="text" placeholder="Company Name" className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 w-full" />
                                <Button size="sm" className="w-full">Submit Request</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
