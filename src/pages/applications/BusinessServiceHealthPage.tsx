import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { masterBusinessServices, type BusinessServiceRecord } from '../../data/master-applications';
import { ApplicationDetailModal } from '../../components/common/ApplicationDetailModal';
import { ArrowRight, Search } from 'lucide-react';

const BusinessServiceHealthPage: React.FC = () => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<BusinessServiceRecord | null>(null);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const filteredServices = masterBusinessServices.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Business Service Health & Impact Chain</h1>
            <p className="page-subtitle">End-to-End Business Capability Status, Multi-App Dependency Trees & Downstream Impact</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* KPI Overview (Module 2 Spec) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Business Services</div>
          <div className="kpi-card-value">18</div>
          <div className="kpi-card-trend neutral">Core Government Capabilities</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Healthy Services</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>14</div>
          <div className="kpi-card-trend up">Normal Operating Parameters</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">Degraded Services</div>
          <div className="kpi-card-value" style={{ color: '#E97F0A' }}>3</div>
          <div className="kpi-card-trend down">Procurement, Integration, Vendor</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#DE350B' }} />
          <div className="kpi-card-label">Critical Services</div>
          <div className="kpi-card-value" style={{ color: '#DE350B' }}>1</div>
          <div className="kpi-card-trend down">Requires Management Focus</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#1FBBB0' }} />
          <div className="kpi-card-label">Overall Service Availability</div>
          <div className="kpi-card-value" style={{ color: '#1FBBB0' }}>99.84%</div>
          <div className="kpi-card-trend up">4 Services with Active Impact</div>
        </div>
      </div>

      {/* Dependency Visualization Example Widget (Module 2 Spec) */}
      <div className="card" style={{ marginBottom: 24, padding: 20 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12 }}>Sample End-to-End Business Service Dependency Chain</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, overflowX: 'auto', padding: '12px 0' }}>
          {[
            { name: 'Procurement Services', type: 'Business Service', health: 'Degraded' },
            { name: 'Procurement Management', type: 'Application', health: 'Degraded' },
            { name: 'Enterprise Integration Hub', type: 'Middleware ESB', health: 'Degraded' },
            { name: 'Database Platform (Oracle RAC)', type: 'Database Node', health: 'Healthy' },
            { name: 'STC SD-WAN Network', type: 'Network Infrastructure', health: 'Healthy' },
            { name: 'Identity Services (Entra ID)', type: 'Authentication', health: 'Healthy' },
          ].map((step, idx, arr) => (
            <React.Fragment key={step.name}>
              <div style={{ padding: '10px 14px', background: 'var(--bg-secondary)', border: `2px solid ${step.health === 'Degraded' ? '#E97F0A' : '#40904F'}`, borderRadius: 8, minWidth: 160, textAlign: 'center' }}>
                <span className={`health-badge ${step.health === 'Degraded' ? 'at-risk' : 'healthy'}`} style={{ fontSize: '0.625rem' }}>{step.health}</span>
                <div style={{ fontWeight: 700, fontSize: '0.8125rem', marginTop: 4, color: 'var(--text)' }}>{step.name}</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>{step.type}</div>
              </div>
              {idx < arr.length - 1 && <ArrowRight size={18} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Business Services Table */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Business Services Inventory (18 Services)</h2>
          <div className="header-search" style={{ width: 280 }}>
            <Search size={16} className="header-search-icon" />
            <input
              type="text"
              placeholder="Search business service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Service ID</th>
                <th>Business Service Name</th>
                <th>Criticality</th>
                <th>Supporting Apps</th>
                <th>30-Day Availability</th>
                <th>Owner Directorate</th>
                <th>Current Operational State</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((bs) => (
                <tr key={bs.id} onClick={() => setSelectedService(bs)} style={{ cursor: 'pointer' }}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{bs.id}</td>
                  <td style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--ncgr-deep-blue)' }}>{bs.name}</td>
                  <td>
                    <span className={`health-badge ${bs.criticality === 'Critical' ? 'critical' : bs.criticality === 'High' ? 'at-risk' : 'healthy'}`}>
                      {bs.criticality}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem', fontWeight: 600 }}>{bs.supportingAppsCount} Applications</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--status-healthy)', fontWeight: 600 }}>{bs.availability}</td>
                  <td style={{ fontSize: '0.75rem' }}>{bs.owner}</td>
                  <td>
                    <span className={`health-badge ${bs.currentState === 'Healthy' ? 'healthy' : 'at-risk'}`}>
                      {bs.currentState}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Business Service Dependency Modal */}
      {selectedService && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 'var(--border-radius-xl)', padding: 24, maxWidth: 650, width: '100%', color: 'var(--text)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)', fontFamily: 'var(--font-mono)' }}>{selectedService.id}</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{selectedService.name}</h3>
              </div>
              <button onClick={() => setSelectedService(null)} style={{ cursor: 'pointer', fontWeight: 700, background: 'none', border: 'none', color: 'var(--text-secondary)' }}>✕</button>
            </div>
            <div style={{ fontSize: '0.8125rem', lineHeight: 1.6, marginBottom: 16 }}>
              <p style={{ marginBottom: 8 }}><strong>Description:</strong> {selectedService.description}</p>
              <p style={{ marginBottom: 8 }}><strong>Directorate Owner:</strong> {selectedService.owner}</p>
              <p style={{ marginBottom: 8, color: selectedService.currentState === 'Degraded' ? 'var(--status-at-risk)' : 'var(--status-healthy)' }}>
                <strong>Downstream Impact:</strong> {selectedService.downstreamImpact}
              </p>
              <div style={{ marginTop: 12, padding: 12, background: 'var(--bg-secondary)', borderRadius: 6 }}>
                <strong>Supporting Technology Chain:</strong>
                <ul style={{ marginTop: 6, paddingLeft: 18 }}>
                  {selectedService.dependencyChain.map(item => (
                    <li key={item} style={{ cursor: 'pointer', color: 'var(--ncgr-deep-sky)' }} onClick={() => { setSelectedService(null); setSelectedAppId(item); }}>
                      {item} (Click for app dossier)
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedService(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <ApplicationDetailModal appId={selectedAppId} onClose={() => setSelectedAppId(null)} />
    </div>
  );
};

export default BusinessServiceHealthPage;
