import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

interface RCARecord {
  id: string;
  incidentRef: string;
  service: string;
  date: string;
  businessImpact: string;
  technicalCause: string;
  contributingFactors: string;
  rootCause: string;
  correctiveAction: string;
  preventiveAction: string;
  owner: string;
  status: 'Draft' | 'Under Review' | 'Approved' | 'Closed';
}

const rcaList: RCARecord[] = [
  { id: 'RCA-026', incidentRef: 'INC-26081', service: 'NCGR Digital Services', date: '2026-08-12', businessImpact: 'Intermittent portal slowness affecting 8,450 active users for 24 minutes', technicalCause: 'Connection pool exhaustion following abnormal 300% traffic burst', contributingFactors: 'Stale database connections not released by WebLogic thread pool', rootCause: 'Application connection pool configuration limit set below burst threshold with auto-reconnect disabled.', correctiveAction: 'Adjusted WebLogic pool size from 100 to 300 connections and restarted app cluster.', preventiveAction: 'Implemented Splunk automated pool capacity alerts and auto-scaling rules.', owner: 'Sara Al-Otaibi', status: 'Approved' },
  { id: 'RCA-025', incidentRef: 'INC-25940', service: 'Enterprise Network', date: '2026-08-05', businessImpact: 'High WAN latency between Riyadh Primary and DR site for 42 minutes', technicalCause: 'BGP path flapping on STC secondary fiber link', contributingFactors: 'Intermittent optical transceiver degradation on carrier edge router', rootCause: 'Physical fiber interface packet loss triggered automated BGP route recalculation loop.', correctiveAction: 'Switched primary transport path to standby STC dark fiber link.', preventiveAction: 'Replaced SFP+ optical module and enabled STC SLA link monitoring probe.', owner: 'Mohammed Al-Dosari', status: 'Closed' },
  { id: 'RCA-024', incidentRef: 'INC-25810', service: 'Database Platform', date: '2026-07-28', businessImpact: 'Delayed reporting generation for 12 executive users for 1 hour', technicalCause: 'Oracle RAC node 2 redo log sync delay during batch run', contributingFactors: 'Concurrent backup job overlapped with daily SAP batch query', rootCause: 'Unsynchronized job schedule caused disk I/O contention on SAN storage pool.', correctiveAction: 'Shifted backup window to 02:00 AM off-peak.', preventiveAction: 'Configured I/O priority rules on SAN controller.', owner: 'Omar Al-Mutairi', status: 'Closed' },
  { id: 'RCA-023', incidentRef: 'INC-25700', service: 'Identity Services', date: '2026-07-15', businessImpact: 'Failed SAML authentication for 45 remote users for 15 minutes', technicalCause: 'ADFS token signing certificate expiry', contributingFactors: 'Automated certificate rollover alert skipped during weekend shift', rootCause: 'Monitoring alert threshold misconfigured for ADFS cert expiry.', correctiveAction: 'Manually renewed ADFS token signing certificate.', preventiveAction: 'Integrated AppViewX certificate lifecycle automation tool.', owner: 'Daniel Mathew', status: 'Closed' },
  { id: 'RCA-022', incidentRef: 'INC-25590', service: 'ServiceNow Platform', date: '2026-07-02', businessImpact: 'Incident auto-assignment delay for 120 ticket submissions', technicalCause: 'ServiceNow MID Server service freeze', contributingFactors: 'Out-of-memory error on MID Server host VM', rootCause: 'HEAP memory limit allocation insufficient for 4,300 CI CMDB discovery scan.', correctiveAction: 'Restarted MID Server service and increased JVM heap to 8GB.', preventiveAction: 'Configured automated MID Server health check script.', owner: 'Arjun Menon', status: 'Closed' },
  { id: 'RCA-021', incidentRef: 'INC-25450', service: 'Container Platform', date: '2026-06-20', businessImpact: 'Microservice pods crash-looping in OpenShift prod cluster', technicalCause: 'Kubernetes PVC disk quota filled by audit debug logs', contributingFactors: 'Log verbosity level left at DEBUG after troubleshooting', rootCause: 'Log rotation daemon failed to compress JSON log files.', correctiveAction: 'Purged debug logs and reclaimed 450GB storage space.', preventiveAction: 'Enforced Fluentd log truncation policy and INFO log level.', owner: 'Priya Nair', status: 'Closed' },
  { id: 'RCA-020', incidentRef: 'INC-25320', service: 'Digital Workplace', date: '2026-06-08', businessImpact: 'Exchange Online hybrid mail flow delay for 30 minutes', technicalCause: 'TLS handshake timeout on edge mail gateway', contributingFactors: 'Expired TLS 1.2 cipher suite on legacy relay node', rootCause: 'Legacy mail relay server skipped during TLS cipher suite hardening.', correctiveAction: 'Updated TLS cipher suite configuration on relay server.', preventiveAction: 'Added edge mail gateways to monthly vulnerability scan schedule.', owner: 'Layla Hassan', status: 'Closed' },
  { id: 'RCA-019', incidentRef: 'INC-25190', service: 'Infrastructure Platform', date: '2026-05-24', businessImpact: 'Host ESX-02 unexpected reboot during maintenance', technicalCause: 'Kernel panic on SAN HBA driver', contributingFactors: 'Firmware mismatch between HBA and VMware ESXi 7.0 Update 3', rootCause: 'Outdated HBA driver version susceptible to race condition under heavy queue depth.', correctiveAction: 'Upgraded QLogic HBA firmware to v8.04.', preventiveAction: 'Updated VMware HCL compatibility matrix check in CI/CD pipeline.', owner: 'Rakesh Kumar', status: 'Closed' },
];

const OperationalRCA: React.FC = () => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRCA, setSelectedRCA] = useState<RCARecord | null>(null);

  const filteredRCA = rcaList.filter(r =>
    r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.incidentRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.rootCause.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Critical Operations RCA Repository</h1>
            <p className="page-subtitle">P1 Major Incident Root Cause Analysis, Corrective & Preventive Action (CAPA) Tracking</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* KPI Cards (Section 6) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Total RCA Reports</div>
          <div className="kpi-card-value">8</div>
          <div className="kpi-card-trend neutral">P1 & Major P2 Incidents</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">RCA SLA Compliance</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>100%</div>
          <div className="kpi-card-trend up">Submitted &lt; 5 Days</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#4AA6DC' }} />
          <div className="kpi-card-label">CAPA Actions Implemented</div>
          <div className="kpi-card-value" style={{ color: '#4AA6DC' }}>16 / 16</div>
          <div className="kpi-card-trend up">All Preventative Steps Active</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#1FBBB0' }} />
          <div className="kpi-card-label">Recurrence Rate</div>
          <div className="kpi-card-value" style={{ color: '#1FBBB0' }}>0.0%</div>
          <div className="kpi-card-trend up">Zero Repeat Root Causes</div>
        </div>
      </div>

      {/* RCA Table */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Completed RCA Document Repository (8 Records)</h2>
          <div className="header-search" style={{ width: 280 }}>
            <Search size={16} className="header-search-icon" />
            <input
              type="text"
              placeholder="Search RCA records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>RCA ID</th>
                <th>Incident Ref</th>
                <th>Service</th>
                <th>Date</th>
                <th style={{ minWidth: 200 }}>Root Cause</th>
                <th style={{ minWidth: 200 }}>Corrective Action</th>
                <th>Owner</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRCA.map((r) => (
                <tr key={r.id} onClick={() => setSelectedRCA(r)} style={{ cursor: 'pointer' }}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{r.id}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-purple)' }}>{r.incidentRef}</td>
                  <td style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{r.service}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{r.date}</td>
                  <td style={{ fontSize: '0.8125rem' }}>{r.rootCause}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{r.correctiveAction}</td>
                  <td style={{ fontSize: '0.75rem' }}>{r.owner}</td>
                  <td>
                    <span className={`health-badge ${r.status === 'Closed' ? 'healthy' : 'info'}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected RCA Modal */}
      {selectedRCA && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 'var(--border-radius-xl)', padding: 24, maxWidth: 650, width: '100%', color: 'var(--text)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>RCA Executive Summary {selectedRCA.id} ({selectedRCA.incidentRef})</h3>
              <button onClick={() => setSelectedRCA(null)} style={{ cursor: 'pointer', fontWeight: 700 }}>✕</button>
            </div>
            <div style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>
              <p style={{ marginBottom: 8 }}><strong>Service:</strong> {selectedRCA.service} ({selectedRCA.date})</p>
              <p style={{ marginBottom: 8 }}><strong>Business Impact:</strong> {selectedRCA.businessImpact}</p>
              <p style={{ marginBottom: 8 }}><strong>Technical Cause:</strong> {selectedRCA.technicalCause}</p>
              <p style={{ marginBottom: 8 }}><strong>Contributing Factors:</strong> {selectedRCA.contributingFactors}</p>
              <p style={{ marginBottom: 8, background: 'var(--bg-secondary)', padding: 8, borderRadius: 4 }}><strong>Root Cause:</strong> {selectedRCA.rootCause}</p>
              <p style={{ marginBottom: 8 }}><strong>Corrective Action:</strong> {selectedRCA.correctiveAction}</p>
              <p style={{ marginBottom: 8 }}><strong>Preventive Action:</strong> {selectedRCA.preventiveAction}</p>
              <p><strong>Owner / Approver:</strong> {selectedRCA.owner} ({selectedRCA.status})</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperationalRCA;
