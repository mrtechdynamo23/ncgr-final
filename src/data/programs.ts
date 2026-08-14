/**
 * Program Management Data — Programs, Milestones, Dependencies, Issues & Actions
 */

export interface ProgramRecord {
  id: string;
  name: string;
  overallStatus: 'On Track' | 'At Risk' | 'Delayed' | 'Completed';
  programManager: string;
  startDate: string;
  endDate: string;
  progressPct: number;
  budgetStatus: 'On Budget' | 'Over Budget' | 'Under Budget';
  totalMilestones: number;
  completedMilestones: number;
  openIssues: number;
  openActions: number;
  dependencies: number;
  description: string;
}

export const programs: ProgramRecord[] = [
  { id: 'PRG-001', name: 'NCGR ITMS Operations Stabilization', overallStatus: 'On Track', programManager: 'Noura Al-Qahtani', startDate: '2025-01-01', endDate: '2026-12-31', progressPct: 72, budgetStatus: 'On Budget', totalMilestones: 12, completedMilestones: 8, openIssues: 3, openActions: 5, dependencies: 4, description: 'Stabilize and optimize ITMS managed operations across all towers' },
  { id: 'PRG-002', name: 'Cloud Migration & Modernization', overallStatus: 'At Risk', programManager: 'Priya Nair', startDate: '2025-06-01', endDate: '2027-05-31', progressPct: 38, budgetStatus: 'Over Budget', totalMilestones: 15, completedMilestones: 5, openIssues: 5, openActions: 8, dependencies: 6, description: 'Migrate on-premises workloads to GCP and Azure cloud platforms' },
  { id: 'PRG-003', name: 'SAP S/4HANA Transformation', overallStatus: 'At Risk', programManager: 'Sara Al-Otaibi', startDate: '2025-09-01', endDate: '2027-12-31', progressPct: 15, budgetStatus: 'On Budget', totalMilestones: 20, completedMilestones: 3, openIssues: 4, openActions: 6, dependencies: 8, description: 'Transform SAP ECC to S/4HANA including data migration and process redesign' },
  { id: 'PRG-004', name: 'Cybersecurity Enhancement Program', overallStatus: 'On Track', programManager: 'Daniel Mathew', startDate: '2025-03-01', endDate: '2026-12-31', progressPct: 65, budgetStatus: 'On Budget', totalMilestones: 10, completedMilestones: 6, openIssues: 2, openActions: 4, dependencies: 3, description: 'Enhance cybersecurity posture across all NCGR platforms and services' },
  { id: 'PRG-005', name: 'Digital Workplace Modernization', overallStatus: 'On Track', programManager: 'Layla Hassan', startDate: '2025-04-01', endDate: '2026-09-30', progressPct: 82, budgetStatus: 'Under Budget', totalMilestones: 8, completedMilestones: 6, openIssues: 1, openActions: 2, dependencies: 2, description: 'Modernize end-user computing environment with M365 and Intune' },
  { id: 'PRG-006', name: 'Network Infrastructure Refresh', overallStatus: 'Delayed', programManager: 'Mohammed Al-Dosari', startDate: '2025-07-01', endDate: '2026-12-31', progressPct: 45, budgetStatus: 'Over Budget', totalMilestones: 10, completedMilestones: 4, openIssues: 3, openActions: 5, dependencies: 5, description: 'Refresh aging network infrastructure including core switches and WAN optimization' },
  { id: 'PRG-007', name: 'ITSM Process Maturity', overallStatus: 'On Track', programManager: 'Huda Al-Salem', startDate: '2025-02-01', endDate: '2026-11-30', progressPct: 70, budgetStatus: 'On Budget', totalMilestones: 8, completedMilestones: 5, openIssues: 1, openActions: 3, dependencies: 2, description: 'Improve ITSM process maturity across incident, problem, change, and knowledge management' },
  { id: 'PRG-008', name: 'Automation & AI Adoption', overallStatus: 'On Track', programManager: 'Arjun Menon', startDate: '2025-08-01', endDate: '2027-07-31', progressPct: 28, budgetStatus: 'On Budget', totalMilestones: 12, completedMilestones: 3, openIssues: 2, openActions: 4, dependencies: 4, description: 'Implement automation and AI capabilities across ITMS operations' },
];

export interface MilestoneRecord {
  id: string;
  milestone: string;
  program: string;
  programId: string;
  owner: string;
  plannedDate: string;
  actualDate: string;
  status: 'Completed' | 'On Track' | 'At Risk' | 'Delayed' | 'Not Started';
  completionPct: number;
  variance: string;
}

export const milestones: MilestoneRecord[] = [
  { id: 'MS-001', milestone: 'ITMS Operations Baseline Assessment', program: 'NCGR ITMS Operations Stabilization', programId: 'PRG-001', owner: 'Noura Al-Qahtani', plannedDate: '2025-03-31', actualDate: '2025-03-28', status: 'Completed', completionPct: 100, variance: '-3 days' },
  { id: 'MS-002', milestone: 'ServiceNow ITSM Configuration Complete', program: 'NCGR ITMS Operations Stabilization', programId: 'PRG-001', owner: 'Arjun Menon', plannedDate: '2025-06-30', actualDate: '2025-07-15', status: 'Completed', completionPct: 100, variance: '+15 days' },
  { id: 'MS-003', milestone: 'NOC 24x7 Operations Go-Live', program: 'NCGR ITMS Operations Stabilization', programId: 'PRG-001', owner: 'Khalid Al-Shammari', plannedDate: '2025-09-01', actualDate: '2025-09-01', status: 'Completed', completionPct: 100, variance: '0 days' },
  { id: 'MS-004', milestone: 'SLA Framework Approval', program: 'NCGR ITMS Operations Stabilization', programId: 'PRG-001', owner: 'Faisal Al-Harbi', plannedDate: '2026-03-31', actualDate: '', status: 'At Risk', completionPct: 60, variance: 'Pending approval' },
  { id: 'MS-005', milestone: 'Cloud Assessment & Migration Planning', program: 'Cloud Migration & Modernization', programId: 'PRG-002', owner: 'Priya Nair', plannedDate: '2025-09-30', actualDate: '2025-10-15', status: 'Completed', completionPct: 100, variance: '+15 days' },
  { id: 'MS-006', milestone: 'Non-Production Workloads Migrated to GCP', program: 'Cloud Migration & Modernization', programId: 'PRG-002', owner: 'Priya Nair', plannedDate: '2026-03-31', actualDate: '2026-05-10', status: 'Completed', completionPct: 100, variance: '+40 days' },
  { id: 'MS-007', milestone: 'Production Cloud Migration — Phase 1', program: 'Cloud Migration & Modernization', programId: 'PRG-002', owner: 'Priya Nair', plannedDate: '2026-09-30', actualDate: '', status: 'At Risk', completionPct: 35, variance: 'Behind schedule' },
  { id: 'MS-008', milestone: 'SAP ECC System Assessment', program: 'SAP S/4HANA Transformation', programId: 'PRG-003', owner: 'Sara Al-Otaibi', plannedDate: '2025-12-31', actualDate: '2025-12-20', status: 'Completed', completionPct: 100, variance: '-11 days' },
  { id: 'MS-009', milestone: 'S/4HANA Sandbox Environment Ready', program: 'SAP S/4HANA Transformation', programId: 'PRG-003', owner: 'Sara Al-Otaibi', plannedDate: '2026-06-30', actualDate: '', status: 'Delayed', completionPct: 70, variance: '+45 days est.' },
  { id: 'MS-010', milestone: 'Zero Trust Architecture Design', program: 'Cybersecurity Enhancement Program', programId: 'PRG-004', owner: 'Daniel Mathew', plannedDate: '2025-06-30', actualDate: '2025-06-25', status: 'Completed', completionPct: 100, variance: '-5 days' },
  { id: 'MS-011', milestone: 'Endpoint Protection Rollout (CrowdStrike)', program: 'Cybersecurity Enhancement Program', programId: 'PRG-004', owner: 'Daniel Mathew', plannedDate: '2025-12-31', actualDate: '2026-01-15', status: 'Completed', completionPct: 100, variance: '+15 days' },
  { id: 'MS-012', milestone: 'M365 Migration Complete', program: 'Digital Workplace Modernization', programId: 'PRG-005', owner: 'Layla Hassan', plannedDate: '2026-03-31', actualDate: '2026-03-20', status: 'Completed', completionPct: 100, variance: '-11 days' },
  { id: 'MS-013', milestone: 'Intune Device Enrollment — Phase 2', program: 'Digital Workplace Modernization', programId: 'PRG-005', owner: 'Layla Hassan', plannedDate: '2026-08-31', actualDate: '', status: 'On Track', completionPct: 78, variance: 'On schedule' },
  { id: 'MS-014', milestone: 'Core Switch Refresh — Building A', program: 'Network Infrastructure Refresh', programId: 'PRG-006', owner: 'Mohammed Al-Dosari', plannedDate: '2026-06-30', actualDate: '', status: 'Delayed', completionPct: 55, variance: '+30 days est.' },
  { id: 'MS-015', milestone: 'SD-WAN Deployment — All Sites', program: 'Network Infrastructure Refresh', programId: 'PRG-006', owner: 'Mohammed Al-Dosari', plannedDate: '2026-12-31', actualDate: '', status: 'Not Started', completionPct: 0, variance: 'Pending predecessor' },
];

export interface DependencyRecord {
  id: string;
  program: string;
  programId: string;
  dependency: string;
  dependentTeam: string;
  owner: string;
  dueDate: string;
  status: 'Resolved' | 'Active' | 'At Risk' | 'Blocked';
  impact: 'High' | 'Medium' | 'Low';
}

export const dependencies: DependencyRecord[] = [
  { id: 'DEP-001', program: 'Cloud Migration & Modernization', programId: 'PRG-002', dependency: 'GCP environment provisioning & network peering', dependentTeam: 'Cloud Operations', owner: 'Priya Nair', dueDate: '2026-07-31', status: 'Active', impact: 'High' },
  { id: 'DEP-002', program: 'Cloud Migration & Modernization', programId: 'PRG-002', dependency: 'Data classification & compliance approval', dependentTeam: 'Information Security', owner: 'Daniel Mathew', dueDate: '2026-08-15', status: 'At Risk', impact: 'High' },
  { id: 'DEP-003', program: 'SAP S/4HANA Transformation', programId: 'PRG-003', dependency: 'Oracle RAC database upgrade for migration compatibility', dependentTeam: 'Database Operations', owner: 'Omar Al-Mutairi', dueDate: '2026-09-30', status: 'Active', impact: 'High' },
  { id: 'DEP-004', program: 'SAP S/4HANA Transformation', programId: 'PRG-003', dependency: 'Wipro SAP consultant resource allocation', dependentTeam: 'Vendor Management', owner: 'Sara Al-Otaibi', dueDate: '2026-08-31', status: 'At Risk', impact: 'High' },
  { id: 'DEP-005', program: 'Network Infrastructure Refresh', programId: 'PRG-006', dependency: 'Cisco hardware delivery — switch order', dependentTeam: 'Procurement', owner: 'Mohammed Al-Dosari', dueDate: '2026-09-15', status: 'Blocked', impact: 'High' },
  { id: 'DEP-006', program: 'Cybersecurity Enhancement Program', programId: 'PRG-004', dependency: 'BeyondTrust PAM HA cluster deployment', dependentTeam: 'Security Operations', owner: 'Daniel Mathew', dueDate: '2026-11-15', status: 'Active', impact: 'Medium' },
  { id: 'DEP-007', program: 'Digital Workplace Modernization', programId: 'PRG-005', dependency: 'VDI infrastructure decommission approval', dependentTeam: 'Infrastructure', owner: 'Layla Hassan', dueDate: '2026-09-30', status: 'Active', impact: 'Medium' },
  { id: 'DEP-008', program: 'ITSM Process Maturity', programId: 'PRG-007', dependency: 'ServiceNow platform upgrade to latest release', dependentTeam: 'Platform Team', owner: 'Arjun Menon', dueDate: '2026-10-31', status: 'Active', impact: 'Medium' },
  { id: 'DEP-009', program: 'Automation & AI Adoption', programId: 'PRG-008', dependency: 'AI training data from ServiceNow knowledge base', dependentTeam: 'Knowledge Management', owner: 'Aisha Rahman', dueDate: '2026-09-30', status: 'Active', impact: 'Medium' },
  { id: 'DEP-010', program: 'NCGR ITMS Operations Stabilization', programId: 'PRG-001', dependency: 'SLA framework approval from NCGR stakeholders', dependentTeam: 'NCGR Management', owner: 'Faisal Al-Harbi', dueDate: '2026-09-30', status: 'At Risk', impact: 'High' },
];

export interface IssueActionRecord {
  id: string;
  description: string;
  program: string;
  programId: string;
  owner: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  targetDate: string;
  status: 'Open' | 'In Progress' | 'Completed' | 'Overdue';
  aging: string;
  action: string;
}

export const issuesAndActions: IssueActionRecord[] = [
  { id: 'ISS-001', description: 'Cloud migration timeline slipping due to compliance delays', program: 'Cloud Migration & Modernization', programId: 'PRG-002', owner: 'Priya Nair', priority: 'Critical', targetDate: '2026-08-31', status: 'Open', aging: '15 days', action: 'Expedite data classification review with security team' },
  { id: 'ISS-002', description: 'SAP S/4HANA sandbox environment provisioning delayed', program: 'SAP S/4HANA Transformation', programId: 'PRG-003', owner: 'Sara Al-Otaibi', priority: 'High', targetDate: '2026-09-15', status: 'In Progress', aging: '45 days', action: 'Engage additional Wipro resources for sandbox setup' },
  { id: 'ISS-003', description: 'Network switch delivery delayed by 12 weeks', program: 'Network Infrastructure Refresh', programId: 'PRG-006', owner: 'Mohammed Al-Dosari', priority: 'High', targetDate: '2026-10-31', status: 'Open', aging: '30 days', action: 'Source refurbished switches as interim solution' },
  { id: 'ISS-004', description: 'SLA framework approval stalled — NCGR stakeholder alignment needed', program: 'NCGR ITMS Operations Stabilization', programId: 'PRG-001', owner: 'Faisal Al-Harbi', priority: 'Critical', targetDate: '2026-09-30', status: 'Open', aging: '60 days', action: 'Schedule executive alignment workshop' },
  { id: 'ISS-005', description: 'Budget overrun on cloud infrastructure costs', program: 'Cloud Migration & Modernization', programId: 'PRG-002', owner: 'Noura Al-Qahtani', priority: 'High', targetDate: '2026-09-30', status: 'In Progress', aging: '20 days', action: 'Implement cost optimization measures and reserved instances' },
  { id: 'ISS-006', description: 'Knowledge base articles insufficient for L1 self-resolution', program: 'ITSM Process Maturity', programId: 'PRG-007', owner: 'Aisha Rahman', priority: 'Medium', targetDate: '2026-10-15', status: 'In Progress', aging: '10 days', action: 'Create 50 new KB articles for top incident categories' },
  { id: 'ISS-007', description: 'Automation tool integration complexity with ServiceNow', program: 'Automation & AI Adoption', programId: 'PRG-008', owner: 'Arjun Menon', priority: 'Medium', targetDate: '2026-11-30', status: 'Open', aging: '5 days', action: 'Evaluate Flow Designer for simplified integration' },
  { id: 'ISS-008', description: 'CrowdStrike license renewal budget not approved', program: 'Cybersecurity Enhancement Program', programId: 'PRG-004', owner: 'Daniel Mathew', priority: 'Critical', targetDate: '2026-08-30', status: 'Overdue', aging: '25 days', action: 'Escalate to executive sponsor for emergency approval' },
  { id: 'ISS-009', description: 'VDI decommission blocked by legacy application dependency', program: 'Digital Workplace Modernization', programId: 'PRG-005', owner: 'Layla Hassan', priority: 'Medium', targetDate: '2026-09-30', status: 'Open', aging: '8 days', action: 'Identify legacy apps and plan web-based alternatives' },
  { id: 'ISS-010', description: 'Gulf Tech Services SLA improvement plan overdue', program: 'NCGR ITMS Operations Stabilization', programId: 'PRG-001', owner: 'Noura Al-Qahtani', priority: 'High', targetDate: '2026-08-20', status: 'Overdue', aging: '18 days', action: 'Issue formal notice and schedule corrective action meeting' },
];
