import React, { useState } from 'react';
import { resourceMobilization, getResourceMobStats, type ResourceMobilizationRecord } from '../../data/resourceMobilization';
import { useDataStore } from '../../data/mockDataStore';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import EmployeeDetailModal from '../../components/common/EmployeeDetailModal';
import type { MasterEmployee } from '../../data/master-employees';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { PROGRAM_MGMT_SIBLINGS } from './ProgramManagementLandingPage';

const ResourceMobilizationPage: React.FC = () => {
  const { employees } = useDataStore();
  const [selectedEmployee, setSelectedEmployee] = useState<MasterEmployee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stats = getResourceMobStats();

  const handleOpenEmployee = (empId: string) => {
    const emp = employees.find(e => e.employeeId === empId);
    if (emp) {
      setSelectedEmployee(emp);
      setIsModalOpen(true);
    }
  };

  const columns: ColumnDef<ResourceMobilizationRecord>[] = [
    {
      header: 'Emp ID',
      accessorKey: 'employeeId',
      width: '100px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.employeeId}
        </span>
      ),
    },
    {
      header: 'Engineer Name & Role',
      accessorKey: 'employeeName',
      cell: (row) => (
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenEmployee(row.employeeId);
            }}
            style={{
              background: 'none',
              border: 'none',
              fontWeight: 700,
              color: 'var(--ncgr-deep-blue, #074A76)',
              cursor: 'pointer',
              padding: 0,
              textAlign: 'left',
              fontSize: '0.875rem',
              textDecoration: 'underline',
            }}
          >
            {row.employeeName}
          </button>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>{row.position}</div>
        </div>
      ),
    },
    {
      header: 'Tower & Project',
      accessorKey: 'tower',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.tower}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>{row.project}</div>
        </div>
      ),
    },
    {
      header: 'Current Assignment & Activity',
      accessorKey: 'currentAssignment',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.currentAssignment}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>{row.currentActivity}</div>
        </div>
      ),
    },
    {
      header: 'Reporting Manager',
      accessorKey: 'reportingManager',
      cell: (row) => <span style={{ fontWeight: 600 }}>{row.reportingManager}</span>,
    },
    {
      header: 'KT Status',
      accessorKey: 'ktStatus',
      cell: (row) => {
        const bg = row.ktStatus === 'Completed' ? '#E3FCEF' : row.ktStatus === 'In Progress' ? '#E6F4FC' : '#FFF7E6';
        const color = row.ktStatus === 'Completed' ? '#22A06B' : row.ktStatus === 'In Progress' ? '#074A76' : '#E97F0A';
        return (
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 4,
              fontWeight: 700,
              fontSize: '0.6875rem',
              background: bg,
              color: color,
            }}
          >
            {row.ktStatus}
          </span>
        );
      },
    },
    {
      header: 'Resource Status',
      accessorKey: 'resourceStatus',
      cell: (row) => {
        const bg = row.resourceStatus === 'Active' ? '#E3FCEF' : row.resourceStatus === 'KT In Progress' ? '#E6F4FC' : '#FFF7E6';
        const color = row.resourceStatus === 'Active' ? '#22A06B' : row.resourceStatus === 'KT In Progress' ? '#074A76' : '#E97F0A';
        return (
          <span
            className="status-badge"
            style={{
              background: bg,
              color: color,
            }}
          >
            {row.resourceStatus}
          </span>
        );
      },
    },
  ];

  const uniqueTowers = Array.from(new Set(resourceMobilization.map((r: ResourceMobilizationRecord) => r.tower))).map((t: string) => ({ label: t, value: t }));

  const filters: FilterDef<ResourceMobilizationRecord>[] = [
    { key: 'tower', label: 'Towers', options: uniqueTowers },
    {
      key: 'resourceStatus',
      label: 'Resource Status',
      options: [
        { label: 'Active', value: 'Active' },
        { label: 'KT In Progress', value: 'KT In Progress' },
        { label: 'On Leave', value: 'On Leave' },
        { label: 'Pending Onboard', value: 'Pending Onboard' },
        { label: 'Offboarding', value: 'Offboarding' },
      ],
    },
    {
      key: 'ktStatus',
      label: 'KT Certification',
      options: [
        { label: 'Completed', value: 'Completed' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Not Required', value: 'Not Required' },
      ],
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Sub-Page Header with Breadcrumb and Sibling Navigation */}
      <SubPageHeader
        moduleTitle="Program Management"
        modulePath="/program-management"
        pageTitle="Resource Mobilisation"
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
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Mobilized Resources</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{stats.total}</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>{stats.active} Active on ground</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#074A76', textTransform: 'uppercase' }}>KT In Progress</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 4 }}>{stats.ktInProgress}</div>
          <div style={{ fontSize: '0.75rem', color: '#074A76', marginTop: 2, fontWeight: 600 }}>Active knowledge transfer</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E97F0A', textTransform: 'uppercase' }}>Pending Onboarding</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E97F0A', marginTop: 4 }}>{stats.pendingOnboard}</div>
          <div style={{ fontSize: '0.75rem', color: '#E97F0A', marginTop: 2, fontWeight: 600 }}>Mobilization pipeline</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>Replacement Needed</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{stats.replacementNeeded}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', marginTop: 2, fontWeight: 600 }}>Offboarding queue</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={resourceMobilization}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search engineers by name, role, tower, project, manager..."
        searchKeys={['employeeName', 'position', 'tower', 'project', 'currentAssignment', 'reportingManager', 'employeeId']}
        pageSize={15}
        onRowClick={(row) => handleOpenEmployee(row.employeeId)}
        title="Active Resource Mobilization Roster"
        subtitle="Click any engineer row or name to view complete multi-year assignment history and KT sign-offs"
        exportFilename="ncgr_resource_mobilization"
      />

      {/* Employee Detail Modal with Assignment & KT History */}
      <EmployeeDetailModal
        employee={selectedEmployee}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ResourceMobilizationPage;
