import React, { useState, useMemo } from 'react';
import { useDataStore } from '../../data/mockDataStore';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import EmployeeDetailModal from '../../components/common/EmployeeDetailModal';
import type { VendorRiskRecord, RiskLikelihood, RiskImpact } from '../../data/vendorData';
import type { MasterEmployee } from '../../data/master-employees';
import { X, RefreshCw } from 'lucide-react';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { VENDOR_SIAM_SIBLINGS } from './VendorSIAMLandingPage';

const LIKELIHOODS: RiskLikelihood[] = ['Very High', 'High', 'Medium', 'Low', 'Very Low'];
const IMPACTS: RiskImpact[] = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];

const VendorRiskPage: React.FC = () => {
  const { vendorRisks, employees } = useDataStore();
  const [selectedCell, setSelectedCell] = useState<{ l: RiskLikelihood; i: RiskImpact } | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<VendorRiskRecord | null>(null);
  const [selectedOwner, setSelectedOwner] = useState<MasterEmployee | null>(null);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);

  // Group risks into 5x5 matrix
  const matrix = useMemo(() => {
    const map: Record<string, VendorRiskRecord[]> = {};
    vendorRisks.forEach(r => {
      const key = `${r.likelihood}_${r.impact}`;
      if (!map[key]) map[key] = [];
      map[key].push(r);
    });
    return map;
  }, [vendorRisks]);

  const filteredRisks = useMemo(() => {
    if (!selectedCell) return vendorRisks;
    return vendorRisks.filter(r => r.likelihood === selectedCell.l && r.impact === selectedCell.i);
  }, [vendorRisks, selectedCell]);

  const criticalRisks = vendorRisks.filter(r => r.riskScore >= 16);
  const highRisks = vendorRisks.filter(r => r.riskScore >= 10 && r.riskScore < 16);
  const mediumRisks = vendorRisks.filter(r => r.riskScore >= 5 && r.riskScore < 10);
  const lowRisks = vendorRisks.filter(r => r.riskScore < 5);

  const getCellColor = (l: RiskLikelihood, i: RiskImpact) => {
    const lVal = LIKELIHOODS.indexOf(l);
    const iVal = IMPACTS.indexOf(i);
    // score calculation: 1-25
    const score = (5 - lVal) * (iVal + 1);
    if (score >= 16) return { bg: 'rgba(222, 53, 11, 0.25)', border: '#DE350B', text: '#DE350B' };
    if (score >= 10) return { bg: 'rgba(233, 127, 10, 0.25)', border: '#E97F0A', text: '#E97F0A' };
    if (score >= 5) return { bg: 'rgba(207, 219, 81, 0.3)', border: '#A6B520', text: '#687309' };
    return { bg: 'rgba(64, 144, 79, 0.2)', border: '#40904F', text: '#22A06B' };
  };

  const handleOpenOwner = (ownerName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const emp = employees.find(e => e.name === ownerName);
    if (emp) {
      setSelectedOwner(emp);
      setIsOwnerModalOpen(true);
    }
  };

  const columns: ColumnDef<VendorRiskRecord>[] = [
    {
      header: 'Risk ID',
      accessorKey: 'id',
      width: '90px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Risk Title & Vendor',
      accessorKey: 'riskName',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.riskName}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>
            Vendor: {row.vendor} • Category: {row.category}
          </div>
        </div>
      ),
    },
    {
      header: 'Likelihood × Impact',
      accessorKey: 'riskScore',
      cell: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 4,
              fontWeight: 800,
              fontSize: '0.75rem',
              background: row.riskScore >= 16 ? '#FFEBE6' : row.riskScore >= 10 ? '#FFF7E6' : '#E3FCEF',
              color: row.riskScore >= 16 ? '#DE350B' : row.riskScore >= 10 ? '#E97F0A' : '#22A06B',
            }}
          >
            Score: {row.riskScore}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
            ({row.likelihood} / {row.impact})
          </span>
        </div>
      ),
    },
    {
      header: 'Target Date',
      accessorKey: 'targetDate',
      cell: (row) => <span style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{row.targetDate}</span>,
    },
    {
      header: 'Risk Owner',
      accessorKey: 'owner',
      cell: (row) => (
        <button
          onClick={(e) => handleOpenOwner(row.owner, e)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--ncgr-deep-blue, #074A76)',
            fontWeight: 700,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            textAlign: 'left',
            padding: 0,
            textDecoration: 'underline',
          }}
          title="Click to view owner hierarchy"
        >
          {row.owner}
        </button>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'currentStatus',
      cell: (row) => {
        const bg = row.currentStatus === 'Closed' ? '#E3FCEF' : row.currentStatus === 'Mitigating' ? '#E6F4FC' : '#FFF7E6';
        const color = row.currentStatus === 'Closed' ? '#22A06B' : row.currentStatus === 'Mitigating' ? '#074A76' : '#E97F0A';
        return (
          <span
            style={{
              padding: '3px 10px',
              borderRadius: 12,
              background: bg,
              color: color,
              fontWeight: 700,
              fontSize: '0.75rem',
            }}
          >
            {row.currentStatus}
          </span>
        );
      },
    },
    {
      header: 'Action',
      sortable: false,
      width: '80px',
      cell: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedRisk(row);
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
          View
        </button>
      ),
    },
  ];

  const uniqueVendors = Array.from(new Set(vendorRisks.map(r => r.vendor))).map(v => ({ label: v, value: v }));
  const uniqueCategories = Array.from(new Set(vendorRisks.map(r => r.category))).map(c => ({ label: c, value: c }));

  const filters: FilterDef<VendorRiskRecord>[] = [
    { key: 'vendor', label: 'Vendors', options: uniqueVendors },
    { key: 'category', label: 'Risk Categories', options: uniqueCategories },
    {
      key: 'currentStatus',
      label: 'Statuses',
      options: [
        { label: 'Open', value: 'Open' },
        { label: 'Mitigating', value: 'Mitigating' },
        { label: 'Accepted', value: 'Accepted' },
        { label: 'Closed', value: 'Closed' },
      ],
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Sub-Page Header with Breadcrumb and Sibling Navigation */}
      <SubPageHeader
        moduleTitle="Vendor & SIAM"
        modulePath="/vendor-siam"
        pageTitle="Vendor Risk"
        siblingPages={VENDOR_SIAM_SIBLINGS}
      />

      {/* KPI Cards Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #DE350B' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>Critical Risks (16-25)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{criticalRisks.length}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', marginTop: 2, fontWeight: 600 }}>Executive priority</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #E97F0A' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E97F0A', textTransform: 'uppercase' }}>High Risks (10-15)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E97F0A', marginTop: 4 }}>{highRisks.length}</div>
          <div style={{ fontSize: '0.75rem', color: '#E97F0A', marginTop: 2, fontWeight: 600 }}>Active mitigation</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#A6B520', textTransform: 'uppercase' }}>Medium Risks (5-9)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#A6B520', marginTop: 4 }}>{mediumRisks.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', marginTop: 2 }}>Monitored</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>Low Risks (1-4)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>{lowRisks.length}</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2 }}>Accepted</div>
        </div>
      </div>

      {/* ─── 5×5 VISUAL RISK HEATMAP ─────────────────────────── */}
      <div
        className="card"
        style={{
          padding: 24,
          borderRadius: 14,
          background: 'var(--card-bg, #FFFFFF)',
          border: '1px solid var(--border, #E4E7EC)',
          marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
              Interactive 5×5 Risk Heatmap Matrix
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
              Click any matrix cell to filter the risks table below. (Vertical: Likelihood • Horizontal: Impact)
            </p>
          </div>
          {selectedCell && (
            <button
              onClick={() => setSelectedCell(null)}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                background: 'var(--bg-secondary, #F7F8FA)',
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
              <RefreshCw size={12} /> Clear Cell Filter
            </button>
          )}
        </div>

        {/* Heatmap Grid */}
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex', minWidth: 600 }}>
            {/* Y-Axis Label */}
            <div
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                textAlign: 'center',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--text-secondary, #475467)',
                paddingRight: 10,
                letterSpacing: '0.05em',
              }}
            >
              LIKELIHOOD →
            </div>

            {/* Matrix Body */}
            <div style={{ flex: 1 }}>
              {/* Rows (Likelihood) */}
              {LIKELIHOODS.map((l) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ width: 85, fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textAlign: 'right', paddingRight: 10 }}>
                    {l}
                  </div>

                  {/* Columns (Impact) */}
                  <div style={{ display: 'flex', flex: 1, gap: 6 }}>
                    {IMPACTS.map((i) => {
                      const key = `${l}_${i}`;
                      const count = matrix[key]?.length || 0;
                      const styleInfo = getCellColor(l, i);
                      const isSelected = selectedCell?.l === l && selectedCell?.i === i;

                      return (
                        <div
                          key={i}
                          onClick={() => setSelectedCell({ l, i })}
                          style={{
                            flex: 1,
                            height: 52,
                            borderRadius: 8,
                            background: styleInfo.bg,
                            border: `2px solid ${isSelected ? '#074A76' : styleInfo.border}`,
                            boxShadow: isSelected ? '0 0 0 3px rgba(7,74,118,0.3)' : 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <span style={{ fontSize: '1.125rem', fontWeight: 800, color: styleInfo.text }}>
                            {count}
                          </span>
                          <span style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
                            {count === 1 ? 'risk' : 'risks'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* X-Axis Header (Impacts) */}
              <div style={{ display: 'flex', marginLeft: 85, gap: 6, marginTop: 8 }}>
                {IMPACTS.map((i) => (
                  <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
                    {i}
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary, #475467)', marginTop: 6 }}>
                IMPACT →
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={filteredRisks}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search vendor risks by name, vendor, category, owner..."
        searchKeys={['riskName', 'vendor', 'category', 'owner', 'mitigation', 'description', 'id']}
        pageSize={15}
        onRowClick={(row) => setSelectedRisk(row)}
        title={selectedCell ? `Risks with Likelihood: ${selectedCell.l} & Impact: ${selectedCell.i}` : 'All Vendor Risks'}
        subtitle="Click any risk to view complete mitigation plan and owner profile"
        exportFilename="ncgr_vendor_risks"
      />

      {/* Risk Detail Modal */}
      {selectedRisk && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10, 22, 40, 0.45)',
              backdropFilter: 'blur(3px)',
              zIndex: 1000,
            }}
            onClick={() => setSelectedRisk(null)}
          />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90vw',
              maxWidth: 640,
              maxHeight: '85vh',
              background: 'var(--surface-raised, #FFFFFF)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
              borderRadius: 14,
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              padding: 24,
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
                  {selectedRisk.id} • Vendor: {selectedRisk.vendor}
                </span>
                <h3 style={{ margin: '4px 0 0', fontSize: '1.125rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
                  {selectedRisk.riskName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRisk(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                <X size={20} color="var(--text-tertiary, #98A2B3)" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.875rem' }}>
              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ color: 'var(--text-secondary, #475467)' }}>Detailed Description:</strong>
                <div style={{ marginTop: 4 }}>{selectedRisk.description}</div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'rgba(233,127,10,0.1)', border: '1px solid rgba(233,127,10,0.3)' }}>
                <strong style={{ color: '#E97F0A' }}>Mitigation Plan & Strategy:</strong>
                <div style={{ marginTop: 4, fontWeight: 600, color: '#B35E00' }}>{selectedRisk.mitigation}</div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ color: 'var(--text-secondary, #475467)' }}>Owner Profile & Contact:</strong>
                <div style={{ marginTop: 4 }}>
                  Assigned Lead: <strong>{selectedRisk.owner}</strong> ({selectedRisk.ownerTower} / {selectedRisk.ownerDepartment})
                  <div style={{ marginTop: 4, fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)' }}>
                    Email: {selectedRisk.ownerEmail} • Phone: {selectedRisk.ownerMobile}
                  </div>
                </div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ color: 'var(--text-secondary, #475467)' }}>Target Resolution Date:</strong>
                <div style={{ marginTop: 4, fontFamily: 'monospace', fontWeight: 600 }}>{selectedRisk.targetDate} (Status: {selectedRisk.currentStatus})</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Owner Detail Modal */}
      <EmployeeDetailModal
        employee={selectedOwner}
        isOpen={isOwnerModalOpen}
        onClose={() => setIsOwnerModalOpen(false)}
      />
    </div>
  );
};

export default VendorRiskPage;
