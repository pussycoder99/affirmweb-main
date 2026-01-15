import { useState } from 'react';
import { useWhmcsAuth } from '../../lib/WHMCSAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { UserCheck } from 'lucide-react';

export default function ClientLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [leading, setLoading] = useState(false);
    const { login } = useWhmcsAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (!result.success) {
            setError(result.message || 'Login failed');
            setLoading(false);
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="mx-auto w-12 h-12 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center mb-4">
                        <UserCheck className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Client Portal</h1>
                    <p className="text-slate-400 mt-2">Manage your n8n instances and billing</p>
                </div>

                <Card className="bg-slate-900 border-slate-800">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-950/30 border border-red-900/50 rounded-lg text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-emerald-500 placeholder-slate-600 outline-none"
                                placeholder="you@company.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-emerald-500 placeholder-slate-600 outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {/* Demo Hint */}
                        <div className="text-xs text-slate-500 p-2 bg-slate-950 rounded border border-slate-800/50">
                            Demo Login: demo@affirmweb.com / demo
                        </div>

                        <Button variant="whmcs" type="submit" className="w-full" disabled={leading}>
                            {leading ? 'Accessing Portal...' : 'Login to Client Area'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-400">
                        New customer?{' '}
                        <Link to="/signup" className="text-emerald-400 hover:text-emerald-300 font-medium">
                            Create an account
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
}
