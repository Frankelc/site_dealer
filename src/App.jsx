import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Stock from './pages/Stock';
import Sales from './pages/Sales';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'stock':
        return <Stock />;
      case 'sales':
        return <Sales />;
      case 'customers':
        return <div className="placeholder"><h2>Gestion Clients (À venir)</h2></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', minHeight: '100vh', padding: '20px' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main style={{
        marginLeft: '300px',
        flex: 1,
        padding: '20px',
        maxWidth: '1200px'
      }}>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
