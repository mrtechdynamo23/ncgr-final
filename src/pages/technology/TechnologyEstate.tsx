import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { technologyPlatforms, getTechStats, type TechnologyPlatform } from '../../data/technology';
import {
  AlertCircle, AlertTriangle, CheckCircle2, Cpu,
  X, Search, Filter
} from 'lucide-react';

const categories = [
  'All',
  'ITSM / ITOM / ITAM / CMDB',
  'Monitoring & Observability',
  'DevOps & Automation',
  'Container Platform',
  'Security & Resilience',
  'Digital Workplace',
  'Cloud',
  'Enterprise Applications',
  'End User Computing',
];

const TechnologyEstate: React.FC = () => {
  const { t } = useTranslation(['common', 'technology']);
  const stats = getTechStats();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<TechnologyPlatform | null>(null);

  const filtered = technologyPlatforms.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const HealthBadge = ({ health }: { health: string }) => {
    const map: Record<string, { label: string; cls: string }> = {
      healthy: { label: t('common.healthy'), cls: 'healthy' },
      'at-risk': { label: t('common.atRisk'), cls: 'at-risk' },
      attention: { label: t('common.attention'), cls: 'attention' },
      degraded: { label: t('common.degraded'), cls: 'degraded' },
      critical: { label: t('common.critical'), cls: 'critical' },
      'data-stale': { label: t('common.dataStale'), cls: 'data-stale' },
    };
    const s = map[health] || map.healthy;
    return <span className={`health-badge ${s.cls}`}><span className="badge-dot" />{s.label}</span>;
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">{t('technology:technologyEstate.title')}</h1>
            <p className="page-subtitle">Management-level view of the entire NCGR technology stack</p>
          </div>
          <span className="simulated-badge">{t('app.simulatedHealth')}</span>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="kpi-grid">
        {[
          { label: t('technology:technologyEstate.platformsMonitored'), value: stats.total, accent: '#074A76', icon: <Cpu size={18} /> },
          { label: t('technology:technologyEstate.healthyPlatforms'), value: stats.healthy, accent: '#22A06B', icon: <CheckCircle2 size={18} /> },
          { label: t('technology:technologyEstate.platformsAtRisk'), value: stats.atRisk, accent: '#E97F0A', icon: <AlertCircle size={18} /> },
          { label: t('technology:technologyEstate.criticalExceptions'), value: stats.totalExceptions, accent: '#DE350B', icon: <AlertTriangle size={18} /> },
        ].map((kpi, idx) => (
          <div key={idx} className="kpi-card" style={{ cursor: 'default' }}>
            <div className="kpi-card-accent" style={{ background: kpi.accent }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <span className="kpi-card-label">{kpi.label}</span>
              <span style={{ color: kpi.accent, opacity: 0.6 }}>{kpi.icon}</span>
            </div>
            <div className="kpi-card-value">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <Filter size={14} style={{ color: 'var(--text-tertiary)' }} />
        <select
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <div style={{ position: 'relative', flex: 1, maxWidth: 300 }}>
          <Search size={14} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            placeholder="Search platforms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '6px 10px 6px 28px',
              background: 'var(--input-bg)', border: '1px solid var(--input-border)',
              borderRadius: 'var(--border-radius-md)', color: 'var(--text)', fontSize: '0.75rem',
              outline: 'none',
            }}
          />
        </div>
        <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginLeft: 'auto' }}>
          {filtered.length} {t('common.of')} {technologyPlatforms.length} platforms
        </span>
      </div>

      {/* Technology Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {filtered.map((platform) => (
          <div
            key={platform.id}
            className="tech-card"
            onClick={() => setSelectedPlatform(platform)}
            role="button"
            tabIndex={0}
          >
            <div className="tech-card-header">
              <div>
                <div className="tech-card-name">{platform.name}</div>
                <div className="tech-card-purpose">{platform.purpose}</div>
              </div>
              <HealthBadge health={platform.health} />
            </div>
            <div className="tech-card-metrics">
              <div className="tech-card-metric">
                <div className="tech-card-metric-label">{t('technology:technologyEstate.coverage')}</div>
                <div className="tech-card-metric-value">{platform.coverage}</div>
              </div>
              <div className="tech-card-metric">
                <div className="tech-card-metric-label">{t('technology:technologyEstate.criticalAlerts')}</div>
                <div className="tech-card-metric-value">{platform.criticalAlerts}</div>
              </div>
              <div className="tech-card-metric">
                <div className="tech-card-metric-label">{t('technology:technologyEstate.dataFreshness')}</div>
                <div className="tech-card-metric-value">{platform.dataFreshness}</div>
              </div>
              <div className="tech-card-metric">
                <div className="tech-card-metric-label">{t('common.exceptions')}</div>
                <div className="tech-card-metric-value">{platform.openExceptions}</div>
              </div>
            </div>
            <div className="tech-card-footer">
              <span>{platform.owner}</span>
              <span>{t('app.source')}: {platform.source}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Drawer */}
      {selectedPlatform && (
        <>
          <div className="drawer-overlay" onClick={() => setSelectedPlatform(null)} />
          <div className="drawer" role="dialog" aria-label="Platform details">
            <div className="drawer-header">
              <div>
                <h3 className="drawer-title">{selectedPlatform.name}</h3>
                <div style={{ marginTop: 4, display: 'flex', gap: 8, alignItems: 'center' }}>
                  <HealthBadge health={selectedPlatform.health} />
                  <span className="simulated-badge">{selectedPlatform.healthLabel}</span>
                </div>
              </div>
              <button className="drawer-close" onClick={() => setSelectedPlatform(null)} aria-label={t('common.close')}>
                <X size={18} />
              </button>
            </div>
            <div className="drawer-body">
              {[
                { label: 'Category', value: selectedPlatform.category },
                { label: 'Purpose', value: selectedPlatform.purpose },
                { label: 'Coverage', value: selectedPlatform.coverage },
                { label: 'Data Freshness', value: selectedPlatform.dataFreshness },
                { label: 'Last Refresh', value: selectedPlatform.lastRefresh },
                { label: 'Critical Alerts', value: String(selectedPlatform.criticalAlerts) },
                { label: 'Open Exceptions', value: String(selectedPlatform.openExceptions) },
                { label: 'Trend', value: selectedPlatform.trend },
                { label: 'Owner', value: selectedPlatform.owner },
                { label: 'Source', value: selectedPlatform.source },
                { label: 'Data Confidence', value: selectedPlatform.confidence },
              ].map((field) => (
                <div key={field.label} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 3 }}>
                    {field.label}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text)' }}>
                    {field.value}
                  </div>
                </div>
              ))}

              {selectedPlatform.modules && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
                    Modules
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {selectedPlatform.modules.map((mod) => (
                      <span key={mod} style={{
                        padding: '3px 10px', background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)', borderRadius: 'var(--border-radius-md)',
                        fontSize: '0.6875rem', fontWeight: 500,
                      }}>
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedPlatform.metrics && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
                    Key Metrics
                  </div>
                  {Object.entries(selectedPlatform.metrics).map(([key, val]) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border)', fontSize: '0.75rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{key}</span>
                      <span style={{ fontWeight: 600 }}>{String(val)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ marginTop: 16, padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)', fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>
                {t('app.environment')}: {t('app.simulated')} · {t('app.futureIntegration')}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TechnologyEstate;
