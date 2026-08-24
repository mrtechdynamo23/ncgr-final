import React from 'react';
import DataTable, { type ColumnDef } from '../../components/common/DataTable';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { IT_SUPPORT_TOOLS_SIBLINGS } from './ITSupportToolsLandingPage';

interface MonitoringTool {
  id: string;
  name: string;
  category: 'Log Analytics' | 'AIOps / Service Intelligence' | 'Network Observability' | 'Application APM' | 'Cloud Monitoring';
  ingestRate: string;
  capacityLimit: string;
  monitoredNodes: string;
  latency: string;
  status: 'Healthy' | 'Warning';
  lead: string;
}

const monitoringTools: MonitoringTool[] = [
  { id: 'MON-01', name: 'Splunk Enterprise Security', category: 'Log Analytics', ingestRate: '1.42 TB / day', capacityLimit: '1.60 TB License', monitoredNodes: '1,840 Event Sources', latency: '4.2 sec indexing delay', status: 'Healthy', lead: 'Khalid Al-Shammari' },
  { id: 'MON-02', name: 'Splunk ITSI (Service Intelligence)', category: 'AIOps / Service Intelligence', ingestRate: '498 GB / day', capacityLimit: '500 GB Target', monitoredNodes: '38 Business Services', latency: 'Real-time Glass Tables', status: 'Healthy', lead: 'Khalid Al-Shammari' },
  { id: 'MON-03', name: 'SolarWinds Orion NPM/NCM', category: 'Network Observability', ingestRate: '120k packets / sec', capacityLimit: '500 Node Engine', monitoredNodes: '502 Nodes · 15,791 Ports', latency: '3 interfaces flapping', status: 'Warning', lead: 'Mohammed Al-Dosari' },
  { id: 'MON-04', name: 'AppDynamics APM Suite', category: 'Application APM', ingestRate: '450 App Agents', capacityLimit: '500 Agent License', monitoredNodes: '28 Tier-1 Applications', latency: '12ms avg trace overhead', status: 'Healthy', lead: 'Sara Al-Otaibi' },
  { id: 'MON-05', name: 'Google Cloud Operations (Stackdriver)', category: 'Cloud Monitoring', ingestRate: '85 GB / day', capacityLimit: 'Pay-as-you-go', monitoredNodes: '6 GKE Clusters · CloudSQL', latency: 'Streaming metrics', status: 'Healthy', lead: 'Priya Nair' },
];

const MonitoringObservability: React.FC = () => {
  const columns: ColumnDef<MonitoringTool>[] = [
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
      header: 'Platform & Purpose',
      accessorKey: 'name',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>{row.category}</div>
        </div>
      ),
    },
    {
      header: 'Ingest Rate & Licensed Capacity',
      accessorKey: 'ingestRate',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.ingestRate}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>Limit: {row.capacityLimit}</div>
        </div>
      ),
    },
    {
      header: 'Monitored Coverage',
      accessorKey: 'monitoredNodes',
      cell: (row) => <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{row.monitoredNodes}</span>,
    },
    {
      header: 'Telemetry & Notes',
      accessorKey: 'latency',
      cell: (row) => (
        <span style={{ fontSize: '0.75rem', color: row.status === 'Warning' ? '#E97F0A' : '#22A06B', fontWeight: 600 }}>
          {row.latency}
        </span>
      ),
    },
    {
      header: 'Lead Owner',
      accessorKey: 'lead',
      cell: (row) => <span style={{ fontWeight: 600 }}>{row.lead}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
        const bg = row.status === 'Healthy' ? '#E3FCEF' : '#FFF7E6';
        const color = row.status === 'Healthy' ? '#22A06B' : '#E97F0A';
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
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Sub-Page Header with Breadcrumb and Sibling Navigation */}
      <SubPageHeader
        moduleTitle="IT Support Tool Management"
        modulePath="/technology"
        pageTitle="Monitoring & Observability"
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
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Daily Log Ingest</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>1.92 TB</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>88.7% License headroom</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Monitored Endpoints</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 4 }}>18,133</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Nodes, interfaces, agents</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>APM Agent Traces</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>450 / 500</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>AppDynamics Active</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={monitoringTools}
        columns={columns}
        searchPlaceholder="Search observability tools by name, category, lead..."
        searchKeys={['name', 'category', 'lead', 'monitoredNodes']}
        pageSize={10}
        title="Enterprise Observability Stack"
        subtitle="Live telemetry throughput, capacity limits, and pipeline health"
        exportFilename="ncgr_monitoring_tools"
      />
    </div>
  );
};

export default MonitoringObservability;
