import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWhmcsAuth } from '../../lib/WHMCSAuthContext';
import { Button } from '../ui/Button';
import { Tabs } from '../ui/Tabs';
import { X, UserCheck, UserPlus } from 'lucide-react';

export function AuthModal({ isOpen, onClose, onSuccess }) {
    const [activeTab, setActiveTab] = useState('login');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Login State
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // Signup State
    const [signupData, setSignupData] = useState({
        firstname: '', lastname: '', email: '', password: '',
        address1: '', city: '', state: '', postcode: '', country: 'US', phonenumber: ''
    });

    const { login, signup } = useWhmcsAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(loginEmail, loginPassword);

        if (!result.success) {
            setError(result.message || 'Login failed');
            setLoading(false);
        } else {
            setLoading(false);
            onSuccess();
            onClose();
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await signup(signupData);

        if (!result.success) {
            setError(result.message || 'Signup failed');
            setLoading(false);
        } else {
            setLoading(false);
            onSuccess();
            onClose();
        }
    };

    const handleSignupChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
                        <h2 className="text-xl font-bold text-white">Authentication Required</h2>
                        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6">
                        <Tabs
                            tabs={[
                                { id: 'login', label: 'Login' },
                                { id: 'signup', label: 'Create Account' }
                            ]}
                            activeTab={activeTab}
                            onChange={setActiveTab}
                            className="mb-6"
                        />

                        {error && (
                            <div className="mb-4 p-3 bg-red-950/30 border border-red-900/50 rounded-lg text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        {activeTab === 'login' ? (
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-blue-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                                    <input
                                        type="password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-blue-500 outline-none"
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? 'Logging in...' : 'Login & Continue'}
                                </Button>
                            </form>
                        ) : (
                            <form onSubmit={handleSignup} className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">First Name</label>
                                        <input type="text" name="firstname" value={signupData.firstname} onChange={handleSignupChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Last Name</label>
                                        <input type="text" name="lastname" value={signupData.lastname} onChange={handleSignupChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                                    <input type="email" name="email" value={signupData.email} onChange={handleSignupChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Phone</label>
                                    <input type="tel" name="phonenumber" value={signupData.phonenumber} onChange={handleSignupChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Address</label>
                                    <input type="text" name="address1" value={signupData.address1} onChange={handleSignupChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">City</label>
                                        <input type="text" name="city" value={signupData.city} onChange={handleSignupChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">State</label>
                                        <input type="text" name="state" value={signupData.state} onChange={handleSignupChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none" required />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Postcode</label>
                                        <input type="text" name="postcode" value={signupData.postcode} onChange={handleSignupChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Country</label>
                                        <select name="country" value={signupData.country} onChange={handleSignupChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none">
                                            <option value="US">United States</option>
                                            <option value="GB">United Kingdom</option>
                                            <option value="CA">Canada</option>
                                            <option value="AU">Australia</option>
                                            <option value="DE">Germany</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                                    <input type="password" name="password" value={signupData.password} onChange={handleSignupChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none" required />
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? 'Creating Account...' : 'Create & Continue'}
                                </Button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
