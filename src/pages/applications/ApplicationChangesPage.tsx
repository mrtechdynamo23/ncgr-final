import React, { useState } from 'react';
import { appChangesList, type AppChangeRecord } from '../../data/master-applications';
import { useDataStore } from '../../data/mockDataStore';
import { ApplicationDetailModal } from '../../components/common/ApplicationDetailModal';
import EmployeeDetailModal from '../../components/common/EmployeeDetailModal';
import type { MasterEmployee } from '../../data/master-employees';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { APPLICATION_SERVICES_SIBLINGS } from './ApplicationServicesLandingPage';

const ApplicationChangesPage: React.FC = () => {
  const { employees } = useDataStore();
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<MasterEmployee | null>(null);
  const [isEmpModalOpen, setIsEmpModalOpen] = useState(false);

  const emergencyCount = appChangesList.filter(c => c.changeType === 'Emergency').length;
  const standardCount = appChangesList.filter(c => c.changeType === 'Standard').length;
  const normalCount = appChangesList.filter(c => c.changeType === 'Normal').length;

  const handleOpenEmployee = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const emp = employees.find(e => e.name === name);
    if (emp) {
      setSelectedEmployee(emp);
      setIsEmpModalOpen(true);
    }
  };

  const columns: ColumnDef<AppChangeRecord>[] = [
    {
      header: 'Change ID',
      accessorKey: 'changeNumber',
      width: '110px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.changeNumber}
        </span>
      ),
    },
    {
      header: 'Change Type',
      accessorKey: 'changeType',
      width: '90px',
      cell: (row) => {
        const bg = row.changeType === 'Emergency' ? '#FFEBE6' : row.changeType === 'Normal' ? '#E6F4FC' : '#E3FCEF';
        const color = row.changeType === 'Emergency' ? '#DE350B' : row.changeType === 'Normal' ? '#074A76' : '#22A06B';
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
            {row.changeType}
          </span>
        );
      },
    },
    {
      header: 'Application & Description',
      accessorKey: 'appName',
      cell: (row) => (
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedAppId(row.appId);
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
            {row.appName}
          </button>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>{row.description}</div>
        </div>
      ),
    },
    {
      header: 'Risk Level',
      accessorKey: 'risk',
      cell: (row) => (
        <span
          style={{
            fontWeight: 700,
            fontSize: '0.75rem',
            color: row.risk === 'High' ? '#DE350B' : row.risk === 'Medium' ? '#E97F0A' : '#22A06B',
          }}
        >
          {row.risk} Risk
        </span>
      ),
    },
    {
      header: 'Deployment Window',
      accessorKey: 'scheduledDate',
      cell: (row) => <span style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{row.scheduledDate}</span>,
    },
    {
      header: 'Change Owner',
      accessorKey: 'owner',
      cell: (row) => (
        <button
          onClick={(e) => handleOpenEmployee(row.owner, e)}
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
          title="Click to view full employee profile"
        >
          {row.owner}
        </button>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
        const bg = row.status === 'Completed' ? '#E3FCEF' : row.status === 'Scheduled' || row.status === 'CAB Approved' ? '#E6F4FC' : '#FFF7E6';
        const color = row.status === 'Completed' ? '#22A06B' : row.status === 'Scheduled' || row.status === 'CAB Approved' ? '#074A76' : '#E97F0A';
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

  const filters: FilterDef<AppChangeRecord>[] = [
    {
      key: 'changeType',
      label: 'Change Types',
      options: [
        { label: 'Normal', value: 'Normal' },
        { label: 'Standard', value: 'Standard' },
        { label: 'Emergency', value: 'Emergency' },
      ],
    },
    {
      key: 'risk',
      label: 'Risk Levels',
      options: [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' },
      ],
    },
    {
      key: 'status',
      label: 'Statuses',
      options: [
        { label: 'Scheduled', value: 'Scheduled' },
        { label: 'CAB Approved', value: 'CAB Approved' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Completed', value: 'Completed' },
      ],
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Sub-Page Header with Breadcrumb and Sibling Navigation */}
      <SubPageHeader
        moduleTitle="Application Services"
        modulePath="/applications"
        pageTitle="Application Changes & Releases"
        siblingPages={APPLICATION_SERVICES_SIBLINGS}
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
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Planned Changes</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{appChangesList.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>August release train</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#074A76', textTransform: 'uppercase' }}>Normal / Standard</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 4 }}>{normalCount + standardCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#074A76', marginTop: 2, fontWeight: 600 }}>CAB authorized</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>Emergency Hotfixes</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{emergencyCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', marginTop: 2, fontWeight: 600 }}>Post-CAB review</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={appChangesList}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search changes by ID, app, description, owner..."
        searchKeys={['changeNumber', 'appName', 'description', 'owner', 'risk', 'releaseVersion']}
        pageSize={10}
        title="Application Change Registry"
        subtitle="Click any application to inspect dependencies and architecture"
        exportFilename="ncgr_app_changes"
      />

      {/* App Detail Modal */}
      {selectedAppId && (
        <ApplicationDetailModal
          appId={selectedAppId}
          onClose={() => setSelectedAppId(null)}
        />
      )}

      {/* Employee Detail Modal */}
      <EmployeeDetailModal
        employee={selectedEmployee}
        isOpen={isEmpModalOpen}
        onClose={() => setIsEmpModalOpen(false)}
      />
    </div>
  );
};

export default ApplicationChangesPage;
