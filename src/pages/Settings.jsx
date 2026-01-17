import React from 'react';
import { Settings as SettingsIcon, Bell, Lock, User, Palette, Globe } from 'lucide-react';

const Settings = () => {
    const settingsSections = [
        { icon: User, label: 'Profil Admin', desc: 'Gérer votre compte et vos accès' },
        { icon: Bell, label: 'Notifications', desc: 'Préférences d\'alertes et emails' },
        { icon: Lock, label: 'Sécurité', desc: 'Mot de passe et 2FA' },
        { icon: Palette, label: 'Apparence', desc: 'Thèmes et affichage' },
        { icon: Globe, label: 'Langue & Région', desc: 'Français (FR) • USD ($)' },
    ];

    return (
        <div className="page-content">
            <header className="page-header">
                <div>
                    <h1>Paramètres</h1>
                    <p className="text-secondary">Configuration générale de l'application</p>
                </div>
            </header>

            <div className="glass-card" style={{ padding: '40px' }}>
                <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                    {settingsSections.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="glass-card" style={{
                                padding: '25px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                                border: '1px solid var(--glass-border)',
                                cursor: 'pointer',
                                transition: 'var(--transition)'
                            }}>
                                <div className="flex-center" style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: 'var(--bg-hover)' }}>
                                    <Icon size={24} color="var(--primary)" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px' }}>{item.label}</h3>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex-center flex-column" style={{ marginTop: '60px', opacity: 0.5 }}>
                    <SettingsIcon size={40} style={{ marginBottom: '20px' }} />
                    <p>Version 1.0.0 • DealerPro Inc.</p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
