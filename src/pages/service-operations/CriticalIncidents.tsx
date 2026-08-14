import React, { useState } from 'react';
import { useDataStore } from '../../data/mockDataStore';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import type { Incident } from '../../data/incidents';
import { X } from 'lucide-react';

const CriticalIncidents: React.FC = () => {
  const { incidents } = useDataStore();
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const criticalList = incidents.filter(i => i.priority === 'P1' || i.priority === 'P2');
  const p1Active = criticalList.filter(i => i.priority === 'P1' && (i.status === 'Open' || i.status === 'In Progress')).length;
  const p2Active = criticalList.filter(i => i.priority === 'P2' && (i.status === 'Open' || i.status === 'In Progress')).length;
  const resolvedCount = criticalList.filter(i => i.status === 'Resolved' || i.status === 'Closed').length;

  const columns: ColumnDef<Incident>[] = [
    {
      header: 'Incident ID',
      accessorKey: 'id',
      width: '110px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Severity',
      accessorKey: 'priority',
      width: '80px',
      cell: (row) => (
        <span
          style={{
            padding: '3px 8px',
            borderRadius: 4,
            background: row.priority === 'P1' ? '#FFEBE6' : '#FFF7E6',
            color: row.priority === 'P1' ? '#DE350B' : '#E97F0A',
            fontWeight: 800,
            fontSize: '0.6875rem',
          }}
        >
          {row.priority} {row.priority === 'P1' ? 'CRITICAL' : 'MAJOR'}
        </span>
      ),
    },
    {
      header: 'Incident Title & Impact',
      accessorKey: 'title',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.title}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', fontWeight: 600 }}>{row.businessImpact}</div>
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
      header: 'Incident Commander',
      accessorKey: 'assignedEngineer',
      cell: (row) => <span style={{ fontWeight: 600 }}>{row.assignedEngineer}</span>,
    },
    {
      header: 'Duration',
      accessorKey: 'duration',
      cell: (row) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--ncgr-deep-blue, #074A76)' }}>
          {row.duration}
        </span>
      ),
    },
    {
      header: 'RCA Status',
      accessorKey: 'rcaStatus',
      cell: (row) => (
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: row.rcaStatus === 'Completed' ? '#22A06B' : '#E97F0A',
          }}
        >
          {row.rcaStatus || 'Pending'}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
        const bg = row.status === 'Resolved' || row.status === 'Closed' ? '#E3FCEF' : row.status === 'In Progress' ? '#FFEBE6' : '#FFF7E6';
        const color = row.status === 'Resolved' || row.status === 'Closed' ? '#22A06B' : row.status === 'In Progress' ? '#DE350B' : '#E97F0A';
        return (
          <span
            className="status-badge"
            style={{
              background: bg,
              color: color,
            }}
          >
            {row.status}
          </span>
        );
      },
    },
  ];

  const uniqueTowers = Array.from(new Set(criticalList.map(e => e.tower))).map(t => ({ label: t, value: t }));

  const filters: FilterDef<Incident>[] = [
    {
      key: 'priority',
      label: 'Severity',
      options: [
        { label: 'P1 Critical', value: 'P1' },
        { label: 'P2 Major', value: 'P2' },
      ],
    },
    { key: 'tower', label: 'Towers', options: uniqueTowers },
    {
      key: 'status',
      label: 'Statuses',
      options: [
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Open', value: 'Open' },
        { label: 'Resolved', value: 'Resolved' },
        { label: 'Closed', value: 'Closed' },
      ],
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 4px' }}>
          Critical Incidents (P1 / P2 Operations Bridge)
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #475467)', margin: 0 }}>
          High-severity outage management, incident bridge commanders, business impact mitigation, and RCA governance
        </p>
      </div>

      {/* KPI Cards Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #DE350B' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>Active P1 Outages</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{p1Active}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', marginTop: 2, fontWeight: 600 }}>Bridge Active</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #E97F0A' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E97F0A', textTransform: 'uppercase' }}>Active P2 Major</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E97F0A', marginTop: 4 }}>{p2Active}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>In remediation</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #22A06B' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>Closed / Resolved</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>{resolvedCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>RCA in progress</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #074A76' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ncgr-deep-blue, #074A76)', textTransform: 'uppercase' }}>Historical Criticals</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{criticalList.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Total logged P1/P2</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={criticalList}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search critical incidents by ID, title, CI, commander..."
        searchKeys={['id', 'title', 'description', 'assignedEngineer', 'relatedCI', 'businessImpact', 'tower']}
        pageSize={12}
        onRowClick={(row) => setSelectedIncident(row)}
        title="Critical Incident Response Log"
        subtitle="Click any row to open the full technical bridge & remediation brief"
        exportFilename="ncgr_critical_incidents"
      />

      {/* Incident Detail Drawer */}
      {selectedIncident && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10, 22, 40, 0.45)',
              backdropFilter: 'blur(3px)',
              zIndex: 1000,
            }}
            onClick={() => setSelectedIncident(null)}
          />
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 500,
              maxWidth: '90vw',
              background: 'var(--surface-raised, #FFFFFF)',
              boxShadow: '-8px 0 30px rgba(0, 0, 0, 0.15)',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              padding: 24,
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    background: selectedIncident.priority === 'P1' ? '#FFEBE6' : '#FFF7E6',
                    color: selectedIncident.priority === 'P1' ? '#DE350B' : '#E97F0A',
                  }}
                >
                  {selectedIncident.priority} CRITICAL
                </span>
                <span style={{ fontSize: '0.8125rem', fontFamily: 'monospace', fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)' }}>
                  {selectedIncident.id}
                </span>
              </div>
              <button
                onClick={() => setSelectedIncident(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                <X size={20} color="var(--text-tertiary, #98A2B3)" />
              </button>
            </div>

            <h3 style={{ margin: '0 0 8px', fontSize: '1.125rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
              {selectedIncident.title}
            </h3>

            <p style={{ margin: '0 0 20px', fontSize: '0.875rem', color: 'var(--text-secondary, #475467)', lineHeight: 1.5 }}>
              {selectedIncident.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              <div style={{ padding: 12, borderRadius: 8, background: '#FFEBE6', border: '1px solid rgba(222,53,11,0.2)' }}>
                <strong style={{ fontSize: '0.75rem', color: '#DE350B', textTransform: 'uppercase' }}>Business Impact Statement</strong>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#DE350B', marginTop: 2 }}>{selectedIncident.businessImpact}</div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase' }}>Incident Commander & Tower</strong>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text, #101828)', marginTop: 2 }}>
                  {selectedIncident.assignedEngineer} • {selectedIncident.tower} ({selectedIncident.assignmentGroup})
                </div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase' }}>Affected Service & CI</strong>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text, #101828)', marginTop: 2 }}>
                  {selectedIncident.service} • CI: {selectedIncident.relatedCI}
                </div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase' }}>Duration & Timestamps</strong>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)', marginTop: 2 }}>
                  Opened: {selectedIncident.createdDate} • Outage Elapsed: <strong>{selectedIncident.duration}</strong>
                </div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase' }}>RCA Governance State</strong>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#40904F', marginTop: 2 }}>
                  {selectedIncident.rcaStatus || 'In Progress'} — Target: 5 business days from resolution
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CriticalIncidents;
