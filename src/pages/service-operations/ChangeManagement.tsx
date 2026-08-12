import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

interface ChangeRecord {
  id: string;
  changeType: 'Standard' | 'Normal' | 'Emergency';
  service: string;
  description: string;
  risk: 'High' | 'Medium' | 'Low';
  implementationDate: string;
  owner: string;
  status: 'Approved' | 'In Progress' | 'Completed' | 'Pending CAB';
  approval: 'CAB Approved' | 'Emergency Board' | 'Pre-Approved';
  backoutPlan: string;
}

const changesList: ChangeRecord[] = [
  { id: 'CHG-1090', changeType: 'Emergency', service: 'NCGR Digital Services', description: 'Application connection pool configuration adjustment & restart', risk: 'High', implementationDate: '2026-08-12 02:00', owner: 'Sara Al-Otaibi', status: 'Completed', approval: 'Emergency Board', backoutPlan: 'Revert WebLogic pool config XML' },
  { id: 'CHG-1091', changeType: 'Normal', service: 'Oracle Database RAC', description: 'Apply CPU Security Patch Cluster-01', risk: 'High', implementationDate: '2026-08-15 01:00', owner: 'Omar Al-Mutairi', status: 'Approved', approval: 'CAB Approved', backoutPlan: 'Rollback to pre-patch LVM snapshot' },
  { id: 'CHG-1092', changeType: 'Normal', service: 'Enterprise Network', description: 'STC BGP Router Firmware Upgrade Riyadh-01', risk: 'Medium', implementationDate: '2026-08-16 02:00', owner: 'Mohammed Al-Dosari', status: 'Pending CAB', approval: 'CAB Approved', backoutPlan: 'Failover to Riyadh-02 standby node' },
  { id: 'CHG-1093', changeType: 'Standard', service: 'ServiceNow Platform', description: 'Deploy CMDB automated reconciliation workflow', risk: 'Low', implementationDate: '2026-08-13 06:00', owner: 'Arjun Menon', status: 'Approved', approval: 'Pre-Approved', backoutPlan: 'Deactivate workflow trigger in SN' },
  { id: 'CHG-1094', changeType: 'Normal', service: 'OpenShift Container Platform', description: 'Scale worker nodes to 48 for Q3 peak capacity', risk: 'Medium', implementationDate: '2026-08-14 23:00', owner: 'Priya Nair', status: 'Approved', approval: 'CAB Approved', backoutPlan: 'Cordon & drain new node pool' },
  { id: 'CHG-1095', changeType: 'Standard', service: 'Digital Workplace', description: 'Deploy Microsoft Teams video optimization policy', risk: 'Low', implementationDate: '2026-08-12 20:00', owner: 'Layla Hassan', status: 'Completed', approval: 'Pre-Approved', backoutPlan: 'Remove GPO policy link' },
  { id: 'CHG-1096', changeType: 'Normal', service: 'Security Platform', description: 'BeyondTrust PAM policy rule enforcement update', risk: 'Medium', implementationDate: '2026-08-13 22:00', owner: 'Daniel Mathew', status: 'Approved', approval: 'CAB Approved', backoutPlan: 'Restore PAM policy v4.2 backup' },
  { id: 'CHG-1097', changeType: 'Standard', service: 'Infrastructure Platform', description: 'VMware ESXi host storage path multipath verification', risk: 'Low', implementationDate: '2026-08-11 18:00', owner: 'Rakesh Kumar', status: 'Completed', approval: 'Pre-Approved', backoutPlan: 'Reset NMP policy to default' },
  { id: 'CHG-1098', changeType: 'Normal', service: 'FinOps Platform', description: 'Deploy Anodot cost anomaly alerting webhooks', risk: 'Low', implementationDate: '2026-08-14 10:00', owner: 'Vivek Srinivasan', status: 'Approved', approval: 'CAB Approved', backoutPlan: 'Disable Webhook endpoint' },
  { id: 'CHG-1099', changeType: 'Normal', service: 'Service Management', description: 'Update P1 Major Incident escalation roster flow', risk: 'Medium', implementationDate: '2026-08-15 08:00', owner: 'Huda Al-Salem', status: 'Approved', approval: 'CAB Approved', backoutPlan: 'Revert ServiceNow assignment matrix' },
  { id: 'CHG-1100', changeType: 'Standard', service: 'Splunk Observability', description: 'Ingest GCP Audit logs into Splunk indexer', risk: 'Low', implementationDate: '2026-08-10 12:00', owner: 'Khalid Al-Shammari', status: 'Completed', approval: 'Pre-Approved', backoutPlan: 'Disable PubSub subscription' },
  { id: 'CHG-1101', changeType: 'Normal', service: 'Identity Services', description: 'Active Directory schema update for OAuth integration', risk: 'High', implementationDate: '2026-08-17 01:00', owner: 'Ahmed Al-Qahtani', status: 'Pending CAB', approval: 'CAB Approved', backoutPlan: 'System State restore from DC01' },
];

const ChangeManagement: React.FC = () => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChanges = changesList.filter(c =>
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Change & Release Management</h1>
            <p className="page-subtitle">Change Advisory Board (CAB) Schedule, Emergency Changes & Backout Validation</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* KPI Cards (Section 6) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Total Scheduled Changes</div>
          <div className="kpi-card-value">12</div>
          <div className="kpi-card-trend neutral">August 2026 Window</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Success Rate</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>98.2%</div>
          <div className="kpi-card-trend up">Zero Unplanned Outages</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#DE350B' }} />
          <div className="kpi-card-label">Emergency Changes</div>
          <div className="kpi-card-value" style={{ color: '#DE350B' }}>1</div>
          <div className="kpi-card-trend down">CHG-1090 (App Pool)</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">Pending CAB Review</div>
          <div className="kpi-card-value" style={{ color: '#E97F0A' }}>2</div>
          <div className="kpi-card-trend neutral">Next CAB: Thu 10:00 AM</div>
        </div>
      </div>

      {/* Changes Table */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Change Execution Schedule (12 Records)</h2>
          <div className="header-search" style={{ width: 280 }}>
            <Search size={16} className="header-search-icon" />
            <input
              type="text"
              placeholder="Search changes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Change ID</th>
                <th>Type</th>
                <th>Target Service</th>
                <th style={{ minWidth: 220 }}>Description</th>
                <th>Risk Level</th>
                <th>Implementation Window</th>
                <th>Owner</th>
                <th>Approval</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredChanges.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{c.id}</td>
                  <td>
                    <span className={`health-badge ${c.changeType === 'Emergency' ? 'critical' : c.changeType === 'Normal' ? 'at-risk' : 'healthy'}`}>
                      {c.changeType}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{c.service}</td>
                  <td style={{ fontSize: '0.8125rem' }}>{c.description}</td>
                  <td>
                    <span className={`health-badge ${c.risk === 'High' ? 'critical' : c.risk === 'Medium' ? 'at-risk' : 'healthy'}`}>
                      {c.risk}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{c.implementationDate}</td>
                  <td style={{ fontSize: '0.75rem' }}>{c.owner}</td>
                  <td style={{ fontSize: '0.75rem', fontWeight: 500 }}>{c.approval}</td>
                  <td>
                    <span className={`health-badge ${c.status === 'Completed' ? 'healthy' : c.status === 'Approved' ? 'info' : 'at-risk'}`}>
                      {c.status}
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

export default ChangeManagement;
