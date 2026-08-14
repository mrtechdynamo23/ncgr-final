import React, { useState } from 'react';
import { appIncidentsList, type AppIncidentRecord } from '../../data/master-applications';
import { ApplicationDetailModal } from '../../components/common/ApplicationDetailModal';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';

const ApplicationIncidentsPage: React.FC = () => {
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const p1Count = appIncidentsList.filter(i => i.priority === 'P1').length;
  const p2Count = appIncidentsList.filter(i => i.priority === 'P2').length;
  const inProgressCount = appIncidentsList.filter(i => i.currentStatus === 'In Progress' || i.currentStatus === 'Major Incident').length;

  const columns: ColumnDef<AppIncidentRecord>[] = [
    {
      header: 'Incident ID',
      accessorKey: 'incidentNumber',
      width: '110px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.incidentNumber}
        </span>
      ),
    },
    {
      header: 'Priority',
      accessorKey: 'priority',
      width: '80px',
      cell: (row) => (
        <span
          style={{
            padding: '2px 8px',
            borderRadius: 4,
            fontWeight: 800,
            fontSize: '0.6875rem',
            background: row.priority === 'P1' ? '#FFEBE6' : row.priority === 'P2' ? '#FFF7E6' : '#E6F4FC',
            color: row.priority === 'P1' ? '#DE350B' : row.priority === 'P2' ? '#E97F0A' : '#074A76',
          }}
        >
          {row.priority}
        </span>
      ),
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
      header: 'Assigned Engineer',
      accessorKey: 'assignedEngineer',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.assignedEngineer}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>Group: {row.assignmentGroup}</div>
        </div>
      ),
    },
    {
      header: 'Age',
      accessorKey: 'age',
      cell: (row) => <span style={{ fontFamily: 'monospace', fontSize: '0.8125rem', fontWeight: 600 }}>{row.age}</span>,
    },
    {
      header: 'Related Problem / Ref',
      accessorKey: 'servicenowRef',
      cell: (row) => (
        <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#074A76' }}>
          {row.relatedProblem || row.servicenowRef}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'currentStatus',
      cell: (row) => {
        const bg = row.currentStatus === 'Resolved' ? '#E3FCEF' : row.currentStatus === 'In Progress' ? '#E6F4FC' : '#FFEBE6';
        const color = row.currentStatus === 'Resolved' ? '#22A06B' : row.currentStatus === 'In Progress' ? '#074A76' : '#DE350B';
        return (
          <span
            className="status-badge"
            style={{
              background: bg,
              color: color,
            }}
          >
            {row.currentStatus}
          </span>
        );
      },
    },
  ];

  const uniqueApps = Array.from(new Set(appIncidentsList.map(a => a.appName))).map(a => ({ label: a, value: a }));

  const filters: FilterDef<AppIncidentRecord>[] = [
    {
      key: 'priority',
      label: 'Priorities',
      options: [
        { label: 'P1 Critical', value: 'P1' },
        { label: 'P2 High', value: 'P2' },
        { label: 'P3 Medium', value: 'P3' },
        { label: 'P4 Low', value: 'P4' },
      ],
    },
    { key: 'appName', label: 'Applications', options: uniqueApps },
    {
      key: 'currentStatus',
      label: 'Statuses',
      options: [
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Major Incident', value: 'Major Incident' },
        { label: 'Monitoring', value: 'Monitoring' },
        { label: 'Resolved', value: 'Resolved' },
      ],
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 4px' }}>
          Application Operations Incidents
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #475467)', margin: 0 }}>
          ServiceNow application ticket telemetry, P1/P2 active major incidents, MTTR tracking, and engineer assignment
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
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Active App Incidents</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{appIncidentsList.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Across 48 applications</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>P1 Critical / P2 Major</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{p1Count} / {p2Count}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', marginTop: 2, fontWeight: 600 }}>Active bridge focus</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#074A76', textTransform: 'uppercase' }}>In Progress</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 4 }}>{inProgressCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#074A76', marginTop: 2, fontWeight: 600 }}>Assigned to L2/L3</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={appIncidentsList}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search incidents by ID, app, description, engineer..."
        searchKeys={['incidentNumber', 'appName', 'description', 'assignedEngineer', 'servicenowRef']}
        pageSize={10}
        title="Application Incident Feed"
        subtitle="Click any application name to inspect architecture, dependencies, and owners"
        exportFilename="ncgr_app_incidents"
      />

      {/* App Detail Modal */}
      {selectedAppId && (
        <ApplicationDetailModal
          appId={selectedAppId}
          onClose={() => setSelectedAppId(null)}
        />
      )}
    </div>
  );
};

export default ApplicationIncidentsPage;
