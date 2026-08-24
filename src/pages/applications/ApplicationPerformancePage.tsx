import React, { useState } from 'react';
import { masterApplications } from '../../data/master-applications';
import { ApplicationDetailModal } from '../../components/common/ApplicationDetailModal';
import { Search } from 'lucide-react';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { APPLICATION_SERVICES_SIBLINGS } from './ApplicationServicesLandingPage';

const ApplicationPerformancePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const filteredApps = masterApplications.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.businessService.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Sub-Page Header with Breadcrumb and Sibling Navigation */}
      <SubPageHeader
        moduleTitle="Application Services"
        modulePath="/applications"
        pageTitle="Application Performance"
        siblingPages={APPLICATION_SERVICES_SIBLINGS}
      />

      {/* KPI Overview (Module 8 Spec) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Average Response Time</div>
          <div className="kpi-card-value">1.42 sec</div>
          <div className="kpi-card-trend neutral">Portfolio Target &lt; 2.00 sec</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Apps Within Threshold</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>43</div>
          <div className="kpi-card-trend up">89.6% Compliance</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">Performance Alerts Active</div>
          <div className="kpi-card-value" style={{ color: '#E97F0A' }}>5</div>
          <div className="kpi-card-trend down">Procurement & EIH Gateway</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#1FBBB0' }} />
          <div className="kpi-card-label">Overall Error Rate</div>
          <div className="kpi-card-value" style={{ color: '#1FBBB0' }}>0.18%</div>
          <div className="kpi-card-trend up">Target &lt; 0.50%</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#671E75' }} />
          <div className="kpi-card-label">Peak CPU / Memory</div>
          <div className="kpi-card-value">74%</div>
          <div className="kpi-card-trend neutral">Performance Trend: Stable</div>
        </div>
      </div>

      {/* Performance Telemetry Charts Widget (Module 8 Spec) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 12 }}>Applications Breaching Response Threshold</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {masterApplications.filter(a => a.responseTimeSec > a.thresholdSec).map(a => (
              <div key={a.id} onClick={() => setSelectedAppId(a.id)} style={{ padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.8125rem' }}>{a.name} ({a.id})</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>
                    Current Latency: <strong style={{ color: '#DE350B' }}>{a.responseTimeSec} sec</strong> · Target Limit: {a.thresholdSec} sec
                  </div>
                </div>
                <span className="health-badge at-risk">DEGRADED</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 12 }}>24-Hour APM Telemetry Trends</h3>
          <div style={{ fontSize: '0.8125rem', lineHeight: 1.8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
              <span>Peak Hourly Transaction Volume:</span>
              <strong>48,200 ops/hr (09:00 AM)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
              <span>Highest Error Rate Application:</span>
              <strong style={{ color: '#E97F0A' }}>Procurement Management (0.61%)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
              <span>Fastest Average Response:</span>
              <strong style={{ color: '#40904F' }}>Identity Services (0.9 sec)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
              <span>APM Auto-Heal Actions Triggered:</span>
              <strong>4 Pod Restarts Completed</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Performance Table (Module 8 Spec) */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Application Performance Telemetry Register</h2>
          <div className="header-search" style={{ width: 280 }}>
            <Search size={16} className="header-search-icon" />
            <input
              type="text"
              placeholder="Search app or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Application Name</th>
                <th>Avg Response Time</th>
                <th>SLA Threshold</th>
                <th>Error Rate</th>
                <th>Hourly Transactions</th>
                <th>Performance Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.slice(0, 15).map((a) => (
                <tr key={a.id} onClick={() => setSelectedAppId(a.id)} style={{ cursor: 'pointer' }}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{a.id}</td>
                  <td style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--ncgr-deep-blue)' }}>{a.name}</td>
                  <td style={{ fontSize: '0.75rem', fontWeight: 700, color: a.responseTimeSec > a.thresholdSec ? 'var(--status-critical)' : 'var(--status-healthy)' }}>
                    {a.responseTimeSec} sec
                  </td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{a.thresholdSec} sec</td>
                  <td style={{ fontSize: '0.75rem', fontWeight: 600, color: a.errorRatePct > 0.4 ? 'var(--status-at-risk)' : 'inherit' }}>
                    {a.errorRatePct}%
                  </td>
                  <td style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>{a.transactionsPerHr} ops/hr</td>
                  <td>
                    <span className={`health-badge ${a.performanceState === 'Normal' ? 'healthy' : 'at-risk'}`}>
                      {a.performanceState}
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

export default ApplicationPerformancePage;
