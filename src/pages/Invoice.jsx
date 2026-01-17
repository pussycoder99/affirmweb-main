import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { whmcs } from '../lib/whmcs';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Section } from '../components/ui/Section';
import { ArrowLeft, CreditCard, Clock, CheckCircle2, AlertCircle, Printer, Download } from 'lucide-react';

export default function Invoice() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchInvoice();
    }, [id]);

    const fetchInvoice = async () => {
        try {
            const result = await whmcs.getInvoice(id);
            console.log('Invoice API Result:', result);
            if (result.result === 'success') {
                setInvoice(result);
            } else {
                throw new Error(result.message || 'Failed to fetch invoice');
            }
        } catch (err) {
            console.error('Invoice Fetch Error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePayNow = () => {
        // 1. Try to use the paymentbutton HTML if available
        if (invoice.paymentbutton) {
            console.log('Attempting to trigger payment via paymentbutton HTML...');

            // Create a temporary container
            const div = document.createElement('div');
            div.innerHTML = invoice.paymentbutton;
            div.style.display = 'none';
            document.body.appendChild(div);

            // Find the form or button and trigger it
            const form = div.querySelector('form');
            if (form) {
                form.submit();
                return;
            }

            const button = div.querySelector('button, input[type="submit"], a');
            if (button) {
                button.click();
                return;
            }

            // Cleanup if nothing found (though usually form.submit() redirects)
            document.body.removeChild(div);
        }

        // 2. Fallback: Construct the WHMCS payment URL
        console.log('Falling back to direct WHMCS link...');
        const whmcsUrl = whmcs.config?.url?.replace('/includes/api.php', '') || '';
        const paymentUrl = `${whmcsUrl}/viewinvoice.php?id=${id}`;
        window.location.href = paymentUrl;
    };

    if (loading) {
        return (
            <Section className="bg-slate-950 min-h-screen flex items-center justify-center">
                <div className="text-slate-400 animate-pulse">Loading Invoice...</div>
            </Section>
        );
    }

    if (error) {
        return (
            <Section className="bg-slate-950 min-h-screen flex items-center justify-center">
                <Card className="max-w-md w-full p-8 text-center bg-slate-900 border-slate-800">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2">Error</h2>
                    <p className="text-slate-400 mb-6">{error}</p>
                    <Button onClick={() => navigate('/dashboard')} className="w-full">
                        Back to Dashboard
                    </Button>
                </Card>
            </Section>
        );
    }

    const isPaid = invoice.status?.toLowerCase() === 'paid';
    const isUnpaid = invoice.status?.toLowerCase() === 'unpaid';

    return (
        <Section className="bg-slate-950 min-h-screen pt-24">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <Button variant="ghost" onClick={() => navigate(-1)} className="pl-0 hover:bg-transparent text-slate-400 hover:text-white">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="bg-slate-900 border-slate-800 text-slate-400 hover:text-white">
                            <Printer className="w-4 h-4 mr-2" /> Print
                        </Button>
                        <Button variant="outline" size="sm" className="bg-slate-900 border-slate-800 text-slate-400 hover:text-white">
                            <Download className="w-4 h-4 mr-2" /> Download
                        </Button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Invoice Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        <Card className="bg-slate-900 border-slate-800 p-8">
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <h1 className="text-2xl font-bold text-white mb-1">Invoice #{invoice.invoicenum || invoice.id}</h1>
                                    <p className="text-slate-400 text-sm">Invoice Date: {invoice.date}</p>
                                    <p className="text-slate-400 text-sm">Due Date: {invoice.duedate}</p>
                                </div>
                                <div className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${isPaid ? 'bg-emerald-500/10 text-emerald-500' :
                                    isUnpaid ? 'bg-red-500/10 text-red-500' :
                                        'bg-slate-500/10 text-slate-500'
                                    }`}>
                                    {invoice.status}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-12 mb-12">
                                <div>
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Invoiced To</h3>
                                    <div className="text-white font-medium">{invoice.fullname}</div>
                                    <div className="text-slate-400 text-sm mt-1">
                                        {invoice.address1}<br />
                                        {invoice.city}, {invoice.state}, {invoice.postcode}<br />
                                        {invoice.country}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Pay To</h3>
                                    <div className="text-white font-medium">AffirmWeb Cloud</div>
                                    <div className="text-slate-400 text-sm mt-1">
                                        Address goes here...
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Invoice Items</h3>
                                <div className="border border-slate-800 rounded-lg overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-950 border-b border-slate-800">
                                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Description</th>
                                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-800">
                                            {invoice.items?.item?.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 text-slate-300 text-sm">{item.description}</td>
                                                    <td className="px-6 py-4 text-white font-medium text-right text-sm">{invoice.currencyprefix}{item.amount}{invoice.currencysuffix}</td>
                                                </tr>
                                            )) || (
                                                    <tr>
                                                        <td className="px-6 py-4 text-slate-300 text-sm">Service Subscription</td>
                                                        <td className="px-6 py-4 text-white font-medium text-right text-sm">{invoice.currencyprefix}{invoice.total}{invoice.currencysuffix}</td>
                                                    </tr>
                                                )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Payment Sidebar */}
                    <div className="md:col-span-1">
                        <Card className="bg-slate-900 border-slate-800 p-6 sticky top-24">
                            <h3 className="text-lg font-semibold text-white mb-6">Payment Summary</h3>

                            <div className="space-y-3 mb-6 pb-6 border-b border-slate-800">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Sub Total</span>
                                    <span className="text-white">{invoice.currencyprefix}{invoice.subtotal}{invoice.currencysuffix}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Credit</span>
                                    <span className="text-white">{invoice.currencyprefix}{invoice.credit}{invoice.currencysuffix}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Tax</span>
                                    <span className="text-white">{invoice.currencyprefix}{invoice.tax}{invoice.currencysuffix}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-baseline mb-8">
                                <span className="text-slate-300 font-medium">Total Balance</span>
                                <span className="text-2xl font-bold text-white">
                                    {invoice.currencyprefix}{invoice.balance}{invoice.currencysuffix}
                                </span>
                            </div>

                            {!isPaid && (
                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                                <CreditCard className="w-4 h-4 text-blue-500" />
                                            </div>
                                            <div className="text-sm text-white font-medium">Payment Method</div>
                                        </div>
                                        <div className="text-slate-400 text-sm capitalize">{invoice.paymentmethod}</div>
                                    </div>

                                    <Button onClick={handlePayNow} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-6">
                                        Pay Now
                                    </Button>

                                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                                        <Clock className="w-3 h-3" />
                                        <span>Secure payment processing</span>
                                    </div>
                                </div>
                            )}

                            {isPaid && (
                                <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-center">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                                    <div className="text-emerald-500 font-bold">Payment Received</div>
                                    <div className="text-xs text-emerald-500/70 mt-1">Thank you for your business!</div>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </Section>
    );
}
