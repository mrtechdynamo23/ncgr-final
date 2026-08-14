/**
 * License & Entitlement Health — 40+ licenses
 */

export interface LicenseRecord {
  id: string;
  licenseName: string;
  businessService: string;
  businessDomain: string;
  oemProvider: string;
  vendorName: string;
  licenseCount: number;
  currentUtilization: number;
  utilizationPct: number;
  expiryDate: string;
  cost: number;
  currency: string;
  status: 'Healthy' | 'Underutilized' | 'Near Expiry' | 'Expired' | 'Overutilized';
}

export const licenses: LicenseRecord[] = [
  { id: 'LIC-001', licenseName: 'Oracle Database Enterprise Edition', businessService: 'Government Financial Reporting', businessDomain: 'Finance', oemProvider: 'Oracle', vendorName: 'Oracle Corporation', licenseCount: 50, currentUtilization: 47, utilizationPct: 94, expiryDate: '2027-03-15', cost: 850000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-002', licenseName: 'SAP ECC Enterprise', businessService: 'Government Procurement', businessDomain: 'Procurement', oemProvider: 'SAP', vendorName: 'SAP SE', licenseCount: 200, currentUtilization: 185, utilizationPct: 92.5, expiryDate: '2027-06-30', cost: 2400000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-003', licenseName: 'Microsoft 365 E5', businessService: 'End User Computing', businessDomain: 'Productivity', oemProvider: 'Microsoft', vendorName: 'Microsoft', licenseCount: 500, currentUtilization: 468, utilizationPct: 93.6, expiryDate: '2027-01-31', cost: 1800000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-004', licenseName: 'Splunk Enterprise', businessService: 'Security Monitoring', businessDomain: 'Security', oemProvider: 'Splunk', vendorName: 'Splunk Inc.', licenseCount: 100, currentUtilization: 87, utilizationPct: 87, expiryDate: '2026-11-15', cost: 720000, currency: 'SAR', status: 'Near Expiry' },
  { id: 'LIC-005', licenseName: 'VMware vSphere Enterprise Plus', businessService: 'Infrastructure Services', businessDomain: 'Infrastructure', oemProvider: 'VMware', vendorName: 'Broadcom/VMware', licenseCount: 80, currentUtilization: 76, utilizationPct: 95, expiryDate: '2026-10-30', cost: 640000, currency: 'SAR', status: 'Near Expiry' },
  { id: 'LIC-006', licenseName: 'ServiceNow ITSM', businessService: 'Service Management', businessDomain: 'IT Operations', oemProvider: 'ServiceNow', vendorName: 'ServiceNow Inc.', licenseCount: 150, currentUtilization: 142, utilizationPct: 94.7, expiryDate: '2027-04-30', cost: 1200000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-007', licenseName: 'AppDynamics APM', businessService: 'Application Monitoring', businessDomain: 'IT Operations', oemProvider: 'Cisco', vendorName: 'Cisco Systems', licenseCount: 30, currentUtilization: 28, utilizationPct: 93.3, expiryDate: '2027-02-28', cost: 450000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-008', licenseName: 'SolarWinds NPM', businessService: 'Network Monitoring', businessDomain: 'Infrastructure', oemProvider: 'SolarWinds', vendorName: 'SolarWinds LLC', licenseCount: 500, currentUtilization: 348, utilizationPct: 69.6, expiryDate: '2027-01-15', cost: 280000, currency: 'SAR', status: 'Underutilized' },
  { id: 'LIC-009', licenseName: 'Palo Alto Networks NGFW', businessService: 'Network Security', businessDomain: 'Security', oemProvider: 'Palo Alto', vendorName: 'Palo Alto Networks', licenseCount: 20, currentUtilization: 20, utilizationPct: 100, expiryDate: '2026-12-31', cost: 520000, currency: 'SAR', status: 'Overutilized' },
  { id: 'LIC-010', licenseName: 'Red Hat Enterprise Linux', businessService: 'Infrastructure Services', businessDomain: 'Infrastructure', oemProvider: 'Red Hat', vendorName: 'Red Hat / IBM', licenseCount: 120, currentUtilization: 98, utilizationPct: 81.7, expiryDate: '2027-05-15', cost: 360000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-011', licenseName: 'CrowdStrike Falcon', businessService: 'Endpoint Security', businessDomain: 'Security', oemProvider: 'CrowdStrike', vendorName: 'CrowdStrike Inc.', licenseCount: 600, currentUtilization: 572, utilizationPct: 95.3, expiryDate: '2026-09-30', cost: 480000, currency: 'SAR', status: 'Near Expiry' },
  { id: 'LIC-012', licenseName: 'Commvault Complete Backup', businessService: 'Backup & Recovery', businessDomain: 'Infrastructure', oemProvider: 'Commvault', vendorName: 'Commvault Systems', licenseCount: 40, currentUtilization: 38, utilizationPct: 95, expiryDate: '2027-07-31', cost: 320000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-013', licenseName: 'Citrix Virtual Apps', businessService: 'End User Computing', businessDomain: 'Productivity', oemProvider: 'Citrix', vendorName: 'Cloud Software Group', licenseCount: 200, currentUtilization: 120, utilizationPct: 60, expiryDate: '2027-03-31', cost: 560000, currency: 'SAR', status: 'Underutilized' },
  { id: 'LIC-014', licenseName: 'BeyondTrust PAM', businessService: 'Identity & Access', businessDomain: 'Security', oemProvider: 'BeyondTrust', vendorName: 'BeyondTrust Inc.', licenseCount: 50, currentUtilization: 48, utilizationPct: 96, expiryDate: '2027-02-15', cost: 380000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-015', licenseName: 'GCP Cloud Platform', businessService: 'Cloud Platform Services', businessDomain: 'Cloud', oemProvider: 'Google', vendorName: 'Google Cloud', licenseCount: 1, currentUtilization: 1, utilizationPct: 78, expiryDate: '2027-06-30', cost: 960000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-016', licenseName: 'Azure Cloud Subscription', businessService: 'Cloud Platform Services', businessDomain: 'Cloud', oemProvider: 'Microsoft', vendorName: 'Microsoft Azure', licenseCount: 1, currentUtilization: 1, utilizationPct: 72, expiryDate: '2027-06-30', cost: 840000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-017', licenseName: 'Ansible Automation Platform', businessService: 'Automation Services', businessDomain: 'IT Operations', oemProvider: 'Red Hat', vendorName: 'Red Hat / IBM', licenseCount: 25, currentUtilization: 18, utilizationPct: 72, expiryDate: '2027-04-15', cost: 180000, currency: 'SAR', status: 'Underutilized' },
  { id: 'LIC-018', licenseName: 'Tenable.io Vulnerability Scanner', businessService: 'Vulnerability Management', businessDomain: 'Security', oemProvider: 'Tenable', vendorName: 'Tenable Inc.', licenseCount: 1000, currentUtilization: 842, utilizationPct: 84.2, expiryDate: '2026-11-30', cost: 290000, currency: 'SAR', status: 'Near Expiry' },
  { id: 'LIC-019', licenseName: 'Dynatrace', businessService: 'Application Monitoring', businessDomain: 'IT Operations', oemProvider: 'Dynatrace', vendorName: 'Dynatrace LLC', licenseCount: 20, currentUtilization: 15, utilizationPct: 75, expiryDate: '2027-01-31', cost: 340000, currency: 'SAR', status: 'Underutilized' },
  { id: 'LIC-020', licenseName: 'Oracle WebLogic Server', businessService: 'Application Services', businessDomain: 'Applications', oemProvider: 'Oracle', vendorName: 'Oracle Corporation', licenseCount: 10, currentUtilization: 10, utilizationPct: 100, expiryDate: '2027-03-15', cost: 420000, currency: 'SAR', status: 'Overutilized' },
  { id: 'LIC-021', licenseName: 'Microsoft Intune', businessService: 'Device Management', businessDomain: 'Productivity', oemProvider: 'Microsoft', vendorName: 'Microsoft', licenseCount: 500, currentUtilization: 465, utilizationPct: 93, expiryDate: '2027-01-31', cost: 150000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-022', licenseName: 'Veritas NetBackup', businessService: 'Backup & Recovery', businessDomain: 'Infrastructure', oemProvider: 'Veritas', vendorName: 'Veritas Technologies', licenseCount: 30, currentUtilization: 28, utilizationPct: 93.3, expiryDate: '2026-10-15', cost: 210000, currency: 'SAR', status: 'Near Expiry' },
  { id: 'LIC-023', licenseName: 'F5 BIG-IP', businessService: 'Load Balancing', businessDomain: 'Infrastructure', oemProvider: 'F5', vendorName: 'F5 Networks', licenseCount: 8, currentUtilization: 8, utilizationPct: 100, expiryDate: '2027-04-30', cost: 320000, currency: 'SAR', status: 'Overutilized' },
  { id: 'LIC-024', licenseName: 'Atlassian Jira Service Management', businessService: 'Project Management', businessDomain: 'IT Operations', oemProvider: 'Atlassian', vendorName: 'Atlassian', licenseCount: 100, currentUtilization: 78, utilizationPct: 78, expiryDate: '2027-02-28', cost: 120000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-025', licenseName: 'HashiCorp Terraform Enterprise', businessService: 'Infrastructure as Code', businessDomain: 'Cloud', oemProvider: 'HashiCorp', vendorName: 'HashiCorp', licenseCount: 15, currentUtilization: 12, utilizationPct: 80, expiryDate: '2027-05-31', cost: 180000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-026', licenseName: 'Qualys VMDR', businessService: 'Vulnerability Management', businessDomain: 'Security', oemProvider: 'Qualys', vendorName: 'Qualys Inc.', licenseCount: 500, currentUtilization: 489, utilizationPct: 97.8, expiryDate: '2026-09-15', cost: 240000, currency: 'SAR', status: 'Near Expiry' },
  { id: 'LIC-027', licenseName: 'Cisco AnyConnect VPN', businessService: 'Remote Access', businessDomain: 'Security', oemProvider: 'Cisco', vendorName: 'Cisco Systems', licenseCount: 300, currentUtilization: 245, utilizationPct: 81.7, expiryDate: '2027-03-31', cost: 180000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-028', licenseName: 'MongoDB Enterprise', businessService: 'Database Services', businessDomain: 'Applications', oemProvider: 'MongoDB', vendorName: 'MongoDB Inc.', licenseCount: 10, currentUtilization: 7, utilizationPct: 70, expiryDate: '2027-06-15', cost: 160000, currency: 'SAR', status: 'Underutilized' },
  { id: 'LIC-029', licenseName: 'Docker Enterprise', businessService: 'Container Services', businessDomain: 'Cloud', oemProvider: 'Docker', vendorName: 'Docker Inc.', licenseCount: 50, currentUtilization: 42, utilizationPct: 84, expiryDate: '2027-01-15', cost: 120000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-030', licenseName: 'Grafana Enterprise', businessService: 'Monitoring Dashboard', businessDomain: 'IT Operations', oemProvider: 'Grafana Labs', vendorName: 'Grafana Labs', licenseCount: 20, currentUtilization: 18, utilizationPct: 90, expiryDate: '2027-04-30', cost: 80000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-031', licenseName: 'Proofpoint Email Security', businessService: 'Email Security', businessDomain: 'Security', oemProvider: 'Proofpoint', vendorName: 'Proofpoint Inc.', licenseCount: 500, currentUtilization: 500, utilizationPct: 100, expiryDate: '2026-12-15', cost: 310000, currency: 'SAR', status: 'Near Expiry' },
  { id: 'LIC-032', licenseName: 'Veeam Backup & Replication', businessService: 'Backup & Recovery', businessDomain: 'Infrastructure', oemProvider: 'Veeam', vendorName: 'Veeam Software', licenseCount: 60, currentUtilization: 55, utilizationPct: 91.7, expiryDate: '2027-05-31', cost: 240000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-033', licenseName: 'Zscaler Internet Access', businessService: 'Web Security', businessDomain: 'Security', oemProvider: 'Zscaler', vendorName: 'Zscaler Inc.', licenseCount: 400, currentUtilization: 380, utilizationPct: 95, expiryDate: '2027-02-28', cost: 420000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-034', licenseName: 'SAP BusinessObjects', businessService: 'Business Intelligence', businessDomain: 'Applications', oemProvider: 'SAP', vendorName: 'SAP SE', licenseCount: 80, currentUtilization: 52, utilizationPct: 65, expiryDate: '2027-06-30', cost: 360000, currency: 'SAR', status: 'Underutilized' },
  { id: 'LIC-035', licenseName: 'NetApp ONTAP', businessService: 'Storage Services', businessDomain: 'Infrastructure', oemProvider: 'NetApp', vendorName: 'NetApp Inc.', licenseCount: 15, currentUtilization: 14, utilizationPct: 93.3, expiryDate: '2027-07-15', cost: 480000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-036', licenseName: 'Imperva WAF', businessService: 'Web Application Firewall', businessDomain: 'Security', oemProvider: 'Imperva', vendorName: 'Imperva Inc.', licenseCount: 10, currentUtilization: 10, utilizationPct: 100, expiryDate: '2026-10-31', cost: 280000, currency: 'SAR', status: 'Near Expiry' },
  { id: 'LIC-037', licenseName: 'Aruba ClearPass', businessService: 'Network Access Control', businessDomain: 'Security', oemProvider: 'HPE/Aruba', vendorName: 'HPE Aruba', licenseCount: 1000, currentUtilization: 890, utilizationPct: 89, expiryDate: '2027-03-15', cost: 190000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-038', licenseName: 'PagerDuty', businessService: 'Incident Management', businessDomain: 'IT Operations', oemProvider: 'PagerDuty', vendorName: 'PagerDuty Inc.', licenseCount: 50, currentUtilization: 42, utilizationPct: 84, expiryDate: '2027-01-31', cost: 95000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-039', licenseName: 'Fortinet FortiGate', businessService: 'Branch Security', businessDomain: 'Security', oemProvider: 'Fortinet', vendorName: 'Fortinet Inc.', licenseCount: 12, currentUtilization: 12, utilizationPct: 100, expiryDate: '2026-08-31', cost: 240000, currency: 'SAR', status: 'Expired' },
  { id: 'LIC-040', licenseName: 'Cisco DNA Center', businessService: 'Network Automation', businessDomain: 'Infrastructure', oemProvider: 'Cisco', vendorName: 'Cisco Systems', licenseCount: 1, currentUtilization: 1, utilizationPct: 85, expiryDate: '2027-04-15', cost: 350000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-041', licenseName: 'Okta Identity', businessService: 'Identity Management', businessDomain: 'Security', oemProvider: 'Okta', vendorName: 'Okta Inc.', licenseCount: 500, currentUtilization: 478, utilizationPct: 95.6, expiryDate: '2027-05-31', cost: 420000, currency: 'SAR', status: 'Healthy' },
  { id: 'LIC-042', licenseName: 'Elastic Stack Enterprise', businessService: 'Log Management', businessDomain: 'IT Operations', oemProvider: 'Elastic', vendorName: 'Elastic N.V.', licenseCount: 5, currentUtilization: 5, utilizationPct: 100, expiryDate: '2026-11-30', cost: 180000, currency: 'SAR', status: 'Near Expiry' },
];

export function getLicenseStats() {
  const total = licenses.length;
  const healthy = licenses.filter(l => l.status === 'Healthy').length;
  const nearExpiry = licenses.filter(l => l.status === 'Near Expiry').length;
  const expired = licenses.filter(l => l.status === 'Expired').length;
  const overutilized = licenses.filter(l => l.status === 'Overutilized').length;
  const underutilized = licenses.filter(l => l.status === 'Underutilized').length;
  const totalCost = licenses.reduce((sum, l) => sum + l.cost, 0);
  const expiringIn90Days = licenses.filter(l => {
    const exp = new Date(l.expiryDate);
    const now = new Date('2026-08-12');
    const diff = (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diff > 0 && diff <= 90;
  }).length;
  return { total, healthy, nearExpiry, expired, overutilized, underutilized, totalCost, expiringIn90Days };
}
