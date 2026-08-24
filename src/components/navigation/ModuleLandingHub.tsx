import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface SubTileItem {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  path: string;
  kpiLabel?: string;
  kpiValue?: string;
  badge?: string;
  badgeType?: 'healthy' | 'info' | 'warning' | 'purple' | 'critical';
}

interface ModuleLandingHubProps {
  moduleTitle: string;
  moduleSubtitle?: string;
  categoryLabel?: string;
  subTiles: SubTileItem[];
  extraContent?: React.ReactNode;
}

export const ModuleLandingHub: React.FC<ModuleLandingHubProps> = ({
  moduleTitle,
  moduleSubtitle,
  categoryLabel,
  subTiles,
  extraContent,
}) => {
  const navigate = useNavigate();

  const getBadgeColors = (type?: string) => {
    switch (type) {
      case 'healthy':
        return { bg: '#E3FCEF', color: '#22A06B', border: 'rgba(34, 160, 107, 0.2)' };
      case 'warning':
        return { bg: '#FFF7E6', color: '#E97F0A', border: 'rgba(233, 127, 10, 0.25)' };
      case 'purple':
        return { bg: '#F3E8FF', color: '#671E75', border: 'rgba(103, 30, 117, 0.2)' };
      case 'critical':
        return { bg: '#FFEBE6', color: '#DE350B', border: 'rgba(222, 53, 11, 0.25)' };
      case 'info':
      default:
        return { bg: '#E6F4FC', color: '#074A76', border: 'rgba(7, 74, 118, 0.2)' };
    }
  };

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* ─── COMPACT MODULE HEADER ───────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(135deg, #074A76 0%, #05263F 100%)',
          borderRadius: 12,
          padding: '20px 24px',
          color: '#FFFFFF',
          marginBottom: 20,
          boxShadow: '0 4px 16px rgba(7, 74, 118, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          {categoryLabel && (
            <div style={{ marginBottom: 4 }}>
              <span
                style={{
                  fontSize: '0.625rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: 12,
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#CFDB51',
                }}
              >
                {categoryLabel}
              </span>
            </div>
          )}

          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              margin: '0 0 2px',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
            }}
          >
            {moduleTitle}
          </h1>

          {moduleSubtitle && (
            <p
              style={{
                fontSize: '0.8125rem',
                color: 'rgba(255, 255, 255, 0.85)',
                margin: 0,
              }}
            >
              {moduleSubtitle}
            </p>
          )}
        </div>

        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.8)', background: 'rgba(255, 255, 255, 0.1)', padding: '4px 12px', borderRadius: 20 }}>
          {subTiles.length} Workspaces Available
        </div>
      </div>

      {/* ─── SLEEK, DENSE OPERATIONAL TILES ──────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 14,
          marginBottom: 24,
        }}
      >
        {subTiles.map((tile, index) => {
          const badgeStyles = getBadgeColors(tile.badgeType);

          return (
            <div
              key={tile.id}
              onClick={() => navigate(tile.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(tile.path);
                }
              }}
              style={{
                background: 'var(--card-bg, #FFFFFF)',
                borderRadius: 10,
                border: '1px solid var(--border, #E4E7EC)',
                padding: '16px 18px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease',
                boxShadow: 'var(--card-shadow, 0 1px 3px rgba(0,0,0,0.03))',
                animationDelay: `${index * 40}ms`,
              }}
              className="subtile-card subtile-entrance"
            >
              <div>
                {/* Header: Icon + Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div
                    className="subtile-icon-wrapper"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: 'rgba(7, 74, 118, 0.08)',
                      color: 'var(--ncgr-deep-blue, #074A76)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {tile.icon}
                  </div>

                  {tile.badge && (
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 10,
                        background: badgeStyles.bg,
                        color: badgeStyles.color,
                        border: `1px solid ${badgeStyles.border}`,
                      }}
                    >
                      {tile.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '0.9375rem',
                    fontWeight: 800,
                    color: 'var(--text, #101828)',
                    margin: '0 0 8px',
                    lineHeight: 1.3,
                  }}
                >
                  {tile.title}
                </h3>

                {/* Primary Metric Answer First */}
                {tile.kpiValue && (
                  <div style={{ marginBottom: 4 }}>
                    <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)' }}>
                      {tile.kpiValue}
                    </div>
                    {tile.kpiLabel && (
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)', fontWeight: 600 }}>
                        {tile.kpiLabel}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Link Footer */}
              <div
                style={{
                  borderTop: '1px solid var(--border, #E4E7EC)',
                  paddingTop: 10,
                  marginTop: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  color: 'var(--ncgr-deep-blue, #074A76)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  gap: 4,
                }}
              >
                <span>Open Workspace</span>
                <ArrowRight size={13} className="subtile-arrow-icon" />
              </div>
            </div>
          );
        })}
      </div>

      {extraContent}
    </div>
  );
};

export default ModuleLandingHub;
