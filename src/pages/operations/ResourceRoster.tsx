import React, { useState } from 'react';
import { useDataStore } from '../../data/mockDataStore';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import EmployeeDetailModal from '../../components/common/EmployeeDetailModal';
import type { MasterEmployee } from '../../data/master-employees';
import { Eye } from 'lucide-react';

const ResourceRoster: React.FC = () => {
  const { employees } = useDataStore();
  const [selectedEmployee, setSelectedEmployee] = useState<MasterEmployee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (employee: MasterEmployee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const columns: ColumnDef<MasterEmployee>[] = [
    {
      header: 'Employee ID',
      accessorKey: 'employeeId',
      width: '120px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.employeeId}
        </span>
      ),
    },
    {
      header: 'Full Name',
      accessorKey: 'name',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>{row.email}</div>
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
      header: 'Department',
      accessorKey: 'department',
    },
    {
      header: 'Position / Role',
      accessorKey: 'position',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.position}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>{row.role}</div>
        </div>
      ),
    },
    {
      header: 'Reporting Manager',
      accessorKey: 'manager',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
        const bg = row.status === 'Active' ? '#E3FCEF' : row.status === 'On Leave' ? '#FFF7E6' : row.status === 'Training' ? '#E6F4FC' : '#F4F5F7';
        const color = row.status === 'Active' ? '#22A06B' : row.status === 'On Leave' ? '#E97F0A' : row.status === 'Training' ? '#4AA6DC' : '#8993A4';
        return (
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 12,
              background: bg,
              color: color,
              fontWeight: 700,
              fontSize: '0.6875rem',
            }}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      header: 'Shift',
      accessorKey: 'shift',
      cell: (row) => (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
          {row.shift.split(' ')[0]}
        </span>
      ),
    },
    {
      header: 'Type',
      accessorKey: 'expatLocal',
      cell: (row) => (
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: row.expatLocal === 'Local' ? '#40904F' : '#074A76' }}>
          {row.expatLocal}
        </span>
      ),
    },
    {
      header: 'Actions',
      sortable: false,
      width: '80px',
      cell: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRowClick(row);
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

  const uniqueTowers = Array.from(new Set(employees.map(e => e.tower))).map(t => ({ label: t, value: t }));
  const uniqueDepartments = Array.from(new Set(employees.map(e => e.department))).map(d => ({ label: d, value: d }));
  const uniqueStatuses = Array.from(new Set(employees.map(e => e.status))).map(s => ({ label: s, value: s }));

  const filters: FilterDef<MasterEmployee>[] = [
    { key: 'tower', label: 'Towers', options: uniqueTowers },
    { key: 'department', label: 'Departments', options: uniqueDepartments },
    { key: 'status', label: 'Statuses', options: uniqueStatuses },
    {
      key: 'expatLocal',
      label: 'Local / Expat',
      options: [
        { label: 'Local (Saudi)', value: 'Local' },
        { label: 'Expat', value: 'Expat' },
      ],
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 4px' }}>
          Resource Data
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #475467)', margin: 0 }}>
          Central master employee roster of 355+ operational engineers, team leads, architects, and support specialists
        </p>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={employees}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search by name, ID, email, role, or position..."
        searchKeys={['name', 'employeeId', 'email', 'role', 'position', 'manager']}
        pageSize={15}
        onRowClick={handleRowClick}
        title="Master Operational Workforce"
        subtitle="Click any row to open the complete employee profile and assignment history"
        exportFilename="ncgr_resource_data"
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

export default ResourceRoster;
