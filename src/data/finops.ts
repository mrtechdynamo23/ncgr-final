/**
 * FinOps & Cloud Economics Data
 * Sourced/Estimated for GCP & Azure public-cloud server estate
 */

export interface FinOpsData {
  monthlySpend: string;
  monthlyBudget: string;
  forecast: string;
  variancePercentage: number;
  varianceStatus: 'Under Budget' | 'Over Budget' | 'On Target';
  gcpSpend: string;
  azureSpend: string;
  gcpWorkloads: number;
  azureWorkloads: number;
  migrationProgress: number; // percentage
  optimizationOpportunity: string;
  topCostDrivers: { category: string; spend: string; percentage: number }[];
  recommendations: { id: string; action: string; estimatedSavings: string; provider: 'GCP' | 'Azure'; status: 'Planned' | 'In Progress' | 'Realized' }[];
}

export const finopsData: FinOpsData = {
  monthlySpend: 'SAR 420,000',
  monthlyBudget: 'SAR 435,000',
  forecast: 'SAR 428,000',
  variancePercentage: -3.4,
  varianceStatus: 'Under Budget',
  gcpSpend: 'SAR 295,000',
  azureSpend: 'SAR 125,000',
  gcpWorkloads: 1120,
  azureWorkloads: 286,
  migrationProgress: 72,
  optimizationOpportunity: 'SAR 38,000/month',
  topCostDrivers: [
    { category: 'GCP Compute Engine VMs', spend: 'SAR 185,000', percentage: 44 },
    { category: 'Azure Managed SQL & Databases', spend: 'SAR 82,000', percentage: 19 },
    { category: 'GCP Cloud Storage & Backups', spend: 'SAR 64,000', percentage: 15 },
    { category: 'Azure ExpressRoute & Data Egress', spend: 'SAR 48,000', percentage: 11 },
    { category: 'OpenShift Cluster Nodes (Cloud-hosted)', spend: 'SAR 41,000', percentage: 11 },
  ],
  recommendations: [
    { id: 'REC-01', action: 'Convert 14 idle GCP compute instances to preemptible / committed use discount', estimatedSavings: 'SAR 15,400/mo', provider: 'GCP', status: 'In Progress' },
    { id: 'REC-02', action: 'Right-size unattached Azure Premium SSD volumes on legacy migration targets', estimatedSavings: 'SAR 8,200/mo', provider: 'Azure', status: 'In Progress' },
    { id: 'REC-03', action: 'Schedule automated shutdown for non-production OpenShift dev clusters during weekends', estimatedSavings: 'SAR 14,400/mo', provider: 'GCP', status: 'Planned' },
  ],
};
