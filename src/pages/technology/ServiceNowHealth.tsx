import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Database, FileText, Layers, ShieldCheck } from 'lucide-react';

const ServiceNowHealth: React.FC = () => {
  const { t } = useTranslation(['common', 'technology']);

  const modules = [
    { name: 'ITSM (IT Service Management)', status: 'Healthy', syncStatus: 'Real-time', activeRecords: '1,248 active tickets', lastSync: '1 min ago', icon: <FileText size={18} /> },
    { name: 'ITOM (IT Operations Management)', status: 'Healthy', syncStatus: 'Real-time', activeRecords: '42 operational alerts', lastSync: '30 sec ago', icon: <Layers size={18} /> },
    { name: 'ITAM (IT Asset Management)', status: 'Healthy', syncStatus: '5 min sync', activeRecords: '4,300+ tracked assets', lastSync: '3 min ago', icon: <Database size={18} /> },
    { name: 'CMDB & Discovery', status: 'Healthy', syncStatus: 'Daily discovery', activeRecords: '4,300+ CIs · 97.8% coverage', lastSync: '04:00 AM', icon: <ShieldCheck size={18} /> },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">ServiceNow Platform Health</h1>
            <p className="page-subtitle">Primary System of Record for ITSM, ITOM, ITAM, CMDB & Discovery</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="simulated-badge">{t('app.simulatedHealth')}</span>
            <span className="simulated-badge">{t('app.referenceEstateScale')}</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        {[
          { label: 'System of Record', value: 'ServiceNow PRD', trend: 'healthy', text: 'Online & Syncing' },
          { label: 'Support Staff Users', value: '1,347', trend: 'healthy', text: 'Licensed Users' },
          { label: 'Active Business Users', value: '15,000+', trend: 'healthy', text: 'Self-Service Portal' },
          { label: 'CMDB CI Coverage', value: '97.8%', trend: 'healthy', text: '4,300+ Discovered CIs' },
        ].map((kpi, idx) => (
          <div key={idx} className="kpi-card" style={{ cursor: 'default' }}>
            <div className="kpi-card-accent" style={{ background: '#074A76' }} />
            <div className="kpi-card-label">{kpi.label}</div>
            <div className="kpi-card-value">{kpi.value}</div>
            <div className="kpi-card-trend up">
              <CheckCircle2 size={12} /> {kpi.text}
            </div>
          </div>
        ))}
      </div>

      {/* Module Health Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        {modules.map((mod) => (
          <div key={mod.name} className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--ncgr-deep-sky)' }}>{mod.icon}</span>
                {mod.name}
              </div>
              <span className="health-badge healthy">
                <span className="badge-dot" /> HEALTHY
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
              Active Records: <strong style={{ color: 'var(--text)' }}>{mod.activeRecords}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'var(--text-tertiary)', borderTop: '1px solid var(--border)', paddingTop: 8 }}>
              <span>Sync: {mod.syncStatus}</span>
              <span>Last refresh: {mod.lastSync}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CMDB & Discovery Health Summary */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">CMDB & Discovery Health Summary</h2>
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Source: ServiceNow Discovery</span>
        </div>
        <div className="grid-4" style={{ marginBottom: 16 }}>
          <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)' }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Discovered CIs</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>4,300+</div>
          </div>
          <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)' }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Stale CIs (&gt;30 days)</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--status-at-risk)' }}>84</div>
          </div>
          <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)' }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Unmapped Relationships</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--status-at-risk)' }}>31</div>
          </div>
          <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)' }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Discovery Schedules</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--status-healthy)' }}>12 Active</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceNowHealth;
