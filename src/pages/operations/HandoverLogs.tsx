import React, { useState } from 'react';
import { useDataStore } from '../../data/mockDataStore';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import type { HandoverRecord } from '../../data/master-employees';
import { X, Eye } from 'lucide-react';

const HandoverLogs: React.FC = () => {
  const { handoverLogs } = useDataStore();
  const [selectedRecord, setSelectedRecord] = useState<HandoverRecord | null>(null);

  const cleanCount = handoverLogs.filter(h => h.status === 'Completed').length;
  const attentionCount = handoverLogs.filter(h => h.status === 'Attention Required' || h.status === 'In Progress').length;

  const columns: ColumnDef<HandoverRecord>[] = [
    {
      header: 'Handover ID',
      accessorKey: 'id',
      width: '100px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Date & Shift',
      accessorKey: 'date',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.date}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>{row.shift}</div>
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
      header: 'Outgoing → Incoming Engineer',
      accessorKey: 'outgoingEngineer',
      cell: (row) => (
        <div style={{ fontSize: '0.8125rem' }}>
          <span style={{ color: 'var(--text-secondary, #475467)' }}>{row.outgoingEngineer}</span>
          <span style={{ margin: '0 6px', color: 'var(--text-tertiary, #98A2B3)' }}>→</span>
          <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)' }}>{row.incomingEngineer}</span>
        </div>
      ),
    },
    {
      header: 'Critical Events',
      accessorKey: 'criticalEvents',
      cell: (row) => (
        <span style={{ fontSize: '0.8125rem', color: 'var(--text, #101828)' }}>
          {row.criticalEvents}
        </span>
      ),
    },
    {
      header: 'Pending Actions',
      accessorKey: 'pendingActions',
      cell: (row) => (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
          {row.pendingActions}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
        const bg = row.status === 'Completed' ? '#E3FCEF' : row.status === 'Attention Required' ? '#FFF7E6' : '#E6F4FC';
        const color = row.status === 'Completed' ? '#22A06B' : row.status === 'Attention Required' ? '#E97F0A' : '#4AA6DC';
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
      header: 'Actions',
      sortable: false,
      width: '80px',
      cell: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedRecord(row);
          }}
          style={{
            padding: '4px 8px',
            borderRadius: 4,
            background: 'var(--bg-secondary, #F7F8FA)',
            border: '1px solid var(--border, #E4E7EC)',
            color: 'var(--ncgr-deep-blue, #074A76)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        >
          <Eye size={12} /> View
        </button>
      ),
    },
  ];

  const uniqueTowers = Array.from(new Set(handoverLogs.map(e => e.tower))).map(t => ({ label: t, value: t }));

  const filters: FilterDef<HandoverRecord>[] = [
    { key: 'tower', label: 'Towers', options: uniqueTowers },
    {
      key: 'status',
      label: 'Statuses',
      options: [
        { label: 'Completed', value: 'Completed' },
        { label: 'Attention Required', value: 'Attention Required' },
        { label: 'In Progress', value: 'In Progress' },
      ],
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 4px' }}>
          Shift Handover Logs
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #475467)', margin: 0 }}>
          Cross-shift operational continuity, critical event logging, open incident transfer, and risk mitigation
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
        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Handover Logs</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{handoverLogs.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>24/7 coverage</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Clean Transfers</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>{cleanCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>Zero critical blockers</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Attention Required</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E97F0A', marginTop: 4 }}>{attentionCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Active triage transfer</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={handoverLogs}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search by engineer, task, event, or tower..."
        searchKeys={['outgoingEngineer', 'incomingEngineer', 'tower', 'criticalEvents', 'openIncidents', 'pendingActions']}
        pageSize={15}
        onRowClick={(row) => setSelectedRecord(row)}
        title="Verified Shift Handover Records"
        subtitle="Click any row to view complete operational transfer brief"
        exportFilename="ncgr_handover_logs"
      />

      {/* Handover Detail Modal Drawer */}
      {selectedRecord && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10, 22, 40, 0.45)',
              backdropFilter: 'blur(3px)',
              zIndex: 1000,
            }}
            onClick={() => setSelectedRecord(null)}
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
                  {selectedRecord.id}
                </span>
                <h3 style={{ margin: '4px 0 0', fontSize: '1.125rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
                  {selectedRecord.tower} Shift Handover Brief
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                <X size={20} color="var(--text-tertiary, #98A2B3)" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.875rem' }}>
              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ color: 'var(--text-secondary, #475467)' }}>Shift & Engineers:</strong>
                <div style={{ marginTop: 4, fontWeight: 600 }}>
                  {selectedRecord.shift} ({selectedRecord.date}) • {selectedRecord.outgoingEngineer} → {selectedRecord.incomingEngineer}
                </div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ color: 'var(--text-secondary, #475467)' }}>Critical Shift Events:</strong>
                <div style={{ marginTop: 4 }}>{selectedRecord.criticalEvents}</div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ color: 'var(--text-secondary, #475467)' }}>Open Incidents Transferred:</strong>
                <div style={{ marginTop: 4, color: '#DE350B', fontWeight: 600 }}>{selectedRecord.openIncidents}</div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ color: 'var(--text-secondary, #475467)' }}>Pending Next-Shift Actions:</strong>
                <div style={{ marginTop: 4 }}>{selectedRecord.pendingActions}</div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ color: 'var(--text-secondary, #475467)' }}>Identified Risks & External Dependencies:</strong>
                <div style={{ marginTop: 4 }}>{selectedRecord.risks} • <em>Dependencies: {selectedRecord.dependencies}</em></div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HandoverLogs;
