import React, { useState } from 'react';
import { MOCK_SALES, MOCK_IPHONES, MOCK_CUSTOMERS } from '../data/mockData';
import { Receipt, Share2 } from 'lucide-react';
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
        <div className="page-content">
            <header className="page-header">
                <div>
                    <h1>Ventes & Crédits</h1>
                    <p className="text-secondary">Historique des transactions et gestion des impayés</p>
                </div>
            </header>

            <div className="grid-3" style={{ gridTemplateColumns: '2fr 1.2fr' }}>
                {/* Sales List */}
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                    <table className="glass-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Client</th>
                                <th>Appareil</th>
                                <th>Total</th>
                                <th>Statut</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map((sale) => {
                                const customer = MOCK_CUSTOMERS.find(c => c.id === sale.customerId);
                                const iphone = MOCK_IPHONES.find(i => i.id === sale.iphoneId);
                                const isPaid = sale.status.toLowerCase().replace(' ', '') === 'payé';

                                return (
                                    <tr key={sale.id}>
                                        <td>{new Date(sale.date).toLocaleDateString()}</td>
                                        <td style={{ fontWeight: '500' }}>{customer?.name}</td>
                                        <td>{iphone?.model}</td>
                                        <td style={{ fontWeight: '700' }}>{sale.totalAmount}$</td>
                                        <td>
                                            <span className={`status-badge ${isPaid ? 'status-available' : 'status-reparation'}`}>
                                                {sale.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleGenerateReceipt(sale)}
                                                className="btn-icon"
                                                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}
                                                title="Générer reçu"
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
                        <div className="glass-card receipt-preview" style={{ padding: '30px', position: 'sticky', top: '20px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                                <h2 style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '2px' }}>REÇU OFFICIEL</h2>
                                <p className="text-secondary" style={{ fontSize: '12px' }}>DealerPro - Kinshasa / Dakar</p>
                            </div>

                            <div className="flex-column gap-20">
                                <div className="flex-between">
                                    <span className="text-secondary">N° Transaction</span>
                                    <span style={{ fontWeight: '600' }}>#TRX-{selectedSale.id}</span>
                                </div>

                                <div style={{ padding: '15px', backgroundColor: 'var(--bg-hover)', borderRadius: '12px' }}>
                                    <p className="text-secondary" style={{ fontSize: '12px', marginBottom: '5px' }}>CLIENT</p>
                                    <p style={{ fontWeight: '600' }}>{MOCK_CUSTOMERS.find(c => c.id === selectedSale.customerId)?.name}</p>
                                    <p style={{ fontSize: '12px' }}>{MOCK_CUSTOMERS.find(c => c.id === selectedSale.customerId)?.phone}</p>
                                </div>

                                <div style={{ padding: '15px', backgroundColor: 'var(--bg-hover)', borderRadius: '12px' }}>
                                    <p className="text-secondary" style={{ fontSize: '12px', marginBottom: '5px' }}>APPAREIL</p>
                                    <p style={{ fontWeight: '600' }}>{MOCK_IPHONES.find(i => i.id === selectedSale.iphoneId)?.model}</p>
                                    <p style={{ fontSize: '12px' }}>IMEI: {MOCK_IPHONES.find(i => i.id === selectedSale.iphoneId)?.imei}</p>
                                </div>

                                <div style={{ marginTop: '20px', borderTop: '2px dashed var(--glass-border)', paddingTop: '20px' }}>
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
                        <div className="glass-card flex-center flex-column" style={{ padding: '50px', gap: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            <Receipt size={60} style={{ opacity: 0.2 }} />
                            <p>Sélectionnez un reçu dans la liste pour l'afficher et le partager.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sales;
