/**
 * Business Services & Application Data
 * Sourced from NCGR documented estate
 */

export interface BusinessService {
  id: string;
  name: string;
  category: string;
  criticality: 'Critical' | 'High' | 'Medium' | 'Low';
  health: 'healthy' | 'at-risk' | 'degraded' | 'critical';
  owner: string;
  applications: string[];
  database: string;
  infrastructure: string;
  network: string;
  monitoring: string[];
  itsm: string;
  vendor: string;
  openIncidents: number;
  openChanges: number;
  openRisks: number;
}

export const businessServices: BusinessService[] = [
  {
    id: 'SVC-001',
    name: 'Government Financial Reporting',
    category: 'Finance & Governance',
    criticality: 'Critical',
    health: 'degraded',
    owner: 'Financial Systems Division',
    applications: ['Oracle Hyperion HFM', 'Oracle Hyperion EPM'],
    database: 'Oracle Database Cluster (RAC)',
    infrastructure: 'VMware vSphere / RedHat Enterprise Linux',
    network: 'Core Enterprise Network (SolarWinds NPM)',
    monitoring: ['AppDynamics APM', 'Splunk Enterprise'],
    itsm: 'ServiceNow ITSM',
    vendor: 'Oracle / Wipro',
    openIncidents: 2,
    openChanges: 1,
    openRisks: 2,
  },
  {
    id: 'SVC-002',
    name: 'Government Procurement & eAuction',
    category: 'Procurement & Supply Chain',
    criticality: 'Critical',
    health: 'healthy',
    owner: 'Supply Chain Operations',
    applications: ['SAP eMarket', 'SAP eAuction', 'SAP SRM', 'SAP PO'],
    database: 'SAP HANA Cluster',
    infrastructure: 'OpenShift Container Platform / GCP',
    network: 'SD-WAN & Cloud Connect',
    monitoring: ['AppDynamics', 'Splunk ITSI'],
    itsm: 'ServiceNow ITSM',
    vendor: 'SAP / HCLTech',
    openIncidents: 1,
    openChanges: 2,
    openRisks: 0,
  },
  {
    id: 'SVC-003',
    name: 'National Content & Resource Portal',
    category: 'Digital Services',
    criticality: 'Critical',
    health: 'healthy',
    owner: 'Digital Services Division',
    applications: ['IBM ECM / FileNet', 'Microsoft SharePoint'],
    database: 'MS SQL Server Cluster',
    infrastructure: 'Microsoft Azure Landing Zone',
    network: 'Azure Front Door / SD-WAN',
    monitoring: ['AppDynamics RUM', 'Splunk Enterprise'],
    itsm: 'ServiceNow ITSM',
    vendor: 'IBM / Microsoft',
    openIncidents: 0,
    openChanges: 1,
    openRisks: 1,
  },
  {
    id: 'SVC-004',
    name: 'Enterprise Identity & Access Governance',
    category: 'Security & Identity',
    criticality: 'Critical',
    health: 'healthy',
    owner: 'Cybersecurity Operations',
    applications: ['Microsoft Entra ID', 'BeyondTrust PAM', 'SafeNet MobilePASS'],
    database: 'Active Directory Domain Services',
    infrastructure: 'Windows Server 2022 / PKI Infra (13 servers)',
    network: 'Core Network & Firewall Matrix',
    monitoring: ['Splunk ES', 'SolarWinds UDT'],
    itsm: 'ServiceNow ITSM / Security Ops',
    vendor: 'Microsoft / BeyondTrust / Thales',
    openIncidents: 1,
    openChanges: 0,
    openRisks: 1,
  },
  {
    id: 'SVC-005',
    name: 'Digital Workplace & Collaboration',
    category: 'Workforce Productivity',
    criticality: 'High',
    health: 'healthy',
    owner: 'Digital Workplace Team',
    applications: ['Microsoft 365 / Teams', 'Exchange 2019 / SE', 'Enterprise Vault'],
    database: 'Exchange ESE Database Cluster',
    infrastructure: 'Hybrid Exchange / M365 Cloud',
    network: 'ExpressRoute / Internet Gateway',
    monitoring: ['AppDynamics Synthetic', 'Splunk'],
    itsm: 'ServiceNow ITSM',
    vendor: 'Microsoft',
    openIncidents: 0,
    openChanges: 3,
    openRisks: 0,
  },
];

export interface ApplicationItem {
  id: string;
  name: string;
  serviceId: string;
  serviceName: string;
  vendor: string;
  criticality: 'Critical' | 'High' | 'Medium';
  health: 'healthy' | 'at-risk' | 'degraded' | 'critical';
  responseTime: string;
  errorRate: string;
  apdexScore: number;
  instances: number;
  techStack: string;
  activeIncidents: number;
}

export const applicationsList: ApplicationItem[] = [
  { id: 'APP-101', name: 'Oracle Hyperion HFM', serviceId: 'SVC-001', serviceName: 'Government Financial Reporting', vendor: 'Oracle', criticality: 'Critical', health: 'degraded', responseTime: '1,420 ms', errorRate: '1.8%', apdexScore: 0.78, instances: 6, techStack: 'Oracle EPM / WebLogic / Java', activeIncidents: 1 },
  { id: 'APP-102', name: 'SAP eMarket & eAuction', serviceId: 'SVC-002', serviceName: 'Government Procurement & eAuction', vendor: 'SAP', criticality: 'Critical', health: 'healthy', responseTime: '240 ms', errorRate: '0.02%', apdexScore: 0.98, instances: 16, techStack: 'SAP NetWeaver / HANA / ABAP', activeIncidents: 0 },
  { id: 'APP-103', name: 'SAP PO (Process Orchestration)', serviceId: 'SVC-002', serviceName: 'Government Procurement & eAuction', vendor: 'SAP', criticality: 'Critical', health: 'at-risk', responseTime: '680 ms', errorRate: '0.45%', apdexScore: 0.88, instances: 8, techStack: 'SAP Java AS / Enterprise Service Bus', activeIncidents: 1 },
  { id: 'APP-104', name: 'IBM FileNet Content Manager', serviceId: 'SVC-003', serviceName: 'National Content & Resource Portal', vendor: 'IBM', criticality: 'High', health: 'healthy', responseTime: '310 ms', errorRate: '0.05%', apdexScore: 0.96, instances: 10, techStack: 'IBM ECM / WebSphere / DB2', activeIncidents: 0 },
  { id: 'APP-105', name: 'BeyondTrust PAM Engine', serviceId: 'SVC-004', serviceName: 'Enterprise Identity & Access Governance', vendor: 'BeyondTrust', criticality: 'Critical', health: 'healthy', responseTime: '120 ms', errorRate: '0.00%', apdexScore: 0.99, instances: 4, techStack: 'BeyondTrust Appliance / Hardened OS', activeIncidents: 0 },
  { id: 'APP-106', name: 'Imperva DAM Sensor Array', serviceId: 'SVC-004', serviceName: 'Enterprise Identity & Access Governance', vendor: 'Imperva', criticality: 'Critical', health: 'healthy', responseTime: '15 ms', errorRate: '0.00%', apdexScore: 1.0, instances: 99, techStack: 'Imperva SecureSphere / Network Tap', activeIncidents: 0 },
  { id: 'APP-107', name: 'Microsoft Teams & Exchange Hybrid', serviceId: 'SVC-005', serviceName: 'Digital Workplace & Collaboration', vendor: 'Microsoft', criticality: 'High', health: 'healthy', responseTime: '85 ms', errorRate: '0.01%', apdexScore: 0.97, instances: 16, techStack: 'Exchange 2019 / M365 Cloud', activeIncidents: 0 },
];
