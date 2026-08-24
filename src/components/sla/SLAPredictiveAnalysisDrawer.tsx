import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  X, TrendingUp, AlertTriangle, CheckCircle2,
  AlertCircle, HelpCircle, Search,
  ArrowRight, Info, Layers, ExternalLink,
  ArrowDownRight, ArrowUpRight
} from 'lucide-react';
import { type SLARecord } from '../../data/master-sla';
import {
  calculateSLAForecastReport,
  type SLAForecastItem,
  type SLAOverallForecastReport,
  type ForecastStatus,
  type ForecastConfidence
} from '../../services/slaForecastEngine';

interface SLAPredictiveAnalysisDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  slas: SLARecord[];
  onOpenSlaDetail?: (sla: SLARecord) => void;
}

export const SLAPredictiveAnalysisDrawer: React.FC<SLAPredictiveAnalysisDrawerProps> = ({
  isOpen,
  onClose,
  slas,
  onOpenSlaDetail,
}) => {
  const { t, i18n } = useTranslation('governance');
  const isRtl = i18n.language === 'ar';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>('ALL');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('ALL');
  const [selectedConfidenceFilter, setSelectedConfidenceFilter] = useState<string>('ALL');
  const [selectedSort, setSelectedSort] = useState<string>('risk_desc');
  const [selectedForecastItem, setSelectedForecastItem] = useState<SLAForecastItem | null>(null);

  // Calculate master report from complete SLA dataset
  const report: SLAOverallForecastReport = useMemo(() => {
    return calculateSLAForecastReport(slas);
  }, [slas]);

  // Set default selected item
  useEffect(() => {
    if (isOpen && report.topAtRisk.length > 0 && !selectedForecastItem) {
      setSelectedForecastItem(report.topAtRisk[0]);
    }
  }, [isOpen, report, selectedForecastItem]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered & Sorted SLAs for table
  const filteredForecasts = useMemo(() => {
    const list = report.allForecasts.filter(item => {
      if (searchTerm.trim() !== '') {
        const q = searchTerm.toLowerCase();
        const matches =
          item.slaId.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q) ||
          item.domain.toLowerCase().includes(q) ||
          item.currentActual.toLowerCase().includes(q) ||
          item.forecastValue.toLowerCase().includes(q) ||
          item.owner.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (selectedStatusFilter !== 'ALL' && item.forecastStatus !== selectedStatusFilter) {
        return false;
      }

      if (selectedDomainFilter !== 'ALL' && item.domain !== selectedDomainFilter) {
        return false;
      }

      if (selectedTypeFilter !== 'ALL') {
        if (selectedTypeFilter === 'Data-Driven' && !item.measurementType.includes('Data-Driven')) return false;
        if (selectedTypeFilter === 'Soft' && !item.measurementType.includes('Soft')) return false;
      }

      if (selectedConfidenceFilter !== 'ALL' && item.confidence !== selectedConfidenceFilter) {
        return false;
      }

      return true;
    });

    return list.sort((a, b) => {
      if (selectedSort === 'risk_desc') {
        return b.riskScore - a.riskScore;
      }
      if (selectedSort === 'forecast_asc') {
        return (parseFloat(a.forecastValue) || 0) - (parseFloat(b.forecastValue) || 0);
      }
      if (selectedSort === 'gap_asc') {
        return a.gapToTarget - b.gapToTarget;
      }
      if (selectedSort === 'status') {
        const order = { 'At Risk': 1, 'Watch': 2, 'Insufficient Evidence': 3, 'On Track': 4 };
        return (order[a.forecastStatus] || 5) - (order[b.forecastStatus] || 5);
      }
      if (selectedSort === 'confidence') {
        const order = { 'High': 1, 'Medium': 2, 'Low': 3, 'Insufficient Evidence': 4 };
        return (order[a.confidence] || 5) - (order[b.confidence] || 5);
      }
      if (selectedSort === 'name_asc') {
        return a.name.localeCompare(b.name);
      }
      return a.slaId.localeCompare(b.slaId);
    });
  }, [report.allForecasts, searchTerm, selectedStatusFilter, selectedDomainFilter, selectedTypeFilter, selectedConfidenceFilter, selectedSort]);

  const uniqueDomains = useMemo(() => {
    return Array.from(new Set(report.allForecasts.map(f => f.domain))).sort();
  }, [report.allForecasts]);

  const isFiltered =
    searchTerm.trim() !== '' ||
    selectedStatusFilter !== 'ALL' ||
    selectedDomainFilter !== 'ALL' ||
    selectedTypeFilter !== 'ALL' ||
    selectedConfidenceFilter !== 'ALL';

  if (!isOpen) return null;

  const getStatusBadge = (status: ForecastStatus) => {
    switch (status) {
      case 'On Track':
        return {
          bg: '#E3FCEF',
          color: '#22A06B',
          border: '#ABF5D1',
          icon: <CheckCircle2 size={12} color="#22A06B" />,
          label: t('slaPredictive.onTrack', 'On Track'),
        };
      case 'Watch':
        return {
          bg: '#FFF7E6',
          color: '#E97F0A',
          border: '#FFE380',
          icon: <AlertTriangle size={12} color="#E97F0A" />,
          label: t('slaPredictive.watch', 'Watch'),
        };
      case 'At Risk':
        return {
          bg: '#FFEBE6',
          color: '#DE350B',
          border: '#FFBDAD',
          icon: <AlertCircle size={12} color="#DE350B" />,
          label: t('slaPredictive.atRisk', 'At Risk'),
        };
      case 'Insufficient Evidence':
      default:
        return {
          bg: '#F1F5F9',
          color: '#64748B',
          border: '#CBD5E1',
          icon: <HelpCircle size={12} color="#64748B" />,
          label: t('slaPredictive.insufficientEvidence', 'Insufficient Evidence'),
        };
    }
  };

  const getConfidenceBadge = (confidence: ForecastConfidence) => {
    switch (confidence) {
      case 'High':
        return { bg: '#E3FCEF', color: '#22A06B', border: '#ABF5D1', label: 'High' };
      case 'Medium':
        return { bg: '#E6F4FC', color: '#074A76', border: '#B8E1F8', label: 'Medium' };
      case 'Low':
        return { bg: '#FFF7E6', color: '#E97F0A', border: '#FFE380', label: 'Low' };
      case 'Insufficient Evidence':
      default:
        return { bg: '#F1F5F9', color: '#64748B', border: '#CBD5E1', label: 'Insufficient Evidence' };
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 22, 40, 0.55)',
          backdropFilter: 'blur(4px)',
          zIndex: 1300,
        }}
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div
        dir={isRtl ? 'rtl' : 'ltr'}
        style={{
          position: 'fixed',
          top: 0,
          right: isRtl ? 'auto' : 0,
          left: isRtl ? 0 : 'auto',
          bottom: 0,
          width: '100%',
          maxWidth: 980,
          background: 'var(--surface-raised, #FFFFFF)',
          boxShadow: isRtl ? '12px 0 40px rgba(0, 0, 0, 0.2)' : '-12px 0 40px rgba(0, 0, 0, 0.2)',
          zIndex: 1301,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: isRtl ? 'slideInLeft 0.22s cubic-bezier(0.16, 1, 0.3, 1)' : 'slideInRight 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sla-predictive-title"
      >
        {/* ─── DRAWER HEADER ──────────────────────────────────────── */}
        <div
          style={{
            padding: '20px 28px',
            borderBottom: '1px solid var(--border, #E4E7EC)',
            background: 'var(--card-bg, #FFFFFF)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'rgba(7, 74, 118, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TrendingUp size={18} color="var(--ncgr-deep-blue, #074A76)" />
              </div>
              <h2
                id="sla-predictive-title"
                style={{
                  margin: 0,
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--text, #101828)',
                }}
              >
                {t('slaPredictive.title', 'SLA Predictive Analysis')}
              </h2>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: 6,
                  background: 'rgba(7, 74, 118, 0.1)',
                  color: 'var(--ncgr-deep-blue, #074A76)',
                  textTransform: 'uppercase',
                }}
              >
                {report.forecastPeriod}
              </span>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: '0.8125rem',
                color: 'var(--text-secondary, #475467)',
                lineHeight: 1.4,
              }}
            >
              {t('slaPredictive.subtitle', 'Forward-looking assessment of SLA assurance based on current performance and available operational evidence.')}
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 6,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close SLA Predictive Analysis drawer"
          >
            <X size={22} color="var(--text-tertiary, #98A2B3)" />
          </button>
        </div>

        {/* ─── DRAWER BODY ────────────────────────────────────────── */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 28px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            background: 'var(--bg, #F8FAFC)',
          }}
        >
          {/* 1. TOP EXECUTIVE SUMMARY (CURRENT VS FORECAST VS TARGET) */}
          <div
            style={{
              background: 'var(--card-bg, #FFFFFF)',
              borderRadius: 14,
              border: '1px solid var(--border, #E4E7EC)',
              padding: 20,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Overall Forecast Summary
                </span>
                <span style={{ fontSize: '0.6875rem', padding: '2px 6px', background: 'rgba(7, 74, 118, 0.08)', color: 'var(--ncgr-deep-blue, #074A76)', borderRadius: 4, fontWeight: 700 }}>
                  Master SLA Population ({report.totalSlas} SLAs)
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>
                  {t('slaPredictive.confidence', 'Forecast Confidence')}:
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: 6,
                    background: getConfidenceBadge(report.overallForecastConfidence).bg,
                    color: getConfidenceBadge(report.overallForecastConfidence).color,
                    border: `1px solid ${getConfidenceBadge(report.overallForecastConfidence).border}`,
                  }}
                >
                  {report.overallForecastConfidence}
                </span>
              </div>
            </div>

            {/* Current vs Forecast Visual Progression Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 14,
                position: 'relative',
              }}
            >
              {/* Card 1: Current Actual */}
              <div
                style={{
                  padding: '16px 18px',
                  borderRadius: 10,
                  background: 'var(--bg-secondary, #F1F5F9)',
                  border: '1px solid var(--border, #CBD5E1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>
                    {t('slaPredictive.currentAssurance', 'Current SLA Assurance')}
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>
                    {report.currentAssurancePct}%
                  </div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#22A06B', fontWeight: 700, marginTop: 8 }}>
                  {t('slaPredictive.target', 'Current Target')}: {report.baselineTargetPct}% (Passing)
                </div>
              </div>

              {/* Card 2: Next-Period Forecast (Modelled) */}
              <div
                style={{
                  padding: '16px 18px',
                  borderRadius: 10,
                  background: report.overallForecastStatus === 'At Risk'
                    ? '#FFF5F3'
                    : report.overallForecastStatus === 'Watch'
                    ? '#FFFBF0'
                    : '#F0FDF4',
                  border: `1px solid ${
                    report.overallForecastStatus === 'At Risk'
                      ? '#FFD1C7'
                      : report.overallForecastStatus === 'Watch'
                      ? '#FFE8A3'
                      : '#BBF7D0'
                  }`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>
                      {t('slaPredictive.forecastAssurance', 'Next-Period Forecast')}
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 3,
                        fontSize: '0.6875rem',
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: 4,
                        background: report.overallForecastStatus === 'At Risk'
                          ? '#FFEBE6'
                          : report.overallForecastStatus === 'Watch'
                          ? '#FFF7E6'
                          : '#E3FCEF',
                        color: report.overallForecastStatus === 'At Risk'
                          ? '#DE350B'
                          : report.overallForecastStatus === 'Watch'
                          ? '#E97F0A'
                          : '#22A06B',
                      }}
                    >
                      {report.overallForecastStatus === 'At Risk' && <ArrowDownRight size={12} />}
                      {report.overallForecastStatus === 'Watch' && <AlertTriangle size={12} />}
                      {report.overallForecastStatus === 'On Track' && <CheckCircle2 size={12} />}
                      {report.overallForecastStatus}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
                    <span
                      style={{
                        fontSize: '2rem',
                        fontWeight: 900,
                        color: report.overallForecastStatus === 'At Risk'
                          ? '#DE350B'
                          : report.overallForecastStatus === 'Watch'
                          ? '#E97F0A'
                          : '#22A06B',
                      }}
                    >
                      {report.forecastAssurancePct}%
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', fontWeight: 600 }}>
                      (Projected)
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', marginTop: 8 }}>
                  Delta vs Target: <strong style={{ color: report.forecastAssurancePct >= report.baselineTargetPct ? '#22A06B' : '#DE350B' }}>
                    {(report.forecastAssurancePct - report.baselineTargetPct >= 0 ? '+' : '') + (report.forecastAssurancePct - report.baselineTargetPct).toFixed(1)}%
                  </strong>
                </div>
              </div>

              {/* Card 3: Confidence & Uncertainty Explanation */}
              <div
                style={{
                  padding: '16px 18px',
                  borderRadius: 10,
                  background: 'var(--bg-secondary, #F1F5F9)',
                  border: '1px solid var(--border, #CBD5E1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>
                    Forecast Assurance Assessment
                  </div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text, #101828)', marginTop: 6, lineHeight: 1.4 }}>
                    {report.overallConfidenceReason}
                  </div>
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 8 }}>
                  100% Contract Dataset Analyzed Deterministically
                </div>
              </div>
            </div>

            {/* Risk Summary Counts Strip */}
            <div
              style={{
                marginTop: 16,
                paddingTop: 16,
                borderTop: '1px solid var(--border, #E4E7EC)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22A06B', flexShrink: 0 }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                  {t('slaPredictive.onTrack', 'On Track')}: <strong style={{ color: '#22A06B' }}>{report.counts.onTrack}</strong>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E97F0A', flexShrink: 0 }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                  {t('slaPredictive.watch', 'Watch')}: <strong style={{ color: '#E97F0A' }}>{report.counts.watch}</strong>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#DE350B', flexShrink: 0 }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                  {t('slaPredictive.atRisk', 'At Risk')}: <strong style={{ color: '#DE350B' }}>{report.counts.atRisk}</strong>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#64748B', flexShrink: 0 }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                  {t('slaPredictive.insufficientEvidence', 'Insufficient Evidence')}: <strong style={{ color: '#64748B' }}>{report.counts.insufficientEvidence}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* 2. HIGHEST FUTURE RISK & MOST LIKELY TO IMPROVE & DOMAIN BREAKDOWN */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 16 }}>
            {/* Top At-Risk Cards */}
            <div
              style={{
                background: 'var(--card-bg, #FFFFFF)',
                borderRadius: 12,
                border: '1px solid var(--border, #E4E7EC)',
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <AlertCircle size={16} color="#DE350B" />
                  <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 800, color: 'var(--text, #101828)', textTransform: 'uppercase' }}>
                    {t('slaPredictive.highestFutureRisk', 'Highest Future Risk')}
                  </h3>
                </div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)' }}>
                  Top {report.topAtRisk.length} Watchlist
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                {report.topAtRisk.map((item) => {
                  const badge = getStatusBadge(item.forecastStatus);
                  const isSelected = selectedForecastItem?.slaId === item.slaId;
                  return (
                    <div
                      key={item.slaId}
                      onClick={() => setSelectedForecastItem(item)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: 8,
                        background: isSelected ? 'rgba(7, 74, 118, 0.05)' : 'var(--bg-secondary, #F8FAFC)',
                        border: `1px solid ${isSelected ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--border, #E4E7EC)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)' }}>
                              {item.slaId}
                            </span>
                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)' }}>•</span>
                            <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
                              {item.domain}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginTop: 2, lineClamp: 1 }}>
                            {item.name}
                          </div>
                        </div>

                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: '0.6875rem',
                            fontWeight: 800,
                            padding: '2px 6px',
                            borderRadius: 4,
                            background: badge.bg,
                            color: badge.color,
                            border: `1px solid ${badge.border}`,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {badge.icon}
                          {badge.label}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6, fontSize: '0.75rem', flexWrap: 'wrap' }}>
                        <span style={{ color: 'var(--text-secondary, #475467)' }}>
                          Current: <strong>{item.currentActual}</strong>
                        </span>
                        <ArrowRight size={12} color="var(--text-tertiary, #98A2B3)" />
                        <span style={{ color: item.forecastStatus === 'At Risk' ? '#DE350B' : '#E97F0A', fontWeight: 700 }}>
                          Forecast: {item.forecastValue}
                        </span>
                        <span style={{ color: 'var(--text-tertiary, #98A2B3)', fontSize: '0.6875rem' }}>
                          (Target: {item.target})
                        </span>
                      </div>

                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', marginTop: 6, fontStyle: 'italic', lineHeight: 1.35 }}>
                        "{item.whyExplanation.slice(0, 110)}..."
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Most Likely to Improve & Domain Concentration */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Most Likely to Improve (if genuine candidates exist) */}
              {report.topImproving.length > 0 && (
                <div
                  style={{
                    background: 'var(--card-bg, #FFFFFF)',
                    borderRadius: 12,
                    border: '1px solid var(--border, #E4E7EC)',
                    padding: 16,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <ArrowUpRight size={16} color="#22A06B" />
                    <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 800, color: 'var(--text, #101828)', textTransform: 'uppercase' }}>
                      {t('slaPredictive.mostLikelyToImprove', 'Most Likely to Improve')}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {report.topImproving.map((item) => (
                      <div
                        key={item.slaId}
                        onClick={() => setSelectedForecastItem(item)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: 8,
                          background: 'rgba(34, 160, 107, 0.04)',
                          border: '1px solid rgba(34, 160, 107, 0.2)',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)' }}>
                            {item.slaId} • {item.name.slice(0, 42)}...
                          </span>
                          <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#22A06B', background: '#E3FCEF', padding: '2px 6px', borderRadius: 4 }}>
                            IMPROVING
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, fontSize: '0.75rem' }}>
                          <span style={{ color: 'var(--text-secondary, #475467)' }}>Current: {item.currentActual}</span>
                          <ArrowRight size={12} color="#22A06B" />
                          <span style={{ color: '#22A06B', fontWeight: 700 }}>Forecast: {item.forecastValue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highest Risk Domains Breakdown */}
              <div
                style={{
                  background: 'var(--card-bg, #FFFFFF)',
                  borderRadius: 12,
                  border: '1px solid var(--border, #E4E7EC)',
                  padding: 16,
                  flex: 1,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                  <Layers size={16} color="var(--ncgr-deep-blue, #074A76)" />
                  <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 800, color: 'var(--text, #101828)', textTransform: 'uppercase' }}>
                    Risk Concentration by Domain
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {report.domainSummaries.slice(0, 4).map((d) => (
                    <div
                      key={d.domain}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 8,
                        background: 'var(--bg-secondary, #F8FAFC)',
                        border: '1px solid var(--border, #E4E7EC)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                          {d.domain}
                        </span>
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 800,
                            padding: '2px 6px',
                            borderRadius: 4,
                            background: d.riskLevel === 'High' ? '#FFEBE6' : d.riskLevel === 'Medium' ? '#FFF7E6' : '#E3FCEF',
                            color: d.riskLevel === 'High' ? '#DE350B' : d.riskLevel === 'Medium' ? '#E97F0A' : '#22A06B',
                          }}
                        >
                          {d.riskLevel} Risk
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)' }}>
                        <span>Total: <strong>{d.total}</strong></span>
                        {d.atRisk > 0 && <span style={{ color: '#DE350B', fontWeight: 700 }}>• {d.atRisk} At Risk</span>}
                        {d.watch > 0 && <span style={{ color: '#E97F0A', fontWeight: 700 }}>• {d.watch} Watch</span>}
                        <span style={{ color: '#22A06B' }}>• {d.onTrack} On Track</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3. SELECTED SLA DETAIL PREDICTION PANEL */}
          {selectedForecastItem && (
            <div
              style={{
                background: 'linear-gradient(180deg, rgba(7, 74, 118, 0.04) 0%, rgba(7, 74, 118, 0.01) 100%)',
                borderRadius: 12,
                border: '1px solid rgba(7, 74, 118, 0.25)',
                padding: 20,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.8125rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', padding: '2px 8px', background: '#FFFFFF', borderRadius: 4, border: '1px solid var(--border, #E4E7EC)' }}>
                      {selectedForecastItem.slaId}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
                      {selectedForecastItem.domain}
                    </span>
                    <span style={{ fontSize: '0.6875rem', padding: '2px 6px', background: 'var(--bg-secondary, #F1F5F9)', borderRadius: 4, color: 'var(--text-secondary, #475569)', fontWeight: 600 }}>
                      {selectedForecastItem.measurementType}
                    </span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)' }}>
                      Owner: {selectedForecastItem.owner}
                    </span>
                  </div>
                  <h4 style={{ margin: '8px 0 0', fontSize: '1.0625rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
                    {selectedForecastItem.name}
                  </h4>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ textAlign: isRtl ? 'left' : 'right' }}>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 700 }}>
                      {t('slaPredictive.forecastStatus', 'Forecast Status')}
                    </div>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: '0.8125rem',
                        fontWeight: 800,
                        padding: '4px 10px',
                        borderRadius: 6,
                        background: getStatusBadge(selectedForecastItem.forecastStatus).bg,
                        color: getStatusBadge(selectedForecastItem.forecastStatus).color,
                        border: `1px solid ${getStatusBadge(selectedForecastItem.forecastStatus).border}`,
                        marginTop: 2,
                      }}
                    >
                      {getStatusBadge(selectedForecastItem.forecastStatus).icon}
                      {getStatusBadge(selectedForecastItem.forecastStatus).label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10, marginBottom: 14 }}>
                <div style={{ padding: 10, borderRadius: 8, background: '#FFFFFF', border: '1px solid var(--border, #E4E7EC)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', fontWeight: 700 }}>CURRENT ACTUAL</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 2 }}>
                    {selectedForecastItem.currentActual}
                  </div>
                </div>

                <div style={{ padding: 10, borderRadius: 8, background: '#FFFFFF', border: '1px solid var(--border, #E4E7EC)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', fontWeight: 700 }}>TARGET BASELINE</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text, #101828)', marginTop: 2 }}>
                    {selectedForecastItem.target}
                  </div>
                </div>

                <div style={{ padding: 10, borderRadius: 8, background: '#FFFFFF', border: '1px solid var(--border, #E4E7EC)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', fontWeight: 700 }}>CURRENT STATUS</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: selectedForecastItem.currentStatus === 'Met' ? '#22A06B' : selectedForecastItem.currentStatus === 'Not Met' ? '#DE350B' : '#64748B', marginTop: 2 }}>
                    {selectedForecastItem.currentStatus}
                  </div>
                </div>

                <div style={{ padding: 10, borderRadius: 8, background: '#FFFFFF', border: '1px solid var(--border, #E4E7EC)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', fontWeight: 700 }}>NEXT-PERIOD FORECAST</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: selectedForecastItem.forecastStatus === 'At Risk' ? '#DE350B' : selectedForecastItem.forecastStatus === 'Watch' ? '#E97F0A' : '#22A06B', marginTop: 2 }}>
                    {selectedForecastItem.forecastValue}
                  </div>
                </div>

                <div style={{ padding: 10, borderRadius: 8, background: '#FFFFFF', border: '1px solid var(--border, #E4E7EC)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', fontWeight: 700 }}>CONFIDENCE</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 2 }}>
                    {selectedForecastItem.confidence}
                  </div>
                </div>
              </div>

              {/* Why Explanation */}
              <div style={{ background: '#FFFFFF', borderRadius: 8, border: '1px solid var(--border, #E4E7EC)', padding: 12, marginBottom: 10 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', textTransform: 'uppercase', marginBottom: 4 }}>
                  {t('slaPredictive.whyExplanation', 'Why Is This SLA at Risk?')}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text, #101828)', lineHeight: 1.5 }}>
                  {selectedForecastItem.whyExplanation}
                </div>
              </div>

              {/* Key Operational Drivers */}
              <div style={{ background: '#FFFFFF', borderRadius: 8, border: '1px solid var(--border, #E4E7EC)', padding: 12, marginBottom: 10 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', textTransform: 'uppercase', marginBottom: 6 }}>
                  {t('slaPredictive.keyDrivers', 'Key Operational Drivers')}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {selectedForecastItem.keyDrivers.map((drv, idx) => (
                    <div key={idx} style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ color: 'var(--ncgr-deep-blue, #074A76)', fontWeight: 700 }}>•</span>
                      <span>{drv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Action */}
              <div style={{ background: 'rgba(7, 74, 118, 0.06)', borderRadius: 8, border: '1px solid rgba(7, 74, 118, 0.2)', padding: 12, marginBottom: onOpenSlaDetail ? 12 : 0 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', textTransform: 'uppercase', marginBottom: 4 }}>
                  {t('slaPredictive.recommendedAction', 'Recommended Action')}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text, #101828)', lineHeight: 1.45 }}>
                  {selectedForecastItem.recommendedAction}
                </div>
              </div>

              {onOpenSlaDetail && (
                <div style={{ display: 'flex', justifyContent: isRtl ? 'flex-start' : 'flex-end', marginTop: 10 }}>
                  <button
                    onClick={() => {
                      const matched = slas.find(s => s.slaId === selectedForecastItem.slaId);
                      if (matched) {
                        onOpenSlaDetail(matched);
                      }
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '7px 16px',
                      borderRadius: 6,
                      background: 'var(--ncgr-deep-blue, #074A76)',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 1px 3px rgba(7, 74, 118, 0.25)',
                    }}
                  >
                    <span>{t('slaPredictive.viewInSla', 'View in SLA Management')}</span>
                    <ExternalLink size={13} color="#FFFFFF" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 4. MASTER SLA PREDICTIVE TABLE */}
          <div
            style={{
              background: 'var(--card-bg, #FFFFFF)',
              borderRadius: 14,
              border: '1px solid var(--border, #E4E7EC)',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            {/* Table Control Bar */}
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid var(--border, #E4E7EC)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
                    All Master SLAs — Forward Assurance Forecast ({filteredForecasts.length} of {report.totalSlas})
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                    {isFiltered ? 'Filtered Forecast View — click any row to inspect drivers' : 'Overall Forecast Population — click any row to inspect drivers'}
                  </span>
                </div>

                {isFiltered && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedStatusFilter('ALL');
                      setSelectedDomainFilter('ALL');
                      setSelectedTypeFilter('ALL');
                      setSelectedConfidenceFilter('ALL');
                      setSelectedSort('risk_desc');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--ncgr-deep-blue, #074A76)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      padding: '4px 8px',
                    }}
                  >
                    Reset Filters
                  </button>
                )}
              </div>

              {/* Filter Controls Grid */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                {/* Search */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: '1px solid var(--border, #CBD5E1)',
                    background: 'var(--bg, #F8FAFC)',
                    flex: '1 1 180px',
                    minWidth: 160,
                  }}
                >
                  <Search size={14} color="var(--text-tertiary, #98A2B3)" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search SLA ID, name, domain..."
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '0.75rem',
                      width: '100%',
                    }}
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 6,
                    border: '1px solid var(--border, #CBD5E1)',
                    background: 'var(--bg, #F8FAFC)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <option value="ALL">All Forecast Statuses</option>
                  <option value="At Risk">At Risk</option>
                  <option value="Watch">Watch</option>
                  <option value="On Track">On Track</option>
                  <option value="Insufficient Evidence">Insufficient Evidence</option>
                </select>

                {/* Domain Filter */}
                <select
                  value={selectedDomainFilter}
                  onChange={(e) => setSelectedDomainFilter(e.target.value)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 6,
                    border: '1px solid var(--border, #CBD5E1)',
                    background: 'var(--bg, #F8FAFC)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    maxWidth: 180,
                  }}
                >
                  <option value="ALL">All Domains</option>
                  {uniqueDomains.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                {/* Measurement Type Filter */}
                <select
                  value={selectedTypeFilter}
                  onChange={(e) => setSelectedTypeFilter(e.target.value)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 6,
                    border: '1px solid var(--border, #CBD5E1)',
                    background: 'var(--bg, #F8FAFC)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <option value="ALL">All Types</option>
                  <option value="Data-Driven">Data-Driven / Tool-Measured</option>
                  <option value="Soft">Soft / Manual</option>
                </select>

                {/* Confidence Filter */}
                <select
                  value={selectedConfidenceFilter}
                  onChange={(e) => setSelectedConfidenceFilter(e.target.value)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 6,
                    border: '1px solid var(--border, #CBD5E1)',
                    background: 'var(--bg, #F8FAFC)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <option value="ALL">All Confidences</option>
                  <option value="High">High Confidence</option>
                  <option value="Medium">Medium Confidence</option>
                  <option value="Low">Low Confidence</option>
                  <option value="Insufficient Evidence">Insufficient Evidence</option>
                </select>

                {/* Sort Option */}
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 6,
                    border: '1px solid var(--border, #CBD5E1)',
                    background: 'var(--bg, #F8FAFC)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <option value="risk_desc">Sort: Highest Risk</option>
                  <option value="forecast_asc">Sort: Lowest Forecast</option>
                  <option value="gap_asc">Sort: Largest Gap to Target</option>
                  <option value="status">Sort: Forecast Status</option>
                  <option value="confidence">Sort: Confidence</option>
                  <option value="name_asc">Sort: SLA Name</option>
                </select>
              </div>
            </div>

            {/* Scrollable Table */}
            <div style={{ maxHeight: 420, overflowY: 'auto', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary, #F1F5F9)', borderBottom: '1px solid var(--border, #E4E7EC)', position: 'sticky', top: 0, zIndex: 5 }}>
                    <th style={{ padding: '10px 14px', textAlign: isRtl ? 'right' : 'left', fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>SLA ID</th>
                    <th style={{ padding: '10px 14px', textAlign: isRtl ? 'right' : 'left', fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>SLA Name & Domain</th>
                    <th style={{ padding: '10px 14px', textAlign: isRtl ? 'left' : 'right', fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>Current</th>
                    <th style={{ padding: '10px 14px', textAlign: isRtl ? 'left' : 'right', fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>Target</th>
                    <th style={{ padding: '10px 14px', textAlign: isRtl ? 'right' : 'left', fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>Current Status</th>
                    <th style={{ padding: '10px 14px', textAlign: isRtl ? 'left' : 'right', fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>Forecast</th>
                    <th style={{ padding: '10px 14px', textAlign: isRtl ? 'right' : 'left', fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>Forecast Status</th>
                    <th style={{ padding: '10px 14px', textAlign: isRtl ? 'right' : 'left', fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredForecasts.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ padding: 32, textAlign: 'center', color: 'var(--text-tertiary, #98A2B3)' }}>
                        No SLAs match the selected search or filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredForecasts.map((row) => {
                      const badge = getStatusBadge(row.forecastStatus);
                      const confBadge = getConfidenceBadge(row.confidence);
                      const isSelected = selectedForecastItem?.slaId === row.slaId;
                      return (
                        <tr
                          key={row.slaId}
                          onClick={() => setSelectedForecastItem(row)}
                          style={{
                            borderBottom: '1px solid var(--border, #E4E7EC)',
                            background: isSelected ? 'rgba(7, 74, 118, 0.06)' : 'transparent',
                            cursor: 'pointer',
                            transition: 'background 0.12s ease',
                          }}
                        >
                          <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', whiteSpace: 'nowrap' }}>
                            {row.slaId}
                          </td>
                          <td style={{ padding: '10px 14px', maxWidth: 280 }}>
                            <div style={{ fontWeight: 700, color: 'var(--text, #101828)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {row.name}
                            </div>
                            <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)' }}>
                              {row.domain} • {row.measurementType}
                            </div>
                          </td>
                          <td style={{ padding: '10px 14px', textAlign: isRtl ? 'left' : 'right', fontWeight: 600, color: row.currentStatus === 'Met' ? '#22A06B' : row.currentStatus === 'Not Met' ? '#DE350B' : 'var(--text-secondary, #475467)' }}>
                            {row.currentActual}
                          </td>
                          <td style={{ padding: '10px 14px', textAlign: isRtl ? 'left' : 'right', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
                            {row.target}
                          </td>
                          <td style={{ padding: '10px 14px' }}>
                            <span
                              style={{
                                fontSize: '0.6875rem',
                                fontWeight: 700,
                                padding: '2px 6px',
                                borderRadius: 4,
                                background: row.currentStatus === 'Met' ? '#E3FCEF' : row.currentStatus === 'Not Met' ? '#FFEBE6' : '#F1F5F9',
                                color: row.currentStatus === 'Met' ? '#22A06B' : row.currentStatus === 'Not Met' ? '#DE350B' : '#64748B',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {row.currentStatus}
                            </span>
                          </td>
                          <td style={{ padding: '10px 14px', textAlign: isRtl ? 'left' : 'right', fontWeight: 700, color: row.forecastStatus === 'At Risk' ? '#DE350B' : row.forecastStatus === 'Watch' ? '#E97F0A' : '#22A06B' }}>
                            {row.forecastValue}
                          </td>
                          <td style={{ padding: '10px 14px' }}>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                fontSize: '0.6875rem',
                                fontWeight: 800,
                                padding: '2px 8px',
                                borderRadius: 4,
                                background: badge.bg,
                                color: badge.color,
                                border: `1px solid ${badge.border}`,
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {badge.icon}
                              {badge.label}
                            </span>
                          </td>
                          <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                            <span
                              style={{
                                fontSize: '0.6875rem',
                                fontWeight: 700,
                                padding: '2px 6px',
                                borderRadius: 4,
                                background: confBadge.bg,
                                color: confBadge.color,
                                border: `1px solid ${confBadge.border}`,
                              }}
                            >
                              {row.confidence}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. AUDITABLE FORECAST METHODOLOGY FOOTNOTE */}
          <div
            style={{
              padding: '14px 18px',
              borderRadius: 8,
              background: 'var(--bg-secondary, #F1F5F9)',
              border: '1px solid var(--border, #CBD5E1)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
            }}
          >
            <Info size={18} color="var(--ncgr-deep-blue, #074A76)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', textTransform: 'uppercase' }}>
                {t('slaPredictive.methodologyTitle', 'Forecast Methodology & Auditability')}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', lineHeight: 1.45, marginTop: 2 }}>
                {report.forecastMethodology}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SLAPredictiveAnalysisDrawer;
