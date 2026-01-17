import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Stock from './pages/Stock';
import Sales from './pages/Sales';
import Customers from './pages/Customers';
import Warranty from './pages/Warranty';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Settings from './pages/Settings';
import Login from './pages/Login';
import './App.css';
import { User, Shield, AlertTriangle } from 'lucide-react';

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: '#fff', textAlign: 'center', padding: '20px' }}>
          <AlertTriangle size={60} color="var(--danger)" style={{ marginBottom: '20px' }} />
          <h1>Oups ! Quelque chose s'est mal passé.</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>Essayez de rafraîchir la page ou vérifiez votre connexion.</p>
          <button onClick={() => window.location.reload()} className="btn-primary" style={{ marginTop: '30px' }}>Rafraîchir</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function AdminLayout({ children, activeTab, setActiveTab }) {
  return (
    <div className="admin-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleLogin = () => setIsAuthenticated(true);

  return (
    <Router>
      <GlobalErrorBoundary>
        <div className="app-container">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <div className="container" style={{ padding: '40px 20px' }}>
                {selectedProduct ? (
                  <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
                ) : (
                  <Catalog onSelectProduct={(p) => setSelectedProduct(p)} />
                )}
              </div>
            } />

            {/* Admin Routes */}
            <Route path="/admin" element={
              !isAuthenticated ? (
                <Login onLogin={handleLogin} />
              ) : (
                <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                  {activeTab === 'dashboard' && <Dashboard />}
                  {activeTab === 'stock' && <Stock />}
                  {activeTab === 'sales' && <Sales />}
                  {activeTab === 'customers' && <Customers />}
                  {activeTab === 'warranty' && <Warranty />}
                  {activeTab === 'settings' && <Settings />}
                </AdminLayout>
              )
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </GlobalErrorBoundary>
    </Router>
  );
}

export default App;
