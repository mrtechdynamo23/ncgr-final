export type MeetingType =
  | 'WSR'
  | 'MSR'
  | 'DSR'
  | 'Daily Scrum'
  | 'Scrum Call'
  | 'Governance Meeting'
  | 'Customer Meeting'
  | 'Operational Review'
  | 'Internal Review'
  | 'Other';

export type MeetingPriority = 'Critical' | 'High Priority' | 'Important' | 'Normal';

export type MeetingStatus = 'Upcoming' | 'In Progress' | 'Completed' | 'Cancelled' | 'Rescheduled';

export type AttendanceStatus = 'Organizer' | 'Attended' | 'Expected' | 'Absent';

export interface MeetingParticipant {
  name: string;
  role?: string;
  department?: string;
  email?: string;
  attendanceStatus: AttendanceStatus;
  tower?: string;
}

export interface ActionItem {
  id: string;
  meetingId: string;
  description: string;
  owner: string;
  dueDate: string;
  priority: MeetingPriority;
  status: 'Open' | 'In Progress' | 'Completed';
  notes?: string;
}

export interface MeetingMinutes {
  summary: string;
  keyDiscussionPoints: string[];
  decisionsMade: string[];
  transcriptionHighlights: {
    speaker: string;
    timestamp: string;
    note: string;
  }[];
  actionItems: ActionItem[];
  signOffBy: string;
  approvedDate?: string;
}

export interface MeetingRecord {
  id: string; // e.g. WSR-2026-0817-004
  title: string;
  type: MeetingType;
  date: string; // YYYY-MM-DD
  startTime: string; // e.g. 10:00 AM
  endTime: string; // e.g. 11:00 AM
  durationMinutes: number;
  owner: string;
  tower: string;
  priority: MeetingPriority;
  status: MeetingStatus;
  recurrence?: 'None' | 'Daily' | 'Weekly' | 'Bi-Weekly' | 'Monthly';
  meetingLink?: string;
  location?: string;
  agenda: string;
  participants: MeetingParticipant[];
  mom?: MeetingMinutes;
}

// ─── AUTHENTIC PAST MEETINGS (Aug 1 - Aug 17, 2026) WITH FULL MOMS ───────────────
const PAST_ANCHOR_MEETINGS: MeetingRecord[] = [
  {
    id: 'MSR-2026-0801-001',
    title: 'Monthly Operations & Governance Assurance Review (MSR July 2026)',
    type: 'MSR',
    date: '2026-08-01',
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    durationMinutes: 120,
    owner: 'Faisal Al-Harbi',
    tower: 'Cross-Tower Governance',
    priority: 'Critical',
    status: 'Completed',
    recurrence: 'Monthly',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/ncgr-msr-jul2026',
    location: 'Executive Council Chamber & Webex',
    agenda: 'Monthly performance scorecard sign-off, penalty calculator review, resource capacity index, and WSR aggregation.',
    participants: [
      { name: 'Faisal Al-Harbi', role: 'ITMS Service Delivery Manager', attendanceStatus: 'Organizer', tower: 'Cross-Tower Governance' },
      { name: 'Sara Al-Otaibi', role: 'Application Support Lead', attendanceStatus: 'Attended', tower: 'Applications' },
      { name: 'Ahmed Al-Qahtani', role: 'Infrastructure Lead', attendanceStatus: 'Attended', tower: 'Infrastructure' },
      { name: 'Mohammed Al-Dosari', role: 'Network Lead', attendanceStatus: 'Attended', tower: 'Network' },
      { name: 'Omar Al-Mutairi', role: 'Database Lead', attendanceStatus: 'Attended', tower: 'Database' },
      { name: 'Daniel Mathew', role: 'Cybersecurity Specialist', attendanceStatus: 'Attended', tower: 'Security' },
      { name: 'Noura Al-Qahtani', role: 'Program Manager', attendanceStatus: 'Attended', tower: 'PMO' },
    ],
    mom: {
      summary: 'July 2026 operational performance approved with 99.1% SLA compliance across 18 KPIs. Zero penalties incurred for the 7th consecutive month.',
      keyDiscussionPoints: [
        'Total ticket volume for July was 1,420 with average resolution time of 2.4 hours.',
        'Cloud FinOps cost optimization saved 14.8% on idle compute resources.',
      ],
      decisionsMade: [
        'Formal approval granted for Q3 capacity planning baseline.',
        'Executive sign-off on monthly governance certificate achieved.',
      ],
      transcriptionHighlights: [
        { speaker: 'Faisal Al-Harbi', timestamp: '10:10 AM', note: 'Presented aggregated monthly telemetry metrics.' },
        { speaker: 'Ahmed Al-Qahtani', timestamp: '11:15 AM', note: 'Validated multi-vendor scorecards and infrastructure benchmarks.' },
      ],
      actionItems: [
        {
          id: 'ACT-0801-01',
          meetingId: 'MSR-2026-0801-001',
          description: 'Publish verified July 2026 SLA Certificate to Customer Portal',
          owner: 'Noura Al-Qahtani',
          dueDate: '2026-08-05',
          priority: 'Critical',
          status: 'Completed',
        },
      ],
      signOffBy: 'Faisal Al-Harbi (ITMS Service Delivery Manager)',
      approvedDate: '2026-08-01 12:30 PM',
    },
  },
  {
    id: 'GOV-2026-0805-002',
    title: 'SIAM Multi-Vendor Quarterly Performance Audit',
    type: 'Governance Meeting',
    date: '2026-08-05',
    startTime: '02:00 PM',
    endTime: '03:30 PM',
    durationMinutes: 90,
    owner: 'Noura Al-Qahtani',
    tower: 'Cross-Tower Governance',
    priority: 'High Priority',
    status: 'Completed',
    recurrence: 'Monthly',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/ncgr-siam-audit',
    location: 'Vendor Governance Suite B',
    agenda: 'Evaluation of tier-1 IT suppliers (Wipro, Elm, SBM), cross-vendor OLA adherence, and escalation metrics.',
    participants: [
      { name: 'Noura Al-Qahtani', role: 'Program Manager', attendanceStatus: 'Organizer', tower: 'PMO' },
      { name: 'Faisal Al-Harbi', role: 'Service Delivery Manager', attendanceStatus: 'Attended', tower: 'Cross-Tower Governance' },
      { name: 'Sara Al-Otaibi', role: 'Application Support Lead', attendanceStatus: 'Attended', tower: 'Applications' },
      { name: 'Mohammed Al-Dosari', role: 'Network Lead', attendanceStatus: 'Attended', tower: 'Network' },
    ],
    mom: {
      summary: 'Reviewed 3 vendor contracts. 98.6% compliance achieved across all supplier OLAs.',
      keyDiscussionPoints: [
        'Hardware warranty replacements averaged 3.8 hours against 4-hour SLA.',
        'Wipro application support defect leakage rate dropped below 1.2%.',
      ],
      decisionsMade: [
        'Renewed tier-1 SLA performance endorsements for Elm & SBM.',
      ],
      transcriptionHighlights: [
        { speaker: 'Noura Al-Qahtani', timestamp: '02:10 PM', note: 'Outlined quarterly vendor penalties breakdown.' },
      ],
      actionItems: [
        {
          id: 'ACT-0805-01',
          meetingId: 'GOV-2026-0805-002',
          description: 'Distribute Q3 vendor scorecard matrix to procurement board',
          owner: 'Noura Al-Qahtani',
          dueDate: '2026-08-10',
          priority: 'High Priority',
          status: 'Completed',
        },
      ],
      signOffBy: 'Noura Al-Qahtani (Program Manager)',
      approvedDate: '2026-08-05 04:00 PM',
    },
  },
  {
    id: 'WSR-2026-0810-003',
    title: 'NCGR ITMS Operations WSR — Week 32 Executive Review',
    type: 'WSR',
    date: '2026-08-10',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    durationMinutes: 60,
    owner: 'Faisal Al-Harbi',
    tower: 'Cross-Tower Governance',
    priority: 'High Priority',
    status: 'Completed',
    recurrence: 'Weekly',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/ncgr-wsr-w32',
    location: 'Executive Boardroom',
    agenda: 'Weekly incident trends, P1 outage mitigation review, and database performance health.',
    participants: [
      { name: 'Faisal Al-Harbi', role: 'Service Delivery Manager', attendanceStatus: 'Organizer', tower: 'Cross-Tower Governance' },
      { name: 'Sara Al-Otaibi', role: 'Application Lead', attendanceStatus: 'Attended', tower: 'Applications' },
      { name: 'Ahmed Al-Qahtani', role: 'Infrastructure Lead', attendanceStatus: 'Attended', tower: 'Infrastructure' },
      { name: 'Omar Al-Mutairi', role: 'Database Lead', attendanceStatus: 'Attended', tower: 'Database' },
    ],
    mom: {
      summary: 'Week 32 operational availability clocked at 99.88%. 0 P1 outages experienced during peak working hours.',
      keyDiscussionPoints: [
        'Oracle RAC interconnect bandwidth optimization concluded successfully.',
        'Knowledge Transfer batch 4 candidates passed preliminary certifications.',
      ],
      decisionsMade: [
        'Approved deployment of automated Redis cache refresh for Citizen Portal.',
      ],
      transcriptionHighlights: [
        { speaker: 'Faisal Al-Harbi', timestamp: '10:05 AM', note: 'Opened meeting and reviewed weekly incident graph.' },
      ],
      actionItems: [
        {
          id: 'ACT-0810-01',
          meetingId: 'WSR-2026-0810-003',
          description: 'Verify Redis cache latency metrics on staging environment',
          owner: 'Sara Al-Otaibi',
          dueDate: '2026-08-14',
          priority: 'Important',
          status: 'Completed',
        },
      ],
      signOffBy: 'Faisal Al-Harbi',
      approvedDate: '2026-08-10 11:30 AM',
    },
  },
  {
    id: 'GOV-2026-0816-002',
    title: 'NCGR Cybersecurity & Audit Compliance Governance Committee',
    type: 'Governance Meeting',
    date: '2026-08-16',
    startTime: '02:00 PM',
    endTime: '03:30 PM',
    durationMinutes: 90,
    owner: 'Daniel Mathew',
    tower: 'Security',
    priority: 'Critical',
    status: 'Completed',
    recurrence: 'Bi-Weekly',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/ncgr-sec-gov',
    location: 'Cyber Security War Room Alpha',
    agenda: 'NCA ECC-1:2018 compliance audit readiness, PAM privilege access reviews, vulnerability remediation burndown, and third-party vendor risk assessment.',
    participants: [
      { name: 'Daniel Mathew', role: 'Cybersecurity Specialist', attendanceStatus: 'Organizer', tower: 'Security' },
      { name: 'Faisal Al-Harbi', role: 'ITMS Service Delivery Manager', attendanceStatus: 'Attended', tower: 'Cross-Tower Governance' },
      { name: 'Sara Al-Otaibi', role: 'Application Support Lead', attendanceStatus: 'Attended', tower: 'Applications' },
      { name: 'Fahad Al-Shehri', role: 'Risk & Audit Officer', attendanceStatus: 'Attended', tower: 'Security' },
      { name: 'Mona Al-Zahrani', role: 'Compliance Analyst', attendanceStatus: 'Attended', tower: 'Security' },
      { name: 'Ahmed Al-Qahtani', role: 'Infrastructure Lead', attendanceStatus: 'Attended', tower: 'Infrastructure' },
    ],
    mom: {
      summary: 'Reviewed 42 NCA audit controls; 41 verified fully compliant, 1 control in remediation with PAM GPO synchronization.',
      keyDiscussionPoints: [
        'Vulnerability remediation closed 99.2% of high-severity CVE patches within the 7-day SLA.',
        'BeyondTrust PAM credential rotation policy verified active across all 320 servers.',
      ],
      decisionsMade: [
        'Mandated bi-weekly automated certificate lifecycle validation via AppViewX.',
        'Approved quarterly penetration testing kickoff for October 2026.',
      ],
      transcriptionHighlights: [
        { speaker: 'Daniel Mathew', timestamp: '02:15 PM', note: 'Presented live telemetry dashboard on identity threat detection and response.' },
        { speaker: 'Fahad Al-Shehri', timestamp: '02:50 PM', note: 'Confirmed audit evidence package ready for external regulator submission.' },
      ],
      actionItems: [
        {
          id: 'ACT-0816-01',
          meetingId: 'GOV-2026-0816-002',
          description: 'Submit NCA ECC compliance evidence dossier to Government Audit Board',
          owner: 'Daniel Mathew',
          dueDate: '2026-08-25',
          priority: 'Critical',
          status: 'In Progress',
          notes: 'Signed off by Chief Information Security Officer',
        },
        {
          id: 'ACT-0816-02',
          meetingId: 'GOV-2026-0816-002',
          description: 'Refresh privileged access roster for external vendor database contractors',
          owner: 'Mona Al-Zahrani',
          dueDate: '2026-08-21',
          priority: 'High Priority',
          status: 'Open',
        },
      ],
      signOffBy: 'Daniel Mathew (Cybersecurity Specialist)',
      approvedDate: '2026-08-16 04:00 PM',
    },
  },
  {
    id: 'WSR-2026-0817-004',
    title: 'NCGR ITMS Operations WSR — Week 33 Executive Review',
    type: 'WSR',
    date: '2026-08-17',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    durationMinutes: 60,
    owner: 'Faisal Al-Harbi',
    tower: 'Cross-Tower Governance',
    priority: 'High Priority',
    status: 'Completed',
    recurrence: 'Weekly',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/ncgr-wsr-w33',
    location: 'Executive Boardroom & Teams Bridge',
    agenda: 'Weekly operational assurance, SLA review across all 9 towers, Major Incident Management post-mortem, Saudization milestone validation, and customer deliverables for Week 34.',
    participants: [
      { name: 'Faisal Al-Harbi', role: 'ITMS Service Delivery Manager', attendanceStatus: 'Organizer', tower: 'Cross-Tower Governance' },
      { name: 'Sara Al-Otaibi', role: 'Application Support Lead', attendanceStatus: 'Attended', tower: 'Applications' },
      { name: 'Ahmed Al-Qahtani', role: 'Infrastructure Operations Lead', attendanceStatus: 'Attended', tower: 'Infrastructure' },
      { name: 'Mohammed Al-Dosari', role: 'Network Operations Lead', attendanceStatus: 'Attended', tower: 'Network' },
      { name: 'Omar Al-Mutairi', role: 'Database Administrator Lead', attendanceStatus: 'Attended', tower: 'Database' },
      { name: 'Priya Nair', role: 'Cloud Platform Architect', attendanceStatus: 'Attended', tower: 'Cloud' },
      { name: 'Daniel Mathew', role: 'Cybersecurity Specialist', attendanceStatus: 'Attended', tower: 'Security' },
      { name: 'Noura Al-Qahtani', role: 'Program Manager', attendanceStatus: 'Attended', tower: 'PMO' },
    ],
    mom: {
      summary: 'Reviewed overall operational health for Week 33. Multi-tower SLA compliance recorded at 98.4%. Resolved critical database replication delay PRB-0803 and validated final Saudi academy curriculum sign-offs.',
      keyDiscussionPoints: [
        'Reviewed 103 total ServiceNow incidents; active in-flight count reduced to 24.',
        'Validated WebLogic connection pool capacity patch applied across production clusters.',
        'Saudi Empowerment & Academy milestone 3 closed with 94.2% completion rate.',
        'Upcoming CAB release schedule for SAP S/4HANA migration preparation reviewed.',
      ],
      decisionsMade: [
        'Approved deployment window for Oracle RAC interconnect throughput upgrade to 40Gbps on Saturday 02:00 AM.',
        'Enforced mandatory pre-CAB review for all Emergency change requests.',
        'Authorized creation of dedicated WSR automated scorecard in Executive Control Towers.',
      ],
      transcriptionHighlights: [
        { speaker: 'Faisal Al-Harbi', timestamp: '10:05 AM', note: 'Opened the meeting and confirmed attendance quorum across all tower leads.' },
        { speaker: 'Sara Al-Otaibi', timestamp: '10:18 AM', note: 'Demonstrated updated portal command center filters and reactive KPI card updates.' },
        { speaker: 'Omar Al-Mutairi', timestamp: '10:35 AM', note: 'Presented database storage I/O optimization plan with SAN controller priority rules.' },
        { speaker: 'Ahmed Al-Qahtani', timestamp: '10:50 AM', note: 'Summarized infrastructure availability and VMware cluster baseline.' },
      ],
      actionItems: [
        {
          id: 'ACT-0817-01',
          meetingId: 'WSR-2026-0817-004',
          description: 'Deploy SAN controller I/O throttling rules for backup windows',
          owner: 'Omar Al-Mutairi',
          dueDate: '2026-08-20',
          priority: 'High Priority',
          status: 'In Progress',
          notes: 'Coordinate with Infrastructure SAN admin team',
        },
        {
          id: 'ACT-0817-02',
          meetingId: 'WSR-2026-0817-004',
          description: 'Submit formal WSR executive summary deck to NCGR CIO Office',
          owner: 'Faisal Al-Harbi',
          dueDate: '2026-08-18',
          priority: 'High Priority',
          status: 'Completed',
          notes: 'Distributed via secure corporate dispatch',
        },
        {
          id: 'ACT-0817-03',
          meetingId: 'WSR-2026-0817-004',
          description: 'Audit knowledge base SOP document refresh for ServiceNow discovery batching',
          owner: 'Arjun Menon',
          dueDate: '2026-08-22',
          priority: 'Important',
          status: 'Open',
        },
      ],
      signOffBy: 'Faisal Al-Harbi (Service Delivery Manager)',
      approvedDate: '2026-08-17 11:30 AM',
    },
  },
  {
    id: 'DSR-2026-0817-012',
    title: 'Daily Operations Standup & Incident Triage (DSR)',
    type: 'DSR',
    date: '2026-08-17',
    startTime: '08:30 AM',
    endTime: '09:00 AM',
    durationMinutes: 30,
    owner: 'Aisha Rahman',
    tower: 'Service Desk Mgmt',
    priority: 'Normal',
    status: 'Completed',
    recurrence: 'Daily',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/ncgr-dsr-daily',
    location: 'Integrated Command Center Floor',
    agenda: 'Shift handover verification, overnight alert clearances, open P1/P2 reviews, daily high-volume service requests.',
    participants: [
      { name: 'Aisha Rahman', role: 'Service Desk Lead', attendanceStatus: 'Organizer', tower: 'Service Desk Mgmt' },
      { name: 'Sara Al-Otaibi', role: 'Application Support Lead', attendanceStatus: 'Attended', tower: 'Applications' },
      { name: 'Rakesh Kumar', role: 'Infrastructure Operations Lead', attendanceStatus: 'Attended', tower: 'Infrastructure' },
      { name: 'Layla Hassan', role: 'Digital Workplace Specialist', attendanceStatus: 'Attended', tower: 'Digital Workplace' },
      { name: 'Tariq Al-Ghamdi', role: 'Service Desk Tier-2 Lead', attendanceStatus: 'Attended', tower: 'Service Desk Mgmt' },
    ],
    mom: {
      summary: 'Night shift handed over with 0 active P1 incidents. 14 standard change deployments succeeded overnight. Morning VIP ticket queue prioritized.',
      keyDiscussionPoints: [
        'Reviewed overnight automated patch cycles; 100% host compliance verified.',
        'VIP access request for Ministry audit cleared within 12 minutes.',
      ],
      decisionsMade: [
        'Assigned Tier-2 dedicated engineer to handle bulk onboarding requests.',
      ],
      transcriptionHighlights: [
        { speaker: 'Aisha Rahman', timestamp: '08:32 AM', note: 'Verified night shift logbook and acknowledged clear handover.' },
        { speaker: 'Tariq Al-Ghamdi', timestamp: '08:45 AM', note: 'Reported zero backlog on morning queue.' },
      ],
      actionItems: [
        {
          id: 'ACT-0817-04',
          meetingId: 'DSR-2026-0817-012',
          description: 'Complete morning VIP queue check-in call with executive office coordinators',
          owner: 'Tariq Al-Ghamdi',
          dueDate: '2026-08-17',
          priority: 'Normal',
          status: 'Completed',
        },
      ],
      signOffBy: 'Aisha Rahman (Service Desk Lead)',
      approvedDate: '2026-08-17 09:15 AM',
    },
  },
  {
    id: 'SCRUM-2026-0817-003',
    title: 'Application Services & Automation Daily Scrum',
    type: 'Daily Scrum',
    date: '2026-08-17',
    startTime: '09:30 AM',
    endTime: '09:45 AM',
    durationMinutes: 15,
    owner: 'Sara Al-Otaibi',
    tower: 'Applications',
    priority: 'Normal',
    status: 'Completed',
    recurrence: 'Daily',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/ncgr-app-scrum',
    location: 'Engineering Pod 2 & Remote Bridge',
    agenda: 'Sprint 24 progress: 1) What was completed yesterday, 2) Planned for today, 3) Blockers and technical dependencies.',
    participants: [
      { name: 'Sara Al-Otaibi', role: 'Application Support Lead & Scrum Master', attendanceStatus: 'Organizer', tower: 'Applications' },
      { name: 'Faisal Al-Harbi', role: 'ITMS Service Delivery Manager', attendanceStatus: 'Attended', tower: 'Cross-Tower Governance' },
      { name: 'Arjun Menon', role: 'Automation Engineer', attendanceStatus: 'Attended', tower: 'Applications' },
      { name: 'Priya Nair', role: 'Cloud Platform Architect', attendanceStatus: 'Attended', tower: 'Cloud' },
      { name: 'Bandar Al-Harbi', role: 'Software Engineer', attendanceStatus: 'Attended', tower: 'Applications' },
    ],
    mom: {
      summary: 'Sprint 24 burn-down tracking on target. Central calendar module and reactive command center filters delivered and validated.',
      keyDiscussionPoints: [
        'Command center data tables connected to live filter state.',
        'Calendar MOM traceability link confirmed functional.',
      ],
      decisionsMade: [
        'Move meeting scheduling modal validation tests to staging environment.',
      ],
      transcriptionHighlights: [
        { speaker: 'Sara Al-Otaibi', timestamp: '09:32 AM', note: 'Reviewed sprint tickets and assigned final polish tasks.' },
      ],
      actionItems: [
        {
          id: 'ACT-0817-05',
          meetingId: 'SCRUM-2026-0817-003',
          description: 'Deploy portal build update to staging cluster for QA validation',
          owner: 'Arjun Menon',
          dueDate: '2026-08-17',
          priority: 'Important',
          status: 'Completed',
        },
      ],
      signOffBy: 'Sara Al-Otaibi (Application Support Lead)',
      approvedDate: '2026-08-17 09:55 AM',
    },
  },
];

// ─── DYNAMIC MULTI-MONTH ENTERPRISE SCHEDULE GENERATOR ────────────────
// Generates distinct, rich, non-repetitive schedules for every date in Aug, Sep, Oct 2026.
// Crucial: For all future dates (>= 2026-08-18), status is 'Upcoming' and mom is strictly undefined!

interface SchedulePattern {
  type: MeetingType;
  title: string;
  time: string;
  endTime: string;
  duration: number;
  owner: string;
  tower: string;
  priority: MeetingPriority;
  location: string;
  agenda: string;
  participants: Array<{ name: string; role: string; tower: string }>;
}

const SUNDAY_PATTERNS: SchedulePattern[] = [
  {
    type: 'DSR',
    title: 'Weekly Shift Kickoff & Incident Backlog Standup (DSR)',
    time: '08:30 AM',
    endTime: '09:00 AM',
    duration: 30,
    owner: 'Aisha Rahman',
    tower: 'Service Desk Mgmt',
    priority: 'Normal',
    location: 'Integrated Command Center Floor',
    agenda: 'Sunday morning queue realignment, overnight batch logs, and priority SLA clearances.',
    participants: [
      { name: 'Aisha Rahman', role: 'Service Desk Lead', tower: 'Service Desk Mgmt' },
      { name: 'Tariq Al-Ghamdi', role: 'Tier-2 Lead', tower: 'Service Desk Mgmt' },
      { name: 'Sara Al-Otaibi', role: 'Application Lead', tower: 'Applications' },
    ],
  },
  {
    type: 'Governance Meeting',
    title: 'Database Cluster Capacity & High Availability Health Check',
    time: '11:00 AM',
    endTime: '12:00 PM',
    duration: 60,
    owner: 'Omar Al-Mutairi',
    tower: 'Database',
    priority: 'High Priority',
    location: 'Database Operations Room',
    agenda: 'Oracle Data Guard sync latency, PostgreSQL read replica balancing, and tablespace auto-growth limits.',
    participants: [
      { name: 'Omar Al-Mutairi', role: 'Database Administrator Lead', tower: 'Database' },
      { name: 'Ahmed Al-Qahtani', role: 'Infrastructure Operations Lead', tower: 'Infrastructure' },
      { name: 'Priya Nair', role: 'Cloud Architect', tower: 'Cloud' },
    ],
  },
  {
    type: 'Operational Review',
    title: 'Cross-Tower Sprint Backlog Grooming & Resource Allocation',
    time: '02:30 PM',
    endTime: '03:30 PM',
    duration: 60,
    owner: 'Noura Al-Qahtani',
    tower: 'Program Management',
    priority: 'Important',
    location: 'PMO Collaborative Suite',
    agenda: 'Sprint task commitments, resource velocity tracking, and cross-tower interdependencies.',
    participants: [
      { name: 'Noura Al-Qahtani', role: 'Program Manager', tower: 'PMO' },
      { name: 'Faisal Al-Harbi', role: 'Service Delivery Manager', tower: 'Cross-Tower Governance' },
      { name: 'Sara Al-Otaibi', role: 'Application Lead', tower: 'Applications' },
      { name: 'Daniel Mathew', role: 'Cybersecurity Specialist', tower: 'Security' },
    ],
  },
];

const MONDAY_PATTERNS: SchedulePattern[] = [
  {
    type: 'WSR',
    title: 'NCGR ITMS Operations WSR — Multi-Tower Executive Assurance',
    time: '10:00 AM',
    endTime: '11:00 AM',
    duration: 60,
    owner: 'Faisal Al-Harbi',
    tower: 'Cross-Tower Governance',
    priority: 'Critical',
    location: 'Executive Council Chamber & Teams',
    agenda: 'Executive review of multi-tower SLA compliance, major incident root causes, change success rate, and CIO briefing.',
    participants: [
      { name: 'Faisal Al-Harbi', role: 'Service Delivery Manager', tower: 'Cross-Tower Governance' },
      { name: 'Sara Al-Otaibi', role: 'Application Support Lead', tower: 'Applications' },
      { name: 'Ahmed Al-Qahtani', role: 'Infrastructure Operations Lead', tower: 'Infrastructure' },
      { name: 'Mohammed Al-Dosari', role: 'Network Operations Lead', tower: 'Network' },
      { name: 'Omar Al-Mutairi', role: 'Database Lead', tower: 'Database' },
      { name: 'Daniel Mathew', role: 'Cybersecurity Specialist', tower: 'Security' },
      { name: 'Noura Al-Qahtani', role: 'Program Manager', tower: 'PMO' },
    ],
  },
  {
    type: 'Daily Scrum',
    title: 'Application Services & Automation Standup',
    time: '09:30 AM',
    endTime: '09:45 AM',
    duration: 15,
    owner: 'Sara Al-Otaibi',
    tower: 'Applications',
    priority: 'Normal',
    location: 'Engineering Pod 2',
    agenda: 'Daily tickets burndown, PR reviews, automation test suite results, and deployments.',
    participants: [
      { name: 'Sara Al-Otaibi', role: 'Application Support Lead', tower: 'Applications' },
      { name: 'Arjun Menon', role: 'Automation Engineer', tower: 'Applications' },
      { name: 'Bandar Al-Harbi', role: 'Software Engineer', tower: 'Applications' },
    ],
  },
  {
    type: 'Operational Review',
    title: 'Network Operations & SD-WAN Telemetry Review',
    time: '02:00 PM',
    endTime: '03:00 PM',
    duration: 60,
    owner: 'Mohammed Al-Dosari',
    tower: 'Network',
    priority: 'Important',
    location: 'NOC Command Center',
    agenda: 'Core switch utilization, BGP route flapping mitigation, IPsec tunnel stability, and ISP link latency analysis.',
    participants: [
      { name: 'Mohammed Al-Dosari', role: 'Network Operations Lead', tower: 'Network' },
      { name: 'Ahmed Al-Qahtani', role: 'Infrastructure Lead', tower: 'Infrastructure' },
      { name: 'Khalid Al-Shammari', role: 'NOC Senior Engineer', tower: 'Network' },
    ],
  },
];

const TUESDAY_PATTERNS: SchedulePattern[] = [
  {
    type: 'Governance Meeting',
    title: 'Change Advisory Board (CAB) Weekly Approval & Risk Review',
    time: '02:00 PM',
    endTime: '03:30 PM',
    duration: 90,
    owner: 'Ahmed Al-Qahtani',
    tower: 'Cross-Tower Governance',
    priority: 'Critical',
    location: 'CAB Virtual War Room',
    agenda: 'Formal CAB evaluation of Normal and Emergency RFCs, rollback readiness, maintenance windows, and customer impact.',
    participants: [
      { name: 'Ahmed Al-Qahtani', role: 'CAB Chairperson & Infra Lead', tower: 'Cross-Tower Governance' },
      { name: 'Sara Al-Otaibi', role: 'Application Support Lead', tower: 'Applications' },
      { name: 'Omar Al-Mutairi', role: 'Database Administrator Lead', tower: 'Database' },
      { name: 'Daniel Mathew', role: 'Cybersecurity Specialist', tower: 'Security' },
      { name: 'Faisal Al-Harbi', role: 'Service Delivery Manager', tower: 'Cross-Tower Governance' },
    ],
  },
  {
    type: 'Customer Meeting',
    title: 'Customer Operations Alignment & Milestone Touchpoint',
    time: '11:00 AM',
    endTime: '12:00 PM',
    duration: 60,
    owner: 'Faisal Al-Harbi',
    tower: 'Cross-Tower Governance',
    priority: 'High Priority',
    location: 'VIP Customer Council Chamber',
    agenda: 'Monthly SLA certificate handover, citizen portal feature releases, and VIP escalation clearances.',
    participants: [
      { name: 'Faisal Al-Harbi', role: 'Service Delivery Manager', tower: 'Cross-Tower Governance' },
      { name: 'Sara Al-Otaibi', role: 'Application Lead', tower: 'Applications' },
      { name: 'Noura Al-Qahtani', role: 'Program Manager', tower: 'PMO' },
    ],
  },
  {
    type: 'Internal Review',
    title: 'Saudi Empowerment & Knowledge Transfer (KT) Progress Sync',
    time: '04:00 PM',
    endTime: '05:00 PM',
    duration: 60,
    owner: 'Noura Al-Qahtani',
    tower: 'Program Management',
    priority: 'Important',
    location: 'Empowerment Academy Room 102',
    agenda: 'Review 1-to-1 KT session completion rates, verify role history transition traceability, and cohort graduation readiness.',
    participants: [
      { name: 'Noura Al-Qahtani', role: 'Program Manager', tower: 'Program Management' },
      { name: 'Faisal Al-Harbi', role: 'Service Delivery Manager', tower: 'Cross-Tower Governance' },
      { name: 'Sara Al-Otaibi', role: 'Application Support Lead', tower: 'Applications' },
      { name: 'Priya Nair', role: 'Cloud Architect', tower: 'Cloud' },
    ],
  },
];

const WEDNESDAY_PATTERNS: SchedulePattern[] = [
  {
    type: 'Operational Review',
    title: 'Cloud Infrastructure & OpenShift Cluster Resource Optimization',
    time: '10:30 AM',
    endTime: '11:30 AM',
    duration: 60,
    owner: 'Priya Nair',
    tower: 'Cloud',
    priority: 'High Priority',
    location: 'Cloud Engineering War Room',
    agenda: 'OpenShift container cluster node resource balancing, VMware ESXi 8.0 upgrade readiness, and storage volume optimization.',
    participants: [
      { name: 'Priya Nair', role: 'Cloud Platform Architect', tower: 'Cloud' },
      { name: 'Ahmed Al-Qahtani', role: 'Infrastructure Lead', tower: 'Infrastructure' },
      { name: 'Rakesh Kumar', role: 'Infrastructure Operations Lead', tower: 'Infrastructure' },
      { name: 'Mohammed Al-Dosari', role: 'Network Lead', tower: 'Network' },
    ],
  },
  {
    type: 'Governance Meeting',
    title: 'NCA ECC Cybersecurity Controls & Vulnerability Remediation Sync',
    time: '02:00 PM',
    endTime: '03:15 PM',
    duration: 75,
    owner: 'Daniel Mathew',
    tower: 'Security',
    priority: 'Critical',
    location: 'Cyber Security War Room Alpha',
    agenda: 'Audit remediation burndown, PAM credential rotations, and external penetration testing status.',
    participants: [
      { name: 'Daniel Mathew', role: 'Cybersecurity Specialist', tower: 'Security' },
      { name: 'Fahad Al-Shehri', role: 'Risk & Audit Officer', tower: 'Security' },
      { name: 'Mona Al-Zahrani', role: 'Compliance Analyst', tower: 'Security' },
      { name: 'Faisal Al-Harbi', role: 'Service Delivery Manager', tower: 'Cross-Tower Governance' },
    ],
  },
  {
    type: 'DSR',
    title: 'VIP Support Desk & Incident Priority Triage',
    time: '08:30 AM',
    endTime: '09:00 AM',
    duration: 30,
    owner: 'Aisha Rahman',
    tower: 'Service Desk Mgmt',
    priority: 'Normal',
    location: 'Integrated Command Center',
    agenda: 'Morning VIP request queues, portal feedback tickets, and field support dispatching.',
    participants: [
      { name: 'Aisha Rahman', role: 'Service Desk Lead', tower: 'Service Desk Mgmt' },
      { name: 'Tariq Al-Ghamdi', role: 'Tier-2 Lead', tower: 'Service Desk Mgmt' },
      { name: 'Layla Hassan', role: 'Digital Workplace Specialist', tower: 'Digital Workplace' },
    ],
  },
];

const THURSDAY_PATTERNS: SchedulePattern[] = [
  {
    type: 'Operational Review',
    title: 'Weekly Operations Wrap-Up & Weekend Patch Readiness',
    time: '11:00 AM',
    endTime: '12:00 PM',
    duration: 60,
    owner: 'Ahmed Al-Qahtani',
    tower: 'Infrastructure',
    priority: 'High Priority',
    location: 'Command Center Conference Room',
    agenda: 'Weekend maintenance schedule verification, on-call engineer rosters, and automated rollback validation.',
    participants: [
      { name: 'Ahmed Al-Qahtani', role: 'Infrastructure Operations Lead', tower: 'Infrastructure' },
      { name: 'Sara Al-Otaibi', role: 'Application Lead', tower: 'Applications' },
      { name: 'Omar Al-Mutairi', role: 'Database Lead', tower: 'Database' },
      { name: 'Aisha Rahman', role: 'Service Desk Lead', tower: 'Service Desk Mgmt' },
      { name: 'Rakesh Kumar', role: 'Infrastructure Operations Lead', tower: 'Infrastructure' },
    ],
  },
  {
    type: 'Internal Review',
    title: 'Knowledge Base Runbook & Standard Operating Procedure (SOP) Audit',
    time: '02:00 PM',
    endTime: '03:00 PM',
    duration: 60,
    owner: 'Arjun Menon',
    tower: 'Applications',
    priority: 'Normal',
    location: 'Digital Transformation Hub',
    agenda: 'Runbook documentation updates, self-healing automation scripts validation, and Tier-1 quick resolution workflows.',
    participants: [
      { name: 'Arjun Menon', role: 'Automation Engineer', tower: 'Applications' },
      { name: 'Aisha Rahman', role: 'Service Desk Lead', tower: 'Service Desk Mgmt' },
      { name: 'Sara Al-Otaibi', role: 'Application Lead', tower: 'Applications' },
    ],
  },
  {
    type: 'Governance Meeting',
    title: 'Weekly Saudization % Milestone & Domain Targets Review',
    time: '03:30 PM',
    endTime: '04:30 PM',
    duration: 60,
    owner: 'Noura Al-Qahtani',
    tower: 'Program Management',
    priority: 'Important',
    location: 'HR Governance Boardroom',
    agenda: 'Authoritative Saudization targets vs actuals review across all 9 domains, hiring pipeline, and Ministry reporting.',
    participants: [
      { name: 'Noura Al-Qahtani', role: 'Program Manager', tower: 'PMO' },
      { name: 'Faisal Al-Harbi', role: 'Service Delivery Manager', tower: 'Cross-Tower Governance' },
      { name: 'Daniel Mathew', role: 'Cybersecurity Specialist', tower: 'Security' },
    ],
  },
];

const WEEKEND_PATTERNS: SchedulePattern[] = [
  {
    type: 'Operational Review',
    title: 'Weekend Maintenance Window Standup & Off-Peak Patch Verification',
    time: '01:00 AM',
    endTime: '02:00 AM',
    duration: 60,
    owner: 'Ahmed Al-Qahtani',
    tower: 'Infrastructure',
    priority: 'Critical',
    location: 'Virtual Maintenance Bridge',
    agenda: 'Production host patching, SAN storage firmware upgrades, and database cold backup verification.',
    participants: [
      { name: 'Ahmed Al-Qahtani', role: 'Infrastructure Lead', tower: 'Infrastructure' },
      { name: 'Omar Al-Mutairi', role: 'Database Lead', tower: 'Database' },
      { name: 'Rakesh Kumar', role: 'Infrastructure Operations Lead', tower: 'Infrastructure' },
    ],
  },
  {
    type: 'DSR',
    title: 'Weekend On-Call Shift Handover & Telemetry Check',
    time: '08:00 AM',
    endTime: '08:30 AM',
    duration: 30,
    owner: 'Aisha Rahman',
    tower: 'Service Desk Mgmt',
    priority: 'Normal',
    location: 'Command Center Shift Desk',
    agenda: 'Weekend shift handover, monitoring dashboard sweeps, and on-call escalation tests.',
    participants: [
      { name: 'Aisha Rahman', role: 'Service Desk Lead', tower: 'Service Desk Mgmt' },
      { name: 'Tariq Al-Ghamdi', role: 'Tier-2 Lead', tower: 'Service Desk Mgmt' },
    ],
  },
];

// Helper to generate full schedules across August, September, and October 2026
function generateTwoMonthMasterMeetings(): MeetingRecord[] {
  const allMeetings: MeetingRecord[] = [...PAST_ANCHOR_MEETINGS];
  const existingMeetingIds = new Set(PAST_ANCHOR_MEETINGS.map(m => `${m.date}_${m.title}`));

  // Generate for August 1, 2026 through October 31, 2026
  const startDate = new Date(2026, 7, 1); // Aug 1, 2026
  const endDate = new Date(2026, 9, 31); // Oct 31, 2026

  let cur = new Date(startDate);
  let idCounter = 200;

  while (cur <= endDate) {
    const y = cur.getFullYear();
    const m = String(cur.getMonth() + 1).padStart(2, '0');
    const d = String(cur.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${d}`;
    const dayOfWeek = cur.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat

    // Check if past or future dynamically based on current date
    const todayD = new Date();
    const todayStr = `${todayD.getFullYear()}-${String(todayD.getMonth() + 1).padStart(2, '0')}-${String(todayD.getDate()).padStart(2, '0')}`;
    const isPast = dateStr < todayStr;

    let dayPatterns: SchedulePattern[] = [];
    if (dayOfWeek === 0) dayPatterns = SUNDAY_PATTERNS;
    else if (dayOfWeek === 1) dayPatterns = MONDAY_PATTERNS;
    else if (dayOfWeek === 2) dayPatterns = TUESDAY_PATTERNS;
    else if (dayOfWeek === 3) dayPatterns = WEDNESDAY_PATTERNS;
    else if (dayOfWeek === 4) dayPatterns = THURSDAY_PATTERNS;
    else dayPatterns = WEEKEND_PATTERNS;

    // Pick 1 to 3 distinct patterns for each day to create dynamic variety
    dayPatterns.forEach((pat, pIdx) => {
      const key = `${dateStr}_${pat.title}`;
      if (existingMeetingIds.has(key)) return;

      idCounter++;
      const prefix = pat.type.replace(/\s+/g, '').toUpperCase().slice(0, 4);
      const meetingId = `${prefix}-${y}-${m}${d}-${String(idCounter).padStart(3, '0')}`;

      const meeting: MeetingRecord = {
        id: meetingId,
        title: pat.title,
        type: pat.type,
        date: dateStr,
        startTime: pat.time,
        endTime: pat.endTime,
        durationMinutes: pat.duration,
        owner: pat.owner,
        tower: pat.tower,
        priority: pat.priority,
        status: isPast ? 'Completed' : 'Upcoming',
        recurrence: 'Weekly',
        meetingLink: `https://teams.microsoft.com/l/meetup-join/ncgr-${meetingId.toLowerCase()}`,
        location: pat.location,
        agenda: pat.agenda,
        participants: pat.participants.map((p, idx) => ({
          name: p.name,
          role: p.role,
          tower: p.tower,
          attendanceStatus: isPast
            ? (idx === 0 ? 'Organizer' : 'Attended')
            : (idx === 0 ? 'Organizer' : 'Expected'),
        })),
        // Crucial: For future meetings, there must be NO MOM!
        mom: isPast ? {
          summary: `Successfully completed ${pat.title}. Operational SLAs and action items reviewed and verified.`,
          keyDiscussionPoints: [
            `Reviewed key deliverable metrics for ${pat.tower} tower.`,
            'Zero blockers identified on ongoing operational work packages.',
          ],
          decisionsMade: [
            `Formally endorsed weekly performance scorecards for ${pat.tower}.`,
          ],
          transcriptionHighlights: [
            { speaker: pat.owner, timestamp: pat.time, note: `Led the discussion on ${pat.title} and confirmed quorum.` },
          ],
          actionItems: [
            {
              id: `ACT-${m}${d}-${pIdx + 1}`,
              meetingId: meetingId,
              description: `Follow up on operational milestones agreed during ${pat.title}`,
              owner: pat.owner,
              dueDate: dateStr,
              priority: pat.priority,
              status: 'Completed',
            },
          ],
          signOffBy: `${pat.owner} (${pat.tower})`,
          approvedDate: `${dateStr} ${pat.endTime}`,
        } : undefined,
      };

      allMeetings.push(meeting);
      existingMeetingIds.add(key);
    });

    cur.setDate(cur.getDate() + 1);
  }

  // Sort by date ascending
  return allMeetings.sort((a, b) => a.date.localeCompare(b.date));
}

export const INITIAL_MEETINGS: MeetingRecord[] = generateTwoMonthMasterMeetings();
