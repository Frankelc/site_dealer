import React from 'react';
import { LayoutDashboard, Smartphone, Users, ShoppingBag, ShieldAlert, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
        { id: 'stock', label: 'Gestion Stock', icon: Smartphone },
        { id: 'sales', label: 'Ventes & Crédits', icon: ShoppingBag },
        { id: 'customers', label: 'Clients', icon: Users },
        { id: 'warranty', label: 'Garanties', icon: ShieldAlert },
        { id: 'settings', label: 'Paramètres', icon: Settings },
    ];

    return (
        <aside className="glass-card sidebar" style={{ height: 'calc(100vh - 40px)', width: '260px', position: 'fixed', top: '20px', left: '20px', display: 'flex', flexDirection: 'column', padding: '30px 20px' }}>
            <div className="logo" style={{ marginBottom: '40px', paddingLeft: '10px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-1px' }}>Dealer<span style={{ color: 'var(--primary)' }}>Pro</span></h2>
            </div>

            <nav style={{ flex: 1 }}>
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <div
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className="nav-item"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '12px 15px',
                                borderRadius: '12px',
                                marginBottom: '8px',
                                cursor: 'pointer',
                                transition: 'var(--transition)',
                                backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                                color: isActive ? 'white' : 'var(--text-secondary)'
                            }}
                        >
                            <Icon size={20} style={{ marginRight: '12px' }} />
                            <span style={{ fontWeight: '500' }}>{item.label}</span>
                        </div>
                    );
                })}
            </nav>

            <div
                className="nav-item logout"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 15px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    color: 'var(--danger)',
                    transition: 'var(--transition)'
                }}
            >
                <LogOut size={20} style={{ marginRight: '12px' }} />
                <span style={{ fontWeight: '500' }}>Déconnexion</span>
            </div>
        </aside>
    );
};

export default Sidebar;
