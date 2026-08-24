import React, { useState } from 'react';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import { X } from 'lucide-react';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { COMMAND_CENTER_SIBLINGS } from './CommandCenterLandingPage';

interface ProblemRecord {
  id: string;
  service: string;
  tower: string;
  problemStatement: string;
  relatedIncidents: string;
  rootCause: string;
  owner: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Under Investigation' | 'RCA Complete' | 'Known Error' | 'Resolved';
  correctiveAction: string;
  targetClosure: string;
  aging: string;
}

const problemsList: ProblemRecord[] = [
  { id: 'PRB-0801', service: 'NCGR Digital Services', tower: 'Applications', problemStatement: 'Recurrent application connection pool exhaustion under load spikes', relatedIncidents: 'INC0048720, INC0048715', rootCause: 'WebLogic application connection leak on stale DB threads', owner: 'Sara Al-Otaibi', priority: 'High', status: 'RCA Complete', correctiveAction: 'Upgrade WebLogic datasource driver & auto-reconnect', targetClosure: '2026-08-20', aging: '8 days' },
  { id: 'PRB-0802', service: 'Enterprise Network', tower: 'Network', problemStatement: 'STC primary WAN link packet drop during business hours', relatedIncidents: 'INC0048719, INC0048700', rootCause: 'Carrier provider interface buffer misconfiguration', owner: 'Mohammed Al-Dosari', priority: 'Medium', status: 'Under Investigation', correctiveAction: 'STC NOC escalation & MTU optimization', targetClosure: '2026-08-22', aging: '12 days' },
  { id: 'PRB-0803', service: 'Database Platform', tower: 'Database', problemStatement: 'Oracle RAC secondary node replication lag on heavy write queries', relatedIncidents: 'INC0048718', rootCause: 'Redo log transport bandwidth bottleneck', owner: 'Omar Al-Mutairi', priority: 'High', status: 'Under Investigation', correctiveAction: 'Increase interconnect throughput to 40Gbps', targetClosure: '2026-08-25', aging: '15 days' },
  { id: 'PRB-0804', service: 'ServiceNow Platform', tower: 'Applications', problemStatement: 'Delayed CMDB discovery sync for OpenShift container CIs', relatedIncidents: 'INC0048705', rootCause: 'REST API rate limiting on Kubernetes API server', owner: 'Arjun Menon', priority: 'Medium', status: 'Known Error', correctiveAction: 'Deploy batch pagination in ServiceNow discovery plugin', targetClosure: '2026-08-30', aging: '22 days' },
  { id: 'PRB-0805', service: 'Cloud Platforms', tower: 'Cloud', problemStatement: 'Intermittent GCP Cloud Storage latency for PDF export jobs', relatedIncidents: 'INC0048707', rootCause: 'Single-region bucket egress constraint', owner: 'Priya Nair', priority: 'Medium', status: 'RCA Complete', correctiveAction: 'Migrate bucket to Dual-Region europe-west3 / me-central1', targetClosure: '2026-08-18', aging: '6 days' },
  { id: 'PRB-0806', service: 'Security Platform', tower: 'Security', problemStatement: 'PAM token timeout enforcement mismatch across jump servers', relatedIncidents: 'INC0048710', rootCause: 'Inconsistent BeyondTrust agent config GPO push', owner: 'Daniel Mathew', priority: 'Medium', status: 'Resolved', correctiveAction: 'Centralized GPO refresh policy applied', targetClosure: '2026-08-10', aging: 'Closed' },
  { id: 'PRB-0807', service: 'Digital Workplace', tower: 'Digital Workplace', problemStatement: 'Teams audio quality degradation on VPN connections', relatedIncidents: 'INC0048711', rootCause: 'VPN tunnel hair-pinning for Microsoft 365 traffic', owner: 'Layla Hassan', priority: 'Low', status: 'Resolved', correctiveAction: 'Implemented Split-Tunneling for M365 endpoints', targetClosure: '2026-08-08', aging: 'Closed' },
  { id: 'PRB-0808', service: 'Reporting Platform', tower: 'Applications', problemStatement: 'PowerBI weekly status dataset refresh timeout', relatedIncidents: 'INC0048714', rootCause: 'Unindexed view on historical audit trail table', owner: 'Vivek Srinivasan', priority: 'Medium', status: 'Resolved', correctiveAction: 'Created non-clustered index on audit timestamp', targetClosure: '2026-08-05', aging: 'Closed' },
];

const MajorProblems: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<ProblemRecord | null>(null);
  const [filteredProblems, setFilteredProblems] = useState<ProblemRecord[]>(problemsList);

  const totalProblems = filteredProblems.length;
  const resolvedProblems = filteredProblems.filter(p => p.status === 'Resolved');
  const rcaCompleteCount = filteredProblems.filter(p => p.status === 'RCA Complete').length;
  const underInvestigationCount = filteredProblems.filter(p => p.status === 'Under Investigation').length;

  const columns: ColumnDef<ProblemRecord>[] = [
    {
      header: 'Problem ID',
      accessorKey: 'id',
      width: '110px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Problem Statement & Service',
      accessorKey: 'problemStatement',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.problemStatement}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>
            Service: {row.service} • Incidents: {row.relatedIncidents}
          </div>
        </div>
      ),
    },
    {
      header: 'Tower',
      accessorKey: 'tower',
      cell: (row) => (
        <span
          style={{
            padding: '2px 8px',
            borderRadius: 4,
            background: 'var(--bg-secondary, #F7F8FA)',
            fontWeight: 600,
            fontSize: '0.75rem',
            border: '1px solid var(--border, #E4E7EC)',
          }}
        >
          {row.tower}
        </span>
      ),
    },
    {
      header: 'Assigned Lead',
      accessorKey: 'owner',
      cell: (row) => <span style={{ fontWeight: 600 }}>{row.owner}</span>,
    },
    {
      header: 'Priority',
      accessorKey: 'priority',
      cell: (row) => {
        const bg = row.priority === 'High' ? '#FFEBE6' : row.priority === 'Medium' ? '#FFF7E6' : '#E6F4FC';
        const color = row.priority === 'High' ? '#DE350B' : row.priority === 'Medium' ? '#E97F0A' : '#074A76';
        return (
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 4,
              background: bg,
              color: color,
              fontWeight: 700,
              fontSize: '0.6875rem',
            }}
          >
            {row.priority}
          </span>
        );
      },
    },
    {
      header: 'Target Closure & Aging',
      accessorKey: 'targetClosure',
      cell: (row) => (
        <div>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{row.targetClosure}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>{row.aging}</div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
        const bg = row.status === 'Resolved' ? '#E3FCEF' : row.status === 'RCA Complete' ? '#E6F4FC' : row.status === 'Known Error' ? '#FFF7E6' : '#FFEBE6';
        const color = row.status === 'Resolved' ? '#22A06B' : row.status === 'RCA Complete' ? '#074A76' : row.status === 'Known Error' ? '#E97F0A' : '#DE350B';
        return (
          <span
            className="status-badge"
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
            setSelectedProblem(row);
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

  const uniqueTowers = Array.from(new Set(problemsList.map(e => e.tower))).map(t => ({ label: t, value: t }));

  const filters: FilterDef<ProblemRecord>[] = [
    { key: 'tower', label: 'Towers', options: uniqueTowers },
    {
      key: 'priority',
      label: 'Priorities',
      options: [
        { label: 'High', value: 'High' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Low', value: 'Low' },
      ],
    },
    {
      key: 'status',
      label: 'Statuses',
      options: [
        { label: 'Under Investigation', value: 'Under Investigation' },
        { label: 'RCA Complete', value: 'RCA Complete' },
        { label: 'Known Error', value: 'Known Error' },
        { label: 'Resolved', value: 'Resolved' },
      ],
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      <SubPageHeader
        moduleTitle="Command Center"
        modulePath="/command-center"
        pageTitle="Problems"
        siblingPages={COMMAND_CENTER_SIBLINGS}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Total Problems</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{totalProblems}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>
            {totalProblems === problemsList.length ? 'Master problem register' : `Filtered (${totalProblems} of ${problemsList.length})`}
          </div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>Active Investigations</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{underInvestigationCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', marginTop: 2, fontWeight: 600 }}>Under engineering analysis</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#074A76', textTransform: 'uppercase' }}>RCA Complete</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 4 }}>{rcaCompleteCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#074A76', marginTop: 2, fontWeight: 600 }}>CAPA action pending</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>Permanently Resolved</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>{resolvedProblems.length}</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>Verified fix applied</div>
        </div>
      </div>

      <DataTable
        data={problemsList}
        columns={columns}
        filters={filters}
        onFilteredDataChange={setFilteredProblems}
        searchPlaceholder="Search problems by statement, service, root cause..."
        searchKeys={['id', 'problemStatement', 'service', 'rootCause', 'owner', 'relatedIncidents']}
        pageSize={10}
        onRowClick={(row) => setSelectedProblem(row)}
        title="Problem Records"
        subtitle="Click any problem record to open technical RCA and corrective actions"
        exportFilename="ncgr_problems"
      />

      {/* Problem Detail Modal */}
      {selectedProblem && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10, 22, 40, 0.45)',
              backdropFilter: 'blur(3px)',
              zIndex: 1000,
            }}
            onClick={() => setSelectedProblem(null)}
          />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90vw',
              maxWidth: 620,
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
                  {selectedProblem.id}
                </span>
                <h3 style={{ margin: '4px 0 0', fontSize: '1.125rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
                  {selectedProblem.service} Problem Record
                </h3>
              </div>
              <button
                onClick={() => setSelectedProblem(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                <X size={20} color="var(--text-tertiary, #98A2B3)" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.875rem' }}>
              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ color: 'var(--text-secondary, #475467)' }}>Problem Statement:</strong>
                <div style={{ marginTop: 4, fontWeight: 700 }}>{selectedProblem.problemStatement}</div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: '#FFEBE6', border: '1px solid rgba(222,53,11,0.2)' }}>
                <strong style={{ color: '#DE350B' }}>Identified Technical Root Cause:</strong>
                <div style={{ marginTop: 4, color: '#DE350B', fontWeight: 600 }}>{selectedProblem.rootCause}</div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'rgba(64,144,79,0.08)', border: '1px solid rgba(64,144,79,0.3)' }}>
                <strong style={{ color: '#40904F' }}>Corrective / Preventive Action:</strong>
                <div style={{ marginTop: 4, color: '#2E6B39' }}>{selectedProblem.correctiveAction}</div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ color: 'var(--text-secondary, #475467)' }}>Related Incidents & Owner:</strong>
                <div style={{ marginTop: 4 }}>
                  Incidents: {selectedProblem.relatedIncidents} • Assigned Lead: <strong>{selectedProblem.owner}</strong> ({selectedProblem.tower})
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MajorProblems;
