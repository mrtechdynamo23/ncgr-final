import React, { useState } from 'react';
import { masterApplications, type ApplicationRecord } from '../../data/master-applications';
import { ApplicationDetailModal } from '../../components/common/ApplicationDetailModal';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { APPLICATION_SERVICES_SIBLINGS } from './ApplicationServicesLandingPage';

const ApplicationHealthPage: React.FC = () => {
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const healthyCount = masterApplications.filter(a => a.health === 'Healthy').length;
  const degradedCount = masterApplications.filter(a => a.health === 'Degraded').length;
  const criticalCount = masterApplications.filter(a => a.health === 'Critical').length;
  const tier1Count = masterApplications.filter(a => a.criticality === 'Critical').length;

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
      header: 'Application Name & Stack',
      accessorKey: 'name',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>
            Stack: {row.technologyStack} • Host: {row.hosting}
          </div>
        </div>
      ),
    },
    {
      header: 'Criticality',
      accessorKey: 'criticality',
      width: '100px',
      cell: (row) => {
        const isCritical = row.criticality === 'Critical';
        return (
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 4,
              fontWeight: 700,
              fontSize: '0.6875rem',
              background: isCritical ? '#FFEBE6' : '#E6F4FC',
              color: isCritical ? '#DE350B' : '#074A76',
            }}
          >
            {row.criticality}
          </span>
        );
      },
    },
    {
      header: 'Business Service',
      accessorKey: 'businessService',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.businessService}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>Domain: {row.businessDomain}</div>
        </div>
      ),
    },
    {
      header: 'Availability',
      accessorKey: 'availability',
      cell: (row) => (
        <div style={{ minWidth: 90 }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: row.availabilityVal >= 99.9 ? '#22A06B' : row.availabilityVal >= 99.0 ? '#E97F0A' : '#DE350B', marginBottom: 2 }}>
            {row.availability}
          </div>
          <div style={{ height: 4, width: '100%', background: 'var(--bg-secondary, #F7F8FA)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.min(100, row.availabilityVal)}%`, background: row.availabilityVal >= 99.9 ? '#40904F' : '#E97F0A' }} />
          </div>
        </div>
      ),
    },
    {
      header: 'Active Incidents',
      accessorKey: 'activeIncidentsCount',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: row.activeIncidentsCount > 0 ? '#DE350B' : '#22A06B', fontSize: '0.8125rem' }}>
          {row.activeIncidentsCount} Incidents
        </span>
      ),
    },
    {
      header: 'IT Owner Lead',
      accessorKey: 'itOwner',
      cell: (row) => <span style={{ fontWeight: 600 }}>{row.itOwner}</span>,
    },
    {
      header: 'Health',
      accessorKey: 'health',
      cell: (row) => {
        const bg = row.health === 'Healthy' ? '#E3FCEF' : row.health === 'Degraded' ? '#FFF7E6' : '#FFEBE6';
        const color = row.health === 'Healthy' ? '#22A06B' : row.health === 'Degraded' ? '#E97F0A' : '#DE350B';
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
            {row.health}
          </span>
        );
      },
    },
  ];

  const uniqueDomains = Array.from(new Set(masterApplications.map(a => a.businessDomain))).map(d => ({ label: d, value: d }));
  const uniqueHosting = Array.from(new Set(masterApplications.map(a => a.hosting))).map(h => ({ label: h, value: h }));

  const filters: FilterDef<ApplicationRecord>[] = [
    {
      key: 'health',
      label: 'Health',
      options: [
        { label: 'Healthy', value: 'Healthy' },
        { label: 'Degraded', value: 'Degraded' },
        { label: 'Critical', value: 'Critical' },
      ],
    },
    {
      key: 'criticality',
      label: 'Criticality',
      options: [
        { label: 'Critical', value: 'Critical' },
        { label: 'High', value: 'High' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Low', value: 'Low' },
      ],
    },
    { key: 'businessDomain', label: 'Business Domains', options: uniqueDomains },
    { key: 'hosting', label: 'Hosting', options: uniqueHosting },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Sub-Page Header with Breadcrumb and Sibling Navigation */}
      <SubPageHeader
        moduleTitle="Application Services"
        modulePath="/applications"
        pageTitle="Application Health Portfolio"
        siblingPages={APPLICATION_SERVICES_SIBLINGS}
      />

      {/* KPI Cards Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Portfolio Scale</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{masterApplications.length} Apps</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>{tier1Count} Mission Critical</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>Healthy Applications</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>{healthyCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>Optimal availability</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E97F0A', textTransform: 'uppercase' }}>Degraded / Performance</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E97F0A', marginTop: 4 }}>{degradedCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#E97F0A', marginTop: 2, fontWeight: 600 }}>Gateway / pool alert</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>Critical Impact</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{criticalCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', marginTop: 2, fontWeight: 600 }}>Active bridge triage</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={masterApplications}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search apps by name, stack, service, owner, ID..."
        searchKeys={['name', 'technologyStack', 'businessService', 'businessDomain', 'itOwner', 'hosting', 'id']}
        pageSize={15}
        onRowClick={(row) => setSelectedAppId(row.id)}
        title="Enterprise Application Portfolio & Health Registry"
        subtitle="Click any application to open the complete architecture & operational detail modal"
        exportFilename="ncgr_application_portfolio"
      />

      {/* Application Detail Modal */}
      {selectedAppId && (
        <ApplicationDetailModal
          appId={selectedAppId}
          onClose={() => setSelectedAppId(null)}
        />
      )}
    </div>
  );
};

export default ApplicationHealthPage;
