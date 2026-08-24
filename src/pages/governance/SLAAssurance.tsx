import React, { useState, useMemo, useEffect } from 'react';
import {
  Search, Download, RotateCcw,
  AlertCircle, Eye, Edit3, X
} from 'lucide-react';
import {
  MASTER_SLA_DATASET,
  type SLARecord
} from '../../data/master-sla';
import SLADetailDrawer from '../../components/sla/SLADetailDrawer';
import UpdateSLAMeasurementModal from '../../components/sla/UpdateSLAMeasurementModal';

const STORAGE_KEY = 'ncgr_sla_management_v2';

type DomainCluster =
  | 'ALL'
  | 'Program Governance'
  | 'Incident Management'
  | 'Problem Management'
  | 'Service Requests'
  | 'Change & Release'
  | 'Monitoring & Tools'
  | 'Application Operations'
  | 'Infrastructure'
  | 'Security & Compliance'
  | 'Saudization & Localization'
  | 'Performance & Capacity'
  | 'Tickets Management';

type SortOption =
  | 'default'
  | 'not_met_first'
  | 'pending_first'
  | 'met_first'
  | 'data_driven_first'
  | 'soft_first'
  | 'name_asc';

export const SLAAssurance: React.FC = () => {
  // Load from localStorage or fallback to MASTER_SLA_DATASET
  const [slas, setSlas] = useState<SLARecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return MASTER_SLA_DATASET;
  });

  const [selectedSla, setSelectedSla] = useState<SLARecord | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCluster, setSelectedCluster] = useState<DomainCluster>('ALL');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [selectedMeasurementType, setSelectedMeasurementType] = useState<string>('ALL');
  const [selectedCompliance, setSelectedCompliance] = useState<string>('ALL');
  const [selectedOwner, setSelectedOwner] = useState<string>('ALL');
  const [selectedSort, setSelectedSort] = useState<SortOption>('default');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slas));
    } catch {
      // ignore
    }
  }, [slas]);

  // Reset to Baseline
  const handleResetToBaseline = () => {
    if (window.confirm('Reset all SLA actual measurements and evidence back to official baseline?')) {
      setSlas(MASTER_SLA_DATASET);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Save measurement from modal
  const handleSaveMeasurement = (updatedSla: SLARecord) => {
    setSlas(prev => prev.map(item => (item.slaId === updatedSla.slaId ? updatedSla : item)));
    if (selectedSla && selectedSla.slaId === updatedSla.slaId) {
      setSelectedSla(updatedSla);
    }
  };

  // Open update modal
  const handleOpenUpdateModal = (sla: SLARecord) => {
    setSelectedSla(sla);
    setIsUpdateModalOpen(true);
  };

  // Open detail drawer
  const handleOpenDetail = (sla: SLARecord) => {
    setSelectedSla(sla);
    setIsDetailOpen(true);
  };

  // Unique Lists
  const allUniqueDomains = useMemo(() => {
    return Array.from(new Set(slas.map(s => s.domain))).sort();
  }, [slas]);

  const allUniqueOwners = useMemo(() => {
    return Array.from(new Set(slas.map(s => s.owner))).sort();
  }, [slas]);

  // Cluster to domain mapping helper
  const matchesCluster = (domain: string, cluster: DomainCluster) => {
    if (cluster === 'ALL') return true;
    if (cluster === 'Program Governance') return domain === 'Program Governance' || domain === 'Project Management' || domain === 'Mobilization and Transition';
    if (cluster === 'Incident Management') return domain.includes('Incident');
    if (cluster === 'Problem Management') return domain.includes('Problem');
    if (cluster === 'Service Requests') return domain.includes('Service Requests') || domain.includes('Service Desk');
    if (cluster === 'Change & Release') return domain.includes('Change') || domain.includes('Release');
    if (cluster === 'Monitoring & Tools') return domain.includes('Monitoring') || domain.includes('Automation') || domain.includes('Asset') || domain.includes('IT Support');
    if (cluster === 'Application Operations') return domain.includes('Application') || domain.includes('Business Operations') || domain.includes('Design & Architecture') || domain.includes('SA-Design');
    if (cluster === 'Infrastructure') return domain.includes('Infrastructure') || domain.includes('Network') || domain.includes('Cloud');
    if (cluster === 'Security & Compliance') return domain.includes('Security') || domain.includes('Compliance') || domain.includes('Audit') || domain.includes('Risk') || domain.includes('Access');
    if (cluster === 'Saudization & Localization') return domain.includes('Saudization') || domain.includes('Localization');
    if (cluster === 'Performance & Capacity') return domain.includes('Performance') || domain.includes('Capacity') || domain.includes('Maturity');
    if (cluster === 'Tickets Management') return domain.includes('Ticket');
    return true;
  };

  // Filtered dataset
  const filteredSLAs = useMemo(() => {
    const list = slas.filter(s => {
      // Search
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = s.name.toLowerCase().includes(q);
        const matchId = s.slaId.toLowerCase().includes(q);
        const matchNum = s.slaNumber.toLowerCase().includes(q);
        const matchDomain = s.domain.toLowerCase().includes(q);
        const matchTarget = s.target.toLowerCase().includes(q);
        const matchTool = s.toolOrSystem.toLowerCase().includes(q);
        const matchMetric = s.measurableMetric.toLowerCase().includes(q);
        const matchOwner = s.owner.toLowerCase().includes(q);
        if (!matchName && !matchId && !matchNum && !matchDomain && !matchTarget && !matchTool && !matchMetric && !matchOwner) {
          return false;
        }
      }

      // Domain Cluster Filter
      if (selectedCluster !== 'ALL' && !matchesCluster(s.domain, selectedCluster)) {
        return false;
      }

      // Detailed Domain Filter
      if (selectedDomain !== 'ALL' && s.domain !== selectedDomain) {
        return false;
      }

      // Measurement Type Filter (Strict 2-tier: Data-Driven vs Soft)
      if (selectedMeasurementType !== 'ALL' && s.measurementType !== selectedMeasurementType) {
        return false;
      }

      // Compliance Status Filter
      if (selectedCompliance !== 'ALL' && s.status !== selectedCompliance) {
        return false;
      }

      // Owner Filter
      if (selectedOwner !== 'ALL' && s.owner !== selectedOwner) {
        return false;
      }

      return true;
    });

    // Sorting
    return list.sort((a, b) => {
      if (selectedSort === 'not_met_first') {
        if (a.status === 'Not Met' && b.status !== 'Not Met') return -1;
        if (a.status !== 'Not Met' && b.status === 'Not Met') return 1;
      }
      if (selectedSort === 'pending_first') {
        if (a.status === 'Pending / Not Measured' && b.status !== 'Pending / Not Measured') return -1;
        if (a.status !== 'Pending / Not Measured' && b.status === 'Pending / Not Measured') return 1;
      }
      if (selectedSort === 'met_first') {
        if (a.status === 'Met' && b.status !== 'Met') return -1;
        if (a.status !== 'Met' && b.status === 'Met') return 1;
      }
      if (selectedSort === 'data_driven_first') {
        if (a.measurementType === 'Data-Driven / Tool-Measured' && b.measurementType !== 'Data-Driven / Tool-Measured') return -1;
        if (a.measurementType !== 'Data-Driven / Tool-Measured' && b.measurementType === 'Data-Driven / Tool-Measured') return 1;
      }
      if (selectedSort === 'soft_first') {
        if (a.measurementType === 'Soft / Manual' && b.measurementType !== 'Soft / Manual') return -1;
        if (a.measurementType !== 'Soft / Manual' && b.measurementType === 'Soft / Manual') return 1;
      }
      if (selectedSort === 'name_asc') {
        return a.name.localeCompare(b.name);
      }
      // Default sort by ID / SLA Number
      return a.slaId.localeCompare(b.slaId);
    });
  }, [slas, searchTerm, selectedCluster, selectedDomain, selectedMeasurementType, selectedCompliance, selectedOwner, selectedSort]);

  // ─── DYNAMIC SUMMARY INDICATORS (RESPONDS TO CURRENT FILTERS) ────────
  const totalFilteredCount = filteredSLAs.length;
  const metCount = filteredSLAs.filter(s => s.status === 'Met').length;
  const notMetCount = filteredSLAs.filter(s => s.status === 'Not Met').length;
  const pendingCount = filteredSLAs.filter(s => s.status === 'Pending / Not Measured').length;
  const dataDrivenCount = filteredSLAs.filter(s => s.measurementType === 'Data-Driven / Tool-Measured').length;
  const softCount = filteredSLAs.filter(s => s.measurementType === 'Soft / Manual').length;

  const compliancePercentage = totalFilteredCount > 0 ? ((metCount / totalFilteredCount) * 100).toFixed(1) : '100.0';

  // Export CSV Matrix
  const handleExportCSV = () => {
    const headers = [
      'SLA ID',
      'SLA No',
      'Source Sheet',
      'Logical Group / Domain',
      'SLA Name',
      'Target',
      'Actual Value',
      'Compliance Status',
      'Measurement Type',
      'Measurement Mode',
      'Tool / System',
      'Measurable Metric',
      'Owner',
      'Reporting Period',
      'Evidence File',
      'Last Updated'
    ];

    const rows = filteredSLAs.map(s => [
      `"${s.slaId}"`,
      `"${s.slaNumber}"`,
      `"${s.sourceSheet}"`,
      `"${s.domain.replace(/"/g, '""')}"`,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.target}"`,
      `"${s.actualValue || '-'}"`,
      `"${s.status}"`,
      `"${s.measurementType}"`,
      `"${s.measurementMode}"`,
      `"${s.toolOrSystem.replace(/"/g, '""')}"`,
      `"${s.measurableMetric.replace(/"/g, '""')}"`,
      `"${s.owner}"`,
      `"${s.reportingPeriod}"`,
      `"${s.evidence || '-'}"`,
      `"${s.lastUpdated}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NCGR_SLA_Compliance_Matrix_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Clear Filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCluster('ALL');
    setSelectedDomain('ALL');
    setSelectedMeasurementType('ALL');
    setSelectedCompliance('ALL');
    setSelectedOwner('ALL');
    setSelectedSort('default');
  };

  return (
    <div className="page-container" style={{ paddingBottom: 48 }}>
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 20,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', margin: 0 }}>
              SLA Management
            </h1>
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 12,
                background: 'rgba(7, 74, 118, 0.1)',
                color: 'var(--ncgr-deep-blue, #074A76)',
                border: '1px solid rgba(7, 74, 118, 0.2)',
              }}
            >
              CONTRACTUAL & OPERATIONAL ASSURANCE
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={handleResetToBaseline}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              border: '1px solid var(--border, #E4E7EC)',
              background: 'var(--card-bg, #FFFFFF)',
              color: 'var(--text-secondary, #475467)',
              fontWeight: 600,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
            title="Reset to official baseline dataset"
          >
            <RotateCcw size={14} />
            <span>Reset Baseline</span>
          </button>

          <button
            onClick={handleExportCSV}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              background: 'var(--ncgr-deep-blue, #074A76)',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 2px 6px rgba(7, 74, 118, 0.25)',
            }}
          >
            <Download size={15} />
            <span>Export Compliance Matrix (CSV)</span>
          </button>
        </div>
      </div>

      {/* ─── DYNAMIC TOP SUMMARY STRIP (RESPONSIVE TO ACTIVE FILTERS) ───────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #074A76' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Total SLAs</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 2 }}>{totalFilteredCount}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>In active view</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #22A06B' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>Met ({compliancePercentage}%)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 2 }}>{metCount}</div>
          <div style={{ fontSize: '0.6875rem', color: '#22A06B', fontWeight: 600, marginTop: 2 }}>Meeting target</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #DE350B' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>Not Met</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 2 }}>{notMetCount}</div>
          <div style={{ fontSize: '0.6875rem', color: '#DE350B', fontWeight: 600, marginTop: 2 }}>Breach violations</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #E97F0A' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#E97F0A', textTransform: 'uppercase' }}>Pending / Not Measured</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E97F0A', marginTop: 2 }}>{pendingCount}</div>
          <div style={{ fontSize: '0.6875rem', color: '#E97F0A', fontWeight: 600, marginTop: 2 }}>Awaiting data / review</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #074A76' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#074A76', textTransform: 'uppercase' }}>Data-Driven / Tool</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 2 }}>{dataDrivenCount}</div>
          <div style={{ fontSize: '0.6875rem', color: '#074A76', fontWeight: 600, marginTop: 2 }}>Automated telemetry</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #671E75' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#671E75', textTransform: 'uppercase' }}>Soft / Manual</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#671E75', marginTop: 2 }}>{softCount}</div>
          <div style={{ fontSize: '0.6875rem', color: '#671E75', fontWeight: 600, marginTop: 2 }}>Evidence & QA audit</div>
        </div>
      </div>

      {/* Domain Cluster Quick-Filter Bar */}
      <div
        style={{
          background: 'var(--card-bg, #FFFFFF)',
          border: '1px solid var(--border, #E4E7EC)',
          borderRadius: 12,
          padding: '14px 18px',
          marginBottom: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {/* Domain Cluster Chips */}
        <div>
          <div style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.04em' }}>
            Filter by SLA Domain Cluster
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            {[
              { id: 'ALL', label: 'All Domains' },
              { id: 'Program Governance', label: 'Program Governance' },
              { id: 'Incident Management', label: 'Incident Management' },
              { id: 'Problem Management', label: 'Problem Management' },
              { id: 'Service Requests', label: 'Service Requests' },
              { id: 'Change & Release', label: 'Change & Release' },
              { id: 'Monitoring & Tools', label: 'Monitoring & Support Tools' },
              { id: 'Application Operations', label: 'Application Operations' },
              { id: 'Infrastructure', label: 'Infrastructure & Cloud' },
              { id: 'Security & Compliance', label: 'Security & Compliance' },
              { id: 'Saudization & Localization', label: 'Saudization & Localization' },
              { id: 'Performance & Capacity', label: 'Performance & Capacity' },
              { id: 'Tickets Management', label: 'Tickets Management' },
            ].map(cluster => (
              <button
                key={cluster.id}
                onClick={() => setSelectedCluster(cluster.id as DomainCluster)}
                style={{
                  padding: '5px 11px',
                  borderRadius: 6,
                  border: selectedCluster === cluster.id ? '1px solid var(--ncgr-deep-blue, #074A76)' : '1px solid var(--border, #E4E7EC)',
                  background: selectedCluster === cluster.id ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--bg-secondary, #F8FAFC)',
                  color: selectedCluster === cluster.id ? '#FFFFFF' : 'var(--text-secondary, #475467)',
                  fontSize: '0.75rem',
                  fontWeight: selectedCluster === cluster.id ? 700 : 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {cluster.label}
              </button>
            ))}
          </div>
        </div>

        {/* Multi-Dimensional Filter Bar */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, borderTop: '1px solid var(--border, #E4E7EC)', paddingTop: 12 }}>
          {/* Global Search */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid var(--border, #E4E7EC)',
              background: 'var(--bg-secondary, #F8FAFC)',
              flex: 1,
              minWidth: 240,
            }}
          >
            <Search size={15} color="var(--text-tertiary, #98A2B3)" />
            <input
              type="text"
              placeholder="Search by SLA No., name, domain, target, tool, metric, owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.8125rem',
                width: '100%',
                color: 'var(--text, #101828)',
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-tertiary, #98A2B3)', padding: 0 }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Measurement Type Filter (Strict: Data-Driven vs Soft only) */}
          <select
            value={selectedMeasurementType}
            onChange={(e) => setSelectedMeasurementType(e.target.value)}
            style={{
              padding: '7px 10px',
              borderRadius: 6,
              border: '1px solid var(--border, #E4E7EC)',
              fontSize: '0.8125rem',
              background: 'var(--card-bg, #FFFFFF)',
              color: 'var(--text, #101828)',
              fontWeight: 600,
            }}
          >
            <option value="ALL">All Measurement Types</option>
            <option value="Data-Driven / Tool-Measured">⚡ Data-Driven / Tool-Measured</option>
            <option value="Soft / Manual">✍️ Soft / Manual</option>
          </select>

          {/* Compliance Status Filter */}
          <select
            value={selectedCompliance}
            onChange={(e) => setSelectedCompliance(e.target.value)}
            style={{
              padding: '7px 10px',
              borderRadius: 6,
              border: '1px solid var(--border, #E4E7EC)',
              fontSize: '0.8125rem',
              background: 'var(--card-bg, #FFFFFF)',
              color: 'var(--text, #101828)',
              fontWeight: 600,
            }}
          >
            <option value="ALL">All Compliance Statuses</option>
            <option value="Met">✓ Met</option>
            <option value="Not Met">✗ Not Met</option>
            <option value="Pending / Not Measured">⏳ Pending / Not Measured</option>
          </select>

          {/* Detailed Domain Filter Dropdown */}
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            style={{
              padding: '7px 10px',
              borderRadius: 6,
              border: '1px solid var(--border, #E4E7EC)',
              fontSize: '0.8125rem',
              background: 'var(--card-bg, #FFFFFF)',
              color: 'var(--text, #101828)',
              fontWeight: 600,
              maxWidth: 180,
            }}
          >
            <option value="ALL">Specific Domain (All)</option>
            {allUniqueDomains.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Owner Filter */}
          <select
            value={selectedOwner}
            onChange={(e) => setSelectedOwner(e.target.value)}
            style={{
              padding: '7px 10px',
              borderRadius: 6,
              border: '1px solid var(--border, #E4E7EC)',
              fontSize: '0.8125rem',
              background: 'var(--card-bg, #FFFFFF)',
              color: 'var(--text, #101828)',
              fontWeight: 600,
            }}
          >
            <option value="ALL">Owner (All)</option>
            {allUniqueOwners.map(own => (
              <option key={own} value={own}>{own}</option>
            ))}
          </select>

          {/* Sorting Dropdown */}
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value as SortOption)}
            style={{
              padding: '7px 10px',
              borderRadius: 6,
              border: '1px solid var(--border, #E4E7EC)',
              fontSize: '0.8125rem',
              background: 'var(--card-bg, #FFFFFF)',
              color: 'var(--text, #101828)',
              fontWeight: 600,
            }}
          >
            <option value="default">Default Sort (SLA No.)</option>
            <option value="not_met_first">🚨 Not Met First</option>
            <option value="pending_first">⏳ Pending First</option>
            <option value="met_first">✓ Met First</option>
            <option value="data_driven_first">⚡ Data-Driven First</option>
            <option value="soft_first">✍️ Soft First</option>
            <option value="name_asc">Name (A-Z)</option>
          </select>

          {/* Reset Filters Button */}
          {(searchTerm || selectedCluster !== 'ALL' || selectedDomain !== 'ALL' || selectedMeasurementType !== 'ALL' || selectedCompliance !== 'ALL' || selectedOwner !== 'ALL' || selectedSort !== 'default') && (
            <button
              onClick={handleClearFilters}
              style={{
                padding: '7px 12px',
                borderRadius: 6,
                border: '1px solid var(--border, #E4E7EC)',
                background: 'var(--bg-secondary, #F1F5F9)',
                color: 'var(--text-secondary, #475467)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* ─── MAIN SLA DATA TABLE (DENSE, PROFESSIONAL INTERFACE) ─────────── */}
      <div
        style={{
          background: 'var(--card-bg, #FFFFFF)',
          border: '1px solid var(--border, #E4E7EC)',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}
      >
        <div
          style={{
            padding: '14px 18px',
            borderBottom: '1px solid var(--border, #E4E7EC)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-secondary, #F8FAFC)',
          }}
        >
          <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
            SLA Assurance Register ({filteredSLAs.length} records)
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
            Showing {filteredSLAs.length} of {slas.length} total contractual SLAs
          </span>
        </div>

        {filteredSLAs.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center' }}>
            <AlertCircle size={36} color="var(--text-tertiary, #98A2B3)" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
              No SLAs match the selected filter criteria.
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)' }}>
              Try adjusting your domain selection, clearing search terms, or switching measurement types.
            </p>
            <button
              onClick={handleClearFilters}
              style={{
                padding: '8px 18px',
                borderRadius: 6,
                background: 'var(--ncgr-deep-blue, #074A76)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '0.8125rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary, #F8FAFC)', borderBottom: '1px solid var(--border, #E4E7EC)', textAlign: 'left' }}>
                  <th style={{ padding: '10px 14px', width: 85, fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>SLA No.</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>SLA Commitment & Name</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 170 }}>Logical Group / Domain</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 140 }}>Measurement Type</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 85 }}>Target</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 85 }}>Actual</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 100 }}>Status</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 150 }}>Source / Tool</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 120 }}>Owner</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 130, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSLAs.map((sla) => {
                  const isMet = sla.status === 'Met';
                  const isNotMet = sla.status === 'Not Met';

                  const statusBg = isMet ? '#E3FCEF' : isNotMet ? '#FFEBE6' : '#FFF7E6';
                  const statusColor = isMet ? '#22A06B' : isNotMet ? '#DE350B' : '#E97F0A';

                  const isDataDriven = sla.measurementType === 'Data-Driven / Tool-Measured';

                  return (
                    <tr
                      key={sla.slaId}
                      onClick={() => handleOpenDetail(sla)}
                      style={{
                        borderBottom: '1px solid var(--border, #E4E7EC)',
                        cursor: 'pointer',
                        transition: 'background 0.1s ease',
                      }}
                      className="table-row-hover"
                    >
                      {/* SLA Number & Sheet Badge */}
                      <td style={{ padding: '10px 14px' }}>
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontWeight: 800,
                            fontSize: '0.6875rem',
                            color: 'var(--ncgr-deep-blue, #074A76)',
                            background: 'var(--bg-secondary, #F1F5F9)',
                            padding: '2px 6px',
                            borderRadius: 4,
                            border: '1px solid var(--border, #E4E7EC)',
                            display: 'inline-block',
                          }}
                        >
                          {sla.slaNumber}
                        </span>
                        <div style={{ fontSize: '0.5625rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>
                          {sla.sourceSheet}
                        </div>
                      </td>

                      {/* SLA Name */}
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text, #101828)', fontSize: '0.8125rem', lineHeight: 1.35 }}>
                          {sla.name}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)', marginTop: 2 }}>
                          Subcategory: {sla.subcategory}
                        </div>
                      </td>

                      {/* Domain Badge */}
                      <td style={{ padding: '10px 14px' }}>
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            color: '#074A76',
                            background: '#E6F0FA',
                            padding: '2px 6px',
                            borderRadius: 4,
                            display: 'inline-block',
                          }}
                        >
                          {sla.domain}
                        </span>
                      </td>

                      {/* Measurement Type (Data-Driven vs Soft) */}
                      <td style={{ padding: '10px 14px' }}>
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            color: isDataDriven ? '#074A76' : '#671E75',
                            background: isDataDriven ? 'rgba(7, 74, 118, 0.08)' : 'rgba(103, 30, 117, 0.08)',
                            padding: '2px 6px',
                            borderRadius: 4,
                            display: 'inline-block',
                          }}
                        >
                          {isDataDriven ? '⚡ Data-Driven' : '✍️ Soft / Manual'}
                        </span>
                      </td>

                      {/* Target */}
                      <td style={{ padding: '10px 14px', fontWeight: 800, color: '#074A76', fontSize: '0.8125rem' }}>
                        {sla.target}
                      </td>

                      {/* Actual */}
                      <td style={{ padding: '10px 14px', fontWeight: 800, color: statusColor, fontSize: '0.8125rem' }}>
                        {sla.actualValue || '-'}
                      </td>

                      {/* Status Badge */}
                      <td style={{ padding: '10px 14px' }}>
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: 6,
                            background: statusBg,
                            color: statusColor,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: statusColor }} />
                          {isMet ? 'MET' : isNotMet ? 'NOT MET' : 'PENDING'}
                        </span>
                      </td>

                      {/* Source Tool */}
                      <td style={{ padding: '10px 14px', color: 'var(--text-secondary, #475467)', fontSize: '0.75rem' }}>
                        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 140 }} title={sla.toolOrSystem}>
                          {sla.toolOrSystem}
                        </div>
                      </td>

                      {/* Owner */}
                      <td style={{ padding: '10px 14px', color: 'var(--text, #101828)', fontWeight: 600, fontSize: '0.75rem' }}>
                        {sla.owner}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDetail(sla);
                            }}
                            style={{
                              padding: '4px 8px',
                              borderRadius: 4,
                              background: 'var(--bg-secondary, #F1F5F9)',
                              border: '1px solid var(--border, #E4E7EC)',
                              color: 'var(--ncgr-deep-blue, #074A76)',
                              fontSize: '0.6875rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 3,
                            }}
                            title="View SLA specifications"
                          >
                            <Eye size={12} />
                            <span>Details</span>
                          </button>

                          {sla.manualInputEligible && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenUpdateModal(sla);
                              }}
                              style={{
                                padding: '4px 8px',
                                borderRadius: 4,
                                background: 'var(--ncgr-deep-blue, #074A76)',
                                border: 'none',
                                color: '#FFFFFF',
                                fontSize: '0.6875rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 3,
                              }}
                              title="Enter actual measurement value"
                            >
                              <Edit3 size={11} />
                              <span>Update</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SLA Detail Slide-Over Drawer */}
      <SLADetailDrawer
        sla={selectedSla}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onOpenUpdateModal={handleOpenUpdateModal}
      />

      {/* Update Measurement Modal */}
      <UpdateSLAMeasurementModal
        sla={selectedSla}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSaveMeasurement={handleSaveMeasurement}
      />
    </div>
  );
};

export default SLAAssurance;
