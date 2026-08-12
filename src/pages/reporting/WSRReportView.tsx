import React from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Printer } from 'lucide-react';

const WSRReportView: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Weekly Status Report (ITMS WSR)</h1>
            <p className="page-subtitle">Period: 10–16 August 2026 · NCGR Managed ITMS Operations</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button className="btn btn-secondary" onClick={() => window.print()}><Printer size={14} /> Print</button>
            <button className="btn btn-primary" onClick={() => alert("Downloading WSR Executive PDF...")}><Download size={14} /> Export PDF</button>
            <span className="simulated-badge">{t('app.demoData')}</span>
          </div>
        </div>
      </div>

      {/* Health Overview Cards (Section 17) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Overall Program Health</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>GREEN</div>
          <div className="kpi-card-trend up">Stable Core Infrastructure</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Incidents (This Week)</div>
          <div className="kpi-card-value">0 P1 / 1 P2</div>
          <div className="kpi-card-trend neutral">P1 SLA 100% Met</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#4AA6DC' }} />
          <div className="kpi-card-label">Workforce & Attendance</div>
          <div className="kpi-card-value">91% / 94%</div>
          <div className="kpi-card-trend neutral">148 Active Resources</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#671E75' }} />
          <div className="kpi-card-label">Transformation Progress</div>
          <div className="kpi-card-value">68% Band 1</div>
          <div className="kpi-card-trend up">54% Band 2 · 31% Band 3</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">Monthly Cloud Spend</div>
          <div className="kpi-card-value">SAR 741,000</div>
          <div className="kpi-card-trend down">Forecast SAR 776,000 (+4.7%)</div>
        </div>
      </div>

      {/* Detailed Highlights Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Operational Highlights</h2>
          </div>
          <ul style={{ paddingLeft: 18, fontSize: '0.8125rem', lineHeight: 1.8, color: 'var(--text)' }}>
            <li>Stable core infrastructure across Riyadh Primary & DR data centers.</li>
            <li>Network availability maintained above target at 99.97%.</li>
            <li>Cloud optimization initiatives progressing (SAR 741,000 current spend).</li>
            <li>Monitoring coverage improved to 96.4% across 1,248 assets.</li>
            <li>Zero P1 outages recorded during the reporting week.</li>
          </ul>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Action Items & Open Risks</h2>
          </div>
          <ul style={{ paddingLeft: 18, fontSize: '0.8125rem', lineHeight: 1.8, color: 'var(--text)' }}>
            <li><strong>17 Open Actions</strong> (5 due this week, 2 overdue).</li>
            <li><strong>2 High Risks</strong> under active mitigation (Cloud spend variance & Network capacity growth).</li>
            <li><strong>6 Medium Risks</strong> monitored by Program Management Office.</li>
            <li>OpenShift cluster memory utilization monitoring rule deployed.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WSRReportView;
