import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export interface SiblingPageItem {
  id: string;
  title: string;
  path: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface SubPageHeaderProps {
  moduleTitle: string;
  modulePath: string;
  pageTitle: string;
  pageSubtitle?: string;
  siblingPages?: SiblingPageItem[];
  actions?: React.ReactNode;
}

export const SubPageHeader: React.FC<SubPageHeaderProps> = ({
  moduleTitle,
  modulePath,
  pageTitle,
  pageSubtitle,
  siblingPages = [],
  actions,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ marginBottom: 24 }}>
      {/* Top Breadcrumb & Back Link */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8125rem' }}>
          <button
            onClick={() => navigate(modulePath)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 10px',
              borderRadius: 6,
              background: 'var(--bg-secondary, #F1F5F9)',
              border: '1px solid var(--border, #E4E7EC)',
              color: 'var(--ncgr-deep-blue, #074A76)',
              fontWeight: 700,
              fontSize: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            title={`Return to ${moduleTitle} landing page`}
          >
            <ArrowLeft size={13} />
            <span>Back to {moduleTitle}</span>
          </button>

          <span style={{ color: 'var(--text-tertiary, #98A2B3)' }}>|</span>

          <span
            onClick={() => navigate(modulePath)}
            style={{ color: 'var(--text-secondary, #475467)', cursor: 'pointer', fontWeight: 600 }}
          >
            {moduleTitle}
          </span>

          <ChevronRight size={13} color="var(--text-tertiary, #98A2B3)" />

          <span style={{ fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)' }}>
            {pageTitle}
          </span>
        </div>

        {actions && <div>{actions}</div>}
      </div>

      {/* Main Page Title Header */}
      <div style={{ marginBottom: siblingPages.length > 0 ? 14 : 0 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 4px' }}>
          {pageTitle}
        </h1>
        {pageSubtitle && (
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #475467)', margin: 0 }}>
            {pageSubtitle}
          </p>
        )}
      </div>

      {/* Sibling Sub-Page Navigation Strip */}
      {siblingPages.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
            alignItems: 'center',
            paddingBottom: 8,
            borderBottom: '1px solid var(--border, #E4E7EC)',
          }}
          className="subpage-nav-strip"
        >
          {siblingPages.map((sibling) => {
            const isActive = location.pathname === sibling.path ||
                             (sibling.path !== modulePath && location.pathname.startsWith(sibling.path));

            return (
              <button
                key={sibling.id}
                onClick={() => navigate(sibling.path)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  border: isActive ? '1px solid var(--ncgr-deep-blue, #074A76)' : '1px solid var(--border, #E4E7EC)',
                  background: isActive ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--card-bg, #FFFFFF)',
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary, #475467)',
                  fontWeight: isActive ? 700 : 600,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                  flexShrink: 0,
                }}
              >
                {sibling.icon && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>{sibling.icon}</span>}
                <span>{sibling.title}</span>
                {sibling.badge && (
                  <span
                    style={{
                      fontSize: '0.625rem',
                      padding: '1px 6px',
                      borderRadius: 10,
                      background: isActive ? 'rgba(255,255,255,0.25)' : 'var(--bg-secondary, #F1F5F9)',
                      color: isActive ? '#FFFFFF' : 'var(--text-secondary, #475467)',
                    }}
                  >
                    {sibling.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SubPageHeader;
