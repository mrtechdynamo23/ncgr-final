import React from 'react';
import {
  Cpu, Activity, Terminal, Shield, Laptop, Cloud
} from 'lucide-react';
import ModuleLandingHub, { type SubTileItem } from '../../components/navigation/ModuleLandingHub';

export const IT_SUPPORT_TOOLS_SIBLINGS = [
  { id: 'servicenow', title: 'ServiceNow Health', path: '/technology/servicenow', icon: <Cpu size={14} /> },
  { id: 'monitoring', title: 'Monitoring & Observability', path: '/technology/monitoring', icon: <Activity size={14} /> },
  { id: 'devops', title: 'DevOps & Automation', path: '/technology/devops', icon: <Terminal size={14} /> },
  { id: 'security', title: 'Security Technology', path: '/technology/security', icon: <Shield size={14} /> },
  { id: 'microsoft', title: 'Microsoft Estate', path: '/technology/microsoft', icon: <Laptop size={14} /> },
  { id: 'cloud-platforms', title: 'Cloud Platforms', path: '/technology/cloud-platforms', icon: <Cloud size={14} /> },
];

const ITSupportToolsLandingPage: React.FC = () => {
  const subTiles: SubTileItem[] = [
    {
      id: 'tool-snow',
      title: 'ServiceNow Health',
      description: 'ITSM platform health, MID Server cluster uptime, CMDB discovery sync, API integration queues, and table sizes.',
      icon: <Cpu size={22} />,
      path: '/technology/servicenow',
      kpiValue: '6 MID Servers Active',
      kpiLabel: '99.9% Platform Availability',
      badge: 'Operational',
      badgeType: 'healthy',
    },
    {
      id: 'tool-mon',
      title: 'Monitoring & Observability',
      description: 'Telemetry agents, Splunk SIEM ingestion, SolarWinds network monitoring, Prometheus metrics, and synthetic probes.',
      icon: <Activity size={22} />,
      path: '/technology/monitoring',
      kpiValue: '1,420 Monitored Hosts',
      kpiLabel: '99.8% Telemetry Coverage',
      badge: 'Active Monitoring',
      badgeType: 'healthy',
    },
    {
      id: 'tool-devops',
      title: 'DevOps & Automation',
      description: 'CI/CD deployment pipelines, Ansible automation job executions, GitLab repository health, and automated test suites.',
      icon: <Terminal size={22} />,
      path: '/technology/devops',
      kpiValue: '42 Active Pipelines',
      kpiLabel: '98.1% Pipeline Success Rate',
      badge: 'Automated',
      badgeType: 'info',
    },
    {
      id: 'tool-sec',
      title: 'Security Technology',
      description: 'Endpoint detection (EDR), Next-Gen Firewalls (NGFW), Web Application Firewalls (WAF), and SOC alert queues.',
      icon: <Shield size={22} />,
      path: '/technology/security',
      kpiValue: '100% EDR Compliance',
      kpiLabel: 'Zero Uncontained Threats',
      badge: 'Protected',
      badgeType: 'healthy',
    },
    {
      id: 'tool-msft',
      title: 'Microsoft Estate',
      description: 'Microsoft 365 tenant service health, Entra ID hybrid directory sync, Exchange Online mailflow, and Intune enrollment.',
      icon: <Laptop size={22} />,
      path: '/technology/microsoft',
      kpiValue: '99.95% Tenant Health',
      kpiLabel: 'Zero Sync Disruptions',
      badge: 'Optimal',
      badgeType: 'healthy',
    },
    {
      id: 'tool-cloud',
      title: 'Cloud Platforms',
      description: 'Multi-cloud infrastructure health, Google Cloud Platform (GCP) and Microsoft Azure subscriptions, and quota status.',
      icon: <Cloud size={22} />,
      path: '/technology/cloud-platforms',
      kpiValue: '8 Active Subscriptions',
      kpiLabel: '100% Multi-Region HA',
      badge: 'Cloud HA',
      badgeType: 'info',
    },
  ];

  return (
    <ModuleLandingHub
      moduleTitle="IT Support Tool Management"
      moduleSubtitle="Operational health, middleware connectors, telemetry pipelines, and estate metrics across all enterprise IT management tooling."
      categoryLabel="SERVICE & TECHNOLOGY"
      subTiles={subTiles}
    />
  );
};

export default ITSupportToolsLandingPage;
