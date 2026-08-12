import React, { useState } from 'react';
import { appIncidentsList } from '../../data/master-applications';
import { ApplicationDetailModal } from '../../components/common/ApplicationDetailModal';
import { Search, ExternalLink } from 'lucide-react';

const ApplicationIncidentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const filteredIncidents = appIncidentsList.filter(inc =>
    inc.incidentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.appName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.assignedEngineer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Application Operations Incidents (ServiceNow Integration)</h1>
            <p className="page-subtitle">ServiceNow Incident Telemetry, P1/P2 Active Major Incidents & Business Impact</p>
          </div>
          <span className="simulated-badge">Source: ServiceNow — DEMO DATA</span>
        </div>
      </div>

      {/* KPI Overview (Module 4 Spec) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Open App Incidents</div>
          <div className="kpi-card-value">17</div>
          <div className="kpi-card-trend neutral">Across 48 Applications</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#DE350B' }} />
          <div className="kpi-card-label">P1 Major Incidents</div>
          <div className="kpi-card-value" style={{ color: '#DE350B' }}>1</div>
          <div className="kpi-card-trend down">INC0012847 (Procurement)</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">P2 High Priority</div>
          <div className="kpi-card-value" style={{ color: '#E97F0A' }}>4</div>
          <div className="kpi-card-trend down">Integration & Finance APIs</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#4AA6DC' }} />
          <div className="kpi-card-label">P3 / P4 Medium & Low</div>
          <div className="kpi-card-value">8 / 4</div>
          <div className="kpi-card-trend neutral">Assigned to Support L2</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#671E75' }} />
          <div className="kpi-card-label">Aging &gt; 7 Days</div>
          <div className="kpi-card-value">3</div>
          <div className="kpi-card-trend neutral">2 Repeated Incidents</div>
        </div>
      </div>

      {/* Incidents Table (Module 4 Spec) */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Application Incident Management Records</h2>
          <div className="header-search" style={{ width: 280 }}>
            <Search size={16} className="header-search-icon" />
            <input
              type="text"
              placeholder="Search incident # or app name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Incident #</th>
                <th>Target Application</th>
                <th>Priority</th>
                <th style={{ minWidth: 200 }}>Issue Description</th>
                <th>Current Status</th>
                <th>Assignment Group</th>
                <th>Assigned Engineer</th>
                <th>Opened Date / Age</th>
                <th>ServiceNow Link</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.map((inc) => (
                <tr key={inc.incidentNumber}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-purple)', fontWeight: 700 }}>
                    {inc.incidentNumber}
                  </td>
                  <td style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--ncgr-deep-blue)', cursor: 'pointer' }} onClick={() => setSelectedAppId(inc.appId)}>
                    {inc.appName}
                  </td>
                  <td>
                    <span className={`health-badge ${inc.priority === 'P1' ? 'critical' : inc.priority === 'P2' ? 'at-risk' : 'healthy'}`}>
                      {inc.priority}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8125rem' }}>
                    {inc.description}
                    <br />
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Impact: {inc.businessImpact}</span>
                  </td>
                  <td>
                    <span className={`health-badge ${inc.currentStatus === 'Resolved' ? 'healthy' : inc.currentStatus === 'Major Incident' ? 'critical' : 'info'}`}>
                      {inc.currentStatus}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem' }}>{inc.assignmentGroup}</td>
                  <td style={{ fontSize: '0.75rem' }}>{inc.assignedEngineer}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                    {inc.openedDate}<br />
                    <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{inc.age}</span>
                  </td>
                  <td>
                    <a
                      href={inc.servicenowRef}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      View in ServiceNow <ExternalLink size={12} />
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

export default ApplicationIncidentsPage;
