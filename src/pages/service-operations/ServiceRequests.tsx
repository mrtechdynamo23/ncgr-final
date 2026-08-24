import React, { useState } from 'react';
import { useDataStore } from '../../data/mockDataStore';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import type { ServiceRequest } from '../../data/serviceRequests';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { COMMAND_CENTER_SIBLINGS } from './CommandCenterLandingPage';

const ServiceRequests: React.FC = () => {
  const { serviceRequests } = useDataStore();
  const [filteredRequests, setFilteredRequests] = useState<ServiceRequest[]>(serviceRequests);

  const totalRequests = filteredRequests.length;
  const openCount = filteredRequests.filter(r => r.status === 'Open' || r.status === 'In Progress').length;
  const fulfilledCount = filteredRequests.filter(r => r.status === 'Fulfilled' || r.status === 'Closed').length;
  const highPriorityCount = filteredRequests.filter(r => r.priority === 'Critical' || r.priority === 'High').length;

  const columns: ColumnDef<ServiceRequest>[] = [
    {
      header: 'Request ID',
      accessorKey: 'id',
      width: '110px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Request Type & Item',
      accessorKey: 'requestType',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.requestType}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>{row.catalogItem}</div>
        </div>
      ),
    },
    {
      header: 'Requested By & Dept',
      accessorKey: 'requestedBy',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.requestedBy}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>{row.department}</div>
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
      header: 'Assigned Engineer',
      accessorKey: 'assignedEngineer',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.assignedEngineer}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)' }}>{row.assignmentGroup}</div>
        </div>
      ),
    },
    {
      header: 'Priority',
      accessorKey: 'priority',
      cell: (row) => {
        const bg = row.priority === 'Critical' ? '#FFEBE6' : row.priority === 'High' ? '#FFF7E6' : '#E6F4FC';
        const color = row.priority === 'Critical' ? '#DE350B' : row.priority === 'High' ? '#E97F0A' : '#074A76';
        return (
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 4,
              background: bg,
              color: color,
              fontWeight: 700,
              fontSize: '0.6875rem',
              textTransform: 'uppercase',
            }}
          >
            {row.priority}
          </span>
        );
      },
    },
    {
      header: 'Aging & Due Date',
      accessorKey: 'aging',
      cell: (row) => (
        <div>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Due: {row.dueDate}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>Age: {row.aging}</div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
        const bg = row.status === 'Fulfilled' || row.status === 'Closed' ? '#E3FCEF' : row.status === 'In Progress' ? '#E6F4FC' : '#FFF7E6';
        const color = row.status === 'Fulfilled' || row.status === 'Closed' ? '#22A06B' : row.status === 'In Progress' ? '#074A76' : '#E97F0A';
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

  const uniqueTowers = Array.from(new Set(serviceRequests.map((e: ServiceRequest) => e.tower))).filter(Boolean).map(t => ({ label: String(t), value: String(t) }));
  const uniqueTypes = Array.from(new Set(serviceRequests.map((e: ServiceRequest) => e.requestType))).filter(Boolean).map(t => ({ label: String(t), value: String(t) }));
  const uniqueDepts = Array.from(new Set(serviceRequests.map((e: ServiceRequest) => e.department))).filter(Boolean).map(d => ({ label: String(d), value: String(d) }));

  const filters: FilterDef<ServiceRequest>[] = [
    { key: 'tower', label: 'Towers', options: uniqueTowers },
    { key: 'requestType', label: 'Request Types', options: uniqueTypes },
    { key: 'department', label: 'Departments', options: uniqueDepts },
    {
      key: 'status',
      label: 'Statuses',
      options: [
        { label: 'Open', value: 'Open' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Fulfilled', value: 'Fulfilled' },
        { label: 'Closed', value: 'Closed' },
      ],
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Sub-Page Header with Breadcrumb and Sibling Navigation */}
      <SubPageHeader
        moduleTitle="Command Center"
        modulePath="/command-center"
        pageTitle="Service Requests"
        siblingPages={COMMAND_CENTER_SIBLINGS}
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
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Total Requests</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{totalRequests}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>
            {totalRequests === serviceRequests.length ? 'Service catalog tickets' : `Filtered (${totalRequests} of ${serviceRequests.length})`}
          </div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E97F0A', textTransform: 'uppercase' }}>In Fulfillment / Open</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E97F0A', marginTop: 4 }}>{openCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Within SLA target</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>Fulfilled / Closed</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>{fulfilledCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>100% Completed</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>High Priority</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{highPriorityCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>VIP & Critical queue</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={serviceRequests}
        columns={columns}
        filters={filters}
        onFilteredDataChange={setFilteredRequests}
        searchPlaceholder="Search requests by ID, user, department, catalog item..."
        searchKeys={['id', 'requestedBy', 'department', 'catalogItem', 'requestType', 'assignedEngineer']}
        pageSize={15}
        title="Active Service Requests Registry"
        subtitle="End-user service requests, hardware deliveries, and access provisioning"
        exportFilename="ncgr_service_requests"
      />
    </div>
  );
};

export default ServiceRequests;
