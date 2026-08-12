/**
 * Governance, Risk, SIAM & Mobilization Data
 */

export interface RiskItem {
  id: string;
  description: string;
  tower: string;
  owner: string;
  impact: 'Critical' | 'High' | 'Medium' | 'Low';
  likelihood: 'High' | 'Medium' | 'Low';
  score: number; // 1-25
  mitigation: string;
  targetDate: string;
  status: 'Open' | 'Mitigating' | 'Accepted' | 'Closed';
}

export const risksList: RiskItem[] = [
  { id: 'RSK-001', description: 'OpenShift cluster node capacity exceeding 85% utilization', tower: 'Container Platform', owner: 'Nasser Al-Qahtani', impact: 'Critical', likelihood: 'High', score: 20, mitigation: 'Add 3 extra K8s nodes and rebalance pod autoscalers', targetDate: '2026-08-20', status: 'Mitigating' },
  { id: 'RSK-002', description: 'Oracle RAC node failover latency affecting Hyperion HFM financial reporting', tower: 'Database / Finance', owner: 'Khalid Ibrahim', impact: 'Critical', likelihood: 'Medium', score: 15, mitigation: 'Upgrade Oracle RAC interconnect bandwidth to 40Gbps', targetDate: '2026-08-25', status: 'Open' },
  { id: 'RSK-003', description: 'AppViewX SSL certificate renewal queue bottleneck (14 certificates)', tower: 'Security Operations', owner: 'Sara Al-Mutairi', impact: 'High', likelihood: 'High', score: 16, mitigation: 'Automate ACME protocol integration for internal PKI', targetDate: '2026-08-18', status: 'Mitigating' },
  { id: 'RSK-004', description: 'NOC night shift resource gap due to unplanned leave', tower: 'NOC / Operations', owner: 'Operations Manager', impact: 'Medium', likelihood: 'High', score: 12, mitigation: 'Activate on-call engineer roster rotation', targetDate: '2026-08-14', status: 'Open' },
  { id: 'RSK-005', description: 'Splunk Enterprise ingest volume growth approaching license ceiling', tower: 'Monitoring', owner: 'Mohammed Al-Rashid', impact: 'High', likelihood: 'Medium', score: 12, mitigation: 'Filter verbose debug log streams at syslog forwarders', targetDate: '2026-08-30', status: 'Mitigating' },
];

export interface ApprovalItem {
  id: string;
  category: 'Leave' | 'Access' | 'Procurement' | 'Change' | 'Resource' | 'Vendor' | 'Project';
  title: string;
  requester: string;
  approver: string;
  age: string;
  priority: 'Urgent' | 'High' | 'Normal';
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const approvalsList: ApprovalItem[] = [
  { id: 'APR-1001', category: 'Change', title: 'Emergency patch deployment for Oracle RAC Cluster (CHG0012845)', requester: 'Khalid Ibrahim', approver: 'CAB Board Lead', age: '2h', priority: 'Urgent', status: 'Pending' },
  { id: 'APR-1002', category: 'Access', title: 'Privileged BeyondTrust access request for SAP PO maintenance', requester: 'Fatima Al-Hassan', approver: 'Security Officer', age: '4h', priority: 'High', status: 'Pending' },
  { id: 'APR-1003', category: 'Leave', title: 'Annual Leave request - 5 days (Aug 20 - Aug 25)', requester: 'Omar Al-Dosari', approver: 'Tower Lead', age: '1d', priority: 'Normal', status: 'Pending' },
  { id: 'APR-1004', category: 'Procurement', title: 'Splunk Enterprise license capacity expansion (200GB add-on)', requester: 'Mohammed Al-Rashid', approver: 'Commercial Director', age: '2d', priority: 'Urgent', status: 'Pending' },
  { id: 'APR-1005', category: 'Resource', title: 'Senior Cloud Architect onboarding authorization', requester: 'Noura Al-Harbi', approver: 'Program Lead', age: '3d', priority: 'Normal', status: 'Pending' },
];

export interface VendorItem {
  id: string;
  name: string;
  serviceProvided: string;
  contractRef: string;
  slaPerformance: string;
  renewalDate: string;
  status: 'Healthy' | 'Attention' | 'At Risk';
  openIssues: number;
  annualValue: string;
}

export const vendorsList: VendorItem[] = [
  { id: 'VND-001', name: 'ServiceNow Inc.', serviceProvided: 'ITSM / ITOM / CMDB SaaS Platform', contractRef: 'NCGR-CNT-2024-001', slaPerformance: '99.95%', renewalDate: '2027-03-31', status: 'Healthy', openIssues: 1, annualValue: 'SAR 4.2M' },
  { id: 'VND-002', name: 'Oracle Corporation', serviceProvided: 'Database Licenses & EPM Support', contractRef: 'NCGR-CNT-2023-089', slaPerformance: '98.50%', renewalDate: '2026-11-15', status: 'Attention', openIssues: 3, annualValue: 'SAR 6.8M' },
  { id: 'VND-003', name: 'Splunk / Cisco', serviceProvided: 'Splunk Enterprise & ITSI Licenses', contractRef: 'NCGR-CNT-2024-045', slaPerformance: '99.80%', renewalDate: '2026-09-30', status: 'Healthy', openIssues: 0, annualValue: 'SAR 3.5M' },
  { id: 'VND-004', name: 'Red Hat / IBM', serviceProvided: 'OpenShift Enterprise Container Platform', contractRef: 'NCGR-CNT-2024-102', slaPerformance: '97.20%', renewalDate: '2026-12-31', status: 'At Risk', openIssues: 2, annualValue: 'SAR 2.9M' },
  { id: 'VND-005', name: 'SolarWinds Inc.', serviceProvided: 'Network Performance & Configuration Management', contractRef: 'NCGR-CNT-2023-112', slaPerformance: '99.10%', renewalDate: '2027-01-15', status: 'Healthy', openIssues: 1, annualValue: 'SAR 1.1M' },
];

export interface TeamNode {
  id: string;
  name: string;
  role: string;
  level: 'Leadership' | 'Delivery' | 'Tower Lead' | 'Operational Team';
  headcount: number;
  location: string;
  lead: string;
  coverage: string;
}

export const teamStructureList: TeamNode[] = [
  { id: 'TM-01', name: 'Program Leadership', role: 'Executive Steering & Program Oversight', level: 'Leadership', headcount: 8, location: 'Riyadh HQ', lead: 'Program Director', coverage: '100%' },
  { id: 'TM-02', name: 'Service Delivery Management', role: 'SIAM & Service Assurance Governance', level: 'Delivery', headcount: 24, location: 'Riyadh HQ', lead: 'Service Delivery Manager', coverage: '98%' },
  { id: 'TM-03', name: 'NOC & Network Tower', role: '24/7 Network Operations & Security Guard', level: 'Tower Lead', headcount: 45, location: 'Riyadh / Command Center', lead: 'NOC Lead Engineer', coverage: '96%' },
  { id: 'TM-04', name: 'Cloud & Infrastructure Tower', role: 'GCP/Azure & On-Premises Data Center Ops', level: 'Tower Lead', headcount: 62, location: 'Riyadh / Remote', lead: 'Cloud Ops Lead', coverage: '97%' },
  { id: 'TM-05', name: 'Enterprise Applications Tower', role: 'SAP, Oracle, IBM ECM Support & Dev', level: 'Tower Lead', headcount: 88, location: 'Riyadh / Dammam', lead: 'App Operations Lead', coverage: '94%' },
];
