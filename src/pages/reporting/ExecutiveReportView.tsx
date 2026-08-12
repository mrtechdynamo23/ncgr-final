import React from 'react';
import { useTranslation } from 'react-i18next';

const ExecutiveReportView: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Executive DFR & Operations Cockpit</h1>
            <p className="page-subtitle">Daily Executive Operations Dashboard & High-Level Domain Health Summary</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* Executive High-Level Domain Cards (Section 17) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {/* Program Health */}
        <div className="card" style={{ padding: 20, borderTop: '4px solid #40904F' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>PROGRAM HEALTH</span>
            <span className="health-badge healthy">GREEN</span>
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>NCGR ITMS Operations</div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>18 Milestones on track · 17 open actions · 0 P1 incidents</p>
        </div>

        {/* Technology Health */}
        <div className="card" style={{ padding: 20, borderTop: '4px solid #40904F' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>TECHNOLOGY HEALTH</span>
            <span className="health-badge healthy">GREEN</span>
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>Infrastructure & Network</div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>99.94% Compute availability · 99.97% Network uptime</p>
        </div>

        {/* Workforce Health */}
        <div className="card" style={{ padding: 20, borderTop: '4px solid #E97F0A' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>WORKFORCE HEALTH</span>
            <span className="health-badge at-risk">AMBER</span>
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>Mobilization & Capacity</div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>91.4% Mobilization · 5 open positions under recruitment</p>
        </div>

        {/* Risk & Compliance */}
        <div className="card" style={{ padding: 20, borderTop: '4px solid #E97F0A' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>RISK & COMPLIANCE</span>
            <span className="health-badge at-risk">AMBER</span>
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>Audit & Governance</div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>94.1% Compliance rate · 4 open non-conformities</p>
        </div>

        {/* FinOps Economics */}
        <div className="card" style={{ padding: 20, borderTop: '4px solid #40904F' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>FINOPS ECONOMICS</span>
            <span className="health-badge healthy">GREEN</span>
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>Cloud Spend Performance</div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>SAR 741,000 spend vs SAR 760,000 budget (-2.5%)</p>
        </div>

        {/* Transformation & AI */}
        <div className="card" style={{ padding: 20, borderTop: '4px solid #40904F' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>TRANSFORMATION & AI</span>
            <span className="health-badge healthy">GREEN</span>
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>Three-Band Accelerators</div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>24 Initiatives active · Band 1-3 progress tracking on target</p>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveReportView;
