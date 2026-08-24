import React, { useState } from 'react';
import { milestones, type MilestoneRecord } from '../../data/programs';
import { useDataStore } from '../../data/mockDataStore';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import EmployeeDetailModal from '../../components/common/EmployeeDetailModal';
import type { MasterEmployee } from '../../data/master-employees';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { PROGRAM_MGMT_SIBLINGS } from './ProgramManagementLandingPage';

const MilestonesPage: React.FC = () => {
  const { employees } = useDataStore();
  const [selectedOwner, setSelectedOwner] = useState<MasterEmployee | null>(null);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);

  const completedCount = milestones.filter(m => m.status === 'Completed').length;
  const onTrackCount = milestones.filter(m => m.status === 'On Track').length;
  const atRiskCount = milestones.filter(m => m.status === 'At Risk' || m.status === 'Delayed').length;

  const handleOpenOwner = (ownerName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const emp = employees.find(e => e.name === ownerName);
    if (emp) {
      setSelectedOwner(emp);
      setIsOwnerModalOpen(true);
    }
  };

  const columns: ColumnDef<MilestoneRecord>[] = [
    {
      header: 'Milestone ID',
      accessorKey: 'id',
      width: '100px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Milestone Name & Program',
      accessorKey: 'milestone',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.milestone}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>
            Program: {row.program}
          </div>
        </div>
      ),
    },
    {
      header: 'Planned vs Actual Date',
      accessorKey: 'plannedDate',
      cell: (row) => (
        <div>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Planned: {row.plannedDate}</div>
          <div style={{ fontSize: '0.75rem', color: row.actualDate ? '#22A06B' : 'var(--text-tertiary, #98A2B3)' }}>
            Actual: {row.actualDate || 'Pending'}
          </div>
        </div>
      ),
    },
    {
      header: 'Variance',
      accessorKey: 'variance',
      cell: (row) => (
        <span
          style={{
            fontWeight: 700,
            fontSize: '0.8125rem',
            color: row.variance.includes('+') || row.variance.includes('Behind') ? '#DE350B' : row.variance === '0 days' || row.variance.includes('schedule') ? '#22A06B' : '#074A76',
          }}
        >
          {row.variance}
        </span>
      ),
    },
    {
      header: 'Progress',
      accessorKey: 'completionPct',
      cell: (row) => (
        <div style={{ minWidth: 80 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: row.completionPct === 100 ? '#22A06B' : '#074A76', marginBottom: 2 }}>
            {row.completionPct}%
          </div>
          <div style={{ height: 4, width: '100%', background: 'var(--bg-secondary, #F7F8FA)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${row.completionPct}%`, background: row.completionPct === 100 ? '#22A06B' : '#074A76' }} />
          </div>
        </div>
      ),
    },
    {
      header: 'Assigned Lead',
      accessorKey: 'owner',
      cell: (row) => (
        <button
          onClick={(e) => handleOpenOwner(row.owner, e)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--ncgr-deep-blue, #074A76)',
            fontWeight: 700,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            textAlign: 'left',
            padding: 0,
            textDecoration: 'underline',
          }}
        >
          {row.owner}
        </button>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
        const bg = row.status === 'Completed' ? '#E3FCEF' : row.status === 'On Track' ? '#E6F4FC' : row.status === 'Delayed' ? '#FFEBE6' : '#FFF7E6';
        const color = row.status === 'Completed' ? '#22A06B' : row.status === 'On Track' ? '#074A76' : row.status === 'Delayed' ? '#DE350B' : '#E97F0A';
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

  const uniquePrograms = Array.from(new Set(milestones.map((m: MilestoneRecord) => m.program))).map((p: string) => ({ label: p, value: p }));

  const filters: FilterDef<MilestoneRecord>[] = [
    { key: 'program', label: 'Programs', options: uniquePrograms },
    {
      key: 'status',
      label: 'Statuses',
      options: [
        { label: 'Completed', value: 'Completed' },
        { label: 'On Track', value: 'On Track' },
        { label: 'At Risk', value: 'At Risk' },
        { label: 'Delayed', value: 'Delayed' },
        { label: 'Not Started', value: 'Not Started' },
      ],
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Sub-Page Header with Breadcrumb and Sibling Navigation */}
      <SubPageHeader
        moduleTitle="Program Management"
        modulePath="/program-management"
        pageTitle="Milestones & Delivery Roadmap"
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
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Total Milestones</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{milestones.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Multi-year baseline</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>Completed Milestones</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>{completedCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>Deliverables signed off</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#074A76', textTransform: 'uppercase' }}>Active On Track</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 4 }}>{onTrackCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#074A76', marginTop: 2, fontWeight: 600 }}>Execution on schedule</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>At Risk / Delayed</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{atRiskCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', marginTop: 2, fontWeight: 600 }}>Variance flagged</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={milestones}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search milestones by name, program, owner..."
        searchKeys={['milestone', 'program', 'owner', 'id', 'programId']}
        pageSize={15}
        title="Master Milestone Delivery Registry"
        subtitle="Click any owner to inspect their employee profile and assignment history"
        exportFilename="ncgr_program_milestones"
      />

      {/* Owner Detail Modal */}
      <EmployeeDetailModal
        employee={selectedOwner}
        isOpen={isOwnerModalOpen}
        onClose={() => setIsOwnerModalOpen(false)}
      />
    </div>
  );
};

export default MilestonesPage;
