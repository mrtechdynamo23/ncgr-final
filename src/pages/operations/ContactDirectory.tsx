import React, { useState } from 'react';
import { useDataStore } from '../../data/mockDataStore';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import EmployeeDetailModal from '../../components/common/EmployeeDetailModal';
import type { MasterEmployee } from '../../data/master-employees';
import { Phone, Mail, Eye, EyeOff } from 'lucide-react';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { TEAM_OVERVIEW_SIBLINGS } from './TeamOverviewLandingPage';

const ContactDirectory: React.FC = () => {
  const { employees } = useDataStore();
  const [selectedEmployee, setSelectedEmployee] = useState<MasterEmployee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [revealedPhones, setRevealedPhones] = useState<Set<string>>(new Set());

  const togglePhoneReveal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRevealedPhones((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const maskPhone = (phone: string, isRevealed: boolean) => {
    if (isRevealed) return phone;
    // Format: +966 55 284 7316 -> +966 55 ••• ••16
    const parts = phone.split(' ');
    if (parts.length >= 4) {
      return `${parts[0]} ${parts[1]} ••• ••${parts[3].slice(-2)}`;
    }
    return phone.slice(0, 7) + '••••' + phone.slice(-2);
  };

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
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>{row.role}</div>
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
      header: 'Reporting Manager',
      accessorKey: 'manager',
    },
    {
      header: 'Official Email',
      accessorKey: 'email',
      cell: (row) => (
        <a
          href={`mailto:${row.email}`}
          onClick={(e) => e.stopPropagation()}
          style={{
            color: 'var(--ncgr-deep-blue, #074A76)',
            textDecoration: 'none',
            fontSize: '0.8125rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Mail size={13} />
          <span>{row.email}</span>
        </a>
      ),
    },
    {
      header: 'Mobile (Protected)',
      accessorKey: 'mobile',
      cell: (row) => {
        const isRevealed = revealedPhones.has(row.employeeId);
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.8125rem', fontWeight: 600 }}>
              {maskPhone(row.mobile, isRevealed)}
            </span>
            <button
              onClick={(e) => togglePhoneReveal(row.employeeId, e)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isRevealed ? 'var(--ncgr-mint-green, #40904F)' : 'var(--text-tertiary, #98A2B3)',
                padding: 2,
                display: 'flex',
                alignItems: 'center',
              }}
              title={isRevealed ? 'Hide phone' : 'Click to unmask authorized phone'}
            >
              {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        );
      },
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => (
        <span
          style={{
            padding: '2px 8px',
            borderRadius: 12,
            background: row.status === 'Active' ? '#E3FCEF' : row.status === 'On Leave' ? '#FFF7E6' : '#E6F4FC',
            color: row.status === 'Active' ? '#22A06B' : row.status === 'On Leave' ? '#E97F0A' : '#4AA6DC',
            fontWeight: 700,
            fontSize: '0.6875rem',
          }}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: 'Actions',
      sortable: false,
      width: '100px',
      cell: (row) => (
        <div style={{ display: 'flex', gap: 6 }}>
          <a
            href={`mailto:${row.email}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              padding: 5,
              borderRadius: 4,
              background: 'var(--bg-secondary, #F7F8FA)',
              border: '1px solid var(--border, #E4E7EC)',
              color: 'var(--ncgr-deep-blue, #074A76)',
              display: 'flex',
              alignItems: 'center',
            }}
            title="Send Email"
          >
            <Mail size={13} />
          </a>
          <a
            href={`tel:${row.mobile.replace(/ /g, '')}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              padding: 5,
              borderRadius: 4,
              background: 'rgba(64, 144, 79, 0.1)',
              border: '1px solid rgba(64, 144, 79, 0.3)',
              color: '#40904F',
              display: 'flex',
              alignItems: 'center',
            }}
            title="Call Engineer"
          >
            <Phone size={13} />
          </a>
        </div>
      ),
    },
  ];

  const uniqueTowers = Array.from(new Set(employees.map(e => e.tower))).map(t => ({ label: t, value: t }));
  const uniqueDepartments = Array.from(new Set(employees.map(e => e.department))).map(d => ({ label: d, value: d }));

  const filters: FilterDef<MasterEmployee>[] = [
    { key: 'tower', label: 'Towers', options: uniqueTowers },
    { key: 'department', label: 'Departments', options: uniqueDepartments },
    {
      key: 'status',
      label: 'Statuses',
      options: [
        { label: 'Active', value: 'Active' },
        { label: 'On Leave', value: 'On Leave' },
        { label: 'Training', value: 'Training' },
        { label: 'Remote', value: 'Remote' },
      ],
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Sub-Page Header with Breadcrumb and Sibling Navigation */}
      <SubPageHeader
        moduleTitle="Team Overview"
        modulePath="/team-overview"
        pageTitle="Contact Directory"
        siblingPages={TEAM_OVERVIEW_SIBLINGS}
      />

      {/* Main DataTable */}
      <DataTable
        data={employees}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search by name, ID, email, role, or phone..."
        searchKeys={['name', 'employeeId', 'email', 'mobile', 'role', 'manager']}
        pageSize={15}
        onRowClick={handleRowClick}
        title="Enterprise Contact Directory"
        subtitle="Click the eye icon to unmask phone numbers or click any row for complete employee profile"
        exportFilename="ncgr_contact_directory"
      />

      {/* Deep Employee Profile Modal */}
      <EmployeeDetailModal
        employee={selectedEmployee}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ContactDirectory;
