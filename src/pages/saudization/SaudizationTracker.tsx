import React, { useState, useMemo } from 'react';
import { useDataStore } from '../../data/mockDataStore';
import { getSaudizationStats, type MasterEmployee, type EmployeeLevel } from '../../data/master-employees';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import EmployeeDetailModal from '../../components/common/EmployeeDetailModal';
import { ShieldCheck, AlertTriangle, Eye } from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend
} from 'recharts';

interface DomainRow {
  locationBucket: string;
  subDomains: string;
  totalCount: number;
  saudiCount: number;
  expatCount: number;
  targetPct: number;
  actualPct: number;
  gapPct: number;
  status: 'OK' | 'Not OK';
}

const DOMAIN_SUBDOMAINS: Record<string, string> = {
  'Program Management': 'Governance & Operational Model, KPIs & SLAs Mgmt, Mobilization Mgmt',
  'Proj Mgmt & Mobilization': 'Project Delivery, Resource Mobilization & Onboarding',
  'Integrated Command Center': 'Command Center Operations, Real-Time Monitoring & Telemetry',
  'Service Desk Mgmt': 'Service Desk L1/L2 Operations, Contact Resolution & Incident Dispatch',
  'Tools Management': 'ITSM Support Tools, ServiceNow, Infra Monitoring Tools',
  'Service Assurance': 'Compliance & BCM, Process Compliance, Performance Mgmt, Service Support',
  'Infrastructure': 'Infra Service Ops, App Admin, Enterprise DBA, Infra Support Tools',
  'Application Mgmt': 'Digital Channels, Masar, Financial Systems, E-Marketplace, Integrations, Mobile App, UGRP',
  'Backup and support services': 'Enterprise Backup & Recovery, Disaster Recovery Support Services',
};

const LEVELS: EmployeeLevel[] = ['L1', 'L2', 'L3', 'L4', 'SME/Manager'];

const SaudizationTracker: React.FC = () => {
  const { employees } = useDataStore();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<MasterEmployee | null>(null);
  const [isEmpModalOpen, setIsEmpModalOpen] = useState(false);

  const stats = getSaudizationStats();

  const domainRows: DomainRow[] = useMemo(() => {
    return stats.domains.map(d => {
      const expatCount = d.totalCount - d.saudiCount;
      const gapPct = +(d.actualPct - d.targetPct).toFixed(1);
      const isOk = d.actualPct >= d.targetPct;
      return {
        locationBucket: d.locationBucket,
        subDomains: DOMAIN_SUBDOMAINS[d.locationBucket] || 'Operational Sub-domain Scope',
        totalCount: d.totalCount,
        saudiCount: d.saudiCount,
        expatCount: expatCount,
        targetPct: d.targetPct,
        actualPct: d.actualPct,
        gapPct: gapPct,
        status: isOk ? 'OK' : 'Not OK',
      };
    });
  }, [stats]);

  const belowTargetCount = domainRows.filter(d => d.status === 'Not OK').length;
  const onTrackCount = domainRows.filter(d => d.status === 'OK').length;
  const expatCount = stats.overallTotal - stats.overallSaudiCount;
  const overallGap = +(stats.overallPct - 68.0).toFixed(1);

  // Male / Female calculations
  const maleCount = useMemo(() => employees.filter(e => e.gender === 'Male').length, [employees]);
  const femaleCount = useMemo(() => employees.filter(e => e.gender === 'Female').length, [employees]);
  const maleSaudiCount = useMemo(() => employees.filter(e => e.gender === 'Male' && e.expatLocal === 'Local').length, [employees]);
  const femaleSaudiCount = useMemo(() => employees.filter(e => e.gender === 'Female' && e.expatLocal === 'Local').length, [employees]);

  // Level-based breakdown data for chart
  const levelChartData = useMemo(() => {
    return LEVELS.map(lvl => {
      const empsAtLevel = employees.filter(e => e.level === lvl);
      const saudi = empsAtLevel.filter(e => e.expatLocal === 'Local').length;
      const expat = empsAtLevel.filter(e => e.expatLocal === 'Expat').length;
      const total = empsAtLevel.length;
      const pct = total > 0 ? Math.round((saudi / total) * 100) : 0;
      return {
        level: lvl,
        'Saudi National': saudi,
        'Expatriate': expat,
        total,
        saudiPct: pct,
      };
    });
  }, [employees]);

  // Filtered employees for drill-down view
  const domainEmployees = useMemo(() => {
    if (!selectedDomain) return [];
    return employees.filter(e => e.locationBucket === selectedDomain);
  }, [employees, selectedDomain]);

  const handleOpenEmployee = (emp: MasterEmployee) => {
    setSelectedEmployee(emp);
    setIsEmpModalOpen(true);
  };

  // ─── DOMAIN TABLE COLUMNS ─────────────────────────────────
  const domainColumns: ColumnDef<DomainRow>[] = [
    {
      header: 'Domain / Location Bucket',
      accessorKey: 'locationBucket',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', fontSize: '0.875rem' }}>
            {row.locationBucket}
          </div>
          <div style={{ fontSize: '0.71875rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2, maxWidth: 300 }}>
            {row.subDomains}
          </div>
        </div>
      ),
    },
    {
      header: 'Total Staff',
      accessorKey: 'totalCount',
      width: '90px',
      cell: (row) => <span style={{ fontWeight: 700 }}>{row.totalCount}</span>,
    },
    {
      header: 'Saudi (National)',
      accessorKey: 'saudiCount',
      width: '110px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: '#22A06B' }}>
          {row.saudiCount}
        </span>
      ),
    },
    {
      header: 'Expatriate',
      accessorKey: 'expatCount',
      width: '90px',
      cell: (row) => <span style={{ color: 'var(--text-secondary, #475467)' }}>{row.expatCount}</span>,
    },
    {
      header: 'Target %',
      accessorKey: 'targetPct',
      width: '90px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>
          {row.targetPct}%
        </span>
      ),
    },
    {
      header: 'Actual %',
      accessorKey: 'actualPct',
      width: '90px',
      cell: (row) => (
        <span style={{ fontWeight: 800, color: row.status === 'OK' ? '#22A06B' : '#DE350B' }}>
          {row.actualPct}%
        </span>
      ),
    },
    {
      header: 'Gap %',
      accessorKey: 'gapPct',
      width: '80px',
      cell: (row) => {
        const isPos = row.gapPct >= 0;
        return (
          <span style={{ fontWeight: 700, color: isPos ? '#22A06B' : '#DE350B' }}>
            {isPos ? `+${row.gapPct}%` : `${row.gapPct}%`}
          </span>
        );
      },
    },
    {
      header: 'Status',
      accessorKey: 'status',
      width: '110px',
      cell: (row) => {
        const isOk = row.status === 'OK';
        return (
          <span
            style={{
              padding: '3px 10px',
              borderRadius: 12,
              fontWeight: 800,
              fontSize: '0.75rem',
              background: isOk ? '#E3FCEF' : '#FFEBE6',
              color: isOk ? '#22A06B' : '#DE350B',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {isOk ? <ShieldCheck size={12} /> : <AlertTriangle size={12} />}
            {isOk ? 'OK / On Track' : 'Below Target'}
          </span>
        );
      },
    },
    {
      header: 'Drill-Down',
      sortable: false,
      width: '110px',
      cell: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedDomain(selectedDomain === row.locationBucket ? null : row.locationBucket);
          }}
          style={{
            padding: '4px 10px',
            borderRadius: 6,
            background: selectedDomain === row.locationBucket ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--bg-secondary, #F7F8FA)',
            border: '1px solid var(--border, #E4E7EC)',
            color: selectedDomain === row.locationBucket ? '#FFFFFF' : 'var(--ncgr-deep-blue, #074A76)',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Eye size={12} />
          <span>{selectedDomain === row.locationBucket ? 'Close Staff' : 'View Staff'}</span>
        </button>
      ),
    },
  ];

  // ─── DRILL-DOWN EMPLOYEE TABLE COLUMNS ────────────────────
  const empColumns: ColumnDef<MasterEmployee>[] = [
    {
      header: 'Position',
      accessorKey: 'position',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.position}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
            {row.employeeId}
          </div>
        </div>
      ),
    },
    {
      header: 'Level',
      accessorKey: 'level',
      width: '80px',
      cell: (row) => (
        <span
          style={{
            padding: '2px 8px',
            borderRadius: 6,
            background: 'rgba(7, 74, 118, 0.08)',
            color: 'var(--ncgr-deep-blue, #074A76)',
            fontWeight: 800,
            fontSize: '0.75rem',
          }}
        >
          {row.level}
        </span>
      ),
    },
    {
      header: 'Name',
      accessorKey: 'name',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>{row.email}</div>
        </div>
      ),
    },
    {
      header: 'Gender',
      accessorKey: 'gender',
      width: '80px',
      cell: (row) => (
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
          {row.gender}
        </span>
      ),
    },
    {
      header: 'Tower',
      accessorKey: 'tower',
    },
    {
      header: 'Department',
      accessorKey: 'department',
    },
    {
      header: 'Manager',
      accessorKey: 'manager',
    },
    {
      header: 'Nationality Type',
      accessorKey: 'expatLocal',
      cell: (row) => (
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: row.expatLocal === 'Local' ? '#22A06B' : '#074A76',
            padding: '2px 8px',
            borderRadius: 4,
            background: row.expatLocal === 'Local' ? 'rgba(34, 160, 107, 0.1)' : 'rgba(7, 74, 118, 0.08)',
          }}
        >
          {row.expatLocal === 'Local' ? 'Saudi National' : 'Expatriate'}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => (
        <span
          style={{
            padding: '2px 8px',
            borderRadius: 12,
            background: row.status === 'Active' ? '#E3FCEF' : '#FFF7E6',
            color: row.status === 'Active' ? '#22A06B' : '#E97F0A',
            fontWeight: 700,
            fontSize: '0.6875rem',
          }}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: 'Profile',
      sortable: false,
      width: '80px',
      cell: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpenEmployee(row);
          }}
          style={{
            padding: '4px 8px',
            borderRadius: 4,
            background: 'var(--bg-secondary, #F7F8FA)',
            border: '1px solid var(--border, #E4E7EC)',
            color: 'var(--ncgr-deep-blue, #074A76)',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        >
          View Profile
        </button>
      ),
    },
  ];

  const empFilters: FilterDef<MasterEmployee>[] = [
    { key: 'level', label: 'Level', options: LEVELS.map(l => ({ label: l, value: l })) },
    { key: 'gender', label: 'Gender', options: ['Male', 'Female'].map(g => ({ label: g, value: g })) },
    { key: 'expatLocal', label: 'Nationality', options: [{ label: 'Saudi National', value: 'Local' }, { label: 'Expatriate', value: 'Expat' }] },
  ];

  // Chart data
  const pieData = [
    { name: 'Saudi National', value: stats.overallSaudiCount, color: '#40904F' },
    { name: 'Expatriate', value: expatCount, color: '#074A76' },
  ];

  const genderPieData = [
    { name: 'Male Staff', value: maleCount, color: '#074A76' },
    { name: 'Female Staff', value: femaleCount, color: '#1FBBB0' },
  ];

  const barChartData = domainRows.map(d => ({
    name: d.locationBucket.length > 14 ? d.locationBucket.slice(0, 12) + '...' : d.locationBucket,
    fullName: d.locationBucket,
    subDomains: d.subDomains,
    Target: d.targetPct,
    Actual: d.actualPct,
    gapPct: d.gapPct,
    isBelowTarget: d.actualPct < d.targetPct,
    totalCount: d.totalCount,
    saudiCount: d.saudiCount,
    expatCount: d.expatCount,
  }));

  const CustomDomainTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isBelow = data.Actual < data.Target;
      return (
        <div
          style={{
            background: 'var(--surface-raised, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
            borderRadius: 8,
            padding: '10px 14px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
            minWidth: 220,
          }}
        >
          <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--text, #101828)', marginBottom: 2 }}>
            {data.fullName}
          </div>
          <div style={{ fontSize: '0.71875rem', color: 'var(--text-tertiary, #98A2B3)', marginBottom: 8 }}>
            {data.saudiCount} / {data.totalCount} Saudi ({data.expatCount} Expatriate)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: 4 }}>
            <span style={{ color: '#074A76', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: '#074A76', display: 'inline-block' }} />
              Target:
            </span>
            <span style={{ fontWeight: 700, color: '#074A76' }}>{data.Target}%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: 8 }}>
            <span style={{ color: isBelow ? '#D97706' : '#22A06B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: isBelow ? '#F59E0B' : '#22A06B', display: 'inline-block' }} />
              Actual:
            </span>
            <span style={{ fontWeight: 800, color: isBelow ? '#D97706' : '#22A06B' }}>{data.Actual}%</span>
          </div>
          <div
            style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 4,
              textAlign: 'center',
              background: isBelow ? '#FFFBEB' : '#ECFDF5',
              color: isBelow ? '#B45309' : '#047857',
              border: `1px solid ${isBelow ? '#FDE68A' : '#A7F3D0'}`,
            }}
          >
            {isBelow ? `Below Target (${data.gapPct}%)` : `On Track (+${data.gapPct}%)`}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="page-container" style={{ paddingBottom: 48 }}>
      {/* Page Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text, #101828)', margin: 0 }}>
            Saudization Tracker & Governance Dashboard
          </h1>
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 12,
              background: 'rgba(64, 144, 79, 0.1)',
              color: '#40904F',
              border: '1px solid rgba(64, 144, 79, 0.25)',
            }}
          >
            AUTHORITATIVE TARGET BASELINE
          </span>
        </div>
      </div>

      {/* ─── MASTER EXECUTIVE SUMMARY CARDS (INCL MALE/FEMALE) ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 12,
          marginBottom: 24,
        }}
      >
        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #074A76' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Total Workforce</div>
          <div style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text, #101828)', marginTop: 2 }}>{stats.overallTotal}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Full operational strength</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #40904F' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#40904F', textTransform: 'uppercase' }}>Saudi Staff</div>
          <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#40904F', marginTop: 2 }}>{stats.overallSaudiCount}</div>
          <div style={{ fontSize: '0.6875rem', color: '#40904F', fontWeight: 600, marginTop: 2 }}>National workforce</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #074A76' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Expatriate Staff</div>
          <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#074A76', marginTop: 2 }}>{expatCount}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)', marginTop: 2 }}>Expatriate specialists</div>
        </div>

        {/* Male KPI */}
        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #074A76' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Male Staff</div>
          <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#074A76', marginTop: 2 }}>{maleCount}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)', marginTop: 2 }}>{maleSaudiCount} Saudi ({Math.round((maleSaudiCount / Math.max(maleCount, 1)) * 100)}%)</div>
        </div>

        {/* Female KPI */}
        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #1FBBB0' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#1FBBB0', textTransform: 'uppercase' }}>Female Staff</div>
          <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1FBBB0', marginTop: 2 }}>{femaleCount}</div>
          <div style={{ fontSize: '0.6875rem', color: '#1FBBB0', fontWeight: 600, marginTop: 2 }}>{femaleSaudiCount} Saudi ({Math.round((femaleSaudiCount / Math.max(femaleCount, 1)) * 100)}%)</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #22A06B' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Saudization %</div>
          <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#22A06B', marginTop: 2 }}>{stats.overallPct}%</div>
          <div style={{ fontSize: '0.6875rem', color: '#22A06B', fontWeight: 600, marginTop: 2 }}>Target: 68.0%</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: `3px solid ${overallGap >= 0 ? '#22A06B' : '#DE350B'}` }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Overall Gap</div>
          <div style={{ fontSize: '1.375rem', fontWeight: 800, color: overallGap >= 0 ? '#22A06B' : '#DE350B', marginTop: 2 }}>
            {overallGap >= 0 ? `+${overallGap}%` : `${overallGap}%`}
          </div>
          <div style={{ fontSize: '0.6875rem', color: overallGap >= 0 ? '#22A06B' : '#DE350B', fontWeight: 600, marginTop: 2 }}>
            {overallGap >= 0 ? 'Surpassing Target' : 'Below Target'}
          </div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: `3px solid ${belowTargetCount > 0 ? '#E97F0A' : '#22A06B'}` }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Domain Compliance</div>
          <div style={{ fontSize: '1.375rem', fontWeight: 800, color: belowTargetCount > 0 ? '#E97F0A' : '#22A06B', marginTop: 2 }}>
            {onTrackCount} / 9
          </div>
          <div style={{ fontSize: '0.6875rem', color: belowTargetCount > 0 ? '#E97F0A' : '#22A06B', fontWeight: 600, marginTop: 2 }}>
            {onTrackCount} Domains On Track
          </div>
        </div>
      </div>

      {/* ─── LEVEL-BASED SAUDIZATION & WORKFORCE DEMOGRAPHICS ─── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 20,
          marginBottom: 24,
        }}
      >
        {/* Horizontal Stacked Bar: Level vs Nationality */}
        <div className="card" style={{ padding: 20, borderRadius: 12, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
              Workforce Level Distribution (L1 to SME/Manager)
            </h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#40904F' }}>
              Saudi vs Expatriate
            </span>
          </div>
          <p style={{ margin: '0 0 12px', fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
            Headcount and representation percentage across organizational tiers
          </p>

          <div style={{ height: 220, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={levelChartData} margin={{ top: 5, right: 20, left: 35, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border, #E4E7EC)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--text-secondary, #475467)' }} />
                <YAxis dataKey="level" type="category" tick={{ fontSize: 11, fontWeight: 700, fill: 'var(--text, #101828)' }} />
                <Tooltip
                  contentStyle={{ background: 'var(--surface-raised, #FFFFFF)', borderRadius: 8, borderColor: 'var(--border, #E4E7EC)', fontSize: 12 }}
                  formatter={(val, name) => [`${val} staff`, name]}
                />
                <Legend verticalAlign="top" height={30} wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Saudi National" stackId="a" fill="#40904F" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Expatriate" stackId="a" fill="#074A76" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Demographics Chart */}
        <div className="card" style={{ padding: 20, borderRadius: 12, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
            Workforce Demographics & Gender Representation
          </h3>
          <p style={{ margin: '0 0 12px', fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
            Male ({maleCount}) vs Female ({femaleCount}) operational workforce ratio
          </p>

          <div style={{ height: 220, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, value, percent }) => `${(name || '').split(' ')[0]}: ${value} (${((percent || 0) * 100).toFixed(0)}%)`}
                >
                  {genderPieData.map((entry, index) => (
                    <Cell key={`gender-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'var(--surface-raised, #FFFFFF)', borderRadius: 8, borderColor: 'var(--border, #E4E7EC)', fontSize: 12 }} />
                <Legend verticalAlign="bottom" height={30} wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ─── VISUALIZATIONS: TARGET VS ACTUAL & PIE DISTRIBUTION ─ */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: 20,
          marginBottom: 24,
        }}
      >
        {/* Domain Comparison BarChart */}
        <div className="card" style={{ padding: 20, borderRadius: 12, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
              Domain Target vs Actual Saudization %
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>Authoritative Figures</span>
          </div>
          <p style={{ margin: '0 0 16px', fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
            Comparative breakdown across the 9 approved location buckets
          </p>

          <div style={{ height: 260, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border, #E4E7EC)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-secondary, #475467)' }} interval={0} angle={-25} textAnchor="end" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: 'var(--text-secondary, #475467)' }} />
                <Tooltip content={<CustomDomainTooltip />} />
                <Legend
                  verticalAlign="top"
                  height={36}
                  content={() => (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 16, fontSize: '0.75rem', marginBottom: 8 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ width: 12, height: 12, borderRadius: 2, background: '#074A76', display: 'inline-block' }} />
                        Target %
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ width: 12, height: 12, borderRadius: 2, background: '#22A06B', display: 'inline-block' }} />
                        Actual (On Track)
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ width: 12, height: 12, borderRadius: 2, background: '#F59E0B', display: 'inline-block' }} />
                        Actual (Below Target)
                      </span>
                    </div>
                  )}
                />
                <Bar dataKey="Target" fill="#074A76" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Actual" radius={[4, 4, 0, 0]}>
                  {barChartData.map((entry, index) => (
                    <Cell
                      key={`cell-actual-${index}`}
                      fill={entry.isBelowTarget ? '#F59E0B' : '#22A06B'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Workforce Distribution PieChart */}
        <div className="card" style={{ padding: 20, borderRadius: 12, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
            Workforce Nationality Distribution
          </h3>
          <p style={{ margin: '0 0 16px', fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
            Consolidated Saudi ({stats.overallPct}%) vs Expatriate ({100 - stats.overallPct}%) representation
          </p>

          <div style={{ height: 260, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${(name || '').split(' ')[0]} (${((percent || 0) * 100).toFixed(0)}%)`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'var(--surface-raised, #FFFFFF)', borderRadius: 8, borderColor: 'var(--border, #E4E7EC)', fontSize: 12 }} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ─── DOMAIN COMPLIANCE TABLE ──────────────────────────── */}
      <div style={{ marginBottom: 24 }}>
        <DataTable
          data={domainRows}
          columns={domainColumns}
          searchPlaceholder="Search domain or location bucket..."
          searchKeys={['locationBucket', 'subDomains']}
          pageSize={10}
          title="Approved Saudization Domain Status & Compliance Matrix"
          subtitle="Click 'View Staff' on any row to open the complete domain workforce roster drill-down"
          exportFilename="ncgr_saudization_tracker"
        />
      </div>

      {/* ─── DRILL-DOWN: EMPLOYEES IN SELECTED DOMAIN ─────────── */}
      {selectedDomain && (
        <div
          style={{
            padding: 20,
            borderRadius: 14,
            background: 'var(--card-bg, #FFFFFF)',
            border: '2px solid var(--ncgr-deep-blue, #074A76)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)' }}>
                  Workforce Roster Drill-Down: {selectedDomain}
                </h3>
                <span style={{ padding: '2px 8px', borderRadius: 12, background: 'rgba(7, 74, 118, 0.1)', color: '#074A76', fontSize: '0.75rem', fontWeight: 700 }}>
                  {domainEmployees.length} Staff Assigned
                </span>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)' }}>
                Click any employee row to inspect profile, contact privacy mask, and Knowledge Transfer (KT) history
              </p>
            </div>
            <button
              onClick={() => setSelectedDomain(null)}
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                background: 'var(--bg-secondary, #F7F8FA)',
                border: '1px solid var(--border, #E4E7EC)',
                color: 'var(--text-secondary, #475467)',
                fontWeight: 700,
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              Close Drill-Down ✕
            </button>
          </div>

          <DataTable
            data={domainEmployees}
            columns={empColumns}
            filters={empFilters}
            searchPlaceholder="Search employee name, ID, position, manager..."
            searchKeys={['name', 'employeeId', 'position', 'manager', 'department', 'tower', 'level']}
            pageSize={10}
            onRowClick={handleOpenEmployee}
            exportFilename={`ncgr_saudization_${selectedDomain.toLowerCase().replace(/\s+/g, '_')}`}
          />
        </div>
      )}

      {/* Universal Employee Detail Modal */}
      <EmployeeDetailModal
        employee={selectedEmployee}
        isOpen={isEmpModalOpen}
        onClose={() => setIsEmpModalOpen(false)}
      />
    </div>
  );
};

export default SaudizationTracker;
