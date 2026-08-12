import React from 'react';
import { useTranslation } from 'react-i18next';

const MonitoringObservability: React.FC = () => {
  const { t } = useTranslation(['common', 'technology']);

  const platforms = [
    {
      name: 'Splunk Enterprise',
      status: 'healthy',
      purpose: 'Enterprise Log Management & Security Analytics',
      metrics: [
        { label: 'Data Ingest Rate', value: '1.42 TB/day' },
        { label: 'Licensed Ingest Capacity', value: '1,600 GB/day' },
        { label: 'Pipeline Status', value: 'Normal Processing' },
      ],
      source: 'Splunk',
    },
    {
      name: 'Splunk ITSI',
      status: 'healthy',
      purpose: 'IT Service Intelligence & Service Health Scoring',
      metrics: [
        { label: 'Service Ingest Rate', value: '498 GB/day' },
        { label: 'Target Ingest Capacity', value: '500 GB/day' },
        { label: 'Service Analytics Engine', value: 'Processing Normal' },
      ],
      source: 'Splunk ITSI',
    },
    {
      name: 'SolarWinds Orion',
      status: 'attention',
      purpose: 'NPM, NCM, NetFlow, UDT Network Monitoring',
      metrics: [
        { label: 'Monitored Nodes', value: '502 nodes' },
        { label: 'Monitored Interfaces', value: '15,791 interfaces' },
        { label: 'Storage Volumes', value: '483 volumes' },
        { label: 'Attention Items', value: '3 interfaces requiring attention' },
      ],
      source: 'SolarWinds Orion',
    },
    {
      name: 'AppDynamics APM Suite',
      status: 'healthy',
      purpose: 'Application Observability, APM, RUM & Synthetic Monitoring',
      metrics: [
        { label: 'APM Managed Units', value: '450 units' },
        { label: 'Browser & Mobile RUM', value: 'Active Analytics' },
        { label: 'Synthetic Monitoring', value: 'Private & Public Synthetic' },
        { label: 'Degraded Performance Apps', value: '2 applications elevated' },
      ],
      source: 'AppDynamics',
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Technology Health & Observability</h1>
            <p className="page-subtitle">Unified management view across Splunk, SolarWinds, and AppDynamics monitoring stack</p>
          </div>
          <span className="simulated-badge">{t('app.simulatedHealth')}</span>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {platforms.map((p) => (
          <div key={p.name} className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">{p.name}</h3>
                <p className="card-subtitle">{p.purpose}</p>
              </div>
              <span className={`health-badge ${p.status === 'healthy' ? 'healthy' : 'at-risk'}`}>
                <span className="badge-dot" /> {p.status.toUpperCase()}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
              {p.metrics.map((m) => (
                <div key={m.label} style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>{m.label}</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', marginTop: 2 }}>{m.value}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, paddingTop: 8, borderTop: '1px solid var(--border)', fontSize: '0.6875rem', color: 'var(--text-tertiary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Source: {p.source}</span>
              <span>Integration: Connected</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonitoringObservability;
