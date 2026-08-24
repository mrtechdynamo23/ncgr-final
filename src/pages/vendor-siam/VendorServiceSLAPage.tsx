import React, { useState, useMemo } from 'react';
import {
  Search, Download, AlertCircle,
  Eye, X
} from 'lucide-react';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { VENDOR_SIAM_SIBLINGS } from './VendorSIAMLandingPage';
import { VENDOR_SLA_RECORDS, type VendorSLARecord } from '../../data/vendor-sla-data';
import VendorSLADetailModal from '../../components/vendor-siam/VendorSLADetailModal';

export const VendorServiceSLAPage: React.FC = () => {
  const [slas] = useState<VendorSLARecord[]>(VENDOR_SLA_RECORDS);
  const [selectedSla, setSelectedSla] = useState<VendorSLARecord | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('ALL');
  const [selectedMetricType, setSelectedMetricType] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedTier, setSelectedTier] = useState('ALL');

  // Unique Lists
  const allUniqueVendors = useMemo(() => {
    return Array.from(new Set(slas.map(s => s.vendorName))).sort();
  }, [slas]);

  const allUniqueMetricTypes = useMemo(() => {
    return Array.from(new Set(slas.map(s => s.metricType))).sort();
  }, [slas]);

  // Filtered dataset
  const filteredSLAs = useMemo(() => {
    return slas.filter(s => {
      // Search
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = s.slaName.toLowerCase().includes(q);
        const matchId = s.id.toLowerCase().includes(q);
        const matchVendor = s.vendorName.toLowerCase().includes(q);
        const matchLead = s.ncgrLead.toLowerCase().includes(q);
        const matchPenalty = s.penaltyClause.toLowerCase().includes(q);
        if (!matchName && !matchId && !matchVendor && !matchLead && !matchPenalty) {
          return false;
        }
      }

      // Vendor Filter
      if (selectedVendor !== 'ALL' && s.vendorName !== selectedVendor) {
        return false;
      }

      // Metric Type Filter
      if (selectedMetricType !== 'ALL' && s.metricType !== selectedMetricType) {
        return false;
      }

      // Status Filter
      if (selectedStatus !== 'ALL' && s.status !== selectedStatus) {
        return false;
      }

      // Tier Filter
      if (selectedTier !== 'ALL' && s.tier !== selectedTier) {
        return false;
      }

      return true;
    });
  }, [slas, searchTerm, selectedVendor, selectedMetricType, selectedStatus, selectedTier]);

  // Dynamic Summary Metrics
  const totalFilteredCount = filteredSLAs.length;
  const exceedingCount = filteredSLAs.filter(s => s.status === 'Exceeding').length;
  const meetingCount = filteredSLAs.filter(s => s.status === 'Meeting').length;
  const atRiskCount = filteredSLAs.filter(s => s.status === 'At Risk').length;
  const breachedCount = filteredSLAs.filter(s => s.status === 'Breached').length;
  const totalCreditsAccruedSAR = filteredSLAs.reduce((acc, curr) => acc + curr.serviceCreditsAccruedSAR, 0);

  const complianceRate = totalFilteredCount > 0
    ? (((exceedingCount + meetingCount) / totalFilteredCount) * 100).toFixed(1)
    : '100.0';

  // Export CSV Scorecard
  const handleExportCSV = () => {
    const headers = [
      'SLA Code',
      'Vendor Name',
      'Tier',
      'SLA Name',
      'Category',
      'Target Commitment',
      'Actual Performance',
      'Attainment Status',
      'Penalty Clause',
      'Credits Accrued (SAR)',
      'NCGR Service Lead',
      'Contract Reference'
    ];

    const rows = filteredSLAs.map(s => [
      `"${s.id}"`,
      `"${s.vendorName}"`,
      `"${s.tier}"`,
      `"${s.slaName.replace(/"/g, '""')}"`,
      `"${s.metricType}"`,
      `"${s.target}"`,
      `"${s.actualPerformance}"`,
      `"${s.status}"`,
      `"${s.penaltyClause.replace(/"/g, '""')}"`,
      `"${s.serviceCreditsAccruedSAR}"`,
      `"${s.ncgrLead}"`,
      `"${s.contractReference}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NCGR_Vendor_SIAM_SLA_Scorecard_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedVendor('ALL');
    setSelectedMetricType('ALL');
    setSelectedStatus('ALL');
    setSelectedTier('ALL');
  };

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      <SubPageHeader
        moduleTitle="Vendor & SIAM"
        modulePath="/vendor-siam"
        pageTitle="Vendor Service SLA"
        siblingPages={VENDOR_SIAM_SIBLINGS}
      />

      {/* Top Action & Calculator Banner */}
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
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 4px' }}>
            Multi-Supplier Operational SLA Governance Matrix
          </h2>
          <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)' }}>
            Real-time telemetry tracking against 16 strategic partner contracts and SIAM framework governance
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
              gap: 6,
              boxShadow: '0 2px 6px rgba(7, 74, 118, 0.2)',
            }}
          >
            <Download size={15} />
            <span>Export SIAM Scorecard (CSV)</span>
          </button>
        </div>
      </div>

      {/* ─── DYNAMIC SUMMARY INDICATORS ───────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #074A76' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Active Vendor SLAs</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 2 }}>{totalFilteredCount}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>In current view</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #22A06B' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>SIAM Compliance</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 2 }}>{complianceRate}%</div>
          <div style={{ fontSize: '0.6875rem', color: '#22A06B', fontWeight: 600, marginTop: 2 }}>{exceedingCount + meetingCount} Commitments Met</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #E97F0A' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#E97F0A', textTransform: 'uppercase' }}>At Risk SLAs</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E97F0A', marginTop: 2 }}>{atRiskCount}</div>
          <div style={{ fontSize: '0.6875rem', color: '#E97F0A', fontWeight: 600, marginTop: 2 }}>Warning threshold</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #DE350B' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>Breached SLAs</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 2 }}>{breachedCount}</div>
          <div style={{ fontSize: '0.6875rem', color: '#DE350B', fontWeight: 600, marginTop: 2 }}>Penalty invoked</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #671E75' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#671E75', textTransform: 'uppercase' }}>Total Penalty Credits</div>
          <div style={{ fontSize: '1.375rem', fontWeight: 900, color: totalCreditsAccruedSAR > 0 ? '#DE350B' : '#22A06B', marginTop: 2 }}>
            SAR {totalCreditsAccruedSAR.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.6875rem', color: totalCreditsAccruedSAR > 0 ? '#DE350B' : '#22A06B', fontWeight: 600, marginTop: 2 }}>
            {totalCreditsAccruedSAR > 0 ? 'Deduction Notice Issued' : 'Zero Deductions'}
          </div>
        </div>
      </div>

      {/* ─── MULTI-DIMENSIONAL FILTER CLUSTER ─────────────────────────── */}
      <div
        style={{
          background: 'var(--card-bg, #FFFFFF)',
          border: '1px solid var(--border, #E4E7EC)',
          borderRadius: 12,
          padding: '14px 18px',
          marginBottom: 20,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 10,
        }}
      >
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
            placeholder="Search vendor, SLA code, metric, lead, penalty..."
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

        {/* Vendor Dropdown */}
        <select
          value={selectedVendor}
          onChange={(e) => setSelectedVendor(e.target.value)}
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
          <option value="ALL">All Suppliers (16 Vendors)</option>
          {allUniqueVendors.map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        {/* Category Dropdown */}
        <select
          value={selectedMetricType}
          onChange={(e) => setSelectedMetricType(e.target.value)}
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
          <option value="ALL">All SLA Metric Types</option>
          {allUniqueMetricTypes.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        {/* Status Dropdown */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
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
          <option value="ALL">All Attainment Statuses</option>
          <option value="Exceeding">⚡ Exceeding SLA</option>
          <option value="Meeting">✓ Meeting SLA</option>
          <option value="At Risk">⚠️ At Risk</option>
          <option value="Breached">🚨 Breached</option>
        </select>

        {/* Tier Dropdown */}
        <select
          value={selectedTier}
          onChange={(e) => setSelectedTier(e.target.value)}
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
          <option value="ALL">All Criticality Tiers</option>
          <option value="Tier 1 - Mission Critical">Tier 1 - Mission Critical</option>
          <option value="Tier 2 - Business Critical">Tier 2 - Business Critical</option>
          <option value="Tier 3 - Operational Support">Tier 3 - Operational Support</option>
        </select>

        {(searchTerm || selectedVendor !== 'ALL' || selectedMetricType !== 'ALL' || selectedStatus !== 'ALL' || selectedTier !== 'ALL') && (
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

      {/* ─── MAIN VENDOR SLA DATA TABLE ───────────────────────────────── */}
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
            Vendor SIAM Service Commitments ({filteredSLAs.length} records)
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
            Governing 16 strategic partner contracts
          </span>
        </div>

        {filteredSLAs.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center' }}>
            <AlertCircle size={36} color="var(--text-tertiary, #98A2B3)" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
              No vendor SLA records match the selected filters.
            </h3>
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
                marginTop: 8,
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary, #F8FAFC)', borderBottom: '1px solid var(--border, #E4E7EC)', textAlign: 'left' }}>
                  <th style={{ padding: '10px 14px', width: 110, fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>SLA Code</th>
                  <th style={{ padding: '10px 14px', width: 160, fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>Vendor & Tier</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>SLA Commitment & Metric</th>
                  <th style={{ padding: '10px 14px', width: 140, fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>Category</th>
                  <th style={{ padding: '10px 14px', width: 90, fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>Target</th>
                  <th style={{ padding: '10px 14px', width: 90, fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>Actual</th>
                  <th style={{ padding: '10px 14px', width: 100, fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>Status</th>
                  <th style={{ padding: '10px 14px', width: 110, fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>Credits Accrued</th>
                  <th style={{ padding: '10px 14px', width: 120, fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>NCGR Lead</th>
                  <th style={{ padding: '10px 14px', width: 90, fontWeight: 700, color: 'var(--text-secondary, #475467)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSLAs.map((sla) => {
                  const isExceeding = sla.status === 'Exceeding';
                  const isMeeting = sla.status === 'Meeting';
                  const isAtRisk = sla.status === 'At Risk';

                  const statusBg = isExceeding || isMeeting ? '#E3FCEF' : isAtRisk ? '#FFF7E6' : '#FFEBE6';
                  const statusColor = isExceeding || isMeeting ? '#22A06B' : isAtRisk ? '#E97F0A' : '#DE350B';

                  return (
                    <tr
                      key={sla.id}
                      onClick={() => {
                        setSelectedSla(sla);
                        setIsDetailModalOpen(true);
                      }}
                      style={{
                        borderBottom: '1px solid var(--border, #E4E7EC)',
                        cursor: 'pointer',
                        transition: 'background 0.1s ease',
                      }}
                      className="table-row-hover"
                    >
                      {/* SLA Code */}
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
                          }}
                        >
                          {sla.id}
                        </span>
                      </td>

                      {/* Vendor & Tier */}
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ fontWeight: 800, color: 'var(--text, #101828)' }}>{sla.vendorName}</div>
                        <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary, #475467)', marginTop: 2 }}>
                          {sla.tier.split(' - ')[0]}
                        </div>
                      </td>

                      {/* SLA Commitment */}
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text, #101828)', fontSize: '0.8125rem' }}>
                          {sla.slaName}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>
                          Penalty: {sla.penaltyClause}
                        </div>
                      </td>

                      {/* Category */}
                      <td style={{ padding: '10px 14px' }}>
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            padding: '2px 6px',
                            borderRadius: 4,
                            background: 'var(--bg-secondary, #F1F5F9)',
                            color: 'var(--text-secondary, #475467)',
                          }}
                        >
                          {sla.metricType}
                        </span>
                      </td>

                      {/* Target */}
                      <td style={{ padding: '10px 14px', fontWeight: 800, color: '#074A76' }}>
                        {sla.target}
                      </td>

                      {/* Actual Performance */}
                      <td style={{ padding: '10px 14px', fontWeight: 800, color: statusColor }}>
                        {sla.actualPerformance}
                      </td>

                      {/* Status */}
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
                          {sla.status.toUpperCase()}
                        </span>
                      </td>

                      {/* Service Credits Accrued */}
                      <td style={{ padding: '10px 14px', fontWeight: 800, color: sla.serviceCreditsAccruedSAR > 0 ? '#DE350B' : '#22A06B' }}>
                        {sla.serviceCreditsAccruedSAR > 0 ? `SAR ${sla.serviceCreditsAccruedSAR.toLocaleString()}` : 'SAR 0'}
                      </td>

                      {/* NCGR Lead */}
                      <td style={{ padding: '10px 14px', color: 'var(--text, #101828)', fontWeight: 600, fontSize: '0.75rem' }}>
                        {sla.ncgrLead}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSla(sla);
                            setIsDetailModalOpen(true);
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
                        >
                          <Eye size={12} />
                          <span>Specs</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Specs Modal */}
      <VendorSLADetailModal
        sla={selectedSla}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
};

export default VendorServiceSLAPage;
