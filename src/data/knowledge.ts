/**
 * Knowledge Base & Repository Data
 */

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: 'SOP' | 'Runbook' | 'How-To' | 'Architecture' | 'Policy' | 'Training' | 'RCA' | 'KEDB' | 'Checklist';
  owner: string;
  version: string;
  lastUpdated: string;
  reviewDate: string;
  usageCount: number;
  tags: string[];
  summary: string;
}

export const knowledgeDocs: KnowledgeDocument[] = [
  { id: 'KB-101', title: 'IT Service Management Framework & SLA Operating Manual', category: 'Policy', owner: 'Service Assurance Lead', version: 'v3.2', lastUpdated: '2026-07-15', reviewDate: '2027-01-15', usageCount: 1420, tags: ['ITSM', 'SLA', 'Governance'], summary: 'End-to-end operational framework for NCGR managed services' },
  { id: 'KB-102', title: 'Data Centre Shift Handover Standard Operating Procedure (SOP)', category: 'SOP', owner: 'NOC Lead Engineer', version: 'v2.1', lastUpdated: '2026-06-20', reviewDate: '2026-12-20', usageCount: 890, tags: ['NOC', 'Handover', 'SOP'], summary: 'Protocol for conducting shift handovers between Night, Morning, and Evening shifts' },
  { id: 'KB-103', title: 'Oracle RAC Database Failover & Emergency Recovery Runbook', category: 'Runbook', owner: 'Lead DBA', version: 'v4.0', lastUpdated: '2026-08-01', reviewDate: '2026-11-01', usageCount: 650, tags: ['Oracle', 'Database', 'DR'], summary: 'Step-by-step procedure for Oracle RAC cluster failover and recovery' },
  { id: 'KB-104', title: 'NCGR Hybrid Enterprise Architecture Blueprint (GCP & Azure)', category: 'Architecture', owner: 'Chief Cloud Architect', version: 'v1.5', lastUpdated: '2026-05-10', reviewDate: '2027-05-10', usageCount: 1100, tags: ['Cloud', 'Architecture', 'GCP', 'Azure'], summary: 'Full technical topology for public cloud and containerized infrastructure' },
  { id: 'KB-105', title: 'OpenShift Container Platform Cluster Troubleshooting Guide', category: 'Runbook', owner: 'Platform Engineer Lead', version: 'v2.0', lastUpdated: '2026-07-28', reviewDate: '2027-01-28', usageCount: 420, tags: ['OpenShift', 'Kubernetes', 'Containers'], summary: 'Diagnostic procedures for node memory exhaustion and pod routing failures' },
  { id: 'KB-106', title: 'AppDynamics APM Transaction Threshold Tuning & Alerts Guide', category: 'How-To', owner: 'App Performance Team', version: 'v1.2', lastUpdated: '2026-04-18', reviewDate: '2026-10-18', usageCount: 310, tags: ['AppDynamics', 'APM', 'Monitoring'], summary: 'Guide to configuring APM transaction health rules for critical applications' },
];
