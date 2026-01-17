import React, { useState } from 'react';
import { MOCK_SALES, MOCK_IPHONES, MOCK_CUSTOMERS } from '../data/mockData';
import { Receipt, CreditCard, User, Calendar, CheckCircle, Clock, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const Sales = () => {
    const [sales, setSales] = useState(MOCK_SALES);
    const [selectedSale, setSelectedSale] = useState(null);

    const handleGenerateReceipt = (sale) => {
        setSelectedSale(sale);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0071e3', '#34c759', '#ffffff']
        });
    };

    return (
        <div className="sales-page">
            <header className="flex-between" style={{ marginBottom: '30px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: '700' }}>Ventes & Crédits</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Historique des transactions et gestion des impayés</p>
                </div>
            </header>

            <div className="grid-3" style={{ gridTemplateColumns: '2fr 1.2fr' }}>
                {/* Sales List */}
                <div className="glass-card" style={{ padding: '0' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>
                                <th style={{ padding: '20px' }}>Date</th>
                                <th style={{ padding: '20px' }}>Client</th>
                                <th style={{ padding: '20px' }}>Appareil</th>
                                <th style={{ padding: '20px' }}>Total</th>
                                <th style={{ padding: '20px' }}>Statut</th>
                                <th style={{ padding: '20px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map((sale) => {
                                const customer = MOCK_CUSTOMERS.find(c => c.id === sale.customerId);
                                const iphone = MOCK_IPHONES.find(i => i.id === sale.iphoneId);
                                return (
                                    <tr key={sale.id} style={{ borderBottom: '1px solid var(--border)', transition: 'var(--transition)' }}>
                                        <td style={{ padding: '20px' }}>{new Date(sale.date).toLocaleDateString()}</td>
                                        <td style={{ padding: '20px', fontWeight: '500' }}>{customer?.name}</td>
                                        <td style={{ padding: '20px' }}>{iphone?.model}</td>
                                        <td style={{ padding: '20px', fontWeight: '700' }}>{sale.totalAmount}$</td>
                                        <td style={{ padding: '20px' }}>
                                            <span className={`status-badge status-${sale.status.toLowerCase().replace(' ', '') === 'payé' ? 'available' : 'reparation'}`}>
                                                {sale.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '20px' }}>
                                            <button
                                                onClick={() => handleGenerateReceipt(sale)}
                                                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}
                                            >
                                                <Receipt size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Receipt Sidebar / Details */}
                <div>
                    {selectedSale ? (
                        <div className="glass-card receipt-preview" style={{ padding: '30px', position: 'sticky', top: '40px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                                <h2 style={{ fontSize: '20px', fontWeight: '800' }}>REÇU OFFICIEL</h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>DealerPro - Kinshasa / Dakar</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div className="flex-between">
                                    <span style={{ color: 'var(--text-secondary)' }}>N° Transaction</span>
                                    <span style={{ fontWeight: '600' }}>#TRX-{selectedSale.id}</span>
                                </div>

                                <div style={{ padding: '15px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '5px' }}>CLIENT</p>
                                    <p style={{ fontWeight: '600' }}>{MOCK_CUSTOMERS.find(c => c.id === selectedSale.customerId)?.name}</p>
                                    <p style={{ fontSize: '12px' }}>{MOCK_CUSTOMERS.find(c => c.id === selectedSale.customerId)?.phone}</p>
                                </div>

                                <div style={{ padding: '15px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '5px' }}>APPAREIL</p>
                                    <p style={{ fontWeight: '600' }}>{MOCK_IPHONES.find(i => i.id === selectedSale.iphoneId)?.model}</p>
                                    <p style={{ fontSize: '12px' }}>IMEI: {MOCK_IPHONES.find(i => i.id === selectedSale.iphoneId)?.imei}</p>
                                </div>

                                <div style={{ marginTop: '20px', borderTop: '2px dashed var(--border)', paddingTop: '20px' }}>
                                    <div className="flex-between" style={{ marginBottom: '10px' }}>
                                        <span>Montant Total</span>
                                        <span style={{ fontWeight: '700' }}>{selectedSale.totalAmount}$</span>
                                    </div>
                                    <div className="flex-between" style={{ marginBottom: '10px', color: 'var(--success)' }}>
                                        <span>Montant Payé</span>
                                        <span style={{ fontWeight: '600' }}>-{selectedSale.paidAmount}$</span>
                                    </div>
                                    {selectedSale.remainingAmount > 0 && (
                                        <div className="flex-between" style={{ color: 'var(--danger)', fontSize: '18px', fontWeight: '800' }}>
                                            <span>Reste à payer</span>
                                            <span>{selectedSale.remainingAmount}$</span>
                                        </div>
                                    )}
                                </div>

                                {selectedSale.status === 'En cours' && (
                                    <div style={{ backgroundColor: 'rgba(255,159,10,0.1)', padding: '10px', borderRadius: '8px', border: '1px solid var(--warning)', marginTop: '10px' }}>
                                        <p style={{ fontSize: '12px', color: 'var(--warning)', textAlign: 'center' }}>
                                            Échéance: {new Date(selectedSale.dueDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                )}

                                <button
                                    className="btn-primary"
                                    style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
                                    onClick={() => window.open(`https://wa.me/${MOCK_CUSTOMERS.find(c => c.id === selectedSale.customerId)?.phone}?text=Bonjour, voici votre reçu pour l'achat de votre iPhone...`, '_blank')}
                                >
                                    <Share2 size={18} /> Partager via WhatsApp
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-card" style={{ padding: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            <Receipt size={60} opacity={0.3} />
                            <p>Sélectionnez un reçu dans la liste pour l'afficher et le partager.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sales;
