import React from 'react';
import {
  FolderKanban, Flag, GitBranch, AlertCircle, Users
} from 'lucide-react';
import ModuleLandingHub, { type SubTileItem } from '../../components/navigation/ModuleLandingHub';

export const PROGRAM_MGMT_SIBLINGS = [
  { id: 'overview', title: 'Program Overview', path: '/program-management/overview', icon: <FolderKanban size={14} /> },
  { id: 'milestones', title: 'Milestones', path: '/program-management/milestones', icon: <Flag size={14} /> },
  { id: 'dependencies', title: 'Dependencies', path: '/program-management/dependencies', icon: <GitBranch size={14} /> },
  { id: 'issues-actions', title: 'Issues & Actions', path: '/program-management/issues-actions', icon: <AlertCircle size={14} /> },
  { id: 'resource-mob', title: 'Resource Mobilisation', path: '/program-management/resource-mobilisation', icon: <Users size={14} /> },
];

const ProgramManagementLandingPage: React.FC = () => {
  const subTiles: SubTileItem[] = [
    {
      id: 'prog-overview',
      title: 'Program Overview',
      description: 'Executive timeline, governance health, phase gating milestones, and ITMS transition scorecard.',
      icon: <FolderKanban size={22} />,
      path: '/program-management/overview',
      kpiValue: 'Phase 3 In Execution',
      kpiLabel: 'Overall Green / On-Track',
      badge: 'On Track',
      badgeType: 'healthy',
    },
    {
      id: 'prog-milestones',
      title: 'Milestones',
      description: 'Contractual deliverable milestones, baseline vs forecast target dates, and formal customer sign-offs.',
      icon: <Flag size={22} />,
      path: '/program-management/milestones',
      kpiValue: '19 / 24 Milestones Done',
      kpiLabel: '79% Deliverables Achieved',
      badge: 'Active Delivery',
      badgeType: 'info',
    },
    {
      id: 'prog-deps',
      title: 'Dependencies',
      description: 'Inter-tower critical path dependencies, technology handoffs, external vendor dependencies, and risks.',
      icon: <GitBranch size={22} />,
      path: '/program-management/dependencies',
      kpiValue: '16 Active Dependencies',
      kpiLabel: 'Zero Critical Blockers',
      badge: 'Managed',
      badgeType: 'healthy',
    },
    {
      id: 'prog-issues',
      title: 'Issues & Actions',
      description: 'Program issues register, RAID matrix, corrective action assignments, due dates, and resolutions.',
      icon: <AlertCircle size={22} />,
      path: '/program-management/issues-actions',
      kpiValue: '6 Open Actions',
      kpiLabel: '100% Owner Assigned',
      badge: 'Action Register',
      badgeType: 'warning',
    },
    {
      id: 'prog-res-mob',
      title: 'Resource Mobilisation',
      description: 'Contractual onboarding rate, role mobilization pipeline, clearance status, and Knowledge Transfer records.',
      icon: <Users size={22} />,
      path: '/program-management/resource-mobilisation',
      kpiValue: '110 Resources Mobilised',
      kpiLabel: '98% Mobilization Target Met',
      badge: 'Fulfillment 98%',
      badgeType: 'healthy',
    },
  ];

  return (
    <ModuleLandingHub
      moduleTitle="Program Management"
      moduleSubtitle="Strategic ITMS governance, transition phase execution, milestone achievement tracking, and resource mobilization."
      categoryLabel="GOVERNANCE & ASSURANCE"
      subTiles={subTiles}
    />
  );
};

export default ProgramManagementLandingPage;
