export type ReportCategory =
  | 'Executive & Management'
  | 'WSR — Weekly Status Reports'
  | 'MSR — Monthly Status Reports'
  | 'DSR / Daily Operations'
  | 'Service Operations'
  | 'SLA & Service Assurance'
  | 'Governance, Audit & Compliance'
  | 'Workforce & Saudization'
  | 'Learning & Certification'
  | 'Knowledge Transfer'
  | 'Vendor & SIAM'
  | 'Programme & Delivery'
  | 'Change & Release'
  | 'Customer & Service'
  | 'Technology & AI'
  | 'Risk';

export type ReportType =
  | 'Executive Management Report'
  | 'Executive Dashboard Report'
  | 'Management Performance Report'
  | 'Overall Service Performance'
  | 'Weekly Status Report'
  | 'Weekly Operational Status'
  | 'Weekly Service Performance'
  | 'Weekly Risk & Action Report'
  | 'Monthly Status Report'
  | 'Monthly Service Performance'
  | 'Monthly Operational Performance'
  | 'Daily Status Report'
  | 'Daily Service Health'
  | 'Daily Incident Summary'
  | 'Incident Report'
  | 'Critical Incident Report'
  | 'Service Request Report'
  | 'Problem Report'
  | 'Operational RCA Report'
  | 'Application Health Report'
  | 'Infrastructure Health Report'
  | 'SLA Performance Report'
  | 'SLA Compliance Report'
  | 'Audit & Compliance Report'
  | 'NCA ECC Findings Report'
  | 'Workforce Report'
  | 'Saudization Milestone Report'
  | 'Nationality Distribution Report'
  | 'Training Inventory Report'
  | 'Certification Progress Report'
  | 'Knowledge Transfer Status Report'
  | 'KT Governance & Sign-off Report'
  | 'Vendor Performance Report'
  | 'SIAM Multi-Vendor Report'
  | 'Programme Status Report'
  | 'Delivery Milestone Report'
  | 'Change Request Report'
  | 'Change Advisory Board (CAB) Report'
  | 'Customer Service Report'
  | 'Customer Satisfaction Report'
  | 'Digital Transformation Report'
  | 'AI & Automation Report'
  | 'Operational Risk Report'
  | 'Enterprise Risk Report';

export type ReportStatus = 'Published' | 'Approved' | 'In Review' | 'Draft' | 'Archived';

export type ReportPeriodCategory =
  | 'Today'
  | 'Yesterday'
  | 'This Week'
  | 'Last Week'
  | 'This Month'
  | 'Last Month'
  | 'Quarter'
  | 'Year'
  | 'Custom';

export type ReportFrequency = 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Annual' | 'Ad-hoc';

export interface ReportKPI {
  label: string;
  value: string;
  trend?: string;
  status?: 'green' | 'amber' | 'red';
}

export interface ReportVersion {
  version: string;
  date: string;
  author: string;
  notes: string;
}

export interface ReportRecord {
  id: string; // e.g. WSR-2026-W33, MSR-2026-07, DSR-2026-0817
  name: string;
  category: ReportCategory;
  type: ReportType;
  period: string; // e.g. "Week 33 (10–16 Aug 2026)", "July 2026", "17 Aug 2026"
  periodCategory: ReportPeriodCategory;
  generatedDate: string; // YYYY-MM-DD
  lastUpdated: string;
  owner: string;
  department: string;
  version: string;
  status: ReportStatus;
  frequency: ReportFrequency;
  availableFormats: Array<'PDF' | 'Excel' | 'CSV'>;
  fileSizeBytes?: number;
  summary: string;
  keyHighlights: string[];
  kpis: ReportKPI[];
  relatedReportIds?: string[];
  traceability?: Record<string, string>;
  isFeatured?: boolean;
}

export const MASTER_REPORTS: ReportRecord[] = [
  // ─── A. EXECUTIVE & MANAGEMENT REPORTS ────────────────────────
  {
    id: 'EXEC-2026-08',
    name: 'Executive Management Monthly Performance Report — August 2026',
    category: 'Executive & Management',
    type: 'Executive Management Report',
    period: 'August 2026',
    periodCategory: 'This Month',
    generatedDate: '2026-08-17',
    lastUpdated: '2026-08-17 14:00',
    owner: 'Faisal Al-Harbi',
    department: 'Cross-Tower Governance',
    version: 'v2.0 Approved',
    status: 'Approved',
    frequency: 'Monthly',
    availableFormats: ['PDF', 'Excel'],
    fileSizeBytes: 4280000,
    isFeatured: true,
    summary: 'Comprehensive C-level briefing covering multi-tower operations, 99.88% core uptime, zero critical SLA penalties, and Saudi talent transformation progress.',
    keyHighlights: [
      'Core service availability recorded at 99.88% against 99.5% contract target.',
      'SLA compliance at 98.4% across all 18 contractual metrics.',
      'Cloud FinOps cost governance delivered 14.8% savings on non-production compute.',
      'Saudization workforce actual reached 78.4% against 60% Ministry baseline.',
    ],
    kpis: [
      { label: 'Overall Service Health', value: 'GREEN (99.88%)', status: 'green' },
      { label: 'Total Managed Assets', value: '3,420 Hosts', status: 'green' },
      { label: 'Contract Penalty Status', value: 'SAR 0 (Zero)', status: 'green' },
      { label: 'Customer Satisfaction', value: '96.2%', status: 'green' },
    ],
    relatedReportIds: ['MSR-2026-07', 'WSR-2026-W33', 'SLA-2026-08'],
  },
  {
    id: 'EXEC-DASH-2026-Q3',
    name: 'Overall Service & Program Performance Quarterly Synthesis (Q3 2026)',
    category: 'Executive & Management',
    type: 'Overall Service Performance',
    period: 'Q3 2026',
    periodCategory: 'Quarter',
    generatedDate: '2026-08-15',
    lastUpdated: '2026-08-15 09:30',
    owner: 'Faisal Al-Harbi',
    department: 'PMO',
    version: 'v1.1',
    status: 'Published',
    frequency: 'Quarterly',
    availableFormats: ['PDF', 'Excel', 'CSV'],
    summary: 'Executive dashboard roll-up of operational delivery, cloud migration velocity, disaster recovery posture, and financial run-rate.',
    keyHighlights: [
      'All 9 towers operating within green tolerance bands.',
      'Knowledge Transfer completion rate at 94% across 87 transition packages.',
    ],
    kpis: [
      { label: 'Program Milestones Met', value: '18 / 19', status: 'green' },
      { label: 'Operational Run-Rate', value: 'On Budget', status: 'green' },
    ],
    relatedReportIds: ['EXEC-2026-08', 'PMO-2026-08'],
  },

  // ─── B. WSR — WEEKLY STATUS REPORTS ───────────────────────────
  {
    id: 'WSR-2026-W33',
    name: 'ITMS Operations WSR — Week 33 Executive Review',
    category: 'WSR — Weekly Status Reports',
    type: 'Weekly Status Report',
    period: 'Week 33 (10–16 Aug 2026)',
    periodCategory: 'This Week',
    generatedDate: '2026-08-17',
    lastUpdated: '2026-08-17 11:30',
    owner: 'Faisal Al-Harbi',
    department: 'Cross-Tower Governance',
    version: 'v1.0 Approved',
    status: 'Approved',
    frequency: 'Weekly',
    availableFormats: ['PDF', 'Excel', 'CSV'],
    isFeatured: true,
    summary: 'Weekly operational assurance report detailing 103 incident resolutions, 0 P1 outages, 14 standard RFC deployments, and 98.4% SLA adherence.',
    keyHighlights: [
      '0 P1 Major Outages; 1 P2 incident mitigated within 45-minute target.',
      'Multi-tower ticket backlog reduced by 18% week-over-week.',
      'SAN storage controller I/O throttling policy verified in production.',
      'Saudi Academy batch 3 certifications finalized with 100% pass rate.',
    ],
    kpis: [
      { label: 'Weekly P1 / P2 Incidents', value: '0 P1 / 1 P2', status: 'green' },
      { label: 'Weekly SLA Compliance', value: '98.4%', status: 'green' },
      { label: 'Changes Executed', value: '14 Completed (100% Success)', status: 'green' },
      { label: 'Active Workforce', value: '148 Resources (94% Present)', status: 'green' },
    ],
    relatedReportIds: ['WSR-2026-W32', 'WSR-2026-W31', 'MSR-2026-07', 'DSR-2026-0817'],
  },
  {
    id: 'WSR-2026-W32',
    name: 'ITMS Operations WSR — Week 32 Operational Status',
    category: 'WSR — Weekly Status Reports',
    type: 'Weekly Operational Status',
    period: 'Week 32 (03–09 Aug 2026)',
    periodCategory: 'Last Week',
    generatedDate: '2026-08-10',
    lastUpdated: '2026-08-10 11:00',
    owner: 'Faisal Al-Harbi',
    department: 'Cross-Tower Governance',
    version: 'v1.0 Approved',
    status: 'Approved',
    frequency: 'Weekly',
    availableFormats: ['PDF', 'Excel', 'CSV'],
    summary: 'Operational status covering 99.88% core system uptime, Oracle RAC interconnect bandwidth optimization, and SAP S/4HANA release planning.',
    keyHighlights: [
      'Oracle RAC interconnect bandwidth optimization completed with 0 downtime.',
      'WebLogic connection pool capacity patch applied across production clusters.',
    ],
    kpis: [
      { label: 'Weekly Incidents Resolved', value: '112 Tickets', status: 'green' },
      { label: 'SLA Attainment', value: '99.1%', status: 'green' },
    ],
    relatedReportIds: ['WSR-2026-W33', 'WSR-2026-W31'],
  },
  {
    id: 'WSR-2026-W31',
    name: 'ITMS Operations WSR — Week 31 Service Performance',
    category: 'WSR — Weekly Status Reports',
    type: 'Weekly Service Performance',
    period: 'Week 31 (27 Jul – 02 Aug 2026)',
    periodCategory: 'Last Month',
    generatedDate: '2026-08-03',
    lastUpdated: '2026-08-03 10:45',
    owner: 'Faisal Al-Harbi',
    department: 'Cross-Tower Governance',
    version: 'v1.0 Approved',
    status: 'Archived',
    frequency: 'Weekly',
    availableFormats: ['PDF', 'Excel'],
    summary: 'Month-start transition WSR aggregating late-July ticket trends, capacity index, and shift handover metrics.',
    keyHighlights: [
      'Full monthly roll-up finalized for July 2026 customer MSR.',
      'Network perimeter firewall firmware upgrade successfully executed.',
    ],
    kpis: [
      { label: 'Incident Volume', value: '98 Tickets', status: 'green' },
      { label: 'SLA Attainment', value: '98.9%', status: 'green' },
    ],
    relatedReportIds: ['MSR-2026-07', 'WSR-2026-W32'],
  },

  // ─── C. MSR — MONTHLY STATUS REPORTS ──────────────────────────
  {
    id: 'MSR-2026-07',
    name: 'Monthly Operations & Governance Assurance Report (MSR July 2026)',
    category: 'MSR — Monthly Status Reports',
    type: 'Monthly Status Report',
    period: 'July 2026',
    periodCategory: 'Last Month',
    generatedDate: '2026-08-01',
    lastUpdated: '2026-08-01 12:30',
    owner: 'Faisal Al-Harbi',
    department: 'Cross-Tower Governance',
    version: 'v2.0 Approved',
    status: 'Approved',
    frequency: 'Monthly',
    availableFormats: ['PDF', 'Excel', 'CSV'],
    isFeatured: true,
    summary: 'Authoritative July 2026 service performance scorecard approved with 99.1% SLA compliance across 18 KPIs. Zero penalties incurred for the 7th consecutive month.',
    keyHighlights: [
      'Total ticket volume for July was 1,420 with average resolution time of 2.4 hours.',
      'Cloud FinOps cost optimization saved 14.8% on idle compute resources.',
      'Formal executive sign-off on monthly governance certificate achieved.',
    ],
    kpis: [
      { label: 'Monthly Core Availability', value: '99.92%', status: 'green' },
      { label: 'Total Tickets Processed', value: '1,420 Tickets', status: 'green' },
      { label: 'Penalty Deductions', value: 'SAR 0.00', status: 'green' },
      { label: 'Overall SLA Met', value: '99.1%', status: 'green' },
    ],
    relatedReportIds: ['WSR-2026-W31', 'WSR-2026-W32', 'WSR-2026-W33', 'SLA-2026-07', 'EXEC-2026-08'],
  },
  {
    id: 'MSR-2026-06',
    name: 'Monthly Operations & Governance Assurance Report (MSR June 2026)',
    category: 'MSR — Monthly Status Reports',
    type: 'Monthly Status Report',
    period: 'June 2026',
    periodCategory: 'Quarter',
    generatedDate: '2026-07-02',
    lastUpdated: '2026-07-02 11:00',
    owner: 'Faisal Al-Harbi',
    department: 'Cross-Tower Governance',
    version: 'v1.0 Approved',
    status: 'Archived',
    frequency: 'Monthly',
    availableFormats: ['PDF', 'Excel'],
    summary: 'June 2026 operational report with 99.2% overall SLA compliance, cloud migration wave 2 milestone completion, and zero data breaches.',
    keyHighlights: [
      'Wave 2 cloud migration transferred 48 virtual workloads into Oracle Cloud OCI.',
      '100% compliance verified across all external audit findings.',
    ],
    kpis: [
      { label: 'Core Availability', value: '99.95%', status: 'green' },
      { label: 'Tickets Resolved', value: '1,385 Tickets', status: 'green' },
    ],
    relatedReportIds: ['MSR-2026-07'],
  },

  // ─── D. DSR / DAILY OPERATIONAL REPORTS ────────────────────────
  {
    id: 'DSR-2026-0817',
    name: 'Daily Service Health & Operations Report — 17 August 2026',
    category: 'DSR / Daily Operations',
    type: 'Daily Status Report',
    period: '17 Aug 2026',
    periodCategory: 'Today',
    generatedDate: '2026-08-17',
    lastUpdated: '2026-08-17 08:30',
    owner: 'Aisha Rahman',
    department: 'Service Desk Mgmt',
    version: 'v1.0',
    status: 'Published',
    frequency: 'Daily',
    availableFormats: ['PDF', 'CSV'],
    isFeatured: true,
    summary: 'Daily standup shift report. Night shift handed over with 0 active P1 incidents, 14 standard change deployments succeeded overnight, and VIP ticket queue prioritized.',
    keyHighlights: [
      'Night shift cleared 18 automated alerts with 0 host outages.',
      'Morning VIP access requests cleared within 12 minutes.',
      'All 9 tower leads confirmed in attendance for morning operations standup.',
    ],
    kpis: [
      { label: 'Active Incidents in Flight', value: '24 Tickets', status: 'green' },
      { label: 'Active P1 Incidents', value: '0 Outages', status: 'green' },
      { label: 'Shift Roster Present', value: '100% Coverage', status: 'green' },
    ],
    relatedReportIds: ['DSR-2026-0816', 'WSR-2026-W33'],
  },
  {
    id: 'DSR-2026-0816',
    name: 'Daily Service Health & Incident Summary — 16 August 2026',
    category: 'DSR / Daily Operations',
    type: 'Daily Incident Summary',
    period: '16 Aug 2026',
    periodCategory: 'Yesterday',
    generatedDate: '2026-08-16',
    lastUpdated: '2026-08-16 18:00',
    owner: 'Aisha Rahman',
    department: 'Service Desk Mgmt',
    version: 'v1.0',
    status: 'Published',
    frequency: 'Daily',
    availableFormats: ['PDF', 'CSV'],
    summary: 'End-of-day summary detailing 32 resolved tickets, proactive disk cleanup on database backup nodes, and zero network degradations.',
    keyHighlights: [
      'Resolved 32 user service requests and 14 operational incidents.',
      'Average first response time: 4.8 minutes.',
    ],
    kpis: [
      { label: 'First Contact Resolution', value: '82.4%', status: 'green' },
      { label: 'Escalation Rate', value: '2.1%', status: 'green' },
    ],
    relatedReportIds: ['DSR-2026-0817'],
  },

  // ─── E. SERVICE OPERATIONS REPORTS ────────────────────────────
  {
    id: 'OPS-INC-2026-08',
    name: 'Monthly Incident Management & Trend Analysis Report',
    category: 'Service Operations',
    type: 'Incident Report',
    period: 'August 2026',
    periodCategory: 'This Month',
    generatedDate: '2026-08-17',
    lastUpdated: '2026-08-17 10:00',
    owner: 'Sara Al-Otaibi',
    department: 'Applications',
    version: 'v1.2',
    status: 'Published',
    frequency: 'Monthly',
    availableFormats: ['PDF', 'Excel', 'CSV'],
    summary: 'Multi-tower incident lifecycle audit covering 103 total ServiceNow tickets, resolution MTTR metrics, and categorization breakdown.',
    keyHighlights: [
      'Mean Time to Resolve (MTTR) reduced from 2.8h to 2.1h across P2/P3 tickets.',
      'SAP S/4HANA module incidents dropped 34% following patch deployment.',
    ],
    kpis: [
      { label: 'Total Incidents Tracked', value: '103 Tickets', status: 'green' },
      { label: 'Average MTTR', value: '2.1 Hours', status: 'green' },
      { label: 'Resolution Rate within SLA', value: '98.8%', status: 'green' },
    ],
    relatedReportIds: ['OPS-PRB-2026-08', 'OPS-RCA-2026-08'],
  },
  {
    id: 'OPS-PRB-2026-08',
    name: 'Problem Management & Root Cause Elimination Report',
    category: 'Service Operations',
    type: 'Problem Report',
    period: 'August 2026',
    periodCategory: 'This Month',
    generatedDate: '2026-08-16',
    lastUpdated: '2026-08-16 14:30',
    owner: 'Sara Al-Otaibi',
    department: 'Applications',
    version: 'v1.0 Approved',
    status: 'Approved',
    frequency: 'Monthly',
    availableFormats: ['PDF', 'Excel'],
    summary: 'Comprehensive investigation of all identified Problems (using proper "Problem" terminology) across Database, Network, and Applications towers.',
    keyHighlights: [
      'PRB-0803 (Database Replication Latency) permanently resolved via SAN cache tuning.',
      '0 recurring root cause re-occurrences over 60 days.',
    ],
    kpis: [
      { label: 'Open Problems Under Investigation', value: '2 Records', status: 'green' },
      { label: 'Permanently Eliminated Problems', value: '14 Records', status: 'green' },
    ],
    relatedReportIds: ['OPS-INC-2026-08', 'OPS-RCA-2026-08'],
  },
  {
    id: 'OPS-RCA-2026-08',
    name: 'Operational RCA Major Post-Mortem Dossier',
    category: 'Service Operations',
    type: 'Operational RCA Report',
    period: 'August 2026',
    periodCategory: 'This Month',
    generatedDate: '2026-08-14',
    lastUpdated: '2026-08-14 16:00',
    owner: 'Omar Al-Mutairi',
    department: 'Database',
    version: 'v1.0 Approved',
    status: 'Approved',
    frequency: 'Monthly',
    availableFormats: ['PDF', 'Excel'],
    summary: 'Full 5-Why and Fishbone analysis for PRB-0803 and network route flapping events with verified corrective actions.',
    keyHighlights: [
      'Root cause isolated to SAN controller port queue depth saturation.',
      'Action items assigned to SAN administrator team and completed ahead of schedule.',
    ],
    kpis: [
      { label: 'RCA Action Completion Rate', value: '100%', status: 'green' },
      { label: 'Customer RCA Sign-off', value: 'Achieved', status: 'green' },
    ],
    relatedReportIds: ['OPS-PRB-2026-08'],
  },

  // ─── F. SLA & SERVICE ASSURANCE REPORTS ───────────────────────
  {
    id: 'SLA-2026-08',
    name: 'SLA Performance & Assurance Compliance Report — August 2026',
    category: 'SLA & Service Assurance',
    type: 'SLA Performance Report',
    period: 'August 2026',
    periodCategory: 'This Month',
    generatedDate: '2026-08-17',
    lastUpdated: '2026-08-17 09:00',
    owner: 'Faisal Al-Harbi',
    department: 'Cross-Tower Governance',
    version: 'v1.0 Approved',
    status: 'Approved',
    frequency: 'Monthly',
    availableFormats: ['PDF', 'Excel', 'CSV'],
    isFeatured: true,
    summary: 'Authoritative audit of 18 contractual KPIs across all 9 towers with penalty calculation engine and Data-Driven vs. Soft SLA tracking.',
    keyHighlights: [
      'Infrastructure Availability: 99.98% (Target 99.50%) — Met.',
      'P1 MTTR Resolution: 100% under 60-minute SLA — Met.',
      'Service Desk Customer CSAT: 96.2% (Target 90.00%) — Met.',
      'Zero financial penalty deductions incurred.',
    ],
    kpis: [
      { label: 'Contract KPIs Meeting Target', value: '18 / 18 (100%)', status: 'green' },
      { label: 'Aggregate Compliance Index', value: '98.4%', status: 'green' },
      { label: 'Penalty Deductions', value: 'SAR 0.00', status: 'green' },
    ],
    relatedReportIds: ['MSR-2026-07', 'EXEC-2026-08', 'WSR-2026-W33'],
  },
  {
    id: 'SLA-BREACH-2026-Q3',
    name: 'SLA Breach Prevention & Soft-SLA Escalation Audit',
    category: 'SLA & Service Assurance',
    type: 'SLA Compliance Report',
    period: 'Q3 2026',
    periodCategory: 'Quarter',
    generatedDate: '2026-08-12',
    lastUpdated: '2026-08-12 15:00',
    owner: 'Faisal Al-Harbi',
    department: 'Cross-Tower Governance',
    version: 'v1.0',
    status: 'Published',
    frequency: 'Quarterly',
    availableFormats: ['PDF', 'Excel'],
    summary: 'Proactive early-warning telemetry detecting tickets approaching 75% SLA threshold with automated escalation triggers.',
    keyHighlights: [
      'Proactive alerting intercepted 19 tickets before breach occurred.',
      'Zero contractual breaches logged across all towers.',
    ],
    kpis: [
      { label: 'Breach Prevention Success', value: '100%', status: 'green' },
    ],
    relatedReportIds: ['SLA-2026-08'],
  },

  // ─── G. GOVERNANCE, AUDIT & COMPLIANCE REPORTS ────────────────
  {
    id: 'AUD-2026-021',
    name: 'NCA ECC-1:2018 Cybersecurity & Audit Compliance Report',
    category: 'Governance, Audit & Compliance',
    type: 'Audit & Compliance Report',
    period: 'August 2026',
    periodCategory: 'This Month',
    generatedDate: '2026-08-16',
    lastUpdated: '2026-08-16 16:30',
    owner: 'Daniel Mathew',
    department: 'Security',
    version: 'v1.0 Approved',
    status: 'Approved',
    frequency: 'Monthly',
    availableFormats: ['PDF', 'Excel'],
    isFeatured: true,
    summary: 'Audit report verifying 42 NCA cybersecurity controls. 41 verified fully compliant, 1 control in active remediation with PAM GPO sync.',
    keyHighlights: [
      '41 / 42 controls fully verified compliant with evidence dossiers.',
      'BeyondTrust PAM credential rotation policy verified active on all 320 servers.',
      'Vulnerability remediation closed 99.2% of high-severity CVEs within 7 days.',
    ],
    kpis: [
      { label: 'NCA ECC Compliance Score', value: '97.6%', status: 'green' },
      { label: 'Audit Findings Closed', value: '41 / 42 Controls', status: 'green' },
      { label: 'Critical Vulnerabilities', value: '0 Open', status: 'green' },
    ],
    traceability: {
      finding: 'NCA-ECC-PAM-04 (GPO Synchronization)',
      owner: 'Daniel Mathew',
      dueDate: '2026-08-25',
      status: 'In Progress',
    },
    relatedReportIds: ['SEC-RISK-2026-08', 'EXEC-2026-08'],
  },

  // ─── H. WORKFORCE & SAUDIZATION REPORTS ───────────────────────
  {
    id: 'SAUD-2026-Q3',
    name: 'Authoritative Saudization Targets vs Actuals Report (Section 4)',
    category: 'Workforce & Saudization',
    type: 'Saudization Milestone Report',
    period: 'August 2026',
    periodCategory: 'This Month',
    generatedDate: '2026-08-17',
    lastUpdated: '2026-08-17 11:00',
    owner: 'Noura Al-Qahtani',
    department: 'PMO',
    version: 'v2.0 Approved',
    status: 'Approved',
    frequency: 'Monthly',
    availableFormats: ['PDF', 'Excel', 'CSV'],
    isFeatured: true,
    summary: 'Official compliance tracking across all 9 approved Saudization domains using exact dimensions (Saudi vs Expatriate) and level classifications.',
    keyHighlights: [
      'Overall Saudization actual achieved 78.4% against 60.0% Ministry target.',
      'Integrated Command Center Saudization at 93% (target 90%).',
      'Service Desk Management Saudization at 100% (target 100%).',
      'Expatriate mentoring pipeline transitioned 8 senior L3 roles to Saudi engineers.',
    ],
    kpis: [
      { label: 'Overall Saudization Actual', value: '78.4%', status: 'green' },
      { label: 'Target Saudization Baseline', value: '60.0%', status: 'green' },
      { label: 'Total Enterprise Headcount', value: '355 Employees', status: 'green' },
      { label: 'Compliant Domains', value: '7 / 9 Domains', status: 'amber' },
    ],
    relatedReportIds: ['WORK-2026-08', 'KT-2026-08'],
  },
  {
    id: 'WORK-2026-08',
    name: 'Master Workforce Distribution & Level Classification Report',
    category: 'Workforce & Saudization',
    type: 'Workforce Report',
    period: 'August 2026',
    periodCategory: 'This Month',
    generatedDate: '2026-08-15',
    lastUpdated: '2026-08-15 13:00',
    owner: 'Noura Al-Qahtani',
    department: 'PMO',
    version: 'v1.0',
    status: 'Published',
    frequency: 'Monthly',
    availableFormats: ['PDF', 'Excel', 'CSV'],
    summary: 'Distribution breakdown across L1 (Analyst), L2 (Engineer), L3 (Senior Specialist), L4 (Operations Lead), and SME/Manager with Saudi and Expatriate counts.',
    keyHighlights: [
      '355 total enterprise employees tracked in central workforce database.',
      'Zero unallocated or unassigned staff on billing rosters.',
    ],
    kpis: [
      { label: 'L1 / L2 Support Staff', value: '210 Staff', status: 'green' },
      { label: 'L3 / L4 / SME Staff', value: '145 Staff', status: 'green' },
    ],
    relatedReportIds: ['SAUD-2026-Q3'],
  },

  // ─── I. LEARNING, CERTIFICATION & CURRICULUM REPORTS ──────────
  {
    id: 'LEARN-2026-08',
    name: 'Saudi Academy Learning & Certification Curriculum Progress Report',
    category: 'Learning & Certification',
    type: 'Training Inventory Report',
    period: 'August 2026',
    periodCategory: 'This Month',
    generatedDate: '2026-08-16',
    lastUpdated: '2026-08-16 10:00',
    owner: 'Sara Al-Otaibi',
    department: 'Applications',
    version: 'v1.0 Approved',
    status: 'Approved',
    frequency: 'Monthly',
    availableFormats: ['PDF', 'Excel'],
    summary: 'Progress report across 6 specialized academies (Cloud, ITIL4, Cybersecurity, DevOps, OpenShift, ITMS) with beginner, intermediate, and expert completions.',
    keyHighlights: [
      '1,240 cumulative training hours logged in Q3.',
      '38 Saudi engineers achieved globally recognized certifications (AWS, Red Hat, ITIL).',
    ],
    kpis: [
      { label: 'Curriculum Completion Rate', value: '94.2%', status: 'green' },
      { label: 'Certifications Awarded', value: '38 Certs', status: 'green' },
    ],
    relatedReportIds: ['KT-2026-08', 'SAUD-2026-Q3'],
  },

  // ─── J. KNOWLEDGE TRANSFER (KT) REPORTS ───────────────────────
  {
    id: 'KT-2026-08',
    name: 'Knowledge Transfer (KT) Governance & Role Handover Report',
    category: 'Knowledge Transfer',
    type: 'Knowledge Transfer Status Report',
    period: 'August 2026',
    periodCategory: 'This Month',
    generatedDate: '2026-08-17',
    lastUpdated: '2026-08-17 12:00',
    owner: 'Noura Al-Qahtani',
    department: 'PMO',
    version: 'v2.0 Approved',
    status: 'Approved',
    frequency: 'Monthly',
    availableFormats: ['PDF', 'Excel'],
    isFeatured: true,
    summary: 'Formal KT governance report preserving strict role handover traceability: Previous Role Holder → KT Provider → Current Role Holder → KT Completion & Sign-off.',
    keyHighlights: [
      '87 out of 92 active KT packages completed with verified formal sign-off.',
      'Role transition audit confirmed previous holders successfully delivered 100% required syllabus modules.',
    ],
    kpis: [
      { label: 'Overall KT Completion', value: '94.6%', status: 'green' },
      { label: 'Signed-off Handover Packages', value: '87 / 92', status: 'green' },
      { label: 'Outstanding Transition Actions', value: '5 Open', status: 'amber' },
    ],
    traceability: {
      structure: 'Previous Role Holder (KT Provider) → Current Role Holder (KT Recipient) → Verification & Sign-off',
      compliance: '100% traceability confirmed across master employees dataset',
    },
    relatedReportIds: ['SAUD-2026-Q3', 'LEARN-2026-08'],
  },

  // ─── K. VENDOR & SIAM REPORTS ─────────────────────────────────
  {
    id: 'SIAM-2026-07',
    name: 'SIAM Multi-Vendor Governance & Performance Scorecard',
    category: 'Vendor & SIAM',
    type: 'SIAM Multi-Vendor Report',
    period: 'July 2026',
    periodCategory: 'Last Month',
    generatedDate: '2026-08-05',
    lastUpdated: '2026-08-05 14:00',
    owner: 'Noura Al-Qahtani',
    department: 'Cross-Tower Governance',
    version: 'v1.0 Approved',
    status: 'Approved',
    frequency: 'Monthly',
    availableFormats: ['PDF', 'Excel', 'CSV'],
    summary: 'Cross-vendor evaluation of 4 strategic suppliers (Wipro, Elm, SBM, STC) measuring OLA adherence, SLA delivery, and defect leakage.',
    keyHighlights: [
      'Wipro application support defect leakage rate dropped below 1.2%.',
      'Elm system integration OLA met with 99.4% compliance.',
    ],
    kpis: [
      { label: 'Supplier OLA Attainment', value: '98.6%', status: 'green' },
      { label: 'Vendor Risk Rating', value: 'LOW (Stable)', status: 'green' },
    ],
    relatedReportIds: ['MSR-2026-07', 'SLA-2026-08'],
  },

  // ─── L. PROGRAMME, GOVERNANCE & DELIVERY REPORTS ──────────────
  {
    id: 'PMO-2026-08',
    name: 'Master Programme Delivery & Milestone Governance Report',
    category: 'Programme & Delivery',
    type: 'Programme Status Report',
    period: 'August 2026',
    periodCategory: 'This Month',
    generatedDate: '2026-08-15',
    lastUpdated: '2026-08-15 11:00',
    owner: 'Noura Al-Qahtani',
    department: 'PMO',
    version: 'v1.0',
    status: 'Published',
    frequency: 'Monthly',
    availableFormats: ['PDF', 'Excel'],
    summary: 'Program health tracking across 12 strategic delivery streams including SAP S/4HANA migration, Cloud Transformation, and Cyber Shield.',
    keyHighlights: [
      '11 of 12 streams tracking on schedule.',
      'SAP migration wave 2 test phase completed with zero critical defects.',
    ],
    kpis: [
      { label: 'Program Health Index', value: 'GREEN (94%)', status: 'green' },
      { label: 'Active Milestones', value: '18 / 19 On Track', status: 'green' },
    ],
    relatedReportIds: ['EXEC-DASH-2026-Q3', 'WSR-2026-W33'],
  },

  // ─── M. CHANGE & RELEASE REPORTS ──────────────────────────────
  {
    id: 'CAB-2026-W33',
    name: 'Change Advisory Board (CAB) Weekly Release & Success Report',
    category: 'Change & Release',
    type: 'Change Advisory Board (CAB) Report',
    period: 'Week 33 (10–16 Aug 2026)',
    periodCategory: 'This Week',
    generatedDate: '2026-08-17',
    lastUpdated: '2026-08-17 13:00',
    owner: 'Ahmed Al-Qahtani',
    department: 'Infrastructure',
    version: 'v1.0 Approved',
    status: 'Approved',
    frequency: 'Weekly',
    availableFormats: ['PDF', 'Excel', 'CSV'],
    summary: 'Complete audit of 14 approved RFCs executed across production environments with 100% change success and zero rollback triggers.',
    keyHighlights: [
      '14 / 14 changes executed successfully within planned maintenance windows.',
      'Emergency RFCs represented less than 3% of total change volume.',
    ],
    kpis: [
      { label: 'Change Success Rate', value: '100%', status: 'green' },
      { label: 'Unauthorized Changes', value: '0 Detected', status: 'green' },
    ],
    relatedReportIds: ['WSR-2026-W33', 'OPS-INC-2026-08'],
  },

  // ─── N. CUSTOMER & SERVICE REPORTS ────────────────────────────
  {
    id: 'CUST-2026-08',
    name: 'Customer Executive Satisfaction & CSAT Governance Report',
    category: 'Customer & Service',
    type: 'Customer Satisfaction Report',
    period: 'August 2026',
    periodCategory: 'This Month',
    generatedDate: '2026-08-16',
    lastUpdated: '2026-08-16 15:00',
    owner: 'Faisal Al-Harbi',
    department: 'Cross-Tower Governance',
    version: 'v1.0 Approved',
    status: 'Approved',
    frequency: 'Monthly',
    availableFormats: ['PDF', 'Excel'],
    summary: 'Executive customer survey analytics, VIP escalations resolution times, and Customer Corner engagement metrics.',
    keyHighlights: [
      'Customer CSAT recorded at 96.2% against 90% benchmark.',
      'VIP fast action desk cleared 100% of executive tickets in < 15 minutes.',
    ],
    kpis: [
      { label: 'Customer CSAT Score', value: '96.2%', status: 'green' },
      { label: 'VIP SLA Compliance', value: '100%', status: 'green' },
    ],
    relatedReportIds: ['MSR-2026-07', 'EXEC-2026-08'],
  },

  // ─── O. TECHNOLOGY, DIGITAL TRANSFORMATION & AI REPORTS ───────
  {
    id: 'TECH-AI-2026-08',
    name: 'Digital Transformation, AI & Automation Impact Assessment',
    category: 'Technology & AI',
    type: 'AI & Automation Report',
    period: 'August 2026',
    periodCategory: 'This Month',
    generatedDate: '2026-08-15',
    lastUpdated: '2026-08-15 14:00',
    owner: 'Arjun Menon',
    department: 'Applications',
    version: 'v1.0',
    status: 'Published',
    frequency: 'Monthly',
    availableFormats: ['PDF', 'Excel'],
    summary: 'Measurement of self-healing automation runbooks, AI anomaly detection on server logs, and reduction in Tier-1 manual effort.',
    keyHighlights: [
      'Automated self-healing scripts resolved 418 disk space and service restart incidents without human intervention.',
      'AI anomaly detection preempted 4 potential cluster degradations.',
    ],
    kpis: [
      { label: 'Automated Resolutions', value: '418 Incidents', status: 'green' },
      { label: 'Labor Hours Saved', value: '184 Hours / Month', status: 'green' },
    ],
    relatedReportIds: ['EXEC-DASH-2026-Q3'],
  },

  // ─── P. RISK REPORTS ──────────────────────────────────────────
  {
    id: 'RISK-2026-08',
    name: 'Enterprise ITMS & Operational Risk Governance Register',
    category: 'Risk',
    type: 'Operational Risk Report',
    period: 'August 2026',
    periodCategory: 'This Month',
    generatedDate: '2026-08-14',
    lastUpdated: '2026-08-14 11:30',
    owner: 'Daniel Mathew',
    department: 'Security',
    version: 'v2.0 Approved',
    status: 'Approved',
    frequency: 'Monthly',
    availableFormats: ['PDF', 'Excel', 'CSV'],
    summary: 'Active risk registry audit covering 14 operational, cyber, supplier, and technology risks with mitigation burn-down plans.',
    keyHighlights: [
      'Zero High or Critical residual risks outstanding.',
      'All 14 tracked risk mitigation plans progressing on schedule.',
    ],
    kpis: [
      { label: 'Critical Residual Risks', value: '0 Open', status: 'green' },
      { label: 'Mitigations On Track', value: '14 / 14 (100%)', status: 'green' },
    ],
    relatedReportIds: ['AUD-2026-021', 'EXEC-2026-08'],
  },
];
