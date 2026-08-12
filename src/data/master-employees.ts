/**
 * Master Demo Dataset for NCGR ITMS Managed Operations
 * Fictional but internally consistent environment representing ONE real NCGR ITMS system.
 */

export interface MasterEmployee {
  employeeId: string;
  name: string;
  role: string;
  tower: string;
  location: string;
  manager: string;
  mobile: string;
  email: string;
  status: 'Active' | 'On Leave' | 'Standby' | 'Remote';
  shift: 'Morning (06:00-14:00)' | 'Evening (14:00-22:00)' | 'Night (22:00-06:00)';
  joiningDate: string;
}

export const masterEmployees: MasterEmployee[] = [
  { employeeId: 'NCGR-1001', name: 'Faisal Al-Harbi', role: 'ITMS Service Delivery Manager', tower: 'Service Management', location: 'Riyadh Primary', manager: 'Executive Leadership', mobile: '+966 55 284 7316', email: 'faisal.alharbi@demo.ncgr.local', status: 'Active', shift: 'Morning (06:00-14:00)', joiningDate: '2022-03-15' },
  { employeeId: 'NCGR-1002', name: 'Ahmed Al-Qahtani', role: 'Infrastructure Operations Lead', tower: 'Infrastructure', location: 'Riyadh Primary', manager: 'Faisal Al-Harbi', mobile: '+966 54 671 9284', email: 'ahmed.alqahtani@demo.ncgr.local', status: 'Active', shift: 'Morning (06:00-14:00)', joiningDate: '2022-05-01' },
  { employeeId: 'NCGR-1003', name: 'Mohammed Al-Dosari', role: 'Network Operations Lead', tower: 'Network', location: 'Riyadh Primary', manager: 'Faisal Al-Harbi', mobile: '+966 50 394 6158', email: 'mohammed.aldosari@demo.ncgr.local', status: 'Active', shift: 'Morning (06:00-14:00)', joiningDate: '2022-06-10' },
  { employeeId: 'NCGR-1004', name: 'Sara Al-Otaibi', role: 'Application Support Lead', tower: 'Application Support', location: 'Riyadh Primary', manager: 'Faisal Al-Harbi', mobile: '+966 55 728 4163', email: 'sara.alotaibi@demo.ncgr.local', status: 'Active', shift: 'Morning (06:00-14:00)', joiningDate: '2023-01-15' },
  { employeeId: 'NCGR-1005', name: 'Khalid Al-Shammari', role: 'NOC Senior Engineer', tower: 'NOC', location: 'Riyadh Primary', manager: 'Mohammed Al-Dosari', mobile: '+966 53 641 9275', email: 'khalid.alshammari@demo.ncgr.local', status: 'Active', shift: 'Night (22:00-06:00)', joiningDate: '2023-03-20' },
  { employeeId: 'NCGR-1006', name: 'Priya Nair', role: 'Cloud Engineer', tower: 'Cloud', location: 'Riyadh Primary', manager: 'Ahmed Al-Qahtani', mobile: '+966 56 318 4729', email: 'priya.nair@demo.ncgr.local', status: 'Active', shift: 'Morning (06:00-14:00)', joiningDate: '2023-04-12' },
  { employeeId: 'NCGR-1007', name: 'Omar Al-Mutairi', role: 'Database Administrator', tower: 'Database', location: 'Riyadh DR', manager: 'Ahmed Al-Qahtani', mobile: '+966 54 285 7319', email: 'omar.almutairi@demo.ncgr.local', status: 'Active', shift: 'Evening (14:00-22:00)', joiningDate: '2022-09-01' },
  { employeeId: 'NCGR-1008', name: 'Aisha Rahman', role: 'Service Desk Lead', tower: 'Service Desk', location: 'Riyadh Primary', manager: 'Faisal Al-Harbi', mobile: '+966 55 416 8293', email: 'aisha.rahman@demo.ncgr.local', status: 'Active', shift: 'Morning (06:00-14:00)', joiningDate: '2023-02-01' },
  { employeeId: 'NCGR-1009', name: 'Arjun Menon', role: 'Automation Engineer', tower: 'Automation & AI', location: 'Riyadh Primary', manager: 'Faisal Al-Harbi', mobile: '+966 56 729 3154', email: 'arjun.menon@demo.ncgr.local', status: 'Active', shift: 'Morning (06:00-14:00)', joiningDate: '2023-07-15' },
  { employeeId: 'NCGR-1010', name: 'Noura Al-Qahtani', role: 'Program Manager', tower: 'Program Management', location: 'Riyadh Primary', manager: 'Faisal Al-Harbi', mobile: '+966 55 831 4627', email: 'noura.alqahtani@demo.ncgr.local', status: 'Active', shift: 'Morning (06:00-14:00)', joiningDate: '2022-01-10' },
  { employeeId: 'NCGR-1011', name: 'Rakesh Kumar', role: 'Infrastructure Engineer', tower: 'Infrastructure', location: 'Riyadh DR', manager: 'Ahmed Al-Qahtani', mobile: '+966 54 316 7825', email: 'rakesh.kumar@demo.ncgr.local', status: 'Active', shift: 'Evening (14:00-22:00)', joiningDate: '2023-05-18' },
  { employeeId: 'NCGR-1012', name: 'Layla Hassan', role: 'Digital Workplace Engineer', tower: 'Digital Workplace', location: 'Riyadh Primary', manager: 'Ahmed Al-Qahtani', mobile: '+966 55 692 4173', email: 'layla.hassan@demo.ncgr.local', status: 'Active', shift: 'Morning (06:00-14:00)', joiningDate: '2023-08-01' },
  { employeeId: 'NCGR-1013', name: 'Daniel Mathew', role: 'Security Engineer', tower: 'Security', location: 'Riyadh Primary', manager: 'Faisal Al-Harbi', mobile: '+966 56 483 9217', email: 'daniel.mathew@demo.ncgr.local', status: 'Active', shift: 'Morning (06:00-14:00)', joiningDate: '2023-06-01' },
  { employeeId: 'NCGR-1014', name: 'Huda Al-Salem', role: 'Change Manager', tower: 'Service Management', location: 'Riyadh Primary', manager: 'Faisal Al-Harbi', mobile: '+966 54 817 3264', email: 'huda.alsalem@demo.ncgr.local', status: 'Active', shift: 'Morning (06:00-14:00)', joiningDate: '2022-11-15' },
  { employeeId: 'NCGR-1015', name: 'Vivek Srinivasan', role: 'FinOps Analyst', tower: 'Program Management', location: 'Riyadh Primary', manager: 'Noura Al-Qahtani', mobile: '+966 55 374 8291', email: 'vivek.srinivasan@demo.ncgr.local', status: 'Active', shift: 'Morning (06:00-14:00)', joiningDate: '2023-09-01' },
];

// ─── ACTIVITY CHECKLIST DATA (Section 5) ──────────────────────
export interface ActivityItem {
  id: string;
  activity: string;
  tower: string;
  owner: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  dueTime: string;
  status: 'Completed' | 'Pending' | 'Overdue';
  lastCompleted: string;
  nextDue: string;
  remarks: string;
}

export const activityChecklistItems: ActivityItem[] = [
  { id: 'ACT-CHK-01', activity: 'Daily Infrastructure Health Review', tower: 'Infrastructure', owner: 'Ahmed Al-Qahtani', frequency: 'Daily', dueTime: '08:00 AM', status: 'Completed', lastCompleted: '2026-08-12 07:45 AM', nextDue: '2026-08-13 08:00 AM', remarks: '286 compute nodes verified' },
  { id: 'ACT-CHK-02', activity: 'NOC Monitoring Validation', tower: 'NOC', owner: 'Khalid Al-Shammari', frequency: 'Daily', dueTime: '06:30 AM', status: 'Completed', lastCompleted: '2026-08-12 06:15 AM', nextDue: '2026-08-13 06:30 AM', remarks: '1,248 monitored assets normal' },
  { id: 'ACT-CHK-03', activity: 'Network Device Health Review', tower: 'Network', owner: 'Mohammed Al-Dosari', frequency: 'Daily', dueTime: '09:00 AM', status: 'Completed', lastCompleted: '2026-08-12 08:50 AM', nextDue: '2026-08-13 09:00 AM', remarks: '48 core network switches verified' },
  { id: 'ACT-CHK-04', activity: 'Database Backup Validation', tower: 'Database', owner: 'Omar Al-Mutairi', frequency: 'Daily', dueTime: '07:00 AM', status: 'Completed', lastCompleted: '2026-08-12 06:45 AM', nextDue: '2026-08-13 07:00 AM', remarks: '34 enterprise DB backups successful' },
  { id: 'ACT-CHK-05', activity: 'Cloud Capacity Review', tower: 'Cloud', owner: 'Priya Nair', frequency: 'Weekly', dueTime: '11:00 AM', status: 'Pending', lastCompleted: '2026-08-05 10:30 AM', nextDue: '2026-08-12 11:00 AM', remarks: 'GCP & Azure quota check in progress' },
  { id: 'ACT-CHK-06', activity: 'Application Batch Validation', tower: 'Application Support', owner: 'Sara Al-Otaibi', frequency: 'Daily', dueTime: '08:30 AM', status: 'Completed', lastCompleted: '2026-08-12 08:15 AM', nextDue: '2026-08-13 08:30 AM', remarks: 'SAP & Oracle batch runs cleared' },
  { id: 'ACT-CHK-07', activity: 'Backup Restore Test', tower: 'Infrastructure', owner: 'Rakesh Kumar', frequency: 'Weekly', dueTime: '02:00 PM', status: 'Overdue', lastCompleted: '2026-07-29 02:00 PM', nextDue: '2026-08-05 02:00 PM', remarks: 'Requires DR storage array access' },
  { id: 'ACT-CHK-08', activity: 'Security Patch Compliance Review', tower: 'Security', owner: 'Daniel Mathew', frequency: 'Weekly', dueTime: '04:00 PM', status: 'Pending', lastCompleted: '2026-08-05 03:30 PM', nextDue: '2026-08-12 04:00 PM', remarks: 'Patching compliance at 94.2%' },
  { id: 'ACT-CHK-09', activity: 'ServiceNow Integration Health Check', tower: 'Automation & AI', owner: 'Arjun Menon', frequency: 'Daily', dueTime: '09:30 AM', status: 'Completed', lastCompleted: '2026-08-12 09:10 AM', nextDue: '2026-08-13 09:30 AM', remarks: 'REST APIs & CMDB discovery active' },
  { id: 'ACT-CHK-10', activity: 'Major Incident Readiness Check', tower: 'Service Desk', owner: 'Aisha Rahman', frequency: 'Weekly', dueTime: '10:00 AM', status: 'Completed', lastCompleted: '2026-08-10 09:45 AM', nextDue: '2026-08-17 10:00 AM', remarks: 'On-call bridge lines operational' },
  { id: 'ACT-CHK-11', activity: 'DR Replication Validation', tower: 'Database', owner: 'Omar Al-Mutairi', frequency: 'Weekly', dueTime: '12:00 PM', status: 'Completed', lastCompleted: '2026-08-08 11:30 AM', nextDue: '2026-08-15 12:00 PM', remarks: 'Riyadh DR lag < 15 seconds' },
  { id: 'ACT-CHK-12', activity: 'Monitoring Alert Review', tower: 'NOC', owner: 'Khalid Al-Shammari', frequency: 'Daily', dueTime: '05:00 PM', status: 'Completed', lastCompleted: '2026-08-11 04:50 PM', nextDue: '2026-08-12 05:00 PM', remarks: 'Triage rules tuned for Splunk' },
  { id: 'ACT-CHK-13', activity: 'Vendor Action Review', tower: 'Program Management', owner: 'Noura Al-Qahtani', frequency: 'Weekly', dueTime: '03:00 PM', status: 'Pending', lastCompleted: '2026-08-05 02:30 PM', nextDue: '2026-08-12 03:00 PM', remarks: 'Reviewing Gulf Tech SLA report' },
  { id: 'ACT-CHK-14', activity: 'Shift Handover Quality Review', tower: 'Service Management', owner: 'Faisal Al-Harbi', frequency: 'Daily', dueTime: '07:30 AM', status: 'Completed', lastCompleted: '2026-08-12 07:20 AM', nextDue: '2026-08-13 07:30 AM', remarks: 'Handover logs complete for all towers' },
  { id: 'ACT-CHK-15', activity: 'Weekly Operational Governance Review', tower: 'Service Management', owner: 'Faisal Al-Harbi', frequency: 'Weekly', dueTime: '05:00 PM', status: 'Pending', lastCompleted: '2026-08-05 04:30 PM', nextDue: '2026-08-12 05:00 PM', remarks: 'Agenda prepared for SDM sync' },
];

// ─── HANDOVER LOGS DATA (Section 5) ──────────────────────────
export interface HandoverRecord {
  id: string;
  date: string;
  outgoingEngineer: string;
  incomingEngineer: string;
  tower: string;
  shift: string;
  criticalEvents: string;
  openIncidents: string;
  pendingActions: string;
  risks: string;
  dependencies: string;
  status: 'Completed' | 'Attention Required' | 'In Progress';
}

export const handoverLogsList: HandoverRecord[] = [
  { id: 'HL-2401', date: '2026-08-12', outgoingEngineer: 'Mohammed Al-Dosari', incomingEngineer: 'Khalid Al-Shammari', tower: 'Network', shift: 'Morning → Evening', criticalEvents: 'Core router B interface reset performed at 10:15 AM', openIncidents: 'INC-26082 (P2 WAN Latency)', pendingActions: 'Verify BGP route metrics', risks: 'High WAN utilization during peak hours', dependencies: 'STC Link Provider', status: 'Completed' },
  { id: 'HL-2402', date: '2026-08-12', outgoingEngineer: 'Rakesh Kumar', incomingEngineer: 'Ahmed Al-Qahtani', tower: 'Infrastructure', shift: 'Night → Morning', criticalEvents: 'VMware host ESX-04 maintenance mode cleared', openIncidents: 'None', pendingActions: 'Run backup restore test on INF-003', risks: 'Memory utilization at 83% on host ESX-02', dependencies: 'Storage SAN Array', status: 'Completed' },
  { id: 'HL-2403', date: '2026-08-12', outgoingEngineer: 'Omar Al-Mutairi', incomingEngineer: 'Ahmed Al-Qahtani', tower: 'Database', shift: 'Evening → Night', criticalEvents: 'Oracle RAC DR node sync catchup initiated', openIncidents: 'INC-26083 (DB Replication Delay)', pendingActions: 'Monitor redo log apply rate', risks: 'Replication lag increased to 45s', dependencies: 'Riyadh DR Link', status: 'Attention Required' },
  { id: 'HL-2404', date: '2026-08-11', outgoingEngineer: 'Khalid Al-Shammari', incomingEngineer: 'Aisha Rahman', tower: 'NOC / Service Desk', shift: 'Night → Morning', criticalEvents: 'Splunk ITSI alert volume normal overnight', openIncidents: 'INC-26081 (P1 App Connectivity)', pendingActions: 'Follow up with Application Support Lead', risks: 'Connection pool warning', dependencies: 'Oracle DB Pool', status: 'Completed' },
  { id: 'HL-2405', date: '2026-08-11', outgoingEngineer: 'Priya Nair', incomingEngineer: 'Ahmed Al-Qahtani', tower: 'Cloud', shift: 'Morning → Evening', criticalEvents: 'GCP compute quota expansion request submitted', openIncidents: 'None', pendingActions: 'Review Azure SQL autoscale logs', risks: 'Cloud spend variance +4.7%', dependencies: 'FinOps Team', status: 'Completed' },
  { id: 'HL-2406', date: '2026-08-11', outgoingEngineer: 'Sara Al-Otaibi', incomingEngineer: 'Arjun Menon', tower: 'Application Support', shift: 'Morning → Evening', criticalEvents: 'SAP PO transaction throughput restored', openIncidents: 'INC-26081', pendingActions: 'Verify evening batch schedule', risks: 'High memory usage on WebLogic app server', dependencies: 'Middleware Team', status: 'Completed' },
  { id: 'HL-2407', date: '2026-08-10', outgoingEngineer: 'Daniel Mathew', incomingEngineer: 'Layla Hassan', tower: 'Security', shift: 'Morning → Evening', criticalEvents: 'BeyondTrust PAM policy update deployed', openIncidents: 'None', pendingActions: 'Audit privileged access logs', risks: '14 certificate renewals approaching', dependencies: 'AppViewX PKI', status: 'Completed' },
  { id: 'HL-2408', date: '2026-08-10', outgoingEngineer: 'Layla Hassan', incomingEngineer: 'Aisha Rahman', tower: 'Digital Workplace', shift: 'Evening → Night', criticalEvents: 'Teams & Exchange hybrid sync verified', openIncidents: 'None', pendingActions: 'Patch 45 remote endpoints', risks: 'VPN gateway CPU spike', dependencies: 'STC ExpressRoute', status: 'Completed' },
  { id: 'HL-2409', date: '2026-08-10', outgoingEngineer: 'Arjun Menon', incomingEngineer: 'Faisal Al-Harbi', tower: 'Automation & AI', shift: 'Morning → Evening', criticalEvents: 'Ansible remediation job expansion active', openIncidents: 'None', pendingActions: 'Review AI bot response logs', risks: 'Low training dataset for RCA assist', dependencies: 'ITSM Knowledge Base', status: 'Completed' },
  { id: 'HL-2410', date: '2026-08-09', outgoingEngineer: 'Huda Al-Salem', incomingEngineer: 'Faisal Al-Harbi', tower: 'Service Management', shift: 'Morning → Evening', criticalEvents: 'CAB meeting approved 3 changes for weekend', openIncidents: 'CHG-1092', pendingActions: 'Distribute approved change schedule', risks: 'Emergency patch pending approval', dependencies: 'CAB Lead', status: 'Completed' },
  { id: 'HL-2411', date: '2026-08-09', outgoingEngineer: 'Vivek Srinivasan', incomingEngineer: 'Noura Al-Qahtani', tower: 'Program Management', shift: 'Morning → Evening', criticalEvents: 'Monthly cloud budget review completed', openIncidents: 'None', pendingActions: 'Prepare WSR FinOps slide', risks: 'Idle VM cleanup pending owner approval', dependencies: 'Cloud Lead', status: 'Completed' },
  { id: 'HL-2412', date: '2026-08-08', outgoingEngineer: 'Mohammed Al-Dosari', incomingEngineer: 'Khalid Al-Shammari', tower: 'Network', shift: 'Evening → Night', criticalEvents: 'SD-WAN failover test successful', openIncidents: 'None', pendingActions: 'Verify WAN telemetry in SolarWinds', risks: 'Jeddah link latency elevated', dependencies: 'Telecom Vendor', status: 'Completed' },
  { id: 'HL-2413', date: '2026-08-08', outgoingEngineer: 'Ahmed Al-Qahtani', incomingEngineer: 'Rakesh Kumar', tower: 'Infrastructure', shift: 'Morning → Evening', criticalEvents: 'San storage firmware upgrade complete', openIncidents: 'None', pendingActions: 'Verify SAN multipathing on ESXi', risks: 'Storage volume at 72% capacity', dependencies: 'Vendor Support', status: 'Completed' },
  { id: 'HL-2414', date: '2026-08-07', outgoingEngineer: 'Omar Al-Mutairi', incomingEngineer: 'Ahmed Al-Qahtani', tower: 'Database', shift: 'Morning → Evening', criticalEvents: 'PostgreSQL cluster maintenance completed', openIncidents: 'None', pendingActions: 'Validate DB connection pool', risks: 'High query latency on reporting DB', dependencies: 'App Support', status: 'Completed' },
  { id: 'HL-2415', date: '2026-08-07', outgoingEngineer: 'Aisha Rahman', incomingEngineer: 'Khalid Al-Shammari', tower: 'Service Desk', shift: 'Evening → Night', criticalEvents: 'Service Desk queue cleared before shift end', openIncidents: '2 P3 tickets open', pendingActions: 'First-line triage for night tickets', risks: 'Reduced staffing during night shift', dependencies: 'On-Call Roster', status: 'Completed' },
];

// ─── OPERATIONS MOM & ACTIONS DATA (Section 5) ────────────────
export interface MomAction {
  id: string;
  meeting: string;
  date: string;
  action: string;
  owner: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  status: 'Open' | 'In Progress' | 'Completed' | 'Overdue';
  age: string;
  escalationRequired: boolean;
}

export const momActionsList: MomAction[] = [
  { id: 'ACT-001', meeting: 'Daily ITMS Ops Standup', date: '2026-08-10', action: 'Complete backup restore validation on INF-003 compute cluster', owner: 'Rakesh Kumar', priority: 'High', dueDate: '2026-08-15', status: 'In Progress', age: '2 days', escalationRequired: false },
  { id: 'ACT-002', meeting: 'Weekly Network Tower Governance', date: '2026-08-08', action: 'Review recurring WAN utilization alerts on STC link', owner: 'Mohammed Al-Dosari', priority: 'Medium', dueDate: '2026-08-14', status: 'Open', age: '4 days', escalationRequired: false },
  { id: 'ACT-003', meeting: 'ServiceNow Platform Review', date: '2026-08-05', action: 'Complete ServiceNow CMDB data-quality reconciliation for 4,300 CIs', owner: 'Arjun Menon', priority: 'High', dueDate: '2026-08-18', status: 'In Progress', age: '7 days', escalationRequired: false },
  { id: 'ACT-004', meeting: 'Monthly FinOps Steering', date: '2026-08-01', action: 'Finalize cloud cost optimization candidates for GCP compute Engine', owner: 'Vivek Srinivasan', priority: 'Medium', dueDate: '2026-08-20', status: 'Open', age: '11 days', escalationRequired: false },
  { id: 'ACT-005', meeting: 'NOC Operations Review', date: '2026-08-09', action: 'Close overdue monitoring coverage gaps for container nodes', owner: 'Khalid Al-Shammari', priority: 'High', dueDate: '2026-08-13', status: 'Open', age: '3 days', escalationRequired: true },
  { id: 'ACT-006', meeting: 'Database Operations Sync', date: '2026-08-07', action: 'Upgrade Oracle RAC interconnect bandwidth to 40Gbps', owner: 'Omar Al-Mutairi', priority: 'High', dueDate: '2026-08-25', status: 'In Progress', age: '5 days', escalationRequired: false },
  { id: 'ACT-007', meeting: 'Security Operations Governance', date: '2026-08-06', action: 'Automate ACME protocol integration for internal PKI certificates', owner: 'Daniel Mathew', priority: 'High', dueDate: '2026-08-18', status: 'In Progress', age: '6 days', escalationRequired: false },
  { id: 'ACT-008', meeting: 'Application Support Standup', date: '2026-08-11', action: 'Tune AppDynamics APM latency threshold rules for SAP PO', owner: 'Sara Al-Otaibi', priority: 'Medium', dueDate: '2026-08-16', status: 'In Progress', age: '1 day', escalationRequired: false },
  { id: 'ACT-009', meeting: 'Cloud Governance Committee', date: '2026-08-04', action: 'Schedule automated shutdown for non-production OpenShift dev clusters', owner: 'Priya Nair', priority: 'Medium', dueDate: '2026-08-22', status: 'Open', age: '8 days', escalationRequired: false },
  { id: 'ACT-010', meeting: 'Service Desk Review', date: '2026-08-10', action: 'Update level-1 password reset Knowledge Base article KB-108', owner: 'Aisha Rahman', priority: 'Low', dueDate: '2026-08-17', status: 'Completed', age: '2 days', escalationRequired: false },
  { id: 'ACT-011', meeting: 'Program Management Office', date: '2026-08-03', action: 'Obtain commercial sign-off for Splunk license capacity expansion', owner: 'Noura Al-Qahtani', priority: 'High', dueDate: '2026-08-12', status: 'Overdue', age: '9 days', escalationRequired: true },
  { id: 'ACT-012', meeting: 'Change Advisory Board', date: '2026-08-09', action: 'Review emergency patch backout procedure for Oracle RAC cluster', owner: 'Huda Al-Salem', priority: 'High', dueDate: '2026-08-14', status: 'Completed', age: '3 days', escalationRequired: false },
  { id: 'ACT-013', meeting: 'Digital Workplace Sync', date: '2026-08-08', action: 'Deploy Teams video endpoint bandwidth optimization policy', owner: 'Layla Hassan', priority: 'Low', dueDate: '2026-08-19', status: 'Open', age: '4 days', escalationRequired: false },
  { id: 'ACT-014', meeting: 'Daily ITMS Ops Standup', date: '2026-08-12', action: 'Confirm NOC night shift standby replacement resource assignment', owner: 'Faisal Al-Harbi', priority: 'High', dueDate: '2026-08-12', status: 'Completed', age: '0 days', escalationRequired: false },
  { id: 'ACT-015', meeting: 'Vendor SIAM Review', date: '2026-08-02', action: 'Audit Gulf Technology Services SLA penalty calculation report', owner: 'Noura Al-Qahtani', priority: 'Medium', dueDate: '2026-08-28', status: 'Open', age: '10 days', escalationRequired: false },
];

// ─── LEAVE MANAGEMENT DATA (Section 5) ────────────────────────
export interface LeaveRecord {
  id: string;
  employee: string;
  tower: string;
  leaveType: 'Annual Leave' | 'Emergency Leave' | 'Sick Leave' | 'Training Leave';
  startDate: string;
  endDate: string;
  days: number;
  approver: string;
  status: 'Approved' | 'Pending' | 'Rejected' | 'Upcoming';
  backupResource: string;
}

export const leaveRecordsList: LeaveRecord[] = [
  { id: 'LEV-101', employee: 'Faisal Al-Harbi', tower: 'Service Management', leaveType: 'Annual Leave', startDate: '2026-08-20', endDate: '2026-08-22', days: 3, approver: 'Noura Al-Qahtani', status: 'Approved', backupResource: 'Huda Al-Salem' },
  { id: 'LEV-102', employee: 'Omar Al-Mutairi', tower: 'Database', leaveType: 'Annual Leave', startDate: '2026-08-25', endDate: '2026-08-29', days: 5, approver: 'Ahmed Al-Qahtani', status: 'Pending', backupResource: 'Ahmed Al-Qahtani' },
  { id: 'LEV-103', employee: 'Rakesh Kumar', tower: 'Infrastructure', leaveType: 'Emergency Leave', startDate: '2026-08-10', endDate: '2026-08-11', days: 2, approver: 'Ahmed Al-Qahtani', status: 'Approved', backupResource: 'Ahmed Al-Qahtani' },
  { id: 'LEV-104', employee: 'Sara Al-Otaibi', tower: 'Application Support', leaveType: 'Training Leave', startDate: '2026-09-01', endDate: '2026-09-03', days: 3, approver: 'Faisal Al-Harbi', status: 'Upcoming', backupResource: 'Arjun Menon' },
  { id: 'LEV-105', employee: 'Khalid Al-Shammari', tower: 'NOC', leaveType: 'Sick Leave', startDate: '2026-08-04', endDate: '2026-08-05', days: 2, approver: 'Mohammed Al-Dosari', status: 'Approved', backupResource: 'Mohammed Al-Dosari' },
  { id: 'LEV-106', employee: 'Priya Nair', tower: 'Cloud', leaveType: 'Annual Leave', startDate: '2026-09-10', endDate: '2026-09-18', days: 7, approver: 'Ahmed Al-Qahtani', status: 'Approved', backupResource: 'Rakesh Kumar' },
  { id: 'LEV-107', employee: 'Daniel Mathew', tower: 'Security', leaveType: 'Training Leave', startDate: '2026-08-18', endDate: '2026-08-19', days: 2, approver: 'Faisal Al-Harbi', status: 'Pending', backupResource: 'Layla Hassan' },
  { id: 'LEV-108', employee: 'Arjun Menon', tower: 'Automation & AI', leaveType: 'Annual Leave', startDate: '2026-08-28', endDate: '2026-09-02', days: 4, approver: 'Faisal Al-Harbi', status: 'Upcoming', backupResource: 'Priya Nair' },
  { id: 'LEV-109', employee: 'Layla Hassan', tower: 'Digital Workplace', leaveType: 'Emergency Leave', startDate: '2026-07-28', endDate: '2026-07-29', days: 2, approver: 'Ahmed Al-Qahtani', status: 'Approved', backupResource: 'Aisha Rahman' },
  { id: 'LEV-110', employee: 'Aisha Rahman', tower: 'Service Desk', leaveType: 'Annual Leave', startDate: '2026-09-05', endDate: '2026-09-12', days: 6, approver: 'Faisal Al-Harbi', status: 'Upcoming', backupResource: 'Huda Al-Salem' },
  { id: 'LEV-111', employee: 'Mohammed Al-Dosari', tower: 'Network', leaveType: 'Annual Leave', startDate: '2026-09-15', endDate: '2026-09-22', days: 6, approver: 'Faisal Al-Harbi', status: 'Pending', backupResource: 'Khalid Al-Shammari' },
  { id: 'LEV-112', employee: 'Ahmed Al-Qahtani', tower: 'Infrastructure', leaveType: 'Annual Leave', startDate: '2026-10-01', endDate: '2026-10-08', days: 6, approver: 'Faisal Al-Harbi', status: 'Approved', backupResource: 'Rakesh Kumar' },
  { id: 'LEV-113', employee: 'Noura Al-Qahtani', tower: 'Program Management', leaveType: 'Training Leave', startDate: '2026-08-24', endDate: '2026-08-25', days: 2, approver: 'Faisal Al-Harbi', status: 'Approved', backupResource: 'Vivek Srinivasan' },
  { id: 'LEV-114', employee: 'Huda Al-Salem', tower: 'Service Management', leaveType: 'Annual Leave', startDate: '2026-09-20', endDate: '2026-09-25', days: 5, approver: 'Faisal Al-Harbi', status: 'Upcoming', backupResource: 'Faisal Al-Harbi' },
  { id: 'LEV-115', employee: 'Vivek Srinivasan', tower: 'Program Management', leaveType: 'Sick Leave', startDate: '2026-08-01', endDate: '2026-08-01', days: 1, approver: 'Noura Al-Qahtani', status: 'Approved', backupResource: 'Noura Al-Qahtani' },
];

// ─── ATTENDANCE DATA (Section 5) ──────────────────────────────
export interface AttendanceRecord {
  id: string;
  employee: string;
  tower: string;
  date: string;
  shift: string;
  checkIn: string;
  checkOut: string;
  status: 'Present' | 'On Leave' | 'Absent' | 'Remote';
  workLocation: string;
}

export const attendanceRecordsList: AttendanceRecord[] = masterEmployees.map((emp, idx) => ({
  id: `ATT-${1000 + idx + 1}`,
  employee: emp.name,
  tower: emp.tower,
  date: '2026-08-12',
  shift: emp.shift,
  checkIn: emp.status === 'On Leave' ? 'N/A' : emp.shift.startsWith('Morning') ? '05:55 AM' : emp.shift.startsWith('Evening') ? '01:52 PM' : '09:50 PM',
  checkOut: emp.status === 'On Leave' ? 'N/A' : emp.shift.startsWith('Morning') ? '02:05 PM' : emp.shift.startsWith('Evening') ? '10:05 PM' : '06:05 AM',
  status: emp.status === 'On Leave' ? 'On Leave' : emp.status === 'Remote' ? 'Remote' : 'Present',
  workLocation: emp.location,
}));
