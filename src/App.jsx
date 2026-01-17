import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext';
import { WHMCSAuthProvider } from './lib/WHMCSAuthContext';
import LandingPage from './pages/LandingPage';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminRegister from './pages/admin/Register';
import Settings from './pages/admin/Settings';
import ClientLogin from './pages/auth/ClientLogin';
import ClientSignup from './pages/auth/ClientSignup';
import ClientLayout from './layouts/ClientLayout';
import ClientDashboard from './pages/client/Dashboard';
import OrderN8n from './pages/OrderN8n';
import Invoice from './pages/Invoice';

function App() {
  return (
    <AuthProvider>
      <WHMCSAuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public / Client Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<ClientLogin />} />
            <Route path="/signup" element={<ClientSignup />} />

            {/* Client Area */}
            <Route path="/dashboard" element={<ClientLayout />}>
              <Route index element={<ClientDashboard />} />
              <Route path="services" element={<div className="text-white">Services Page (Coming Soon)</div>} />
              <Route path="billing" element={<div className="text-white">Billing Page (Coming Soon)</div>} />
              <Route path="support" element={<div className="text-white">Support Page (Coming Soon)</div>} />
              <Route path="profile" element={<div className="text-white">Profile Page (Coming Soon)</div>} />
              <Route path="profile" element={<div className="text-white">Profile Page (Coming Soon)</div>} />
            </Route>

            <Route path="/order/n8n-cloud" element={<OrderN8n />} />
            <Route path="/invoice/:id" element={<Invoice />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/register" element={<AdminRegister />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<div className="text-white p-8">Page not found</div>} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </WHMCSAuthProvider>
    </AuthProvider>
  );
}

export default App;
