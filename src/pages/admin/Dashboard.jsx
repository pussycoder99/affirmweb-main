import { useWhmcsAuth } from '../../lib/WHMCSAuthContext';
import { Link } from 'react-router-dom';
import { Server, Users, DollarSign, Activity, HardDrive, AlertCircle, ArrowRight } from 'lucide-react';

export default function Dashboard() {
    const { isConfigured } = useWhmcsAuth();
    const stats = [
        { label: 'Active Instances', value: '1,248', change: '+12%', icon: Server, color: 'blue' },
        { label: 'Total Customers', value: '856', change: '+4%', icon: Users, color: 'emerald' },
        { label: 'Monthly Revenue', value: '$45.2k', change: '+8%', icon: DollarSign, color: 'amber' },
        { label: 'System Load', value: '34%', change: '-2%', icon: Activity, color: 'purple' },
    ];

    return (
        <div className="space-y-6">
            {!isConfigured && (
                <Card className="p-4 bg-amber-950/20 border-amber-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-amber-500/10 rounded-lg">
                            <AlertCircle className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                            <h4 className="text-amber-500 font-bold">WHMCS Not Configured</h4>
                            <p className="text-amber-500/70 text-sm">Your billing system is not connected. Users will not be able to login or place orders.</p>
                        </div>
                    </div>
                    <Link to="/admin/settings">
                        <Button variant="outline" className="border-amber-900/50 text-amber-500 hover:bg-amber-500/10 gap-2">
                            Configure Now <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </Card>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <Card key={stat.label} className="p-4 bg-slate-900 border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
                            <div className={`p-2 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-500`}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">{stat.value}</span>
                            <span className="text-xs text-emerald-400 font-medium">{stat.change}</span>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Activity / Server Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card className="h-full bg-slate-900 border-slate-800">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold text-white">Recent Deployments</h3>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-slate-800/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center">
                                            <HardDrive className="w-4 h-4 text-slate-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">n8n-prod-{100 + i}</div>
                                            <div className="text-xs text-slate-500">Deployed by customer@{i}.com</div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded border border-emerald-900/50">
                                        Active
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div>
                    <Card className="h-full bg-slate-900 border-slate-800">
                        <div className="mb-4">
                            <h3 className="font-semibold text-white">Server Health</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">US-East-1 Cluster</span>
                                    <span className="text-white">92%</span>
                                </div>
                                <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[92%]"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">EU-West-2 Cluster</span>
                                    <span className="text-white">45%</span>
                                </div>
                                <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[45%]"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Database Replica</span>
                                    <span className="text-white">12%</span>
                                </div>
                                <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500 w-[12%]"></div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
