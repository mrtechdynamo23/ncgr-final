import React from 'react';
import { Clock, ShieldAlert, FileText, ArrowRight, UserCheck, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PendingApprovalPageProps {
  title: string;
  subtitle: string;
  moduleName: string;
  approverRole?: string;
  submissionDate?: string;
  expectedDate?: string;
  itemsPendingCount?: number;
  badgeText?: string;
}

export const PendingApprovalPage: React.FC<PendingApprovalPageProps> = ({
  title,
  subtitle,
  moduleName,
  approverRole = 'NCGR ITMS Steering Committee & Executive Leadership',
  submissionDate = '2026-07-15',
  expectedDate = '2026-09-01 (Formal Review Cycle)',
  itemsPendingCount = 24,
  badgeText = 'FRAMEWORK PENDING FORMAL SIGN-OFF',
}) => {
  const navigate = useNavigate();

  return (
    <div className="page-container" style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 20px' }}>
      {/* Header */}
      <div style={{ marginBottom: 28, textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            borderRadius: 20,
            background: 'rgba(233, 127, 10, 0.1)',
            border: '1px solid rgba(233, 127, 10, 0.3)',
            color: '#E97F0A',
            fontSize: '0.75rem',
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          <Clock size={14} />
          <span>{badgeText}</span>
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 8px' }}>
          {title}
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary, #475467)', margin: 0, maxWidth: 650, marginInline: 'auto' }}>
          {subtitle}
        </p>
      </div>

      {/* Main Status Information Card */}
      <div
        className="card"
        style={{
          padding: '32px',
          borderRadius: 16,
          border: '1px solid var(--border, #E4E7EC)',
          background: 'var(--card-bg, #FFFFFF)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 28 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(233, 127, 10, 0.15) 0%, rgba(207, 219, 81, 0.15) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#E97F0A',
              flexShrink: 0,
            }}
          >
            <ShieldAlert size={28} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 6px', fontSize: '1.125rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
              Governance Review & Operational Baselining in Progress
            </h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary, #475467)', lineHeight: 1.5 }}>
              The <strong>{moduleName}</strong> definitions, SLA target thresholds, penalty metrics, and escalation triggers
              have been submitted for formal governance review. Target metrics will become active and fully reportable
              upon executive sign-off.
            </p>
          </div>
        </div>

        {/* Milestone Meta Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            padding: '20px',
            borderRadius: 10,
            background: 'var(--bg-secondary, #F7F8FA)',
            border: '1px solid var(--border, #E4E7EC)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginBottom: 4 }}>
              <UserCheck size={14} /> Review Authority
            </div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
              {approverRole}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginBottom: 4 }}>
              <Calendar size={14} /> Submission Date
            </div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
              {submissionDate}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginBottom: 4 }}>
              <Clock size={14} /> Target Resolution
            </div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
              {expectedDate}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginBottom: 4 }}>
              <FileText size={14} /> SLA Metrics In Queue
            </div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#074A76' }}>
              {itemsPendingCount} Service Commitments
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Navigation Actions */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            background: 'var(--ncgr-deep-blue, #074A76)',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '0.875rem',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span>Return to Executive Control Towers</span>
          <ArrowRight size={16} />
        </button>

        <button
          onClick={() => navigate('/command-center/service-desk')}
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            background: 'var(--surface, #FFFFFF)',
            color: 'var(--text, #101828)',
            fontWeight: 600,
            fontSize: '0.875rem',
            border: '1px solid var(--border, #E4E7EC)',
            cursor: 'pointer',
          }}
        >
          View Command Center
        </button>
      </div>
    </div>
  );
};

export default PendingApprovalPage;
