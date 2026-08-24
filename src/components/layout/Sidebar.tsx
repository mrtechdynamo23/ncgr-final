import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NCGRLogo from '../common/NCGRLogo';
import {
  LayoutDashboard, Users, Activity, Layers, Server,
  Cpu, KeyRound, Building2, FolderKanban, ShieldCheck,
  Gauge, Bot, GraduationCap, UserCheck, FolderArchive,
  ChevronRight
} from 'lucide-react';

// ─── NAVIGATION ITEM DEFINITION ──────────────────────────────────
export interface NavItem {
  id: string;
  labelKey: string;
  defaultLabel: string;
  icon: React.ReactNode;
  path: string;
}

// ─── COLLAPSIBLE NAVIGATION GROUP ─────────────────────────────────
interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

// ─── TOP-LEVEL PERMANENT MODULES (NEVER COLLAPSED) ────────────────
const topItems: NavItem[] = [
  {
    id: 'executive-dashboard',
    labelKey: 'nav.executiveDashboard',
    defaultLabel: 'Executive Control Towers',
    icon: <LayoutDashboard size={18} />,
    path: '/',
  },
  {
    id: 'team-overview',
    labelKey: 'nav.teamOverview',
    defaultLabel: 'Team Overview',
    icon: <Users size={18} />,
    path: '/team-overview',
  },
  {
    id: 'command-center',
    labelKey: 'nav.commandCenter',
    defaultLabel: 'Command Center',
    icon: <Activity size={18} />,
    path: '/command-center',
  },
];

// ─── COLLAPSIBLE MODULE GROUPS ───────────────────────────────────
const collapsibleGroups: NavGroup[] = [
  {
    id: 'service-operations',
    label: 'SERVICE OPERATIONS',
    items: [
      {
        id: 'application-services',
        labelKey: 'nav.applicationServices',
        defaultLabel: 'Application Services',
        icon: <Layers size={18} />,
        path: '/applications',
      },
      {
        id: 'infrastructure-health',
        labelKey: 'nav.infrastructureHealth',
        defaultLabel: 'Infrastructure Health',
        icon: <Server size={18} />,
        path: '/infrastructure',
      },
      {
        id: 'it-support-tools',
        labelKey: 'nav.itSupportToolManagement',
        defaultLabel: 'IT Support Tool Management',
        icon: <Cpu size={18} />,
        path: '/technology',
      },
      {
        id: 'vendor-siam',
        labelKey: 'nav.vendorSIAM',
        defaultLabel: 'Vendor & SIAM',
        icon: <Building2 size={18} />,
        path: '/vendor-siam',
      },
    ],
  },
  {
    id: 'governance-assurance',
    label: 'GOVERNANCE & ASSURANCE',
    items: [
      {
        id: 'audit-compliance',
        labelKey: 'nav.auditCompliance',
        defaultLabel: 'Audit & Compliance',
        icon: <ShieldCheck size={18} />,
        path: '/compliance',
      },
      {
        id: 'sla-assurance',
        labelKey: 'nav.slaAssurance',
        defaultLabel: 'SLA Management',
        icon: <Gauge size={18} />,
        path: '/assurance/sla',
      },
      {
        id: 'program-mgmt',
        labelKey: 'nav.programManagement',
        defaultLabel: 'Program Management',
        icon: <FolderKanban size={18} />,
        path: '/program-management',
      },
      {
        id: 'license-health',
        labelKey: 'nav.licenseEntitlementHealth',
        defaultLabel: 'License & Entitlement Health',
        icon: <KeyRound size={18} />,
        path: '/license-health',
      },
    ],
  },
  {
    id: 'people-resources',
    label: 'PEOPLE & RESOURCES',
    items: [
      {
        id: 'saudization-tracker',
        labelKey: 'nav.saudizationTracker',
        defaultLabel: 'Saudization Tracker',
        icon: <UserCheck size={18} />,
        path: '/saudization-tracker',
      },
      {
        id: 'learning-curriculum',
        labelKey: 'nav.learningCurriculum',
        defaultLabel: 'Learning & Certification Curriculum',
        icon: <GraduationCap size={18} />,
        path: '/saudi-empowerment',
      },
    ],
  },
  {
    id: 'transformation-group',
    label: 'TRANSFORMATION',
    items: [
      {
        id: 'digital-transformation',
        labelKey: 'nav.digitalTransformationAI',
        defaultLabel: 'Digital Transformation & AI',
        icon: <Bot size={18} />,
        path: '/transformation',
      },
    ],
  },
  {
    id: 'reports-group',
    label: 'REPORTS',
    items: [
      {
        id: 'repos',
        labelKey: 'nav.repos',
        defaultLabel: 'Repos',
        icon: <FolderArchive size={18} />,
        path: '/repos',
      },
    ],
  },
];

// ─── Backward compat export ──────────────────────────────────────
export interface NavParentTile {
  id: string;
  labelKey: string;
  defaultLabel: string;
  icon: React.ReactNode;
  defaultPath?: string;
  children?: { id: string; labelKey: string; defaultLabel: string; icon?: React.ReactNode; path: string }[];
}
export const sidebarParentTiles: NavParentTile[] = [
  ...topItems.map(i => ({ ...i, defaultPath: i.path })),
  ...collapsibleGroups.flatMap(g => g.items.map(i => ({ ...i, defaultPath: i.path }))),
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

  // Collapsible Groups State (default all closed / collapsed)
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'service-operations': false,
    'governance-assurance': false,
    'people-resources': false,
    'transformation-group': false,
    'reports-group': false,
  });

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Automatically expand the section that contains the currently active route
  useEffect(() => {
    collapsibleGroups.forEach(group => {
      const hasActiveChild = group.items.some(item => isActive(item.path));
      if (hasActiveChild) {
        setExpandedGroups(prev => {
          if (!prev[group.id]) {
            return { ...prev, [group.id]: true };
          }
          return prev;
        });
      }
    });
  }, [location.pathname]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const getLabel = (key: string, fallback: string) => {
    const translated = t(key);
    return translated && translated !== key ? translated : fallback;
  };

  const renderNavItem = (item: NavItem) => {
    const active = isActive(item.path);
    return (
      <button
        key={item.id}
        className={`sidebar-parent-tile ${active ? 'active' : ''}`}
        title={collapsed ? getLabel(item.labelKey, item.defaultLabel) : undefined}
        onClick={() => {
          try {
            navigate(item.path);
            onMobileClose();
          } catch (err) {
            console.warn('Navigation error:', err);
          }
        }}
      >
        <span className="sidebar-item-icon">{item.icon}</span>
        {!collapsed && (
          <span className="sidebar-parent-title">
            {getLabel(item.labelKey, item.defaultLabel)}
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      {mobileOpen && <div className="drawer-overlay" onClick={onMobileClose} />}
      <aside className={`app-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Top Branding Area with NCGR Logo */}
        <div className="sidebar-logo">
          <NCGRLogo height={32} variant={collapsed ? 'icon-only' : 'full'} />
        </div>

        {/* HIERARCHICAL NAVIGATION WITH COLLAPSIBLE MODULE GROUPS */}
        <nav className="sidebar-nav" role="navigation" aria-label="Portal Navigation">
          {/* Top-level Permanent Modules */}
          {topItems.map(renderNavItem)}

          {/* Collapsible Module Groups */}
          {collapsibleGroups.map((group) => {
            const isExpanded = !!expandedGroups[group.id];

            return (
              <div key={group.id} className="sidebar-group">
                {!collapsed ? (
                  <button
                    type="button"
                    className="sidebar-group-header"
                    onClick={() => toggleGroup(group.id)}
                    aria-expanded={isExpanded}
                  >
                    <span className="sidebar-group-label">{group.label}</span>
                    <span className={`sidebar-group-chevron ${isExpanded ? 'expanded' : ''}`}>
                      <ChevronRight size={13} />
                    </span>
                  </button>
                ) : (
                  <div className="sidebar-group-divider" />
                )}

                <div className={`sidebar-collapsible-items ${collapsed || isExpanded ? 'expanded' : 'collapsed'}`}>
                  {group.items.map(renderNavItem)}
                </div>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
