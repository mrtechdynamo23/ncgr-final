import React from 'react';
import {
  Layers, Activity, AlertOctagon, GitPullRequest,
  Network, Zap, ShieldCheck
} from 'lucide-react';
import ModuleLandingHub, { type SubTileItem } from '../../components/navigation/ModuleLandingHub';
import { masterApplications } from '../../data/master-applications';

export const APPLICATION_SERVICES_SIBLINGS = [
  { id: 'health', title: 'Application Health', path: '/applications/health', icon: <Layers size={14} /> },
  { id: 'business-service', title: 'Business Service Health', path: '/applications/business-service-health', icon: <Activity size={14} /> },
  { id: 'incidents', title: 'Application Incidents', path: '/applications/incidents', icon: <AlertOctagon size={14} /> },
  { id: 'changes', title: 'Changes & Releases', path: '/applications/changes', icon: <GitPullRequest size={14} /> },
  { id: 'dependencies', title: 'Dependencies', path: '/applications/dependencies', icon: <Network size={14} /> },
  { id: 'performance', title: 'Performance', path: '/applications/performance', icon: <Zap size={14} /> },
  { id: 'support', title: 'Support Coverage', path: '/applications/support', icon: <ShieldCheck size={14} /> },
];

const ApplicationServicesLandingPage: React.FC = () => {
  const healthyCount = masterApplications.filter(a => a.health === 'Healthy').length;
  const totalApps = masterApplications.length;
  const healthPct = Math.round((healthyCount / totalApps) * 100);

  const subTiles: SubTileItem[] = [
    {
      id: 'app-health',
      title: 'Application Health',
      description: 'Application availability, criticality, performance, and operational health across the managed application estate.',
      icon: <Layers size={22} />,
      path: '/applications/health',
      kpiValue: `${totalApps} Managed Apps`,
      kpiLabel: `${healthPct}% Current Health Rate`,
      badge: 'Operational',
      badgeType: 'healthy',
    },
    {
      id: 'biz-health',
      title: 'Business Service Health',
      description: 'End-to-end status of core business capability chains, transaction workflows, and SLA tier attainment.',
      icon: <Activity size={22} />,
      path: '/applications/business-service-health',
      kpiValue: '12 Business Services',
      kpiLabel: '99.8% SLA Attainment',
      badge: 'Critical Tier',
      badgeType: 'info',
    },
    {
      id: 'app-incidents',
      title: 'Application Incidents',
      description: 'Active incidents, resolution velocity, MTTR, and priority-1 defect tracking by service domain.',
      icon: <AlertOctagon size={22} />,
      path: '/applications/incidents',
      kpiValue: '12 Open Tickets',
      kpiLabel: '0 Critical P1 Escalations',
      badge: 'Active Queue',
      badgeType: 'warning',
    },
    {
      id: 'app-changes',
      title: 'Application Changes & Releases',
      description: 'CAB-approved releases, planned change windows, risk classifications, and deployment status.',
      icon: <GitPullRequest size={22} />,
      path: '/applications/changes',
      kpiValue: '8 Open CRs',
      kpiLabel: '100% CAB Approval Rate',
      badge: 'Release Ready',
      badgeType: 'purple',
    },
    {
      id: 'app-deps',
      title: 'Application Dependencies',
      description: 'Upstream and downstream integration mappings, middleware APIs, databases, and third-party dependencies.',
      icon: <Network size={22} />,
      path: '/applications/dependencies',
      kpiValue: '24 Dependencies',
      kpiLabel: 'Zero Dependency Conflicts',
      badge: 'Mapped',
      badgeType: 'info',
    },
    {
      id: 'app-perf',
      title: 'Application Performance',
      description: 'Apdex scores, response times, throughput spikes, database latency, and APM telemetry.',
      icon: <Zap size={22} />,
      path: '/applications/performance',
      kpiValue: '98.4% APM Score',
      kpiLabel: '240ms Average Response Time',
      badge: 'Optimal',
      badgeType: 'healthy',
    },
    {
      id: 'app-support',
      title: 'Application Support Coverage',
      description: 'Support tiers, primary/secondary ownership matrices, on-call schedules, and vendor coverage.',
      icon: <ShieldCheck size={22} />,
      path: '/applications/support',
      kpiValue: '94% Support Coverage',
      kpiLabel: '4 Standby Support Leads',
      badge: 'Full Coverage',
      badgeType: 'healthy',
    },
  ];

  return (
    <ModuleLandingHub
      moduleTitle="Application Services"
      moduleSubtitle="Enterprise application portfolio management, business service health, release governance, and application telemetry."
      categoryLabel="SERVICE & TECHNOLOGY"
      subTiles={subTiles}
    />
  );
};

export default ApplicationServicesLandingPage;
