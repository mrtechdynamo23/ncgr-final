import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface SubNavTab {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
}

interface SubNavTabsProps {
  tabs: SubNavTab[];
  /** Module title shown as a small label above the tabs */
  moduleTitle?: string;
}

/**
 * Reusable horizontal tab bar for in-page sub-navigation.
 * Shows sibling pages within a module so users can navigate
 * without needing sidebar dropdowns or accordions.
 */
const SubNavTabs: React.FC<SubNavTabsProps> = ({ tabs, moduleTitle }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{ marginBottom: 20 }}>
      {moduleTitle && (
        <div style={{
          fontSize: '0.6875rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: 'var(--text-secondary, #475467)',
          marginBottom: 6,
        }}>
          {moduleTitle}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          borderBottom: '2px solid var(--border, #E4E7EC)',
          paddingBottom: 0,
        }}
      >
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                fontSize: '0.8125rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--text-secondary, #475467)',
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--ncgr-deep-blue, #074A76)' : '2px solid transparent',
                marginBottom: -2,
                cursor: 'pointer',
                borderRadius: '4px 4px 0 0',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--ncgr-deep-blue, #074A76)';
                  e.currentTarget.style.background = 'rgba(7, 74, 118, 0.04)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--text-secondary, #475467)';
                  e.currentTarget.style.background = 'none';
                }
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SubNavTabs;
