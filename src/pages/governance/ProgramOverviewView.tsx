import React from 'react';
import { useTranslation } from 'react-i18next';

interface MilestoneRecord {
  id: string;
  name: string;
  plannedDate: string;
  actualDate: string;
  progress: number;
  status: 'Completed' | 'In Progress' | 'At Risk';
  owner: string;
}

const milestonesList: MilestoneRecord[] = [
  { id: 'M-01', name: 'Service Transition Complete & Operational Baseline', plannedDate: '2026-01-15', actualDate: '2026-01-15', progress: 100, status: 'Completed', owner: 'Faisal Al-Harbi' },
  { id: 'M-02', name: 'SolarWinds & Splunk ITSI Monitoring Integration', plannedDate: '2026-02-28', actualDate: '2026-02-28', progress: 100, status: 'Completed', owner: 'Khalid Al-Shammari' },
  { id: 'M-03', name: 'ServiceNow CMDB Automated Data Quality Improvement', plannedDate: '2026-03-31', actualDate: '2026-04-10', progress: 100, status: 'Completed', owner: 'Arjun Menon' },
  { id: 'M-04', name: 'GCP & Azure Cloud Cost Optimization Wave 1', plannedDate: '2026-04-30', actualDate: '2026-04-30', progress: 100, status: 'Completed', owner: 'Vivek Srinivasan' },
  { id: 'M-05', name: 'Band 1 Automation Wave 1 (Daily Health Checks & Reporting)', plannedDate: '2026-05-31', actualDate: '2026-05-31', progress: 100, status: 'Completed', owner: 'Arjun Menon' },
  { id: 'M-06', name: 'Band 1 Automation Wave 2 (Password Reset Bot & Ticket Assist)', plannedDate: '2026-06-30', actualDate: '2026-06-30', progress: 100, status: 'Completed', owner: 'Arjun Menon' },
  { id: 'M-07', name: 'NCGR Assistant AI Pilot Integration', plannedDate: '2026-07-31', actualDate: '2026-07-31', progress: 100, status: 'Completed', owner: 'Sara Al-Otaibi' },
  { id: 'M-08', name: 'Annual DR Failover & Replication Validation', plannedDate: '2026-08-15', actualDate: 'Pending', progress: 75, status: 'In Progress', owner: 'Omar Al-Mutairi' },
  { id: 'M-09', name: 'Band 2 ServiceNow Cross-Tower Integration Workflow', plannedDate: '2026-08-31', actualDate: 'Pending', progress: 60, status: 'In Progress', owner: 'Arjun Menon' },
  { id: 'M-10', name: 'Knowledge Repository Consolidation (KEDB 100% Audit)', plannedDate: '2026-09-15', actualDate: 'Pending', progress: 40, status: 'In Progress', owner: 'Aisha Rahman' },
  { id: 'M-11', name: 'Workforce Resource Mobilization (100% Target)', plannedDate: '2026-09-30', actualDate: 'Pending', progress: 91, status: 'In Progress', owner: 'Noura Al-Qahtani' },
  { id: 'M-12', name: 'Q3 Operational Governance Readiness Audit', plannedDate: '2026-10-15', actualDate: 'Pending', progress: 20, status: 'At Risk', owner: 'Huda Al-Salem' },
];

const ProgramOverviewView: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Program Management & Roadmap</h1>
            <p className="page-subtitle">NCGR ITMS Managed Operations Program Status, 18 Milestones & Cross-Tower Dependencies</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* Program Summary Cards (Section 11) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Program Health</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>GREEN</div>
          <div className="kpi-card-trend up">On Schedule & On Budget</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Program Milestones</div>
          <div className="kpi-card-value">18</div>
          <div className="kpi-card-trend neutral">13 Complete · 4 Active · 1 At Risk</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#4AA6DC' }} />
          <div className="kpi-card-label">Open Program Actions</div>
          <div className="kpi-card-value">17</div>
          <div className="kpi-card-trend neutral">Tracked in Action Log</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">Open Program Risks</div>
          <div className="kpi-card-value" style={{ color: '#E97F0A' }}>8</div>
          <div className="kpi-card-trend neutral">2 High · 6 Medium</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#671E75' }} />
          <div className="kpi-card-label">Tower Dependencies</div>
          <div className="kpi-card-value">6</div>
          <div className="kpi-card-trend neutral">Active Mitigation</div>
        </div>
      </div>

      {/* Milestones Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Program Milestones Roadmap (12 Key Milestones)</h2>
        </div>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Milestone ID</th>
                <th style={{ minWidth: 260 }}>Milestone Name</th>
                <th>Planned Target Date</th>
                <th>Actual Completion</th>
                <th>Progress %</th>
                <th>Lead Owner</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {milestonesList.map((m) => (
                <tr key={m.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{m.id}</td>
                  <td style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{m.name}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{m.plannedDate}</td>
                  <td style={{ fontSize: '0.75rem', color: m.actualDate === 'Pending' ? 'var(--text-tertiary)' : 'var(--status-healthy)' }}>{m.actualDate}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{m.progress}%</span>
                      <div style={{ flex: 1, height: 6, background: 'var(--bg-tertiary)', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${m.progress}%`, height: '100%', background: m.status === 'Completed' ? '#40904F' : m.status === 'In Progress' ? '#4AA6DC' : '#DE350B' }} />
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.75rem' }}>{m.owner}</td>
                  <td>
                    <span className={`health-badge ${m.status === 'Completed' ? 'healthy' : m.status === 'In Progress' ? 'info' : 'critical'}`}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProgramOverviewView;
