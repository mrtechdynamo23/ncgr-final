import React, { useState } from 'react';
import { masterApplications, type ApplicationRecord } from '../../data/master-applications';
import { useDataStore } from '../../data/mockDataStore';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import EmployeeDetailModal from '../../components/common/EmployeeDetailModal';
import type { MasterEmployee } from '../../data/master-employees';

const ApplicationSupportPage: React.FC = () => {
  const { employees } = useDataStore();
  const [selectedEmployee, setSelectedEmployee] = useState<MasterEmployee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const coverage24x7Count = masterApplications.filter(a => a.coverageType === '24x7').length;
  const businessHoursCount = masterApplications.length - coverage24x7Count;

  const handleOpenEmployee = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const emp = employees.find(e => e.name === name);
    if (emp) {
      setSelectedEmployee(emp);
      setIsModalOpen(true);
    }
  };

  const columns: ColumnDef<ApplicationRecord>[] = [
    {
      header: 'App ID',
      accessorKey: 'id',
      width: '110px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Application & Support Team',
      accessorKey: 'name',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>
            Support Team: {row.supportTeam}
          </div>
        </div>
      ),
    },
    {
      header: 'IT Owner Lead',
      accessorKey: 'itOwner',
      cell: (row) => (
        <button
          onClick={(e) => handleOpenEmployee(row.itOwner, e)}
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
          {row.itOwner}
        </button>
      ),
    },
    {
      header: 'Business Owner Lead',
      accessorKey: 'businessOwner',
      cell: (row) => (
        <button
          onClick={(e) => handleOpenEmployee(row.businessOwner, e)}
          style={{
            background: 'none',
            border: 'none',
            color: '#40904F',
            fontWeight: 700,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            textAlign: 'left',
            padding: 0,
            textDecoration: 'underline',
          }}
          title="Click to view full employee profile"
        >
          {row.businessOwner}
        </button>
      ),
    },
    {
      header: 'Support Window',
      accessorKey: 'coverageType',
      cell: (row) => (
        <span
          style={{
            padding: '2px 8px',
            borderRadius: 4,
            fontWeight: 700,
            fontSize: '0.75rem',
            background: row.coverageType === '24x7' ? '#E3FCEF' : '#E6F4FC',
            color: row.coverageType === '24x7' ? '#22A06B' : '#074A76',
          }}
        >
          {row.coverageType}
        </span>
      ),
    },
    {
      header: 'Vendor Contract Scope',
      accessorKey: 'vendor',
      cell: (row) => (
        <div>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{row.vendor}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>Support Tier: {row.l3Support}</div>
        </div>
      ),
    },
  ];

  const uniqueSupportTeams = Array.from(new Set(masterApplications.map(a => a.supportTeam))).map(t => ({ label: t, value: t }));

  const filters: FilterDef<ApplicationRecord>[] = [
    { key: 'supportTeam', label: 'Support Teams', options: uniqueSupportTeams },
    {
      key: 'coverageType',
      label: 'Support Windows',
      options: [
        { label: '24x7 Mission Critical', value: '24x7' },
        { label: 'Business Hours', value: 'Business Hours' },
      ],
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 4px' }}>
          Application Support Coverage & Ownership
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #475467)', margin: 0 }}>
          L1/L2/L3 support teams, 24x7 shift coverage windows, IT owner assignments, and business stakeholder accountability
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
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Supported Portfolio</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{masterApplications.length} Apps</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>100% Assigned L2/L3</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>24×7 Active Coverage</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>{coverage24x7Count}</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>Critical & High portals</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#074A76', textTransform: 'uppercase' }}>Business Hours Standard</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 4 }}>{businessHoursCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#074A76', marginTop: 2, fontWeight: 600 }}>Internal support tools</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={masterApplications}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search support teams, IT owners, vendors, apps..."
        searchKeys={['name', 'itOwner', 'businessOwner', 'supportTeam', 'vendor', 'id']}
        pageSize={15}
        title="Application Support Ownership Matrix"
        subtitle="Click any owner name to open their complete profile, phone, and assignment history"
        exportFilename="ncgr_app_support_coverage"
      />

      {/* Employee Detail Modal */}
      <EmployeeDetailModal
        employee={selectedEmployee}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ApplicationSupportPage;
