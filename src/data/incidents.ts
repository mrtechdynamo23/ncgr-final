/**
 * NCGR Incidents — EXPANDED DEMO DATA (100+ incidents)
 * Source system: ServiceNow (simulated)
 */

export type ResolutionAttribution = 'Human' | 'AI Assistant';

export type AICapability =
  | 'Incident Correlation & Root Cause Analysis'
  | 'Anomaly Detection'
  | 'Knowledge-Based Resolution'
  | 'Resolution Recommendation'
  | 'Service Dependency Analysis'
  | 'Pattern Recognition'
  | 'Automated Remediation';

export interface AIResolutionBrief {
  resolutionMethod: string;
  aiCapability: AICapability;
  aiFoundation: string;
  whatAiIdentified: string;
  evidenceUsed: string[];
  aiContribution: string;
  humanValidation: 'Validated by engineer' | 'Human approval recorded' | 'Not applicable';
  resolutionOutcome: string;
}

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
  resolutionBy: ResolutionAttribution;
  aiResolutionBrief?: AIResolutionBrief;
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
  const p1Incidents: Array<Partial<Incident> & { resolutionBy: ResolutionAttribution; aiBrief?: AIResolutionBrief }> = [
    {
      title: 'Core network switch degradation — Building A',
      description: 'Nexus 9000 core switch showing CRC errors on multiple uplinks causing intermittent packet drops across Building A floor 3-5',
      service: 'Enterprise Network Services',
      tower: 'Network',
      businessImpact: 'Network connectivity impacted for 200+ users in Building A',
      status: 'In Progress',
      owner: 'Mohammed Al-Dosari',
      assignmentGroup: 'Network Operations',
      relatedCI: 'SW-CORE-A-01',
      rcaStatus: 'Pending',
      createdDate: '2026-08-12 08:27',
      duration: '2h 15m',
      resolutionBy: 'Human',
    },
    {
      title: 'Oracle RAC node failover — Production DB cluster',
      description: 'Oracle RAC node 2 experienced unexpected failover during financial reporting batch. Automatic failover to node 3 completed but with 12-minute service interruption',
      service: 'Database Services',
      tower: 'Database',
      businessImpact: 'Financial reporting delayed — Hyperion HFM impacted',
      status: 'In Progress',
      owner: 'Omar Al-Mutairi',
      assignmentGroup: 'Database Operations',
      relatedCI: 'ORA-RAC-PRD-02',
      relatedChange: 'CHG0012845',
      rcaStatus: 'In Progress',
      createdDate: '2026-08-12 07:00',
      duration: '3h 42m',
      resolutionBy: 'AI Assistant',
      aiBrief: {
        resolutionMethod: 'AI-Assisted Resolution',
        aiCapability: 'Incident Correlation & Root Cause Analysis',
        aiFoundation: 'Sovereign AI Assistant (ALLaM Foundation)',
        whatAiIdentified: 'Correlated application APM database latency alerts with recent interconnect keep-alive timeout logs and related configuration-item history ORA-RAC-PRD-02 to identify sudden interconnect packet drops following CHG0012845.',
        evidenceUsed: [
          'Oracle Clusterware interconnect telemetry logs',
          'ServiceNow CI dependency graph (CI-DB-ORA-RAC-02)',
          'Recent change ticket metadata (CHG0012845)',
          'Historical RAC failover pattern KB-DB-00418',
        ],
        aiContribution: 'Identified root cause within 4 minutes of alert ingestion and formulated the verified cluster interconnect parameter tuning procedure for DBA execution.',
        humanValidation: 'Validated by engineer',
        resolutionOutcome: 'DBA executed the recommended cluster parameter realignment; interconnect stability restored with zero subsequent node evictions.',
      },
    },
    {
      title: 'SAP ECC production system unresponsive',
      description: 'SAP ECC production system not responding to user connections. Application server work processes exhausted. Emergency restart required',
      service: 'SAP Middleware',
      tower: 'SAP',
      businessImpact: 'All SAP transactions halted — 150+ users affected',
      status: 'Resolved',
      owner: 'Sara Al-Otaibi',
      assignmentGroup: 'SAP Basis',
      relatedCI: 'SAP-ECC-PRD',
      rcaStatus: 'Completed',
      createdDate: '2026-08-10 06:15',
      duration: '4h 30m',
      resolutionBy: 'AI Assistant',
      aiBrief: {
        resolutionMethod: 'AI-Assisted Resolution',
        aiCapability: 'Anomaly Detection',
        aiFoundation: 'Sovereign AI Assistant (ALLaM Foundation)',
        whatAiIdentified: 'Detected anomalous accumulation of locked background RFC processes spawned by an unoptimized batch payroll export, depleting dialog work processes.',
        evidenceUsed: [
          'SAP SM50 / SM66 active work process telemetry',
          'SAP EarlyWatch diagnostic trace logs',
          'Application server memory heap metrics',
          'ServiceNow SAP Basis runbook KB-SAP-00102',
        ],
        aiContribution: 'Isolated runaway background process IDs and recommended graceful RFC job termination avoiding full instance restart.',
        humanValidation: 'Human approval recorded',
        resolutionOutcome: 'SAP Basis team cancelled isolated runaway sessions; 18 dialog work processes recovered immediately without system restart.',
      },
    },
    {
      title: 'Data center cooling failure — Zone B',
      description: 'CRAC unit 4 in Zone B data center failed. Temperature rising above threshold. Emergency cooling procedures activated',
      service: 'Infrastructure Services',
      tower: 'Infrastructure',
      businessImpact: 'Risk of hardware shutdown in Zone B — 40 servers at risk',
      status: 'Resolved',
      owner: 'Ahmed Al-Qahtani',
      assignmentGroup: 'Infrastructure Operations',
      relatedCI: 'DC-CRAC-04',
      rcaStatus: 'Completed',
      createdDate: '2026-08-08 14:20',
      duration: '6h 10m',
      resolutionBy: 'Human',
    },
    {
      title: 'Firewall cluster failover — Perimeter',
      description: 'Primary Palo Alto firewall in HA cluster experienced hardware fault. Failover to secondary completed with 3-minute traffic disruption',
      service: 'Security Operations',
      tower: 'Security',
      businessImpact: 'All internet traffic disrupted for 3 minutes during failover',
      status: 'Closed',
      owner: 'Daniel Mathew',
      assignmentGroup: 'Security Operations',
      relatedCI: 'FW-PALO-PRD-01',
      rcaStatus: 'Completed',
      createdDate: '2026-08-06 22:45',
      duration: '2h 20m',
      resolutionBy: 'Human',
    },
    {
      title: 'Azure AD sync failure — Identity Services',
      description: 'Azure AD Connect synchronization failed causing authentication issues for cloud applications. Users unable to access M365 services',
      service: 'Identity & Access',
      tower: 'Security',
      businessImpact: 'Cloud SSO authentication failing for 500+ users',
      status: 'In Progress',
      owner: 'Daniel Mathew',
      assignmentGroup: 'Security Operations',
      relatedCI: 'AAD-SYNC-01',
      rcaStatus: 'Pending',
      createdDate: '2026-08-13 05:30',
      duration: '1h 45m',
      resolutionBy: 'AI Assistant',
      aiBrief: {
        resolutionMethod: 'AI-Assisted Resolution',
        aiCapability: 'Knowledge-Based Resolution',
        aiFoundation: 'Sovereign AI Assistant (ALLaM Foundation)',
        whatAiIdentified: 'Correlated event ID 6100 sync connector errors with expired service account TLS certificate and matched remediation against identity management knowledge base.',
        evidenceUsed: [
          'Azure AD Connect synchronization service event logs',
          'Windows Application Event log (Event ID 6100)',
          'AppViewX PKI certificate inventory records',
          'Internal Identity runbook KB-SEC-0198',
        ],
        aiContribution: 'Provided exact PowerShell delta-sync initialization syntax and certificate renewal workflow for identity engineers.',
        humanValidation: 'Validated by engineer',
        resolutionOutcome: 'Service engineer updated service account credentials and initiated delta sync, restoring user SSO authentication.',
      },
    },
    {
      title: 'Storage array controller failure — SAN-01',
      description: 'Dell PowerStore SAN-01 primary controller offline. I/O failover to secondary controller successful but performance degraded',
      service: 'Infrastructure Services',
      tower: 'Infrastructure',
      businessImpact: 'Storage I/O latency increased 3x affecting all hosted VMs',
      status: 'In Progress',
      owner: 'Ahmed Al-Qahtani',
      assignmentGroup: 'Infrastructure Operations',
      relatedCI: 'SAN-DELL-01',
      rcaStatus: 'Pending',
      createdDate: '2026-08-13 03:15',
      duration: '4h 00m',
      resolutionBy: 'Human',
    },
    {
      title: 'WAN link failure — Jeddah branch',
      description: 'Primary MPLS link to Jeddah branch office down. Traffic rerouted via backup internet VPN with reduced bandwidth',
      service: 'Enterprise Network Services',
      tower: 'Network',
      businessImpact: 'Jeddah office users experiencing slow connectivity — 80 users affected',
      status: 'Closed',
      owner: 'Mohammed Al-Dosari',
      assignmentGroup: 'Network Operations',
      relatedCI: 'WAN-JED-01',
      rcaStatus: 'Completed',
      createdDate: '2026-08-05 09:00',
      duration: '8h 30m',
      resolutionBy: 'Human',
    },
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
      resolutionBy: inc.resolutionBy,
      aiResolutionBrief: inc.aiBrief,
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
  const p2Definitions: Array<{
    title: string;
    tower: string;
    service: string;
    impact: string;
    resolutionBy: ResolutionAttribution;
    aiBrief?: AIResolutionBrief;
  }> = [
    {
      title: 'AppDynamics transaction latency — SAP PO middleware',
      tower: 'Applications',
      service: 'SAP Middleware',
      impact: 'SAP PO middleware response time exceeded 8s threshold',
      resolutionBy: 'AI Assistant',
      aiBrief: {
        resolutionMethod: 'AI-Assisted Resolution',
        aiCapability: 'Service Dependency Analysis',
        aiFoundation: 'Sovereign AI Assistant (ALLaM Foundation)',
        whatAiIdentified: 'Traced 8.4s transaction latency bottleneck to stalled synchronous RFC calls waiting on a locked downstream billing database table.',
        evidenceUsed: [
          'AppDynamics APM transaction waterfall traces',
          'SAP PO message processing thread queue metrics',
          'Downstream database lock contention alerts',
        ],
        aiContribution: 'Recommended dynamic queue thread scaling and asynchronous decoupling for batch payloads.',
        humanValidation: 'Validated by engineer',
        resolutionOutcome: 'Middleware team adjusted queue concurrency limit; response latency normalized to 1.1s.',
      },
    },
    {
      title: 'VMware ESXi host memory utilization critical',
      tower: 'Infrastructure',
      service: 'Infrastructure Services',
      impact: 'Host ESX-02 at 92% memory — VM performance degraded',
      resolutionBy: 'AI Assistant',
      aiBrief: {
        resolutionMethod: 'AI-Assisted Resolution',
        aiCapability: 'Anomaly Detection',
        aiFoundation: 'Sovereign AI Assistant (ALLaM Foundation)',
        whatAiIdentified: 'Identified ballooning memory utilization driven by 3 non-critical staging VMs on host ESX-02 exceeding threshold limits.',
        evidenceUsed: [
          'vCenter Server resource utilization metrics',
          'ESXi host balloon driver telemetry',
          'Cluster DRS workload placement history',
        ],
        aiContribution: 'Proposed automated DRS live migration recommendations to distribute load onto underutilized host ESX-05.',
        humanValidation: 'Human approval recorded',
        resolutionOutcome: 'VMotion rebalanced target VMs; host ESX-02 memory stabilized at 68%.',
      },
    },
    {
      title: 'DNS resolution failures — Internal DNS cluster',
      tower: 'Network',
      service: 'Enterprise Network Services',
      impact: 'Intermittent DNS resolution failures affecting application connectivity',
      resolutionBy: 'AI Assistant',
      aiBrief: {
        resolutionMethod: 'AI-Assisted Resolution',
        aiCapability: 'Pattern Recognition',
        aiFoundation: 'Sovereign AI Assistant (ALLaM Foundation)',
        whatAiIdentified: 'Detected recursive query loop pattern originating from a newly deployed Kubernetes service pointing to legacy DNS forwarders.',
        evidenceUsed: [
          'Infoblox DNS query log telemetry',
          'Recursive lookup latency metrics',
          'Network packet capture analysis (pcap snippet)',
        ],
        aiContribution: 'Isolated the misconfigured CoreDNS stub-domain config map and provided corrected upstream forwarding rule.',
        humanValidation: 'Validated by engineer',
        resolutionOutcome: 'Network team applied corrected forwarder rule; DNS query response time dropped to <2ms.',
      },
    },
    {
      title: 'Splunk indexer cluster rebalancing',
      tower: 'Security',
      service: 'Monitoring Services',
      impact: 'Search performance degraded during cluster rebalance',
      resolutionBy: 'AI Assistant',
      aiBrief: {
        resolutionMethod: 'AI-Assisted Resolution',
        aiCapability: 'Incident Correlation & Root Cause Analysis',
        aiFoundation: 'Sovereign AI Assistant (ALLaM Foundation)',
        whatAiIdentified: 'Correlated indexer cluster search timeouts with disk I/O queue backlog caused by concurrent warm-to-cold bucket rollouts.',
        evidenceUsed: [
          'Splunk Cluster Master peer status telemetry',
          'Bucket replication backlog metrics',
          'Linux disk IOPS queue depth logs',
        ],
        aiContribution: 'Formulated bucket rolling throttle configuration update to prioritize live search query threads over maintenance rolls.',
        humanValidation: 'Validated by engineer',
        resolutionOutcome: 'Throttling applied; live search response times recovered to standard 1.2s SLA.',
      },
    },
    {
      title: 'Exchange Online mailbox migration failures',
      tower: 'Digital Workplace',
      service: 'End User Computing',
      impact: '25 mailboxes failed to migrate — users without email access',
      resolutionBy: 'Human',
    },
    {
      title: 'Load balancer health check failures — Web farm',
      tower: 'Infrastructure',
      service: 'Application Services',
      impact: 'Web farm pool members flapping — intermittent 503 errors',
      resolutionBy: 'AI Assistant',
      aiBrief: {
        resolutionMethod: 'AI-Assisted Resolution',
        aiCapability: 'Service Dependency Analysis',
        aiFoundation: 'Sovereign AI Assistant (ALLaM Foundation)',
        whatAiIdentified: 'Correlated health check timeout spikes with HTTP keep-alive timeout discrepancies between F5 BIG-IP and IIS backend pool members.',
        evidenceUsed: [
          'F5 BIG-IP pool member probe latency logs',
          'IIS HTTP error logs (HTTP.SYS 503 errors)',
          'Configuration Item CI-APP-WEB-01 baseline',
        ],
        aiContribution: 'Identified 5-second probe mismatch and generated configuration snippet aligning TCP keep-alive timers.',
        humanValidation: 'Validated by engineer',
        resolutionOutcome: 'F5 probe timeout aligned; pool flapping resolved immediately with zero 503 errors.',
      },
    },
    {
      title: 'GCP Cloud SQL replication lag',
      tower: 'Cloud',
      service: 'Cloud Platform Services',
      impact: 'Read replica lag exceeding 30 seconds for reporting queries',
      resolutionBy: 'AI Assistant',
      aiBrief: {
        resolutionMethod: 'AI-Assisted Resolution',
        aiCapability: 'Anomaly Detection',
        aiFoundation: 'Sovereign AI Assistant (ALLaM Foundation)',
        whatAiIdentified: 'Detected replication thread stall caused by a single long-running unindexed analytical query running on the primary database instance.',
        evidenceUsed: [
          'GCP Cloud Monitoring SQL replication lag telemetry',
          'PostgreSQL slow query logs and pg_stat_activity',
          'Database lock contention metrics',
        ],
        aiContribution: 'Identified the offending PID and generated query optimization with missing composite index recommendation.',
        humanValidation: 'Validated by engineer',
        resolutionOutcome: 'DBA terminated blocked query and created the recommended composite index; replication lag returned to <500ms.',
      },
    },
    {
      title: 'Backup job failures — Commvault',
      tower: 'Infrastructure',
      service: 'Infrastructure Services',
      impact: '12 backup jobs failed overnight — RPO at risk',
      resolutionBy: 'Human',
    },
    {
      title: 'Active Directory replication delay',
      tower: 'Security',
      service: 'Identity & Access',
      impact: 'AD replication between sites delayed by 45 minutes',
      resolutionBy: 'AI Assistant',
      aiBrief: {
        resolutionMethod: 'AI-Assisted Resolution',
        aiCapability: 'Knowledge-Based Resolution',
        aiFoundation: 'Sovereign AI Assistant (ALLaM Foundation)',
        whatAiIdentified: 'Matched AD replication error 8452 with site-link bridge RPC firewall timeout and retrieved validated knowledge base procedure.',
        evidenceUsed: [
          'Active Directory Repadmin replication status output',
          'Domain Controller RPC endpoint mapper logs',
          'Knowledge Base article KB-SEC-00452',
        ],
        aiContribution: 'Generated step-by-step RPC port verification script and Kerberos ticket refresh command.',
        humanValidation: 'Validated by engineer',
        resolutionOutcome: 'Engineer verified RPC connectivity and forced inter-site sync; replication latency cleared in 8 minutes.',
      },
    },
    {
      title: 'SAP BW process chain failure',
      tower: 'SAP',
      service: 'SAP Middleware',
      impact: 'Business warehouse ETL process chain failed — reporting data stale',
      resolutionBy: 'AI Assistant',
      aiBrief: {
        resolutionMethod: 'AI-Assisted Resolution',
        aiCapability: 'Resolution Recommendation',
        aiFoundation: 'Sovereign AI Assistant (ALLaM Foundation)',
        whatAiIdentified: 'Identified PSA duplicate key collision during daily delta load from ECC table VBAP into BW DSO.',
        evidenceUsed: [
          'SAP BW Process Chain Monitor (RSPC) error logs',
          'PSA table partition integrity check',
          'Historical ETL failure pattern KB-SAP-0089',
        ],
        aiContribution: 'Recommended selective PSA data request deletion and automatic chain restart from failed step.',
        humanValidation: 'Validated by engineer',
        resolutionOutcome: 'SAP Basis executed PSA cleanup; process chain completed successfully in 22 minutes.',
      },
    },
    {
      title: 'Network switch firmware vulnerability',
      tower: 'Network',
      service: 'Enterprise Network Services',
      impact: 'CVE-2026-1234 identified on 8 access layer switches',
      resolutionBy: 'Human',
    },
    {
      title: 'VDI session broker overloaded',
      tower: 'Digital Workplace',
      service: 'End User Computing',
      impact: 'Virtual desktop connection broker at capacity — new sessions rejected',
      resolutionBy: 'AI Assistant',
      aiBrief: {
        resolutionMethod: 'AI-Assisted Resolution',
        aiCapability: 'Pattern Recognition',
        aiFoundation: 'Sovereign AI Assistant (ALLaM Foundation)',
        whatAiIdentified: 'Recognized 85 orphan disconnected sessions failing automatic logoff timeout after morning shift transition.',
        evidenceUsed: [
          'Citrix Studio active broker session logs',
          'VDA registration heartbeat telemetry',
          'Desktop pool utilization history',
        ],
        aiContribution: 'Generated automated session reaper script to safely reclaim disconnected desktop resources.',
        humanValidation: 'Human approval recorded',
        resolutionOutcome: 'Reaper script cleared orphan sessions; broker capacity immediately returned to 45% available.',
      },
    },
    {
      title: 'Oracle database tablespace near capacity',
      tower: 'Database',
      service: 'Database Services',
      impact: 'USERS tablespace at 94% — risk of application failure',
      resolutionBy: 'Human',
    },
    {
      title: 'API gateway rate limiting triggered',
      tower: 'Applications',
      service: 'Application Services',
      impact: 'External API consumers getting 429 errors',
      resolutionBy: 'AI Assistant',
      aiBrief: {
        resolutionMethod: 'AI-Assisted Resolution',
        aiCapability: 'Pattern Recognition',
        aiFoundation: 'Sovereign AI Assistant (ALLaM Foundation)',
        whatAiIdentified: 'Detected automated retry loop from partner system sending burst traffic without exponential backoff during sync window.',
        evidenceUsed: [
          'Kong API Gateway access/rate-limit logs',
          'OAuth consumer client ID telemetry',
          'HTTP 429 response rate trend graph',
        ],
        aiContribution: 'Formulated dynamic rate limit tier override for verified consumer IP while alerting partner technical team.',
        humanValidation: 'Human approval recorded',
        resolutionOutcome: 'Temporary quota increase applied for batch window; partner updated retry mechanism.',
      },
    },
    {
      title: 'Certificate expiry — Load balancer SSL',
      tower: 'Security',
      service: 'Security Operations',
      impact: 'SSL certificate expiring in 48 hours on production load balancer',
      resolutionBy: 'Human',
    },
  ];

  p2Definitions.forEach((p2, idx) => {
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
      resolutionBy: p2.resolutionBy,
      aiResolutionBrief: p2.aiBrief,
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
    { title: 'User unable to access shared drive', ai: false },
    { title: 'Printer not responding on floor', ai: false },
    { title: 'Software installation request', ai: false },
    { title: 'Email delivery delay', ai: true, cap: 'Incident Correlation & Root Cause Analysis' as AICapability, reason: 'Correlated mail queue backlog with third-party antispam gateway throttling.' },
    { title: 'VPN connection timeout', ai: true, cap: 'Pattern Recognition' as AICapability, reason: 'Identified MTU packet fragmentation on specific ISP residential subnets.' },
    { title: 'Application login failure', ai: true, cap: 'Anomaly Detection' as AICapability, reason: 'Detected token expiration discrepancy on SAML IdP authentication endpoint.' },
    { title: 'Slow network performance', ai: false },
    { title: 'Monitor display issue', ai: false },
    { title: 'Password reset failure', ai: false },
    { title: 'File permission error', ai: false },
    { title: 'Outlook crash on startup', ai: true, cap: 'Knowledge-Based Resolution' as AICapability, reason: 'Matched crash signature with known corrupted Outlook profile registry key.' },
    { title: 'Teams call quality issue', ai: true, cap: 'Service Dependency Analysis' as AICapability, reason: 'Traced call jitter to egress QoS queue de-prioritization on branch gateway.' },
    { title: 'WiFi connectivity drops', ai: false },
    { title: 'Laptop docking station failure', ai: false },
    { title: 'USB device not recognized', ai: false },
    { title: 'Browser certificate warning', ai: true, cap: 'Resolution Recommendation' as AICapability, reason: 'Identified missing intermediate CA certificate bundle on internal intranet portal.' },
    { title: 'Application update required', ai: false },
    { title: 'Database query timeout', ai: true, cap: 'Incident Correlation & Root Cause Analysis' as AICapability, reason: 'Correlated slow query latency with missing index following table migration.' },
    { title: 'Report generation failure', ai: true, cap: 'Anomaly Detection' as AICapability, reason: 'Detected temp tablespace exhaustion during monthly batch calculation run.' },
    { title: 'Batch job delay', ai: true, cap: 'Pattern Recognition' as AICapability, reason: 'Identified scheduled job dependency lock contention in control scheduler.' },
    { title: 'Server disk space warning', ai: true, cap: 'Resolution Recommendation' as AICapability, reason: 'Identified uncompressed log archive accumulation in /var/log/audit directory.' },
    { title: 'Memory utilization alert', ai: true, cap: 'Anomaly Detection' as AICapability, reason: 'Detected gradual Java heap memory leak in application microservice pod.' },
    { title: 'CPU spike on web server', ai: true, cap: 'Incident Correlation & Root Cause Analysis' as AICapability, reason: 'Correlated CPU spike with rogue web scraper crawling un-indexed search pages.' },
    { title: 'Log rotation failure', ai: false },
    { title: 'Scheduled task not running', ai: false },
    { title: 'User account locked out', ai: false },
    { title: 'MFA token sync issue', ai: true, cap: 'Knowledge-Based Resolution' as AICapability, reason: 'Matched time drift on TOTP authentication server and generated NTP resync steps.' },
    { title: 'Remote desktop disconnection', ai: false },
    { title: 'Citrix session freeze', ai: true, cap: 'Service Dependency Analysis' as AICapability, reason: 'Correlated session freezes with profile disk storage I/O latency spikes.' },
    { title: 'Mobile device enrollment', ai: false },
    { title: 'Intune policy not applying', ai: true, cap: 'Knowledge-Based Resolution' as AICapability, reason: 'Identified conflicting device compliance policy assignment in Azure Portal.' },
    { title: 'OneDrive sync conflict', ai: false },
    { title: 'SharePoint permission issue', ai: false },
    { title: 'Power BI report error', ai: true, cap: 'Resolution Recommendation' as AICapability, reason: 'Identified scheduled gateway refresh timeout due to database schema change.' },
    { title: 'SCCM client health', ai: false },
    { title: 'Antivirus definition update failure', ai: true, cap: 'Incident Correlation & Root Cause Analysis' as AICapability, reason: 'Correlated definition distribution failure with proxy firewall rule change.' },
    { title: 'Firewall rule request', ai: false },
    { title: 'SSL certificate renewal', ai: false },
    { title: 'DNS record update', ai: false },
    { title: 'DHCP scope exhaustion', ai: true, cap: 'Anomaly Detection' as AICapability, reason: 'Detected rapid lease exhaustion in Guest Wi-Fi subnet due to 8-day lease default.' },
    { title: 'Backup notification failure', ai: false },
    { title: 'Monitoring alert noise', ai: true, cap: 'Pattern Recognition' as AICapability, reason: 'Identified flapping threshold alert and generated dedup filter rule.' },
    { title: 'Service restart required', ai: false },
    { title: 'Configuration drift detected', ai: true, cap: 'Incident Correlation & Root Cause Analysis' as AICapability, reason: 'Correlated configuration drift on web tier with unauthorized out-of-band change.' },
    { title: 'Patch compliance gap', ai: false },
    { title: 'Vendor portal access issue', ai: false },
    { title: 'License activation failure', ai: false },
    { title: 'Cloud resource provisioning', ai: false },
    { title: 'Container pod restart loop', ai: true, cap: 'Incident Correlation & Root Cause Analysis' as AICapability, reason: 'Correlated OOMKilled container exits with memory limit ceiling under peak traffic.' },
    { title: 'API response degradation', ai: true, cap: 'Service Dependency Analysis' as AICapability, reason: 'Traced API degradation to upstream rate limiting from external payment gateway.' },
  ];

  p3Templates.forEach((item, idx) => {
    const twr = towers[idx % towers.length];
    const statusArr: Incident['status'][] = ['Open', 'In Progress', 'Resolved', 'Closed', 'Closed'];
    const isAi = item.ai;
    result.push({
      id: `INC004${8600 + idx}`,
      priority: 'P3',
      title: `${item.title} — ${twr}`,
      description: `${item.title}. Ticket raised by end user / monitoring system. Assigned to ${assignmentGroups[idx % assignmentGroups.length]} for resolution.`,
      service: services[idx % services.length],
      tower: twr,
      businessImpact: 'Limited user impact — workaround available',
      status: statusArr[idx % statusArr.length],
      owner: owners[idx % owners.length],
      reportedBy: reporters[idx % reporters.length],
      assignmentGroup: assignmentGroups[idx % assignmentGroups.length],
      assignedEngineer: owners[(idx + 2) % owners.length],
      resolutionBy: isAi ? 'AI Assistant' : 'Human',
      aiResolutionBrief: isAi
        ? {
            resolutionMethod: 'AI-Assisted Resolution',
            aiCapability: item.cap!,
            aiFoundation: 'Sovereign AI Assistant (ALLaM Foundation)',
            whatAiIdentified: item.reason!,
            evidenceUsed: [
              `Telemetry log streams from CI-${twr.substring(0, 3).toUpperCase()}-${200 + idx}`,
              'ServiceNow historical incident database',
              `Operational knowledge base KB-${twr.substring(0, 3).toUpperCase()}-002`,
            ],
            aiContribution: 'Analyzed alert metrics and formulated targeted resolution steps for assigned engineer.',
            humanValidation: 'Validated by engineer',
            resolutionOutcome: 'Remediation completed in alignment with Sovereign AI Assistant recommendations.',
          }
        : undefined,
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
    const isAi = idx === 14 || idx === 29; // Monitoring threshold adjustment & Tag policy update
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
      resolutionBy: isAi ? 'AI Assistant' : 'Human',
      aiResolutionBrief: isAi
        ? {
            resolutionMethod: 'AI-Assisted Resolution',
            aiCapability: 'Resolution Recommendation',
            aiFoundation: 'Sovereign AI Assistant (ALLaM Foundation)',
            whatAiIdentified: 'Evaluated historical telemetry baseline to calculate optimized metric threshold limits, preventing false-positive alert storms.',
            evidenceUsed: [
              '30-day operational metric baseline data',
              'Alert trigger frequency audit log',
            ],
            aiContribution: 'Generated recommended threshold values for operations team confirmation.',
            humanValidation: 'Validated by engineer',
            resolutionOutcome: 'Adjusted thresholds implemented with 74% reduction in non-actionable alert volume.',
          }
        : undefined,
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
  const aiResolved = incidents.filter(i => i.resolutionBy === 'AI Assistant').length;
  const humanResolved = incidents.filter(i => i.resolutionBy === 'Human').length;
  return { p1, p2, p1p2Open: p1 + p2, open, resolved, aiResolved, humanResolved, total: incidents.length };
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
