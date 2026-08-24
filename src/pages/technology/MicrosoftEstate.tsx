import React from 'react';
import DataTable, { type ColumnDef } from '../../components/common/DataTable';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { IT_SUPPORT_TOOLS_SIBLINGS } from './ITSupportToolsLandingPage';

interface MicrosoftService {
  id: string;
  name: string;
  category: 'Productivity' | 'Identity & Security' | 'Endpoint Management' | 'Analytics' | 'Collaboration';
  activeSeats: string;
  licenseTier: string;
  serviceHealth: '100% Operational' | 'Advisory' | 'Degraded';
  storageOrUsage: string;
  status: 'Healthy' | 'Warning';
  lead: string;
}

const msServices: MicrosoftService[] = [
  { id: 'MS-01', name: 'Microsoft 365 E5 Suite', category: 'Productivity', activeSeats: '1,347 / 1,400 Licenses', licenseTier: 'Enterprise E5', serviceHealth: '100% Operational', storageOrUsage: '68% In Use', status: 'Healthy', lead: 'Layla Hassan' },
  { id: 'MS-02', name: 'Exchange Online & Protection', category: 'Productivity', activeSeats: '1,347 Mailboxes', licenseTier: 'Exchange Online Plan 2', serviceHealth: '100% Operational', storageOrUsage: '4.2 TB Total Mail Storage', status: 'Healthy', lead: 'Layla Hassan' },
  { id: 'MS-03', name: 'Microsoft Teams & Phone System', category: 'Collaboration', activeSeats: '1,280 Daily Users', licenseTier: 'Teams Enterprise + Audio', serviceHealth: '100% Operational', storageOrUsage: '28 Teams Rooms Active', status: 'Healthy', lead: 'Layla Hassan' },
  { id: 'MS-04', name: 'Microsoft Intune Endpoint Manager', category: 'Endpoint Management', activeSeats: '950 Devices Enrolled', licenseTier: 'Intune Suite', serviceHealth: '100% Operational', storageOrUsage: '98.5% Patch Compliant', status: 'Healthy', lead: 'Layla Hassan' },
  { id: 'MS-05', name: 'PowerBI Premium Capacity', category: 'Analytics', activeSeats: 'P1 Node (8 vCores)', licenseTier: 'PowerBI Premium Capacity', serviceHealth: '100% Operational', storageOrUsage: '45 Shared Workspaces', status: 'Healthy', lead: 'Sara Al-Otaibi' },
  { id: 'MS-06', name: 'Entra ID (Azure AD P2)', category: 'Identity & Security', activeSeats: '1,347 Users', licenseTier: 'Entra ID Premium P2', serviceHealth: '100% Operational', storageOrUsage: 'Conditional Access 100%', status: 'Healthy', lead: 'Daniel Mathew' },
];

const MicrosoftEstate: React.FC = () => {
  const columns: ColumnDef<MicrosoftService>[] = [
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
      header: 'Microsoft 365 Service',
      accessorKey: 'name',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>Category: {row.category}</div>
        </div>
      ),
    },
    {
      header: 'Active Allocation & Tier',
      accessorKey: 'activeSeats',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.activeSeats}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>Tier: {row.licenseTier}</div>
        </div>
      ),
    },
    {
      header: 'Usage & Storage Scope',
      accessorKey: 'storageOrUsage',
      cell: (row) => <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{row.storageOrUsage}</span>,
    },
    {
      header: 'Lead Owner',
      accessorKey: 'lead',
      cell: (row) => <span style={{ fontWeight: 600 }}>{row.lead}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => (
        <span
          style={{
            padding: '3px 10px',
            borderRadius: 12,
            background: '#E3FCEF',
            color: '#22A06B',
            fontWeight: 700,
            fontSize: '0.75rem',
          }}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Sub-Page Header with Breadcrumb and Sibling Navigation */}
      <SubPageHeader
        moduleTitle="IT Support Tool Management"
        modulePath="/technology"
        pageTitle="Microsoft Estate"
        siblingPages={IT_SUPPORT_TOOLS_SIBLINGS}
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
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Active E5 Licenses</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>1,347 / 1,400</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>96.2% active seat usage</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>M365 Tenant Uptime</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>99.99%</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>All Microsoft clouds green</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#074A76', textTransform: 'uppercase' }}>Intune Managed Fleet</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 4 }}>950 devices</div>
          <div style={{ fontSize: '0.75rem', color: '#074A76', marginTop: 2, fontWeight: 600 }}>Windows 11 & Mobile</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={msServices}
        columns={columns}
        searchPlaceholder="Search Microsoft 365 services, categories, lead..."
        searchKeys={['name', 'category', 'lead', 'licenseTier', 'id']}
        pageSize={10}
        title="Enterprise Microsoft Estate Services"
        subtitle="Live tenant allocations and operational health status"
        exportFilename="ncgr_microsoft_estate"
      />
    </div>
  );
};

export default MicrosoftEstate;
