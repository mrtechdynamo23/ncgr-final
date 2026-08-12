import React from 'react';
import { useTranslation } from 'react-i18next';

const ServiceDeskOverview: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Service Operations & Service Desk Overview</h1>
            <p className="page-subtitle">Unified Operations Cockpit, First-Call Resolution, CSAT Metrics & Queue Health</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* Service Desk KPI Cards (Section 6) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Calls / Tickets Today</div>
          <div className="kpi-card-value">184</div>
          <div className="kpi-card-trend neutral">Avg Speed Answer: 14 sec</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">First Contact Resolution</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>84.6%</div>
          <div className="kpi-card-trend up">Target &gt; 80.0%</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#1FBBB0' }} />
          <div className="kpi-card-label">Customer Satisfaction</div>
          <div className="kpi-card-value" style={{ color: '#1FBBB0' }}>4.8 / 5.0</div>
          <div className="kpi-card-trend up">Based on 312 CSAT Surveys</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#4AA6DC' }} />
          <div className="kpi-card-label">Service Desk Queue</div>
          <div className="kpi-card-value">6 Open</div>
          <div className="kpi-card-trend neutral">Lead: Aisha Rahman</div>
        </div>
      </div>

      {/* Operational Highlights */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Service Desk Operations & L1 Support Summary</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ padding: 16, background: 'var(--bg-secondary)', borderRadius: 6 }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: 6 }}>Queue Distribution</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>28 Service Desk agents assigned across 3 shifts (Morning, Evening, Night). 94% attendance rate maintained.</p>
          </div>
          <div style={{ padding: 16, background: 'var(--bg-secondary)', borderRadius: 6 }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: 6 }}>Automated Self-Service</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>320 password resets handled automatically via SafeNet 2FA bot in August with 0 agent escalation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDeskOverview;
