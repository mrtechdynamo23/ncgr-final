import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Activity, AlertTriangle, Shield, Users, FileCheck,
  Cpu, Bot, DollarSign, TrendingUp, TrendingDown, Minus,
  ChevronRight, X, Clock, ArrowUpRight, CheckCircle2,
  AlertCircle, Info, ExternalLink
} from 'lucide-react';
import { getTechStats } from '../data/technology';
import {
  incidents, managementExceptions, healthGrid,
  getIncidentStats,
  type HealthGridItem, type ManagementException
} from '../data/incidents';

const CommandCentre: React.FC = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [selectedDrawer, setSelectedDrawer] = useState<ManagementException | null>(null);

  const techStats = getTechStats();
  const incidentStats = getIncidentStats();

  // ─── KPI DATA ──────────────────────────────────────────
  const kpis = [
    {
      label: t('commandCentre.overallHealth'),
      value: '94.2%',
      trend: 'up' as const,
      trendText: '+0.8%',
      accent: '#22A06B',
      icon: <Activity size={18} />,
    },
    {
      label: t('commandCentre.criticalIncidents'),
      value: `${incidentStats.p1p2Open}`,
      trend: 'down' as const,
      trendText: `${incidentStats.p1} P1 · ${incidentStats.p2} P2`,
      accent: '#DE350B',
      icon: <AlertTriangle size={18} />,
      path: '/service-management/critical-incidents',
    },
    {
      label: t('commandCentre.openRisks'),
      value: '12',
      trend: 'stable' as const,
      trendText: '3 critical · 4 high',
      accent: '#E97F0A',
      icon: <Shield size={18} />,
      path: '/governance/risks',
    },
    {
      label: t('commandCentre.resourceCoverage'),
      value: '96.4%',
      trend: 'up' as const,
      trendText: '+1.2%',
      accent: '#074A76',
      icon: <Users size={18} />,
      path: '/operations/resource-roster',
    },
    {
      label: t('commandCentre.pendingApprovals'),
      value: '18',
      trend: 'down' as const,
      trendText: '5 urgent',
      accent: '#671E75',
      icon: <FileCheck size={18} />,
      path: '/governance/approvals',
    },
    {
      label: t('commandCentre.techExceptions'),
      value: `${techStats.totalExceptions}`,
      trend: 'stable' as const,
      trendText: `${techStats.atRisk} platforms at risk`,
      accent: '#CE813C',
      icon: <Cpu size={18} />,
      path: '/technology/estate',
    },
    {
      label: t('commandCentre.automationProgress'),
      value: '68%',
      trend: 'up' as const,
      trendText: '+5% this month',
      accent: '#671E75',
      icon: <Bot size={18} />,
      path: '/transformation/automation',
    },
    {
      label: t('commandCentre.cloudCostVariance'),
      value: '-2.7%',
      trend: 'up' as const,
      trendText: 'Under budget',
      accent: '#40904F',
      icon: <DollarSign size={18} />,
      path: '/finops',
    },
  ];

  const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
    if (trend === 'up') return <TrendingUp size={12} />;
    if (trend === 'down') return <TrendingDown size={12} />;
    return <Minus size={12} />;
  };

  const HealthBadge = ({ health }: { health: string }) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      healthy: { label: t('common.healthy'), className: 'healthy' },
      'at-risk': { label: t('common.atRisk'), className: 'at-risk' },
      attention: { label: t('common.attention'), className: 'attention' },
      degraded: { label: t('common.degraded'), className: 'degraded' },
      critical: { label: t('common.critical'), className: 'critical' },
      'data-stale': { label: t('common.dataStale'), className: 'data-stale' },
    };
    const s = statusMap[health] || statusMap.healthy;
    return (
      <span className={`health-badge ${s.className}`}>
        <span className="badge-dot" />
        {s.label}
      </span>
    );
  };

  const SeverityIcon = ({ severity }: { severity: string }) => {
    if (severity === 'critical') return <AlertTriangle size={16} style={{ color: 'var(--status-critical)' }} />;
    if (severity === 'warning') return <AlertCircle size={16} style={{ color: 'var(--status-at-risk)' }} />;
    return <Info size={16} style={{ color: 'var(--status-info)' }} />;
  };

  return (
    <div>
      {/* ─── PAGE HEADER ─────────────────────────────────── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title" style={{ color: 'var(--ncgr-deep-blue)' }}>
              {t('commandCentre.title')}
            </h1>
            <p className="page-subtitle">
              NCGR · {t('app.reportingPeriod')} · {t('app.env')}
            </p>
          </div>
          <div className="page-meta">
            <span className="simulated-badge">{t('app.demoData')}</span>
            <span className="page-meta-item">
              <Clock size={12} />
              {t('app.lastRefresh')}: 10:42 AM
            </span>
          </div>
        </div>
      </div>

      {/* ─── KPI CARDS ───────────────────────────────────── */}
      <div className="kpi-grid">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="kpi-card"
            onClick={() => kpi.path && navigate(kpi.path)}
            role="button"
            tabIndex={0}
            aria-label={`${kpi.label}: ${kpi.value}`}
          >
            <div className="kpi-card-accent" style={{ background: kpi.accent }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <span className="kpi-card-label">{kpi.label}</span>
              <span style={{ color: kpi.accent, opacity: 0.6 }}>{kpi.icon}</span>
            </div>
            <div className="kpi-card-value">{kpi.value}</div>
            <div className={`kpi-card-trend ${kpi.trend}`}>
              <TrendIcon trend={kpi.trend} />
              {kpi.trendText}
            </div>
          </div>
        ))}
      </div>

      {/* ─── HEALTH GRID ─────────────────────────────────── */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <h2 className="card-title">{t('commandCentre.healthGrid')}</h2>
          <span className="simulated-badge">{t('app.simulatedHealth')}</span>
        </div>
        <div className="health-grid">
          {healthGrid.map((item: HealthGridItem) => (
            <div
              key={item.domain}
              className="health-grid-card"
              onClick={() => navigate(item.path)}
              role="button"
              tabIndex={0}
              aria-label={`${item.domain}: ${item.health}`}
            >
              <div className="health-grid-card-domain">{item.domain}</div>
              <HealthBadge health={item.health} />
              <div className="health-grid-card-footer">
                <span className="health-grid-card-exceptions">
                  {item.exceptions > 0
                    ? `${item.exceptions} ${t('commandCentre.exceptions')}`
                    : t('commandCentre.noExceptions')}
                </span>
                <span className={`kpi-card-trend ${item.trend}`}>
                  <TrendIcon trend={item.trend} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── TWO-COLUMN: EXCEPTIONS + INCIDENTS ──────────── */}
      <div className="grid-2" style={{ marginBottom: 24, alignItems: 'flex-start' }}>
        {/* Management Attention Required */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title" style={{ color: 'var(--status-critical)' }}>
              <AlertTriangle size={16} style={{ marginRight: 8, verticalAlign: -2 }} />
              {t('commandCentre.managementAttention')}
            </h2>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>
              {managementExceptions.length} {t('common.items')}
            </span>
          </div>
          <div className="exception-list">
            {managementExceptions.slice(0, 5).map((exc) => (
              <div
                key={exc.id}
                className="exception-card"
                onClick={() => setSelectedDrawer(exc)}
                role="button"
                tabIndex={0}
              >
                <div className={`exception-card-severity ${exc.severity}`} />
                <div className="exception-card-content">
                  <div className="exception-card-title">
                    <SeverityIcon severity={exc.severity} />
                    <span style={{ marginLeft: 6 }}>{exc.title}</span>
                  </div>
                  <div className="exception-card-desc">{exc.description}</div>
                  <div className="exception-card-meta">
                    <span>{exc.owner}</span>
                    <span>·</span>
                    <span>{exc.timestamp}</span>
                    <span>·</span>
                    <span>{exc.sourceSystem}</span>
                  </div>
                </div>
                <ChevronRight size={14} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Critical Incident Summary */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              {t('commandCentre.incidentSummary')}
            </h2>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => navigate('/service-management/critical-incidents')}
            >
              {t('common.viewDetails')} <ArrowUpRight size={12} />
            </button>
          </div>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{t('common.priority')}</th>
                  <th style={{ minWidth: 200 }}>Title</th>
                  <th>{t('common.status')}</th>
                  <th>{t('common.owner')}</th>
                </tr>
              </thead>
              <tbody>
                {incidents.filter((i) => i.priority === 'P1' || i.priority === 'P2').map((inc) => (
                  <tr key={inc.id} className="clickable-row">
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>
                      {inc.id}
                    </td>
                    <td>
                      <span className={`health-badge ${inc.priority === 'P1' ? 'critical' : 'at-risk'}`}>
                        {inc.priority}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{inc.title}</div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginTop: 2 }}>
                        {inc.businessImpact}
                      </div>
                    </td>
                    <td>
                      <span className={`health-badge ${inc.status === 'In Progress' ? 'at-risk' : 'inactive'}`}>
                        {inc.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.75rem' }}>{inc.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '8px 0', fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>
            {t('app.source')}: ServiceNow · {t('app.environment')}: {t('app.simulated')}
          </div>
        </div>
      </div>

      {/* ─── TECHNOLOGY HEALTH OVERVIEW ──────────────────── */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <h2 className="card-title">{t('commandCentre.techHealthOverview')}</h2>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => navigate('/technology/estate')}
          >
            {t('common.viewDetails')} <ArrowUpRight size={12} />
          </button>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 size={16} style={{ color: 'var(--status-healthy)' }} />
            <span style={{ fontWeight: 600 }}>{techStats.healthy}</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{t('common.healthy')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertCircle size={16} style={{ color: 'var(--status-at-risk)' }} />
            <span style={{ fontWeight: 600 }}>{techStats.atRisk}</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{t('common.atRisk')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertTriangle size={16} style={{ color: 'var(--status-critical)' }} />
            <span style={{ fontWeight: 600 }}>{techStats.critical}</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{t('common.critical')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Cpu size={16} style={{ color: 'var(--text-tertiary)' }} />
            <span style={{ fontWeight: 600 }}>{techStats.total}</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Total Platforms</span>
          </div>
        </div>
        {/* Quick tech cards for at-risk platforms */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { name: 'SolarWinds Orion', health: 'attention' as const, detail: '3 interfaces requiring attention' },
            { name: 'OpenShift', health: 'at-risk' as const, detail: '2 nodes above 85% utilization' },
            { name: 'SafeNet MobilePASS', health: 'at-risk' as const, detail: 'MFA service exception' },
            { name: 'AppViewX', health: 'attention' as const, detail: 'Certificate renewal queue' },
            { name: 'Oracle Hyperion', health: 'attention' as const, detail: 'Performance degradation' },
          ].map((tech) => (
            <div
              key={tech.name}
              style={{
                padding: '10px 16px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--border-radius-md)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                flex: '1 1 180px',
              }}
              onClick={() => navigate('/technology/estate')}
            >
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{tech.name}</div>
              <HealthBadge health={tech.health} />
              <div style={{ color: 'var(--text-tertiary)', marginTop: 4, fontSize: '0.6875rem' }}>
                {tech.detail}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── EXCEPTION DETAIL DRAWER ─────────────────────── */}
      {selectedDrawer && (
        <>
          <div className="drawer-overlay" onClick={() => setSelectedDrawer(null)} />
          <div className="drawer" role="dialog" aria-label="Exception details">
            <div className="drawer-header">
              <div>
                <h3 className="drawer-title">{selectedDrawer.title}</h3>
                <span className={`health-badge ${selectedDrawer.severity}`} style={{ marginTop: 4 }}>
                  {selectedDrawer.severity.toUpperCase()}
                </span>
              </div>
              <button className="drawer-close" onClick={() => setSelectedDrawer(null)} aria-label={t('common.close')}>
                <X size={18} />
              </button>
            </div>
            <div className="drawer-body">
              {[
                { label: 'What happened', value: selectedDrawer.description },
                { label: 'Impact', value: selectedDrawer.impact },
                { label: 'Owner', value: selectedDrawer.owner },
                { label: 'Source System', value: selectedDrawer.sourceSystem },
                { label: 'Timestamp', value: selectedDrawer.timestamp },
                { label: 'Current Status', value: selectedDrawer.status },
                { label: 'Related Service', value: selectedDrawer.relatedService },
                { label: 'Related Technology', value: selectedDrawer.relatedTechnology },
                { label: 'Recommended Action', value: selectedDrawer.recommendedAction },
              ].map((field) => (
                <div key={field.label} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
                    {field.label}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text)' }}>
                    {field.value}
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 24, display: 'flex', gap: 8 }}>
                <button className="btn btn-primary btn-sm">
                  <ExternalLink size={12} /> Open in ServiceNow
                </button>
                <button className="btn btn-secondary btn-sm">
                  View Related Incident
                </button>
              </div>
              <div style={{ marginTop: 16, padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)', fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>
                <span className="simulated-badge" style={{ marginRight: 8 }}>{t('app.demoData')}</span>
                This is a demo exception. In production, this will link to the actual system of record.
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CommandCentre;
