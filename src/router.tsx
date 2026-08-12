import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import PlaceholderPage from './pages/PlaceholderPage';
import CommandCentre from './pages/CommandCentre';
import OperationalServices from './pages/operations/OperationalServices';
import ResourceRoster from './pages/operations/ResourceRoster';
import ActivityChecklist from './pages/operations/ActivityChecklist';
import HandoverLogs from './pages/operations/HandoverLogs';
import OperationsMOM from './pages/operations/OperationsMOM';
import LeaveManagement from './pages/operations/LeaveManagement';
import AttendanceView from './pages/operations/AttendanceView';
import ContactDirectory from './pages/operations/ContactDirectory';

import CriticalIncidents from './pages/service-operations/CriticalIncidents';
import ServiceRequests from './pages/service-operations/ServiceRequests';
import ChangeManagement from './pages/service-operations/ChangeManagement';
import MajorProblems from './pages/service-operations/MajorProblems';
import OperationalRCA from './pages/service-operations/OperationalRCA';
import ServiceDeskOverview from './pages/service-operations/ServiceDeskOverview';

import { RequireAuth } from './components/auth/RequireAuth';
import LoginPage from './pages/LoginPage';

import ApplicationServicesLanding from './pages/applications/ApplicationServicesLanding';
import ApplicationHealthPage from './pages/applications/ApplicationHealthPage';
import BusinessServiceHealthPage from './pages/applications/BusinessServiceHealthPage';
import ApplicationPortfolioPage from './pages/applications/ApplicationPortfolioPage';
import ApplicationIncidentsPage from './pages/applications/ApplicationIncidentsPage';
import ApplicationProblemsPage from './pages/applications/ApplicationProblemsPage';
import ApplicationChangesPage from './pages/applications/ApplicationChangesPage';
import ApplicationDependenciesPage from './pages/applications/ApplicationDependenciesPage';
import ApplicationPerformancePage from './pages/applications/ApplicationPerformancePage';
import ApplicationSupportPage from './pages/applications/ApplicationSupportPage';

import TechnologyEstate from './pages/technology/TechnologyEstate';
import ServiceNowHealth from './pages/technology/ServiceNowHealth';
import MonitoringObservability from './pages/technology/MonitoringObservability';

import InfrastructureOverview from './pages/infrastructure/InfrastructureOverview';
import NetworkHealthView from './pages/infrastructure/NetworkHealthView';
import DatabaseHealthView from './pages/infrastructure/DatabaseHealthView';
import ContainerHealthView from './pages/infrastructure/ContainerHealthView';
import DigitalWorkplaceView from './pages/infrastructure/DigitalWorkplaceView';

import VendorManagementView from './pages/governance/VendorManagementView';
import ProgramOverviewView from './pages/governance/ProgramOverviewView';
import ResourceMobilizationView from './pages/governance/ResourceMobilizationView';
import TeamStructureView from './pages/governance/TeamStructureView';
import RiskManagement from './pages/governance/RiskManagement';
import UnifiedApprovals from './pages/governance/UnifiedApprovals';

import AutomationInitiatives from './pages/transformation/AutomationInitiatives';
import FinOpsCloudEconomics from './pages/finops/FinOpsCloudEconomics';
import KnowledgeBase from './pages/knowledge/KnowledgeBase';
import AuditCompliance from './pages/compliance/AuditCompliance';

import WSRReportView from './pages/reporting/WSRReportView';
import MSRReportView from './pages/reporting/MSRReportView';
import ExecutiveReportView from './pages/reporting/ExecutiveReportView';
import AIAnalyticsView from './pages/reporting/AIAnalyticsView';

const router = createBrowserRouter([
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
      // ─── COMMAND CENTRE HOMEPAGE ─────────────────────────
      {
        index: true,
        element: <CommandCentre />,
      },

      // ─── OPERATIONAL SERVICES ────────────────────────────
      {
        path: 'operations',
        element: <OperationalServices />,
      },
      {
        path: 'operations/resource-roster',
        element: <ResourceRoster />,
      },
      {
        path: 'operations/shift-roster',
        element: <ResourceRoster />,
      },
      {
        path: 'operations/activity-checklist',
        element: <ActivityChecklist />,
      },
      {
        path: 'operations/handover-logs',
        element: <HandoverLogs />,
      },
      {
        path: 'operations/mom',
        element: <OperationsMOM />,
      },
      {
        path: 'operations/leave',
        element: <LeaveManagement />,
      },
      {
        path: 'operations/attendance',
        element: <AttendanceView />,
      },
      {
        path: 'operations/contacts',
        element: <ContactDirectory />,
      },

      // ─── SERVICE OPERATIONS ──────────────────────────────
      {
        path: 'service-management/critical-incidents',
        element: <CriticalIncidents />,
      },
      {
        path: 'service-management/service-requests',
        element: <ServiceRequests />,
      },
      {
        path: 'service-management/changes',
        element: <ChangeManagement />,
      },
      {
        path: 'service-management/problems',
        element: <MajorProblems />,
      },
      {
        path: 'knowledge',
        element: <KnowledgeBase />,
      },
      {
        path: 'service-management/rca',
        element: <OperationalRCA />,
      },
      {
        path: 'service-management/service-desk',
        element: <ServiceDeskOverview />,
      },

      // ─── APPLICATION SERVICES (FULL 9 CHILD MODULES) ─────
      {
        path: 'applications',
        element: <ApplicationServicesLanding />,
      },
      {
        path: 'applications/health',
        element: <ApplicationHealthPage />,
      },
      {
        path: 'applications/business-service-health',
        element: <BusinessServiceHealthPage />,
      },
      {
        path: 'applications/portfolio',
        element: <ApplicationPortfolioPage />,
      },
      {
        path: 'applications/incidents',
        element: <ApplicationIncidentsPage />,
      },
      {
        path: 'applications/problems',
        element: <ApplicationProblemsPage />,
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

      // ─── TECHNOLOGY ESTATE ───────────────────────────────
      {
        path: 'technology/estate',
        element: <TechnologyEstate />,
      },
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
        element: <AutomationInitiatives />,
      },
      {
        path: 'technology/security',
        element: <DigitalWorkplaceView />,
      },
      {
        path: 'technology/microsoft',
        element: <DigitalWorkplaceView />,
      },
      {
        path: 'technology/cloud-platforms',
        element: <FinOpsCloudEconomics />,
      },
      {
        path: 'technology/licenses',
        element: <VendorManagementView />,
      },

      // ─── INFRASTRUCTURE HEALTH ───────────────────────────
      {
        path: 'applications/infrastructure',
        element: <InfrastructureOverview />,
      },
      {
        path: 'applications/network',
        element: <NetworkHealthView />,
      },
      {
        path: 'applications/database',
        element: <DatabaseHealthView />,
      },
      {
        path: 'applications/containers',
        element: <ContainerHealthView />,
      },
      {
        path: 'applications/digital-workplace',
        element: <DigitalWorkplaceView />,
      },

      // ─── VENDOR & SIAM ───────────────────────────────────
      {
        path: 'governance/vendors',
        element: <VendorManagementView />,
      },

      // ─── PROGRAM MANAGEMENT ──────────────────────────────
      {
        path: 'governance/programs',
        element: <ProgramOverviewView />,
      },
      {
        path: 'governance/approvals',
        element: <UnifiedApprovals />,
      },
      {
        path: 'governance/risks',
        element: <RiskManagement />,
      },

      // ─── RESOURCE MOBILIZATION ───────────────────────────
      {
        path: 'governance/resource-mobilization',
        element: <ResourceMobilizationView />,
      },
      {
        path: 'governance/demand-capacity',
        element: <ResourceMobilizationView />,
      },
      {
        path: 'governance/open-positions',
        element: <ResourceMobilizationView />,
      },
      {
        path: 'governance/onboarding',
        element: <ResourceMobilizationView />,
      },
      {
        path: 'governance/kt',
        element: <ResourceMobilizationView />,
      },

      // ─── TEAM STRUCTURE ──────────────────────────────────
      {
        path: 'governance/team-structure',
        element: <TeamStructureView />,
      },

      // ─── DIGITAL TRANSFORMATION & AI ─────────────────────
      {
        path: 'transformation/automation',
        element: <AutomationInitiatives />,
      },
      {
        path: 'transformation/ai',
        element: <AutomationInitiatives />,
      },
      {
        path: 'transformation/benefits',
        element: <AutomationInitiatives />,
      },
      {
        path: 'transformation/innovation',
        element: <AutomationInitiatives />,
      },

      // ─── MANAGEMENT REPORTING ────────────────────────────
      {
        path: 'reporting/wsr',
        element: <WSRReportView />,
      },
      {
        path: 'reporting/msr',
        element: <MSRReportView />,
      },
      {
        path: 'reporting/executive',
        element: <ExecutiveReportView />,
      },
      {
        path: 'reporting/ai-analytics',
        element: <AIAnalyticsView />,
      },

      // ─── FINOPS ──────────────────────────────────────────
      {
        path: 'finops',
        element: <FinOpsCloudEconomics />,
      },

      // ─── AUDIT & COMPLIANCE ──────────────────────────────
      {
        path: 'compliance/status',
        element: <AuditCompliance />,
      },

      // ─── SLA ASSURANCE (MUST REMAIN EMPTY PER SPEC) ──────
      {
        path: 'assurance/sla',
        element: (
          <PlaceholderPage
            titleKey="slaAssurance.title"
            namespace="reporting"
            isEmpty={true}
            emptyMessage="Final SLA framework configuration is pending approval."
          />
        ),
      },
      {
        path: 'assurance/oti',
        element: (
          <PlaceholderPage
            titleKey="otiCockpit.title"
            namespace="reporting"
            isEmpty={true}
            emptyMessage="Operational Trust Index framework pending business confirmation."
          />
        ),
      },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
