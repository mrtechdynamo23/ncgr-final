import React from 'react';
import DataTable, { type ColumnDef } from '../../components/common/DataTable';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { IT_SUPPORT_TOOLS_SIBLINGS } from './ITSupportToolsLandingPage';

interface SecurityTool {
  id: string;
  name: string;
  category: 'Privileged Access (PAM)' | 'SIEM & SOC' | 'Endpoint Protection (EDR)' | 'Identity & MFA' | 'Vulnerability Scanner';
  toolVendor: string;
  monitoredAssets: string;
  policyStatus: string;
  complianceScore: number;
  status: 'Healthy' | 'Warning';
  lead: string;
}

const secTools: SecurityTool[] = [
  { id: 'SEC-01', name: 'BeyondTrust Password Safe PAM', category: 'Privileged Access (PAM)', toolVendor: 'BeyondTrust', monitoredAssets: '480 Privileged Accounts', policyStatus: 'Enforced 24h Rotation', complianceScore: 98, status: 'Healthy', lead: 'Daniel Mathew' },
  { id: 'SEC-02', name: 'CrowdStrike Falcon EDR', category: 'Endpoint Protection (EDR)', toolVendor: 'CrowdStrike', monitoredAssets: '1,150 Laptops & Servers', policyStatus: 'Real-time Sensor Active', complianceScore: 100, status: 'Healthy', lead: 'Daniel Mathew' },
  { id: 'SEC-03', name: 'Imperva SecureSphere DAM', category: 'SIEM & SOC', toolVendor: 'Imperva', monitoredAssets: '12 Core Databases', policyStatus: 'Audit Sensors Active', complianceScore: 95, status: 'Healthy', lead: 'Daniel Mathew' },
  { id: 'SEC-04', name: 'Tenable.io Vulnerability Management', category: 'Vulnerability Scanner', toolVendor: 'Tenable', monitoredAssets: '4,300 IP Endpoints', policyStatus: 'Weekly Full Baseline Scan', complianceScore: 92, status: 'Healthy', lead: 'Daniel Mathew' },
  { id: 'SEC-05', name: 'Microsoft Entra ID & SafeNet 2FA', category: 'Identity & MFA', toolVendor: 'Microsoft / Thales', monitoredAssets: '1,347 Active Users', policyStatus: '100% MFA Enforced', complianceScore: 99, status: 'Healthy', lead: 'Daniel Mathew' },
];

const SecurityTechnology: React.FC = () => {
  const columns: ColumnDef<SecurityTool>[] = [
    {
      header: 'Tool ID',
      accessorKey: 'id',
      width: '100px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Security Platform & Vendor',
      accessorKey: 'name',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>Vendor: {row.toolVendor}</div>
        </div>
      ),
    },
    {
      header: 'Security Category',
      accessorKey: 'category',
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
          {row.category}
        </span>
      ),
    },
    {
      header: 'Monitored Assets & Scope',
      accessorKey: 'monitoredAssets',
      cell: (row) => <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{row.monitoredAssets}</span>,
    },
    {
      header: 'Security Score',
      accessorKey: 'complianceScore',
      cell: (row) => (
        <div style={{ minWidth: 90 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#22A06B', marginBottom: 2 }}>{row.complianceScore}%</div>
          <div style={{ height: 4, width: '100%', background: 'var(--bg-secondary, #F7F8FA)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${row.complianceScore}%`, background: '#40904F' }} />
          </div>
        </div>
      ),
    },
    {
      header: 'SecOps Lead',
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
        pageTitle="Security Technology"
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
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>EDR Sensor Coverage</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>100.0%</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>1,150 CrowdStrike Agents</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>BeyondTrust PAM</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>480 Accounts</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>100% Session recording</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>MFA Enforcement</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 4 }}>100%</div>
          <div style={{ fontSize: '0.75rem', color: '#074A76', marginTop: 2, fontWeight: 600 }}>Entra ID & SafeNet</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={secTools}
        columns={columns}
        searchPlaceholder="Search security tools by name, category, vendor..."
        searchKeys={['name', 'category', 'toolVendor', 'lead', 'id']}
        pageSize={10}
        title="Enterprise Cyber Security Stack"
        subtitle="Live protection status and vulnerability remediation compliance"
        exportFilename="ncgr_security_technologies"
      />
    </div>
  );
};

export default SecurityTechnology;
