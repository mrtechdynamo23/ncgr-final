import React, { useState } from 'react';
import { appProblemsList, type AppProblemRecord } from '../../data/master-applications';
import { ApplicationDetailModal } from '../../components/common/ApplicationDetailModal';
import { Search, ExternalLink } from 'lucide-react';

const ApplicationProblemsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProblem, setSelectedProblem] = useState<AppProblemRecord | null>(null);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const filteredProblems = appProblemsList.filter(p =>
    p.problemNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.appName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Application Problems & Root Cause Analysis (RCA)</h1>
            <p className="page-subtitle">Known Error Database (KEDB), Recurrent Issue Elimination & Corrective Action (CAPA) Tracking</p>
          </div>
          <span className="simulated-badge">Source: ServiceNow — DEMO DATA</span>
        </div>
      </div>

      {/* KPI Overview (Module 5 Spec) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Active Application Problems</div>
          <div className="kpi-card-value">9</div>
          <div className="kpi-card-trend neutral">Across Core Portals</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">RCA In Progress</div>
          <div className="kpi-card-value" style={{ color: '#E97F0A' }}>3</div>
          <div className="kpi-card-trend down">PRB000181 & PRB000165</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">RCA Completed (KEDB)</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>6</div>
          <div className="kpi-card-trend up">Root Cause Verified</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#671E75' }} />
          <div className="kpi-card-label">Corrective Actions Open</div>
          <div className="kpi-card-value" style={{ color: '#671E75' }}>11</div>
          <div className="kpi-card-trend neutral">2 Overdue Actions</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#DE350B' }} />
          <div className="kpi-card-label">Recurring Problems</div>
          <div className="kpi-card-value" style={{ color: '#DE350B' }}>2</div>
          <div className="kpi-card-trend down">Connection Pools & Timeout</div>
        </div>
      </div>

      {/* Problems Table (Module 5 Spec) */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Application Problem Records & RCA Tracking</h2>
          <div className="header-search" style={{ width: 280 }}>
            <Search size={16} className="header-search-icon" />
            <input
              type="text"
              placeholder="Search problem # or app name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Problem #</th>
                <th>Application</th>
                <th style={{ minWidth: 200 }}>Problem Statement</th>
                <th>Related Incidents</th>
                <th style={{ minWidth: 220 }}>Root Cause</th>
                <th>RCA Status</th>
                <th>Corrective Action</th>
                <th>Owner</th>
                <th>Target Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.map((prb) => (
                <tr key={prb.problemNumber} onClick={() => setSelectedProblem(prb)} style={{ cursor: 'pointer' }}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-purple)', fontWeight: 700 }}>
                    {prb.problemNumber}
                  </td>
                  <td style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--ncgr-deep-blue)' }}>
                    {prb.appName}
                  </td>
                  <td style={{ fontSize: '0.8125rem' }}>{prb.issue}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)', fontFamily: 'var(--font-mono)' }}>
                    {prb.relatedIncidents}
                  </td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{prb.rootCause}</td>
                  <td>
                    <span className={`health-badge ${prb.rcaStatus === 'RCA Completed' ? 'healthy' : 'at-risk'}`}>
                      {prb.rcaStatus}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--ncgr-mint-green)', fontWeight: 600 }}>{prb.correctiveAction}</td>
                  <td style={{ fontSize: '0.75rem' }}>{prb.owner}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{prb.targetClosure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Problem Modal (Module 5 Spec) */}
      {selectedProblem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 'var(--border-radius-xl)', padding: 24, maxWidth: 650, width: '100%', color: 'var(--text)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--ncgr-purple)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{selectedProblem.problemNumber}</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{selectedProblem.appName}: {selectedProblem.issue}</h3>
              </div>
              <button onClick={() => setSelectedProblem(null)} style={{ cursor: 'pointer', fontWeight: 700, background: 'none', border: 'none', color: 'var(--text-secondary)' }}>✕</button>
            </div>
            <div style={{ fontSize: '0.8125rem', lineHeight: 1.6, marginBottom: 16 }}>
              <p style={{ marginBottom: 8 }}><strong>Related Incidents:</strong> <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ncgr-deep-sky)' }}>{selectedProblem.relatedIncidents}</span></p>
              <p style={{ marginBottom: 8, padding: 10, background: 'var(--bg-secondary)', borderRadius: 6 }}><strong>Root Cause:</strong> {selectedProblem.rootCause}</p>
              <p style={{ marginBottom: 8 }}><strong>Corrective Action (CAPA):</strong> {selectedProblem.correctiveAction}</p>
              <p style={{ marginBottom: 8 }}><strong>Preventive Action:</strong> {selectedProblem.preventiveAction}</p>
              <p><strong>Owner:</strong> {selectedProblem.owner} · <strong>Target Closure:</strong> {selectedProblem.targetClosure}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
              <a href={selectedProblem.servicenowRef} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                View Problem in ServiceNow <ExternalLink size={12} />
              </a>
              <button className="btn btn-secondary" onClick={() => setSelectedProblem(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <ApplicationDetailModal appId={selectedAppId} onClose={() => setSelectedAppId(null)} />
    </div>
  );
};

export default ApplicationProblemsPage;
