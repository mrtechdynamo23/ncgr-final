import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  status?: 'healthy' | 'at-risk' | 'critical' | 'info' | 'neutral';
  onClick?: () => void;
  accentColor?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  status = 'neutral',
  onClick,
  accentColor,
}) => {
  const getStatusColor = () => {
    if (accentColor) return accentColor;
    switch (status) {
      case 'healthy':
        return '#22A06B';
      case 'at-risk':
        return '#E97F0A';
      case 'critical':
        return '#DE350B';
      case 'info':
        return '#074A76';
      default:
        return 'var(--ncgr-deep-blue, #074A76)';
    }
  };

  const color = getStatusColor();

  return (
    <div
      onClick={onClick}
      className="kpi-card"
      style={{
        padding: '20px',
        borderRadius: 12,
        background: 'var(--card-bg, #FFFFFF)',
        border: '1px solid var(--border, #E4E7EC)',
        boxShadow: 'var(--card-shadow, 0 1px 3px rgba(16, 24, 40, 0.05))',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Accent Strip */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: color,
        }}
      />

      {/* Header with Title & Icon */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span
          style={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--text-secondary, #475467)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {title}
        </span>
        {icon && (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: `${color}15`,
              color: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Main Metric Value */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
        <span
          style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: 'var(--text, #101828)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {value}
        </span>

        {trend && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              fontSize: '0.75rem',
              fontWeight: 700,
              color: trend === 'up' ? '#22A06B' : trend === 'down' ? '#DE350B' : '#64748B',
            }}
          >
            {trend === 'up' && <TrendingUp size={14} />}
            {trend === 'down' && <TrendingDown size={14} />}
            {trend === 'stable' && <Minus size={14} />}
            {trendValue && <span>{trendValue}</span>}
          </div>
        )}
      </div>

      {/* Subtitle / Footer Note */}
      {subtitle && (
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-tertiary, #98A2B3)',
            marginTop: 4,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default KPICard;
