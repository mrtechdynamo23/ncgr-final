import React from 'react';
import DataTable, { type ColumnDef } from '../../components/common/DataTable';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { IT_SUPPORT_TOOLS_SIBLINGS } from './ITSupportToolsLandingPage';

interface ServiceNowModule {
  id: string;
  name: string;
  scope: string;
  activeRecords: string;
  syncFrequency: string;
  lastSyncTime: string;
  apiSuccessRate: number;
  status: 'Healthy' | 'Warning';
  lead: string;
}

const snModules: ServiceNowModule[] = [
  { id: 'SN-01', name: 'IT Service Management (ITSM)', scope: 'Incidents, Problems, Changes, Service Catalog', activeRecords: '1,248 active tickets', syncFrequency: 'Real-time Webhook', lastSyncTime: '30 sec ago', apiSuccessRate: 99.9, status: 'Healthy', lead: 'Arjun Menon' },
  { id: 'SN-02', name: 'IT Operations Management (ITOM)', scope: 'Event Management, Service Mapping, Alert Rules', activeRecords: '42 active alerts', syncFrequency: 'Streaming (Kafka/REST)', lastSyncTime: '10 sec ago', apiSuccessRate: 99.8, status: 'Healthy', lead: 'Arjun Menon' },
  { id: 'SN-03', name: 'IT Asset Management (ITAM)', scope: 'Hardware Assets, Software Licenses, Contracts', activeRecords: '4,300+ tracked CIs', syncFrequency: '5 min Polling', lastSyncTime: '2 min ago', apiSuccessRate: 99.5, status: 'Healthy', lead: 'Arjun Menon' },
  { id: 'SN-04', name: 'CMDB & Discovery Engine', scope: 'IP Discovery, Agentless Scanners, Cloud Resources', activeRecords: '4,320 Discovered CIs', syncFrequency: 'Daily 04:00 AM Scan', lastSyncTime: '04:15 AM', apiSuccessRate: 98.4, status: 'Healthy', lead: 'Arjun Menon' },
  { id: 'SN-05', name: 'Integration Hub & REST APIs', scope: 'Splunk, SolarWinds, AppDynamics, Intune Webhooks', activeRecords: '48,000 daily API calls', syncFrequency: 'Continuous', lastSyncTime: 'Just now', apiSuccessRate: 99.7, status: 'Healthy', lead: 'Arjun Menon' },
  { id: 'SN-06', name: 'Security Incident Response (SIR)', scope: 'SOC Alert Ingestion & Automated Containment', activeRecords: '18 active SecOps cases', syncFrequency: 'Real-time', lastSyncTime: '1 min ago', apiSuccessRate: 100.0, status: 'Healthy', lead: 'Daniel Mathew' },
];

const ServiceNowHealth: React.FC = () => {
  const columns: ColumnDef<ServiceNowModule>[] = [
    {
      header: 'Module ID',
      accessorKey: 'id',
      width: '100px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Module Name & Scope',
      accessorKey: 'name',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>{row.scope}</div>
        </div>
      ),
    },
    {
      header: 'Active Records',
      accessorKey: 'activeRecords',
      cell: (row) => <span style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{row.activeRecords}</span>,
    },
    {
      header: 'Sync & Latency',
      accessorKey: 'syncFrequency',
      cell: (row) => (
        <div>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{row.syncFrequency}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>Last: {row.lastSyncTime}</div>
        </div>
      ),
    },
    {
      header: 'API Reliability',
      accessorKey: 'apiSuccessRate',
      cell: (row) => (
        <div style={{ minWidth: 90 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#22A06B', marginBottom: 2 }}>{row.apiSuccessRate}%</div>
          <div style={{ height: 4, width: '100%', background: 'var(--bg-secondary, #F7F8FA)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${row.apiSuccessRate}%`, background: '#40904F' }} />
          </div>
        </div>
      ),
    },
    {
      header: 'Platform Lead',
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
        pageTitle="ServiceNow Health"
        siblingPages={IT_SUPPORT_TOOLS_SIBLINGS}
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
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Production Instance</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>ncgr.service-now.com</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>Utah Patch 4 (100% Online)</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Licensed IT Staff</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 4 }}>1,347</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Fulfiller users active</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Discovered CIs</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>4,320</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>98.4% CMDB completeness</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Daily Integration Calls</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 4 }}>48.2k</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>99.7% REST success</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={snModules}
        columns={columns}
        searchPlaceholder="Search ServiceNow modules, scope, lead..."
        searchKeys={['name', 'scope', 'lead', 'id']}
        pageSize={10}
        title="ServiceNow Modules & Integration Pipeline"
        subtitle="Real-time synchronization status with ITOM, ITAM, and external tools"
        exportFilename="ncgr_servicenow_modules"
      />
    </div>
  );
};

export default ServiceNowHealth;
