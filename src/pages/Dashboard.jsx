import React from 'react';
import { Smartphone, TrendingUp, CreditCard, AlertCircle } from 'lucide-react';
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
                borderColor: '#0071e3',
                backgroundColor: 'rgba(0, 113, 227, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: { display: false },
            x: {
                grid: { display: false },
                ticks: { color: '#86868b' }
            }
        }
    };

    return (
        <div className="dashboard-content">
            <header className="flex-between" style={{ marginBottom: '30px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: '700' }}>Tableau de bord</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Bienvenue, Admin</p>
                </div>
                <div className="glass-card" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></div>
                    <span style={{ fontWeight: '500' }}>Système en ligne</span>
                </div>
            </header>

            <div className="grid-3" style={{ marginBottom: '30px' }}>
                <StatCard
                    icon={<Smartphone color="var(--primary)" />}
                    label="Stock total"
                    value={MOCK_STATS.totalStock}
                    trend="+2 aujourd'hui"
                />
                <StatCard
                    icon={<TrendingUp color="var(--success)" />}
                    label="Ventes (Mois)"
                    value={`${MOCK_STATS.totalSalesMonth}$`}
                    trend="+15% vs mois dernier"
                />
                <StatCard
                    icon={<CreditCard color="var(--warning)" />}
                    label="Crédits en cours"
                    value={`${MOCK_STATS.pendingCredits}$`}
                    trend="3 clients à relancer"
                />
            </div>

            <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
                <div className="glass-card" style={{ padding: '30px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Aperçu des performances</h3>
                    <div style={{ height: '300px' }}>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '30px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Alertes Prioritaires</h3>
                    <div className="alerts-list">
                        <AlertItem
                            type="danger"
                            title="Paiement en retard"
                            desc="Moussa Diop - iPhone 11"
                        />
                        <AlertItem
                            type="warning"
                            title="Garantie expirée"
                            desc="iPhone 13 - Serial #3599..."
                        />
                        <AlertItem
                            type="primary"
                            title="Nouveau stock"
                            desc="3x iPhone 15 Pro ajoutés"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, trend }) => (
    <div className="glass-card" style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ padding: '10px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>{icon}</div>
            <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>{label}</span>
        </div>
        <div className="flex-between">
            <h2 style={{ fontSize: '28px', fontWeight: '700' }}>{value}</h2>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{trend}</span>
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
        <div style={{
            display: 'flex',
            gap: '15px',
            padding: '15px 0',
            borderBottom: '1px solid var(--border)'
        }}>
            <div style={{
                width: '4px',
                height: '40px',
                backgroundColor: colors[type],
                borderRadius: '2px'
            }}></div>
            <div>
                <h4 style={{ fontSize: '14px', fontWeight: '600' }}>{title}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{desc}</p>
            </div>
        </div>
    );
};

export default Dashboard;
