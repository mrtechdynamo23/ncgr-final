import React, { useState } from 'react';
import { useDataStore } from '../../data/mockDataStore';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import type { LeaveRecord } from '../../data/master-employees';
import { Check, X, UserCheck, CheckCircle2 } from 'lucide-react';

const LeaveManagement: React.FC = () => {
  const { leaveRecords, approveLeave, rejectLeave } = useDataStore();
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  const handleApprove = (id: string, name: string) => {
    approveLeave(id);
    showFeedback(`Leave request ${id} for ${name} has been APPROVED. System updated.`);
  };

  const handleReject = (id: string, name: string) => {
    rejectLeave(id);
    showFeedback(`Leave request ${id} for ${name} has been REJECTED.`);
  };

  const filteredRecords = leaveRecords.filter(r => {
    if (activeTab === 'pending') return r.status === 'Pending';
    if (activeTab === 'approved') return r.status === 'Approved';
    if (activeTab === 'rejected') return r.status === 'Rejected' || r.status === 'Cancelled';
    return true;
  });

  const pendingCount = leaveRecords.filter(l => l.status === 'Pending').length;
  const approvedCount = leaveRecords.filter(l => l.status === 'Approved').length;
  const rejectedCount = leaveRecords.filter(l => l.status === 'Rejected' || l.status === 'Cancelled').length;

  const columns: ColumnDef<LeaveRecord>[] = [
    {
      header: 'Request ID',
      accessorKey: 'id',
      width: '100px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Employee Name',
      accessorKey: 'employee',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.employee}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>{row.employeeId}</div>
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
      header: 'Leave Type',
      accessorKey: 'leaveType',
      cell: (row) => (
        <span style={{ fontWeight: 600, color: 'var(--text, #101828)' }}>
          {row.leaveType}
        </span>
      ),
    },
    {
      header: 'Duration',
      accessorKey: 'days',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>
            {row.days} day{row.days > 1 ? 's' : ''}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
            {row.startDate} → {row.endDate}
          </div>
        </div>
      ),
    },
    {
      header: 'Reason',
      accessorKey: 'reason',
      cell: (row) => (
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)' }}>
          {row.reason}
        </span>
      ),
    },
    {
      header: 'Backup Resource',
      accessorKey: 'backupResource',
      cell: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8125rem', color: '#074A76', fontWeight: 600 }}>
          <UserCheck size={14} color="#40904F" />
          <span>{row.backupResource}</span>
        </div>
      ),
    },
    {
      header: 'Approver',
      accessorKey: 'approver',
      cell: (row) => (
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)' }}>
          {row.approver}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
        const bg = row.status === 'Approved' ? '#E3FCEF' : row.status === 'Pending' ? '#FFF7E6' : '#FFEBE6';
        const color = row.status === 'Approved' ? '#22A06B' : row.status === 'Pending' ? '#E97F0A' : '#DE350B';
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
    {
      header: 'Action',
      sortable: false,
      width: '140px',
      cell: (row) => {
        if (row.status === 'Pending') {
          return (
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                onClick={() => handleApprove(row.id, row.employee)}
                style={{
                  padding: '5px 10px',
                  borderRadius: 6,
                  background: '#22A06B',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
                title="Approve leave"
              >
                <Check size={12} />
                <span>Approve</span>
              </button>
              <button
                onClick={() => handleReject(row.id, row.employee)}
                style={{
                  padding: '5px 10px',
                  borderRadius: 6,
                  background: '#FFEBE6',
                  color: '#DE350B',
                  border: '1px solid rgba(222, 53, 11, 0.3)',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
                title="Reject leave"
              >
                <X size={12} />
                <span>Reject</span>
              </button>
            </div>
          );
        }
        return (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', fontStyle: 'italic' }}>
            Processed
          </span>
        );
      },
    },
  ];

  const uniqueTowers = Array.from(new Set(leaveRecords.map(e => e.tower))).map(t => ({ label: t, value: t }));
  const uniqueTypes = Array.from(new Set(leaveRecords.map(e => e.leaveType))).map(t => ({ label: t, value: t }));

  const filters: FilterDef<LeaveRecord>[] = [
    { key: 'tower', label: 'Towers', options: uniqueTowers },
    { key: 'leaveType', label: 'Leave Types', options: uniqueTypes },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Page Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 4px' }}>
          Leave Management & Approvals
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #475467)', margin: 0 }}>
          Workforce availability assurance, leave workflow transitions, and standby resource backup coverage
        </p>
      </div>

      {/* Real-time Feedback Toast */}
      {feedbackMessage && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 8,
            background: 'rgba(64, 144, 79, 0.15)',
            border: '1px solid rgba(64, 144, 79, 0.4)',
            color: '#22A06B',
            fontWeight: 700,
            fontSize: '0.875rem',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            animation: 'fadeIn 0.2s ease-in',
          }}
        >
          <CheckCircle2 size={18} />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* KPI Cards Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div
          className="card"
          onClick={() => setActiveTab('pending')}
          style={{
            padding: 16,
            borderRadius: 10,
            background: 'var(--card-bg, #FFFFFF)',
            border: activeTab === 'pending' ? '2px solid #E97F0A' : '1px solid var(--border, #E4E7EC)',
            cursor: 'pointer',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E97F0A', textTransform: 'uppercase' }}>
            Pending Review
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E97F0A', marginTop: 4 }}>
            {pendingCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>
            Requires lead action
          </div>
        </div>

        <div
          className="card"
          onClick={() => setActiveTab('approved')}
          style={{
            padding: 16,
            borderRadius: 10,
            background: 'var(--card-bg, #FFFFFF)',
            border: activeTab === 'approved' ? '2px solid #22A06B' : '1px solid var(--border, #E4E7EC)',
            cursor: 'pointer',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>
            Approved Leaves
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>
            {approvedCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>
            Backups assigned
          </div>
        </div>

        <div
          className="card"
          onClick={() => setActiveTab('rejected')}
          style={{
            padding: 16,
            borderRadius: 10,
            background: 'var(--card-bg, #FFFFFF)',
            border: activeTab === 'rejected' ? '2px solid #DE350B' : '1px solid var(--border, #E4E7EC)',
            cursor: 'pointer',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>
            Rejected / Cancelled
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>
            {rejectedCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>
            Closed requests
          </div>
        </div>

        <div
          className="card"
          onClick={() => setActiveTab('all')}
          style={{
            padding: 16,
            borderRadius: 10,
            background: 'var(--card-bg, #FFFFFF)',
            border: activeTab === 'all' ? '2px solid #074A76' : '1px solid var(--border, #E4E7EC)',
            cursor: 'pointer',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ncgr-deep-blue, #074A76)', textTransform: 'uppercase' }}>
            All Records
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>
            {leaveRecords.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>
            Historical audit trail
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 16,
          borderBottom: '1px solid var(--border, #E4E7EC)',
          paddingBottom: 8,
        }}
      >
        <button
          onClick={() => setActiveTab('pending')}
          style={{
            padding: '6px 14px',
            borderRadius: 6,
            background: activeTab === 'pending' ? '#E97F0A' : 'transparent',
            color: activeTab === 'pending' ? '#FFFFFF' : 'var(--text-secondary, #475467)',
            fontWeight: 700,
            fontSize: '0.8125rem',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Pending Approvals ({pendingCount})
        </button>
        <button
          onClick={() => setActiveTab('approved')}
          style={{
            padding: '6px 14px',
            borderRadius: 6,
            background: activeTab === 'approved' ? '#22A06B' : 'transparent',
            color: activeTab === 'approved' ? '#FFFFFF' : 'var(--text-secondary, #475467)',
            fontWeight: 700,
            fontSize: '0.8125rem',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Approved ({approvedCount})
        </button>
        <button
          onClick={() => setActiveTab('rejected')}
          style={{
            padding: '6px 14px',
            borderRadius: 6,
            background: activeTab === 'rejected' ? '#DE350B' : 'transparent',
            color: activeTab === 'rejected' ? '#FFFFFF' : 'var(--text-secondary, #475467)',
            fontWeight: 700,
            fontSize: '0.8125rem',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Rejected ({rejectedCount})
        </button>
        <button
          onClick={() => setActiveTab('all')}
          style={{
            padding: '6px 14px',
            borderRadius: 6,
            background: activeTab === 'all' ? 'var(--ncgr-deep-blue, #074A76)' : 'transparent',
            color: activeTab === 'all' ? '#FFFFFF' : 'var(--text-secondary, #475467)',
            fontWeight: 700,
            fontSize: '0.8125rem',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          All Requests ({leaveRecords.length})
        </button>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={filteredRecords}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search by employee name, ID, tower, or reason..."
        searchKeys={['employee', 'employeeId', 'tower', 'reason', 'backupResource', 'approver']}
        pageSize={12}
        title={`${activeTab.toUpperCase()} LEAVE REQUESTS`}
        subtitle="Manage leave workflows and backup assignments in real-time"
        exportFilename={`ncgr_leave_${activeTab}`}
      />
    </div>
  );
};

export default LeaveManagement;
