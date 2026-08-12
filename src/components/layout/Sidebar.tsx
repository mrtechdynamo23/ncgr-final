import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NCGRLogo from '../common/NCGRLogo';
import {
  LayoutDashboard, ClipboardList, Ticket, Layers, Cpu,
  Server, Building2, FolderKanban, UserPlus, UsersRound,
  Rocket, BarChart3, DollarSign, ShieldCheck, Gauge, ChevronRight,
  ChevronDown, Users, Clock, ClipboardCheck, ArrowRightLeft,
  MessageSquare, CalendarDays, UserCheck, Phone, AlertTriangle,
  FileText, GitBranch, FileCheck, Activity, Network, Database,
  Container, Cloud, Monitor, Settings, Shield, Bot, Lightbulb,
  TrendingUp, BookOpen, FileSpreadsheet, CheckCircle2, AlertCircle
} from 'lucide-react';

export interface NavChildItem {
  id: string;
  labelKey: string;
  defaultLabel: string;
  icon?: React.ReactNode;
  path: string;
}

export interface NavParentTile {
  id: string;
  labelKey: string;
  defaultLabel: string;
  icon: React.ReactNode;
  defaultPath?: string;
  children?: NavChildItem[];
}

// ─── MASTER SIDEBAR PARENT TILES (NO DUPLICATE PARENT/CHILD NAMES) ───
export const sidebarParentTiles: NavParentTile[] = [
  {
    id: 'command-centre',
    labelKey: 'nav.commandCentre',
    defaultLabel: 'Operations Command Centre',
    icon: <LayoutDashboard size={18} />,
    defaultPath: '/',
  },
  {
    id: 'operational-services',
    labelKey: 'nav.operationalServices',
    defaultLabel: 'Operational Services',
    icon: <ClipboardList size={18} />,
    defaultPath: '/operations',
    children: [
      { id: 'resource-roster', labelKey: 'nav.resourceRoster', defaultLabel: 'Resource Roster', icon: <Users size={16} />, path: '/operations/resource-roster' },
      { id: 'shift-roster', labelKey: 'nav.shiftRoster', defaultLabel: 'Shift Roster', icon: <Clock size={16} />, path: '/operations/shift-roster' },
      { id: 'activity-checklist', labelKey: 'nav.activityChecklist', defaultLabel: 'Activity Checklist', icon: <ClipboardCheck size={16} />, path: '/operations/activity-checklist' },
      { id: 'handover-logs', labelKey: 'nav.handoverLogs', defaultLabel: 'Handover Logs', icon: <ArrowRightLeft size={16} />, path: '/operations/handover-logs' },
      { id: 'operations-mom', labelKey: 'nav.operationsMOM', defaultLabel: 'Operations MOM & Action Tracker', icon: <MessageSquare size={16} />, path: '/operations/mom' },
      { id: 'leave-management', labelKey: 'nav.leaveManagement', defaultLabel: 'Leave Management', icon: <CalendarDays size={16} />, path: '/operations/leave' },
      { id: 'attendance', labelKey: 'nav.attendance', defaultLabel: 'Attendance', icon: <UserCheck size={16} />, path: '/operations/attendance' },
      { id: 'contact-directory', labelKey: 'nav.contactDirectory', defaultLabel: 'Contact Directory', icon: <Phone size={16} />, path: '/operations/contacts' },
    ],
  },
  {
    id: 'service-operations',
    labelKey: 'nav.serviceOperations',
    defaultLabel: 'Service Operations',
    icon: <Ticket size={18} />,
    defaultPath: '/service-management/critical-incidents',
    children: [
      { id: 'incident-mgmt', labelKey: 'nav.criticalIncidents', defaultLabel: 'Incident Management', icon: <AlertTriangle size={16} />, path: '/service-management/critical-incidents' },
      { id: 'service-requests', labelKey: 'nav.serviceRequests', defaultLabel: 'Service Request Management', icon: <FileText size={16} />, path: '/service-management/service-requests' },
      { id: 'change-release', labelKey: 'nav.changeRelease', defaultLabel: 'Change Management', icon: <GitBranch size={16} />, path: '/service-management/changes' },
      { id: 'major-problems', labelKey: 'nav.majorProblems', defaultLabel: 'Problem Management', icon: <AlertCircle size={16} />, path: '/service-management/problems' },
      { id: 'knowledge-mgmt', labelKey: 'nav.knowledgeBase', defaultLabel: 'Knowledge Management', icon: <BookOpen size={16} />, path: '/knowledge' },
      { id: 'operational-rca', labelKey: 'nav.operationalRCA', defaultLabel: 'Critical Operations', icon: <FileCheck size={16} />, path: '/service-management/rca' },
      { id: 'service-desk-overview', labelKey: 'nav.serviceDeskOverview', defaultLabel: 'Service Operations Overview', icon: <Ticket size={16} />, path: '/service-management/service-desk' },
    ],
  },
  {
    id: 'application-services',
    labelKey: 'nav.applicationServices',
    defaultLabel: 'Application Services',
    icon: <Layers size={18} />,
    defaultPath: '/applications',
    children: [
      { id: 'app-health', labelKey: 'nav.applicationHealth', defaultLabel: 'Application Health', icon: <Activity size={16} />, path: '/applications/health' },
      { id: 'business-service-health', labelKey: 'nav.businessServiceHealth', defaultLabel: 'Business Service Health', icon: <CheckCircle2 size={16} />, path: '/applications/business-service-health' },
      { id: 'app-portfolio', labelKey: 'nav.applicationPortfolio', defaultLabel: 'Application Portfolio', icon: <Layers size={16} />, path: '/applications/portfolio' },
      { id: 'app-incidents', labelKey: 'nav.applicationIncidents', defaultLabel: 'Application Incidents', icon: <AlertTriangle size={16} />, path: '/applications/incidents' },
      { id: 'app-problems', labelKey: 'nav.applicationProblemsRCA', defaultLabel: 'Application Problems & RCA', icon: <FileCheck size={16} />, path: '/applications/problems' },
      { id: 'app-changes', labelKey: 'nav.applicationChangesReleases', defaultLabel: 'Application Changes & Releases', icon: <GitBranch size={16} />, path: '/applications/changes' },
      { id: 'app-dependencies', labelKey: 'nav.applicationDependencies', defaultLabel: 'Application Dependencies', icon: <Network size={16} />, path: '/applications/dependencies' },
      { id: 'app-performance', labelKey: 'nav.applicationPerformance', defaultLabel: 'Application Performance', icon: <Monitor size={16} />, path: '/applications/performance' },
      { id: 'app-support', labelKey: 'nav.applicationSupportCoverage', defaultLabel: 'Application Support Coverage', icon: <Users size={16} />, path: '/applications/support' },
    ],
  },
  {
    id: 'technology-estate',
    labelKey: 'nav.technologyEstate',
    defaultLabel: 'Technology Estate',
    icon: <Cpu size={18} />,
    defaultPath: '/technology/estate',
    children: [
      { id: 'servicenow-health', labelKey: 'nav.serviceNowHealth', defaultLabel: 'ServiceNow Health', icon: <Settings size={16} />, path: '/technology/servicenow' },
      { id: 'monitoring', labelKey: 'nav.monitoringObservability', defaultLabel: 'Monitoring & Observability', icon: <Activity size={16} />, path: '/technology/monitoring' },
      { id: 'devops', labelKey: 'nav.devopsAutomation', defaultLabel: 'DevOps & Automation', icon: <GitBranch size={16} />, path: '/technology/devops' },
      { id: 'security-tech', labelKey: 'nav.securityTechnology', defaultLabel: 'Security Technology', icon: <Shield size={16} />, path: '/technology/security' },
      { id: 'microsoft-estate', labelKey: 'nav.microsoftEstate', defaultLabel: 'Microsoft Estate', icon: <Monitor size={16} />, path: '/technology/microsoft' },
      { id: 'cloud-platforms', labelKey: 'nav.cloudPlatforms', defaultLabel: 'Cloud Platforms', icon: <Cloud size={16} />, path: '/technology/cloud-platforms' },
      { id: 'license-health', labelKey: 'nav.licenseEntitlement', defaultLabel: 'License & Entitlement Health', icon: <FileCheck size={16} />, path: '/technology/licenses' },
    ],
  },
  {
    id: 'infrastructure-health',
    labelKey: 'nav.infrastructureHealth',
    defaultLabel: 'Infrastructure Health',
    icon: <Server size={18} />,
    defaultPath: '/applications/infrastructure',
    children: [
      { id: 'infra-overview', labelKey: 'nav.infrastructureOverview', defaultLabel: 'Infrastructure Overview', icon: <Server size={16} />, path: '/applications/infrastructure' },
      { id: 'network-health', labelKey: 'nav.networkHealth', defaultLabel: 'Network Health', icon: <Network size={16} />, path: '/applications/network' },
      { id: 'database-health', labelKey: 'nav.databaseHealth', defaultLabel: 'Database Health', icon: <Database size={16} />, path: '/applications/database' },
      { id: 'container-health', labelKey: 'nav.containerPlatformHealth', defaultLabel: 'Container Platform Health', icon: <Container size={16} />, path: '/applications/containers' },
      { id: 'digital-workplace', labelKey: 'nav.digitalWorkplace', defaultLabel: 'Digital Workplace', icon: <Monitor size={16} />, path: '/applications/digital-workplace' },
    ],
  },
  {
    id: 'vendor-siam',
    labelKey: 'nav.vendorSIAM',
    defaultLabel: 'Vendor & SIAM',
    icon: <Building2 size={18} />,
    defaultPath: '/governance/vendors',
    children: [
      { id: 'vendor-perf', labelKey: 'nav.vendorPerformance', defaultLabel: 'Vendor Performance', icon: <Building2 size={16} />, path: '/governance/vendors' },
      { id: 'vendor-contracts', labelKey: 'nav.vendorContracts', defaultLabel: 'Vendor Contracts', icon: <FileText size={16} />, path: '/governance/vendors' },
      { id: 'siam-overview', labelKey: 'nav.siamOverview', defaultLabel: 'SIAM Overview', icon: <Layers size={16} />, path: '/governance/vendors' },
      { id: 'vendor-sla', labelKey: 'nav.vendorSLA', defaultLabel: 'Vendor SLA', icon: <Gauge size={16} />, path: '/governance/vendors' },
      { id: 'vendor-risks', labelKey: 'nav.vendorRisks', defaultLabel: 'Vendor Risks', icon: <AlertTriangle size={16} />, path: '/governance/risks' },
      { id: 'vendor-actions', labelKey: 'nav.vendorActions', defaultLabel: 'Vendor Actions', icon: <ClipboardCheck size={16} />, path: '/governance/vendors' },
    ],
  },
  {
    id: 'program-mgmt',
    labelKey: 'nav.programManagement',
    defaultLabel: 'Program Management',
    icon: <FolderKanban size={18} />,
    defaultPath: '/governance/programs',
    children: [
      { id: 'program-overview', labelKey: 'nav.programOverview', defaultLabel: 'Program Overview', icon: <FolderKanban size={16} />, path: '/governance/programs' },
      { id: 'issues-actions', labelKey: 'nav.issuesActions', defaultLabel: 'Issues & Actions', icon: <ClipboardCheck size={16} />, path: '/governance/approvals' },
      { id: 'risk-mgmt', labelKey: 'nav.riskManagement', defaultLabel: 'Risk Management', icon: <AlertTriangle size={16} />, path: '/governance/risks' },
      { id: 'milestones', labelKey: 'nav.milestones', defaultLabel: 'Milestones', icon: <CheckCircle2 size={16} />, path: '/governance/programs' },
      { id: 'dependencies', labelKey: 'nav.dependencies', defaultLabel: 'Dependencies', icon: <Network size={16} />, path: '/governance/programs' },
      { id: 'itms-reports', labelKey: 'nav.itmsReports', defaultLabel: 'ITMS WSR / MSR / DFR', icon: <FileSpreadsheet size={16} />, path: '/reporting/wsr' },
    ],
  },
  {
    id: 'resource-mobilization',
    labelKey: 'nav.resourceMobilization',
    defaultLabel: 'Resource Mobilization',
    icon: <UserPlus size={18} />,
    defaultPath: '/governance/resource-mobilization',
    children: [
      { id: 'mobilization-status', labelKey: 'nav.mobilizationStatus', defaultLabel: 'Mobilization Status', icon: <UserPlus size={16} />, path: '/governance/resource-mobilization' },
      { id: 'demand-capacity', labelKey: 'nav.demandCapacity', defaultLabel: 'Demand vs Capacity', icon: <BarChart3 size={16} />, path: '/governance/resource-mobilization' },
      { id: 'open-positions', labelKey: 'nav.openPositions', defaultLabel: 'Open Positions', icon: <Users size={16} />, path: '/governance/resource-mobilization' },
      { id: 'onboarding-offboarding', labelKey: 'nav.onboardingOffboarding', defaultLabel: 'Onboarding & Offboarding', icon: <UserCheck size={16} />, path: '/governance/resource-mobilization' },
      { id: 'replacement-kt', labelKey: 'nav.replacementKT', defaultLabel: 'Replacement & KT', icon: <ArrowRightLeft size={16} />, path: '/governance/resource-mobilization' },
    ],
  },
  {
    id: 'team-structure',
    labelKey: 'nav.teamStructure',
    defaultLabel: 'Team Structure',
    icon: <UsersRound size={18} />,
    defaultPath: '/governance/team-structure',
    children: [
      { id: 'org-structure', labelKey: 'nav.orgStructure', defaultLabel: 'Organization Structure', icon: <UsersRound size={16} />, path: '/governance/team-structure' },
      { id: 'tower-structure', labelKey: 'nav.towerStructure', defaultLabel: 'Tower Structure', icon: <Layers size={16} />, path: '/governance/team-structure' },
      { id: 'roles-responsibilities', labelKey: 'nav.rolesResponsibilities', defaultLabel: 'Roles & Responsibilities', icon: <FileText size={16} />, path: '/governance/team-structure' },
      { id: 'resource-distribution', labelKey: 'nav.resourceDistribution', defaultLabel: 'Resource Distribution', icon: <BarChart3 size={16} />, path: '/governance/team-structure' },
      { id: 'contact-directory-team', labelKey: 'nav.contactDirectory', defaultLabel: 'Contact Directory', icon: <Phone size={16} />, path: '/operations/contacts' },
    ],
  },
  {
    id: 'digital-transformation',
    labelKey: 'nav.digitalTransformation',
    defaultLabel: 'Digital Transformation & AI',
    icon: <Rocket size={18} />,
    defaultPath: '/transformation/automation',
    children: [
      { id: 'automation-initiatives', labelKey: 'nav.automationInitiatives', defaultLabel: 'Automation Initiatives', icon: <Bot size={16} />, path: '/transformation/automation' },
      { id: 'ai-initiatives', labelKey: 'nav.aiInitiatives', defaultLabel: 'AI Initiatives', icon: <Lightbulb size={16} />, path: '/transformation/ai' },
      { id: 'benefits-tracking', labelKey: 'nav.benefitsTracking', defaultLabel: 'Benefits Tracking', icon: <TrendingUp size={16} />, path: '/transformation/benefits' },
      { id: 'innovation-pipeline', labelKey: 'nav.innovationPipeline', defaultLabel: 'Innovation Pipeline', icon: <Rocket size={16} />, path: '/transformation/innovation' },
    ],
  },
  {
    id: 'management-reporting',
    labelKey: 'nav.managementReporting',
    defaultLabel: 'Management Reporting',
    icon: <BarChart3 size={18} />,
    defaultPath: '/reporting/wsr',
    children: [
      { id: 'wsr', labelKey: 'nav.weeklyStatusReport', defaultLabel: 'Weekly Status Report', icon: <FileText size={16} />, path: '/reporting/wsr' },
      { id: 'msr', labelKey: 'nav.monthlyServiceReport', defaultLabel: 'Monthly Service Report', icon: <FileSpreadsheet size={16} />, path: '/reporting/msr' },
      { id: 'executive-report', labelKey: 'nav.executiveReport', defaultLabel: 'Executive Report', icon: <BarChart3 size={16} />, path: '/reporting/executive' },
      { id: 'ai-analytics', labelKey: 'nav.aiAnalytics', defaultLabel: 'AI Analytics', icon: <Lightbulb size={16} />, path: '/reporting/ai-analytics' },
    ],
  },
  {
    id: 'finops',
    labelKey: 'nav.finopsCloudEconomics',
    defaultLabel: 'FinOps & Cloud Economics',
    icon: <DollarSign size={18} />,
    defaultPath: '/finops',
    children: [
      { id: 'cloud-spend', labelKey: 'nav.cloudSpend', defaultLabel: 'Cloud Spend', icon: <DollarSign size={16} />, path: '/finops' },
    ],
  },
  {
    id: 'audit-compliance',
    labelKey: 'nav.auditCompliance',
    defaultLabel: 'Audit & Compliance',
    icon: <ShieldCheck size={18} />,
    defaultPath: '/compliance/status',
    children: [
      { id: 'compliance-status', labelKey: 'nav.complianceStatus', defaultLabel: 'Compliance Status', icon: <ShieldCheck size={16} />, path: '/compliance/status' },
    ],
  },
  {
    id: 'sla-assurance',
    labelKey: 'nav.slaAssurance',
    defaultLabel: 'SLA Assurance',
    icon: <Gauge size={18} />,
    defaultPath: '/assurance/sla',
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, mobileOpen, onMobileClose }) => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const location = useLocation();

  // Track expanded parent tiles. Default open 'operational-services'.
  const [expandedParents, setExpandedParents] = useState<Set<string>>(new Set(['operational-services']));

  const toggleParent = (id: string, defaultPath?: string) => {
    setExpandedParents((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

    if (defaultPath) {
      try {
        navigate(defaultPath);
        onMobileClose();
      } catch (err) {
        console.warn('Navigation error:', err);
      }
    }
  };

  const isChildActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isParentActive = (tile: NavParentTile) => {
    if (tile.defaultPath && tile.defaultPath === '/' && location.pathname === '/') return true;
    if (tile.defaultPath && tile.defaultPath !== '/' && location.pathname.startsWith(tile.defaultPath)) return true;
    if (tile.children) {
      return tile.children.some((c) => isChildActive(c.path));
    }
    return false;
  };

  const getLabel = (key: string, fallback: string) => {
    const translated = t(key);
    return translated && translated !== key ? translated : fallback;
  };

  return (
    <>
      {mobileOpen && <div className="drawer-overlay" onClick={onMobileClose} />}
      <aside className={`app-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Top Branding Area with NCGR Logo */}
        <div className="sidebar-logo">
          <NCGRLogo height={32} variant={collapsed ? 'icon-only' : 'full'} />
        </div>

        {/* SINGLE-LINE PARENT NAVIGATION LIST (NO SECTION HEADINGS & NO DUPLICATE CHILD NAMES) */}
        <nav className="sidebar-nav" role="navigation" aria-label="Portal Navigation">
          {sidebarParentTiles.map((tile) => {
            const isExpanded = expandedParents.has(tile.id);
            const active = isParentActive(tile);
            const hasChildren = tile.children && tile.children.length > 0;

            return (
              <div key={tile.id} className="sidebar-parent-group">
                {/* Single-line Parent Navigation Tile */}
                <button
                  className={`sidebar-parent-tile ${active ? 'active' : ''}`}
                  onClick={() => toggleParent(tile.id, tile.defaultPath)}
                  title={collapsed ? getLabel(tile.labelKey, tile.defaultLabel) : undefined}
                  aria-expanded={hasChildren ? isExpanded : undefined}
                >
                  <span className="sidebar-item-icon">{tile.icon}</span>
                  {!collapsed && (
                    <span className="sidebar-parent-title">
                      {getLabel(tile.labelKey, tile.defaultLabel)}
                    </span>
                  )}
                  {!collapsed && hasChildren && (
                    <span className="sidebar-chevron">
                      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </span>
                  )}
                </button>

                {/* Expanded Child Items */}
                {!collapsed && hasChildren && isExpanded && (
                  <div className="sidebar-children-list">
                    {tile.children!.map((child) => {
                      const childActive = isChildActive(child.path);
                      return (
                        <button
                          key={child.id}
                          className={`sidebar-child-item ${childActive ? 'active' : ''}`}
                          onClick={() => {
                            try {
                              navigate(child.path);
                              onMobileClose();
                            } catch (err) {
                              console.warn('Child navigation error:', err);
                            }
                          }}
                        >
                          {child.icon && <span className="sidebar-child-icon">{child.icon}</span>}
                          <span>{getLabel(child.labelKey, child.defaultLabel)}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
