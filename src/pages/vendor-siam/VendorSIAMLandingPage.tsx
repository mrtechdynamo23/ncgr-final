import React from 'react';
import {
  Building2, Gauge, AlertTriangle, CheckSquare
} from 'lucide-react';
import ModuleLandingHub, { type SubTileItem } from '../../components/navigation/ModuleLandingHub';

export const VENDOR_SIAM_SIBLINGS = [
  { id: 'performance', title: 'Vendor Performance', path: '/vendor-siam/performance', icon: <Building2 size={14} /> },
  { id: 'sla', title: 'Vendor Service SLA', path: '/vendor-siam/sla', icon: <Gauge size={14} /> },
  { id: 'risk', title: 'Vendor Risk', path: '/vendor-siam/risk', icon: <AlertTriangle size={14} /> },
  { id: 'actions', title: 'Vendor Actions', path: '/vendor-siam/actions', icon: <CheckSquare size={14} /> },
];

const VendorSIAMLandingPage: React.FC = () => {
  const subTiles: SubTileItem[] = [
    {
      id: 'vendor-perf',
      title: 'Vendor Performance',
      description: 'Tier-1 vendor scorecards, monthly SLA achievement ratings, operational responsiveness, and contract KPI delivery.',
      icon: <Building2 size={22} />,
      path: '/vendor-siam/performance',
      kpiValue: '12 Active Vendors',
      kpiLabel: '96.2% Avg SLA Delivery',
      badge: 'Operational',
      badgeType: 'healthy',
    },
    {
      id: 'vendor-sla',
      title: 'Vendor Service SLA',
      description: 'Contractual service level agreements, target performance bands, penalty thresholds, and formal service credits.',
      icon: <Gauge size={22} />,
      path: '/vendor-siam/sla',
      kpiValue: '18 Contractual SLAs',
      kpiLabel: 'Service Governance Baseline',
      badge: 'In Review',
      badgeType: 'info',
    },
    {
      id: 'vendor-risk',
      title: 'Vendor Risk',
      description: 'Vendor compliance risk matrix, cyber risk ratings, supply chain continuity assessments, and mitigation plans.',
      icon: <AlertTriangle size={22} />,
      path: '/vendor-siam/risk',
      kpiValue: '14 Assessed Risks',
      kpiLabel: '0 Unmitigated Critical Risks',
      badge: 'Audited',
      badgeType: 'healthy',
    },
    {
      id: 'vendor-actions',
      title: 'Vendor Actions',
      description: 'Corrective action requests, vendor improvement plans (PIPs), escalation workflows, and resolution milestones.',
      icon: <CheckSquare size={22} />,
      path: '/vendor-siam/actions',
      kpiValue: '5 Open Action Items',
      kpiLabel: '100% In Active Remediation',
      badge: 'Action Register',
      badgeType: 'warning',
    },
  ];

  return (
    <ModuleLandingHub
      moduleTitle="Vendor & SIAM"
      moduleSubtitle="Multi-supplier governance, Service Integration and Management (SIAM), vendor performance scorecards, and supplier risk."
      categoryLabel="GOVERNANCE & ASSURANCE"
      subTiles={subTiles}
    />
  );
};

export default VendorSIAMLandingPage;
