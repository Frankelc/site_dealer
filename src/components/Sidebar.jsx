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
        <aside className="sidebar-container glass-card">
            <div className="logo-container">
                <h2>Dealer<span className="text-primary">Pro</span></h2>
            </div>

            <nav className="nav-menu">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </div>
                    );
                })}
            </nav>

            <div className="nav-footer">
                <div className="nav-item logout">
                    <LogOut size={20} />
                    <span>Déconnexion</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
