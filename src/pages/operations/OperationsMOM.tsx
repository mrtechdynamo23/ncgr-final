import React from 'react';
import { useDataStore } from '../../data/mockDataStore';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import type { MomAction } from '../../data/master-employees';

const OperationsMOM: React.FC = () => {
  const { momActions } = useDataStore();

  const openCount = momActions.filter(a => a.status === 'Open').length;
  const inProgressCount = momActions.filter(a => a.status === 'In Progress').length;
  const completedCount = momActions.filter(a => a.status === 'Completed').length;
  const overdueCount = momActions.filter(a => a.status === 'Overdue').length;
  const escalatedCount = momActions.filter(a => a.escalationRequired).length;

  const columns: ColumnDef<MomAction>[] = [
    {
      header: 'Action ID',
      accessorKey: 'id',
      width: '110px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Action Item Description',
      accessorKey: 'action',
      cell: (row) => (
        <div style={{ minWidth: 260 }}>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.action}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>
            Meeting: {row.meeting} • Date: {row.date}
          </div>
        </div>
      ),
    },
    {
      header: 'Tower',
      accessorKey: 'tower',
      width: '140px',
      cell: (row) => (
        <span
          style={{
            padding: '3px 8px',
            borderRadius: 4,
            background: 'var(--bg-secondary, #F7F8FA)',
            fontWeight: 600,
            fontSize: '0.75rem',
            border: '1px solid var(--border, #E4E7EC)',
            display: 'inline-block',
            whiteSpace: 'nowrap',
          }}
        >
          {row.tower}
        </span>
      ),
    },
    {
      header: 'Assigned Owner',
      accessorKey: 'owner',
      width: '180px',
      cell: (row) => <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{row.owner}</span>,
    },
    {
      header: 'Priority',
      accessorKey: 'priority',
      width: '90px',
      cell: (row) => (
        <span
          style={{
            padding: '2px 8px',
            borderRadius: 4,
            background: row.priority === 'High' ? '#FFEBE6' : row.priority === 'Medium' ? '#FFF7E6' : '#E6F4FC',
            color: row.priority === 'High' ? '#DE350B' : row.priority === 'Medium' ? '#E97F0A' : '#074A76',
            fontWeight: 700,
            fontSize: '0.6875rem',
            textTransform: 'uppercase',
            display: 'inline-block',
            whiteSpace: 'nowrap',
          }}
        >
          {row.priority}
        </span>
      ),
    },
    {
      header: 'Due Date',
      accessorKey: 'dueDate',
      width: '130px',
      cell: (row) => (
        <div>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{row.dueDate}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>Age: {row.age}</div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      width: '130px',
      cell: (row) => {
        const bg = row.status === 'Completed' ? '#E3FCEF' : row.status === 'In Progress' ? '#E6F4FC' : row.status === 'Open' ? '#FFF7E6' : '#FFEBE6';
        const color = row.status === 'Completed' ? '#22A06B' : row.status === 'In Progress' ? '#074A76' : row.status === 'Open' ? '#E97F0A' : '#DE350B';
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px 10px',
              borderRadius: 12,
              background: bg,
              color: color,
              fontWeight: 700,
              fontSize: '0.75rem',
              whiteSpace: 'nowrap',
              minWidth: 90,
              height: 24,
              boxSizing: 'border-box',
              lineHeight: 1,
            }}
          >
            {row.status}
          </span>
        );
      },
    },
  ];

  const uniqueTowers = Array.from(new Set(momActions.map(e => e.tower))).map(t => ({ label: t, value: t }));
  const uniqueMeetings = Array.from(new Set(momActions.map(e => e.meeting))).map(m => ({ label: m, value: m }));

  const filters: FilterDef<MomAction>[] = [
    { key: 'tower', label: 'Towers', options: uniqueTowers },
    { key: 'meeting', label: 'Meetings', options: uniqueMeetings },
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
        { label: 'Open', value: 'Open' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Overdue', value: 'Overdue' },
      ],
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 4px' }}>
          Operations MOM & Action Tracker
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #475467)', margin: 0 }}>
          Governance meeting decisions, daily standup action items, CAB actions, and resolution timelines
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
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Total Action Items</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{momActions.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Across all governance forums</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>In Progress / Open</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4AA6DC', marginTop: 4 }}>{inProgressCount + openCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Active remediation</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Completed Actions</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>{completedCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>Verified closed</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Overdue / Escalated</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{overdueCount} ({escalatedCount})</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', marginTop: 2, fontWeight: 600 }}>Escalation flagged</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={momActions}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search by action item, owner, meeting, or tower..."
        searchKeys={['action', 'id', 'owner', 'meeting', 'tower']}
        pageSize={15}
        title="Operations Action Register"
        subtitle="Tracking operational action commitments from standups, CAB, and tower governance meetings"
        exportFilename="ncgr_operations_mom"
      />
    </div>
  );
};

export default OperationsMOM;
