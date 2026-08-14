import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity, AlertTriangle, Shield, Users, FileCheck,
  TrendingUp, ChevronRight,
  X, Clock, CheckCircle2, AlertCircle, Info,
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
import type { ManagementException } from '../data/incidents';

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
    leaveRecords,
    incidents,
    healthGrid,
    vendorRisks,
  } = useDataStore();

  const licenseStats = getLicenseStats();
  const auditStats = getAuditStats();

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
  const pendingLeaves = leaveRecords.filter(l => l.status === 'Pending').length;
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
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text, #101828)', margin: 0 }}>
              Executive Dashboard
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
              }}
            >
              LIVE OPERATIONAL STATE
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary, #475467)' }}>
            Real-time multi-tower operational assurance, health telemetry & governance indicators
          </p>
        </div>

        {/* Tower Selector Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
            Tower Filter:
          </span>
          <select
            value={selectedTower}
            onChange={(e) => setSelectedTower(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              border: '1px solid var(--border, #E4E7EC)',
              background: 'var(--surface, #FFFFFF)',
              color: 'var(--text, #101828)',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
              outline: 'none',
              boxShadow: '0 1px 2px rgba(16,24,40,0.05)',
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: 14,
          marginBottom: 24,
        }}
      >
        {/* 1. Overall Health */}
        <div
          className="kpi-card"
          style={{
            padding: 16,
            borderRadius: 12,
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
            borderTop: '3px solid #22A06B',
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

        {/* 2. Critical Incidents P1/P2 */}
        <div
          className="kpi-card"
          onClick={() => navigate('/command-center/critical-incidents')}
          style={{
            padding: 16,
            borderRadius: 12,
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
            borderTop: '3px solid #DE350B',
            cursor: 'pointer',
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

        {/* 3. Total Open Incidents */}
        <div
          className="kpi-card"
          onClick={() => navigate('/command-center/incidents')}
          style={{
            padding: 16,
            borderRadius: 12,
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
            borderTop: '3px solid #074A76',
            cursor: 'pointer',
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

        {/* 4. SLA Performance */}
        <div
          className="kpi-card"
          style={{
            padding: 16,
            borderRadius: 12,
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
            borderTop: '3px solid #40904F',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
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

        {/* 5. CSAT Rating */}
        <div
          className="kpi-card"
          style={{
            padding: 16,
            borderRadius: 12,
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
            borderTop: '3px solid #1FBBB0',
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

        {/* 6. Employee Availability */}
        <div
          className="kpi-card"
          onClick={() => navigate('/team-overview/attendance')}
          style={{
            padding: 16,
            borderRadius: 12,
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
            borderTop: '3px solid #074A76',
            cursor: 'pointer',
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

        {/* 7. Open Risks */}
        <div
          className="kpi-card"
          onClick={() => navigate('/vendor-siam/risk')}
          style={{
            padding: 16,
            borderRadius: 12,
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
            borderTop: '3px solid #E97F0A',
            cursor: 'pointer',
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

        {/* 8. License Expiries */}
        <div
          className="kpi-card"
          onClick={() => navigate('/license-health')}
          style={{
            padding: 16,
            borderRadius: 12,
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
            borderTop: '3px solid #671E75',
            cursor: 'pointer',
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

        {/* 9. Major Changes */}
        <div
          className="kpi-card"
          onClick={() => navigate('/applications/changes')}
          style={{
            padding: 16,
            borderRadius: 12,
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
            borderTop: '3px solid #4AA6DC',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
              PENDING APPROVALS
            </span>
            <FileCheck size={16} color="#4AA6DC" />
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
            {pendingLeaves + 5}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', marginTop: 4 }}>
            {pendingLeaves} Leaves • 5 Changes
          </div>
        </div>

        {/* 10. Audit Findings */}
        <div
          className="kpi-card"
          onClick={() => navigate('/compliance')}
          style={{
            padding: 16,
            borderRadius: 12,
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
            borderTop: '3px solid #CE813C',
            cursor: 'pointer',
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
      </div>

      {/* ─── 2-COLUMN SECTION: SLA TREND & CSAT BREAKDOWN ──────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: 20,
          marginBottom: 24,
        }}
      >
        {/* SLA Trend Chart Card */}
        <div
          className="card"
          style={{
            padding: 20,
            borderRadius: 12,
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                SLA Compliance Trend (Last 4 Months)
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                System & resolution performance vs contractual target threshold
              </p>
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
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-secondary, #475467)' }} />
                <YAxis domain={[94, 100]} tick={{ fontSize: 11, fill: 'var(--text-secondary, #475467)' }} unit="%" />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, '']}
                  contentStyle={{ background: 'var(--surface-raised, #FFFFFF)', borderColor: 'var(--border, #E4E7EC)', borderRadius: 8, fontSize: 12 }}
                />
                <Area type="monotone" dataKey="sla" name="Operational SLA" stroke="#40904F" strokeWidth={2} fillOpacity={1} fill="url(#slaGradient)" />
                <Area type="monotone" dataKey="target" name="Contract Target" stroke="#DE350B" strokeDasharray="4 4" strokeWidth={1.5} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CSAT Customer Satisfaction Breakdown */}
        <div
          className="card"
          style={{
            padding: 20,
            borderRadius: 12,
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                Customer Satisfaction (CSAT) Breakdown
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                714 monthly surveys logged across NCGR departments
              </p>
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
          padding: 20,
          borderRadius: 12,
          background: 'var(--card-bg, #FFFFFF)',
          border: '1px solid var(--border, #E4E7EC)',
          marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
              Operational Workforce Status ({selectedTower})
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
              Total staff: {filteredEmployees.length} employees • Available capacity: {activeEmployees} active engineers
            </p>
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 12,
          }}
        >
          <div style={{ padding: 12, borderRadius: 8, background: 'rgba(64,144,79,0.06)', border: '1px solid rgba(64,144,79,0.2)' }}>
            <div style={{ fontSize: '0.75rem', color: '#40904F', fontWeight: 600 }}>Active / On Duty</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#40904F', marginTop: 2 }}>{activeEmployees}</div>
          </div>

          <div style={{ padding: 12, borderRadius: 8, background: 'rgba(233,127,10,0.06)', border: '1px solid rgba(233,127,10,0.2)' }}>
            <div style={{ fontSize: '0.75rem', color: '#E97F0A', fontWeight: 600 }}>On Leave</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#E97F0A', marginTop: 2 }}>{onLeaveEmployees}</div>
          </div>

          <div style={{ padding: 12, borderRadius: 8, background: 'rgba(74,166,220,0.06)', border: '1px solid rgba(74,166,220,0.2)' }}>
            <div style={{ fontSize: '0.75rem', color: '#4AA6DC', fontWeight: 600 }}>In Training</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4AA6DC', marginTop: 2 }}>{trainingEmployees}</div>
          </div>

          <div style={{ padding: 12, borderRadius: 8, background: 'rgba(103,30,117,0.06)', border: '1px solid rgba(103,30,117,0.2)' }}>
            <div style={{ fontSize: '0.75rem', color: '#671E75', fontWeight: 600 }}>Standby / On-Call</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#671E75', marginTop: 2 }}>{standbyEmployees}</div>
          </div>
        </div>
      </div>

      {/* ─── 5 EMBEDDED MANAGEMENT REPORT CARDS ───────────────── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
            Executive & Operational Management Reports
          </h3>
          <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
            Direct access to weekly, monthly, flash, and AI operational analytics
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 14,
          }}
        >
          {/* Card 1: WSR */}
          <div
            className="card"
            style={{
              padding: 16,
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
              <h4 style={{ margin: '0 0 4px', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                WSR — Week 32, 2026
              </h4>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                Operational highlights, 14 tower achievements, key milestones
              </p>
            </div>
            <button
              onClick={() => alert('WSR Week 32 Report Exported Successfully')}
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
              Download Report
            </button>
          </div>

          {/* Card 2: MSR */}
          <div
            className="card"
            style={{
              padding: 16,
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
              <h4 style={{ margin: '0 0 4px', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                MSR — July 2026
              </h4>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                Comprehensive SLA performance, governance scorecard & SIAM audit
              </p>
            </div>
            <button
              onClick={() => alert('MSR July 2026 Report Exported Successfully')}
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
              Download Report
            </button>
          </div>

          {/* Card 3: DFR */}
          <div
            className="card"
            style={{
              padding: 16,
              borderRadius: 10,
              background: 'var(--card-bg, #FFFFFF)',
              border: '1px solid var(--border, #E4E7EC)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: '#E97F0A' }}>
                <Clock size={18} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Daily Flash</span>
              </div>
              <h4 style={{ margin: '0 0 4px', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                DFR — 12 Aug 2026
              </h4>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                24-hour critical events, handover summaries & major changes
              </p>
            </div>
            <button
              onClick={() => alert('DFR 12 Aug Report Exported Successfully')}
              style={{
                marginTop: 12,
                padding: '6px 12px',
                borderRadius: 6,
                background: 'var(--bg-secondary, #F7F8FA)',
                border: '1px solid var(--border, #E4E7EC)',
                color: '#E97F0A',
                fontWeight: 700,
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              Download Report
            </button>
          </div>

          {/* Card 4: Executive Report */}
          <div
            className="card"
            style={{
              padding: 16,
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
              <h4 style={{ margin: '0 0 4px', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                Executive Q3 Brief
              </h4>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                High-level operational assurance, risk heatmap & resource posture
              </p>
            </div>
            <button
              onClick={() => alert('Executive Leadership Brief Exported Successfully')}
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
              Download Report
            </button>
          </div>

          {/* Card 5: AI Operational Analytics */}
          <div
            className="card"
            style={{
              padding: 16,
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
              <h4 style={{ margin: '0 0 4px', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                AIOps Prediction Log
              </h4>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                Automated incident correlation, MTTR forecasts & drift detection
              </p>
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
        </div>
      </div>

      {/* ─── HEALTH GRID TILES ───────────────────────────────── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
            Domain Operational Health Grid
          </h3>
          <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
            Click any operational tower to navigate to real-time health telemetry
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 12,
          }}
        >
          {healthGrid.map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className="card health-grid-card"
              style={{
                padding: 14,
                borderRadius: 10,
                background: 'var(--card-bg, #FFFFFF)',
                border: '1px solid var(--border, #E4E7EC)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                  {item.domain}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: item.health === 'healthy' ? '#22A06B' : item.health === 'at-risk' ? '#E97F0A' : '#DE350B',
                    }}
                  />
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)', textTransform: 'capitalize' }}>
                    {item.health} • {item.exceptions} alert{item.exceptions !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              <ChevronRight size={16} color="var(--text-tertiary, #98A2B3)" />
            </div>
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
              maxWidth: '90vw',
              background: 'var(--surface-raised, #FFFFFF)',
              boxShadow: '-8px 0 30px rgba(0, 0, 0, 0.15)',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              padding: 24,
              overflowY: 'auto',
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
