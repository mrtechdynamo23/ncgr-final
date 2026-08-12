import React from 'react';
import { useTranslation } from 'react-i18next';

interface AuditFinding {
  id: string;
  auditName: string;
  category: string;
  finding: string;
  severity: 'Critical' | 'Major' | 'Minor';
  owner: string;
  dueDate: string;
  status: 'Open' | 'In Remediation' | 'Closed';
  ctaRef: string;
}

const auditFindingsList: AuditFinding[] = [
  { id: 'AUD-2026-01', auditName: 'Internal Cybersecurity Compliance Audit Q2', category: 'Access Control', finding: '14 expired BeyondTrust PAM tokens not de-provisioned within 24h SLA', severity: 'Major', owner: 'Sara Al-Mutairi', dueDate: '2026-08-20', status: 'In Remediation', ctaRef: 'CTA-1048' },
  { id: 'AUD-2026-02', auditName: 'NCGR Government Data Protection Review', category: 'Database Security', finding: 'Imperva DAM sensor logging buffer overflow on secondary SAP DB node', severity: 'Minor', owner: 'Khalid Ibrahim', dueDate: '2026-08-25', status: 'Open', ctaRef: 'CTA-1049' },
  { id: 'AUD-2026-03', auditName: 'ServiceNow ITSM Process Maturity Audit', category: 'Process Compliance', finding: '3 P1 incident RCAs submitted past 5-day SLA timeline', severity: 'Major', owner: 'Major Incident Manager', dueDate: '2026-08-18', status: 'In Remediation', ctaRef: 'CTA-1050' },
  { id: 'AUD-2026-04', auditName: 'ISO 27001 Surveillance Audit 2026', category: 'Information Security', finding: 'Backup restoration test documentation incomplete for Oracle RAC DR cluster', severity: 'Critical', owner: 'DR Lead / DBA Team', dueDate: '2026-08-15', status: 'Open', ctaRef: 'CTA-1051' },
];

const AuditCompliance: React.FC = () => {
  const { t } = useTranslation(['common', 'governance']);

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Audit & Compliance Management</h1>
            <p className="page-subtitle">Government IT Compliance, Internal Audit Schedule, Non-Conformities & CTA Tracking</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Overall Compliance Rate</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>94.8%</div>
          <div className="kpi-card-trend up">ISO 27001 & Government Standards</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#DE350B' }} />
          <div className="kpi-card-label">Open Non-Conformities</div>
          <div className="kpi-card-value" style={{ color: '#DE350B' }}>4</div>
          <div className="kpi-card-trend down">1 Critical · 2 Major</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Active CTA Actions</div>
          <div className="kpi-card-value">12</div>
          <div className="kpi-card-trend neutral">Corrective & Preventive Actions</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#671E75' }} />
          <div className="kpi-card-label">Upcoming Audits</div>
          <div className="kpi-card-value">2</div>
          <div className="kpi-card-trend neutral">Scheduled in Q3 2026</div>
        </div>
      </div>

      {/* Audit Findings & CTA Tracking Table */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <h2 className="card-title">Audit Findings & Corrective Action Tracking (CTA)</h2>
        </div>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Finding ID</th>
                <th>Audit Name</th>
                <th>Category</th>
                <th style={{ minWidth: 260 }}>Finding Description</th>
                <th>Severity</th>
                <th>Owner</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {auditFindingsList.map((finding) => (
                <tr key={finding.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>
                    {finding.id}
                  </td>
                  <td style={{ fontSize: '0.75rem', fontWeight: 500 }}>{finding.auditName}</td>
                  <td>
                    <span className="health-badge healthy" style={{ fontSize: '0.625rem' }}>{finding.category}</span>
                  </td>
                  <td style={{ fontSize: '0.8125rem' }}>{finding.finding}</td>
                  <td>
                    <span className={`health-badge ${finding.severity === 'Critical' ? 'critical' : finding.severity === 'Major' ? 'at-risk' : 'attention'}`}>
                      {finding.severity}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem' }}>{finding.owner}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{finding.dueDate}</td>
                  <td>
                    <span className={`health-badge ${finding.status === 'Closed' ? 'healthy' : 'at-risk'}`}>
                      {finding.status}
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

export default AuditCompliance;
