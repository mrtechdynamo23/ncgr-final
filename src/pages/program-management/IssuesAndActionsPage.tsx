import React from 'react';
import { issuesAndActions, type IssueActionRecord } from '../../data/programs';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { PROGRAM_MGMT_SIBLINGS } from './ProgramManagementLandingPage';

const IssuesAndActionsPage: React.FC = () => {
  const criticalCount = issuesAndActions.filter(i => i.priority === 'Critical').length;
  const overdueCount = issuesAndActions.filter(i => i.status === 'Overdue').length;
  const openCount = issuesAndActions.filter(i => i.status === 'Open' || i.status === 'In Progress').length;

  const columns: ColumnDef<IssueActionRecord>[] = [
    {
      header: 'Issue ID',
      accessorKey: 'id',
      width: '100px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Issue Description & Action Plan',
      accessorKey: 'description',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.description}</div>
          <div style={{ fontSize: '0.75rem', color: '#074A76', marginTop: 2, fontWeight: 600 }}>
            Action: {row.action}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>
            Program: {row.program}
          </div>
        </div>
      ),
    },
    {
      header: 'Priority',
      accessorKey: 'priority',
      width: '90px',
      cell: (row) => {
        const bg = row.priority === 'Critical' ? '#FFEBE6' : row.priority === 'High' ? '#FFF7E6' : '#E6F4FC';
        const color = row.priority === 'Critical' ? '#DE350B' : row.priority === 'High' ? '#E97F0A' : '#074A76';
        return (
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 4,
              fontWeight: 800,
              fontSize: '0.6875rem',
              background: bg,
              color: color,
              textTransform: 'uppercase',
            }}
          >
            {row.priority}
          </span>
        );
      },
    },
    {
      header: 'Target Date',
      accessorKey: 'targetDate',
      cell: (row) => <span style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{row.targetDate}</span>,
    },
    {
      header: 'Aging',
      accessorKey: 'aging',
      cell: (row) => <span style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{row.aging}</span>,
    },
    {
      header: 'Action Owner',
      accessorKey: 'owner',
      cell: (row) => <span style={{ fontWeight: 600 }}>{row.owner}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
        const bg = row.status === 'Completed' ? '#E3FCEF' : row.status === 'In Progress' ? '#E6F4FC' : row.status === 'Overdue' ? '#FFEBE6' : '#FFF7E6';
        const color = row.status === 'Completed' ? '#22A06B' : row.status === 'In Progress' ? '#074A76' : row.status === 'Overdue' ? '#DE350B' : '#E97F0A';
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

  const uniquePrograms = Array.from(new Set(issuesAndActions.map((i: IssueActionRecord) => i.program))).map((p: string) => ({ label: p, value: p }));

  const filters: FilterDef<IssueActionRecord>[] = [
    { key: 'program', label: 'Programs', options: uniquePrograms },
    {
      key: 'priority',
      label: 'Priorities',
      options: [
        { label: 'Critical', value: 'Critical' },
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
        { label: 'Overdue', value: 'Overdue' },
        { label: 'Completed', value: 'Completed' },
      ],
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Sub-Page Header with Breadcrumb and Sibling Navigation */}
      <SubPageHeader
        moduleTitle="Program Management"
        modulePath="/program-management"
        pageTitle="Issues & Actions"
        siblingPages={PROGRAM_MGMT_SIBLINGS}
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
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Total Issues</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{issuesAndActions.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Logged across 8 programs</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>Critical Priority</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{criticalCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', marginTop: 2, fontWeight: 600 }}>Executive focus</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E97F0A', textTransform: 'uppercase' }}>Active Open</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E97F0A', marginTop: 4 }}>{openCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#E97F0A', marginTop: 2, fontWeight: 600 }}>Under remediation</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>Overdue Actions</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{overdueCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', marginTop: 2, fontWeight: 600 }}>Target date passed</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={issuesAndActions}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search issues by description, action, program, owner..."
        searchKeys={['description', 'action', 'program', 'owner', 'id', 'programId']}
        pageSize={10}
        title="Active Program Issues Register"
        subtitle="Operational roadblock resolution and target delivery dates"
        exportFilename="ncgr_program_issues"
      />
    </div>
  );
};

export default IssuesAndActionsPage;
