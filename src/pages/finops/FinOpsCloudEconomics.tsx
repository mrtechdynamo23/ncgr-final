import React from 'react';
import { useTranslation } from 'react-i18next';
import { finopsData } from '../../data/finops';
import { TrendingDown } from 'lucide-react';

const FinOpsCloudEconomics: React.FC = () => {
  const { t } = useTranslation(['common', 'finops']);

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">FinOps & Cloud Economics</h1>
            <p className="page-subtitle">Public Cloud Spend Management & Optimization across Google Cloud Platform & Microsoft Azure</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* Spend KPIs */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Monthly Cloud Spend</div>
          <div className="kpi-card-value">{finopsData.monthlySpend}</div>
          <div className="kpi-card-trend up">
            <TrendingDown size={12} /> {finopsData.variancePercentage}% {finopsData.varianceStatus}
          </div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#4AA6DC' }} />
          <div className="kpi-card-label">GCP Spend (1,120 workloads)</div>
          <div className="kpi-card-value">{finopsData.gcpSpend}</div>
          <div className="kpi-card-trend neutral">70% of cloud total</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#671E75' }} />
          <div className="kpi-card-label">Azure Spend (286 workloads)</div>
          <div className="kpi-card-value">{finopsData.azureSpend}</div>
          <div className="kpi-card-trend neutral">30% of cloud total</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Optimization Opportunity</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>{finopsData.optimizationOpportunity}</div>
          <div className="kpi-card-trend up">3 Active Recommendations</div>
        </div>
      </div>

      {/* Top Cost Drivers & Recommendations */}
      <div className="grid-2" style={{ marginBottom: 24, alignItems: 'flex-start' }}>
        {/* Top Cost Drivers */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Top Cloud Cost Drivers</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {finopsData.topCostDrivers.map((driver) => (
              <div key={driver.category} style={{ padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 600, marginBottom: 4 }}>
                  <span>{driver.category}</span>
                  <span style={{ color: 'var(--ncgr-deep-sky)' }}>{driver.spend}</span>
                </div>
                <div style={{ width: '100%', height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${driver.percentage}%`, height: '100%', background: 'var(--ncgr-deep-blue)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Optimization Recommendations */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Active Cost Optimization Recommendations</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {finopsData.recommendations.map((rec) => (
              <div key={rec.id} style={{ padding: '12px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--border-radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span className="health-badge healthy" style={{ fontSize: '0.625rem' }}>{rec.provider}</span>
                  <span style={{ fontWeight: 700, color: 'var(--status-healthy)', fontSize: '0.8125rem' }}>{rec.estimatedSavings}</span>
                </div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text)', marginBottom: 6 }}>{rec.action}</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Status: {rec.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinOpsCloudEconomics;
