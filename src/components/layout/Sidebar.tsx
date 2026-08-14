import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NCGRLogo from '../common/NCGRLogo';
import {
  LayoutDashboard, Users, Clock, ClipboardCheck, ArrowRightLeft,
  MessageSquare, CalendarDays, UserCheck, Phone, AlertTriangle,
  FileText, GitBranch, FileCheck, Activity, Network, Database,
  Container, Cloud, Monitor, Settings, Shield, Bot,
  BookOpen, CheckCircle2, AlertCircle,
  Building2, FolderKanban, ShieldCheck, Gauge, Layers, Cpu, Server,
  ChevronDown, ChevronRight, KeyRound
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

// ─── FINAL MASTER NAVIGATION STRUCTURE (13 PARENT TILES) ───
export const sidebarParentTiles: NavParentTile[] = [
  {
    id: 'executive-dashboard',
    labelKey: 'nav.executiveDashboard',
    defaultLabel: 'Executive Dashboard',
    icon: <LayoutDashboard size={18} />,
    defaultPath: '/',
  },
  {
    id: 'team-overview',
    labelKey: 'nav.teamOverview',
    defaultLabel: 'Team Overview',
    icon: <Users size={18} />,
    defaultPath: '/team-overview/resource-data',
    children: [
      { id: 'resource-data', labelKey: 'nav.resourceData', defaultLabel: 'Resource Data', icon: <Users size={16} />, path: '/team-overview/resource-data' },
      { id: 'team-structure', labelKey: 'nav.teamStructure', defaultLabel: 'Team Structure', icon: <Layers size={16} />, path: '/team-overview/team-structure' },
      { id: 'contact-directory', labelKey: 'nav.contactDirectory', defaultLabel: 'Contact Directory', icon: <Phone size={16} />, path: '/team-overview/contacts' },
      { id: 'leave-management', labelKey: 'nav.leaveManagement', defaultLabel: 'Leave Management', icon: <CalendarDays size={16} />, path: '/team-overview/leave' },
      { id: 'attendance', labelKey: 'nav.attendance', defaultLabel: 'Attendance', icon: <UserCheck size={16} />, path: '/team-overview/attendance' },
    ],
  },
  {
    id: 'shift-operations',
    labelKey: 'nav.shiftOperationsLog',
    defaultLabel: 'Shift Operations Log',
    icon: <Clock size={18} />,
    defaultPath: '/shift-operations/activity-checklist',
    children: [
      { id: 'activity-checklist', labelKey: 'nav.activityChecklist', defaultLabel: 'Activity Checklist', icon: <ClipboardCheck size={16} />, path: '/shift-operations/activity-checklist' },
      { id: 'handover-logs', labelKey: 'nav.handoverLogs', defaultLabel: 'Handover Logs', icon: <ArrowRightLeft size={16} />, path: '/shift-operations/handover-logs' },
      { id: 'operations-mom', labelKey: 'nav.operationsMOM', defaultLabel: 'Operations MOM & Action Tracker', icon: <MessageSquare size={16} />, path: '/shift-operations/mom' },
    ],
  },
  {
    id: 'command-center',
    labelKey: 'nav.commandCenter',
    defaultLabel: 'Command Center',
    icon: <Activity size={18} />,
    defaultPath: '/command-center/service-desk',
    children: [
      { id: 'service-desk-overview', labelKey: 'nav.serviceDeskOverview', defaultLabel: 'Service Desk Overview', icon: <Monitor size={16} />, path: '/command-center/service-desk' },
      { id: 'all-incidents', labelKey: 'nav.incidents', defaultLabel: 'Incidents', icon: <AlertCircle size={16} />, path: '/command-center/incidents' },
      { id: 'critical-incidents', labelKey: 'nav.criticalIncidents', defaultLabel: 'Critical Incidents', icon: <AlertTriangle size={16} />, path: '/command-center/critical-incidents' },
      { id: 'service-requests', labelKey: 'nav.serviceRequests', defaultLabel: 'Service Request', icon: <FileText size={16} />, path: '/command-center/service-requests' },
      { id: 'major-problems', labelKey: 'nav.majorProblems', defaultLabel: 'Major Problems', icon: <AlertCircle size={16} />, path: '/command-center/problems' },
      { id: 'operational-rca', labelKey: 'nav.operationalRCA', defaultLabel: 'Operational RCA', icon: <FileCheck size={16} />, path: '/command-center/rca' },
      { id: 'knowledge-base', labelKey: 'nav.knowledgeBase', defaultLabel: 'Knowledge Base Repository', icon: <BookOpen size={16} />, path: '/command-center/knowledge' },
    ],
  },
  {
    id: 'application-services',
    labelKey: 'nav.applicationServices',
    defaultLabel: 'Application Services',
    icon: <Layers size={18} />,
    defaultPath: '/applications/health',
    children: [
      { id: 'app-health', labelKey: 'nav.applicationHealth', defaultLabel: 'Application Health', icon: <Activity size={16} />, path: '/applications/health' },
      { id: 'business-service-health', labelKey: 'nav.businessServiceHealth', defaultLabel: 'Business Service Health', icon: <CheckCircle2 size={16} />, path: '/applications/business-service-health' },
      { id: 'app-incidents', labelKey: 'nav.applicationIncidents', defaultLabel: 'Application Incidents', icon: <AlertTriangle size={16} />, path: '/applications/incidents' },
      { id: 'app-changes', labelKey: 'nav.applicationChangesReleases', defaultLabel: 'Application Changes & Releases', icon: <GitBranch size={16} />, path: '/applications/changes' },
      { id: 'app-dependencies', labelKey: 'nav.applicationDependencies', defaultLabel: 'Application Dependencies', icon: <Network size={16} />, path: '/applications/dependencies' },
      { id: 'app-performance', labelKey: 'nav.applicationPerformance', defaultLabel: 'Application Performance', icon: <Monitor size={16} />, path: '/applications/performance' },
      { id: 'app-support', labelKey: 'nav.applicationSupportCoverage', defaultLabel: 'Application Support Coverage', icon: <Users size={16} />, path: '/applications/support' },
    ],
  },
  {
    id: 'it-support-tools',
    labelKey: 'nav.itSupportToolManagement',
    defaultLabel: 'IT Support Tool Management',
    icon: <Cpu size={18} />,
    defaultPath: '/technology/servicenow',
    children: [
      { id: 'servicenow-health', labelKey: 'nav.serviceNowHealth', defaultLabel: 'ServiceNow Health', icon: <Settings size={16} />, path: '/technology/servicenow' },
      { id: 'monitoring', labelKey: 'nav.monitoringObservability', defaultLabel: 'Monitoring & Observability', icon: <Activity size={16} />, path: '/technology/monitoring' },
      { id: 'devops', labelKey: 'nav.devopsAutomation', defaultLabel: 'DevOps & Automation', icon: <GitBranch size={16} />, path: '/technology/devops' },
      { id: 'security-tech', labelKey: 'nav.securityTechnology', defaultLabel: 'Security Technology', icon: <Shield size={16} />, path: '/technology/security' },
      { id: 'microsoft-estate', labelKey: 'nav.microsoftEstate', defaultLabel: 'Microsoft Estate', icon: <Monitor size={16} />, path: '/technology/microsoft' },
      { id: 'cloud-platforms', labelKey: 'nav.cloudPlatforms', defaultLabel: 'Cloud Platforms', icon: <Cloud size={16} />, path: '/technology/cloud-platforms' },
    ],
  },
  {
    id: 'license-health',
    labelKey: 'nav.licenseEntitlementHealth',
    defaultLabel: 'License & Entitlement Health',
    icon: <KeyRound size={18} />,
    defaultPath: '/license-health',
  },
  {
    id: 'infrastructure-health',
    labelKey: 'nav.infrastructureHealth',
    defaultLabel: 'Infrastructure Health',
    icon: <Server size={18} />,
    defaultPath: '/infrastructure/overview',
    children: [
      { id: 'infra-overview', labelKey: 'nav.infrastructureOverview', defaultLabel: 'Infrastructure Health', icon: <Server size={16} />, path: '/infrastructure/overview' },
      { id: 'network-health', labelKey: 'nav.networkHealth', defaultLabel: 'Network Health', icon: <Network size={16} />, path: '/infrastructure/network' },
      { id: 'database-health', labelKey: 'nav.databaseHealth', defaultLabel: 'Database Health', icon: <Database size={16} />, path: '/infrastructure/database' },
      { id: 'vm-health', labelKey: 'nav.vmHealth', defaultLabel: 'VM Health', icon: <Container size={16} />, path: '/infrastructure/vm' },
      { id: 'cloud-health', labelKey: 'nav.cloudHealth', defaultLabel: 'Cloud Health', icon: <Cloud size={16} />, path: '/infrastructure/cloud' },
      { id: 'digital-workplace', labelKey: 'nav.digitalWorkplace', defaultLabel: 'Digital Workplace', icon: <Monitor size={16} />, path: '/infrastructure/digital-workplace' },
    ],
  },
  {
    id: 'vendor-siam',
    labelKey: 'nav.vendorSIAM',
    defaultLabel: 'Vendor & SIAM',
    icon: <Building2 size={18} />,
    defaultPath: '/vendor-siam/performance',
    children: [
      { id: 'vendor-perf', labelKey: 'nav.vendorPerformance', defaultLabel: 'Vendor Performance', icon: <Building2 size={16} />, path: '/vendor-siam/performance' },
      { id: 'vendor-sla', labelKey: 'nav.vendorServiceSLA', defaultLabel: 'Vendor Service SLA', icon: <Gauge size={16} />, path: '/vendor-siam/sla' },
      { id: 'vendor-risks', labelKey: 'nav.vendorRisk', defaultLabel: 'Vendor Risk', icon: <AlertTriangle size={16} />, path: '/vendor-siam/risk' },
      { id: 'vendor-actions', labelKey: 'nav.vendorActions', defaultLabel: 'Vendor Actions', icon: <ClipboardCheck size={16} />, path: '/vendor-siam/actions' },
    ],
  },
  {
    id: 'program-mgmt',
    labelKey: 'nav.programManagement',
    defaultLabel: 'Program Management',
    icon: <FolderKanban size={18} />,
    defaultPath: '/program-management/overview',
    children: [
      { id: 'program-overview', labelKey: 'nav.programOverview', defaultLabel: 'Program Overview', icon: <FolderKanban size={16} />, path: '/program-management/overview' },
      { id: 'milestones', labelKey: 'nav.milestones', defaultLabel: 'Milestones', icon: <CheckCircle2 size={16} />, path: '/program-management/milestones' },
      { id: 'dependencies', labelKey: 'nav.dependencies', defaultLabel: 'Dependencies', icon: <Network size={16} />, path: '/program-management/dependencies' },
      { id: 'issues-actions', labelKey: 'nav.issuesActions', defaultLabel: 'Issues & Actions', icon: <ClipboardCheck size={16} />, path: '/program-management/issues-actions' },
      { id: 'resource-mobilisation', labelKey: 'nav.resourceMobilisation', defaultLabel: 'Resource Mobilisation', icon: <Users size={16} />, path: '/program-management/resource-mobilisation' },
    ],
  },
  {
    id: 'digital-transformation',
    labelKey: 'nav.digitalTransformationAI',
    defaultLabel: 'Digital Transformation & AI',
    icon: <Bot size={18} />,
    defaultPath: '/transformation',
  },
  {
    id: 'audit-compliance',
    labelKey: 'nav.auditCompliance',
    defaultLabel: 'Audit & Compliance',
    icon: <ShieldCheck size={18} />,
    defaultPath: '/compliance',
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

  // Track expanded parent tiles.
  const [expandedParents, setExpandedParents] = useState<Set<string>>(new Set(['team-overview']));

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
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isParentActive = (tile: NavParentTile) => {
    if (tile.defaultPath && tile.defaultPath === '/' && location.pathname === '/') return true;
    if (tile.defaultPath && tile.defaultPath !== '/' && location.pathname === tile.defaultPath) return true;
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

        {/* SINGLE-LINE PARENT NAVIGATION LIST (FLAT TILES WITH ACCORDION CHILDREN) */}
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
                      const label = getLabel(child.labelKey, child.defaultLabel);
                      return (
                        <button
                          key={child.id}
                          className={`sidebar-child-item ${childActive ? 'active' : ''}`}
                          title={label}
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
                          <span className="sidebar-child-label">{label}</span>
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
