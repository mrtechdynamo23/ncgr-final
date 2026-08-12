import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { masterApplications } from '../../data/master-applications';
import { ApplicationDetailModal } from '../../components/common/ApplicationDetailModal';
import { Search } from 'lucide-react';

const ApplicationPortfolioPage: React.FC = () => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState('all');
  const [criticalityFilter, setCriticalityFilter] = useState('all');
  const [lifecycleFilter, setLifecycleFilter] = useState('all');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const filteredApps = masterApplications.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.technologyStack.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = domainFilter === 'all' || a.businessDomain.toLowerCase() === domainFilter.toLowerCase();
    const matchesCriticality = criticalityFilter === 'all' || a.criticality.toLowerCase() === criticalityFilter.toLowerCase();
    const matchesLifecycle = lifecycleFilter === 'all' || a.lifecycle.toLowerCase() === lifecycleFilter.toLowerCase();
    return matchesSearch && matchesDomain && matchesCriticality && matchesLifecycle;
  });

  const nonProdCount = masterApplications.filter(a => a.environment !== 'Production').length;

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Application Portfolio Inventory</h1>
            <p className="page-subtitle">Master Portfolio Register (48 Applications), Hosting Architecture, Tech Stack & Lifecycle Reviews</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* KPI Overview (Module 3 Spec) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Total Applications</div>
          <div className="kpi-card-value">48</div>
          <div className="kpi-card-trend neutral">Monitored Portfolio</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Production Environments</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>31</div>
          <div className="kpi-card-trend up">{nonProdCount} Non-Production</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#671E75' }} />
          <div className="kpi-card-label">Under Transformation</div>
          <div className="kpi-card-value" style={{ color: '#671E75' }}>8</div>
          <div className="kpi-card-trend neutral">Cloud Modernization</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#4AA6DC' }} />
          <div className="kpi-card-label">Vendor Supported</div>
          <div className="kpi-card-value">12</div>
          <div className="kpi-card-trend neutral">Active SLA Contracts</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">Due for Lifecycle Review</div>
          <div className="kpi-card-value" style={{ color: '#E97F0A' }}>7</div>
          <div className="kpi-card-trend down">Q3 2026 Audit Due</div>
        </div>
      </div>

      {/* Filter Toolbar (Module 3 Spec) */}
      <div className="card" style={{ marginBottom: 24, padding: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="header-search" style={{ flex: 1, minWidth: 260 }}>
            <Search size={16} className="header-search-icon" />
            <input
              type="text"
              placeholder="Search app name, ID, vendor, or tech stack..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            style={{ width: 170, padding: '8px 10px', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)', fontSize: '0.8125rem' }}
          >
            <option value="all">All Domains</option>
            <option value="corporate operations">Corporate Operations</option>
            <option value="financial services">Financial Services</option>
            <option value="procurement">Procurement</option>
            <option value="human resources">Human Resources</option>
            <option value="integration services">Integration Services</option>
            <option value="it operations">IT Operations</option>
          </select>

          <select
            value={criticalityFilter}
            onChange={(e) => setCriticalityFilter(e.target.value)}
            style={{ width: 140, padding: '8px 10px', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)', fontSize: '0.8125rem' }}
          >
            <option value="all">All Criticality</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
          </select>

          <select
            value={lifecycleFilter}
            onChange={(e) => setLifecycleFilter(e.target.value)}
            style={{ width: 180, padding: '8px 10px', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)', fontSize: '0.8125rem' }}
          >
            <option value="all">All Lifecycles</option>
            <option value="active">Active</option>
            <option value="under transformation">Under Transformation</option>
            <option value="due for review">Due for Review</option>
          </select>
        </div>
      </div>

      {/* Main Portfolio Table (Module 3 Spec) */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Master Application Register (Showing {filteredApps.length} of 48)</h2>
        </div>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Application Name</th>
                <th>Business Domain</th>
                <th>Criticality</th>
                <th>Technology Stack</th>
                <th>Vendor</th>
                <th>Hosting</th>
                <th>Lifecycle Status</th>
                <th>Next Review</th>
                <th>Health</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((a) => (
                <tr key={a.id} onClick={() => setSelectedAppId(a.id)} style={{ cursor: 'pointer' }}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{a.id}</td>
                  <td style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--ncgr-deep-blue)' }}>{a.name}</td>
                  <td style={{ fontSize: '0.75rem' }}>{a.businessDomain}</td>
                  <td>
                    <span className={`health-badge ${a.criticality === 'Critical' ? 'critical' : a.criticality === 'High' ? 'at-risk' : 'healthy'}`}>
                      {a.criticality}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem' }}>{a.technologyStack}</td>
                  <td style={{ fontSize: '0.75rem' }}>{a.vendor}</td>
                  <td style={{ fontSize: '0.75rem' }}>{a.hosting}</td>
                  <td>
                    <span className={`health-badge ${a.lifecycle === 'Active' ? 'healthy' : a.lifecycle === 'Under Transformation' ? 'info' : 'at-risk'}`}>
                      {a.lifecycle}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{a.nextReview}</td>
                  <td>
                    <span className={`health-badge ${a.health === 'Healthy' ? 'healthy' : 'at-risk'}`}>{a.health}</span>
                  </td>
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

export default ApplicationPortfolioPage;
