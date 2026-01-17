import React, { useState } from 'react';
import { MOCK_IPHONES } from '../data/mockData';
import IPhoneViewer from '../components/iPhoneViewer';
import { Search, Plus, Filter, Battery, Smartphone, ShieldCheck } from 'lucide-react';

const Stock = () => {
    const [selectedIPhone, setSelectedIPhone] = useState(MOCK_IPHONES[0]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStock = MOCK_IPHONES.filter(item =>
        item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.imei.includes(searchTerm)
    );

    return (
        <div className="stock-page">
            <header className="flex-between" style={{ marginBottom: '30px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: '700' }}>Gestion du Stock</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>{MOCK_IPHONES.length} appareils disponibles</p>
                </div>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Plus size={20} /> Ajouter un iPhone
                </button>
            </header>

            <div className="grid-3" style={{ gridTemplateColumns: 'minmax(350px, 1fr) 2fr' }}>
                {/* Sidebar: List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="glass-card" style={{ padding: '15px' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                placeholder="Rechercher par modèle ou IMEI..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '10px',
                                    color: 'white'
                                }}
                            />
                        </div>
                    </div>

                    <div className="stock-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {filteredStock.map(item => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedIPhone(item)}
                                className="glass-card"
                                style={{
                                    padding: '15px',
                                    cursor: 'pointer',
                                    border: selectedIPhone.id === item.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                                    transition: 'var(--transition)'
                                }}
                            >
                                <div className="flex-between">
                                    <div>
                                        <h4 style={{ fontSize: '16px', fontWeight: '600' }}>{item.model}</h4>
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

                {/* Main: 3D Preview & Specs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {selectedIPhone && (
                        <>
                            <IPhoneViewer
                                color={selectedIPhone.color === 'Natural Titanium' ? '#a5a194' : selectedIPhone.color === 'Midnight' ? '#1c1c1e' : '#ffffff'}
                                defect={selectedIPhone.defects[0]}
                            />

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

                            <div className="glass-card" style={{ padding: '25px' }}>
                                <h3 style={{ marginBottom: '15px' }}>Informations financières</h3>
                                <div className="flex-between" style={{ padding: '15px 0', borderBottom: '1px solid var(--border)' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Prix d'achat</span>
                                    <span style={{ fontWeight: '600' }}>{selectedIPhone.purchasePrice}$</span>
                                </div>
                                <div className="flex-between" style={{ padding: '15px 0', fontSize: '18px' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Prix de vente</span>
                                    <span style={{ fontWeight: '800', color: 'var(--success)' }}>{selectedIPhone.sellingPrice}$</span>
                                </div>
                                {selectedIPhone.defects.length > 0 && (
                                    <div style={{ marginTop: '15px', padding: '10px', backgroundColor: 'rgba(255,69,58,0.1)', borderRadius: '8px', border: '1px solid var(--danger)' }}>
                                        <p style={{ color: 'var(--danger)', fontSize: '13px', fontWeight: '600' }}>
                                            ⚠️ Défauts signalés : {selectedIPhone.defects.join(', ')}
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
    <div className="glass-card" style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ padding: '8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>{icon}</div>
        <div>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{label}</p>
            <p style={{ fontSize: '16px', fontWeight: '700' }}>{value}</p>
        </div>
    </div>
);

export default Stock;
