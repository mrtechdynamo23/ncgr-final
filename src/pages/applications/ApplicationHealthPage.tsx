import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { masterApplications } from '../../data/master-applications';
import { ApplicationDetailModal } from '../../components/common/ApplicationDetailModal';
import { Search } from 'lucide-react';

const ApplicationHealthPage: React.FC = () => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [healthFilter, setHealthFilter] = useState('all');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const filteredApps = masterApplications.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.businessService.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHealth = healthFilter === 'all' || a.health.toLowerCase() === healthFilter.toLowerCase();
    return matchesSearch && matchesHealth;
  });

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Application Technical & Operational Health</h1>
            <p className="page-subtitle">Real-Time Technical Health, 30-Day Availability Telemetry & Active Incident Impact</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* KPI Overview (Module 1 Spec) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Total Applications</div>
          <div className="kpi-card-value">48</div>
          <div className="kpi-card-trend neutral">Monitored Portfolio</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Healthy (GREEN)</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>39</div>
          <div className="kpi-card-trend up">Normal Operating Parameters</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">Degraded (AMBER)</div>
          <div className="kpi-card-value" style={{ color: '#E97F0A' }}>6</div>
          <div className="kpi-card-trend down">Performance / Gateway Alerts</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#DE350B' }} />
          <div className="kpi-card-label">Critical (RED)</div>
          <div className="kpi-card-value" style={{ color: '#DE350B' }}>3</div>
          <div className="kpi-card-trend down">Requires Active Workaround</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#1FBBB0' }} />
          <div className="kpi-card-label">Overall Availability</div>
          <div className="kpi-card-value" style={{ color: '#1FBBB0' }}>99.82%</div>
          <div className="kpi-card-trend up">Target 99.50%</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#671E75' }} />
          <div className="kpi-card-label">Active P1/P2 Incidents</div>
          <div className="kpi-card-value" style={{ color: '#671E75' }}>2</div>
          <div className="kpi-card-trend neutral">5 Perf Alerts Active</div>
        </div>
      </div>

      {/* Visualizations Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 12 }}>Applications Requiring Attention (Degraded / Critical)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {masterApplications.filter(a => a.health !== 'Healthy').slice(0, 4).map(a => (
              <div
                key={a.id}
                onClick={() => setSelectedAppId(a.id)}
                style={{ padding: '10px 12px', background: 'var(--bg-secondary)', borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{a.name} ({a.id})</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>Service: {a.businessService} · Response: {a.responseTimeSec}s</div>
                </div>
                <span className={`health-badge ${a.health === 'Critical' ? 'critical' : 'at-risk'}`}>{a.health}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 12 }}>30-Day Availability & Performance Trend</h3>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
              <span>Critical Applications SLA Met:</span>
              <strong style={{ color: 'var(--status-healthy)' }}>100%</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
              <span>Avg APM Latency Across 48 Apps:</span>
              <strong>1.42 sec</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
              <span>Total Transactions Monitored:</span>
              <strong>48,200 ops/hr</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
              <span>APM Alert Threshold Breaches:</span>
              <strong style={{ color: '#E97F0A' }}>5 Applications</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Application Table */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Application Health Portfolio (Click any row for dossier)</h2>
          <div style={{ display: 'flex', gap: 12 }}>
            <div className="header-search" style={{ width: 260 }}>
              <Search size={16} className="header-search-icon" />
              <input
                type="text"
                placeholder="Search application or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={healthFilter}
              onChange={(e) => setHealthFilter(e.target.value)}
              style={{ width: 140, padding: '6px 10px', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)' }}
            >
              <option value="all">All Health</option>
              <option value="healthy">Healthy</option>
              <option value="degraded">Degraded</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Application Name</th>
                <th>Business Service</th>
                <th>Criticality</th>
                <th>Environment</th>
                <th>Availability</th>
                <th>Performance</th>
                <th>Active Incidents</th>
                <th>Health Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((a) => (
                <tr key={a.id} onClick={() => setSelectedAppId(a.id)} style={{ cursor: 'pointer' }}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{a.id}</td>
                  <td style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--ncgr-deep-blue)' }}>{a.name}</td>
                  <td style={{ fontSize: '0.8125rem' }}>{a.businessService}</td>
                  <td>
                    <span className={`health-badge ${a.criticality === 'Critical' ? 'critical' : a.criticality === 'High' ? 'at-risk' : 'healthy'}`}>
                      {a.criticality}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem' }}>{a.environment}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--status-healthy)', fontWeight: 600 }}>{a.availability}</td>
                  <td>
                    <span className={`health-badge ${a.performanceState === 'Normal' ? 'healthy' : 'at-risk'}`}>
                      {a.performanceState}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem', fontWeight: 600, color: a.activeIncidentsCount > 0 ? 'var(--status-critical)' : 'inherit' }}>
                    {a.activeIncidentsCount}
                  </td>
                  <td>
                    <span className={`health-badge ${a.health === 'Healthy' ? 'healthy' : a.health === 'Degraded' ? 'at-risk' : 'critical'}`}>
                      {a.health}
                    </span>
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

export default ApplicationHealthPage;
