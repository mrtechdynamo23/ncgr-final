import React from 'react';
import PendingApprovalPage from '../../components/common/PendingApprovalPage';

const VendorServiceSLAPage: React.FC = () => {
  return (
    <PendingApprovalPage
      title="Vendor Service SLA Framework"
      subtitle="Comprehensive SIAM SLA scorecard, multi-vendor operational assurance targets, penalty thresholds, and escalation pathways"
      moduleName="Vendor Service SLA Assurance Framework"
      approverRole="NCGR ITMS Steering Committee & Commercial Procurement"
      submissionDate="2026-07-20"
      expectedDate="2026-09-01 (Formal Review Cycle)"
      itemsPendingCount={16}
      badgeText="VENDOR SERVICE SLA — PENDING STEERING SIGN-OFF"
    />
  );
};

export default VendorServiceSLAPage;
