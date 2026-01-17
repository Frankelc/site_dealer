import React, { useState } from 'react';
import { MOCK_IPHONES } from '../data/mockData';
import { Search, ChevronRight, Star, Image as ImageIcon } from 'lucide-react';

const Catalog = ({ onSelectProduct }) => {
    const [filter, setFilter] = useState('Tous');
    const availableStock = MOCK_IPHONES.filter(i => i.status === 'Disponible');

    const models = ['Tous', ...new Set(availableStock.map(i => i.model.split(' ')[0] + ' ' + (i.model.split(' ')[1] || '')))];

    return (
        <div className="catalog-container" style={{ padding: '0px 0 100px 0' }}>
            {/* Hero Section */}
            <section className="hero" style={{
                height: '400px',
                borderRadius: '30px',
                background: 'linear-gradient(135deg, #050505 0%, #1c1c1e 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '60px',
                marginBottom: '60px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
                    <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.1' }}>
                        Trouvez l'iPhone de vos rêves.
                    </h1>
                    <p style={{ fontSize: '18px', opacity: 0.8, marginBottom: '30px' }}>
                        Des appareils certifiés, testés et garantis. Découvrez notre sélection premium.
                    </p>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button className="btn-primary" style={{ padding: '15px 30px' }}>Voir tout le stock</button>
                    </div>
                </div>
                <div style={{ position: 'absolute', right: '-50px', top: '50%', transform: 'translateY(-50%)', opacity: 0.05, fontSize: '200px', fontWeight: '900', userSelect: 'none' }}>
                    IPHONE
                </div>
            </section>

            {/* Filters */}
            <div className="flex-between" style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                    {models.map(m => (
                        <button
                            key={m}
                            onClick={() => setFilter(m)}
                            style={{
                                padding: '10px 25px',
                                borderRadius: '25px',
                                border: 'none',
                                backgroundColor: filter === m ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                color: 'white',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'var(--transition)'
                            }}
                        >
                            {m}
                        </button>
                    ))}
                </div>
                <div className="glass-card" style={{ padding: '10px 20px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Search size={18} opacity={0.5} />
                    <input type="text" placeholder="Rechercher..." style={{ border: 'none', background: 'none', color: 'white', outline: 'none' }} />
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid-3">
                {availableStock.filter(i => filter === 'Tous' || i.model.includes(filter)).map(iphone => (
                    <div
                        key={iphone.id}
                        className="glass-card product-card"
                        onClick={() => onSelectProduct(iphone)}
                        style={{
                            padding: '0',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'var(--transition)',
                            position: 'relative'
                        }}
                    >
                        <div style={{
                            height: '300px',
                            background: '#0a0a0a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}>
                            {iphone.images && iphone.images.length > 0 ? (
                                <img
                                    src={iphone.images[0]}
                                    alt={iphone.model}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                    className="product-image"
                                />
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-secondary)' }}>
                                    <ImageIcon size={48} style={{ marginBottom: '10px', opacity: 0.5 }} />
                                    <span>Pas d'image</span>
                                </div>
                            )}

                            <div style={{
                                position: 'absolute',
                                top: '15px',
                                left: '15px',
                                background: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(10px)',
                                padding: '5px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: '600'
                            }}>
                                {iphone.capacity}
                            </div>
                        </div>

                        <div style={{ padding: '25px' }}>
                            <div className="flex-between" style={{ marginBottom: '5px' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: '700' }}>{iphone.model}</h3>
                                <span style={{ fontWeight: '800', fontSize: '18px', color: 'var(--primary)' }}>{iphone.sellingPrice}$</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '15px' }}>{iphone.color}</p>

                            <div className="flex-between" style={{ marginBottom: '20px' }}>
                                <span className="status-badge status-available">{iphone.condition}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                    <span>Bat: {iphone.batteryLevel}%</span>
                                </div>
                            </div>

                            <button className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                Voir les détails <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Catalog;
