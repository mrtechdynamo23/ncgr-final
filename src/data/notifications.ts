/**
 * Notification Items — Real notification data for the notification drawer
 */

export type NotificationType = 'critical_incident' | 'risk_escalation' | 'pending_approval' | 'license_expiry' | 'resource_gap' | 'technology_exception' | 'system_alert';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'critical' | 'high' | 'medium' | 'low';
  actionUrl?: string;
  source: string;
}

export const notifications: NotificationItem[] = [
  { id: 'NOTIF-001', type: 'critical_incident', title: 'P1 — Storage Controller Failure', message: 'SAN-01 primary controller offline. I/O on secondary controller. Performance degraded across VMs.', timestamp: '2026-08-13 03:15', isRead: false, priority: 'critical', actionUrl: '/command-center/critical-incidents', source: 'ServiceNow' },
  { id: 'NOTIF-002', type: 'critical_incident', title: 'P1 — Azure AD Sync Failure', message: 'Azure AD Connect sync failed. 500+ users unable to authenticate to cloud services.', timestamp: '2026-08-13 05:30', isRead: false, priority: 'critical', actionUrl: '/command-center/critical-incidents', source: 'Azure AD' },
  { id: 'NOTIF-003', type: 'critical_incident', title: 'P1 — Core Network Switch Degradation', message: 'Building A core switch CRC errors. 200+ users connectivity impacted.', timestamp: '2026-08-12 08:27', isRead: false, priority: 'critical', actionUrl: '/command-center/critical-incidents', source: 'SolarWinds' },
  { id: 'NOTIF-004', type: 'risk_escalation', title: 'Dell Contract Expiry Risk Escalated', message: 'Dell hardware support contract expiring Aug 2026. Renewal negotiations stalled. Escalation required.', timestamp: '2026-08-12 14:00', isRead: false, priority: 'high', actionUrl: '/vendor-siam/risk', source: 'PMO' },
  { id: 'NOTIF-005', type: 'pending_approval', title: '8 Leave Requests Pending Approval', message: '8 leave requests awaiting manager approval. Some nearing SLA breach.', timestamp: '2026-08-12 09:00', isRead: false, priority: 'medium', actionUrl: '/team-overview/leave-management', source: 'HRMS' },
  { id: 'NOTIF-006', type: 'license_expiry', title: 'Fortinet FortiGate License Expired', message: 'FortiGate branch firewall licenses expired. Devices running without updated threat intelligence.', timestamp: '2026-08-12 08:00', isRead: false, priority: 'critical', actionUrl: '/license-health', source: 'License Manager' },
  { id: 'NOTIF-007', type: 'license_expiry', title: '6 Licenses Expiring Within 90 Days', message: 'CrowdStrike, Splunk, VMware, Qualys, Tenable, and Veritas licenses approaching expiry.', timestamp: '2026-08-11 10:00', isRead: true, priority: 'high', actionUrl: '/license-health', source: 'License Manager' },
  { id: 'NOTIF-008', type: 'resource_gap', title: 'NOC Night Shift Resource Gap', message: 'Unplanned leave has created a coverage gap in NOC night shift. Replacement needed urgently.', timestamp: '2026-08-12 06:00', isRead: false, priority: 'high', actionUrl: '/team-overview/resource-data', source: 'HRMS' },
  { id: 'NOTIF-009', type: 'technology_exception', title: 'Oracle RAC Failover — Active Exception', message: 'Oracle RAC node 2 failover still active. Financial reporting systems affected.', timestamp: '2026-08-12 07:00', isRead: true, priority: 'critical', actionUrl: '/command-center/incidents', source: 'ServiceNow' },
  { id: 'NOTIF-010', type: 'pending_approval', title: 'Emergency Change Pending CAB Approval', message: 'CHG0012845 — Oracle RAC emergency patch requires CAB approval urgently.', timestamp: '2026-08-12 10:30', isRead: false, priority: 'high', actionUrl: '/command-center/incidents', source: 'ServiceNow' },
  { id: 'NOTIF-011', type: 'system_alert', title: 'Splunk Ingest Volume at 87%', message: 'Splunk Enterprise approaching license ceiling. Risk of indexing suspension if exceeded.', timestamp: '2026-08-11 14:00', isRead: true, priority: 'high', actionUrl: '/technology/servicenow', source: 'Splunk' },
  { id: 'NOTIF-012', type: 'risk_escalation', title: 'Vendor Action Overdue — Wipro KT', message: 'VA-006: Knowledge transfer sessions for departing Wipro resources overdue by 12 days.', timestamp: '2026-08-10 16:00', isRead: true, priority: 'medium', actionUrl: '/vendor-siam/actions', source: 'PMO' },
  { id: 'NOTIF-013', type: 'system_alert', title: 'Backup Job Failures — 12 Jobs', message: '12 Commvault backup jobs failed overnight. RPO at risk for affected systems.', timestamp: '2026-08-12 06:30', isRead: false, priority: 'high', actionUrl: '/infrastructure/overview', source: 'Commvault' },
  { id: 'NOTIF-014', type: 'pending_approval', title: 'Splunk License Expansion — Budget Approval', message: 'APR-1004: Splunk 200GB license expansion procurement pending commercial approval.', timestamp: '2026-08-10 12:00', isRead: true, priority: 'medium', actionUrl: '/command-center/incidents', source: 'ServiceNow' },
  { id: 'NOTIF-015', type: 'technology_exception', title: 'Certificate Renewal Queue — 14 Certificates', message: '14 SSL certificates approaching expiry. ACME automation integration pending.', timestamp: '2026-08-10 16:00', isRead: true, priority: 'medium', actionUrl: '/technology/security', source: 'AppViewX' },
];

export function getUnreadCount(): number {
  return notifications.filter(n => !n.isRead).length;
}

export function getCriticalNotifications(): NotificationItem[] {
  return notifications.filter(n => n.priority === 'critical' && !n.isRead);
}
