import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWhmcsAuth } from '../lib/WHMCSAuthContext';
import { whmcs } from '../lib/whmcs';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Section } from '../components/ui/Section';
import { Check, Server, ArrowLeft } from 'lucide-react';
import { AuthModal } from '../components/auth/AuthModal';

export default function OrderN8n() {
    const { client: user, loading } = useWhmcsAuth();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [showAuthModal, setShowAuthModal] = useState(false);

    // Placeholder Product ID - Update this with your actual WHMCS Product ID
    const PRODUCT_ID = 1;

    const [product, setProduct] = useState(null);
    const [loadingProduct, setLoadingProduct] = useState(true);

    const [billingCycle, setBillingCycle] = useState('monthly');
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [loadingGateways, setLoadingGateways] = useState(true);

    useEffect(() => {
        fetchProductDetails();
        fetchPaymentMethods();
    }, []);

    const fetchPaymentMethods = async () => {
        try {
            const result = await whmcs.getPaymentMethods();
            if (result.result === 'success' && result.paymentmethods?.paymentmethod) {
                const methods = Array.isArray(result.paymentmethods.paymentmethod)
                    ? result.paymentmethods.paymentmethod
                    : [result.paymentmethods.paymentmethod];
                setPaymentMethods(methods);
                if (methods.length > 0) {
                    setSelectedPaymentMethod(methods[0].module);
                }
            }
        } catch (err) {
            console.error('Failed to fetch payment methods:', err);
        } finally {
            setLoadingGateways(false);
        }
    };

    const fetchProductDetails = async () => {
        try {
            const result = await whmcs.request('GetProducts', { pid: PRODUCT_ID });
            let foundProduct = null;
            if (result.products && result.products.product) {
                const productsList = Array.isArray(result.products.product)
                    ? result.products.product
                    : [result.products.product];

                foundProduct = productsList.find(p => p.pid == PRODUCT_ID);
            }

            if (foundProduct) {
                setProduct(foundProduct);
            } else {
                console.error('Product not found in WHMCS response', result);
                setError(`Product ID ${PRODUCT_ID} not found.`);
            }
        } catch (err) {
            console.error('Failed to fetch product:', err);
            setError(`Failed to load product: ${err.message}`);
        } finally {
            setLoadingProduct(false);
        }
    };

    const handleOrder = async () => {
        if (!user) {
            setShowAuthModal(true);
            return;
        }

        setProcessing(true);
        setError(null);

        try {
            // 1. Create Order via WHMCS API
            const result = await whmcs.request('AddOrder', {
                pid: PRODUCT_ID,
                clientid: user.id,
                paymentmethod: selectedPaymentMethod || 'stripe',
                billingcycle: billingCycle,
            });

            if (result.result === 'success') {
                // 2. Redirect to Internal Invoice Page
                navigate(`/invoice/${result.invoiceid}`);
            } else {
                throw new Error(result.message || 'Order failed');
            }
        } catch (err) {
            console.error('Order Error:', err);
            setError(err.message || 'Failed to place order. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Loading...</div>;

    return (
        <Section className="bg-slate-950 min-h-screen pt-24">
            <div className="max-w-4xl mx-auto px-4">
                <Button variant="ghost" onClick={() => navigate('/')} className="mb-8 pl-0 hover:bg-transparent text-slate-400 hover:text-white">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Button>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Order Details */}
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Configure n8n Cloud</h1>
                            <p className="text-slate-400">Deploy a fully managed n8n instance in seconds.</p>

                            {/* Billing Cycle Toggle */}
                            <div className="flex items-center space-x-4 mt-6 bg-slate-900 p-1 rounded-lg border border-slate-800 w-fit">
                                <button
                                    onClick={() => setBillingCycle('monthly')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${billingCycle === 'monthly'
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-slate-400 hover:text-white'
                                        }`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setBillingCycle('annually')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${billingCycle === 'annually'
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-slate-400 hover:text-white'
                                        }`}
                                >
                                    Yearly
                                </button>
                            </div>
                        </div>

                        <Card className="bg-slate-900 border-slate-800 p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Instance Specification</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-slate-950 rounded-lg border border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/10 rounded-lg">
                                            <Server className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <div className="text-white font-medium">
                                                {loadingProduct ? 'Loading...' : (product?.name || 'Standard Node')}
                                            </div>
                                            <div className="text-sm text-slate-500" dangerouslySetInnerHTML={{ __html: product?.description || '2 vCPU, 4GB RAM, 50GB NVMe' }}></div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        {loadingProduct ? (
                                            <div className="h-8 w-24 bg-slate-800 animate-pulse rounded"></div>
                                        ) : (
                                            <>
                                                <div className="text-white font-bold text-xl">
                                                    {product?.pricing?.USD?.[billingCycle]
                                                        ? `$${product.pricing.USD[billingCycle]}`
                                                        : '$--.--'}
                                                </div>
                                                <div className="text-xs text-slate-500 capitalize">/{billingCycle.replace('annually', 'year').replace('monthly', 'month')}</div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="bg-slate-900 border-slate-800 p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
                            {loadingGateways ? (
                                <div className="space-y-3">
                                    <div className="h-12 bg-slate-800 animate-pulse rounded-lg"></div>
                                    <div className="h-12 bg-slate-800 animate-pulse rounded-lg"></div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {paymentMethods.map((method) => (
                                        <button
                                            key={method.module}
                                            onClick={() => setSelectedPaymentMethod(method.module)}
                                            className={`flex items-center justify-between p-4 rounded-lg border transition-all ${selectedPaymentMethod === method.module
                                                ? 'bg-blue-600/10 border-blue-500 text-white'
                                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                                                }`}
                                        >
                                            <span className="font-medium">{method.displayname}</span>
                                            {selectedPaymentMethod === method.module && (
                                                <Check className="w-4 h-4 text-blue-500" />
                                            )}
                                        </button>
                                    ))}
                                    {paymentMethods.length === 0 && (
                                        <div className="col-span-full p-4 bg-slate-950 rounded-lg border border-slate-800 text-slate-400 text-sm">
                                            No payment methods available.
                                        </div>
                                    )}
                                </div>
                            )}
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className="md:col-span-1">
                        <Card className="bg-slate-900 border-slate-800 p-6 sticky top-24">
                            <h3 className="text-lg font-semibold text-white mb-6">Order Summary</h3>

                            <div className="space-y-3 mb-6 pb-6 border-b border-slate-800">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">{product?.name || 'n8n Cloud Standard'}</span>
                                    <span className="text-white">
                                        {product?.pricing?.USD?.[billingCycle]
                                            ? `$${product.pricing.USD[billingCycle]}`
                                            : '$--.--'}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Setup Fee</span>
                                    <span className="text-emerald-400">
                                        {product?.pricing?.USD?.[billingCycle === 'monthly' ? 'msetupfee' : 'asetupfee'] && parseFloat(product.pricing.USD[billingCycle === 'monthly' ? 'msetupfee' : 'asetupfee']) > 0
                                            ? `$${product.pricing.USD[billingCycle === 'monthly' ? 'msetupfee' : 'asetupfee']}`
                                            : 'Free'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between items-baseline mb-8">
                                <span className="text-slate-300 font-medium">Total</span>
                                <span className="text-2xl font-bold text-white">
                                    {product?.pricing?.USD?.[billingCycle]
                                        ? `$${(parseFloat(product.pricing.USD[billingCycle]) + parseFloat(product.pricing.USD[billingCycle === 'monthly' ? 'msetupfee' : 'asetupfee'] || 0)).toFixed(2)}`
                                        : '$--.--'}
                                </span>
                            </div>

                            {error && (
                                <div className="mb-4 p-3 bg-red-950/30 border border-red-900/50 rounded-lg text-red-400 text-sm break-words">
                                    {error}
                                </div>
                            )}

                            <Button
                                onClick={handleOrder}
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                            >
                                {processing ? 'Processing...' : 'Deploy Now'}
                            </Button>

                            <p className="text-xs text-slate-500 text-center mt-4">
                                By deploying, you agree to our Terms of Service.
                            </p>
                        </Card>
                    </div>
                </div>
            </div>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSuccess={() => {
                    setShowAuthModal(false);
                }}
            />
        </Section>
    );
}
