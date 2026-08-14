import React from 'react';
import { useDataStore } from '../../data/mockDataStore';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import type { ActivityItem } from '../../data/master-employees';
import { CheckSquare, Square } from 'lucide-react';

const ActivityChecklist: React.FC = () => {
  const { activityItems, toggleActivityItem } = useDataStore();

  const completedCount = activityItems.filter(i => i.status === 'Completed').length;
  const inProgressCount = activityItems.filter(i => i.status === 'In Progress').length;
  const pendingCount = activityItems.filter(i => i.status === 'Pending').length;
  const overdueCount = activityItems.filter(i => i.status === 'Overdue').length;
  const completionPct = ((completedCount / activityItems.length) * 100).toFixed(1);

  const columns: ColumnDef<ActivityItem>[] = [
    {
      header: 'Done',
      width: '60px',
      sortable: false,
      cell: (row) => (
        <button
          onClick={() => toggleActivityItem(row.id)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: row.status === 'Completed' ? '#22A06B' : 'var(--text-tertiary, #98A2B3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
          }}
          title={row.status === 'Completed' ? 'Mark Incomplete' : 'Mark Completed'}
        >
          {row.status === 'Completed' ? <CheckSquare size={18} /> : <Square size={18} />}
        </button>
      ),
    },
    {
      header: 'Task ID',
      accessorKey: 'id',
      width: '110px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Activity Description',
      accessorKey: 'activity',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)', textDecoration: row.status === 'Completed' ? 'line-through' : 'none' }}>
            {row.activity}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>{row.remarks}</div>
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
      header: 'Assigned Owner',
      accessorKey: 'owner',
      cell: (row) => <span style={{ fontWeight: 600 }}>{row.owner}</span>,
    },
    {
      header: 'Frequency',
      accessorKey: 'frequency',
    },
    {
      header: 'Due Time',
      accessorKey: 'dueTime',
      cell: (row) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--ncgr-deep-blue, #074A76)' }}>
          {row.dueTime}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
        const bg = row.status === 'Completed' ? '#E3FCEF' : row.status === 'In Progress' ? '#E6F4FC' : row.status === 'Pending' ? '#FFF7E6' : '#FFEBE6';
        const color = row.status === 'Completed' ? '#22A06B' : row.status === 'In Progress' ? '#4AA6DC' : row.status === 'Pending' ? '#E97F0A' : '#DE350B';
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
    {
      header: 'Last Run',
      accessorKey: 'lastCompleted',
      cell: (row) => (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
          {row.lastCompleted}
        </span>
      ),
    },
  ];

  const uniqueTowers = Array.from(new Set(activityItems.map(e => e.tower))).map(t => ({ label: t, value: t }));
  const uniqueFreqs = Array.from(new Set(activityItems.map(e => e.frequency))).map(f => ({ label: f, value: f }));

  const filters: FilterDef<ActivityItem>[] = [
    { key: 'tower', label: 'Towers', options: uniqueTowers },
    { key: 'frequency', label: 'Frequencies', options: uniqueFreqs },
    {
      key: 'status',
      label: 'Statuses',
      options: [
        { label: 'Completed', value: 'Completed' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Overdue', value: 'Overdue' },
      ],
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 4px' }}>
          Activity Checklist & Shift Verification
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #475467)', margin: 0 }}>
          Daily & weekly mandatory operational checklists across infrastructure, database, cloud, and security towers
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
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Checklist Completion</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#40904F', marginTop: 4 }}>{completionPct}%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>{completedCount} of {activityItems.length} checked</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>In Progress / Pending</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4AA6DC', marginTop: 4 }}>{inProgressCount + pendingCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Due within shift</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Overdue Tasks</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{overdueCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Action required</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={activityItems}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search by activity, task ID, owner, or tower..."
        searchKeys={['activity', 'id', 'owner', 'tower', 'remarks']}
        pageSize={15}
        title="Active Operational Verification Roster"
        subtitle="Click the checkbox icon to toggle completed/incomplete status in real-time"
        exportFilename="ncgr_activity_checklist"
      />
    </div>
  );
};

export default ActivityChecklist;
