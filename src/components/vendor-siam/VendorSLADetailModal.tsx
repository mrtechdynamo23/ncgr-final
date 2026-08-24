import React from 'react';
import {
  X, FileText, Download
} from 'lucide-react';
import { type VendorSLARecord } from '../../data/vendor-sla-data';

interface VendorSLADetailModalProps {
  sla: VendorSLARecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VendorSLADetailModal: React.FC<VendorSLADetailModalProps> = ({
  sla,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !sla) return null;

  const isExceeding = sla.status === 'Exceeding';
  const isMeeting = sla.status === 'Meeting';
  const isAtRisk = sla.status === 'At Risk';

  const statusBg = isExceeding || isMeeting ? '#E3FCEF' : isAtRisk ? '#FFF7E6' : '#FFEBE6';
  const statusColor = isExceeding || isMeeting ? '#22A06B' : isAtRisk ? '#E97F0A' : '#DE350B';

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 22, 40, 0.48)',
          backdropFilter: 'blur(3px)',
          zIndex: 1300,
        }}
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: 680,
          maxHeight: '90vh',
          background: 'var(--surface-raised, #FFFFFF)',
          borderRadius: 14,
          boxShadow: '0 20px 48px rgba(0, 0, 0, 0.22)',
          zIndex: 1301,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'modalSlideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--border, #E4E7EC)',
            background: 'var(--card-bg, #FFFFFF)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: 'var(--bg-secondary, #F1F5F9)',
                  color: 'var(--ncgr-deep-blue, #074A76)',
                }}
              >
                {sla.id}
              </span>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: '#E6F0FA',
                  color: '#074A76',
                }}
              >
                {sla.vendorName}
              </span>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: 'rgba(7, 74, 118, 0.1)',
                  color: '#074A76',
                }}
              >
                {sla.tier}
              </span>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: statusBg,
                  color: statusColor,
                }}
              >
                {sla.status.toUpperCase()}
              </span>
            </div>

            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
              {sla.slaName}
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-secondary, #F1F5F9)',
              border: 'none',
              borderRadius: 6,
              padding: 6,
              cursor: 'pointer',
              color: 'var(--text-secondary, #475467)',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Target vs Actual KPI Card */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 12,
              padding: 16,
              borderRadius: 10,
              background: 'var(--bg-secondary, #F8FAFC)',
              border: '1px solid var(--border, #E4E7EC)',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)', textTransform: 'uppercase', fontWeight: 700 }}>Target Commitment</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#074A76', marginTop: 2 }}>{sla.target}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)', textTransform: 'uppercase', fontWeight: 700 }}>Actual Performance</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: statusColor, marginTop: 2 }}>{sla.actualPerformance}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)', textTransform: 'uppercase', fontWeight: 700 }}>Penalty Exposure</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: sla.serviceCreditsAccruedSAR > 0 ? '#DE350B' : '#22A06B', marginTop: 2 }}>
                {sla.serviceCreditsAccruedSAR > 0 ? `SAR ${sla.serviceCreditsAccruedSAR.toLocaleString()}` : 'SAR 0 (Nil)'}
              </div>
            </div>
          </div>

          {/* 6-Month Historical Attainment Trend */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase', marginBottom: 8 }}>
              6-Month SLA Attainment Trend
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 90, padding: '12px 16px', background: 'var(--bg-secondary, #F8FAFC)', borderRadius: 8, border: '1px solid var(--border, #E4E7EC)' }}>
              {sla.historicalTrend.map((t, idx) => (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--text, #101828)' }}>{t.value}{sla.unit === '%' ? '%' : ''}</div>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: 28,
                      height: `${Math.min(100, Math.max(20, (t.value / (sla.unit === '%' ? 100 : 10)) * 60))}%`,
                      background: idx === sla.historicalTrend.length - 1 ? 'var(--ncgr-deep-blue, #074A76)' : '#94A3B8',
                      borderRadius: '4px 4px 0 0',
                    }}
                  />
                  <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary, #475467)' }}>{t.month}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contractual Penalty & Service Credit Clause */}
          <div
            style={{
              padding: 14,
              borderRadius: 8,
              background: 'var(--card-bg, #FFFFFF)',
              border: '1px solid var(--border, #E4E7EC)',
              borderLeft: '4px solid #DE350B',
            }}
          >
            <div style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#DE350B', textTransform: 'uppercase', marginBottom: 4 }}>
              Contractual Liquidated Damages & Service Credit Clause
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text, #101828)', lineHeight: 1.5 }}>
              {sla.penaltyClause}
            </div>
          </div>

          {/* Specifications Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, fontSize: '0.75rem' }}>
            <div style={{ padding: 10, borderRadius: 6, background: 'var(--bg-secondary, #F8FAFC)', border: '1px solid var(--border, #E4E7EC)' }}>
              <div style={{ color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>Measurement Telemetry</div>
              <div style={{ fontWeight: 700, color: 'var(--text, #101828)', marginTop: 2 }}>{sla.measurementSource}</div>
            </div>

            <div style={{ padding: 10, borderRadius: 6, background: 'var(--bg-secondary, #F8FAFC)', border: '1px solid var(--border, #E4E7EC)' }}>
              <div style={{ color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>Contract Reference</div>
              <div style={{ fontWeight: 700, color: 'var(--text, #101828)', marginTop: 2 }}>{sla.contractReference}</div>
            </div>

            <div style={{ padding: 10, borderRadius: 6, background: 'var(--bg-secondary, #F8FAFC)', border: '1px solid var(--border, #E4E7EC)' }}>
              <div style={{ color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>NCGR Service Lead</div>
              <div style={{ fontWeight: 700, color: 'var(--text, #101828)', marginTop: 2 }}>{sla.ncgrLead} ({sla.ncgrDepartment})</div>
            </div>

            <div style={{ padding: 10, borderRadius: 6, background: 'var(--bg-secondary, #F8FAFC)', border: '1px solid var(--border, #E4E7EC)' }}>
              <div style={{ color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>Supplier Escalation Route</div>
              <div style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 2 }}>{sla.escalationContact}</div>
            </div>
          </div>

          {/* Audit Evidence Attachment */}
          {sla.evidenceDoc && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 6,
                background: 'var(--card-bg, #FFFFFF)',
                border: '1px solid var(--border, #E4E7EC)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FileText size={16} color="var(--ncgr-deep-blue, #074A76)" />
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                  {sla.evidenceDoc}
                </span>
              </div>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ncgr-deep-blue, #074A76)',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <Download size={13} />
                <span>Download Report</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '12px 24px',
            borderTop: '1px solid var(--border, #E4E7EC)',
            background: 'var(--bg-secondary, #F8FAFC)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={onClose}
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
            Close Specification
          </button>
        </div>
      </div>
    </>
  );
};

export default VendorSLADetailModal;
