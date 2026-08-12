/**
 * NCGR Incidents — DEMO DATA
 * Source system: ServiceNow (simulated)
 */

import type { HealthStatus } from './technology';

export interface Incident {
  id: string;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  title: string;
  service: string;
  businessImpact: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  owner: string;
  assignmentGroup: string;
  elapsedTime: string;
  relatedCI: string;
  relatedChange?: string;
  rcaStatus?: string;
  openedAt: string;
  source: string;
}

export const incidents: Incident[] = [
  {
    id: 'INC0048721',
    priority: 'P1',
    title: 'Core network switch degradation — Building A',
    service: 'Enterprise Network Services',
    businessImpact: 'Network connectivity impacted for 200+ users in Building A',
    status: 'In Progress',
    owner: 'Ahmed Al-Farsi',
    assignmentGroup: 'Network Operations',
    elapsedTime: '2h 15m',
    relatedCI: 'SW-CORE-A-01',
    rcaStatus: 'Pending',
    openedAt: '2026-08-12 08:27',
    source: 'ServiceNow',
  },
  {
    id: 'INC0048718',
    priority: 'P1',
    title: 'Oracle RAC node failover — Production DB cluster',
    service: 'Database Services',
    businessImpact: 'Financial reporting delayed — Hyperion HFM impacted',
    status: 'In Progress',
    owner: 'Khalid Ibrahim',
    assignmentGroup: 'Database Operations',
    elapsedTime: '3h 42m',
    relatedCI: 'ORA-RAC-PRD-02',
    relatedChange: 'CHG0012845',
    rcaStatus: 'In Progress',
    openedAt: '2026-08-12 07:00',
    source: 'ServiceNow',
  },
  {
    id: 'INC0048715',
    priority: 'P2',
    title: 'AppDynamics transaction latency — SAP PO middleware',
    service: 'Enterprise Integration Platform',
    businessImpact: 'SAP Process Orchestration response times elevated',
    status: 'In Progress',
    owner: 'Fatima Al-Hassan',
    assignmentGroup: 'Application Support',
    elapsedTime: '5h 10m',
    relatedCI: 'APP-SAP-PO-01',
    rcaStatus: 'Pending',
    openedAt: '2026-08-12 05:32',
    source: 'ServiceNow',
  },
  {
    id: 'INC0048710',
    priority: 'P2',
    title: 'OpenShift node capacity warning — NCGR-PRD-02',
    service: 'Container Platform',
    businessImpact: '2 nodes above 85% utilization, workload migration required',
    status: 'Open',
    owner: 'Nasser Al-Qahtani',
    assignmentGroup: 'Platform Engineering',
    elapsedTime: '8h 20m',
    relatedCI: 'OCP-PRD-02-NODE-14',
    openedAt: '2026-08-12 02:22',
    source: 'ServiceNow',
  },
  {
    id: 'INC0048705',
    priority: 'P3',
    title: 'SafeNet MobilePASS token sync failure — batch 12',
    service: 'Identity & Access Management',
    businessImpact: '45 users unable to authenticate via MFA',
    status: 'In Progress',
    owner: 'Sara Al-Mutairi',
    assignmentGroup: 'Security Operations',
    elapsedTime: '12h 05m',
    relatedCI: 'SEC-SAFENET-01',
    openedAt: '2026-08-11 22:37',
    source: 'ServiceNow',
  },
  {
    id: 'INC0048701',
    priority: 'P3',
    title: 'SolarWinds interface alerts — DC2 distribution switches',
    service: 'Enterprise Network Services',
    businessImpact: '3 interfaces requiring attention, no user impact yet',
    status: 'Open',
    owner: 'Mohammed Al-Rashid',
    assignmentGroup: 'Network Operations',
    elapsedTime: '14h 30m',
    relatedCI: 'SW-DIST-DC2-03',
    openedAt: '2026-08-11 20:12',
    source: 'ServiceNow',
  },
];

// ─── MANAGEMENT EXCEPTIONS (Section 20) ──────────────────
export interface ManagementException {
  id: string;
  title: string;
  severity: 'critical' | 'warning' | 'info';
  description: string;
  impact: string;
  owner: string;
  sourceSystem: string;
  timestamp: string;
  status: string;
  relatedService: string;
  relatedTechnology: string;
  recommendedAction: string;
}

export const managementExceptions: ManagementException[] = [
  {
    id: 'EXC-001',
    title: 'P1 Network degradation — Building A',
    severity: 'critical',
    description: 'Core network switch experiencing packet loss and elevated latency',
    impact: '200+ users in Building A experiencing intermittent connectivity',
    owner: 'Ahmed Al-Farsi',
    sourceSystem: 'SolarWinds / ServiceNow',
    timestamp: '08:27 AM',
    status: 'Active — Engineering on-site',
    relatedService: 'Enterprise Network Services',
    relatedTechnology: 'SolarWinds Orion',
    recommendedAction: 'Escalate to vendor if not resolved within next 30 minutes',
  },
  {
    id: 'EXC-002',
    title: 'Application transaction latency — SAP PO',
    severity: 'critical',
    description: 'SAP Process Orchestration middleware showing 42% increase in transaction latency',
    impact: 'Government Finance Reporting delayed',
    owner: 'Fatima Al-Hassan',
    sourceSystem: 'AppDynamics / ServiceNow',
    timestamp: '05:32 AM',
    status: 'Under investigation',
    relatedService: 'Enterprise Integration Platform',
    relatedTechnology: 'AppDynamics',
    recommendedAction: 'Review database connectivity and connection pool settings',
  },
  {
    id: 'EXC-003',
    title: 'Certificate expiry approaching — 14 certificates',
    severity: 'warning',
    description: '14 SSL/TLS certificates expiring within 21 days',
    impact: 'Service disruption risk if not renewed',
    owner: 'Security Operations',
    sourceSystem: 'AppViewX',
    timestamp: '10:00 AM',
    status: 'Renewal queue active',
    relatedService: 'Security Operations',
    relatedTechnology: 'AppViewX',
    recommendedAction: 'Expedite renewal for 3 critical-service certificates',
  },
  {
    id: 'EXC-004',
    title: 'OpenShift node capacity warning',
    severity: 'warning',
    description: 'NCGR-PRD-02 cluster has 2 nodes above 85% utilization threshold',
    impact: 'Workload scheduling may be impacted during peak hours',
    owner: 'Nasser Al-Qahtani',
    sourceSystem: 'OpenShift',
    timestamp: '02:22 AM',
    status: 'Capacity planning initiated',
    relatedService: 'Container Platform',
    relatedTechnology: 'OpenShift',
    recommendedAction: 'Scale horizontal pod autoscaler and evaluate node addition',
  },
  {
    id: 'EXC-005',
    title: 'Resource coverage gap — NOC night shift',
    severity: 'warning',
    description: 'NOC night shift has 1 resource gap due to unplanned leave',
    impact: 'Reduced monitoring coverage during 22:00–06:00',
    owner: 'Operations Manager',
    sourceSystem: 'HR / Workforce',
    timestamp: '09:00 AM',
    status: 'Backup resource being arranged',
    relatedService: 'NOC / Network',
    relatedTechnology: 'N/A',
    recommendedAction: 'Confirm backup resource assignment by 18:00',
  },
  {
    id: 'EXC-006',
    title: 'Vendor contract renewal — Splunk Enterprise',
    severity: 'info',
    description: 'Splunk Enterprise license renewal due in 45 days',
    impact: 'Monitoring capability at risk if not renewed',
    owner: 'Vendor Management',
    sourceSystem: 'Contract Management',
    timestamp: '09:00 AM',
    status: 'Renewal initiated',
    relatedService: 'Monitoring & Operations',
    relatedTechnology: 'Splunk Enterprise',
    recommendedAction: 'Complete commercial review and obtain approval',
  },
  {
    id: 'EXC-007',
    title: 'Cloud cost variance — GCP compute',
    severity: 'info',
    description: 'GCP compute spend 8% above forecast for current billing period',
    impact: 'Potential budget overrun if trend continues',
    owner: 'Cloud FinOps',
    sourceSystem: 'GCP / FinOps',
    timestamp: '08:00 AM',
    status: 'Under review',
    relatedService: 'Cloud Infrastructure',
    relatedTechnology: 'Google Cloud Platform',
    recommendedAction: 'Review auto-scaling policies and identify idle resources',
  },
];

// ─── HEALTH GRID DATA (Section 19) ───────────────────────
export interface HealthGridItem {
  domain: string;
  health: HealthStatus;
  trend: 'up' | 'down' | 'stable';
  exceptions: number;
  owner: string;
  path: string;
}

export const healthGrid: HealthGridItem[] = [
  { domain: 'Service Desk', health: 'healthy', trend: 'stable', exceptions: 0, owner: 'Service Desk Lead', path: '/service-management/service-desk' },
  { domain: 'NOC / Network', health: 'healthy', trend: 'stable', exceptions: 1, owner: 'NOC Lead', path: '/applications/network' },
  { domain: 'Infrastructure', health: 'healthy', trend: 'stable', exceptions: 0, owner: 'Infrastructure Lead', path: '/applications/infrastructure' },
  { domain: 'Applications', health: 'attention', trend: 'down', exceptions: 2, owner: 'Application Lead', path: '/applications/health' },
  { domain: 'Cloud', health: 'healthy', trend: 'stable', exceptions: 0, owner: 'Cloud Lead', path: '/applications/cloud' },
  { domain: 'Security', health: 'healthy', trend: 'stable', exceptions: 1, owner: 'Security Lead', path: '/technology/security' },
  { domain: 'Digital Workplace', health: 'healthy', trend: 'stable', exceptions: 0, owner: 'Workplace Lead', path: '/applications/digital-workplace' },
  { domain: 'Database', health: 'healthy', trend: 'stable', exceptions: 1, owner: 'Database Lead', path: '/applications/database' },
  { domain: 'Container Platform', health: 'at-risk', trend: 'down', exceptions: 2, owner: 'Platform Lead', path: '/applications/containers' },
];

// ─── INCIDENT STATISTICS ──────────────────────────────────
export const getIncidentStats = () => {
  const open = incidents.filter((i) => i.status !== 'Closed' && i.status !== 'Resolved');
  return {
    total: incidents.length,
    open: open.length,
    p1: incidents.filter((i) => i.priority === 'P1').length,
    p2: incidents.filter((i) => i.priority === 'P2').length,
    p1p2Open: open.filter((i) => i.priority === 'P1' || i.priority === 'P2').length,
  };
};
