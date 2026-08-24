import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NCGRLogo from '../common/NCGRLogo';
import {
  LayoutDashboard, Users, Activity, Layers, Server,
  Cpu, Building2, FolderKanban, ShieldCheck, Gauge,
  KeyRound, UserCheck, GraduationCap, Bot, FolderArchive,
  Calendar, ChevronDown, ChevronRight, FileText,
  AlertCircle, HelpCircle, FileQuestion, FileSearch, BookOpen,
  GitPullRequest, Zap, Network, Database, HardDrive, Cloud,
  Monitor, Terminal, Shield, Laptop, AlertTriangle, CheckSquare,
  Flag, GitBranch
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
  path: string;
  badge?: string;
  children?: NavChildItem[];
}

export const sidebarParentTiles: NavParentTile[] = [
  // 1. Executive Control Towers
  {
    id: 'executive-dashboard',
    labelKey: 'nav.executiveDashboard',
    defaultLabel: 'Executive Control Towers',
    icon: <LayoutDashboard size={18} />,
    path: '/',
  },

  // 2. Team Overview
  {
    id: 'team-overview',
    labelKey: 'nav.teamOverview',
    defaultLabel: 'Team Overview',
    icon: <Users size={18} />,
    path: '/team-overview',
    children: [
      { id: 'resource-data', labelKey: 'nav.resourceData', defaultLabel: 'Resource Data', icon: <Users size={15} />, path: '/team-overview/resource-data' },
      { id: 'team-structure', labelKey: 'nav.teamStructure', defaultLabel: 'Team Structure', icon: <Layers size={15} />, path: '/team-overview/team-structure' },
      { id: 'contact-directory', labelKey: 'nav.contactDirectory', defaultLabel: 'Contact Directory', icon: <Users size={15} />, path: '/team-overview/contacts' },
      { id: 'leave-management', labelKey: 'nav.leaveManagement', defaultLabel: 'Leave Management', icon: <Calendar size={15} />, path: '/team-overview/leave' },
      { id: 'shift-ops', labelKey: 'nav.shiftOperationsLog', defaultLabel: 'Shift Operations Log', icon: <Activity size={15} />, path: '/shift-operations' },
      { id: 'attendance', labelKey: 'nav.attendance', defaultLabel: 'Shift Attendance & Roster', icon: <UserCheck size={15} />, path: '/team-overview/attendance' },
    ],
  },

  // 3. Command Center
  {
    id: 'command-center',
    labelKey: 'nav.commandCenter',
    defaultLabel: 'Command Center',
    icon: <Activity size={18} />,
    path: '/command-center',
    children: [
      { id: 'service-desk', labelKey: 'nav.serviceDeskOverview', defaultLabel: 'Service Desk Overview', icon: <Activity size={15} />, path: '/command-center/service-desk' },
      { id: 'incidents', labelKey: 'nav.incidents', defaultLabel: 'Incidents Queue', icon: <AlertCircle size={15} />, path: '/command-center/incidents' },
      { id: 'critical-incidents', labelKey: 'nav.criticalIncidents', defaultLabel: 'Critical Incidents', icon: <AlertTriangle size={15} />, path: '/command-center/critical-incidents' },
      { id: 'service-requests', labelKey: 'nav.serviceRequests', defaultLabel: 'Service Requests', icon: <HelpCircle size={15} />, path: '/command-center/service-requests' },
      { id: 'change-requests', labelKey: 'nav.applicationChangesReleases', defaultLabel: 'Change Requests', icon: <GitPullRequest size={15} />, path: '/command-center/change-requests' },
      { id: 'problems', labelKey: 'nav.majorProblems', defaultLabel: 'Problems', icon: <FileQuestion size={15} />, path: '/command-center/problems' },
      { id: 'rca', labelKey: 'nav.operationalRCA', defaultLabel: 'Operational RCA', icon: <FileSearch size={15} />, path: '/command-center/rca' },
      { id: 'knowledge', labelKey: 'nav.knowledgeBase', defaultLabel: 'Knowledge Base', icon: <BookOpen size={15} />, path: '/command-center/knowledge' },
    ],
  },

  // 4. Application Services
  {
    id: 'application-services',
    labelKey: 'nav.applicationServices',
    defaultLabel: 'Application Services',
    icon: <Layers size={18} />,
    path: '/applications',
    children: [
      { id: 'app-health', labelKey: 'nav.applicationHealth', defaultLabel: 'Application Health', icon: <Layers size={15} />, path: '/applications/health' },
      { id: 'biz-health', labelKey: 'nav.businessServiceHealth', defaultLabel: 'Business Service Health', icon: <Activity size={15} />, path: '/applications/business-service-health' },
      { id: 'app-incidents', labelKey: 'nav.applicationIncidents', defaultLabel: 'Application Incidents', icon: <AlertCircle size={15} />, path: '/applications/incidents' },
      { id: 'app-changes', labelKey: 'nav.applicationChangesReleases', defaultLabel: 'Changes & Releases', icon: <GitPullRequest size={15} />, path: '/applications/changes' },
      { id: 'app-deps', labelKey: 'nav.applicationDependencies', defaultLabel: 'Dependencies', icon: <Network size={15} />, path: '/applications/dependencies' },
      { id: 'app-perf', labelKey: 'nav.applicationPerformance', defaultLabel: 'Performance', icon: <Zap size={15} />, path: '/applications/performance' },
      { id: 'app-support', labelKey: 'nav.applicationSupportCoverage', defaultLabel: 'Support Coverage', icon: <ShieldCheck size={15} />, path: '/applications/support' },
    ],
  },

  // 5. Infrastructure Health
  {
    id: 'infrastructure-health',
    labelKey: 'nav.infrastructureHealth',
    defaultLabel: 'Infrastructure Health',
    icon: <Server size={18} />,
    path: '/infrastructure',
    children: [
      { id: 'infra-overview', labelKey: 'nav.infrastructureOverview', defaultLabel: 'Infrastructure Overview', icon: <Server size={15} />, path: '/infrastructure/overview' },
      { id: 'infra-network', labelKey: 'nav.networkHealth', defaultLabel: 'Network Health', icon: <Network size={15} />, path: '/infrastructure/network' },
      { id: 'infra-db', labelKey: 'nav.databaseHealth', defaultLabel: 'Database Health', icon: <Database size={15} />, path: '/infrastructure/database' },
      { id: 'infra-vm', labelKey: 'nav.vmHealth', defaultLabel: 'VM Health', icon: <HardDrive size={15} />, path: '/infrastructure/vm' },
      { id: 'infra-cloud', labelKey: 'nav.cloudHealth', defaultLabel: 'Cloud Health', icon: <Cloud size={15} />, path: '/infrastructure/cloud' },
      { id: 'infra-workplace', labelKey: 'nav.digitalWorkplace', defaultLabel: 'Digital Workplace', icon: <Monitor size={15} />, path: '/infrastructure/digital-workplace' },
    ],
  },

  // 6. IT Support Tool Management
  {
    id: 'it-support-tools',
    labelKey: 'nav.itSupportToolManagement',
    defaultLabel: 'IT Support Tool Management',
    icon: <Cpu size={18} />,
    path: '/technology',
    children: [
      { id: 'tool-snow', labelKey: 'nav.serviceNowHealth', defaultLabel: 'ServiceNow Health', icon: <Cpu size={15} />, path: '/technology/servicenow' },
      { id: 'tool-mon', labelKey: 'nav.monitoringObservability', defaultLabel: 'Monitoring & Observability', icon: <Activity size={15} />, path: '/technology/monitoring' },
      { id: 'tool-devops', labelKey: 'nav.devopsAutomation', defaultLabel: 'DevOps & Automation', icon: <Terminal size={15} />, path: '/technology/devops' },
      { id: 'tool-sec', labelKey: 'nav.securityTechnology', defaultLabel: 'Security Technology', icon: <Shield size={15} />, path: '/technology/security' },
      { id: 'tool-msft', labelKey: 'nav.microsoftEstate', defaultLabel: 'Microsoft Estate', icon: <Laptop size={15} />, path: '/technology/microsoft' },
      { id: 'tool-cloud', labelKey: 'nav.cloudPlatforms', defaultLabel: 'Cloud Platforms', icon: <Cloud size={15} />, path: '/technology/cloud-platforms' },
    ],
  },

  // 7. Vendor & SIAM
  {
    id: 'vendor-siam',
    labelKey: 'nav.vendorSIAM',
    defaultLabel: 'Vendor & SIAM',
    icon: <Building2 size={18} />,
    path: '/vendor-siam',
    children: [
      { id: 'vendor-perf', labelKey: 'nav.vendorPerformance', defaultLabel: 'Vendor Performance', icon: <Building2 size={15} />, path: '/vendor-siam/performance' },
      { id: 'vendor-sla', labelKey: 'nav.vendorServiceSLA', defaultLabel: 'Vendor Service SLA', icon: <Gauge size={15} />, path: '/vendor-siam/sla' },
      { id: 'vendor-risk', labelKey: 'nav.vendorRisk', defaultLabel: 'Vendor Risk', icon: <AlertTriangle size={15} />, path: '/vendor-siam/risk' },
      { id: 'vendor-actions', labelKey: 'nav.vendorActions', defaultLabel: 'Vendor Actions', icon: <CheckSquare size={15} />, path: '/vendor-siam/actions' },
    ],
  },

  // 8. Audit & Compliance
  {
    id: 'audit-compliance',
    labelKey: 'nav.auditCompliance',
    defaultLabel: 'Audit & Compliance',
    icon: <ShieldCheck size={18} />,
    path: '/compliance',
  },

  // 9. SLA Management
  {
    id: 'sla-assurance',
    labelKey: 'nav.slaAssurance',
    defaultLabel: 'SLA Management',
    icon: <Gauge size={18} />,
    path: '/assurance/sla',
  },

  // 10. Program Management
  {
    id: 'program-mgmt',
    labelKey: 'nav.programManagement',
    defaultLabel: 'Program Management',
    icon: <FolderKanban size={18} />,
    path: '/program-management',
    children: [
      { id: 'prog-overview', labelKey: 'nav.programOverview', defaultLabel: 'Program Overview', icon: <FolderKanban size={15} />, path: '/program-management/overview' },
      { id: 'prog-milestones', labelKey: 'nav.milestones', defaultLabel: 'Milestones', icon: <Flag size={15} />, path: '/program-management/milestones' },
      { id: 'prog-deps', labelKey: 'nav.dependencies', defaultLabel: 'Dependencies', icon: <GitBranch size={15} />, path: '/program-management/dependencies' },
      { id: 'prog-issues', labelKey: 'nav.issuesActions', defaultLabel: 'Issues & Actions', icon: <AlertCircle size={15} />, path: '/program-management/issues-actions' },
      { id: 'prog-res-mob', labelKey: 'nav.resourceData', defaultLabel: 'Resource Mobilisation', icon: <Users size={15} />, path: '/program-management/resource-mobilisation' },
    ],
  },

  // 11. License & Entitlement Health
  {
    id: 'license-health',
    labelKey: 'nav.licenseEntitlementHealth',
    defaultLabel: 'License & Entitlement Health',
    icon: <KeyRound size={18} />,
    path: '/license-health',
  },

  // 12. Saudization Tracker
  {
    id: 'saudization-tracker',
    labelKey: 'nav.saudizationTracker',
    defaultLabel: 'Saudization Tracker',
    icon: <UserCheck size={18} />,
    path: '/saudization-tracker',
  },

  // 13. Saudi Empowerment Academy
  {
    id: 'learning-curriculum',
    labelKey: 'nav.learningCurriculum',
    defaultLabel: 'Learning & Certification Curriculum',
    icon: <GraduationCap size={18} />,
    path: '/saudi-empowerment',
  },

  // 14. Digital Transformation & AI
  {
    id: 'digital-transformation',
    labelKey: 'nav.digitalTransformationAI',
    defaultLabel: 'Digital Transformation & AI',
    icon: <Bot size={18} />,
    path: '/transformation',
  },

  // 15. Repos (Central Reports Repository)
  {
    id: 'repos',
    labelKey: 'nav.repos',
    defaultLabel: 'Repos',
    icon: <FolderArchive size={18} />,
    path: '/repos',
    children: [
      { id: 'repo-wsr', labelKey: 'nav.reporting', defaultLabel: 'Weekly Status Report (WSR)', icon: <FileText size={15} />, path: '/reports/wsr' },
      { id: 'repo-msr', labelKey: 'nav.reporting', defaultLabel: 'Monthly Service Review (MSR)', icon: <FileText size={15} />, path: '/reports/msr' },
      { id: 'repo-exec', labelKey: 'nav.reporting', defaultLabel: 'Executive Q3 Brief', icon: <ShieldCheck size={15} />, path: '/reports/executive' },
    ],
  },

  // 16. Governance Calendar
  {
    id: 'central-calendar',
    labelKey: 'nav.operations',
    defaultLabel: 'Meeting Governance Calendar',
    icon: <Calendar size={18} />,
    path: '/calendar',
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

  // Track expanded parent accordions (Set of module IDs)
  const [expandedParents, setExpandedParents] = useState<Set<string>>(new Set<string>());

  const isChildActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isParentActive = (tile: NavParentTile) => {
    if (tile.path === '/' && location.pathname === '/') return true;
    if (tile.path !== '/' && (location.pathname === tile.path || location.pathname.startsWith(tile.path + '/'))) return true;
    if (tile.children) {
      return tile.children.some((c) => isChildActive(c.path));
    }
    return false;
  };

  // Automatically expand parent of the current active route
  useEffect(() => {
    sidebarParentTiles.forEach((tile) => {
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

  const handleParentClick = (tile: NavParentTile, e: React.MouseEvent) => {
    e.stopPropagation();

    // Toggle expansion if it has children
    if (tile.children && tile.children.length > 0) {
      setExpandedParents((prev) => {
        const next = new Set(prev);
        if (next.has(tile.id)) {
          next.delete(tile.id);
        } else {
          next.add(tile.id);
        }
        return next;
      });
    }

    // Always navigate to the parent path
    try {
      navigate(tile.path);
      onMobileClose();
    } catch (err) {
      console.warn('Navigation error:', err);
    }
  };

  const handleChevronClick = (tile: NavParentTile, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedParents((prev) => {
      const next = new Set(prev);
      if (next.has(tile.id)) {
        next.delete(tile.id);
      } else {
        next.add(tile.id);
      }
      return next;
    });
  };

  const handleChildClick = (path: string, e: React.MouseEvent) => {
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

        {/* COMPREHENSIVE 16-MODULE NAVIGATION MENU */}
        <nav className="sidebar-nav" role="navigation" aria-label="Portal Navigation">
          {sidebarParentTiles.map((tile) => {
            const isExpanded = expandedParents.has(tile.id);
            const active = isParentActive(tile);
            const hasChildren = Boolean(tile.children && tile.children.length > 0);
            const label = getLabel(tile.labelKey, tile.defaultLabel);

            return (
              <div key={tile.id} className="sidebar-parent-group">
                {/* Parent Navigation Tile */}
                <button
                  type="button"
                  className={`sidebar-parent-tile ${active ? 'active' : ''}`}
                  onClick={(e) => handleParentClick(tile, e)}
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
                      onClick={(e) => handleChevronClick(tile, e)}
                      title={isExpanded ? 'Collapse section' : 'Expand section'}
                    >
                      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </span>
                  )}
                </button>

                {/* Expanded Child Items */}
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
                          onClick={(e) => handleChildClick(child.path, e)}
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
