import React from 'react';
import {
  X, Download, Calendar, User, Building,
  Printer, ArrowUpRight, Clock
} from 'lucide-react';
import type { ReportRecord } from '../../data/master-reports';

interface ReportPreviewDrawerProps {
  report: ReportRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectRelatedReport?: (reportId: string) => void;
}

export const ReportPreviewDrawer: React.FC<ReportPreviewDrawerProps> = ({
  report,
  isOpen,
  onClose,
  onSelectRelatedReport,
}) => {
  if (!isOpen || !report) return null;

  const handleDownload = (format: string) => {
    // Generate simulated file content for download
    const filename = `${report.id}_${report.name.replace(/[^a-zA-Z0-9]/g, '_')}.${format.toLowerCase()}`;
    const content = `NCGR ITMS UNIFIED PORTAL — OFFICIAL REPORT
======================================================
Report ID: ${report.id}
Report Name: ${report.name}
Category: ${report.category}
Type: ${report.type}
Period: ${report.period}
Owner: ${report.owner} (${report.department})
Generated Date: ${report.generatedDate}
Version: ${report.version}
Status: ${report.status}

EXECUTIVE SUMMARY:
${report.summary}

KEY HIGHLIGHTS:
${report.keyHighlights.map((h, i) => `${i + 1}. ${h}`).join('\n')}

KEY METRICS:
${report.kpis.map(k => `- ${k.label}: ${k.value}`).join('\n')}

======================================================
NCGR Managed Operations Portal · Verified Official Record
`;

    const blob = new Blob([content], { type: format === 'CSV' ? 'text/csv' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const statusBg =
    report.status === 'Approved' || report.status === 'Published'
      ? '#E3FCEF'
      : report.status === 'In Review'
      ? '#FFF7E6'
      : '#F1F5F9';

  const statusColor =
    report.status === 'Approved' || report.status === 'Published'
      ? '#22A06B'
      : report.status === 'In Review'
      ? '#E97F0A'
      : '#475467';

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

      {/* Slide-Over Drawer */}
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
              {/* Report ID */}
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
                {report.id}
              </span>

              {/* Category Badge */}
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
                {report.category}
              </span>

              {/* Status Badge */}
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: statusBg,
                  color: statusColor,
                }}
              >
                {report.status}
              </span>

              {/* Version Badge */}
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
                {report.version}
              </span>
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 4px', lineHeight: 1.3 }}>
              {report.name}
            </h2>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)' }}>
              Period: <strong style={{ color: 'var(--text, #101828)' }}>{report.period}</strong> • Published by {report.owner} ({report.department})
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)' }}>
              Download Options:
            </span>
            {report.availableFormats.map(fmt => (
              <button
                key={fmt}
                onClick={() => handleDownload(fmt)}
                style={{
                  padding: '5px 10px',
                  borderRadius: 6,
                  border: '1px solid var(--border, #E4E7EC)',
                  background: 'var(--card-bg, #FFFFFF)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--ncgr-deep-blue, #074A76)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <Download size={13} />
                <span>{fmt}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => window.print()}
            style={{
              padding: '5px 10px',
              borderRadius: 6,
              border: '1px solid var(--border, #E4E7EC)',
              background: 'var(--card-bg, #FFFFFF)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-secondary, #475467)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Printer size={13} />
            <span>Print View</span>
          </button>
        </div>

        {/* Drawer Body Content */}
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
              <Calendar size={18} color="var(--ncgr-deep-blue, #074A76)" />
              <div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>Period</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)' }}>{report.period}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Clock size={18} color="var(--ncgr-deep-blue, #074A76)" />
              <div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>Generated Date</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)' }}>{report.generatedDate}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <User size={18} color="var(--ncgr-deep-blue, #074A76)" />
              <div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>Report Owner</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)' }}>{report.owner}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Building size={18} color="var(--ncgr-deep-blue, #074A76)" />
              <div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>Department</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)' }}>{report.department}</div>
              </div>
            </div>
          </div>

          {/* Executive Summary Card */}
          <div
            style={{
              padding: 18,
              borderRadius: 10,
              background: 'var(--card-bg, #FFFFFF)',
              border: '1px solid var(--border, #E4E7EC)',
              borderLeft: '4px solid var(--ncgr-deep-blue, #074A76)',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.04em' }}>
              Executive Report Summary
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text, #101828)' }}>
              {report.summary}
            </p>
          </div>

          {/* Key Metrics / KPI Scorecard */}
          {report.kpis && report.kpis.length > 0 && (
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text, #101828)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Key Operational & Assurance Metrics
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: 10,
                }}
              >
                {report.kpis.map((kpi, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 8,
                      background: 'var(--bg-secondary, #F8FAFC)',
                      border: '1px solid var(--border, #E4E7EC)',
                    }}
                  >
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)', fontWeight: 600 }}>
                      {kpi.label}
                    </div>
                    <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 2 }}>
                      {kpi.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Highlights */}
          {report.keyHighlights && report.keyHighlights.length > 0 && (
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text, #101828)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Key Highlights & Findings
              </h4>
              <div
                style={{
                  padding: '14px 18px',
                  borderRadius: 8,
                  background: 'var(--bg-secondary, #F8FAFC)',
                  border: '1px solid var(--border, #E4E7EC)',
                }}
              >
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.8125rem', lineHeight: 1.7, color: 'var(--text, #101828)' }}>
                  {report.keyHighlights.map((h, idx) => (
                    <li key={idx} style={{ marginBottom: 4 }}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Traceability Information (e.g. for KT, Audit, Findings) */}
          {report.traceability && (
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#074A76', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Governance & Role Traceability Record
              </h4>
              <div
                style={{
                  padding: 14,
                  borderRadius: 8,
                  background: '#F0F9FF',
                  border: '1px solid #BAE6FD',
                  fontSize: '0.8125rem',
                  color: '#0369A1',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                {Object.entries(report.traceability).map(([key, val]) => (
                  <div key={key}>
                    <strong style={{ textTransform: 'capitalize' }}>{key}:</strong> {val}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Reports Hierarchy */}
          {report.relatedReportIds && report.relatedReportIds.length > 0 && (
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text, #101828)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Related Reports Hierarchy ({report.relatedReportIds.length})
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {report.relatedReportIds.map(rId => (
                  <button
                    key={rId}
                    onClick={() => onSelectRelatedReport?.(rId)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 6,
                      background: 'var(--bg-secondary, #F1F5F9)',
                      border: '1px solid var(--border, #E4E7EC)',
                      fontSize: '0.75rem',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      color: 'var(--ncgr-deep-blue, #074A76)',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <span>{rId}</span>
                    <ArrowUpRight size={12} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReportPreviewDrawer;
