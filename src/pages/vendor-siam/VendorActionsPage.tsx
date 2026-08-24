import React from 'react';
import { useDataStore } from '../../data/mockDataStore';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import type { VendorAction } from '../../data/vendorData';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { VENDOR_SIAM_SIBLINGS } from './VendorSIAMLandingPage';
const VendorActionsPage: React.FC = () => {
  const { vendorActions } = useDataStore();

  const openCount = vendorActions.filter(a => a.status === 'Open').length;
  const inProgressCount = vendorActions.filter(a => a.status === 'In Progress').length;
  const overdueCount = vendorActions.filter(a => a.status === 'Overdue').length;
  const completedCount = vendorActions.filter(a => a.status === 'Completed').length;

  const columns: ColumnDef<VendorAction>[] = [
    {
      header: 'Action ID',
      accessorKey: 'id',
      width: '100px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Vendor & Action Item',
      accessorKey: 'actionDescription',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.actionDescription}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>
            Vendor: {row.vendor} • Ref: {row.relatedRiskOrContract}
          </div>
        </div>
      ),
    },
    {
      header: 'Assigned Owner',
      accessorKey: 'owner',
      cell: (row) => <span style={{ fontWeight: 600 }}>{row.owner}</span>,
    },
    {
      header: 'Priority',
      accessorKey: 'priority',
      cell: (row) => (
        <span
          style={{
            padding: '2px 8px',
            borderRadius: 4,
            background: row.priority === 'Critical' ? '#FFEBE6' : row.priority === 'High' ? '#FFF7E6' : '#E6F4FC',
            color: row.priority === 'Critical' ? '#DE350B' : row.priority === 'High' ? '#E97F0A' : '#074A76',
            fontWeight: 800,
            fontSize: '0.6875rem',
            textTransform: 'uppercase',
          }}
        >
          {row.priority}
        </span>
      ),
    },
    {
      header: 'Due Date & Aging',
      accessorKey: 'dueDate',
      cell: (row) => (
        <div>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{row.dueDate}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>Age: {row.aging}</div>
        </div>
      ),
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

  const uniqueVendors = Array.from(new Set(vendorActions.map(a => a.vendor))).map(v => ({ label: v, value: v }));

  const filters: FilterDef<VendorAction>[] = [
    { key: 'vendor', label: 'Vendors', options: uniqueVendors },
    {
      key: 'priority',
      label: 'Priorities',
      options: [
        { label: 'Critical', value: 'Critical' },
        { label: 'High', value: 'High' },
        { label: 'Medium', value: 'Medium' },
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
        moduleTitle="Vendor & SIAM"
        modulePath="/vendor-siam"
        pageTitle="Vendor Actions"
        siblingPages={VENDOR_SIAM_SIBLINGS}
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
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Total Action Items</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{vendorActions.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Across 16 vendors</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#074A76', textTransform: 'uppercase' }}>In Progress / Open</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 4 }}>{inProgressCount + openCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#074A76', marginTop: 2, fontWeight: 600 }}>Active negotiation</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>Overdue Actions</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{overdueCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', marginTop: 2, fontWeight: 600 }}>Escalation flagged</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>Completed Actions</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>{completedCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>Verified fulfilled</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={vendorActions}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search vendor actions by vendor, description, owner..."
        searchKeys={['vendor', 'actionDescription', 'owner', 'relatedRiskOrContract', 'id']}
        pageSize={10}
        title="Vendor Action Register"
        subtitle="Mandatory corrective actions and commercial deliverables"
        exportFilename="ncgr_vendor_actions"
      />
    </div>
  );
};

export default VendorActionsPage;
