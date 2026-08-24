import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NCGRLogo from '../common/NCGRLogo';
import {
  LayoutDashboard, Users, Clock, ClipboardCheck, ArrowRightLeft,
  MessageSquare, CalendarDays, UserCheck, Phone, AlertTriangle,
  FileText, GitBranch, Activity, Network, Database,
  Cloud, Monitor, Settings, Shield, Bot,
  BookOpen, CheckCircle2, AlertCircle,
  Building2, FolderKanban, ShieldCheck, Gauge, Layers, Cpu, Server,
  ChevronDown, ChevronRight, KeyRound, GraduationCap, FolderArchive,
  Calendar, HardDrive, Terminal, Laptop, HelpCircle, FileQuestion,
  FileSearch, GitPullRequest, Zap, CheckSquare, Flag
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

// ─── MASTER FLAT NAVIGATION STRUCTURE (NO GROUP SPLIT) ───
const masterNavTiles: NavParentTile[] = [
  // 1. Executive Dashboard / Control Towers
  {
    id: 'executive-dashboard',
    labelKey: 'nav.executiveDashboard',
    defaultLabel: 'Executive Dashboard',
    icon: <LayoutDashboard size={18} />,
    defaultPath: '/',
  },

  // 2. Team Overview
  {
    id: 'team-overview',
    labelKey: 'nav.teamOverview',
    defaultLabel: 'Team Overview',
    icon: <Users size={18} />,
    defaultPath: '/team-overview',
    children: [
      { id: 'resource-data', labelKey: 'nav.resourceData', defaultLabel: 'Resource Data', icon: <Users size={15} />, path: '/team-overview/resource-data' },
      { id: 'team-structure', labelKey: 'nav.teamStructure', defaultLabel: 'Team Structure', icon: <Layers size={15} />, path: '/team-overview/team-structure' },
      { id: 'contact-directory', labelKey: 'nav.contactDirectory', defaultLabel: 'Contact Directory', icon: <Phone size={15} />, path: '/team-overview/contacts' },
      { id: 'leave-management', labelKey: 'nav.leaveManagement', defaultLabel: 'Leave Management', icon: <CalendarDays size={15} />, path: '/team-overview/leave' },
      { id: 'attendance', labelKey: 'nav.attendance', defaultLabel: 'Attendance', icon: <UserCheck size={15} />, path: '/team-overview/attendance' },
    ],
  },

  // 3. Shift Operations Log
  {
    id: 'shift-operations',
    labelKey: 'nav.shiftOperationsLog',
    defaultLabel: 'Shift Operations Log',
    icon: <Clock size={18} />,
    defaultPath: '/shift-operations',
    children: [
      { id: 'activity-checklist', labelKey: 'nav.activityChecklist', defaultLabel: 'Activity Checklist', icon: <ClipboardCheck size={15} />, path: '/shift-operations/activity-checklist' },
      { id: 'handover-logs', labelKey: 'nav.handoverLogs', defaultLabel: 'Handover Logs', icon: <ArrowRightLeft size={15} />, path: '/shift-operations/handover-logs' },
      { id: 'operations-mom', labelKey: 'nav.operationsMOM', defaultLabel: 'Operations MOM & Action Tracker', icon: <MessageSquare size={15} />, path: '/shift-operations/mom' },
    ],
  },

  // 4. Command Center
  {
    id: 'command-center',
    labelKey: 'nav.commandCenter',
    defaultLabel: 'Command Center',
    icon: <Activity size={18} />,
    defaultPath: '/command-center',
    children: [
      { id: 'service-desk-overview', labelKey: 'nav.serviceDeskOverview', defaultLabel: 'Service Desk Overview', icon: <Monitor size={15} />, path: '/command-center/service-desk' },
      { id: 'all-incidents', labelKey: 'nav.incidents', defaultLabel: 'Incidents Queue', icon: <AlertCircle size={15} />, path: '/command-center/incidents' },
      { id: 'critical-incidents', labelKey: 'nav.criticalIncidents', defaultLabel: 'Critical Incidents', icon: <AlertTriangle size={15} />, path: '/command-center/critical-incidents' },
      { id: 'service-requests', labelKey: 'nav.serviceRequests', defaultLabel: 'Service Requests', icon: <HelpCircle size={15} />, path: '/command-center/service-requests' },
      { id: 'change-requests', labelKey: 'nav.applicationChangesReleases', defaultLabel: 'Change Requests', icon: <GitPullRequest size={15} />, path: '/command-center/change-requests' },
      { id: 'major-problems', labelKey: 'nav.majorProblems', defaultLabel: 'Problems', icon: <FileQuestion size={15} />, path: '/command-center/problems' },
      { id: 'operational-rca', labelKey: 'nav.operationalRCA', defaultLabel: 'Operational RCA', icon: <FileSearch size={15} />, path: '/command-center/rca' },
      { id: 'knowledge-base', labelKey: 'nav.knowledgeBase', defaultLabel: 'Knowledge Base Repository', icon: <BookOpen size={15} />, path: '/command-center/knowledge' },
    ],
  },

  // 5. Application Services
  {
    id: 'application-services',
    labelKey: 'nav.applicationServices',
    defaultLabel: 'Application Services',
    icon: <Layers size={18} />,
    defaultPath: '/applications',
    children: [
      { id: 'app-health', labelKey: 'nav.applicationHealth', defaultLabel: 'Application Health', icon: <Activity size={15} />, path: '/applications/health' },
      { id: 'business-service-health', labelKey: 'nav.businessServiceHealth', defaultLabel: 'Business Service Health', icon: <CheckCircle2 size={15} />, path: '/applications/business-service-health' },
      { id: 'app-incidents', labelKey: 'nav.applicationIncidents', defaultLabel: 'Application Incidents', icon: <AlertTriangle size={15} />, path: '/applications/incidents' },
      { id: 'app-changes', labelKey: 'nav.applicationChangesReleases', defaultLabel: 'Application Changes & Releases', icon: <GitBranch size={15} />, path: '/applications/changes' },
      { id: 'app-dependencies', labelKey: 'nav.applicationDependencies', defaultLabel: 'Application Dependencies', icon: <Network size={15} />, path: '/applications/dependencies' },
      { id: 'app-performance', labelKey: 'nav.applicationPerformance', defaultLabel: 'Application Performance', icon: <Zap size={15} />, path: '/applications/performance' },
      { id: 'app-support', labelKey: 'nav.applicationSupportCoverage', defaultLabel: 'Application Support Coverage', icon: <Users size={15} />, path: '/applications/support' },
    ],
  },

  // 6. IT Support Tool Management
  {
    id: 'it-support-tools',
    labelKey: 'nav.itSupportToolManagement',
    defaultLabel: 'IT Support Tool Management',
    icon: <Cpu size={18} />,
    defaultPath: '/technology',
    children: [
      { id: 'servicenow-health', labelKey: 'nav.serviceNowHealth', defaultLabel: 'ServiceNow Health', icon: <Settings size={15} />, path: '/technology/servicenow' },
      { id: 'monitoring', labelKey: 'nav.monitoringObservability', defaultLabel: 'Monitoring & Observability', icon: <Activity size={15} />, path: '/technology/monitoring' },
      { id: 'devops', labelKey: 'nav.devopsAutomation', defaultLabel: 'DevOps & Automation', icon: <Terminal size={15} />, path: '/technology/devops' },
      { id: 'security-tech', labelKey: 'nav.securityTechnology', defaultLabel: 'Security Technology', icon: <Shield size={15} />, path: '/technology/security' },
      { id: 'microsoft-estate', labelKey: 'nav.microsoftEstate', defaultLabel: 'Microsoft Estate', icon: <Laptop size={15} />, path: '/technology/microsoft' },
      { id: 'cloud-platforms', labelKey: 'nav.cloudPlatforms', defaultLabel: 'Cloud Platforms', icon: <Cloud size={15} />, path: '/technology/cloud-platforms' },
    ],
  },

  // 7. License & Entitlement Health
  {
    id: 'license-health',
    labelKey: 'nav.licenseEntitlementHealth',
    defaultLabel: 'License & Entitlement Health',
    icon: <KeyRound size={18} />,
    defaultPath: '/license-health',
  },

  // 8. Infrastructure Health
  {
    id: 'infrastructure-health',
    labelKey: 'nav.infrastructureHealth',
    defaultLabel: 'Infrastructure Health',
    icon: <Server size={18} />,
    defaultPath: '/infrastructure',
    children: [
      { id: 'infrastructure-overview', labelKey: 'nav.infrastructureOverview', defaultLabel: 'Infrastructure Health', icon: <Server size={15} />, path: '/infrastructure/overview' },
      { id: 'network-health', labelKey: 'nav.networkHealth', defaultLabel: 'Network Health', icon: <Network size={15} />, path: '/infrastructure/network' },
      { id: 'database-health', labelKey: 'nav.databaseHealth', defaultLabel: 'Database Health', icon: <Database size={15} />, path: '/infrastructure/database' },
      { id: 'vm-health', labelKey: 'nav.vmHealth', defaultLabel: 'VM Health', icon: <HardDrive size={15} />, path: '/infrastructure/vm' },
      { id: 'cloud-health', labelKey: 'nav.cloudHealth', defaultLabel: 'Cloud Health', icon: <Cloud size={15} />, path: '/infrastructure/cloud' },
      { id: 'digital-workplace', labelKey: 'nav.digitalWorkplace', defaultLabel: 'Digital Workplace', icon: <Monitor size={15} />, path: '/infrastructure/digital-workplace' },
    ],
  },

  // 9. Vendor & SIAM
  {
    id: 'vendor-siam',
    labelKey: 'nav.vendorSIAM',
    defaultLabel: 'Vendor & SIAM',
    icon: <Building2 size={18} />,
    defaultPath: '/vendor-siam',
    children: [
      { id: 'vendor-perf', labelKey: 'nav.vendorPerformance', defaultLabel: 'Vendor Performance', icon: <Building2 size={15} />, path: '/vendor-siam/performance' },
      { id: 'vendor-sla', labelKey: 'nav.vendorServiceSLA', defaultLabel: 'Vendor Service SLA', icon: <Gauge size={15} />, path: '/vendor-siam/sla' },
      { id: 'vendor-risks', labelKey: 'nav.vendorRisk', defaultLabel: 'Vendor Risk', icon: <AlertTriangle size={15} />, path: '/vendor-siam/risk' },
      { id: 'vendor-actions', labelKey: 'nav.vendorActions', defaultLabel: 'Vendor Actions', icon: <CheckSquare size={15} />, path: '/vendor-siam/actions' },
    ],
  },

  // 10. Program Management
  {
    id: 'program-mgmt',
    labelKey: 'nav.programManagement',
    defaultLabel: 'Program Management',
    icon: <FolderKanban size={18} />,
    defaultPath: '/program-management',
    children: [
      { id: 'program-overview', labelKey: 'nav.programOverview', defaultLabel: 'Program Overview', icon: <FolderKanban size={15} />, path: '/program-management/overview' },
      { id: 'milestones', labelKey: 'nav.milestones', defaultLabel: 'Milestones', icon: <Flag size={15} />, path: '/program-management/milestones' },
      { id: 'dependencies', labelKey: 'nav.dependencies', defaultLabel: 'Dependencies', icon: <GitBranch size={15} />, path: '/program-management/dependencies' },
      { id: 'issues-actions', labelKey: 'nav.issuesActions', defaultLabel: 'Issues & Actions', icon: <AlertCircle size={15} />, path: '/program-management/issues-actions' },
      { id: 'resource-mobilisation', labelKey: 'nav.resourceMobilisation', defaultLabel: 'Resource Mobilisation', icon: <Users size={15} />, path: '/program-management/resource-mobilisation' },
    ],
  },

  // 11. Digital Transformation & AI
  {
    id: 'digital-transformation',
    labelKey: 'nav.digitalTransformationAI',
    defaultLabel: 'Digital Transformation & AI',
    icon: <Bot size={18} />,
    defaultPath: '/transformation',
  },

  // 12. Audit & Compliance
  {
    id: 'audit-compliance',
    labelKey: 'nav.auditCompliance',
    defaultLabel: 'Audit & Compliance',
    icon: <ShieldCheck size={18} />,
    defaultPath: '/compliance',
  },

  // 13. SLA Assurance
  {
    id: 'sla-assurance',
    labelKey: 'nav.slaAssurance',
    defaultLabel: 'SLA Assurance',
    icon: <Gauge size={18} />,
    defaultPath: '/assurance/sla',
  },

  // 14. Saudization Tracker
  {
    id: 'saudization-tracker',
    labelKey: 'nav.saudizationTracker',
    defaultLabel: 'Saudization Tracker',
    icon: <UserCheck size={18} />,
    defaultPath: '/saudization-tracker',
  },

  // 15. Saudi Empowerment Academy
  {
    id: 'learning-curriculum',
    labelKey: 'nav.learningCurriculum',
    defaultLabel: 'Learning & Certification Curriculum',
    icon: <GraduationCap size={18} />,
    defaultPath: '/saudi-empowerment',
  },

  // 16. Central Reports Repository (Repos)
  {
    id: 'repos',
    labelKey: 'nav.repos',
    defaultLabel: 'Repos',
    icon: <FolderArchive size={18} />,
    defaultPath: '/repos',
    children: [
      { id: 'repo-all', labelKey: 'nav.repos', defaultLabel: 'Reports Repository', icon: <FolderArchive size={15} />, path: '/repos' },
      { id: 'repo-wsr', labelKey: 'nav.reporting', defaultLabel: 'Weekly Status Report (WSR)', icon: <FileText size={15} />, path: '/reports/wsr' },
      { id: 'repo-msr', labelKey: 'nav.reporting', defaultLabel: 'Monthly Service Review (MSR)', icon: <FileText size={15} />, path: '/reports/msr' },
      { id: 'repo-exec', labelKey: 'nav.reporting', defaultLabel: 'Executive Q3 Brief', icon: <ShieldCheck size={15} />, path: '/reports/executive' },
    ],
  },

  // 17. Governance Calendar
  {
    id: 'central-calendar',
    labelKey: 'nav.operations',
    defaultLabel: 'Meeting Governance Calendar',
    icon: <Calendar size={18} />,
    defaultPath: '/calendar',
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, mobileOpen, onMobileClose }) => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const location = useLocation();

  // Track expanded parent tiles.
  const [expandedParents, setExpandedParents] = useState<Set<string>>(new Set(['team-overview']));

  const isChildActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path + '/'));
  };

  const isParentActive = (tile: NavParentTile) => {
    if (tile.defaultPath && tile.defaultPath === '/' && location.pathname === '/') return true;
    if (tile.defaultPath && tile.defaultPath !== '/' && location.pathname === tile.defaultPath) return true;
    if (tile.children) {
      return tile.children.some((c) => isChildActive(c.path));
    }
    if (tile.defaultPath && tile.defaultPath !== '/' && location.pathname.startsWith(tile.defaultPath)) {
      return true;
    }
    return false;
  };

  // Automatically expand parent of the current active route
  useEffect(() => {
    masterNavTiles.forEach((tile) => {
      if (tile.children && isParentActive(tile)) {
        setExpandedParents((prev) => {
          if (!prev.has(tile.id)) {
            const next = new Set(prev);
            next.add(tile.id);
            return next;
          }
          return prev;
        });
      }
    });
  }, [location.pathname]);

  const toggleParent = (id: string, defaultPath?: string, e?: React.MouseEvent) => {
    e?.stopPropagation();

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

  const handleChevronToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedParents((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleChildNavigate = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      navigate(path);
      onMobileClose();
    } catch (err) {
      console.warn('Child navigation error:', err);
    }
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

        {/* MASTER SINGLE-LINE PARENT NAVIGATION LIST (FLAT TILES WITH ACCORDION CHILDREN) */}
        <nav className="sidebar-nav" role="navigation" aria-label="Portal Navigation">
          {masterNavTiles.map((tile) => {
            const isExpanded = expandedParents.has(tile.id);
            const active = isParentActive(tile);
            const hasChildren = Boolean(tile.children && tile.children.length > 0);
            const label = getLabel(tile.labelKey, tile.defaultLabel);

            return (
              <div key={tile.id} className="sidebar-parent-group">
                {/* Single-line Parent Navigation Tile */}
                <button
                  type="button"
                  className={`sidebar-parent-tile ${active ? 'active' : ''}`}
                  onClick={(e) => toggleParent(tile.id, tile.defaultPath, e)}
                  title={collapsed ? label : undefined}
                  aria-expanded={hasChildren ? isExpanded : undefined}
                >
                  <span className="sidebar-item-icon">{tile.icon}</span>
                  {!collapsed && (
                    <span className="sidebar-parent-title">
                      {label}
                    </span>
                  )}
                  {!collapsed && hasChildren && (
                    <span
                      className="sidebar-chevron"
                      onClick={(e) => handleChevronToggle(tile.id, e)}
                      title={isExpanded ? 'Collapse section' : 'Expand section'}
                    >
                      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </span>
                  )}
                </button>

                {/* Expanded Sub-tiles (Children) */}
                {!collapsed && hasChildren && isExpanded && (
                  <div className="sidebar-children-list">
                    {tile.children!.map((child) => {
                      const childActive = isChildActive(child.path);
                      const childLabel = getLabel(child.labelKey, child.defaultLabel);

                      return (
                        <button
                          key={child.id}
                          type="button"
                          className={`sidebar-child-item ${childActive ? 'active' : ''}`}
                          title={childLabel}
                          onClick={(e) => handleChildNavigate(child.path, e)}
                        >
                          {child.icon && <span className="sidebar-child-icon">{child.icon}</span>}
                          <span className="sidebar-child-label">{childLabel}</span>
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
