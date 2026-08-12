import React, { useState } from 'react';
import { appChangesList } from '../../data/master-applications';
import { ApplicationDetailModal } from '../../components/common/ApplicationDetailModal';
import { Search, ExternalLink } from 'lucide-react';

const ApplicationChangesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const filteredChanges = appChangesList.filter(c =>
    c.changeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.appName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Application Changes & Release Schedule</h1>
            <p className="page-subtitle">Change Advisory Board (CAB) Approvals, Emergency Hotfixes & Release Deployment Calendar</p>
          </div>
          <span className="simulated-badge">Source: ServiceNow — DEMO DATA</span>
        </div>
      </div>

      {/* KPI Overview (Module 6 Spec) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Changes This Month</div>
          <div className="kpi-card-value">42</div>
          <div className="kpi-card-trend neutral">August 2026 Release Train</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Successful Deployments</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>40</div>
          <div className="kpi-card-trend up">Change Success Rate 95.2%</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#DE350B' }} />
          <div className="kpi-card-label">Failed / Emergency</div>
          <div className="kpi-card-value" style={{ color: '#DE350B' }}>1 / 1</div>
          <div className="kpi-card-trend down">CHG004263 (EIH Emergency Hotfix)</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#4AA6DC' }} />
          <div className="kpi-card-label">Upcoming Releases</div>
          <div className="kpi-card-value">7</div>
          <div className="kpi-card-trend neutral">Next Release: 16 Aug</div>
        </div>
      </div>

      {/* Release Calendar Table (Module 6 Spec) */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Application Change Schedule & Release Calendar</h2>
          <div className="header-search" style={{ width: 280 }}>
            <Search size={16} className="header-search-icon" />
            <input
              type="text"
              placeholder="Search change # or app name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Change #</th>
                <th>Target Application</th>
                <th>Change Type</th>
                <th style={{ minWidth: 220 }}>Description</th>
                <th>Release Version</th>
                <th>Scheduled Date</th>
                <th>Risk Level</th>
                <th>Approval Status</th>
                <th>Owner</th>
                <th>ServiceNow Link</th>
              </tr>
            </thead>
            <tbody>
              {filteredChanges.map((chg) => (
                <tr key={chg.changeNumber}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)', fontWeight: 700 }}>
                    {chg.changeNumber}
                  </td>
                  <td style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--ncgr-deep-blue)', cursor: 'pointer' }} onClick={() => setSelectedAppId(chg.appId)}>
                    {chg.appName}
                  </td>
                  <td>
                    <span className={`health-badge ${chg.changeType === 'Emergency' ? 'critical' : chg.changeType === 'Normal' ? 'at-risk' : 'healthy'}`}>
                      {chg.changeType}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8125rem' }}>{chg.description}</td>
                  <td style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{chg.releaseVersion}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{chg.scheduledDate}</td>
                  <td>
                    <span className={`health-badge ${chg.risk === 'High' ? 'critical' : chg.risk === 'Medium' ? 'at-risk' : 'healthy'}`}>
                      {chg.risk}
                    </span>
                  </td>
                  <td>
                    <span className={`health-badge ${chg.status === 'Completed' ? 'healthy' : chg.status === 'CAB Approved' ? 'info' : 'at-risk'}`}>
                      {chg.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem' }}>{chg.owner}</td>
                  <td>
                    <a
                      href={chg.servicenowRef}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      View Change <ExternalLink size={12} />
                    </a>
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

export default ApplicationChangesPage;
