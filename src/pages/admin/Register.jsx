import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { UserPlus } from 'lucide-react';

export default function AdminRegister() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [leading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            // Auto sign in or redirect to login
            navigate('/admin/login');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="mx-auto w-12 h-12 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center mb-4">
                        <UserPlus className="w-6 h-6 text-blue-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Create Admin User</h1>
                    <p className="text-slate-400 mt-2">Setup the initial administrator account</p>
                </div>

                <Card className="bg-slate-900 border-slate-800">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-950/30 border border-red-900/50 rounded-lg text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-blue-500 placeholder-slate-600 outline-none"
                                placeholder="admin@affirmweb.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-blue-500 placeholder-slate-600 outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={leading}>
                            {leading ? 'Creating...' : 'Create Admin'}
                        </Button>
                    </form>

                    <div className="mt-4 text-center">
                        <Link to="/admin/login" className="text-sm text-slate-500 hover:text-slate-300">Back to Login</Link>
                    </div>
                </Card>

                <div className="mt-8 p-4 bg-yellow-950/20 border border-yellow-900/30 rounded-lg text-xs text-yellow-500/80 text-center">
                    Security Note: After creating your admin user, you should disable signups or remove this route in production.
                </div>
            </div>
        </div>
    );
}
