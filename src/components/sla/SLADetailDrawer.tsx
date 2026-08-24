import React from 'react';
import {
  X, Layers, User, Calendar,
  Edit3, History, Cpu, FileCheck
} from 'lucide-react';
import { type SLARecord } from '../../data/master-sla';

interface SLADetailDrawerProps {
  sla: SLARecord | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenUpdateModal: (sla: SLARecord) => void;
}

export const SLADetailDrawer: React.FC<SLADetailDrawerProps> = ({
  sla,
  isOpen,
  onClose,
  onOpenUpdateModal,
}) => {
  if (!isOpen || !sla) return null;

  const isMet = sla.status === 'Met';
  const isNotMet = sla.status === 'Not Met';

  const statusBg = isMet ? '#E3FCEF' : isNotMet ? '#FFEBE6' : '#FFF7E6';
  const statusColor = isMet ? '#22A06B' : isNotMet ? '#DE350B' : '#E97F0A';

  const isDataDriven = sla.measurementType === 'Data-Driven / Tool-Measured';

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 22, 40, 0.45)',
          backdropFilter: 'blur(3px)',
          zIndex: 1200,
        }}
        onClick={onClose}
      />

      {/* Slide-over Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: 720,
          background: 'var(--surface-raised, #FFFFFF)',
          boxShadow: '-8px 0 24px rgba(0, 0, 0, 0.15)',
          zIndex: 1201,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideInRight 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border, #E4E7EC)',
            background: 'var(--card-bg, #FFFFFF)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
              {/* SLA Identifier */}
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: 'var(--bg-secondary, #F1F5F9)',
                  color: 'var(--ncgr-deep-blue, #074A76)',
                  border: '1px solid var(--border, #E4E7EC)',
                }}
              >
                SLA No. {sla.slaNumber} ({sla.sourceSheet})
              </span>

              {/* Domain Badge */}
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
                {sla.domain}
              </span>

              {/* Measurement Type Badge (Strict 2-tier: Data-Driven vs Soft) */}
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: isDataDriven ? 'rgba(7, 74, 118, 0.1)' : 'rgba(103, 30, 117, 0.1)',
                  color: isDataDriven ? '#074A76' : '#671E75',
                  border: isDataDriven ? '1px solid rgba(7, 74, 118, 0.2)' : '1px solid rgba(103, 30, 117, 0.2)',
                }}
              >
                {sla.measurementType}
              </span>

              {/* Compliance Status Badge */}
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
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor }} />
                {sla.status}
              </span>
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 4px', lineHeight: 1.3 }}>
              {sla.name}
            </h2>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)' }}>
              Subcategory: <strong>{sla.subcategory}</strong> • Owner: {sla.owner} • Period: {sla.reportingPeriod}
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-secondary, #F1F5F9)',
              border: 'none',
              borderRadius: 8,
              padding: 6,
              cursor: 'pointer',
              color: 'var(--text-secondary, #475467)',
              flexShrink: 0,
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Action Toolbar */}
        <div
          style={{
            padding: '12px 24px',
            borderBottom: '1px solid var(--border, #E4E7EC)',
            background: 'var(--bg-secondary, #F8FAFC)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.8125rem' }}>
            <div>
              Target: <strong style={{ color: '#074A76' }}>{sla.target}</strong>
            </div>
            <div>
              Actual: <strong style={{ color: statusColor }}>{sla.actualValue || 'Pending Measurement'}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => onOpenUpdateModal(sla)}
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                background: 'var(--ncgr-deep-blue, #074A76)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Edit3 size={13} />
              <span>{sla.manualInputEligible ? 'Update Actual' : 'Record Review'}</span>
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Metadata Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 12,
              padding: 16,
              borderRadius: 10,
              background: 'var(--bg-secondary, #F8FAFC)',
              border: '1px solid var(--border, #E4E7EC)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Cpu size={18} color="var(--ncgr-deep-blue, #074A76)" />
              <div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>System / Tool Source</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)' }}>{sla.toolOrSystem}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Layers size={18} color="var(--ncgr-deep-blue, #074A76)" />
              <div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>Measurement Mode</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)' }}>{sla.measurementMode}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <User size={18} color="var(--ncgr-deep-blue, #074A76)" />
              <div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>Accountable Owner</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)' }}>{sla.owner}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Calendar size={18} color="var(--ncgr-deep-blue, #074A76)" />
              <div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>Reporting Period</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)' }}>{sla.reportingPeriod}</div>
              </div>
            </div>
          </div>

          {/* Measurable Metric Card */}
          <div
            style={{
              padding: 16,
              borderRadius: 10,
              background: 'var(--card-bg, #FFFFFF)',
              border: '1px solid var(--border, #E4E7EC)',
              borderLeft: '4px solid var(--ncgr-deep-blue, #074A76)',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', textTransform: 'uppercase', marginBottom: 6 }}>
              Measurable Metric Definition
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text, #101828)', lineHeight: 1.5 }}>
              {sla.measurableMetric}
            </p>
          </div>

          {/* Measurement Logic & Data Captured */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
            <div
              style={{
                padding: 16,
                borderRadius: 10,
                background: 'var(--bg-secondary, #F8FAFC)',
                border: '1px solid var(--border, #E4E7EC)',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase', marginBottom: 6 }}>
                Measurement Logic
              </div>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text, #101828)', lineHeight: 1.6 }}>
                {sla.measurementLogic}
              </p>
            </div>

            <div
              style={{
                padding: 16,
                borderRadius: 10,
                background: 'var(--bg-secondary, #F8FAFC)',
                border: '1px solid var(--border, #E4E7EC)',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase', marginBottom: 6 }}>
                What Data Needs to be Captured
              </div>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text, #101828)', lineHeight: 1.6 }}>
                {sla.dataRequired}
              </p>
            </div>
          </div>

          {/* Evidence & Verification Section */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text, #101828)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Governance Evidence & Verification
            </h4>
            <div
              style={{
                padding: 16,
                borderRadius: 10,
                background: 'var(--bg-secondary, #F8FAFC)',
                border: '1px solid var(--border, #E4E7EC)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Manual Evidence Standard
                </span>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text, #101828)', marginTop: 2 }}>
                  {sla.manualEvidenceRequired || 'Direct automated tool feed (No manual evidence required)'}
                </div>
              </div>

              {sla.evidence && (
                <div style={{ borderTop: '1px solid var(--border, #E4E7EC)', paddingTop: 8 }}>
                  <span style={{ fontSize: '0.6875rem', color: '#22A06B', textTransform: 'uppercase', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <FileCheck size={13} />
                    <span>Attached Evidence Document</span>
                  </span>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 2 }}>
                    {sla.evidence}
                  </div>
                </div>
              )}

              {sla.comments && (
                <div style={{ borderTop: '1px solid var(--border, #E4E7EC)', paddingTop: 8 }}>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Notes & Rationale
                  </span>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text, #101828)', marginTop: 2 }}>
                    {sla.comments}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Audit History Trail */}
          {sla.auditHistory && sla.auditHistory.length > 0 && (
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text, #101828)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <History size={15} />
                <span>Measurement Audit Trail</span>
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {sla.auditHistory.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 8,
                      background: 'var(--card-bg, #FFFFFF)',
                      border: '1px solid var(--border, #E4E7EC)',
                      fontSize: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <strong>{item.action}</strong>
                      <span style={{ color: 'var(--text-secondary, #475467)' }}>{item.timestamp}</span>
                    </div>
                    <div style={{ color: 'var(--text-secondary, #475467)' }}>
                      Performed by <strong>{item.user}</strong> • Value: <strong>{item.newValue}</strong> (from {item.previousValue})
                    </div>
                    {item.notes && (
                      <div style={{ marginTop: 4, color: 'var(--text, #101828)', fontStyle: 'italic' }}>
                        "{item.notes}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SLADetailDrawer;
