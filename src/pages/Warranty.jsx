import React, { useState } from 'react';
import { MOCK_SALES, MOCK_IPHONES, MOCK_CUSTOMERS } from '../data/mockData';
import { ShieldCheck, Clock, CheckCircle2, Search } from 'lucide-react';

const Warranty = () => {
    // Mock claims data
    const claims = [
        { id: 'cl1', saleId: 's1', issue: 'Batterie chauffe anormalement', status: 'En attente', date: '2024-01-20' },
        { id: 'cl2', saleId: 's2', issue: 'Écran scintille', status: 'Résolu', date: '2024-01-18' }
    ];

    return (
        <div className="page-content">
            <header className="page-header">
                <div>
                    <h1>Garanties & SAV</h1>
                    <p className="text-secondary">Suivi des réclamations et gestion des retours</p>
                </div>
            </header>

            <div className="grid-3" style={{ marginBottom: '40px' }}>
                <div className="glass-card flex-column flex-center text-center">
                    <h3 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '10px' }}>Garanties Actives</h3>
                    <p style={{ fontSize: '36px', fontWeight: '800', color: 'var(--success)' }}>12</p>
                </div>
                <div className="glass-card flex-column flex-center text-center">
                    <h3 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '10px' }}>En Cours</h3>
                    <p style={{ fontSize: '36px', fontWeight: '800', color: 'var(--warning)' }}>3</p>
                </div>
                <div className="glass-card flex-column flex-center text-center">
                    <h3 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '10px' }}>Délai Moyen</h3>
                    <p style={{ fontSize: '36px', fontWeight: '800', color: 'var(--primary)' }}>48h</p>
                </div>
            </div>

            <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                <div className="flex-between" style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)' }}>
                    <h3 style={{ fontSize: '18px' }}>Dernières Réclamations</h3>
                    <div className="search-input-wrapper" style={{ width: '300px' }}>
                        <Search size={16} className="search-icon" />
                        <input type="text" placeholder="Rechercher..." className="search-input" style={{ padding: '8px 8px 8px 35px' }} />
                    </div>
                </div>

                <div>
                    {claims.map((claim) => {
                        const sale = MOCK_SALES.find(s => s.id === claim.saleId);
                        const iphone = MOCK_IPHONES.find(i => i.id === sale?.iphoneId);
                        const customer = MOCK_CUSTOMERS.find(c => c.id === sale?.customerId);
                        const isResolved = claim.status === 'Résolu';

                        return (
                            <div key={claim.id} className="flex-between" style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)', transition: 'background-color 0.2s' }}>
                                <div className="flex-center gap-20">
                                    <div className="flex-center" style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '12px',
                                        backgroundColor: isResolved ? 'rgba(48, 209, 88, 0.1)' : 'rgba(255, 159, 10, 0.1)',
                                        color: isResolved ? 'var(--success)' : 'var(--warning)'
                                    }}>
                                        {isResolved ? <CheckCircle2 /> : <Clock />}
                                    </div>

                                    <div>
                                        <div className="flex-center gap-10" style={{ marginBottom: '4px', justifyContent: 'flex-start' }}>
                                            <h4 style={{ fontWeight: '600', fontSize: '16px' }}>{iphone?.model}</h4>
                                            <span className="text-secondary">•</span>
                                            <span className="text-secondary" style={{ fontSize: '14px' }}>{customer?.name}</span>
                                        </div>

                                        <p style={{ fontSize: '14px', color: 'var(--text-main)', marginBottom: '6px' }}>{claim.issue}</p>

                                        <div className="flex-center gap-15" style={{ justifyContent: 'flex-start' }}>
                                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{claim.date}</span>
                                            <span style={{ fontSize: '12px', color: 'var(--primary)', cursor: 'pointer', fontWeight: '500' }}>Voir dossier</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <span className={`status-badge ${isResolved ? 'status-available' : 'status-reparation'}`}>
                                        {claim.status}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Warranty;
