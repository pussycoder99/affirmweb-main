import { useState } from 'react';
import { useWhmcsAuth } from '../../lib/WHMCSAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { UserPlus } from 'lucide-react';

export default function ClientSignup() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        address1: '',
        city: '',
        state: '',
        postcode: '',
        country: 'US',
        phonenumber: ''
    });
    const [error, setError] = useState('');
    const [leading, setLoading] = useState(false);
    const { signup } = useWhmcsAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        console.log('[ClientSignup] Submitting form data:', JSON.stringify(formData, null, 2));

        const result = await signup(formData);

        if (!result.success) {
            setError(result.message || 'Signup failed');
            setLoading(false);
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-8">
                    <div className="mx-auto w-12 h-12 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center mb-4">
                        <UserPlus className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Create Client Account</h1>
                    <p className="text-slate-400 mt-2">Complete your profile to access the dashboard</p>
                </div>

                <Card className="bg-slate-900 border-slate-800 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-950/30 border border-red-900/50 rounded-lg text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Info */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-800 pb-2">Personal Details</h3>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-emerald-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-emerald-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-emerald-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phonenumber"
                                        value={formData.phonenumber}
                                        onChange={handleChange}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-emerald-500 outline-none"
                                        placeholder="+1.5555555555"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Address Info */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-800 pb-2">Billing Address</h3>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Address Line 1</label>
                                    <input
                                        type="text"
                                        name="address1"
                                        value={formData.address1}
                                        onChange={handleChange}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-emerald-500 outline-none"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-emerald-500 outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">State/Region</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-emerald-500 outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Postal Code</label>
                                        <input
                                            type="text"
                                            name="postcode"
                                            value={formData.postcode}
                                            onChange={handleChange}
                                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-emerald-500 outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Country</label>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-emerald-500 outline-none"
                                        >
                                            <option value="US">United States</option>
                                            <option value="GB">United Kingdom</option>
                                            <option value="CA">Canada</option>
                                            <option value="AU">Australia</option>
                                            <option value="DE">Germany</option>
                                            {/* Add more as needed */}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-800 mt-6">
                            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-emerald-500 outline-none"
                                required
                            />
                            <p className="text-xs text-slate-500 mt-1">Must be at least 8 characters</p>
                        </div>

                        <Button variant="whmcs" type="submit" className="w-full h-12 text-lg" disabled={leading}>
                            {leading ? 'Creating Account...' : 'Complete Registration'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
                            Login here
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
}
