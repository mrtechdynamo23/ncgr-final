/**
 * Audit & Compliance Data — 20+ audit records with categories and data sources
 */

export type AuditCategory = 'Security Compliance' | 'IT Governance' | 'Service Management' | 'Data Compliance' | 'Infrastructure Compliance' | 'Access Management' | 'Business Continuity' | 'Vendor Compliance' | 'Change Management' | 'Configuration Management';
export type DataSource = 'ServiceNow' | 'SolarWinds' | 'Microsoft' | 'Security Platforms' | 'CMDB' | 'Monitoring Platforms' | 'Internal Audit Records';

export interface AuditRecord {
  id: string;
  audit: string;
  auditName: string;
  description: string;
  category: AuditCategory;
  numberOfFindings: number;
  findingIds: string[];
  auditType: 'Internal' | 'External';
  openClosed: 'Open' | 'Closed';
  auditOwner: string;
  dueDate: string;
  status: 'Completed' | 'In Progress' | 'Pending' | 'Overdue';
  dataSource: DataSource;
}

export const audits: AuditRecord[] = [
  { id: 'AUD-001', audit: 'Q3 2026 Security Compliance Audit', auditName: 'Quarterly Security Assessment', description: 'Comprehensive review of security controls, access management, and vulnerability remediation compliance', category: 'Security Compliance', numberOfFindings: 8, findingIds: ['F-001', 'F-002', 'F-003', 'F-004', 'F-005', 'F-006', 'F-007', 'F-008'], auditType: 'Internal', openClosed: 'Open', auditOwner: 'Daniel Mathew', dueDate: '2026-09-30', status: 'In Progress', dataSource: 'Security Platforms' },
  { id: 'AUD-002', audit: 'ITSM Process Maturity Assessment', auditName: 'ITIL Process Review', description: 'Assessment of ITSM process maturity across incident, problem, change, and knowledge management', category: 'Service Management', numberOfFindings: 5, findingIds: ['F-009', 'F-010', 'F-011', 'F-012', 'F-013'], auditType: 'Internal', openClosed: 'Open', auditOwner: 'Huda Al-Salem', dueDate: '2026-08-31', status: 'In Progress', dataSource: 'ServiceNow' },
  { id: 'AUD-003', audit: 'NCA Cybersecurity Framework Compliance', auditName: 'NCA ECC Compliance', description: 'National Cybersecurity Authority Essential Cybersecurity Controls compliance assessment', category: 'Security Compliance', numberOfFindings: 12, findingIds: ['F-014', 'F-015', 'F-016', 'F-017', 'F-018', 'F-019', 'F-020', 'F-021', 'F-022', 'F-023', 'F-024', 'F-025'], auditType: 'External', openClosed: 'Open', auditOwner: 'Daniel Mathew', dueDate: '2026-12-31', status: 'In Progress', dataSource: 'Security Platforms' },
  { id: 'AUD-004', audit: 'IT Governance Framework Review', auditName: 'IT Governance Audit', description: 'Review of IT governance structures, decision-making frameworks, and strategic alignment', category: 'IT Governance', numberOfFindings: 3, findingIds: ['F-026', 'F-027', 'F-028'], auditType: 'Internal', openClosed: 'Closed', auditOwner: 'Noura Al-Qahtani', dueDate: '2026-06-30', status: 'Completed', dataSource: 'Internal Audit Records' },
  { id: 'AUD-005', audit: 'Data Classification & Protection Audit', auditName: 'Data Compliance Review', description: 'Assessment of data classification, handling procedures, and protection controls', category: 'Data Compliance', numberOfFindings: 6, findingIds: ['F-029', 'F-030', 'F-031', 'F-032', 'F-033', 'F-034'], auditType: 'Internal', openClosed: 'Open', auditOwner: 'Daniel Mathew', dueDate: '2026-10-31', status: 'In Progress', dataSource: 'Microsoft' },
  { id: 'AUD-006', audit: 'Infrastructure Compliance Assessment', auditName: 'Infra Hardening Review', description: 'Review of infrastructure hardening standards, patching compliance, and configuration baselines', category: 'Infrastructure Compliance', numberOfFindings: 9, findingIds: ['F-035', 'F-036', 'F-037', 'F-038', 'F-039', 'F-040', 'F-041', 'F-042', 'F-043'], auditType: 'Internal', openClosed: 'Open', auditOwner: 'Ahmed Al-Qahtani', dueDate: '2026-09-15', status: 'In Progress', dataSource: 'SolarWinds' },
  { id: 'AUD-007', audit: 'Privileged Access Management Audit', auditName: 'PAM Access Review', description: 'Quarterly review of privileged access accounts, usage patterns, and policy compliance', category: 'Access Management', numberOfFindings: 4, findingIds: ['F-044', 'F-045', 'F-046', 'F-047'], auditType: 'Internal', openClosed: 'Open', auditOwner: 'Daniel Mathew', dueDate: '2026-08-31', status: 'In Progress', dataSource: 'Security Platforms' },
  { id: 'AUD-008', audit: 'Business Continuity Plan Review', auditName: 'BCP Annual Review', description: 'Annual review and testing of business continuity and disaster recovery plans', category: 'Business Continuity', numberOfFindings: 3, findingIds: ['F-048', 'F-049', 'F-050'], auditType: 'Internal', openClosed: 'Closed', auditOwner: 'Faisal Al-Harbi', dueDate: '2026-07-31', status: 'Completed', dataSource: 'Internal Audit Records' },
  { id: 'AUD-009', audit: 'Vendor Compliance Assessment', auditName: 'Vendor SLA & Compliance', description: 'Assessment of vendor compliance with contractual obligations, SLA performance, and security requirements', category: 'Vendor Compliance', numberOfFindings: 7, findingIds: ['F-051', 'F-052', 'F-053', 'F-054', 'F-055', 'F-056', 'F-057'], auditType: 'Internal', openClosed: 'Open', auditOwner: 'Noura Al-Qahtani', dueDate: '2026-10-31', status: 'Pending', dataSource: 'ServiceNow' },
  { id: 'AUD-010', audit: 'Change Management Process Audit', auditName: 'CAB Process Review', description: 'Review of change management process effectiveness, emergency change handling, and CAB governance', category: 'Change Management', numberOfFindings: 4, findingIds: ['F-058', 'F-059', 'F-060', 'F-061'], auditType: 'Internal', openClosed: 'Closed', auditOwner: 'Huda Al-Salem', dueDate: '2026-05-31', status: 'Completed', dataSource: 'ServiceNow' },
  { id: 'AUD-011', audit: 'CMDB Accuracy & Completeness Audit', auditName: 'CMDB Data Quality', description: 'Assessment of CMDB data accuracy, completeness, and relationship mapping quality', category: 'Configuration Management', numberOfFindings: 6, findingIds: ['F-062', 'F-063', 'F-064', 'F-065', 'F-066', 'F-067'], auditType: 'Internal', openClosed: 'Open', auditOwner: 'Arjun Menon', dueDate: '2026-09-30', status: 'In Progress', dataSource: 'CMDB' },
  { id: 'AUD-012', audit: 'External Penetration Testing', auditName: 'Annual Pen Test', description: 'External penetration testing of internet-facing systems and applications', category: 'Security Compliance', numberOfFindings: 5, findingIds: ['F-068', 'F-069', 'F-070', 'F-071', 'F-072'], auditType: 'External', openClosed: 'Closed', auditOwner: 'Daniel Mathew', dueDate: '2026-04-30', status: 'Completed', dataSource: 'Security Platforms' },
  { id: 'AUD-013', audit: 'Cloud Security Posture Assessment', auditName: 'CSPM Review', description: 'Review of cloud security configurations across GCP and Azure environments', category: 'Security Compliance', numberOfFindings: 8, findingIds: ['F-073', 'F-074', 'F-075', 'F-076', 'F-077', 'F-078', 'F-079', 'F-080'], auditType: 'Internal', openClosed: 'Open', auditOwner: 'Priya Nair', dueDate: '2026-10-31', status: 'In Progress', dataSource: 'Monitoring Platforms' },
  { id: 'AUD-014', audit: 'Backup & Recovery Compliance', auditName: 'Backup Audit', description: 'Verification of backup policies, RPO/RTO adherence, and recovery testing results', category: 'Infrastructure Compliance', numberOfFindings: 3, findingIds: ['F-081', 'F-082', 'F-083'], auditType: 'Internal', openClosed: 'Open', auditOwner: 'Rakesh Kumar', dueDate: '2026-09-15', status: 'In Progress', dataSource: 'Monitoring Platforms' },
  { id: 'AUD-015', audit: 'Network Security Architecture Review', auditName: 'Network Segmentation Audit', description: 'Review of network segmentation, firewall rules, and micro-segmentation implementation', category: 'Security Compliance', numberOfFindings: 5, findingIds: ['F-084', 'F-085', 'F-086', 'F-087', 'F-088'], auditType: 'External', openClosed: 'Open', auditOwner: 'Mohammed Al-Dosari', dueDate: '2026-11-30', status: 'Pending', dataSource: 'SolarWinds' },
  { id: 'AUD-016', audit: 'ISO 27001 Surveillance Audit', auditName: 'ISO 27001 Surveillance', description: 'Annual ISO 27001 surveillance audit by external certification body', category: 'Security Compliance', numberOfFindings: 4, findingIds: ['F-089', 'F-090', 'F-091', 'F-092'], auditType: 'External', openClosed: 'Open', auditOwner: 'Daniel Mathew', dueDate: '2026-12-15', status: 'Pending', dataSource: 'Internal Audit Records' },
  { id: 'AUD-017', audit: 'Service Level Agreement Governance', auditName: 'SLA Governance Review', description: 'Review of SLA governance adherence, reporting compliance, and management review completion', category: 'Service Management', numberOfFindings: 3, findingIds: ['F-093', 'F-094', 'F-095'], auditType: 'Internal', openClosed: 'Closed', auditOwner: 'Faisal Al-Harbi', dueDate: '2026-06-30', status: 'Completed', dataSource: 'ServiceNow' },
  { id: 'AUD-018', audit: 'Identity & Access Review', auditName: 'User Access Recertification', description: 'Semi-annual user access recertification across all enterprise applications', category: 'Access Management', numberOfFindings: 7, findingIds: ['F-096', 'F-097', 'F-098', 'F-099', 'F-100', 'F-101', 'F-102'], auditType: 'Internal', openClosed: 'Open', auditOwner: 'Daniel Mathew', dueDate: '2026-09-30', status: 'In Progress', dataSource: 'Microsoft' },
  { id: 'AUD-019', audit: 'Endpoint Compliance Assessment', auditName: 'Endpoint Security Audit', description: 'Assessment of endpoint security compliance including patching, encryption, and AV coverage', category: 'Infrastructure Compliance', numberOfFindings: 5, findingIds: ['F-103', 'F-104', 'F-105', 'F-106', 'F-107'], auditType: 'Internal', openClosed: 'Open', auditOwner: 'Layla Hassan', dueDate: '2026-09-30', status: 'In Progress', dataSource: 'Microsoft' },
  { id: 'AUD-020', audit: 'Database Security Hardening Review', auditName: 'DB Security Audit', description: 'Review of database security configurations, encryption, and access controls', category: 'Security Compliance', numberOfFindings: 4, findingIds: ['F-108', 'F-109', 'F-110', 'F-111'], auditType: 'Internal', openClosed: 'Open', auditOwner: 'Omar Al-Mutairi', dueDate: '2026-10-31', status: 'Pending', dataSource: 'CMDB' },
  { id: 'AUD-021', audit: 'Operational Meeting Governance', auditName: 'Meeting Compliance', description: 'Governance adherence for operational meetings, review completion, and action tracking', category: 'IT Governance', numberOfFindings: 2, findingIds: ['F-112', 'F-113'], auditType: 'Internal', openClosed: 'Closed', auditOwner: 'Faisal Al-Harbi', dueDate: '2026-07-15', status: 'Completed', dataSource: 'Internal Audit Records' },
];

// ─── SOFT/NON-MEASURABLE GOVERNANCE SLA TRACKING ──────────────
export interface GovernanceCommitment {
  id: string;
  commitment: string;
  category: string;
  frequency: string;
  owner: string;
  lastReviewDate: string;
  nextReviewDate: string;
  complianceStatus: 'Compliant' | 'Partially Compliant' | 'Non-Compliant';
  evidence: string;
}

export const governanceCommitments: GovernanceCommitment[] = [
  { id: 'GOV-001', commitment: 'Weekly Operational Governance Meeting', category: 'Meeting Governance', frequency: 'Weekly', owner: 'Faisal Al-Harbi', lastReviewDate: '2026-08-08', nextReviewDate: '2026-08-15', complianceStatus: 'Compliant', evidence: 'MOM published and actions tracked in ServiceNow' },
  { id: 'GOV-002', commitment: 'Monthly Service Review with NCGR', category: 'Review Completion', frequency: 'Monthly', owner: 'Noura Al-Qahtani', lastReviewDate: '2026-07-28', nextReviewDate: '2026-08-28', complianceStatus: 'Compliant', evidence: 'MSR delivered and approved by NCGR stakeholders' },
  { id: 'GOV-003', commitment: 'Quarterly Audit Action Closure', category: 'Audit Action Closure', frequency: 'Quarterly', owner: 'Daniel Mathew', lastReviewDate: '2026-06-30', nextReviewDate: '2026-09-30', complianceStatus: 'Partially Compliant', evidence: '85% of audit actions closed — 3 overdue' },
  { id: 'GOV-004', commitment: 'Documentation Update — Runbooks', category: 'Documentation Compliance', frequency: 'Monthly', owner: 'Aisha Rahman', lastReviewDate: '2026-08-05', nextReviewDate: '2026-09-05', complianceStatus: 'Partially Compliant', evidence: '78% of runbooks updated — SAP & Cloud runbooks pending' },
  { id: 'GOV-005', commitment: 'Weekly Status Report Delivery', category: 'Management Reporting', frequency: 'Weekly', owner: 'Vivek Srinivasan', lastReviewDate: '2026-08-09', nextReviewDate: '2026-08-16', complianceStatus: 'Compliant', evidence: 'WSR delivered every Friday by 5 PM consistently' },
  { id: 'GOV-006', commitment: 'CAB Meeting Governance', category: 'Meeting Governance', frequency: 'Weekly', owner: 'Huda Al-Salem', lastReviewDate: '2026-08-09', nextReviewDate: '2026-08-16', complianceStatus: 'Compliant', evidence: 'CAB conducted with proper quorum and documented decisions' },
  { id: 'GOV-007', commitment: 'Incident Review Closure — RCA Completion', category: 'Review Completion', frequency: 'Per Incident', owner: 'Khalid Al-Shammari', lastReviewDate: '2026-08-10', nextReviewDate: '2026-08-17', complianceStatus: 'Non-Compliant', evidence: '3 P1 incidents pending RCA completion beyond SLA' },
  { id: 'GOV-008', commitment: 'Knowledge Article Publication Target', category: 'Documentation Compliance', frequency: 'Monthly', owner: 'Aisha Rahman', lastReviewDate: '2026-08-01', nextReviewDate: '2026-09-01', complianceStatus: 'Compliant', evidence: '8 articles published in July (target: 5)' },
];

export function getAuditStats() {
  const total = audits.length;
  const open = audits.filter(a => a.openClosed === 'Open').length;
  const closed = audits.filter(a => a.openClosed === 'Closed').length;
  const totalFindings = audits.reduce((sum, a) => sum + a.numberOfFindings, 0);
  const overdue = audits.filter(a => a.status === 'Overdue').length;
  const inProgress = audits.filter(a => a.status === 'In Progress').length;
  return { total, open, closed, totalFindings, overdue, inProgress };
}
