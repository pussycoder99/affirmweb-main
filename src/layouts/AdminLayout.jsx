import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { LayoutDashboard, Users, Server, Settings, LogOut } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function AdminLayout() {
    const { user, loading, signOut } = useAuth();

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Loading...</div>;
    if (!user) return <Navigate to="/admin/login" replace />;

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', href: '/admin/dashboard' },
        { icon: Server, label: 'Cloud Instances', href: '/admin/instances' },
        { icon: Users, label: 'Customers', href: '/admin/customers' },
        { icon: Settings, label: 'Settings', href: '/admin/settings' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-800 bg-slate-900 p-4 flex flex-col">
                <div className="flex items-center gap-2 font-bold text-xl text-white mb-8 px-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white text-sm">A</div>
                    Admin
                </div>

                <nav className="flex-1 space-y-1">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="pt-4 border-t border-slate-800">
                    <div className="px-3 py-2 mb-2 text-xs text-slate-500">
                        Logged in as<br />
                        <span className="text-slate-300 truncate block">{user.email}</span>
                    </div>
                    <Button variant="ghost" className="w-full justify-start gap-2 text-red-400 hover:text-red-300 hover:bg-red-950/30" onClick={() => signOut()}>
                        <LogOut className="w-4 h-4" /> Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur flex items-center justify-between px-8">
                    <h1 className="text-lg font-medium text-white">Dashboard</h1>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
