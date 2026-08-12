import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appDependenciesList } from '../../data/master-applications';
import { ApplicationDetailModal } from '../../components/common/ApplicationDetailModal';
import { Search, ArrowRight } from 'lucide-react';

const ApplicationDependenciesPage: React.FC = () => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const filteredDependencies = appDependenciesList.filter(d =>
    d.appName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.dependencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.dependencyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Application Dependency Mapping</h1>
            <p className="page-subtitle">Cross-Application API, Database, Authentication & Network Downstream Impact Graph</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* KPI Overview (Module 7 Spec) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Mapped Dependencies</div>
          <div className="kpi-card-value">128</div>
          <div className="kpi-card-trend neutral">Across 48 Applications</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Healthy Dependencies</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>121</div>
          <div className="kpi-card-trend up">94.5% Normal</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">Degraded Dependencies</div>
          <div className="kpi-card-value" style={{ color: '#E97F0A' }}>5</div>
          <div className="kpi-card-trend down">EIH REST API & Vendor SLA Sync</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#DE350B' }} />
          <div className="kpi-card-label">Critical Alerts</div>
          <div className="kpi-card-value" style={{ color: '#DE350B' }}>2</div>
          <div className="kpi-card-trend down">Procurement Gateway Latency</div>
        </div>
      </div>

      {/* Visual Graph Widget (Module 7 Spec) */}
      <div className="card" style={{ marginBottom: 24, padding: 20 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12 }}>Sample Application Dependency Hierarchy</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { from: 'Employee Services Portal', to: 'Identity & Access Management', type: 'Authentication', health: 'Healthy' },
            { from: 'Identity & Access Management', to: 'Enterprise Integration Hub', type: 'API Gateway', health: 'Degraded' },
            { from: 'Enterprise Integration Hub', to: 'Database Platform (PostgreSQL/Oracle)', type: 'Database', health: 'Healthy' },
            { from: 'Database Platform (PostgreSQL/Oracle)', to: 'Infrastructure / Cloud (GCP/Azure)', type: 'Hosting Node', health: 'Healthy' },
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', background: 'var(--bg-secondary)', borderRadius: 6, fontSize: '0.8125rem' }}>
              <span style={{ fontWeight: 700, width: 220, color: 'var(--ncgr-deep-blue)' }}>{item.from}</span>
              <ArrowRight size={16} style={{ color: 'var(--text-tertiary)' }} />
              <span style={{ fontWeight: 600, width: 240 }}>{item.to}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>({item.type})</span>
              <div style={{ marginLeft: 'auto' }}>
                <span className={`health-badge ${item.health === 'Healthy' ? 'healthy' : 'at-risk'}`}>{item.health}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Dependencies Table (Module 7 Spec) */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Application Dependency Mapping Table</h2>
          <div className="header-search" style={{ width: 280 }}>
            <Search size={16} className="header-search-icon" />
            <input
              type="text"
              placeholder="Search app or dependency..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Map ID</th>
                <th>Source Application</th>
                <th>Dependency Component</th>
                <th>Dependency Type</th>
                <th>Owner / Lead</th>
                <th>Business Impact Level</th>
                <th>Current Health</th>
                <th>Last Validated</th>
              </tr>
            </thead>
            <tbody>
              {filteredDependencies.map((dep) => (
                <tr key={dep.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{dep.id}</td>
                  <td style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--ncgr-deep-blue)', cursor: 'pointer' }} onClick={() => setSelectedAppId(dep.appName)}>
                    {dep.appName}
                  </td>
                  <td style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{dep.dependencyName}</td>
                  <td>
                    <span className="health-badge info" style={{ fontSize: '0.625rem' }}>{dep.dependencyType}</span>
                  </td>
                  <td style={{ fontSize: '0.75rem' }}>{dep.owner}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{dep.businessImpact}</td>
                  <td>
                    <span className={`health-badge ${dep.health === 'Healthy' ? 'healthy' : 'at-risk'}`}>
                      {dep.health}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{dep.lastValidated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ApplicationDetailModal appId={selectedAppId} onClose={() => setSelectedAppId(null)} />
    </div>
  );
};

export default ApplicationDependenciesPage;
