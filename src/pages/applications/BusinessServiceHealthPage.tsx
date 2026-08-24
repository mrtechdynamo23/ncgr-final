import React from 'react';
import { masterBusinessServices, type BusinessServiceRecord } from '../../data/master-applications';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { APPLICATION_SERVICES_SIBLINGS } from './ApplicationServicesLandingPage';

const BusinessServiceHealthPage: React.FC = () => {
  const healthyCount = masterBusinessServices.filter(s => s.currentState === 'Healthy').length;
  const degradedCount = masterBusinessServices.filter(s => s.currentState === 'Degraded').length;
  const criticalCount = masterBusinessServices.filter(s => s.currentState === 'Critical').length;

  const columns: ColumnDef<BusinessServiceRecord>[] = [
    {
      header: 'Service ID',
      accessorKey: 'id',
      width: '100px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Business Service & Scope',
      accessorKey: 'name',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', marginTop: 2 }}>{row.description}</div>
        </div>
      ),
    },
    {
      header: 'Criticality',
      accessorKey: 'criticality',
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
      header: 'Availability',
      accessorKey: 'availability',
      cell: (row) => {
        const num = parseFloat(row.availability.replace('%', '')) || 0;
        return (
          <div style={{ minWidth: 90 }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: num >= 99.9 ? '#22A06B' : '#E97F0A', marginBottom: 2 }}>
              {row.availability}
            </div>
            <div style={{ height: 4, width: '100%', background: 'var(--bg-secondary, #F7F8FA)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${Math.min(100, num)}%`, background: num >= 99.9 ? '#40904F' : '#E97F0A' }} />
            </div>
          </div>
        );
      },
    },
    {
      header: 'Supporting Applications',
      accessorKey: 'supportingAppsCount',
      cell: (row) => (
        <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
          {row.supportingAppsCount} Applications
        </span>
      ),
    },
    {
      header: 'Service Owner Lead',
      accessorKey: 'owner',
      cell: (row) => <span style={{ fontWeight: 600 }}>{row.owner}</span>,
    },
    {
      header: 'State',
      accessorKey: 'currentState',
      cell: (row) => {
        const bg = row.currentState === 'Healthy' ? '#E3FCEF' : row.currentState === 'Degraded' ? '#FFF7E6' : '#FFEBE6';
        const color = row.currentState === 'Healthy' ? '#22A06B' : row.currentState === 'Degraded' ? '#E97F0A' : '#DE350B';
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
            {row.currentState}
          </span>
        );
      },
    },
  ];

  const filters: FilterDef<BusinessServiceRecord>[] = [
    {
      key: 'currentState',
      label: 'Health State',
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
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Sub-Page Header with Breadcrumb and Sibling Navigation */}
      <SubPageHeader
        moduleTitle="Application Services"
        modulePath="/applications"
        pageTitle="Business Service Health"
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
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Business Services</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{masterBusinessServices.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Core government capabilities</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>Healthy Services</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>{healthyCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>Normal SLA operating</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E97F0A', textTransform: 'uppercase' }}>Degraded / Alert</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E97F0A', marginTop: 4 }}>{degradedCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#E97F0A', marginTop: 2, fontWeight: 600 }}>Under monitoring</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>Critical Services</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{criticalCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', marginTop: 2, fontWeight: 600 }}>Requires management focus</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={masterBusinessServices}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search business services, owners, descriptions..."
        searchKeys={['name', 'owner', 'criticality', 'description', 'id']}
        pageSize={10}
        title="Active Business Services Register"
        subtitle="Live SLA telemetry and application mapping"
        exportFilename="ncgr_business_services"
      />
    </div>
  );
};

export default BusinessServiceHealthPage;
