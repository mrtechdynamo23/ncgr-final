import React, { useState } from 'react';
import { useDataStore } from '../../data/mockDataStore';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import type { Incident } from '../../data/incidents';
import { X } from 'lucide-react';

const Incidents: React.FC = () => {
  const { incidents } = useDataStore();
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const p1Count = incidents.filter(i => i.priority === 'P1').length;
  const p2Count = incidents.filter(i => i.priority === 'P2').length;
  const openCount = incidents.filter(i => i.status === 'Open' || i.status === 'In Progress').length;
  const resolvedCount = incidents.filter(i => i.status === 'Resolved' || i.status === 'Closed').length;

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
      header: 'Priority',
      accessorKey: 'priority',
      width: '80px',
      cell: (row) => {
        const bg = row.priority === 'P1' ? '#FFEBE6' : row.priority === 'P2' ? '#FFF7E6' : row.priority === 'P3' ? '#E6F4FC' : '#F4F5F7';
        const color = row.priority === 'P1' ? '#DE350B' : row.priority === 'P2' ? '#E97F0A' : row.priority === 'P3' ? '#074A76' : '#64748B';
        return (
          <span
            style={{
              padding: '3px 8px',
              borderRadius: 4,
              background: bg,
              color: color,
              fontWeight: 800,
              fontSize: '0.6875rem',
            }}
          >
            {row.priority}
          </span>
        );
      },
    },
    {
      header: 'Incident Title & Impact',
      accessorKey: 'title',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.title}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>{row.businessImpact}</div>
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
      header: 'Assigned Engineer',
      accessorKey: 'assignedEngineer',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.assignedEngineer}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)' }}>{row.assignmentGroup}</div>
        </div>
      ),
    },
    {
      header: 'Duration',
      accessorKey: 'elapsedTime',
      cell: (row) => (
        <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
          {row.elapsedTime}
        </span>
      ),
    },
    {
      header: 'Related CI',
      accessorKey: 'relatedCI',
      cell: (row) => (
        <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#074A76' }}>
          {row.relatedCI || 'N/A'}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
        const bg = row.status === 'Resolved' || row.status === 'Closed' ? '#E3FCEF' : row.status === 'In Progress' ? '#E6F4FC' : '#FFF7E6';
        const color = row.status === 'Resolved' || row.status === 'Closed' ? '#22A06B' : row.status === 'In Progress' ? '#074A76' : '#E97F0A';
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

  const uniqueTowers = Array.from(new Set(incidents.map(e => e.tower))).map(t => ({ label: t, value: t }));
  const uniquePriorities = [
    { label: 'P1 - Critical', value: 'P1' },
    { label: 'P2 - High', value: 'P2' },
    { label: 'P3 - Medium', value: 'P3' },
    { label: 'P4 - Low', value: 'P4' },
  ];
  const uniqueStatuses = [
    { label: 'Open', value: 'Open' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Resolved', value: 'Resolved' },
    { label: 'Closed', value: 'Closed' },
  ];

  const filters: FilterDef<Incident>[] = [
    { key: 'priority', label: 'Priorities', options: uniquePriorities },
    { key: 'tower', label: 'Towers', options: uniqueTowers },
    { key: 'status', label: 'Statuses', options: uniqueStatuses },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 4px' }}>
          Incidents Management
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #475467)', margin: 0 }}>
          Complete operational incident repository (P1 to P4) with real-time assignment, duration tracking, and resolution state
        </p>
      </div>

      {/* KPI Overview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Total Incidents</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{incidents.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>ServiceNow Repository</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>P1 Critical / P2 High</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{p1Count} / {p2Count}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', marginTop: 2, fontWeight: 600 }}>Active severity focus</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E97F0A', textTransform: 'uppercase' }}>Active In-Flight</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E97F0A', marginTop: 4 }}>{openCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Open & In Progress</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>Resolved / Closed</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>{resolvedCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>Within target SLA</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={incidents}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search by ID, title, description, engineer, CI..."
        searchKeys={['id', 'title', 'description', 'assignedEngineer', 'owner', 'relatedCI', 'service', 'tower']}
        pageSize={15}
        onRowClick={(row) => setSelectedIncident(row)}
        title="Master Operational Incidents Log"
        subtitle="Click any incident to open the complete investigation detail drawer"
        exportFilename="ncgr_incidents_all"
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
                  {selectedIncident.priority}
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
              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase' }}>Business Impact</strong>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#DE350B', marginTop: 2 }}>{selectedIncident.businessImpact}</div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase' }}>Tower & Service</strong>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text, #101828)', marginTop: 2 }}>
                  {selectedIncident.tower} • {selectedIncident.service}
                </div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase' }}>Assignment Group & Engineer</strong>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text, #101828)', marginTop: 2 }}>
                  {selectedIncident.assignmentGroup} — {selectedIncident.assignedEngineer}
                </div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase' }}>Configuration Item & Change</strong>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text, #101828)', marginTop: 2 }}>
                  CI: {selectedIncident.relatedCI || 'None'} {selectedIncident.relatedChange ? `• Change: ${selectedIncident.relatedChange}` : ''}
                </div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase' }}>Timestamps & Duration</strong>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)', marginTop: 2 }}>
                  Opened: {selectedIncident.createdDate} • Duration: <strong>{selectedIncident.duration}</strong>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Incidents;
