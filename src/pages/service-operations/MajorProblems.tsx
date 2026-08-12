import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

interface ProblemRecord {
  id: string;
  service: string;
  problemStatement: string;
  relatedIncidents: string;
  rootCause: string;
  owner: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Under Investigation' | 'RCA Complete' | 'Known Error' | 'Resolved';
  correctiveAction: string;
  targetClosure: string;
}

const problemsList: ProblemRecord[] = [
  { id: 'PRB-0801', service: 'NCGR Digital Services', problemStatement: 'Recurrent application connection pool exhaustion under load spikes', relatedIncidents: 'INC-26081, INC-25942', rootCause: 'WebLogic application connection leak on stale DB threads', owner: 'Sara Al-Otaibi', priority: 'High', status: 'RCA Complete', correctiveAction: 'Upgrade WebLogic datasource driver & auto-reconnect', targetClosure: '2026-08-20' },
  { id: 'PRB-0802', service: 'Enterprise Network', problemStatement: 'STC primary WAN link packet drop during business hours', relatedIncidents: 'INC-26082, INC-25890', rootCause: 'Carrier provider interface buffer misconfiguration', owner: 'Mohammed Al-Dosari', priority: 'Medium', status: 'Under Investigation', correctiveAction: 'STC NOC escalation & MTU optimization', targetClosure: '2026-08-22' },
  { id: 'PRB-0803', service: 'Database Platform', problemStatement: 'Oracle RAC secondary node replication lag on heavy write queries', relatedIncidents: 'INC-26083', rootCause: 'Redo log transport bandwidth bottleneck', owner: 'Omar Al-Mutairi', priority: 'High', status: 'Under Investigation', correctiveAction: 'Increase interconnect throughput to 40Gbps', targetClosure: '2026-08-25' },
  { id: 'PRB-0804', service: 'ServiceNow Platform', problemStatement: 'Delayed CMDB discovery sync for OpenShift container CIs', relatedIncidents: 'INC-25780', rootCause: 'REST API rate limiting on Kubernetes API server', owner: 'Arjun Menon', priority: 'Medium', status: 'Known Error', correctiveAction: 'Deploy batch pagination in ServiceNow discovery plugin', targetClosure: '2026-08-30' },
  { id: 'PRB-0805', service: 'Cloud Platforms', problemStatement: 'Intermittent GCP Cloud Storage latency for PDF export jobs', relatedIncidents: 'INC-25612', rootCause: 'Single-region bucket egress constraint', owner: 'Priya Nair', priority: 'Medium', status: 'RCA Complete', correctiveAction: 'Migrate bucket to Dual-Region europe-west3 / me-central1', targetClosure: '2026-08-18' },
  { id: 'PRB-0806', service: 'Security Platform', problemStatement: 'PAM token timeout enforcement mismatch across jump servers', relatedIncidents: 'INC-25501', rootCause: 'Inconsistent BeyondTrust agent config GPO push', owner: 'Daniel Mathew', priority: 'Medium', status: 'Resolved', correctiveAction: 'Centralized GPO refresh policy applied', targetClosure: '2026-08-10' },
  { id: 'PRB-0807', service: 'Digital Workplace', problemStatement: 'Teams audio quality degradation on VPN connections', relatedIncidents: 'INC-25430', rootCause: 'VPN tunnel hair-pinning for Microsoft 365 traffic', owner: 'Layla Hassan', priority: 'Low', status: 'Resolved', correctiveAction: 'Implemented Split-Tunneling for M365 endpoints', targetClosure: '2026-08-08' },
  { id: 'PRB-0808', service: 'Reporting Platform', problemStatement: 'PowerBI weekly status dataset refresh timeout', relatedIncidents: 'INC-25310', rootCause: 'Unindexed view on historical audit trail table', owner: 'Vivek Srinivasan', priority: 'Medium', status: 'Resolved', correctiveAction: 'Created non-clustered index on audit timestamp', targetClosure: '2026-08-05' },
];

const MajorProblems: React.FC = () => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProblems = problemsList.filter(p =>
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.problemStatement.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Major Problem Management</h1>
            <p className="page-subtitle">Root Cause Analysis (RCA), Known Error Database (KEDB) & Elimination of Recurrent Incidents</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* KPI Cards (Section 6) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Active Problem Records</div>
          <div className="kpi-card-value">8</div>
          <div className="kpi-card-trend neutral">Across Core Platforms</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#DE350B' }} />
          <div className="kpi-card-label">Under Active RCA</div>
          <div className="kpi-card-value" style={{ color: '#DE350B' }}>2</div>
          <div className="kpi-card-trend down">PRB-0802 & PRB-0803</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">Known Errors (KEDB)</div>
          <div className="kpi-card-value" style={{ color: '#E97F0A' }}>3</div>
          <div className="kpi-card-trend neutral">Workaround Active</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Resolved This Quarter</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>3</div>
          <div className="kpi-card-trend up">Recurrence Rate -40%</div>
        </div>
      </div>

      {/* Problems Table */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Problem Records (8 Records)</h2>
          <div className="header-search" style={{ width: 280 }}>
            <Search size={16} className="header-search-icon" />
            <input
              type="text"
              placeholder="Search problem records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Problem ID</th>
                <th>Service</th>
                <th style={{ minWidth: 220 }}>Problem Statement</th>
                <th>Related Incidents</th>
                <th style={{ minWidth: 200 }}>Root Cause</th>
                <th>Owner</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Target Closure</th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{p.id}</td>
                  <td style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{p.service}</td>
                  <td style={{ fontSize: '0.8125rem' }}>{p.problemStatement}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--ncgr-purple)', fontFamily: 'var(--font-mono)' }}>{p.relatedIncidents}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{p.rootCause}</td>
                  <td style={{ fontSize: '0.75rem' }}>{p.owner}</td>
                  <td>
                    <span className={`health-badge ${p.priority === 'High' ? 'critical' : p.priority === 'Medium' ? 'at-risk' : 'healthy'}`}>
                      {p.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`health-badge ${p.status === 'Resolved' ? 'healthy' : p.status === 'RCA Complete' ? 'info' : 'at-risk'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{p.targetClosure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MajorProblems;
