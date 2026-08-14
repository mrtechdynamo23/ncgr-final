/**
 * Digital Transformation & AI Initiatives Data — 20+ initiatives, benefits tracking, pipeline
 */

export interface InitiativeItem {
  id: string;
  name: string;
  category: 'AI' | 'Automation' | 'Self-Healing' | 'Analytics' | 'Innovation';
  owner: string;
  tower: string;
  status: 'In Production' | 'Testing' | 'Development' | 'Planned';
  progressPercentage: number;
  monthlyHoursSaved: number;
  annualSavingsSAR: number;
  timeline: string;
  benefit: string;
  risk: 'Low' | 'Medium' | 'High';
  targetDate: string;
  technology: string;
}

export const initiativesList: InitiativeItem[] = [
  { id: 'TRN-001', name: 'AI Incident Classification & Auto-Routing', category: 'AI', owner: 'Arjun Menon', tower: 'Service Desk', status: 'In Production', progressPercentage: 100, monthlyHoursSaved: 240, annualSavingsSAR: 180000, timeline: 'Q1-Q2 2026', benefit: 'Reduced P1/P2 routing delay from 18 mins to 45 seconds', risk: 'Low', targetDate: '2026-06-30', technology: 'ServiceNow Intelligence' },
  { id: 'TRN-002', name: 'Automated Password Reset Bot via MobilePASS', category: 'Automation', owner: 'Daniel Mathew', tower: 'Security', status: 'In Production', progressPercentage: 100, monthlyHoursSaved: 380, annualSavingsSAR: 285000, timeline: 'Q2 2026', benefit: 'Eliminated 65% of level-1 password reset support tickets', risk: 'Low', targetDate: '2026-05-15', technology: 'Azure AD / Teams Bot' },
  { id: 'TRN-003', name: 'Ansible Auto-Remediation for Disk Space', category: 'Self-Healing', owner: 'Ahmed Al-Qahtani', tower: 'Infrastructure', status: 'Testing', progressPercentage: 85, monthlyHoursSaved: 160, annualSavingsSAR: 120000, timeline: 'Q3 2026', benefit: 'Auto-expands EBS/vSphere volumes before critical alerts fire', risk: 'Medium', targetDate: '2026-08-30', technology: 'Red Hat Ansible' },
  { id: 'TRN-004', name: 'NCGR Assistant (Operational AI Assistant)', category: 'AI', owner: 'Arjun Menon', tower: 'Service Desk', status: 'Testing', progressPercentage: 90, monthlyHoursSaved: 120, annualSavingsSAR: 90000, timeline: 'Q3 2026', benefit: 'Instant natural language operational queries for leadership', risk: 'Low', targetDate: '2026-08-25', technology: 'LLM / RAG' },
  { id: 'TRN-005', name: 'AIOps Event Correlation Engine (Splunk ITSI + AppDynamics)', category: 'AI', owner: 'Khalid Al-Shammari', tower: 'Network', status: 'Development', progressPercentage: 60, monthlyHoursSaved: 300, annualSavingsSAR: 225000, timeline: 'Q4 2026', benefit: 'Correlates raw alerts into single business service impact events', risk: 'Medium', targetDate: '2026-11-30', technology: 'Splunk ITSI' },
  { id: 'TRN-006', name: 'Automated VM Provisioning Workflow', category: 'Automation', owner: 'Ahmed Al-Qahtani', tower: 'Infrastructure', status: 'In Production', progressPercentage: 100, monthlyHoursSaved: 190, annualSavingsSAR: 145000, timeline: 'Q1 2026', benefit: 'Reduced VM build time from 3 days to 25 minutes', risk: 'Low', targetDate: '2026-03-31', technology: 'Terraform + VMware' },
  { id: 'TRN-007', name: 'Automated Patch Compliance Enforcement', category: 'Self-Healing', owner: 'Layla Hassan', tower: 'Digital Workplace', status: 'In Production', progressPercentage: 100, monthlyHoursSaved: 220, annualSavingsSAR: 165000, timeline: 'Q2 2026', benefit: 'Maintains 98%+ patch compliance across 500+ endpoints automatically', risk: 'Low', targetDate: '2026-06-15', technology: 'Microsoft Intune' },
  { id: 'TRN-008', name: 'Predictive DB Capacity Forecasting', category: 'Analytics', owner: 'Omar Al-Mutairi', tower: 'Database', status: 'Testing', progressPercentage: 80, monthlyHoursSaved: 95, annualSavingsSAR: 72000, timeline: 'Q3 2026', benefit: 'Predicts tablespace exhaustion 30 days in advance', risk: 'Low', targetDate: '2026-09-15', technology: 'Python ML / Oracle OEM' },
  { id: 'TRN-009', name: 'Automated SSL/TLS Certificate Lifecycle (ACME)', category: 'Automation', owner: 'Daniel Mathew', tower: 'Security', status: 'Development', progressPercentage: 55, monthlyHoursSaved: 140, annualSavingsSAR: 105000, timeline: 'Q4 2026', benefit: 'Zero certificate expiry outages with automated auto-renewal', risk: 'Medium', targetDate: '2026-10-31', technology: 'AppViewX / Cert-Manager' },
  { id: 'TRN-010', name: 'Smart Network Configuration Drift Remediation', category: 'Self-Healing', owner: 'Mohammed Al-Dosari', tower: 'Network', status: 'Development', progressPercentage: 45, monthlyHoursSaved: 110, annualSavingsSAR: 82500, timeline: 'Q4 2026', benefit: 'Detects and auto-reverts unauthorized network configuration changes', risk: 'High', targetDate: '2026-12-15', technology: 'Cisco DNA Center' },
  { id: 'TRN-011', name: 'Automated SAP Batch Job Monitoring & Restart', category: 'Self-Healing', owner: 'Sara Al-Otaibi', tower: 'SAP', status: 'Development', progressPercentage: 40, monthlyHoursSaved: 130, annualSavingsSAR: 97500, timeline: 'Q4 2026', benefit: 'Auto-restarts transient failed SAP background jobs with escalation', risk: 'Medium', targetDate: '2026-11-15', technology: 'SAP Solution Manager' },
  { id: 'TRN-012', name: 'FinOps Cloud Anomaly Detection & Idle Reclaiming', category: 'Analytics', owner: 'Priya Nair', tower: 'Cloud', status: 'In Production', progressPercentage: 100, monthlyHoursSaved: 150, annualSavingsSAR: 320000, timeline: 'Q2 2026', benefit: 'Saved 320,000 SAR/year by automatically stopping idle non-prod VMs', risk: 'Low', targetDate: '2026-04-30', technology: 'GCP / Azure Cost APIs' },
  { id: 'TRN-013', name: 'GenAI Root Cause Analysis Summary Generator', category: 'AI', owner: 'Arjun Menon', tower: 'Applications', status: 'Testing', progressPercentage: 75, monthlyHoursSaved: 180, annualSavingsSAR: 135000, timeline: 'Q3 2026', benefit: 'Generates first-draft RCA reports from log telemetry and incident logs', risk: 'Low', targetDate: '2026-09-30', technology: 'Google Vertex AI' },
  { id: 'TRN-014', name: 'Self-Service Employee Software Request Portal', category: 'Automation', owner: 'Aisha Rahman', tower: 'Service Desk', status: 'In Production', progressPercentage: 100, monthlyHoursSaved: 210, annualSavingsSAR: 157500, timeline: 'Q1 2026', benefit: 'Zero-touch software delivery for pre-approved catalogue items', risk: 'Low', targetDate: '2026-02-28', technology: 'ServiceNow + Intune' },
  { id: 'TRN-015', name: 'BGP Route Optimization & Multi-WAN Auto-Failover', category: 'Automation', owner: 'Mohammed Al-Dosari', tower: 'Network', status: 'Testing', progressPercentage: 70, monthlyHoursSaved: 85, annualSavingsSAR: 64000, timeline: 'Q3 2026', benefit: 'Sub-second traffic rerouting during ISP degradation', risk: 'Medium', targetDate: '2026-09-15', technology: 'SD-WAN Controller' },
  { id: 'TRN-016', name: 'Automated Disaster Recovery Drill Execution', category: 'Innovation', owner: 'Rakesh Kumar', tower: 'Infrastructure', status: 'Planned', progressPercentage: 20, monthlyHoursSaved: 90, annualSavingsSAR: 68000, timeline: 'Q1 2027', benefit: 'Single-click orchestrated DR failover testing with audit evidence', risk: 'High', targetDate: '2027-02-28', technology: 'VMware SRM' },
  { id: 'TRN-017', name: 'Continuous Security Compliance Auditor (NCA ECC)', category: 'Analytics', owner: 'Daniel Mathew', tower: 'Security', status: 'Planned', progressPercentage: 30, monthlyHoursSaved: 175, annualSavingsSAR: 130000, timeline: 'Q1 2027', benefit: 'Continuous real-time posture reporting against NCA controls', risk: 'Low', targetDate: '2027-01-31', technology: 'Qualys + PowerBI' },
  { id: 'TRN-018', name: 'Automated Knowledge Article Ingestion from Incidents', category: 'AI', owner: 'Aisha Rahman', tower: 'Service Desk', status: 'Planned', progressPercentage: 25, monthlyHoursSaved: 115, annualSavingsSAR: 86000, timeline: 'Q1 2027', benefit: 'Auto-synthesizes resolved incidents into approved draft KB items', risk: 'Low', targetDate: '2027-03-31', technology: 'ServiceNow AI' },
];

export interface BenefitsMetric {
  metric: string;
  currentValue: string;
  targetValue: string;
  achievementPct: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
}

export const benefitsMetrics: BenefitsMetric[] = [
  { metric: 'Monthly Engineer Hours Saved', currentValue: '2,900 hrs', targetValue: '3,500 hrs', achievementPct: 83, trend: 'up', unit: 'hours/mo' },
  { metric: 'Annual Operations Cost Avoidance', currentValue: '2,330,500 SAR', targetValue: '2,800,000 SAR', achievementPct: 83, trend: 'up', unit: 'SAR/yr' },
  { metric: 'Mean Time to Resolution (MTTR) Reduction', currentValue: '42%', targetValue: '50%', achievementPct: 84, trend: 'up', unit: '%' },
  { metric: 'First Contact Auto-Resolution Rate', currentValue: '34.8%', targetValue: '40.0%', achievementPct: 87, trend: 'up', unit: '%' },
  { metric: 'Change Failure Rate Reduction', currentValue: '68%', targetValue: '75%', achievementPct: 90, trend: 'up', unit: '%' },
  { metric: 'Zero-Touch Provisioning %', currentValue: '62%', targetValue: '80%', achievementPct: 77, trend: 'up', unit: '%' },
];

export const maturityByTower = [
  { tower: 'Service Desk', automationLevel: 82, aiAdoption: 75, targetLevel: 90 },
  { tower: 'Infrastructure', automationLevel: 78, aiAdoption: 60, targetLevel: 85 },
  { tower: 'Network', automationLevel: 65, aiAdoption: 45, targetLevel: 80 },
  { tower: 'Applications', automationLevel: 70, aiAdoption: 68, targetLevel: 85 },
  { tower: 'Database', automationLevel: 68, aiAdoption: 50, targetLevel: 80 },
  { tower: 'Security', automationLevel: 85, aiAdoption: 70, targetLevel: 90 },
  { tower: 'Cloud', automationLevel: 88, aiAdoption: 65, targetLevel: 95 },
  { tower: 'Digital Workplace', automationLevel: 75, aiAdoption: 55, targetLevel: 85 },
];
