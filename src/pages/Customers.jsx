import React, { useState } from 'react';
import { MOCK_CUSTOMERS, MOCK_SALES, MOCK_IPHONES } from '../data/mockData';
import { User, Plus, Search, MessageSquare, History } from 'lucide-react';

const Customers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const filteredCustomers = MOCK_CUSTOMERS.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
    );

    return (
        <div className="page-content">
            <header className="page-header">
                <div>
                    <h1>Base Clients</h1>
                    <p className="text-secondary">{MOCK_CUSTOMERS.length} clients enregistrés</p>
                </div>
                <button className="btn-primary flex-center gap-10">
                    <Plus size={20} /> Nouveau Client
                </button>
            </header>

            <div className="grid-3" style={{ gridTemplateColumns: 'minmax(300px, 1fr) 2fr' }}>
                {/* Left: Customer List */}
                <div className="flex-column gap-20">
                    <div className="glass-card" style={{ padding: '15px' }}>
                        <div className="search-input-wrapper">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Rechercher un client..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>

                    <div className="flex-column gap-10">
                        {filteredCustomers.map(customer => (
                            <div
                                key={customer.id}
                                onClick={() => setSelectedCustomer(customer)}
                                className="glass-card"
                                style={{
                                    padding: '15px',
                                    cursor: 'pointer',
                                    border: selectedCustomer?.id === customer.id ? '1px solid var(--primary)' : 'var(--glass-border)',
                                    background: selectedCustomer?.id === customer.id ? 'var(--bg-hover)' : 'var(--bg-card)'
                                }}
                            >
                                <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '15px' }}>
                                    <div className="flex-center" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(41, 151, 255, 0.1)' }}>
                                        <User size={20} color="var(--primary)" />
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: '600', fontSize: '15px' }}>{customer.name}</h4>
                                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{customer.phone}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Customer Detail & History */}
                <div>
                    {selectedCustomer ? (
                        <div className="flex-column gap-20">
                            <div className="glass-card">
                                <div className="flex-between" style={{ marginBottom: '30px' }}>
                                    <div className="flex-center gap-20">
                                        <div className="flex-center" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), #0077ed)', boxShadow: '0 4px 15px var(--primary-glow)' }}>
                                            <span style={{ fontSize: '24px', fontWeight: '800', color: 'white' }}>{selectedCustomer.name[0]}</span>
                                        </div>
                                        <div>
                                            <h2>{selectedCustomer.name}</h2>
                                            <p className="text-secondary">Client certifié</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => window.open(`https://wa.me/${selectedCustomer.phone}`, '_blank')}
                                        className="glass-card flex-center gap-10"
                                        style={{ padding: '10px 20px', color: '#25D366', cursor: 'pointer' }}
                                    >
                                        <MessageSquare size={18} /> WhatsApp
                                    </button>
                                </div>

                                <div className="grid-3" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '20px' }}>
                                    <div style={{ padding: '15px', backgroundColor: 'var(--bg-hover)', borderRadius: '12px' }}>
                                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Téléphone</p>
                                        <p style={{ fontWeight: '600', fontSize: '16px' }}>{selectedCustomer.phone}</p>
                                    </div>
                                    <div style={{ padding: '15px', backgroundColor: 'var(--bg-hover)', borderRadius: '12px' }}>
                                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Crédit En Cours</p>
                                        <p style={{ fontWeight: '600', color: 'var(--danger)', fontSize: '16px' }}>400$</p>
                                    </div>
                                </div>

                                {selectedCustomer.notes && (
                                    <div style={{ padding: '15px', backgroundColor: 'rgba(255,159,10,0.05)', borderRadius: '12px', border: '1px solid rgba(255,159,10,0.2)' }}>
                                        <p style={{ fontSize: '12px', color: 'var(--warning)', fontWeight: '600', marginBottom: '5px' }}>NOTE INTERNE</p>
                                        <p style={{ fontSize: '14px', color: 'var(--text-main)' }}>{selectedCustomer.notes}</p>
                                    </div>
                                )}
                            </div>

                            <div className="glass-card">
                                <h3 className="flex-center" style={{ justifyContent: 'flex-start', gap: '10px', marginBottom: '20px' }}>
                                    <History size={20} color="var(--primary)" /> Historique des achats
                                </h3>
                                <div className="flex-column gap-10">
                                    {MOCK_SALES.filter(s => s.customerId === selectedCustomer.id).map(sale => {
                                        const iphone = MOCK_IPHONES.find(i => i.id === sale.iphoneId);
                                        const isPaid = sale.status.toLowerCase().replace(' ', '') === 'payé';

                                        return (
                                            <div key={sale.id} className="flex-between" style={{ padding: '16px', backgroundColor: 'var(--bg-hover)', borderRadius: '12px' }}>
                                                <div>
                                                    <p style={{ fontWeight: '600' }}>{iphone?.model}</p>
                                                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{new Date(sale.date).toLocaleDateString()} • {sale.paymentType}</p>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <p style={{ fontWeight: '700', fontSize: '16px' }}>{sale.totalAmount}$</p>
                                                    <span className={`status-badge ${isPaid ? 'status-available' : 'status-reparation'}`}>
                                                        {sale.status}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {MOCK_SALES.filter(s => s.customerId === selectedCustomer.id).length === 0 && (
                                        <p className="text-secondary" style={{ textAlign: 'center', padding: '20px' }}>Aucun historique d'achat.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-card flex-center flex-column" style={{ height: '100%', padding: '50px', color: 'var(--text-secondary)', gap: '20px' }}>
                            <User size={60} style={{ opacity: 0.1 }} />
                            <p>Sélectionnez un client pour voir son dossier.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Customers;
