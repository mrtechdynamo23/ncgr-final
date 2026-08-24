import React from 'react';
import { dependencies, type DependencyRecord } from '../../data/programs';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { PROGRAM_MGMT_SIBLINGS } from './ProgramManagementLandingPage';

const DependenciesPage: React.FC = () => {
  const highImpactCount = dependencies.filter(d => d.impact === 'High').length;
  const resolvedCount = dependencies.filter(d => d.status === 'Resolved').length;
  const activeCount = dependencies.filter(d => d.status === 'Active').length;

  const columns: ColumnDef<DependencyRecord>[] = [
    {
      header: 'Dep ID',
      accessorKey: 'id',
      width: '100px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Dependency & Program',
      accessorKey: 'dependency',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.dependency}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>
            Program: {row.program}
          </div>
        </div>
      ),
    },
    {
      header: 'Dependent Team',
      accessorKey: 'dependentTeam',
      cell: (row) => <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{row.dependentTeam}</span>,
    },
    {
      header: 'Impact Severity',
      accessorKey: 'impact',
      cell: (row) => (
        <span
          style={{
            padding: '2px 8px',
            borderRadius: 4,
            background: row.impact === 'High' ? '#FFEBE6' : row.impact === 'Medium' ? '#FFF7E6' : '#E6F4FC',
            color: row.impact === 'High' ? '#DE350B' : row.impact === 'Medium' ? '#E97F0A' : '#074A76',
            fontWeight: 800,
            fontSize: '0.6875rem',
            textTransform: 'uppercase',
          }}
        >
          {row.impact}
        </span>
      ),
    },
    {
      header: 'Due Date',
      accessorKey: 'dueDate',
      cell: (row) => <span style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{row.dueDate}</span>,
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
        const bg = row.status === 'Resolved' ? '#E3FCEF' : row.status === 'Active' ? '#E6F4FC' : '#FFEBE6';
        const color = row.status === 'Resolved' ? '#22A06B' : row.status === 'Active' ? '#074A76' : '#DE350B';
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
  ];

  const uniquePrograms = Array.from(new Set(dependencies.map((d: DependencyRecord) => d.program))).map((p: string) => ({ label: p, value: p }));

  const filters: FilterDef<DependencyRecord>[] = [
    { key: 'program', label: 'Programs', options: uniquePrograms },
    {
      key: 'impact',
      label: 'Impact Severity',
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
        { label: 'Active', value: 'Active' },
        { label: 'At Risk', value: 'At Risk' },
        { label: 'Blocked', value: 'Blocked' },
        { label: 'Resolved', value: 'Resolved' },
      ],
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Sub-Page Header with Breadcrumb and Sibling Navigation */}
      <SubPageHeader
        moduleTitle="Program Management"
        modulePath="/program-management"
        pageTitle="Dependencies"
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
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Total Dependencies</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{dependencies.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Inter-program links</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>High Impact</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{highImpactCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', marginTop: 2, fontWeight: 600 }}>Critical path items</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#074A76', textTransform: 'uppercase' }}>Active In Progress</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 4 }}>{activeCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#074A76', marginTop: 2, fontWeight: 600 }}>Being executed</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>Resolved Dependencies</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>{resolvedCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>Prerequisites clear</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={dependencies}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search dependencies by program, team, owner..."
        searchKeys={['dependency', 'program', 'dependentTeam', 'owner', 'id']}
        pageSize={10}
        title="Active Cross-Program Dependency Matrix"
        subtitle="Critical handoffs between ITMS transformation workstreams"
        exportFilename="ncgr_program_dependencies"
      />
    </div>
  );
};

export default DependenciesPage;
