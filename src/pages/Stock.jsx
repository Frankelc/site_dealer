import React, { useState } from 'react';
import { MOCK_IPHONES } from '../data/mockData';
import { Search, Plus, Battery, Smartphone, ShieldCheck } from 'lucide-react';

const Stock = () => {
    const [selectedIPhone, setSelectedIPhone] = useState(MOCK_IPHONES[0]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStock = MOCK_IPHONES.filter(item =>
        item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.imei.includes(searchTerm)
    );

    return (
        <div className="page-content">
            <header className="page-header">
                <div>
                    <h1>Gestion du Stock</h1>
                    <p className="text-secondary">{MOCK_IPHONES.length} appareils disponibles</p>
                </div>
                <button className="btn-primary flex-center gap-10">
                    <Plus size={20} /> Ajouter un iPhone
                </button>
            </header>

            <div className="grid-3" style={{ gridTemplateColumns: 'minmax(350px, 1fr) 2fr' }}>
                {/* Sidebar: List */}
                <div className="flex-column gap-20">
                    <div className="glass-card" style={{ padding: '15px' }}>
                        <div className="search-input-wrapper">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Modèle ou IMEI..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>

                    <div className="flex-column gap-10">
                        {filteredStock.map(item => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedIPhone(item)}
                                className="glass-card"
                                style={{
                                    padding: '15px',
                                    cursor: 'pointer',
                                    border: selectedIPhone.id === item.id ? '1px solid var(--primary)' : 'var(--glass-border)',
                                    background: selectedIPhone.id === item.id ? 'var(--bg-hover)' : 'var(--bg-card)'
                                }}
                            >
                                <div className="flex-between">
                                    <div>
                                        <h4 style={{ fontSize: '15px', fontWeight: '600' }}>{item.model}</h4>
                                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.capacity} • {item.imei}</p>
                                    </div>
                                    <span className={`status-badge status-${item.status.toLowerCase()}`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main: Preview & Specs */}
                <div className="flex-column gap-20">
                    {selectedIPhone && (
                        <>
                            <div className="glass-card flex-center" style={{ padding: '0', overflow: 'hidden', height: '350px', background: '#000', borderRadius: '20px', position: 'relative' }}>
                                {selectedIPhone.images && selectedIPhone.images.length > 0 ? (
                                    <img
                                        src={selectedIPhone.images[0]}
                                        alt={selectedIPhone.model}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />
                                ) : (
                                    <div className="flex-center flex-column text-secondary">
                                        <span>Sélectionnez un iPhone pour voir l'aperçu</span>
                                    </div>
                                )}
                                <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.7)', padding: '5px 15px', borderRadius: '20px', backdropFilter: 'blur(10px)' }}>
                                    <span style={{ fontWeight: '600', fontSize: '14px' }}>{selectedIPhone.color}</span>
                                </div>
                            </div>

                            <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                                <SpecItem
                                    icon={<Battery size={20} color="var(--success)" />}
                                    label="Batterie"
                                    value={`${selectedIPhone.batteryLevel}%`}
                                />
                                <SpecItem
                                    icon={<Smartphone size={20} color="var(--primary)" />}
                                    label="Face ID"
                                    value={selectedIPhone.faceId}
                                />
                                <SpecItem
                                    icon={<ShieldCheck size={20} color="var(--primary)" />}
                                    label="Condition"
                                    value={selectedIPhone.condition}
                                />
                            </div>

                            <div className="glass-card">
                                <h3 style={{ marginBottom: '20px' }}>Détails Financiers</h3>
                                <div className="flex-between" style={{ padding: '15px 0', borderBottom: '1px solid var(--glass-border)' }}>
                                    <span className="text-secondary">Prix d'achat</span>
                                    <span style={{ fontWeight: '600', fontSize: '18px' }}>{selectedIPhone.purchasePrice}$</span>
                                </div>
                                <div className="flex-between" style={{ padding: '15px 0', fontSize: '18px' }}>
                                    <span className="text-secondary">Prix de vente</span>
                                    <span style={{ fontWeight: '800', color: 'var(--success)', fontSize: '24px' }}>{selectedIPhone.sellingPrice}$</span>
                                </div>
                                {selectedIPhone.defects.length > 0 && (
                                    <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'rgba(255,69,58,0.1)', borderRadius: '12px', border: '1px solid var(--danger)' }}>
                                        <p style={{ color: 'var(--danger)', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            ⚠️ Défauts : {selectedIPhone.defects.join(', ')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const SpecItem = ({ icon, label, value }) => (
    <div className="glass-card flex-center" style={{ padding: '20px', gap: '15px', justifyContent: 'flex-start' }}>
        <div className="flex-center" style={{ padding: '10px', backgroundColor: 'var(--bg-hover)', borderRadius: '10px' }}>{icon}</div>
        <div>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '2px' }}>{label}</p>
            <p style={{ fontSize: '16px', fontWeight: '700' }}>{value}</p>
        </div>
    </div>
);

export default Stock;
