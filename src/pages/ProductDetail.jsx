import React from 'react';
import { Smartphone, Battery, ShieldCheck, ArrowLeft, MessageCircle, Share2, Info } from 'lucide-react';

const ProductDetail = ({ product, onBack }) => {
    if (!product) return null;

    const handleWhatsApp = () => {
        const text = encodeURIComponent(`Bonjour ! Je suis intéressé par l'${product.model} (${product.capacity}) au prix de ${product.sellingPrice}$. Puis-je avoir plus d'infos ? IMEI: ${product.imei}`);
        window.open(`https://wa.me/+221770000000?text=${text}`, '_blank');
    };

    return (
        <div className="product-detail-page">
            <button
                onClick={onBack}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    marginBottom: '30px',
                    padding: '10px'
                }}
            >
                <ArrowLeft size={20} /> Retour au catalogue
            </button>

            <div className="grid-3" style={{ gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
                {/* Left: Image View */}
                <div style={{ position: 'sticky', top: '20px' }}>
                    <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '10px' }}>{product.model}</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>{product.capacity} • {product.color} • {product.condition}</p>

                    <div className="glass-card" style={{ padding: '0', overflow: 'hidden', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
                        {product.images && product.images.length > 0 ? (
                            <img
                                src={product.images[0]}
                                alt={product.model}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        ) : (
                            <div className="flex-center flex-column">
                                <Info size={40} style={{ opacity: 0.3, marginBottom: '20px' }} />
                                <span style={{ color: 'var(--text-secondary)' }}>Aucune image disponible</span>
                            </div>
                        )}
                    </div>

                    <div className="glass-card" style={{ marginTop: '20px', padding: '20px', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                        <Info color="var(--primary)" size={24} style={{ flexShrink: 0 }} />
                        <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            Photos réelles de l'appareil. Cliquez pour agrandir en HD.
                        </p>
                    </div>
                </div>

                {/* Right: Info & CTA */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div className="glass-card" style={{ padding: '30px' }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '25px' }}>Caractéristiques Clés</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="flex-between">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Battery color="var(--success)" />
                                    <span>Santé Batterie</span>
                                </div>
                                <span style={{ fontWeight: '700' }}>{product.batteryLevel}%</span>
                            </div>
                            <div className="flex-between">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Smartphone color="var(--primary)" />
                                    <span>Face ID / Touch ID</span>
                                </div>
                                <span style={{ fontWeight: '700' }}>{product.faceId === 'OK' ? 'Fonctionnel' : 'Non fonctionnel'}</span>
                            </div>
                            <div className="flex-between">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <ShieldCheck color="var(--primary)" />
                                    <span>État Général</span>
                                </div>
                                <span style={{ fontWeight: '700' }}>{product.condition}</span>
                            </div>
                        </div>

                        <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid var(--border)' }}>
                            <div className="flex-between" style={{ marginBottom: '20px' }}>
                                <span style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Prix Cash</span>
                                <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--success)' }}>{product.sellingPrice}$</span>
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '30px' }}>
                                Possibilité de paiement par tranches (Crédit DealerPro disponible en boutique).
                            </p>

                            <button
                                onClick={handleWhatsApp}
                                className="btn-primary"
                                style={{
                                    width: '100%',
                                    padding: '18px',
                                    fontSize: '18px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '12px',
                                    backgroundColor: '#25D366' // WhatsApp Green
                                }}
                            >
                                <MessageCircle size={22} /> Acheter sur WhatsApp
                            </button>

                            <button style={{ width: '100%', marginTop: '15px', background: 'none', border: '1px solid var(--border)', padding: '15px', borderRadius: '12px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                <Share2 size={18} /> Partager l'annonce
                            </button>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '25px' }}>
                        <h4 style={{ marginBottom: '15px' }}>Notre Garantie</h4>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                            Tous nos iPhones sont testés sur 30 points de contrôle. Garantie de 6 mois incluse sur les pièces et la main d'œuvre.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
