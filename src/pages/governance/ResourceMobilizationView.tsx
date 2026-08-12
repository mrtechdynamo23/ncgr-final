import React from 'react';
import { useTranslation } from 'react-i18next';

interface MobilizationRecord {
  id: string;
  role: string;
  tower: string;
  required: number;
  mobilized: number;
  gap: number;
  status: 'Healthy' | 'Attention Required';
  targetDate: string;
  recruitmentStatus: string;
}

const mobilizationList: MobilizationRecord[] = [
  { id: 'MOB-01', role: 'Service Desk Lead & Engineers', tower: 'Service Desk', required: 28, mobilized: 28, gap: 0, status: 'Healthy', targetDate: 'Completed', recruitmentStatus: '100% Mobilized' },
  { id: 'MOB-02', role: 'NOC Engineers & Shift Leads', tower: 'NOC', required: 20, mobilized: 20, gap: 0, status: 'Healthy', targetDate: 'Completed', recruitmentStatus: '100% Mobilized' },
  { id: 'MOB-03', role: 'Infrastructure Systems Engineers', tower: 'Infrastructure', required: 27, mobilized: 25, gap: 2, status: 'Attention Required', targetDate: '2026-08-31', recruitmentStatus: '2 Offer Letters Issued' },
  { id: 'MOB-04', role: 'Network Operations Engineers', tower: 'Network', required: 18, mobilized: 16, gap: 2, status: 'Attention Required', targetDate: '2026-08-31', recruitmentStatus: 'Interviews Ongoing' },
  { id: 'MOB-05', role: 'Database Administrators (Oracle/Postgres)', tower: 'Database', required: 12, mobilized: 11, gap: 1, status: 'Attention Required', targetDate: '2026-09-15', recruitmentStatus: '1 Candidate Shortlisted' },
  { id: 'MOB-06', role: 'Cloud Platform Specialists (GCP/Azure)', tower: 'Cloud', required: 14, mobilized: 12, gap: 2, status: 'Attention Required', targetDate: '2026-09-15', recruitmentStatus: 'Security Clearance Pending' },
  { id: 'MOB-07', role: 'Application Support Engineers (SAP/WebLogic)', tower: 'Application Support', required: 24, mobilized: 23, gap: 1, status: 'Healthy', targetDate: '2026-08-25', recruitmentStatus: 'Offer Accepted' },
  { id: 'MOB-08', role: 'Security Operations Engineers', tower: 'Security', required: 9, mobilized: 9, gap: 0, status: 'Healthy', targetDate: 'Completed', recruitmentStatus: '100% Mobilized' },
  { id: 'MOB-09', role: 'Digital Workplace Specialists', tower: 'Digital Workplace', required: 10, mobilized: 10, gap: 0, status: 'Healthy', targetDate: 'Completed', recruitmentStatus: '100% Mobilized' },
  { id: 'MOB-10', role: 'Automation & AI Engineers', tower: 'Automation & AI', required: 6, mobilized: 5, gap: 1, status: 'Attention Required', targetDate: '2026-09-30', recruitmentStatus: 'Role Advertised' },
  { id: 'MOB-11', role: 'Service Management Leads (ITIL/CAB)', tower: 'Service Management', required: 8, mobilized: 8, gap: 0, status: 'Healthy', targetDate: 'Completed', recruitmentStatus: '100% Mobilized' },
  { id: 'MOB-12', role: 'Program Management & PMO', tower: 'Program Management', required: 6, mobilized: 6, gap: 0, status: 'Healthy', targetDate: 'Completed', recruitmentStatus: '100% Mobilized' },
];

const ResourceMobilizationView: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Resource Mobilization & Capacity Planning</h1>
            <p className="page-subtitle">162 Planned Resources, Tower Distribution, Recruitment Pipelines & Demand vs Capacity</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* Summary KPI Cards (Section 12) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Planned Staff Target</div>
          <div className="kpi-card-value">162</div>
          <div className="kpi-card-trend neutral">Full Contract Target</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Mobilized On-Site</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>148</div>
          <div className="kpi-card-trend up">91.4% Mobilization Complete</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">Pending Mobilization</div>
          <div className="kpi-card-value" style={{ color: '#E97F0A' }}>9</div>
          <div className="kpi-card-trend neutral">Onboarding In Progress</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#DE350B' }} />
          <div className="kpi-card-label">Open Positions</div>
          <div className="kpi-card-value" style={{ color: '#DE350B' }}>5</div>
          <div className="kpi-card-trend down">Recruitment Sourcing</div>
        </div>
      </div>

      {/* Mobilization Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Tower-Level Resource Mobilization Progress (162 Total Positions)</h2>
        </div>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Mob ID</th>
                <th>Role Category</th>
                <th>Tower</th>
                <th>Required</th>
                <th>Mobilized</th>
                <th>Gap</th>
                <th>Completion %</th>
                <th>Target Completion</th>
                <th>Recruitment Status</th>
                <th>Tower Status</th>
              </tr>
            </thead>
            <tbody>
              {mobilizationList.map((m) => {
                const pct = Math.round((m.mobilized / m.required) * 100);
                return (
                  <tr key={m.id}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{m.id}</td>
                    <td style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{m.role}</td>
                    <td><span className="health-badge healthy" style={{ fontSize: '0.625rem' }}>{m.tower}</span></td>
                    <td style={{ fontSize: '0.75rem', fontWeight: 600 }}>{m.required}</td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--status-healthy)', fontWeight: 600 }}>{m.mobilized}</td>
                    <td style={{ fontSize: '0.75rem', color: m.gap > 0 ? 'var(--status-at-risk)' : 'inherit', fontWeight: 600 }}>{m.gap}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{pct}%</span>
                        <div style={{ flex: 1, height: 6, background: 'var(--bg-tertiary)', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: pct === 100 ? '#40904F' : '#4AA6DC' }} />
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{m.targetDate}</td>
                    <td style={{ fontSize: '0.75rem' }}>{m.recruitmentStatus}</td>
                    <td>
                      <span className={`health-badge ${m.status === 'Healthy' ? 'healthy' : 'at-risk'}`}>
                        {m.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResourceMobilizationView;
