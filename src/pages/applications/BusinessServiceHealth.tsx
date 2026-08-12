import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { businessServices, type BusinessService } from '../../data/services';
import { ArrowRight } from 'lucide-react';

const BusinessServiceHealth: React.FC = () => {
  const { t } = useTranslation(['common', 'technology']);
  const [selectedService, setSelectedService] = useState<BusinessService>(businessServices[0]);

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Business Service Health</h1>
            <p className="page-subtitle">End-to-end service relationship chain from business service down to underlying technology & vendor</p>
          </div>
          <span className="simulated-badge">{t('app.simulatedHealth')}</span>
        </div>
      </div>

      {/* Service Selector Tabs */}
      <div className="tabs">
        {businessServices.map((svc) => (
          <button
            key={svc.id}
            className={`tab ${selectedService.id === svc.id ? 'active' : ''}`}
            onClick={() => setSelectedService(svc)}
          >
            {svc.name}
          </button>
        ))}
      </div>

      {/* Active Service Relationship Chain (Section 16) */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <div>
            <h2 className="card-title" style={{ fontSize: '1.125rem' }}>{selectedService.name}</h2>
            <p className="card-subtitle">{selectedService.category} · Owner: {selectedService.owner}</p>
          </div>
          <span className={`health-badge ${selectedService.health === 'healthy' ? 'healthy' : selectedService.health === 'degraded' ? 'degraded' : 'at-risk'}`}>
            <span className="badge-dot" /> {selectedService.health.toUpperCase()}
          </span>
        </div>

        {/* Relationship Chain Diagram */}
        <div style={{ background: 'var(--bg-secondary)', padding: 20, borderRadius: 'var(--border-radius-lg)', marginTop: 12 }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>
            Service Relationship Chain (Click any layer to inspect)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { level: 'Business Service', title: selectedService.name, detail: `Criticality: ${selectedService.criticality}`, color: 'var(--ncgr-deep-blue)' },
              { level: 'Application Layer', title: selectedService.applications.join(' & '), detail: `2 active workloads`, color: 'var(--ncgr-deep-sky)' },
              { level: 'Database Layer', title: selectedService.database, detail: `High-availability cluster`, color: 'var(--ncgr-purple)' },
              { level: 'Infrastructure Layer', title: selectedService.infrastructure, detail: `Virtual compute & containers`, color: 'var(--ncgr-mint-green)' },
              { level: 'Network & Security', title: selectedService.network, detail: `Firewalls & SD-WAN`, color: 'var(--ncgr-tiffany-blue)' },
              { level: 'Monitoring & Observability', title: selectedService.monitoring.join(' + '), detail: `Telemetry & log ingest`, color: 'var(--ncgr-orange)' },
              { level: 'ITSM System of Record', title: selectedService.itsm, detail: `Incident & change tracking`, color: '#074A76' },
              { level: 'Vendor / Partner', title: selectedService.vendor, detail: `SIAM managed contract`, color: 'var(--text-secondary)' },
            ].map((chain, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 140, fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-tertiary)',
                  textTransform: 'uppercase', textAlign: 'right', flexShrink: 0
                }}>
                  {chain.level}
                </div>
                <ArrowRight size={14} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
                <div style={{
                  flex: 1, padding: '10px 16px', background: 'var(--card-bg)', border: '1px solid var(--border)',
                  borderLeft: `4px solid ${chain.color}`, borderRadius: 'var(--border-radius-md)', display: 'flex',
                  alignItems: 'center', justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text)' }}>{chain.title}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>{chain.detail}</div>
                  </div>
                  <span className="health-badge healthy" style={{ fontSize: '0.625rem' }}>HEALTHY</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Metrics */}
        <div className="grid-3" style={{ marginTop: 20 }}>
          <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)' }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Open Incidents</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: selectedService.openIncidents > 0 ? 'var(--status-critical)' : 'var(--text)' }}>
              {selectedService.openIncidents}
            </div>
          </div>
          <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)' }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Active Changes</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)' }}>
              {selectedService.openChanges}
            </div>
          </div>
          <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)' }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Open Risks</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: selectedService.openRisks > 0 ? 'var(--status-at-risk)' : 'var(--text)' }}>
              {selectedService.openRisks}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessServiceHealth;
