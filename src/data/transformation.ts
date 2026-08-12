/**
 * Digital Transformation & AI Initiatives Data
 */

export interface InitiativeItem {
  id: string;
  name: string;
  category: 'AI' | 'Automation' | 'Self-Healing' | 'Analytics';
  owner: string;
  tower: string;
  status: 'In Production' | 'Testing' | 'Development' | 'Planned';
  progressPercentage: number;
  monthlyHoursSaved: number;
  timeline: string;
  benefit: string;
  risk: 'Low' | 'Medium' | 'High';
}

export const initiativesList: InitiativeItem[] = [
  { id: 'TRN-001', name: 'AI Incident Classification & Auto-Routing', category: 'AI', owner: 'Fatima Al-Hassan', tower: 'Service Desk / ITSM', status: 'In Production', progressPercentage: 100, monthlyHoursSaved: 240, timeline: 'Q1-Q2 2026', benefit: 'Reduced P1/P2 routing delay from 18 mins to 45 seconds', risk: 'Low' },
  { id: 'TRN-002', name: 'Automated Password Reset Bot via MobilePASS', category: 'Automation', owner: 'Sara Al-Mutairi', tower: 'Identity & Access', status: 'In Production', progressPercentage: 100, monthlyHoursSaved: 380, timeline: 'Q2 2026', benefit: 'Eliminated 65% of level-1 password reset support tickets', risk: 'Low' },
  { id: 'TRN-003', name: 'Ansible Auto-Remediation for Disk Space', category: 'Self-Healing', owner: 'Omar Al-Dosari', tower: 'Infrastructure Ops', status: 'Testing', progressPercentage: 85, monthlyHoursSaved: 160, timeline: 'Q3 2026', benefit: 'Auto-expands EBS/vSphere volumes before critical alerts fire', risk: 'Medium' },
  { id: 'TRN-004', name: 'NCGR Assistant (Operational Chatbot)', category: 'AI', owner: 'AI Task Force Lead', tower: 'Program Management', status: 'Testing', progressPercentage: 90, monthlyHoursSaved: 120, timeline: 'Q3 2026', benefit: 'Instant natural language operational queries for managers', risk: 'Low' },
  { id: 'TRN-005', name: 'AIOps Event Correlation Engine (Splunk ITSI + AppDynamics)', category: 'AI', owner: 'Mohammed Al-Rashid', tower: 'Monitoring', status: 'Development', progressPercentage: 60, monthlyHoursSaved: 300, timeline: 'Q4 2026', benefit: 'Correlates raw alerts into single business service impact events', risk: 'Medium' },
];
