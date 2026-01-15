
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useWhmcsAuth } from '../lib/WHMCSAuthContext';
import {
    LayoutDashboard,
    Package,
    CreditCard,
    LifeBuoy,
    Settings,
    LogOut,
    User,
    Bell
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function ClientLayout() {
    const { client, logout, loading } = useWhmcsAuth();
    const location = useLocation();

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;
    if (!client) return <Navigate to="/login" replace />;

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Services', href: '/dashboard/services', icon: Package },
        { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
        { name: 'Support', href: '/dashboard/support', icon: LifeBuoy },
        { name: 'Profile', href: '/dashboard/profile', icon: User },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-900 bg-slate-950/50 backdrop-blur-xl flex flex-col fixed h-full">
                <div className="p-6 border-b border-slate-900">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">A</div>
                        <span className="text-xl font-bold text-white tracking-tight">Affirm<span className="text-blue-500">Web</span></span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1 mt-4">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-500' : 'text-slate-500 group-hover:text-slate-300'}`} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-900">
                    <button
                        onClick={logout}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl w-full text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-all duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 ml-64 flex flex-col min-h-screen">
                <header className="h-16 border-b border-slate-900 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8">
                    <h2 className="text-lg font-semibold text-white">
                        {navigation.find(n => n.href === location.pathname)?.name || 'Account'}
                    </h2>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-900"></div>
                        <div className="flex items-center space-x-3">
                            <div className="text-right">
                                <p className="text-sm font-medium text-white">{client.firstname} {client.lastname}</p>
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Client Account</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white border-2 border-slate-900 shadow-xl">
                                {client.firstname?.[0]}{client.lastname?.[0]}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
