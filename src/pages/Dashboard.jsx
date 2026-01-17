import React from 'react';
import { Smartphone, TrendingUp, CreditCard, Activity } from 'lucide-react';
import { MOCK_STATS } from '../data/mockData';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Dashboard = () => {
    const chartData = {
        labels: MOCK_STATS.recentSales.map(s => s.date),
        datasets: [
            {
                label: 'Ventes ($)',
                data: MOCK_STATS.recentSales.map(s => s.amount),
                fill: true,
                borderColor: '#2997ff',
                backgroundColor: 'rgba(41, 151, 255, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#000',
                pointBorderColor: '#2997ff',
                pointBorderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(5, 5, 5, 0.9)',
                titleColor: '#fff',
                bodyColor: '#aaa',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                padding: 10,
                displayColors: false,
            }
        },
        scales: {
            y: { display: false },
            x: {
                grid: { display: false },
                ticks: { color: '#666', font: { size: 11 } }
            }
        }
    };

    return (
        <div className="dashboard-content">
            <header className="flex-between" style={{ marginBottom: '40px' }}>
                <div>
                    <h1>Tableau de bord</h1>
                    <p className="text-secondary">Aperçu de votre activité en temps réel</p>
                </div>
                <div className="glass-card" style={{ padding: '8px 16px', borderRadius: '30px' }}>
                    <div className="flex-center gap-10">
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)', boxShadow: '0 0 10px var(--success)' }}></div>
                        <span style={{ fontSize: '13px', fontWeight: '600' }}>Système Opérationnel</span>
                    </div>
                </div>
            </header>

            <div className="grid-3" style={{ marginBottom: '30px' }}>
                <StatCard
                    icon={<Smartphone color="var(--primary)" size={24} />}
                    label="Stock iPhone"
                    value={MOCK_STATS.totalStock}
                    trend="+5 nouveautés"
                    trendColor="var(--success)"
                />
                <StatCard
                    icon={<TrendingUp color="var(--success)" size={24} />}
                    label="Chiffre d'affaires"
                    value={`${MOCK_STATS.totalSalesMonth} FCFA`}
                    trend="+12% vs N-1"
                    trendColor="var(--success)"
                />
                <StatCard
                    icon={<CreditCard color="var(--warning)" size={24} />}
                    label="Crédits en cours"
                    value={`${MOCK_STATS.pendingCredits} FCFA`}
                    trend="2 échéances proches"
                    trendColor="var(--warning)"
                />
            </div>

            <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
                <div className="glass-card flex-column">
                    <div className="flex-between" style={{ marginBottom: '20px' }}>
                        <h3>Performance des Ventes</h3>
                        <Activity size={18} color="var(--text-secondary)" />
                    </div>
                    <div style={{ height: '300px', width: '100%' }}>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>

                <div className="glass-card flex-column">
                    <h3 style={{ marginBottom: '20px' }}>Alertes & Notifications</h3>
                    <div className="alerts-list flex-column gap-15">
                        <AlertItem
                            type="danger"
                            title="Retard de Paiement"
                            desc="Moussa Diop - iPhone 11 (J+3)"
                        />
                        <AlertItem
                            type="warning"
                            title="Stock Faible"
                            desc="iPhone 13 Pro - Reste 1 unité"
                        />
                        <AlertItem
                            type="primary"
                            title="Nouvelle Commande"
                            desc="Fatou Kane souhaite un iPhone 15"
                        />
                        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                            <button className="btn-primary" style={{ width: '100%', fontSize: '13px', padding: '10px' }}>
                                Voir toutes les alertes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, trend, trendColor }) => (
    <div className="glass-card group" style={{ cursor: 'pointer' }}>
        <div className="flex-between" style={{ marginBottom: '15px' }}>
            <div style={{ padding: '12px', backgroundColor: 'var(--bg-hover)', borderRadius: '14px' }}>
                {icon}
            </div>
            <span style={{ fontSize: '13px', color: trendColor, fontWeight: '600', padding: '4px 10px', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.03)' }}>
                {trend}
            </span>
        </div>
        <div>
            <h2 style={{ fontSize: '32px', marginBottom: '5px' }}>{value}</h2>
            <p className="text-secondary" style={{ fontSize: '14px' }}>{label}</p>
        </div>
    </div>
);

const AlertItem = ({ type, title, desc }) => {
    const colors = {
        danger: 'var(--danger)',
        warning: 'var(--warning)',
        primary: 'var(--primary)'
    };

    return (
        <div className="flex-center" style={{ justifyContent: 'flex-start', padding: '12px', borderRadius: '12px', backgroundColor: 'var(--bg-hover)', border: '1px solid rgba(255,255,255,0.02)' }}>
            <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: colors[type],
                marginRight: '15px',
                boxShadow: `0 0 8px ${colors[type]}`
            }}></div>
            <div>
                <h4 style={{ fontSize: '14px', marginBottom: '2px' }}>{title}</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{desc}</p>
            </div>
        </div>
    );
};

export default Dashboard;
