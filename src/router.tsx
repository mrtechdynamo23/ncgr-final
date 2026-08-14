import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import CommandCentre from './pages/CommandCentre';
import { RequireAuth } from './components/auth/RequireAuth';
import LoginPage from './pages/LoginPage';

// ─── Team Overview ───────────────────────────────────────────
import OperationalServices from './pages/operations/OperationalServices';
import ResourceRoster from './pages/operations/ResourceRoster';
import TeamStructurePage from './pages/operations/TeamStructurePage';
import ContactDirectory from './pages/operations/ContactDirectory';
import LeaveManagement from './pages/operations/LeaveManagement';
import AttendanceView from './pages/operations/AttendanceView';

// ─── Shift Operations Log ────────────────────────────────────
import ShiftOperationsLog from './pages/shift-operations/ShiftOperationsLog';
import ActivityChecklist from './pages/operations/ActivityChecklist';
import HandoverLogs from './pages/operations/HandoverLogs';
import OperationsMOM from './pages/operations/OperationsMOM';

// ─── Command Center ──────────────────────────────────────────
import ServiceDeskOverview from './pages/service-operations/ServiceDeskOverview';
import Incidents from './pages/service-operations/Incidents';
import CriticalIncidents from './pages/service-operations/CriticalIncidents';
import ServiceRequests from './pages/service-operations/ServiceRequests';
import MajorProblems from './pages/service-operations/MajorProblems';
import OperationalRCA from './pages/service-operations/OperationalRCA';
import KnowledgeBase from './pages/knowledge/KnowledgeBase';

// ─── Application Services ────────────────────────────────────
import ApplicationHealthPage from './pages/applications/ApplicationHealthPage';
import BusinessServiceHealthPage from './pages/applications/BusinessServiceHealthPage';
import ApplicationIncidentsPage from './pages/applications/ApplicationIncidentsPage';
import ApplicationChangesPage from './pages/applications/ApplicationChangesPage';
import ApplicationDependenciesPage from './pages/applications/ApplicationDependenciesPage';
import ApplicationPerformancePage from './pages/applications/ApplicationPerformancePage';
import ApplicationSupportPage from './pages/applications/ApplicationSupportPage';

// ─── IT Support Tool Management ──────────────────────────────
import ServiceNowHealth from './pages/technology/ServiceNowHealth';
import MonitoringObservability from './pages/technology/MonitoringObservability';
import DevOpsAutomation from './pages/technology/DevOpsAutomation';
import SecurityTechnology from './pages/technology/SecurityTechnology';
import MicrosoftEstate from './pages/technology/MicrosoftEstate';
import CloudPlatforms from './pages/technology/CloudPlatforms';

// ─── License & Entitlement Health ────────────────────────────
import LicenseHealth from './pages/technology/LicenseHealth';

// ─── Infrastructure Health ───────────────────────────────────
import InfrastructureHealthPage from './pages/infrastructure/InfrastructureHealthPage';
import NetworkHealthPage from './pages/infrastructure/NetworkHealthPage';
import DatabaseHealthPage from './pages/infrastructure/DatabaseHealthPage';
import VMHealthPage from './pages/infrastructure/VMHealthPage';
import CloudHealthPage from './pages/infrastructure/CloudHealthPage';
import DigitalWorkplacePage from './pages/infrastructure/DigitalWorkplacePage';

// ─── Vendor & SIAM ───────────────────────────────────────────
import VendorPerformancePage from './pages/vendor-siam/VendorPerformancePage';
import VendorServiceSLAPage from './pages/vendor-siam/VendorServiceSLAPage';
import VendorRiskPage from './pages/vendor-siam/VendorRiskPage';
import VendorActionsPage from './pages/vendor-siam/VendorActionsPage';

// ─── Program Management ──────────────────────────────────────
import ProgramOverviewPage from './pages/program-management/ProgramOverviewPage';
import MilestonesPage from './pages/program-management/MilestonesPage';
import DependenciesPage from './pages/program-management/DependenciesPage';
import IssuesAndActionsPage from './pages/program-management/IssuesAndActionsPage';
import ResourceMobilizationPage from './pages/program-management/ResourceMobilizationPage';

// ─── Digital Transformation & AI ─────────────────────────────
import AutomationInitiatives from './pages/transformation/AutomationInitiatives';

// ─── Audit & Compliance ──────────────────────────────────────
import AuditCompliance from './pages/compliance/AuditCompliance';

// ─── SLA Assurance ───────────────────────────────────────────
import SLAAssurance from './pages/governance/SLAAssurance';

// ─── Management Reports ──────────────────────────────────────
import WSRReportView from './pages/reporting/WSRReportView';
import MSRReportView from './pages/reporting/MSRReportView';
import ExecutiveReportView from './pages/reporting/ExecutiveReportView';
import AIAnalyticsView from './pages/reporting/AIAnalyticsView';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <AppShell />
      </RequireAuth>
    ),
    children: [
      // 1. Executive Dashboard (Homepage)
      {
        index: true,
        element: <CommandCentre />,
      },

      // 2. Team Overview
      {
        path: 'team-overview',
        element: <OperationalServices />,
      },
      {
        path: 'team-overview/resource-data',
        element: <ResourceRoster />,
      },
      {
        path: 'team-overview/team-structure',
        element: <TeamStructurePage />,
      },
      {
        path: 'team-overview/contacts',
        element: <ContactDirectory />,
      },
      {
        path: 'team-overview/leave',
        element: <LeaveManagement />,
      },
      {
        path: 'team-overview/attendance',
        element: <AttendanceView />,
      },

      // 3. Shift Operations Log
      {
        path: 'shift-operations',
        element: <ShiftOperationsLog />,
      },
      {
        path: 'shift-operations/activity-checklist',
        element: <ActivityChecklist />,
      },
      {
        path: 'shift-operations/handover-logs',
        element: <HandoverLogs />,
      },
      {
        path: 'shift-operations/mom',
        element: <OperationsMOM />,
      },

      // 4. Command Center
      {
        path: 'command-center/service-desk',
        element: <ServiceDeskOverview />,
      },
      {
        path: 'command-center/incidents',
        element: <Incidents />,
      },
      {
        path: 'command-center/critical-incidents',
        element: <CriticalIncidents />,
      },
      {
        path: 'command-center/service-requests',
        element: <ServiceRequests />,
      },
      {
        path: 'command-center/problems',
        element: <MajorProblems />,
      },
      {
        path: 'command-center/rca',
        element: <OperationalRCA />,
      },
      {
        path: 'command-center/knowledge',
        element: <KnowledgeBase />,
      },

      // 5. Application Services
      {
        path: 'applications/health',
        element: <ApplicationHealthPage />,
      },
      {
        path: 'applications/business-service-health',
        element: <BusinessServiceHealthPage />,
      },
      {
        path: 'applications/incidents',
        element: <ApplicationIncidentsPage />,
      },
      {
        path: 'applications/changes',
        element: <ApplicationChangesPage />,
      },
      {
        path: 'applications/dependencies',
        element: <ApplicationDependenciesPage />,
      },
      {
        path: 'applications/performance',
        element: <ApplicationPerformancePage />,
      },
      {
        path: 'applications/support',
        element: <ApplicationSupportPage />,
      },

      // 6. IT Support Tool Management
      {
        path: 'technology/servicenow',
        element: <ServiceNowHealth />,
      },
      {
        path: 'technology/monitoring',
        element: <MonitoringObservability />,
      },
      {
        path: 'technology/devops',
        element: <DevOpsAutomation />,
      },
      {
        path: 'technology/security',
        element: <SecurityTechnology />,
      },
      {
        path: 'technology/microsoft',
        element: <MicrosoftEstate />,
      },
      {
        path: 'technology/cloud-platforms',
        element: <CloudPlatforms />,
      },

      // 7. License & Entitlement Health
      {
        path: 'license-health',
        element: <LicenseHealth />,
      },
      {
        path: 'technology/licenses',
        element: <LicenseHealth />,
      },

      // 8. Infrastructure Health
      {
        path: 'infrastructure/overview',
        element: <InfrastructureHealthPage />,
      },
      {
        path: 'infrastructure/network',
        element: <NetworkHealthPage />,
      },
      {
        path: 'infrastructure/database',
        element: <DatabaseHealthPage />,
      },
      {
        path: 'infrastructure/vm',
        element: <VMHealthPage />,
      },
      {
        path: 'infrastructure/cloud',
        element: <CloudHealthPage />,
      },
      {
        path: 'infrastructure/digital-workplace',
        element: <DigitalWorkplacePage />,
      },

      // 9. Vendor & SIAM
      {
        path: 'vendor-siam/performance',
        element: <VendorPerformancePage />,
      },
      {
        path: 'vendor-siam/sla',
        element: <VendorServiceSLAPage />,
      },
      {
        path: 'vendor-siam/risk',
        element: <VendorRiskPage />,
      },
      {
        path: 'vendor-siam/actions',
        element: <VendorActionsPage />,
      },

      // 10. Program Management
      {
        path: 'program-management/overview',
        element: <ProgramOverviewPage />,
      },
      {
        path: 'program-management/milestones',
        element: <MilestonesPage />,
      },
      {
        path: 'program-management/dependencies',
        element: <DependenciesPage />,
      },
      {
        path: 'program-management/issues-actions',
        element: <IssuesAndActionsPage />,
      },
      {
        path: 'program-management/resource-mobilisation',
        element: <ResourceMobilizationPage />,
      },

      // 11. Digital Transformation & AI
      {
        path: 'transformation',
        element: <AutomationInitiatives />,
      },

      // 12. Audit & Compliance
      {
        path: 'compliance',
        element: <AuditCompliance />,
      },

      // 13. SLA Assurance
      {
        path: 'assurance/sla',
        element: <SLAAssurance />,
      },

      // Management Reports
      {
        path: 'reports/wsr',
        element: <WSRReportView />,
      },
      {
        path: 'reports/msr',
        element: <MSRReportView />,
      },
      {
        path: 'reports/executive',
        element: <ExecutiveReportView />,
      },
      {
        path: 'reports/analytics',
        element: <AIAnalyticsView />,
      },

      // ─── Backward-compatibility & Aliases ──────────────────
      { path: 'operations/*', element: <Navigate to="/team-overview" replace /> },
      { path: 'governance/vendor-management', element: <Navigate to="/vendor-siam/performance" replace /> },
      { path: 'governance/program-overview', element: <Navigate to="/program-management/overview" replace /> },
      { path: 'governance/resource-mobilization', element: <Navigate to="/program-management/resource-mobilisation" replace /> },
      { path: 'governance/team-structure', element: <Navigate to="/team-overview/team-structure" replace /> },
      { path: 'governance/risk-management', element: <Navigate to="/vendor-siam/risk" replace /> },
      { path: 'service-operations/*', element: <Navigate to="/command-center/service-desk" replace /> },
      { path: 'applications/portfolio', element: <Navigate to="/applications/health" replace /> },
      { path: 'knowledge/*', element: <Navigate to="/command-center/knowledge" replace /> },
      { path: 'finops/*', element: <Navigate to="/infrastructure/cloud" replace /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;
