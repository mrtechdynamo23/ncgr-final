import React from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Printer } from 'lucide-react';

const MSRReportView: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Monthly Service Report (ITMS MSR)</h1>
            <p className="page-subtitle">Period: August 2026 Executive Operational & Financial Assurance Summary</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button className="btn btn-secondary" onClick={() => window.print()}><Printer size={14} /> Print</button>
            <button className="btn btn-primary" onClick={() => alert("Downloading MSR PDF Report...")}><Download size={14} /> Export MSR PDF</button>
            <span className="simulated-badge">{t('app.demoData')}</span>
          </div>
        </div>
      </div>

      {/* Monthly Summary Sections (Section 17) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="card" style={{ padding: 16, borderLeft: '4px solid #40904F' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Infrastructure Availability</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#40904F', marginTop: 4 }}>99.94%</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginTop: 2 }}>286 Compute Nodes</div>
        </div>
        <div className="card" style={{ padding: 16, borderLeft: '4px solid #4AA6DC' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Service Desk SLA</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4AA6DC', marginTop: 4 }}>97.4%</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginTop: 2 }}>142 Requests Fulfilled</div>
        </div>
        <div className="card" style={{ padding: 16, borderLeft: '4px solid #671E75' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Vendor SLA Benchmark</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#671E75', marginTop: 4 }}>97.6%</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginTop: 2 }}>10 Managed Vendors</div>
        </div>
        <div className="card" style={{ padding: 16, borderLeft: '4px solid #1FBBB0' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>FinOps Cloud Budget</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1FBBB0', marginTop: 4 }}>SAR 741,000</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginTop: 2 }}>GCP + Azure Monthly</div>
        </div>
      </div>

      {/* Monthly Report Modules Grid */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">August 2026 Monthly Governance Sections</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: 12 }}>
          <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 6 }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: 4 }}>1. Executive Summary & Strategy</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>All 12 operational towers performed within baseline SLAs. Zero major P1 outages recorded.</p>
          </div>
          <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 6 }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: 4 }}>2. Incident & Problem Management</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>1 P1 incident resolved in 24m. 8 RCA reports published with 100% CAPA compliance.</p>
          </div>
          <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 6 }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: 4 }}>3. Cloud Economics & FinOps</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Monthly spend SAR 741,000 against SAR 760,000 budget. 10 optimization initiatives active.</p>
          </div>
          <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 6 }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: 4 }}>4. Digital Transformation & AI</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Band 1 automation completed 68% progress. Band 3 AI Assistant pilot active in Service Desk.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MSRReportView;
