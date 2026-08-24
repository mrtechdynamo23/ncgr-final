import React, { useState, useMemo } from 'react';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import { X } from 'lucide-react';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { COMMAND_CENTER_SIBLINGS } from './CommandCenterLandingPage';

interface RCARecord {
  id: string;
  incidentRef: string;
  service: string;
  tower: string;
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
  { id: 'RCA-026', incidentRef: 'INC0048720', service: 'NCGR Digital Services', tower: 'Applications', date: '2026-08-12', businessImpact: 'Intermittent portal slowness affecting 8,450 active users for 24 minutes', technicalCause: 'Connection pool exhaustion following abnormal 300% traffic burst', contributingFactors: 'Stale database connections not released by WebLogic thread pool', rootCause: 'Application connection pool configuration limit set below burst threshold with auto-reconnect disabled.', correctiveAction: 'Adjusted WebLogic pool size from 100 to 300 connections and restarted app cluster.', preventiveAction: 'Implemented Splunk automated pool capacity alerts and auto-scaling rules.', owner: 'Sara Al-Otaibi', status: 'Approved' },
  { id: 'RCA-025', incidentRef: 'INC0048719', service: 'Enterprise Network', tower: 'Network', date: '2026-08-05', businessImpact: 'High WAN latency between Riyadh Primary and DR site for 42 minutes', technicalCause: 'BGP path flapping on STC secondary fiber link', contributingFactors: 'Intermittent optical transceiver degradation on carrier edge router', rootCause: 'Physical fiber interface packet loss triggered automated BGP route recalculation loop.', correctiveAction: 'Switched primary transport path to standby STC dark fiber link.', preventiveAction: 'Replaced SFP+ optical module and enabled STC SLA link monitoring probe.', owner: 'Mohammed Al-Dosari', status: 'Closed' },
  { id: 'RCA-024', incidentRef: 'INC0048718', service: 'Database Platform', tower: 'Database', date: '2026-07-28', businessImpact: 'Delayed reporting generation for 12 executive users for 1 hour', technicalCause: 'Oracle RAC node 2 redo log sync delay during batch run', contributingFactors: 'Concurrent backup job overlapped with daily SAP batch query', rootCause: 'Unsynchronized job schedule caused disk I/O contention on SAN storage pool.', correctiveAction: 'Shifted backup window to 02:00 AM off-peak.', preventiveAction: 'Configured I/O priority rules on SAN controller.', owner: 'Omar Al-Mutairi', status: 'Closed' },
  { id: 'RCA-023', incidentRef: 'INC0048710', service: 'Identity Services', tower: 'Security', date: '2026-07-15', businessImpact: 'Failed SAML authentication for 45 remote users for 15 minutes', technicalCause: 'ADFS token signing certificate expiry', contributingFactors: 'Automated certificate rollover alert skipped during weekend shift', rootCause: 'Monitoring alert threshold misconfigured for ADFS cert expiry.', correctiveAction: 'Manually renewed ADFS token signing certificate.', preventiveAction: 'Integrated AppViewX certificate lifecycle automation tool.', owner: 'Daniel Mathew', status: 'Closed' },
  { id: 'RCA-022', incidentRef: 'INC0048705', service: 'ServiceNow Platform', tower: 'Applications', date: '2026-07-02', businessImpact: 'Incident auto-assignment delay for 120 ticket submissions', technicalCause: 'ServiceNow MID Server service freeze', contributingFactors: 'Out-of-memory error on MID Server host VM', rootCause: 'HEAP memory limit allocation insufficient for 4,300 CI CMDB discovery scan.', correctiveAction: 'Restarted MID Server service and increased JVM heap to 8GB.', preventiveAction: 'Configured automated MID Server health check script.', owner: 'Arjun Menon', status: 'Closed' },
  { id: 'RCA-021', incidentRef: 'INC0048706', service: 'Container Platform', tower: 'Cloud', date: '2026-06-20', businessImpact: 'Microservice pods crash-looping in OpenShift prod cluster', technicalCause: 'Kubernetes PVC disk quota filled by audit debug logs', contributingFactors: 'Log verbosity level left at DEBUG after troubleshooting', rootCause: 'Log rotation daemon failed to compress JSON log files.', correctiveAction: 'Purged debug logs and reclaimed 450GB storage space.', preventiveAction: 'Enforced Fluentd log truncation policy and INFO log level.', owner: 'Priya Nair', status: 'Closed' },
  { id: 'RCA-020', incidentRef: 'INC0048711', service: 'Digital Workplace', tower: 'Digital Workplace', date: '2026-06-08', businessImpact: 'Exchange Online hybrid mail flow delay for 30 minutes', technicalCause: 'TLS handshake timeout on edge mail gateway', contributingFactors: 'Expired TLS 1.2 cipher suite on legacy relay node', rootCause: 'Legacy mail relay server skipped during TLS cipher suite hardening.', correctiveAction: 'Updated TLS cipher suite configuration on relay server.', preventiveAction: 'Added edge mail gateways to monthly vulnerability scan schedule.', owner: 'Layla Hassan', status: 'Closed' },
  { id: 'RCA-019', incidentRef: 'INC0048701', service: 'Infrastructure Platform', tower: 'Infrastructure', date: '2026-05-24', businessImpact: 'Host ESX-02 unexpected reboot during maintenance', technicalCause: 'Kernel panic on SAN HBA driver', contributingFactors: 'Firmware mismatch between HBA and VMware ESXi 7.0 Update 3', rootCause: 'Outdated HBA driver version susceptible to race condition under heavy queue depth.', correctiveAction: 'Upgraded QLogic HBA firmware to v8.04.', preventiveAction: 'Updated VMware HCL compatibility matrix check in CI/CD pipeline.', owner: 'Rakesh Kumar', status: 'Closed' },
];

const OperationalRCA: React.FC = () => {
  const [selectedRCA, setSelectedRCA] = useState<RCARecord | null>(null);
  const [filteredRCAs, setFilteredRCAs] = useState<RCARecord[]>(rcaList);

  const totalRCAs = filteredRCAs.length;
  const approvedCount = filteredRCAs.filter(r => r.status === 'Approved' || r.status === 'Closed').length;
  const underReviewCount = filteredRCAs.filter(r => r.status === 'Under Review' || r.status === 'Draft').length;
  const closedCount = filteredRCAs.filter(r => r.status === 'Closed').length;

  const columns: ColumnDef<RCARecord>[] = [
    {
      header: 'RCA ID',
      accessorKey: 'id',
      width: '100px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Incident Ref',
      accessorKey: 'incidentRef',
      width: '110px',
      cell: (row) => (
        <span style={{ fontWeight: 600, color: '#DE350B', fontFamily: 'monospace' }}>
          {row.incidentRef}
        </span>
      ),
    },
    {
      header: 'Service & Tower',
      accessorKey: 'service',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.service}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>{row.tower} • {row.date}</div>
        </div>
      ),
    },
    {
      header: 'Technical Root Cause Summary',
      accessorKey: 'rootCause',
      cell: (row) => (
        <span style={{ fontSize: '0.8125rem', color: 'var(--text, #101828)' }}>
          {row.rootCause}
        </span>
      ),
    },
    {
      header: 'Corrective Action (CAPA)',
      accessorKey: 'correctiveAction',
      cell: (row) => (
        <span style={{ fontSize: '0.75rem', color: '#40904F', fontWeight: 600 }}>
          {row.correctiveAction}
        </span>
      ),
    },
    {
      header: 'Assigned Lead',
      accessorKey: 'owner',
      cell: (row) => <span style={{ fontWeight: 600 }}>{row.owner}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
        const bg = row.status === 'Approved' || row.status === 'Closed' ? '#E3FCEF' : row.status === 'Under Review' ? '#FFF7E6' : '#F4F5F7';
        const color = row.status === 'Approved' || row.status === 'Closed' ? '#22A06B' : row.status === 'Under Review' ? '#E97F0A' : '#8993A4';
        return (
          <span
            style={{
              padding: '3px 10px',
              borderRadius: 12,
              background: bg,
              color: color,
              fontWeight: 700,
              fontSize: '0.75rem',
            }}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      header: 'Action',
      sortable: false,
      width: '80px',
      cell: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedRCA(row);
          }}
          style={{
            padding: '4px 8px',
            borderRadius: 4,
            background: 'var(--bg-secondary, #F7F8FA)',
            border: '1px solid var(--border, #E4E7EC)',
            color: 'var(--ncgr-deep-blue, #074A76)',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        >
          View
        </button>
      ),
    },
  ];

  const uniqueTowers = useMemo(() => Array.from(new Set(rcaList.map(e => e.tower))).map(t => ({ label: t, value: t })), []);

  const filters: FilterDef<RCARecord>[] = useMemo(() => [
    { key: 'tower', label: 'Towers', options: uniqueTowers },
    {
      key: 'status',
      label: 'Statuses',
      options: [
        { label: 'Approved', value: 'Approved' },
        { label: 'Closed', value: 'Closed' },
        { label: 'Under Review', value: 'Under Review' },
        { label: 'Draft', value: 'Draft' },
      ],
    },
  ], [uniqueTowers]);

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Sub-Page Header with Breadcrumb and Sibling Navigation */}
      <SubPageHeader
        moduleTitle="Command Center"
        modulePath="/command-center"
        pageTitle="Operational RCA"
        siblingPages={COMMAND_CENTER_SIBLINGS}
      />

      {/* KPI Cards Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Total RCA Reports</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{totalRCAs}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>
            {totalRCAs === rcaList.length ? 'Audited investigations' : `Filtered (${totalRCAs} of ${rcaList.length})`}
          </div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>Approved & Active</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>{approvedCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>CAPA verified applied</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E97F0A', textTransform: 'uppercase' }}>Under Review</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E97F0A', marginTop: 4 }}>{underReviewCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#E97F0A', marginTop: 2, fontWeight: 600 }}>Leadership sign-off</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#074A76', textTransform: 'uppercase' }}>Closed Investigations</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 4 }}>{closedCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Fully resolved</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={rcaList}
        columns={columns}
        filters={filters}
        onFilteredDataChange={setFilteredRCAs}
        searchPlaceholder="Search RCA by ID, incident, root cause, owner..."
        searchKeys={['id', 'incidentRef', 'service', 'rootCause', 'technicalCause', 'owner', 'tower']}
        pageSize={10}
        onRowClick={(row) => setSelectedRCA(row)}
        title="Approved Incident RCAs"
        subtitle="Click any row to open the complete 5-Why and CAPA report"
        exportFilename="ncgr_operational_rca"
      />

      {/* RCA Detail Modal */}
      {selectedRCA && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10, 22, 40, 0.45)',
              backdropFilter: 'blur(3px)',
              zIndex: 1000,
            }}
            onClick={() => setSelectedRCA(null)}
          />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90vw',
              maxWidth: 680,
              maxHeight: '85vh',
              background: 'var(--surface-raised, #FFFFFF)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
              borderRadius: 14,
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              padding: 24,
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
                  {selectedRCA.id} • Incident Ref: {selectedRCA.incidentRef}
                </span>
                <h3 style={{ margin: '4px 0 0', fontSize: '1.125rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
                  {selectedRCA.service} RCA Investigation Report
                </h3>
              </div>
              <button
                onClick={() => setSelectedRCA(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                <X size={20} color="var(--text-tertiary, #98A2B3)" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.875rem' }}>
              <div style={{ padding: 12, borderRadius: 8, background: '#FFEBE6', border: '1px solid rgba(222,53,11,0.2)' }}>
                <strong style={{ color: '#DE350B' }}>Business Impact Summary:</strong>
                <div style={{ marginTop: 4, color: '#DE350B', fontWeight: 600 }}>{selectedRCA.businessImpact}</div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ color: 'var(--text-secondary, #475467)' }}>Primary Technical Root Cause:</strong>
                <div style={{ marginTop: 4, fontWeight: 700 }}>{selectedRCA.rootCause}</div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ color: 'var(--text-secondary, #475467)' }}>Contributing Factors:</strong>
                <div style={{ marginTop: 4 }}>{selectedRCA.contributingFactors}</div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'rgba(64,144,79,0.08)', border: '1px solid rgba(64,144,79,0.3)' }}>
                <strong style={{ color: '#40904F' }}>Corrective Action (Immediate Fix):</strong>
                <div style={{ marginTop: 4, color: '#2E6B39', fontWeight: 600 }}>{selectedRCA.correctiveAction}</div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'rgba(7,74,118,0.08)', border: '1px solid rgba(7,74,118,0.3)' }}>
                <strong style={{ color: '#074A76' }}>Preventive Action (Long-Term CAPA):</strong>
                <div style={{ marginTop: 4, color: '#05263F' }}>{selectedRCA.preventiveAction}</div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ color: 'var(--text-secondary, #475467)' }}>Lead Author & Sign-off Date:</strong>
                <div style={{ marginTop: 4 }}>
                  Authored by: <strong>{selectedRCA.owner}</strong> ({selectedRCA.tower}) on {selectedRCA.date} • Status: <strong>{selectedRCA.status}</strong>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OperationalRCA;
