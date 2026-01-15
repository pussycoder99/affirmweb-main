import { Button } from '../ui/Button';

export function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 font-bold text-xl tracking-tight mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white">
                                A
                            </div>
                            <span className="text-white">AffirmWeb</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Professional n8n automation hosting and management infrastructure. Built for agencies and businesses who need reliability.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Product</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">n8n Cloud</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">WHMCS Manager</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Pricing</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Release Notes</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">About Us</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Contact</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
                        <p className="text-slate-400 text-sm mb-4">Join our newsletter for automation tips.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 flex-1"
                            />
                            <Button size="sm">Subscribe</Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} AffirmWeb. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2 text-slate-500 text-sm">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            All Systems Operational
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
