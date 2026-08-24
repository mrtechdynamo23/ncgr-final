import React from 'react';
import DataTable, { type ColumnDef } from '../../components/common/DataTable';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { IT_SUPPORT_TOOLS_SIBLINGS } from './ITSupportToolsLandingPage';

interface CloudPlatformItem {
  id: string;
  name: string;
  provider: string;
  serviceTier: string;
  primaryWorkload: string;
  region: string;
  uptimeSLA: string;
  monthlySAR: number;
  status: 'Healthy' | 'Warning';
  lead: string;
}

const cloudPlatformsList: CloudPlatformItem[] = [
  { id: 'CP-01', name: 'Google Cloud Organization (NCGR-Root)', provider: 'Google Cloud (GCP)', serviceTier: 'Enterprise Support', primaryWorkload: 'Citizen Portal Microservices & Storage', region: 'me-central2 (Dammam)', uptimeSLA: '99.99%', monthlySAR: 60900, status: 'Healthy', lead: 'Priya Nair' },
  { id: 'CP-02', name: 'Microsoft Azure Enterprise Agreement', provider: 'Microsoft Azure', serviceTier: 'Premier Support', primaryWorkload: 'Hybrid Integration APIs & Analytics', region: 'Qatar Central', uptimeSLA: '99.95%', monthlySAR: 67000, status: 'Healthy', lead: 'Priya Nair' },
  { id: 'CP-03', name: 'Oracle Cloud Infrastructure (OCI FastConnect)', provider: 'Oracle Cloud', serviceTier: 'Enterprise Dedicated', primaryWorkload: 'Oracle Exadata Cloud Backup Sync', region: 'Jeddah Cloud Region', uptimeSLA: '99.99%', monthlySAR: 25000, status: 'Healthy', lead: 'Omar Al-Mutairi' },
  { id: 'CP-04', name: 'Red Hat OpenShift Dedicated', provider: 'Red Hat Cloud', serviceTier: 'Managed Dedicated', primaryWorkload: 'Enterprise Container Management', region: 'On-Prem Hybrid', uptimeSLA: '99.95%', monthlySAR: 32000, status: 'Healthy', lead: 'Priya Nair' },
];

const CloudPlatforms: React.FC = () => {
  const totalSpendSAR = cloudPlatformsList.reduce((s, c) => s + c.monthlySAR, 0);

  const columns: ColumnDef<CloudPlatformItem>[] = [
    {
      header: 'Account ID',
      accessorKey: 'id',
      width: '100px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Cloud Platform & Account',
      accessorKey: 'name',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>
            Provider: {row.provider} • Region: {row.region}
          </div>
        </div>
      ),
    },
    {
      header: 'Primary Workload Scope',
      accessorKey: 'primaryWorkload',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.primaryWorkload}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>Tier: {row.serviceTier}</div>
        </div>
      ),
    },
    {
      header: 'Monthly Spend (SAR)',
      accessorKey: 'monthlySAR',
      cell: (row) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)' }}>
          {row.monthlySAR.toLocaleString()} SAR/mo
        </span>
      ),
    },
    {
      header: 'Uptime SLA',
      accessorKey: 'uptimeSLA',
      cell: (row) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#22A06B' }}>
          {row.uptimeSLA}
        </span>
      ),
    },
    {
      header: 'Cloud Lead',
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
        pageTitle="Cloud Platforms"
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
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Active Hyperscalers</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>3 Clouds</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>GCP, Azure, OCI FastConnect</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Combined Monthly Spend</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>
            {totalSpendSAR.toLocaleString()} SAR
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Direct subscription billing</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>SLA Target Attainment</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>99.98%</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>All clouds operational</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={cloudPlatformsList}
        columns={columns}
        searchPlaceholder="Search cloud accounts, providers, regions, leads..."
        searchKeys={['name', 'provider', 'lead', 'primaryWorkload', 'id']}
        pageSize={10}
        title="Enterprise Multi-Cloud Subscriptions"
        subtitle="Live hyperscaler account contracts and operational governance"
        exportFilename="ncgr_cloud_platforms"
      />
    </div>
  );
};

export default CloudPlatforms;
