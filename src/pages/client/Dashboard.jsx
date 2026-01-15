
import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
    Package,
    CreditCard,
    LifeBuoy,
    ArrowUpRight,
    Search,
    ChevronRight,
    ExternalLink,
    Cpu,
    HardDrive,
    Activity
} from 'lucide-react';
import { whmcs } from '../../lib/whmcs';

export default function ClientDashboard() {
    const [stats, setStats] = useState([
        { name: 'Active Services', value: '2', icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { name: 'Tickets', value: '1', icon: LifeBuoy, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { name: 'Unpaid Invoices', value: '$0.00', icon: CreditCard, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    ]);

    const [services, setServices] = useState([
        {
            id: 1,
            name: 'n8n Managed Cloud - Personal',
            status: 'Active',
            nextDue: '2026-02-14',
            price: '$15.00 USD',
            domain: 'flow-alpha.affirmweb.app',
            cpu: '2 vCPU',
            ram: '4GB RAM'
        },
        {
            id: 2,
            name: 'WHMCS Module License',
            status: 'Active',
            nextDue: '2026-03-01',
            price: '$50.00 USD',
            domain: 'licensing.yourdomain.com',
            cpu: 'N/A',
            ram: 'N/A'
        },
    ]);

    const [invoices, setInvoices] = useState([
        { id: 'INV-7829', amount: '$15.00', date: '2026-01-14', status: 'Paid' },
        { id: 'INV-7815', amount: '$50.00', date: '2026-01-01', status: 'Paid' },
    ]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Welcome Section */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Workspace Overview</h1>
                <p className="text-slate-400">Manage your automation infrastructure and billing.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.name} className="p-6 bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-1">{stat.name}</p>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Services List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Package className="w-5 h-5 text-blue-500" />
                            Your Services
                        </h2>
                        <Button variant="ghost" className="text-sm text-blue-500 hover:text-blue-400 px-2 h-auto">View All</Button>
                    </div>

                    {services.map((service) => (
                        <Card key={service.id} className="p-5 bg-slate-900/40 border-slate-800 hover:bg-slate-900 transition-all group">
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{service.name}</h3>
                                        <Badge variant="success" className="text-[10px] py-0 px-2">{service.status}</Badge>
                                    </div>
                                    <p className="text-sm text-slate-500 font-mono flex items-center gap-1.5">
                                        <ExternalLink className="w-3 h-3" />
                                        {service.domain}
                                    </p>
                                </div>

                                <div className="flex items-center gap-8 border-l border-slate-800 md:pl-8">
                                    <div className="text-center md:text-left">
                                        <p className="text-[10px] text-slate-500 uppercase tracking-tighter mb-1">Resource</p>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 text-xs text-slate-300">
                                                <Cpu className="w-3 h-3 text-slate-500" /> {service.cpu}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-slate-300">
                                                <HardDrive className="w-3 h-3 text-slate-500" /> {service.ram}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-tighter mb-1 font-medium">Next Due</p>
                                        <p className="text-sm text-white font-medium">{service.nextDue}</p>
                                    </div>

                                    <Button variant="outline" size="sm" className="border-slate-800 hover:bg-slate-800 text-slate-400 group-hover:text-white group-hover:border-blue-500/50 transition-all">
                                        Manage
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Sidebar Widgets */}
                <div className="space-y-6">
                    {/* Quick Billing */}
                    <Card className="p-6 bg-slate-900/50 border-slate-800">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-blue-500" />
                            Recent Invoices
                        </h3>
                        <div className="space-y-4">
                            {invoices.map(inv => (
                                <div key={inv.id} className="flex items-center justify-between text-sm group cursor-pointer hover:bg-slate-800/50 p-2 rounded-lg transition-colors">
                                    <div>
                                        <p className="text-white font-medium group-hover:text-blue-400">{inv.id}</p>
                                        <p className="text-xs text-slate-500">{inv.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-bold">{inv.amount}</p>
                                        <p className="text-[10px] text-emerald-500 font-medium">Paid</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button className="w-full mt-6 bg-slate-800 hover:bg-slate-700 text-white border-none h-11">
                            Open Billing Area
                        </Button>
                    </Card>

                    {/* Support Ticket */}
                    <Card className="p-6 bg-gradient-to-br from-blue-600/10 to-transparent border-blue-500/20">
                        <h3 className="font-bold text-white mb-2">Need Assistance?</h3>
                        <p className="text-sm text-slate-400 mb-4">Our infrastructure specialists are ready to help you optimize your deployments.</p>
                        <Button variant="primary" className="w-full h-11 gap-2">
                            <LifeBuoy className="w-4 h-4" />
                            Open Support Ticket
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
