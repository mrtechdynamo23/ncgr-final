/**
 * NCGR Incidents — EXPANDED DEMO DATA (100+ incidents)
 * Source system: ServiceNow (simulated)
 */

export interface Incident {
  id: string;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  title: string;
  description: string;
  service: string;
  tower: string;
  businessImpact: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  owner: string;
  reportedBy: string;
  assignmentGroup: string;
  assignedEngineer: string;
  elapsedTime: string;
  duration: string;
  relatedCI: string;
  relatedChange?: string;
  rcaStatus?: string;
  createdDate: string;
  updatedDate: string;
  source: string;
}

const towers = ['Infrastructure', 'Network', 'Service Desk', 'Applications', 'SAP', 'Database', 'Cloud', 'Security', 'Digital Workplace'];
const services = ['Enterprise Network Services', 'Database Services', 'SAP Middleware', 'Cloud Platform Services', 'End User Computing', 'Identity & Access', 'Application Services', 'Infrastructure Services', 'Security Operations', 'Monitoring Services'];
const assignmentGroups = ['Network Operations', 'Database Operations', 'Application Support', 'Infrastructure Operations', 'Cloud Operations', 'Security Operations', 'Service Desk L1', 'Service Desk L2', 'SAP Basis', 'Digital Workplace'];
const owners = ['Ahmed Al-Qahtani', 'Mohammed Al-Dosari', 'Sara Al-Otaibi', 'Khalid Al-Shammari', 'Priya Nair', 'Omar Al-Mutairi', 'Arjun Menon', 'Layla Hassan', 'Daniel Mathew', 'Rakesh Kumar', 'Aisha Rahman', 'Huda Al-Salem'];
const reporters = ['Help Desk', 'Monitoring System', 'End User', 'Manager', 'Auto-Detection', 'Vendor', 'Self-Service Portal'];

function genIncidents(): Incident[] {
  const result: Incident[] = [];

  // ─── P1 Critical Incidents (8 records) ──────────────────────
  const p1Incidents: Partial<Incident>[] = [
    { title: 'Core network switch degradation — Building A', description: 'Nexus 9000 core switch showing CRC errors on multiple uplinks causing intermittent packet drops across Building A floor 3-5', service: 'Enterprise Network Services', tower: 'Network', businessImpact: 'Network connectivity impacted for 200+ users in Building A', status: 'In Progress', owner: 'Mohammed Al-Dosari', assignmentGroup: 'Network Operations', relatedCI: 'SW-CORE-A-01', rcaStatus: 'Pending', createdDate: '2026-08-12 08:27', duration: '2h 15m' },
    { title: 'Oracle RAC node failover — Production DB cluster', description: 'Oracle RAC node 2 experienced unexpected failover during financial reporting batch. Automatic failover to node 3 completed but with 12-minute service interruption', service: 'Database Services', tower: 'Database', businessImpact: 'Financial reporting delayed — Hyperion HFM impacted', status: 'In Progress', owner: 'Omar Al-Mutairi', assignmentGroup: 'Database Operations', relatedCI: 'ORA-RAC-PRD-02', relatedChange: 'CHG0012845', rcaStatus: 'In Progress', createdDate: '2026-08-12 07:00', duration: '3h 42m' },
    { title: 'SAP ECC production system unresponsive', description: 'SAP ECC production system not responding to user connections. Application server work processes exhausted. Emergency restart required', service: 'SAP Middleware', tower: 'SAP', businessImpact: 'All SAP transactions halted — 150+ users affected', status: 'Resolved', owner: 'Sara Al-Otaibi', assignmentGroup: 'SAP Basis', relatedCI: 'SAP-ECC-PRD', rcaStatus: 'Completed', createdDate: '2026-08-10 06:15', duration: '4h 30m' },
    { title: 'Data center cooling failure — Zone B', description: 'CRAC unit 4 in Zone B data center failed. Temperature rising above threshold. Emergency cooling procedures activated', service: 'Infrastructure Services', tower: 'Infrastructure', businessImpact: 'Risk of hardware shutdown in Zone B — 40 servers at risk', status: 'Resolved', owner: 'Ahmed Al-Qahtani', assignmentGroup: 'Infrastructure Operations', relatedCI: 'DC-CRAC-04', rcaStatus: 'Completed', createdDate: '2026-08-08 14:20', duration: '6h 10m' },
    { title: 'Firewall cluster failover — Perimeter', description: 'Primary Palo Alto firewall in HA cluster experienced hardware fault. Failover to secondary completed with 3-minute traffic disruption', service: 'Security Operations', tower: 'Security', businessImpact: 'All internet traffic disrupted for 3 minutes during failover', status: 'Closed', owner: 'Daniel Mathew', assignmentGroup: 'Security Operations', relatedCI: 'FW-PALO-PRD-01', rcaStatus: 'Completed', createdDate: '2026-08-06 22:45', duration: '2h 20m' },
    { title: 'Azure AD sync failure — Identity Services', description: 'Azure AD Connect synchronization failed causing authentication issues for cloud applications. Users unable to access M365 services', service: 'Identity & Access', tower: 'Security', businessImpact: 'Cloud SSO authentication failing for 500+ users', status: 'In Progress', owner: 'Daniel Mathew', assignmentGroup: 'Security Operations', relatedCI: 'AAD-SYNC-01', rcaStatus: 'Pending', createdDate: '2026-08-13 05:30', duration: '1h 45m' },
    { title: 'Storage array controller failure — SAN-01', description: 'Dell PowerStore SAN-01 primary controller offline. I/O failover to secondary controller successful but performance degraded', service: 'Infrastructure Services', tower: 'Infrastructure', businessImpact: 'Storage I/O latency increased 3x affecting all hosted VMs', status: 'In Progress', owner: 'Ahmed Al-Qahtani', assignmentGroup: 'Infrastructure Operations', relatedCI: 'SAN-DELL-01', rcaStatus: 'Pending', createdDate: '2026-08-13 03:15', duration: '4h 00m' },
    { title: 'WAN link failure — Jeddah branch', description: 'Primary MPLS link to Jeddah branch office down. Traffic rerouted via backup internet VPN with reduced bandwidth', service: 'Enterprise Network Services', tower: 'Network', businessImpact: 'Jeddah office users experiencing slow connectivity — 80 users affected', status: 'Closed', owner: 'Mohammed Al-Dosari', assignmentGroup: 'Network Operations', relatedCI: 'WAN-JED-01', rcaStatus: 'Completed', createdDate: '2026-08-05 09:00', duration: '8h 30m' },
  ];

  p1Incidents.forEach((inc, idx) => {
    result.push({
      id: `INC004${8720 - idx}`,
      priority: 'P1',
      title: inc.title!,
      description: inc.description!,
      service: inc.service!,
      tower: inc.tower!,
      businessImpact: inc.businessImpact!,
      status: inc.status as Incident['status'],
      owner: inc.owner!,
      reportedBy: reporters[idx % reporters.length],
      assignmentGroup: inc.assignmentGroup!,
      assignedEngineer: inc.owner!,
      elapsedTime: inc.duration!,
      duration: inc.duration!,
      relatedCI: inc.relatedCI!,
      relatedChange: inc.relatedChange,
      rcaStatus: inc.rcaStatus,
      createdDate: inc.createdDate!,
      updatedDate: inc.createdDate!,
      source: 'ServiceNow',
    });
  });

  // ─── P2 Incidents (15 records) ──────────────────────────────
  const p2Titles = [
    { title: 'AppDynamics transaction latency — SAP PO middleware', tower: 'Applications', service: 'SAP Middleware', impact: 'SAP PO middleware response time exceeded 8s threshold' },
    { title: 'VMware ESXi host memory utilization critical', tower: 'Infrastructure', service: 'Infrastructure Services', impact: 'Host ESX-02 at 92% memory — VM performance degraded' },
    { title: 'DNS resolution failures — Internal DNS cluster', tower: 'Network', service: 'Enterprise Network Services', impact: 'Intermittent DNS resolution failures affecting application connectivity' },
    { title: 'Splunk indexer cluster rebalancing', tower: 'Security', service: 'Monitoring Services', impact: 'Search performance degraded during cluster rebalance' },
    { title: 'Exchange Online mailbox migration failures', tower: 'Digital Workplace', service: 'End User Computing', impact: '25 mailboxes failed to migrate — users without email access' },
    { title: 'Load balancer health check failures — Web farm', tower: 'Infrastructure', service: 'Application Services', impact: 'Web farm pool members flapping — intermittent 503 errors' },
    { title: 'GCP Cloud SQL replication lag', tower: 'Cloud', service: 'Cloud Platform Services', impact: 'Read replica lag exceeding 30 seconds for reporting queries' },
    { title: 'Backup job failures — Commvault', tower: 'Infrastructure', service: 'Infrastructure Services', impact: '12 backup jobs failed overnight — RPO at risk' },
    { title: 'Active Directory replication delay', tower: 'Security', service: 'Identity & Access', impact: 'AD replication between sites delayed by 45 minutes' },
    { title: 'SAP BW process chain failure', tower: 'SAP', service: 'SAP Middleware', impact: 'Business warehouse ETL process chain failed — reporting data stale' },
    { title: 'Network switch firmware vulnerability', tower: 'Network', service: 'Enterprise Network Services', impact: 'CVE-2026-1234 identified on 8 access layer switches' },
    { title: 'VDI session broker overloaded', tower: 'Digital Workplace', service: 'End User Computing', impact: 'Virtual desktop connection broker at capacity — new sessions rejected' },
    { title: 'Oracle database tablespace near capacity', tower: 'Database', service: 'Database Services', impact: 'USERS tablespace at 94% — risk of application failure' },
    { title: 'API gateway rate limiting triggered', tower: 'Applications', service: 'Application Services', impact: 'External API consumers getting 429 errors' },
    { title: 'Certificate expiry — Load balancer SSL', tower: 'Security', service: 'Security Operations', impact: 'SSL certificate expiring in 48 hours on production load balancer' },
  ];

  p2Titles.forEach((p2, idx) => {
    const statusArr: Incident['status'][] = ['In Progress', 'Open', 'Resolved', 'Closed'];
    result.push({
      id: `INC004${8700 + idx}`,
      priority: 'P2',
      title: p2.title,
      description: `${p2.title}. Investigation and remediation in progress by ${assignmentGroups[idx % assignmentGroups.length]}.`,
      service: p2.service,
      tower: p2.tower,
      businessImpact: p2.impact,
      status: statusArr[idx % statusArr.length],
      owner: owners[idx % owners.length],
      reportedBy: reporters[idx % reporters.length],
      assignmentGroup: assignmentGroups[idx % assignmentGroups.length],
      assignedEngineer: owners[(idx + 3) % owners.length],
      elapsedTime: `${1 + idx}h ${10 + idx * 7}m`,
      duration: `${1 + idx}h ${10 + idx * 7}m`,
      relatedCI: `CI-${p2.tower.substring(0, 3).toUpperCase()}-${100 + idx}`,
      createdDate: `2026-08-${String(5 + (idx % 8)).padStart(2, '0')} ${String(6 + idx % 12).padStart(2, '0')}:${String(idx * 7 % 60).padStart(2, '0')}`,
      updatedDate: `2026-08-${String(10 + (idx % 4)).padStart(2, '0')} ${String(8 + idx % 10).padStart(2, '0')}:${String(idx * 11 % 60).padStart(2, '0')}`,
      source: 'ServiceNow',
    });
  });

  // ─── P3 Incidents (50 records) ──────────────────────────────
  const p3Templates = [
    'User unable to access shared drive', 'Printer not responding on floor', 'Software installation request', 'Email delivery delay', 'VPN connection timeout',
    'Application login failure', 'Slow network performance', 'Monitor display issue', 'Password reset failure', 'File permission error',
    'Outlook crash on startup', 'Teams call quality issue', 'WiFi connectivity drops', 'Laptop docking station failure', 'USB device not recognized',
    'Browser certificate warning', 'Application update required', 'Database query timeout', 'Report generation failure', 'Batch job delay',
    'Server disk space warning', 'Memory utilization alert', 'CPU spike on web server', 'Log rotation failure', 'Scheduled task not running',
    'User account locked out', 'MFA token sync issue', 'Remote desktop disconnection', 'Citrix session freeze', 'Mobile device enrollment',
    'Intune policy not applying', 'OneDrive sync conflict', 'SharePoint permission issue', 'Power BI report error', 'SCCM client health',
    'Antivirus definition update failure', 'Firewall rule request', 'SSL certificate renewal', 'DNS record update', 'DHCP scope exhaustion',
    'Backup notification failure', 'Monitoring alert noise', 'Service restart required', 'Configuration drift detected', 'Patch compliance gap',
    'Vendor portal access issue', 'License activation failure', 'Cloud resource provisioning', 'Container pod restart loop', 'API response degradation',
  ];

  p3Templates.forEach((title, idx) => {
    const twr = towers[idx % towers.length];
    const statusArr: Incident['status'][] = ['Open', 'In Progress', 'Resolved', 'Closed', 'Closed'];
    result.push({
      id: `INC004${8600 + idx}`,
      priority: 'P3',
      title: `${title} — ${twr}`,
      description: `${title}. Ticket raised by end user / monitoring system. Assigned to ${assignmentGroups[idx % assignmentGroups.length]} for resolution.`,
      service: services[idx % services.length],
      tower: twr,
      businessImpact: 'Limited user impact — workaround available',
      status: statusArr[idx % statusArr.length],
      owner: owners[idx % owners.length],
      reportedBy: reporters[idx % reporters.length],
      assignmentGroup: assignmentGroups[idx % assignmentGroups.length],
      assignedEngineer: owners[(idx + 2) % owners.length],
      elapsedTime: `${idx + 1}h`,
      duration: `${idx + 1}h`,
      relatedCI: `CI-${twr.substring(0, 3).toUpperCase()}-${200 + idx}`,
      createdDate: `2026-08-${String(1 + (idx % 12)).padStart(2, '0')} ${String(7 + idx % 12).padStart(2, '0')}:${String(idx * 3 % 60).padStart(2, '0')}`,
      updatedDate: `2026-08-${String(8 + (idx % 5)).padStart(2, '0')} ${String(9 + idx % 8).padStart(2, '0')}:${String(idx * 13 % 60).padStart(2, '0')}`,
      source: 'ServiceNow',
    });
  });

  // ─── P4 Incidents (30 records) ──────────────────────────────
  const p4Templates = [
    'Documentation update request', 'Knowledge article review', 'Feature enhancement request', 'Cosmetic UI issue', 'Report formatting change',
    'Dashboard widget request', 'Access recertification', 'Group membership update', 'Distribution list change', 'Calendar sharing issue',
    'Training environment setup', 'Test data refresh', 'Dev environment rebuild', 'Code review finding', 'Monitoring threshold adjustment',
    'CMDB record correction', 'Asset tag update', 'Vendor contact update', 'SLA reporting format', 'Audit log export request',
    'Service catalog update', 'Change template modification', 'Workflow adjustment', 'Notification configuration', 'Approval chain update',
    'Naming convention update', 'Backup schedule review', 'Maintenance window change', 'Resource group rename', 'Tag policy update',
  ];

  p4Templates.forEach((title, idx) => {
    const twr = towers[idx % towers.length];
    const statusArr: Incident['status'][] = ['Open', 'In Progress', 'Closed', 'Closed', 'Resolved'];
    result.push({
      id: `INC004${8500 + idx}`,
      priority: 'P4',
      title: `${title} — ${twr}`,
      description: `${title}. Low priority request logged for scheduled processing.`,
      service: services[idx % services.length],
      tower: twr,
      businessImpact: 'No immediate business impact — enhancement request',
      status: statusArr[idx % statusArr.length],
      owner: owners[idx % owners.length],
      reportedBy: reporters[idx % reporters.length],
      assignmentGroup: assignmentGroups[idx % assignmentGroups.length],
      assignedEngineer: owners[(idx + 1) % owners.length],
      elapsedTime: `${idx * 2 + 1}h`,
      duration: `${idx * 2 + 1}h`,
      relatedCI: '',
      createdDate: `2026-08-${String(1 + (idx % 12)).padStart(2, '0')} ${String(8 + idx % 10).padStart(2, '0')}:${String(idx * 7 % 60).padStart(2, '0')}`,
      updatedDate: `2026-08-${String(10 + (idx % 3)).padStart(2, '0')} 14:00`,
      source: 'ServiceNow',
    });
  });

  return result;
}

export const incidents: Incident[] = genIncidents();

// ─── Helper Functions ─────────────────────────────────────────
export function getIncidentStats() {
  const p1 = incidents.filter(i => i.priority === 'P1' && (i.status === 'Open' || i.status === 'In Progress')).length;
  const p2 = incidents.filter(i => i.priority === 'P2' && (i.status === 'Open' || i.status === 'In Progress')).length;
  const open = incidents.filter(i => i.status === 'Open' || i.status === 'In Progress').length;
  const resolved = incidents.filter(i => i.status === 'Resolved' || i.status === 'Closed').length;
  return { p1, p2, p1p2Open: p1 + p2, open, resolved, total: incidents.length };
}

export function getCriticalIncidents() {
  return incidents.filter(i => i.priority === 'P1' || i.priority === 'P2');
}

// ─── HEALTH GRID ──────────────────────────────────────────────
export type HealthStatus = 'healthy' | 'at-risk' | 'attention' | 'degraded' | 'critical' | 'data-stale';

export interface HealthGridItem {
  domain: string;
  health: HealthStatus;
  exceptions: number;
  trend: 'up' | 'down' | 'stable';
  path: string;
}

export const healthGrid: HealthGridItem[] = [
  { domain: 'Infrastructure', health: 'healthy', exceptions: 1, trend: 'up', path: '/infrastructure/overview' },
  { domain: 'Network', health: 'at-risk', exceptions: 3, trend: 'down', path: '/infrastructure/network' },
  { domain: 'Database', health: 'attention', exceptions: 2, trend: 'stable', path: '/infrastructure/database' },
  { domain: 'Application Services', health: 'healthy', exceptions: 0, trend: 'up', path: '/applications/health' },
  { domain: 'Cloud Platform', health: 'healthy', exceptions: 0, trend: 'up', path: '/infrastructure/cloud' },
  { domain: 'Security Operations', health: 'at-risk', exceptions: 2, trend: 'stable', path: '/technology/security' },
  { domain: 'Digital Workplace', health: 'healthy', exceptions: 1, trend: 'up', path: '/infrastructure/digital-workplace' },
  { domain: 'Service Desk', health: 'healthy', exceptions: 0, trend: 'up', path: '/command-center/service-desk' },
  { domain: 'SAP Operations', health: 'attention', exceptions: 1, trend: 'stable', path: '/applications/health' },
];

// ─── MANAGEMENT EXCEPTIONS ────────────────────────────────────
export interface ManagementException {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
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
  { id: 'EXC-001', title: 'Oracle RAC Production Failover', description: 'Oracle RAC node 2 experienced unexpected failover. Financial reporting batch delayed.', severity: 'critical', impact: 'Financial systems reporting delayed by 2+ hours', owner: 'Omar Al-Mutairi', sourceSystem: 'ServiceNow', timestamp: '2026-08-12 07:00', status: 'Active', relatedService: 'Database Services', relatedTechnology: 'Oracle RAC', recommendedAction: 'Monitor RAC interconnect. Emergency patch CHG0012845 pending CAB approval.' },
  { id: 'EXC-002', title: 'Network Switch Degradation — Building A', description: 'Core switch CRC errors causing intermittent connectivity issues for 200+ users.', severity: 'critical', impact: 'Building A floors 3-5 connectivity impacted', owner: 'Mohammed Al-Dosari', sourceSystem: 'SolarWinds NPM', timestamp: '2026-08-12 08:27', status: 'Active', relatedService: 'Enterprise Network', relatedTechnology: 'Cisco Nexus 9000', recommendedAction: 'Replace suspect SFP modules. Schedule maintenance window.' },
  { id: 'EXC-003', title: 'Storage Controller Failure — SAN-01', description: 'Primary controller offline on Dell PowerStore SAN-01. I/O operating on secondary controller.', severity: 'critical', impact: 'Storage I/O latency increased 3x for all hosted VMs', owner: 'Ahmed Al-Qahtani', sourceSystem: 'Dell Storage Manager', timestamp: '2026-08-13 03:15', status: 'Active', relatedService: 'Infrastructure Services', relatedTechnology: 'Dell PowerStore', recommendedAction: 'Engage Dell ProSupport for controller replacement. Monitor secondary controller health.' },
  { id: 'EXC-004', title: 'Splunk License Approaching Ceiling', description: 'Splunk Enterprise ingest volume at 87% of licensed capacity. Risk of indexing suspension.', severity: 'warning', impact: 'Security monitoring and log analysis at risk', owner: 'Noura Al-Qahtani', sourceSystem: 'Splunk Enterprise', timestamp: '2026-08-11 14:00', status: 'Active', relatedService: 'Monitoring Services', relatedTechnology: 'Splunk Enterprise', recommendedAction: 'Filter verbose debug streams. Expedite license expansion procurement.' },
  { id: 'EXC-005', title: 'Certificate Renewal Queue — AppViewX', description: '14 SSL certificates approaching expiry within 30 days. ACME automation integration pending.', severity: 'warning', impact: 'Service disruption risk if certificates expire', owner: 'Daniel Mathew', sourceSystem: 'AppViewX PKI', timestamp: '2026-08-10 16:00', status: 'Active', relatedService: 'Security Operations', relatedTechnology: 'AppViewX PKI', recommendedAction: 'Manual renewal of top 5 critical certificates. Accelerate ACME integration.' },
  { id: 'EXC-006', title: 'NOC Night Shift Resource Gap', description: 'Unplanned leave has created a resource gap in NOC night shift coverage.', severity: 'warning', impact: 'Reduced monitoring coverage during night shift', owner: 'Faisal Al-Harbi', sourceSystem: 'HRMS', timestamp: '2026-08-12 06:00', status: 'Active', relatedService: 'Operations', relatedTechnology: 'N/A', recommendedAction: 'Activate on-call engineer roster rotation. Confirm replacement by EOD.' },
  { id: 'EXC-007', title: 'Azure AD Sync Failure', description: 'Azure AD Connect synchronization failed. Cloud SSO authentication affected.', severity: 'critical', impact: '500+ users unable to authenticate to cloud services', owner: 'Daniel Mathew', sourceSystem: 'Azure AD', timestamp: '2026-08-13 05:30', status: 'Active', relatedService: 'Identity Services', relatedTechnology: 'Azure AD Connect', recommendedAction: 'Restart sync service. Check connectivity to on-premises AD.' },
];
