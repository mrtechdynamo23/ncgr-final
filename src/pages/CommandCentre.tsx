import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity, AlertTriangle, Shield, Users,
  TrendingUp, ChevronRight,
  X, CheckCircle2, AlertCircle, Info,
  KeyRound, HeartHandshake, FileText, FileSpreadsheet, Sparkles,
  ExternalLink
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  Tooltip, CartesianGrid
} from 'recharts';
import { useDataStore } from '../data/mockDataStore';
import { getLicenseStats } from '../data/licenses';
import { getAuditStats } from '../data/audits';
import { getSaudizationStats } from '../data/master-employees';
import type { ManagementException } from '../data/incidents';
import TileHoverTooltip from '../components/common/TileHoverTooltip';

const TOWERS = [
  'All Towers',
  'Infrastructure',
  'Network',
  'Service Desk',
  'Applications',
  'SAP',
  'Database',
  'Cloud',
  'Security',
  'Digital Workplace',
];

const slaTrendData = [
  { month: 'May 2026', sla: 98.4, target: 98.0, resolutionSla: 96.5 },
  { month: 'Jun 2026', sla: 98.9, target: 98.0, resolutionSla: 97.2 },
  { month: 'Jul 2026', sla: 99.1, target: 98.0, resolutionSla: 98.0 },
  { month: 'Aug 2026 (MTD)', sla: 99.3, target: 98.0, resolutionSla: 98.4 },
];

const csatDistribution = [
  { rating: '5 Stars (Excellent)', count: 485, pct: '68%' },
  { rating: '4 Stars (Good)', count: 182, pct: '25%' },
  { rating: '3 Stars (Average)', count: 35, pct: '5%' },
  { rating: '1-2 Stars (Poor)', count: 12, pct: '2%' },
];

const CommandCentre: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTower, setSelectedTower] = useState<string>('All Towers');
  const [selectedDrawer, setSelectedDrawer] = useState<ManagementException | null>(null);

  const {
    employees,
    incidents,
    healthGrid,
    vendorRisks,
  } = useDataStore();

  const licenseStats = getLicenseStats();
  const auditStats = getAuditStats();
  const saudization = getSaudizationStats();
  const saudOkDomains = saudization.domains.filter(d => d.status === 'OK').length;
  const saudTotalDomains = saudization.domains.length;

  // Filter employees based on tower
  const filteredEmployees = useMemo(() => {
    return selectedTower === 'All Towers'
      ? employees
      : employees.filter(e => e.tower === selectedTower);
  }, [employees, selectedTower]);

  const activeEmployees = filteredEmployees.filter(e => e.status === 'Active' || e.status === 'Remote').length;
  const onLeaveEmployees = filteredEmployees.filter(e => e.status === 'On Leave').length;
  const trainingEmployees = filteredEmployees.filter(e => e.status === 'Training').length;
  const standbyEmployees = filteredEmployees.filter(e => e.status === 'Standby').length;
  const availabilityPct = filteredEmployees.length > 0
    ? ((activeEmployees / filteredEmployees.length) * 100).toFixed(1)
    : '100';

  // Filter incidents based on tower
  const filteredIncidents = useMemo(() => {
    return selectedTower === 'All Towers'
      ? incidents
      : incidents.filter(i => i.tower === selectedTower);
  }, [incidents, selectedTower]);

  const p1Count = filteredIncidents.filter(i => i.priority === 'P1' && (i.status === 'Open' || i.status === 'In Progress')).length;
  const p2Count = filteredIncidents.filter(i => i.priority === 'P2' && (i.status === 'Open' || i.status === 'In Progress')).length;
  const openIncidentCount = filteredIncidents.filter(i => i.status === 'Open' || i.status === 'In Progress').length;
  const criticalRisks = vendorRisks.filter(r => r.riskScore >= 15 && r.currentStatus !== 'Closed').length;

  return (
    <div className="page-container" style={{ paddingBottom: 48 }}>
      {/* ─── TOP EXECUTIVE BANNER & TOWER FILTER ────────────────── */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', fontWeight: 800, color: 'var(--text, #101828)', margin: 0 }}>
              Executive Control Towers
            </h1>
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 12,
                background: 'rgba(64, 144, 79, 0.1)',
                color: 'var(--ncgr-mint-green, #40904F)',
                border: '1px solid rgba(64, 144, 79, 0.3)',
                whiteSpace: 'nowrap',
              }}
            >
              LIVE OPERATIONAL STATE
            </span>
          </div>
        </div>

        {/* Tower Selector Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', whiteSpace: 'nowrap' }}>
            Tower Filter:
          </span>
          <select
            value={selectedTower}
            onChange={(e) => setSelectedTower(e.target.value)}
            style={{
              padding: '7px 12px',
              borderRadius: 8,
              border: '1px solid var(--border, #E4E7EC)',
              background: 'var(--surface, #FFFFFF)',
              color: 'var(--text, #101828)',
              fontWeight: 700,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              outline: 'none',
              boxShadow: '0 1px 2px rgba(16,24,40,0.05)',
              maxWidth: '100%',
            }}
          >
            {TOWERS.map((twr) => (
              <option key={twr} value={twr}>
                {twr}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ─── 10 MASTER KPI CARDS ──────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        {/* 1. Overall Health */}
        <TileHoverTooltip
          title="Overall Health Telemetry"
          summary="Composite real-time health score across all 9 technical delivery towers, calculated from system availability, active incident volume, and SLA compliance."
        >
          <div
            className="kpi-card kpi-entrance"
            onClick={() => navigate('/applications/health')}
            style={{
              padding: 16,
              borderRadius: 12,
              background: 'var(--card-bg, #FFFFFF)',
              border: '1px solid var(--border, #E4E7EC)',
              borderTop: '3px solid #22A06B',
              cursor: 'pointer',
              animationDelay: '0ms',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
                OVERALL HEALTH
              </span>
              <Activity size={16} color="#22A06B" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
              96.8%
            </div>
            <div style={{ fontSize: '0.75rem', color: '#22A06B', fontWeight: 600, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
              <TrendingUp size={12} /> +0.6% vs last week
            </div>
          </div>
        </TileHoverTooltip>

        {/* 2. Critical Incidents P1/P2 */}
        <TileHoverTooltip
          title="Critical Incidents (P1/P2)"
          summary="Tracks active high-severity operational outages in Major Incident war rooms requiring emergency bridge commander containment and executive escalation."
        >
          <div
            className="kpi-card kpi-entrance"
            onClick={() => navigate('/command-center/critical-incidents')}
            style={{
              padding: 16,
              borderRadius: 12,
              background: 'var(--card-bg, #FFFFFF)',
              border: '1px solid var(--border, #E4E7EC)',
              borderTop: '3px solid #DE350B',
              cursor: 'pointer',
              animationDelay: '30ms',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
                CRITICAL INCIDENTS
              </span>
              <AlertTriangle size={16} color="#DE350B" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B' }}>
              {p1Count + p2Count}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', marginTop: 4 }}>
              {p1Count} P1 Major • {p2Count} P2 High
            </div>
          </div>
        </TileHoverTooltip>

        {/* 3. Total Open Incidents */}
        <TileHoverTooltip
          title="Open Incidents Queue"
          summary="Consolidated active incident repository (P1–P4) across operational towers, monitoring assignment velocity, priority aging, and target resolution time."
        >
          <div
            className="kpi-card kpi-entrance"
            onClick={() => navigate('/command-center/incidents')}
            style={{
              padding: 16,
              borderRadius: 12,
              background: 'var(--card-bg, #FFFFFF)',
              border: '1px solid var(--border, #E4E7EC)',
              borderTop: '3px solid #074A76',
              cursor: 'pointer',
              animationDelay: '60ms',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
                OPEN INCIDENTS
              </span>
              <AlertCircle size={16} color="#074A76" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
              {openIncidentCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', marginTop: 4 }}>
              Across {selectedTower}
            </div>
          </div>
        </TileHoverTooltip>

        {/* 4. SLA Performance */}
        <TileHoverTooltip
          title="SLA Management"
          summary="Measures operational and contractual SLA attainment against the 98.0% threshold baseline across all service domains and technical delivery towers."
        >
          <div
            className="kpi-card kpi-entrance"
            onClick={() => navigate('/assurance/sla')}
            style={{
              padding: 16,
              borderRadius: 12,
              background: 'var(--card-bg, #FFFFFF)',
              border: '1px solid var(--border, #E4E7EC)',
              borderTop: '3px solid #40904F',
              cursor: 'pointer',
              position: 'relative',
              animationDelay: '90ms',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
                SLA COMPLIANCE
              </span>
              <CheckCircle2 size={16} color="#40904F" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
              99.3%
            </div>
            <div style={{ fontSize: '0.75rem', color: '#40904F', fontWeight: 600, marginTop: 4 }}>
              Target: 98.0% (Passing)
            </div>
          </div>
        </TileHoverTooltip>

        {/* 5. CSAT Rating */}
        <TileHoverTooltip
          title="Customer Satisfaction (CSAT)"
          summary="Aggregated customer feedback scores collected from post-resolution surveys across NCGR government departments and operational business users."
        >
          <div
            className="kpi-card kpi-entrance"
            onClick={() => navigate('/command-center/service-desk')}
            style={{
              padding: 16,
              borderRadius: 12,
              background: 'var(--card-bg, #FFFFFF)',
              border: '1px solid var(--border, #E4E7EC)',
              borderTop: '3px solid #1FBBB0',
              cursor: 'pointer',
              animationDelay: '120ms',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
                CUSTOMER CSAT
              </span>
              <HeartHandshake size={16} color="#1FBBB0" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
              4.85 / 5.0
            </div>
            <div style={{ fontSize: '0.75rem', color: '#1FBBB0', fontWeight: 600, marginTop: 4 }}>
              93% Positive Feedback
            </div>
          </div>
        </TileHoverTooltip>

        {/* 6. Employee Availability */}
        <TileHoverTooltip
          title="Operational Workforce Capacity"
          summary="Real-time active engineering staff on duty today, tracking present team members vs. approved leave, training, and 24/7 standby rosters."
        >
          <div
            className="kpi-card kpi-entrance"
            onClick={() => navigate('/team-overview/attendance')}
            style={{
              padding: 16,
              borderRadius: 12,
              background: 'var(--card-bg, #FFFFFF)',
              border: '1px solid var(--border, #E4E7EC)',
              borderTop: '3px solid #074A76',
              cursor: 'pointer',
              animationDelay: '150ms',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
                EMPLOYEE AVAILABILITY
              </span>
              <Users size={16} color="#074A76" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
              {availabilityPct}%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', marginTop: 4 }}>
              {activeEmployees} Present • {onLeaveEmployees} On Leave
            </div>
          </div>
        </TileHoverTooltip>

        {/* 7. Open Risks */}
        <TileHoverTooltip
          title="SIAM Vendor & Technical Risks"
          summary="Tracks vendor dependencies, commercial contract renewals, and infrastructure vulnerabilities scored by impact and likelihood in the risk matrix."
        >
          <div
            className="kpi-card kpi-entrance"
            onClick={() => navigate('/vendor-siam/risk')}
            style={{
              padding: 16,
              borderRadius: 12,
              background: 'var(--card-bg, #FFFFFF)',
              border: '1px solid var(--border, #E4E7EC)',
              borderTop: '3px solid #E97F0A',
              cursor: 'pointer',
              animationDelay: '180ms',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
                OPEN RISKS
              </span>
              <Shield size={16} color="#E97F0A" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
              {vendorRisks.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#E97F0A', fontWeight: 600, marginTop: 4 }}>
              {criticalRisks} High / Critical Score
            </div>
          </div>
        </TileHoverTooltip>

        {/* 8. License Expiries */}
        <TileHoverTooltip
          title="Software Licenses & Entitlements"
          summary="Monitors software subscriptions, perpetual entitlements, and cloud renewals expiring within 90 days requiring procurement action."
        >
          <div
            className="kpi-card kpi-entrance"
            onClick={() => navigate('/license-health')}
            style={{
              padding: 16,
              borderRadius: 12,
              background: 'var(--card-bg, #FFFFFF)',
              border: '1px solid var(--border, #E4E7EC)',
              borderTop: '3px solid #671E75',
              cursor: 'pointer',
              animationDelay: '210ms',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
                EXPIRING LICENSES
              </span>
              <KeyRound size={16} color="#671E75" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
              {licenseStats.expiringIn90Days}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#671E75', fontWeight: 600, marginTop: 4 }}>
              Expiring in 90 Days ({licenseStats.expired} Expired)
            </div>
          </div>
        </TileHoverTooltip>

        {/* 9. Saudization */}
        <TileHoverTooltip
          title="Saudization Tracker"
          summary="Tracks national workforce representation across approved operational location buckets compared against contractual Saudization target thresholds."
        >
          <div
            className="kpi-card kpi-entrance"
            onClick={() => navigate('/saudization-tracker')}
            style={{
              padding: 16,
              borderRadius: 12,
              background: 'var(--card-bg, #FFFFFF)',
              border: '1px solid var(--border, #E4E7EC)',
              borderTop: `3px solid ${saudOkDomains >= 7 ? '#22A06B' : '#DE350B'}`,
              cursor: 'pointer',
              animationDelay: '240ms',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
                SAUDIZATION
              </span>
              <Users size={16} color={saudOkDomains >= 7 ? '#22A06B' : '#DE350B'} />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
              {saudization.overallPct}% <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>/ 68% Target</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: saudOkDomains >= 7 ? '#22A06B' : '#DE350B', fontWeight: 700, marginTop: 4 }}>
              {saudOkDomains}/{saudTotalDomains} Domains Compliant
            </div>
          </div>
        </TileHoverTooltip>

        {/* 10. Audit Findings */}
        <TileHoverTooltip
          title="Audit & Compliance"
          summary="Tracks statutory, operational, and regulatory compliance audit findings actively under remediation with designated NCGR owners and deadlines."
        >
          <div
            className="kpi-card kpi-entrance"
            onClick={() => navigate('/compliance')}
            style={{
              padding: 16,
              borderRadius: 12,
              background: 'var(--card-bg, #FFFFFF)',
              border: '1px solid var(--border, #E4E7EC)',
              borderTop: '3px solid #CE813C',
              cursor: 'pointer',
              animationDelay: '270ms',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
                AUDIT FINDINGS
              </span>
              <Info size={16} color="#CE813C" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
              {auditStats.open}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', marginTop: 4 }}>
              {auditStats.totalFindings} findings tracked
            </div>
          </div>
        </TileHoverTooltip>
      </div>

      {/* ─── SAUDIZATION DOMAIN COMPLIANCE CLUSTER ──────────────── */}
      <div
        className="card"
        style={{
          padding: 'clamp(14px, 2vw, 20px)',
          borderRadius: 12,
          background: 'var(--card-bg, #FFFFFF)',
          border: '1px solid var(--border, #E4E7EC)',
          marginBottom: 20,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
              Saudization Compliance — Domain Breakdown
            </h3>
          </div>
          <button
            onClick={() => navigate('/saudization-tracker')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ncgr-deep-blue, #074A76)',
              fontWeight: 700,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span>View Tracker</span>
            <ExternalLink size={14} />
          </button>
        </div>

        {/* Summary row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))', gap: 8, marginBottom: 14 }}>
          <TileHoverTooltip
            title="Saudi National Workforce"
            summary="Total Saudi national engineering and managerial staff deployed across all operational delivery domains."
          >
            <div style={{ padding: 10, borderRadius: 8, background: 'rgba(64,144,79,0.06)', border: '1px solid rgba(64,144,79,0.2)' }}>
              <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#40904F', textTransform: 'uppercase' }}>Saudi Staff</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#40904F', marginTop: 2 }}>{saudization.overallSaudiCount}</div>
            </div>
          </TileHoverTooltip>

          <TileHoverTooltip
            title="Expatriate Technical Staff"
            summary="Expatriate technical specialists and subject matter experts supporting domain delivery and knowledge transfer."
          >
            <div style={{ padding: 10, borderRadius: 8, background: 'rgba(7,74,118,0.06)', border: '1px solid rgba(7,74,118,0.2)' }}>
              <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#074A76', textTransform: 'uppercase' }}>Expatriate Staff</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#074A76', marginTop: 2 }}>{saudization.overallTotal - saudization.overallSaudiCount}</div>
            </div>
          </TileHoverTooltip>

          <TileHoverTooltip
            title="Overall Saudization Ratio"
            summary="Authoritative baseline compliance percentage achieved across the entire ITMS operational workforce against the 68% contract threshold."
          >
            <div style={{ padding: 10, borderRadius: 8, background: 'rgba(7,74,118,0.06)', border: '1px solid rgba(7,74,118,0.2)' }}>
              <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#074A76', textTransform: 'uppercase' }}>Overall %</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text, #101828)', marginTop: 2 }}>{saudization.overallPct}%</div>
            </div>
          </TileHoverTooltip>

          <TileHoverTooltip
            title="Domain Quota Attainment"
            summary="Count of operational location buckets currently meeting or exceeding contractual nationalization targets."
          >
            <div style={{ padding: 10, borderRadius: 8, background: saudOkDomains >= 7 ? 'rgba(64,144,79,0.06)' : 'rgba(222,53,11,0.06)', border: `1px solid ${saudOkDomains >= 7 ? 'rgba(64,144,79,0.2)' : 'rgba(222,53,11,0.2)'}` }}>
              <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: saudOkDomains >= 7 ? '#40904F' : '#DE350B', textTransform: 'uppercase' }}>Compliance Status</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: saudOkDomains >= 7 ? '#40904F' : '#DE350B', marginTop: 2 }}>{saudOkDomains}/{saudTotalDomains} OK</div>
            </div>
          </TileHoverTooltip>
        </div>

        {/* Per-domain tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 160px), 1fr))', gap: 8 }}>
          {saudization.domains.map((d) => {
            const isOk = d.status === 'OK';
            return (
              <TileHoverTooltip
                key={d.locationBucket}
                title={`${d.locationBucket} Quota`}
                summary={`Saudization attainment for ${d.locationBucket}: ${d.saudiCount} of ${d.totalCount} staff (${d.actualPct}%), target status: ${d.status}.`}
              >
                <div
                  style={{
                    padding: '8px 10px',
                    borderRadius: 8,
                    background: isOk ? 'rgba(64,144,79,0.04)' : 'rgba(222,53,11,0.04)',
                    border: `1px solid ${isOk ? 'rgba(64,144,79,0.2)' : 'rgba(222,53,11,0.2)'}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text, #101828)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {d.locationBucket}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)' }}>
                      {d.saudiCount}/{d.totalCount} ({d.actualPct}%)
                    </div>
                  </div>
                  <div style={{
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: 8,
                    background: isOk ? 'rgba(64,144,79,0.12)' : 'rgba(222,53,11,0.12)',
                    color: isOk ? '#22A06B' : '#DE350B',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}>
                    {isOk ? '✓ OK' : '✗ GAP'}
                  </div>
                </div>
              </TileHoverTooltip>
            );
          })}
        </div>
      </div>

      {/* ─── 2-COLUMN SECTION: SLA TREND & CSAT BREAKDOWN ──────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 16,
          marginBottom: 20,
        }}
      >
        {/* SLA Trend Chart Card */}
        <div
          className="card"
          style={{
            padding: 'clamp(14px, 2vw, 20px)',
            borderRadius: 12,
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 6 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                SLA Compliance Trend
              </h3>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#40904F', background: 'rgba(64,144,79,0.1)', padding: '3px 8px', borderRadius: 4 }}>
              Current: 99.3%
            </span>
          </div>

          <div style={{ height: 200, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={slaTrendData}>
                <defs>
                  <linearGradient id="slaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#40904F" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#40904F" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border, #E4E7EC)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-secondary, #475467)' }} />
                <YAxis domain={[94, 100]} tick={{ fontSize: 10, fill: 'var(--text-secondary, #475467)' }} unit="%" />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, '']}
                  contentStyle={{ background: 'var(--surface-raised, #FFFFFF)', borderColor: 'var(--border, #E4E7EC)', borderRadius: 8, fontSize: 12 }}
                />
                <Area type="monotone" dataKey="sla" name="Operational SLA" stroke="#40904F" strokeWidth={2} fillOpacity={1} fill="url(#slaGradient)" isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
                <Area type="monotone" dataKey="target" name="Contract Target" stroke="#DE350B" strokeDasharray="4 4" strokeWidth={1.5} fill="none" isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CSAT Customer Satisfaction Breakdown */}
        <div
          className="card"
          style={{
            padding: 'clamp(14px, 2vw, 20px)',
            borderRadius: 12,
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 6 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                Customer Satisfaction (CSAT) Breakdown
              </h3>
            </div>
            <span style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1FBBB0' }}>
              4.85 ★
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {csatDistribution.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, color: 'var(--text, #101828)' }}>{item.rating}</span>
                  <span style={{ color: 'var(--text-secondary, #475467)' }}>{item.count} votes ({item.pct})</span>
                </div>
                <div style={{ height: 6, width: '100%', background: 'var(--bg-secondary, #F7F8FA)', borderRadius: 3, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: item.pct,
                      background: idx === 0 ? '#40904F' : idx === 1 ? '#1FBBB0' : idx === 2 ? '#E97F0A' : '#DE350B',
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── EMPLOYEE AVAILABILITY BY TOWER ───────────────────── */}
      <div
        className="card"
        style={{
          padding: 'clamp(14px, 2vw, 20px)',
          borderRadius: 12,
          background: 'var(--card-bg, #FFFFFF)',
          border: '1px solid var(--border, #E4E7EC)',
          marginBottom: 20,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
              Operational Workforce Status ({selectedTower})
            </h3>
          </div>
          <button
            onClick={() => navigate('/team-overview/resource-data')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ncgr-deep-blue, #074A76)',
              fontWeight: 700,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span>Open Resource Data</span>
            <ExternalLink size={14} />
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))',
            gap: 10,
          }}
        >
          <TileHoverTooltip
            title="Active Operational Capacity"
            summary="Number of dedicated engineers and system administrators actively on shift and resolving operational queues today."
          >
            <div style={{ padding: 10, borderRadius: 8, background: 'rgba(64,144,79,0.06)', border: '1px solid rgba(64,144,79,0.2)' }}>
              <div style={{ fontSize: '0.6875rem', color: '#40904F', fontWeight: 600 }}>Active / On Duty</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#40904F', marginTop: 2 }}>{activeEmployees}</div>
            </div>
          </TileHoverTooltip>

          <TileHoverTooltip
            title="Approved Planned Leave"
            summary="Staff members currently on approved annual, emergency, or statutory leave with shift backfill coverage."
          >
            <div style={{ padding: 10, borderRadius: 8, background: 'rgba(233,127,10,0.06)', border: '1px solid rgba(233,127,10,0.2)' }}>
              <div style={{ fontSize: '0.6875rem', color: '#E97F0A', fontWeight: 600 }}>On Leave</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#E97F0A', marginTop: 2 }}>{onLeaveEmployees}</div>
            </div>
          </TileHoverTooltip>

          <TileHoverTooltip
            title="Capability Training & Certification"
            summary="Engineers participating in Saudi Empowerment Academy programs, technical bootcamps, or certification tracks."
          >
            <div style={{ padding: 10, borderRadius: 8, background: 'rgba(74,166,220,0.06)', border: '1px solid rgba(74,166,220,0.2)' }}>
              <div style={{ fontSize: '0.6875rem', color: '#4AA6DC', fontWeight: 600 }}>In Training</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4AA6DC', marginTop: 2 }}>{trainingEmployees}</div>
            </div>
          </TileHoverTooltip>

          <TileHoverTooltip
            title="24/7 Standby & On-Call Roster"
            summary="Secondary escalation engineers on standby duty for after-hours emergency bridges and Major Incidents."
          >
            <div style={{ padding: 10, borderRadius: 8, background: 'rgba(103,30,117,0.06)', border: '1px solid rgba(103,30,117,0.2)' }}>
              <div style={{ fontSize: '0.6875rem', color: '#671E75', fontWeight: 600 }}>Standby / On-Call</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#671E75', marginTop: 2 }}>{standbyEmployees}</div>
            </div>
          </TileHoverTooltip>
        </div>
      </div>

      {/* ─── 5 EMBEDDED MANAGEMENT REPORT CARDS ───────────────── */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
            Executive & Operational Management Reports
          </h3>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))',
            gap: 12,
          }}
        >
          {/* Card 1: WSR */}
          <TileHoverTooltip
            title="Weekly Status Report (WSR)"
            summary="Weekly executive deliverable capturing 7-day operational achievements, tower highlights, ticket throughput, and management escalations."
          >
            <div
              className="card"
              style={{
                padding: 14,
                borderRadius: 10,
                background: 'var(--card-bg, #FFFFFF)',
                border: '1px solid var(--border, #E4E7EC)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: '#074A76' }}>
                  <FileText size={18} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Weekly Status</span>
                </div>
                <h4 style={{ margin: '0', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                  WSR — Week 32, 2026
                </h4>
              </div>
              <button
                onClick={() => navigate('/reports/wsr')}
                style={{
                  marginTop: 12,
                  padding: '6px 12px',
                  borderRadius: 6,
                  background: 'var(--bg-secondary, #F7F8FA)',
                  border: '1px solid var(--border, #E4E7EC)',
                  color: '#074A76',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                Open WSR Report
              </button>
            </div>
          </TileHoverTooltip>

          {/* Card 2: MSR */}
          <TileHoverTooltip
            title="Monthly Service Review (MSR)"
            summary="Comprehensive monthly review detailing full contractual SLA attainment, SIAM scorecard, invoice deductions, and governance audits."
          >
            <div
              className="card"
              style={{
                padding: 14,
                borderRadius: 10,
                background: 'var(--card-bg, #FFFFFF)',
                border: '1px solid var(--border, #E4E7EC)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: '#40904F' }}>
                  <FileSpreadsheet size={18} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Monthly Service</span>
                </div>
                <h4 style={{ margin: '0', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                  MSR — July 2026
                </h4>
              </div>
              <button
                onClick={() => navigate('/reports/msr')}
                style={{
                  marginTop: 12,
                  padding: '6px 12px',
                  borderRadius: 6,
                  background: 'var(--bg-secondary, #F7F8FA)',
                  border: '1px solid var(--border, #E4E7EC)',
                  color: '#40904F',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                Open MSR Report
              </button>
            </div>
          </TileHoverTooltip>

          {/* Card 4: Executive Report */}
          <TileHoverTooltip
            title="Executive Leadership Brief"
            summary="High-level briefing for executive steering committees covering strategic risk heatmaps, resource posture, and SLA compliance."
          >
            <div
              className="card"
              style={{
                padding: 14,
                borderRadius: 10,
                background: 'var(--card-bg, #FFFFFF)',
                border: '1px solid var(--border, #E4E7EC)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: '#671E75' }}>
                  <Shield size={18} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Leadership Brief</span>
                </div>
                <h4 style={{ margin: '0', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                  Executive Q3 Brief
                </h4>
              </div>
              <button
                onClick={() => navigate('/reports/executive')}
                style={{
                  marginTop: 12,
                  padding: '6px 12px',
                  borderRadius: 6,
                  background: 'var(--bg-secondary, #F7F8FA)',
                  border: '1px solid var(--border, #E4E7EC)',
                  color: '#671E75',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                Open Executive Brief
              </button>
            </div>
          </TileHoverTooltip>

          {/* Card 5: AI Operational Analytics */}
          <TileHoverTooltip
            title="Digital Transformation & AI"
            summary="Machine learning operational analytics engine forecasting incident clustering, MTTR anomaly detection, and capacity drift."
          >
            <div
              className="card"
              style={{
                padding: 14,
                borderRadius: 10,
                background: 'var(--card-bg, #FFFFFF)',
                border: '1px solid var(--border, #E4E7EC)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: '#1FBBB0' }}>
                  <Sparkles size={18} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>AI Analytics</span>
                </div>
                <h4 style={{ margin: '0', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                  AIOps Prediction Log
                </h4>
              </div>
              <button
                onClick={() => navigate('/transformation')}
                style={{
                  marginTop: 12,
                  padding: '6px 12px',
                  borderRadius: 6,
                  background: 'var(--bg-secondary, #F7F8FA)',
                  border: '1px solid var(--border, #E4E7EC)',
                  color: '#1FBBB0',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                Open AI Engine
              </button>
            </div>
          </TileHoverTooltip>
        </div>
      </div>

      {/* ─── HEALTH GRID TILES ───────────────────────────────── */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
            Domain Operational Health Grid
          </h3>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 170px), 1fr))',
            gap: 10,
          }}
        >
          {healthGrid.map((item, idx) => (
            <TileHoverTooltip
              key={idx}
              title={`${item.domain} Health`}
              summary={`Real-time operational status: ${item.health} with ${item.exceptions} active exception alert(s). Click to open technical domain workspace.`}
            >
              <div
                onClick={() => navigate(item.path)}
                className="card health-grid-card"
                style={{
                  padding: '12px 14px',
                  borderRadius: 10,
                  background: 'var(--card-bg, #FFFFFF)',
                  border: '1px solid var(--border, #E4E7EC)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 8,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.domain}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: item.health === 'healthy' ? '#22A06B' : item.health === 'at-risk' ? '#E97F0A' : '#DE350B',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)', textTransform: 'capitalize', whiteSpace: 'nowrap' }}>
                      {item.health} • {item.exceptions} alert{item.exceptions !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                <ChevronRight size={16} color="var(--text-tertiary, #98A2B3)" style={{ flexShrink: 0 }} />
              </div>
            </TileHoverTooltip>
          ))}
        </div>
      </div>

      {/* ─── ACTIVE MANAGEMENT EXCEPTIONS DRAWER ─────────────── */}
      {selectedDrawer && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10, 22, 40, 0.45)',
              backdropFilter: 'blur(3px)',
              zIndex: 1000,
            }}
            onClick={() => setSelectedDrawer(null)}
          />
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 480,
              maxWidth: '100vw',
              background: 'var(--surface-raised, #FFFFFF)',
              boxShadow: '-8px 0 30px rgba(0, 0, 0, 0.15)',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              padding: 'clamp(16px, 3vw, 24px)',
              overflowY: 'auto',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    background: selectedDrawer.severity === 'critical' ? '#FFEBE6' : '#FFF7E6',
                    color: selectedDrawer.severity === 'critical' ? '#DE350B' : '#E97F0A',
                  }}
                >
                  {selectedDrawer.severity}
                </span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary, #98A2B3)' }}>
                  {selectedDrawer.id}
                </span>
              </div>
              <button
                onClick={() => setSelectedDrawer(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                <X size={20} color="var(--text-tertiary, #98A2B3)" />
              </button>
            </div>

            <h3 style={{ margin: '0 0 8px', fontSize: '1.125rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
              {selectedDrawer.title}
            </h3>

            <p style={{ margin: '0 0 20px', fontSize: '0.875rem', color: 'var(--text-secondary, #475467)', lineHeight: 1.5 }}>
              {selectedDrawer.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase' }}>Business Impact</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text, #101828)', marginTop: 2 }}>{selectedDrawer.impact}</div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase' }}>Recommended Action</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#074A76', marginTop: 2 }}>{selectedDrawer.recommendedAction}</div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase' }}>Owner & Source System</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text, #101828)', marginTop: 2 }}>
                  {selectedDrawer.owner} • {selectedDrawer.sourceSystem} ({selectedDrawer.timestamp})
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedDrawer(null);
                navigate('/command-center/critical-incidents');
              }}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: 8,
                background: 'var(--ncgr-deep-blue, #074A76)',
                color: '#FFFFFF',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Open Critical Incident View
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CommandCentre;
