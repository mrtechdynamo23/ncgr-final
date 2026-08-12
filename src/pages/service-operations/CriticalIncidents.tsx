import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

interface IncidentItem {
  id: string;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  service: string;
  category: string;
  description: string;
  startTime: string;
  duration: string;
  status: 'Investigating' | 'Monitoring' | 'Resolved' | 'Closed';
  owner: string;
  impact: string;
  currentAction: string;
}

const incidentsList: IncidentItem[] = [
  { id: 'INC-26081', priority: 'P1', service: 'NCGR Digital Services', category: 'Application Slowness', description: 'Intermittent application connectivity and WebLogic pool exhaustion', startTime: '2026-08-12 01:36', duration: '24m', status: 'Resolved', owner: 'Application Support (Sara Al-Otaibi)', impact: 'High (8,450 users)', currentAction: 'Connection pool expanded; monitoring steady' },
  { id: 'INC-26082', priority: 'P2', service: 'Enterprise Network', category: 'WAN Latency', description: 'STC primary WAN link packet drops during peak hours', startTime: '2026-08-12 09:10', duration: '2h 15m', status: 'Monitoring', owner: 'Network Ops (Mohammed Al-Dosari)', impact: 'Medium (Riyadh-Jeddah link)', currentAction: 'Traffic rerouted to standby fiber' },
  { id: 'INC-26083', priority: 'P2', service: 'Database Platform', category: 'Replication Delay', description: 'Oracle RAC secondary node redo log transport lag', startTime: '2026-08-11 22:45', duration: '45m', status: 'Resolved', owner: 'Database Ops (Omar Al-Mutairi)', impact: 'Medium (DR Replica)', currentAction: 'Redo log apply caught up' },
  { id: 'INC-26084', priority: 'P3', service: 'ServiceNow Platform', category: 'Integration Timeout', description: 'CMDB automated discovery API rate limit timeout', startTime: '2026-08-11 15:00', duration: '1h 10m', status: 'Resolved', owner: 'Automation & AI (Arjun Menon)', impact: 'Low (CI sync delayed)', currentAction: 'Batch pagination deployed' },
  { id: 'INC-26085', priority: 'P3', service: 'Cloud Platforms', category: 'Storage Egress Latency', description: 'GCP Cloud Storage PDF export egress delay', startTime: '2026-08-10 11:20', duration: '35m', status: 'Resolved', owner: 'Cloud Ops (Priya Nair)', impact: 'Low (Report exports)', currentAction: 'Bucket dual-region sync verified' },
  { id: 'INC-26086', priority: 'P3', service: 'Security Platform', category: 'PAM Policy Sync', description: 'BeyondTrust PAM policy update GPO push failure', startTime: '2026-08-09 18:30', duration: '50m', status: 'Resolved', owner: 'Security Ops (Daniel Mathew)', impact: 'Low (14 Admin tokens)', currentAction: 'GPO forced update executed' },
  { id: 'INC-26087', priority: 'P4', service: 'Digital Workplace', category: 'Teams Audio Quality', description: 'Intermittent Teams voice jitter on VPN users', startTime: '2026-08-08 14:00', duration: '2h 00m', status: 'Resolved', owner: 'Digital Workplace (Layla Hassan)', impact: 'Low (Remote staff)', currentAction: 'Split tunneling enabled' },
  { id: 'INC-26088', priority: 'P3', service: 'Infrastructure Platform', category: 'Memory Threshold', description: 'Monitoring Host ESX-02 memory utilization at 83%', startTime: '2026-08-08 08:15', duration: '3h 30m', status: 'Monitoring', owner: 'Infrastructure (Ahmed Al-Qahtani)', impact: 'Low (Log ingestion)', currentAction: 'Worker VMs rebalancing planned' },
  { id: 'INC-26089', priority: 'P4', service: 'Reporting Platform', category: 'PowerBI Refresh Timeout', description: 'PowerBI weekly status dataset refresh failure', startTime: '2026-08-07 10:00', duration: '40m', status: 'Resolved', owner: 'Program Mgmt (Vivek Srinivasan)', impact: 'Low (Executive view)', currentAction: 'Audit log index added' },
  { id: 'INC-26090', priority: 'P3', service: 'Identity Services', category: 'SAML Cert Warning', description: 'ADFS token signing cert expiry 14-day threshold alert', startTime: '2026-08-06 09:00', duration: '15m', status: 'Resolved', owner: 'Security Ops (Daniel Mathew)', impact: 'Low (Pre-emptive)', currentAction: 'Cert auto-enrollment renewed' },
];

const CriticalIncidents: React.FC = () => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIncidents = incidentsList.filter(i =>
    i.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Critical Incidents Operations View</h1>
            <p className="page-subtitle">Real-Time Incident Triage, P1/P2 Operational Bridge & MTTR Analytics</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* KPI Cards (Section 6) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#DE350B' }} />
          <div className="kpi-card-label">P1 Active / Today</div>
          <div className="kpi-card-value" style={{ color: '#DE350B' }}>0 / 1</div>
          <div className="kpi-card-trend up">MTTR 24m (Target &lt; 30m)</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">P2 Active Incidents</div>
          <div className="kpi-card-value" style={{ color: '#E97F0A' }}>1</div>
          <div className="kpi-card-trend neutral">INC-26082 (WAN Latency)</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#4AA6DC' }} />
          <div className="kpi-card-label">P3 / P4 Incidents</div>
          <div className="kpi-card-value">1</div>
          <div className="kpi-card-trend neutral">Under Investigation</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Resolved Today</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>8</div>
          <div className="kpi-card-trend up">SLA Met 98.4%</div>
        </div>
      </div>

      {/* Incidents Table */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Recent Operational Incidents (10 Records)</h2>
          <div className="header-search" style={{ width: 280 }}>
            <Search size={16} className="header-search-icon" />
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Incident ID</th>
                <th>Priority</th>
                <th>Service</th>
                <th style={{ minWidth: 220 }}>Description</th>
                <th>Start Time</th>
                <th>Duration</th>
                <th>Owner</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.map((i) => (
                <tr key={i.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{i.id}</td>
                  <td>
                    <span className={`health-badge ${i.priority === 'P1' ? 'critical' : i.priority === 'P2' ? 'at-risk' : 'healthy'}`}>
                      {i.priority}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{i.service}</td>
                  <td style={{ fontSize: '0.8125rem' }}>{i.description}<br /><span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Action: {i.currentAction}</span></td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{i.startTime}</td>
                  <td style={{ fontSize: '0.75rem', fontWeight: 600 }}>{i.duration}</td>
                  <td style={{ fontSize: '0.75rem' }}>{i.owner}</td>
                  <td>
                    <span className={`health-badge ${i.status === 'Resolved' ? 'healthy' : i.status === 'Monitoring' ? 'info' : 'at-risk'}`}>
                      {i.status}
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

export default CriticalIncidents;
