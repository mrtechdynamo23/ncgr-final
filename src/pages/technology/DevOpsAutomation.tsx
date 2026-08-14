import React from 'react';
import DataTable, { type ColumnDef } from '../../components/common/DataTable';

interface DevOpsPipeline {
  id: string;
  name: string;
  tool: string;
  pipelineType: 'CI/CD Build & Deploy' | 'Infrastructure-as-Code' | 'Container Registry' | 'Configuration Management';
  activePipelines: number;
  successRatePct: number;
  avgDuration: string;
  lastExecution: string;
  status: 'Healthy' | 'Warning';
  lead: string;
}

const pipelines: DevOpsPipeline[] = [
  { id: 'DEV-01', name: 'GitLab CI/CD Enterprise', tool: 'GitLab Ultimate', pipelineType: 'CI/CD Build & Deploy', activePipelines: 42, successRatePct: 98.6, avgDuration: '4.8 min', lastExecution: '12 min ago', status: 'Healthy', lead: 'Arjun Menon' },
  { id: 'DEV-02', name: 'Ansible Tower Automation Controller', tool: 'Red Hat Ansible', pipelineType: 'Configuration Management', activePipelines: 18, successRatePct: 99.2, avgDuration: '2.1 min', lastExecution: '3 min ago', status: 'Healthy', lead: 'Arjun Menon' },
  { id: 'DEV-03', name: 'Terraform Cloud Enterprise', tool: 'HashiCorp Terraform', pipelineType: 'Infrastructure-as-Code', activePipelines: 8, successRatePct: 97.5, avgDuration: '6.4 min', lastExecution: '1 hour ago', status: 'Healthy', lead: 'Priya Nair' },
  { id: 'DEV-04', name: 'Red Hat Quay Container Registry', tool: 'RH Quay', pipelineType: 'Container Registry', activePipelines: 120, successRatePct: 100.0, avgDuration: 'Instant', lastExecution: 'Continuous', status: 'Healthy', lead: 'Priya Nair' },
  { id: 'DEV-05', name: 'SonarQube Code Quality Gate', tool: 'SonarQube Enterprise', pipelineType: 'CI/CD Build & Deploy', activePipelines: 28, successRatePct: 94.0, avgDuration: '3.2 min', lastExecution: '25 min ago', status: 'Warning', lead: 'Sara Al-Otaibi' },
];

const DevOpsAutomation: React.FC = () => {
  const columns: ColumnDef<DevOpsPipeline>[] = [
    {
      header: 'Pipeline ID',
      accessorKey: 'id',
      width: '100px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Pipeline Name & Tool',
      accessorKey: 'name',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>Platform: {row.tool}</div>
        </div>
      ),
    },
    {
      header: 'Type & Scope',
      accessorKey: 'pipelineType',
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
          {row.pipelineType}
        </span>
      ),
    },
    {
      header: 'Success Rate',
      accessorKey: 'successRatePct',
      cell: (row) => (
        <div style={{ minWidth: 90 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: row.successRatePct > 95 ? '#22A06B' : '#E97F0A', marginBottom: 2 }}>
            {row.successRatePct}%
          </div>
          <div style={{ height: 4, width: '100%', background: 'var(--bg-secondary, #F7F8FA)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${row.successRatePct}%`, background: row.successRatePct > 95 ? '#40904F' : '#E97F0A' }} />
          </div>
        </div>
      ),
    },
    {
      header: 'Avg Duration',
      accessorKey: 'avgDuration',
      cell: (row) => <span style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{row.avgDuration}</span>,
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
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 4px' }}>
          DevOps & Automation Platforms
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #475467)', margin: 0 }}>
          GitLab CI/CD, Ansible Tower playbook execution, Terraform Cloud IaC pipelines, and container registry security
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
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Active Pipelines</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>216</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>GitLab, Ansible & Terraform</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>Avg Pipeline Success</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>98.2%</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>Zero build outages</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#074A76', textTransform: 'uppercase' }}>Ansible Daily Jobs</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 4 }}>480 runs</div>
          <div style={{ fontSize: '0.75rem', color: '#074A76', marginTop: 2, fontWeight: 600 }}>Automated patch & health</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={pipelines}
        columns={columns}
        searchPlaceholder="Search DevOps tools, pipelines, leads..."
        searchKeys={['name', 'tool', 'pipelineType', 'lead', 'id']}
        pageSize={10}
        title="Active CI/CD & Automation Infrastructure"
        subtitle="Live automated pipelines and configuration controllers"
        exportFilename="ncgr_devops_automation"
      />
    </div>
  );
};

export default DevOpsAutomation;
