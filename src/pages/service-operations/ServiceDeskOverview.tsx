import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '../../data/mockDataStore';
import {
  ArrowRight, Users, Sparkles, Clock,
  Download, ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { COMMAND_CENTER_SIBLINGS } from './CommandCenterLandingPage';

const ticketVolumeTrend = [
  { time: '06:00', calls: 14, selfService: 8 },
  { time: '08:00', calls: 48, selfService: 28 },
  { time: '10:00', calls: 62, selfService: 45 },
  { time: '12:00', calls: 40, selfService: 32 },
  { time: '14:00', calls: 55, selfService: 38 },
  { time: '16:00', calls: 35, selfService: 22 },
  { time: '18:00', calls: 20, selfService: 15 },
  { time: '20:00', calls: 12, selfService: 8 },
];

const categoryDistribution = [
  { category: 'Account / Password', count: 95 },
  { category: 'Network / VPN', count: 48 },
  { category: 'Application Error', count: 42 },
  { category: 'Hardware / Workstation', count: 28 },
  { category: 'Access Permissions', count: 35 },
  { category: 'Email & M365', count: 24 },
];

const ServiceDeskOverview: React.FC = () => {
  const navigate = useNavigate();
  const { incidents, serviceRequests } = useDataStore();
  const [dfrExpanded, setDfrExpanded] = useState(false);

  const openIncidents = incidents.filter(i => i.status === 'Open' || i.status === 'In Progress').length;
  const openRequests = serviceRequests.filter(r => r.status === 'Open' || r.status === 'In Progress').length;
  const p1p2Count = incidents.filter(i => (i.priority === 'P1' || i.priority === 'P2') && (i.status === 'Open' || i.status === 'In Progress')).length;

  return (
    <div className="page-container" style={{ paddingBottom: 48 }}>
      {/* Sub-Page Header with Breadcrumb and Sibling Navigation */}
      <SubPageHeader
        moduleTitle="Command Center"
        modulePath="/command-center"
        pageTitle="Service Desk Overview"
        siblingPages={COMMAND_CENTER_SIBLINGS}
      />

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/command-center/incidents')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              background: 'var(--ncgr-deep-blue, #074A76)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.8125rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>View All Incidents</span>
            <ArrowRight size={14} />
          </button>
          <button
            onClick={() => navigate('/command-center/service-requests')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              background: 'var(--surface, #FFFFFF)',
              color: 'var(--text, #101828)',
              fontWeight: 600,
              fontSize: '0.8125rem',
              border: '1px solid var(--border, #E4E7EC)',
              cursor: 'pointer',
            }}
          >
            Service Requests
          </button>
        </div>

      {/* ─── COMPACT DAILY FLASH REPORT (DFR) WIDGET ─────────── */}
      {/* Relocated from Executive Dashboard to Service Desk Overview */}
      <div
        className="card"
        style={{
          padding: '16px 20px',
          borderRadius: 12,
          background: 'linear-gradient(135deg, rgba(7, 74, 118, 0.05) 0%, rgba(64, 144, 79, 0.05) 100%)',
          border: '1px solid rgba(7, 74, 118, 0.2)',
          borderLeft: '4px solid #074A76',
          marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'var(--ncgr-deep-blue, #074A76)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Clock size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)' }}>
                  Daily Flash Report (DFR) — 15 Aug 2026
                </h3>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: 4,
                    background: p1p2Count > 0 ? '#FFEBE6' : '#E3FCEF',
                    color: p1p2Count > 0 ? '#DE350B' : '#22A06B',
                  }}
                >
                  {p1p2Count > 0 ? `${p1p2Count} Active Major Events` : 'All Green'}
                </span>
              </div>
              <p style={{ margin: '2px 0 0', fontSize: '0.78125rem', color: 'var(--text-secondary, #475467)' }}>
                24-hour executive operational pulse: 274 total tickets • 84.6% FCR • 0 Unplanned Outages • 3 Standard RFCs Deployed
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => setDfrExpanded(!dfrExpanded)}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                background: 'var(--surface, #FFFFFF)',
                border: '1px solid var(--border, #E4E7EC)',
                color: 'var(--ncgr-deep-blue, #074A76)',
                fontWeight: 700,
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span>{dfrExpanded ? 'Collapse Flash' : 'View Full Flash'}</span>
              <ChevronRight size={14} style={{ transform: dfrExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            <button
              onClick={() => alert('DFR 15 Aug Report exported as PDF')}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                background: 'var(--ncgr-deep-blue, #074A76)',
                border: 'none',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Download size={14} />
              <span>Export DFR</span>
            </button>
          </div>
        </div>

        {/* Expanded 24-hour summary details */}
        {dfrExpanded && (
          <div
            style={{
              marginTop: 16,
              paddingTop: 16,
              borderTop: '1px solid rgba(7, 74, 118, 0.15)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 12,
            }}
          >
            <div style={{ padding: 10, background: 'var(--card-bg, #FFFFFF)', borderRadius: 6, border: '1px solid var(--border, #E4E7EC)' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase' }}>Shift Handover Highlight</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text, #101828)', marginTop: 2 }}>
                Night shift handover clean. SAP batch payroll job completed successfully at 04:15.
              </div>
            </div>
            <div style={{ padding: 10, background: 'var(--card-bg, #FFFFFF)', borderRadius: 6, border: '1px solid var(--border, #E4E7EC)' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase' }}>Critical Incidents (P1/P2)</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: p1p2Count > 0 ? '#DE350B' : '#22A06B', marginTop: 2 }}>
                {p1p2Count === 0 ? '0 open major incidents across all 9 towers.' : `${p1p2Count} major incident under active investigation.`}
              </div>
            </div>
            <div style={{ padding: 10, background: 'var(--card-bg, #FFFFFF)', borderRadius: 6, border: '1px solid var(--border, #E4E7EC)' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase' }}>Change Advisory (CAB)</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text, #101828)', marginTop: 2 }}>
                RFC-2026-881 (Palo Alto Rule Update) deployed with zero packet loss or rollback.
              </div>
            </div>
            <div style={{ padding: 10, background: 'var(--card-bg, #FFFFFF)', borderRadius: 6, border: '1px solid var(--border, #E4E7EC)' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase' }}>Backlog Delta</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#40904F', marginTop: 2 }}>
                -18 tickets net backlog reduction vs 7-day rolling average.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── 8 SERVICE DESK KPI METRICS ─────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 24,
        }}
      >
        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #074A76' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Daily Ticket Volume</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', marginTop: 2 }}>274</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', fontWeight: 600, marginTop: 4 }}>+8.4% vs yesterday</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #40904F' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>First Contact Resolution</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#40904F', marginTop: 2 }}>84.6%</div>
          <div style={{ fontSize: '0.75rem', color: '#40904F', fontWeight: 600, marginTop: 4 }}>Target: &gt; 80% (Pass)</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #1FBBB0' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Avg Speed of Answer</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1FBBB0', marginTop: 2 }}>14 sec</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', marginTop: 4 }}>Under 30s threshold</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #4AA6DC' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Avg Resolution Time</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4AA6DC', marginTop: 2 }}>18.4 min</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', fontWeight: 600, marginTop: 4 }}>-2.1m improvement</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #E97F0A' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Open Incident Queue</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E97F0A', marginTop: 2 }}>{openIncidents}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', marginTop: 4 }}>Across all towers</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #671E75' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Open Service Requests</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#671E75', marginTop: 2 }}>{openRequests}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', marginTop: 4 }}>Fulfillment active</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #CFDB51' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Reopen Rate</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', marginTop: 2 }}>1.8%</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', fontWeight: 600, marginTop: 4 }}>Target: &lt; 3.0%</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #DE350B' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Escalation Rate</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', marginTop: 2 }}>4.2%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', marginTop: 4 }}>To Tier-2 / Tier-3</div>
        </div>
      </div>

      {/* ─── CHARTS: HOURLY VOLUME & CATEGORY DISTRIBUTION ───── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: 20,
          marginBottom: 24,
        }}
      >
        {/* Ticket Volume by Hour AreaChart */}
        <div className="card" style={{ padding: 20, borderRadius: 12, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
            Ticket Ingestion & Channel Volume (Today)
          </h3>
          <p style={{ margin: '0 0 16px', fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
            Agent handled calls vs automated self-service bot resolutions
          </p>

          <div style={{ height: 240, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ticketVolumeTrend}>
                <defs>
                  <linearGradient id="callsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#074A76" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#074A76" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="selfGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#40904F" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#40904F" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border, #E4E7EC)" vertical={false} />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'var(--text-secondary, #475467)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary, #475467)' }} />
                <Tooltip contentStyle={{ background: 'var(--surface-raised, #FFFFFF)', borderRadius: 8, borderColor: 'var(--border, #E4E7EC)', fontSize: 12 }} />
                <Area type="monotone" dataKey="calls" name="Agent Calls" stroke="#074A76" fill="url(#callsGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="selfService" name="Bot Self-Service" stroke="#40904F" fill="url(#selfGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Ticket Categories BarChart */}
        <div className="card" style={{ padding: 20, borderRadius: 12, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
            Top Ticket Categories (MTD)
          </h3>
          <p style={{ margin: '0 0 16px', fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
            Volume breakdown across highest frequency support classifications
          </p>

          <div style={{ height: 240, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryDistribution} layout="vertical" margin={{ left: 40, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border, #E4E7EC)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--text-secondary, #475467)' }} />
                <YAxis dataKey="category" type="category" tick={{ fontSize: 10, fill: 'var(--text-secondary, #475467)' }} width={110} />
                <Tooltip contentStyle={{ background: 'var(--surface-raised, #FFFFFF)', borderRadius: 8, borderColor: 'var(--border, #E4E7EC)', fontSize: 12 }} />
                <Bar dataKey="count" name="Tickets Logged" fill="#4AA6DC" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ─── SHIFT SUMMARY & AUTOMATION HIGHLIGHTS ────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 16,
        }}
      >
        <div style={{ padding: 18, background: 'var(--card-bg, #FFFFFF)', borderRadius: 10, border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: '#074A76' }}>
            <Users size={18} />
            <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700 }}>Service Desk Staffing & Shifts</h4>
          </div>
          <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)', lineHeight: 1.4 }}>
            28 Service Desk agents assigned across 3 shifts (Morning, Evening, Night). Lead: <strong>Aisha Rahman</strong>. 94% attendance rate maintained with on-call roster backups active.
          </p>
        </div>

        <div style={{ padding: 18, background: 'var(--card-bg, #FFFFFF)', borderRadius: 10, border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: '#40904F' }}>
            <Sparkles size={18} />
            <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700 }}>AI Self-Service Impact</h4>
          </div>
          <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)', lineHeight: 1.4 }}>
            380 password resets handled automatically via MobilePASS bot in August, saving 190 engineer hours and achieving 99.4% first-attempt success.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceDeskOverview;
