import React from 'react';
import {
  Activity, AlertCircle, AlertOctagon, HelpCircle,
  FileQuestion, FileSearch, BookOpen, GitPullRequest
} from 'lucide-react';
import ModuleLandingHub, { type SubTileItem } from '../../components/navigation/ModuleLandingHub';

export const COMMAND_CENTER_SIBLINGS = [
  { id: 'service-desk', title: 'Service Desk Overview', path: '/command-center/service-desk', icon: <Activity size={14} /> },
  { id: 'incidents', title: 'Incidents', path: '/command-center/incidents', icon: <AlertCircle size={14} /> },
  { id: 'critical-incidents', title: 'Critical Incidents', path: '/command-center/critical-incidents', icon: <AlertOctagon size={14} /> },
  { id: 'service-requests', title: 'Service Requests', path: '/command-center/service-requests', icon: <HelpCircle size={14} /> },
  { id: 'change-requests', title: 'Change Requests', path: '/command-center/change-requests', icon: <GitPullRequest size={14} /> },
  { id: 'problems', title: 'Problems', path: '/command-center/problems', icon: <FileQuestion size={14} /> },
  { id: 'rca', title: 'Operational RCA', path: '/command-center/rca', icon: <FileSearch size={14} /> },
  { id: 'knowledge', title: 'Knowledge Base', path: '/command-center/knowledge', icon: <BookOpen size={14} /> },
];

const CommandCenterLandingPage: React.FC = () => {
  const subTiles: SubTileItem[] = [
    {
      id: 'cc-sd',
      title: 'Service Desk Overview',
      description: 'Real-time ITMS telemetry, 24/7 operations board, daily flash reports (DFR), and First Contact Resolution (FCR).',
      icon: <Activity size={22} />,
      path: '/command-center/service-desk',
      kpiValue: '98.4% SLA Attainment',
      kpiLabel: '42s Average Speed of Answer',
      badge: 'Live Telemetry',
      badgeType: 'healthy',
    },
    {
      id: 'cc-inc',
      title: 'Incidents',
      description: 'Active incident queues, priority aging breakdowns, tier assignments, and resolution progress across all towers.',
      icon: <AlertCircle size={22} />,
      path: '/command-center/incidents',
      kpiValue: '24 Active Incidents',
      kpiLabel: '98.2% Resolution Rate',
      badge: 'Active Queue',
      badgeType: 'info',
    },
    {
      id: 'cc-crit',
      title: 'Critical Incidents',
      description: 'Major Incident Management (MIM) war rooms, high-severity P1/P2 bridges, outage impact containment, and notifications.',
      icon: <AlertOctagon size={22} />,
      path: '/command-center/critical-incidents',
      kpiValue: '0 Active P1 Outages',
      kpiLabel: '100% Containment Target',
      badge: 'Clear',
      badgeType: 'healthy',
    },
    {
      id: 'cc-req',
      title: 'Service Requests',
      description: 'Catalog requests, user access approvals, software provisioning, and end-user hardware fulfillment workflows.',
      icon: <HelpCircle size={22} />,
      path: '/command-center/service-requests',
      kpiValue: '38 Open Requests',
      kpiLabel: '1.8 Days Average Delivery',
      badge: 'Fulfillment',
      badgeType: 'info',
    },
    {
      id: 'cc-cr',
      title: 'Change Requests',
      description: 'CAB approved releases, emergency patches, standard deployment windows, risk analysis, and backout plans.',
      icon: <GitPullRequest size={22} />,
      path: '/command-center/change-requests',
      kpiValue: '10 Tracked Changes',
      kpiLabel: '99.5% Success Rate',
      badge: 'CAB Controlled',
      badgeType: 'info',
    },
    {
      id: 'cc-prob',
      title: 'Problems',
      description: 'Problem investigation records, recurring root-cause patterns, Known Error Database (KEDB), and permanent workarounds.',
      icon: <FileQuestion size={22} />,
      path: '/command-center/problems',
      kpiValue: '8 Active Problems',
      kpiLabel: '6 Known Error Workarounds',
      badge: 'Investigation',
      badgeType: 'warning',
    },
    {
      id: 'cc-rca',
      title: 'Operational RCA',
      description: 'Root Cause Analysis documents, 5-Whys diagrams, post-incident reviews (PIR), and corrective preventative actions (CAPA).',
      icon: <FileSearch size={22} />,
      path: '/command-center/rca',
      kpiValue: '14 Completed RCAs',
      kpiLabel: '100% Preventative Actions Closed',
      badge: 'Approved',
      badgeType: 'healthy',
    },
    {
      id: 'cc-kb',
      title: 'Knowledge Base & Repository',
      description: 'Standard Operating Procedures (SOPs), troubleshooting runbooks, knowledge articles, and resolution guides.',
      icon: <BookOpen size={22} />,
      path: '/command-center/knowledge',
      kpiValue: '184 Published Articles',
      kpiLabel: '96% First-Call Resolution Impact',
      badge: 'Repository',
      badgeType: 'healthy',
    },
  ];

  return (
    <ModuleLandingHub
      moduleTitle="Command Center"
      moduleSubtitle="Integrated operations command center, incident triage, Major Incident Management (MIM), problem investigations, and knowledge repository."
      categoryLabel="SERVICE OPERATIONS"
      subTiles={subTiles}
    />
  );
};

export default CommandCenterLandingPage;
