import React, { useState } from 'react';
import {
  X, Check, AlertCircle, Upload, Save
} from 'lucide-react';
import { type SLARecord, evaluateCompliance } from '../../data/master-sla';

interface UpdateSLAMeasurementModalProps {
  sla: SLARecord | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveMeasurement: (updatedSla: SLARecord) => void;
}

interface ModalDialogContentProps {
  sla: SLARecord;
  onClose: () => void;
  onSaveMeasurement: (updatedSla: SLARecord) => void;
}

const UpdateSLAMeasurementDialog: React.FC<ModalDialogContentProps> = ({
  sla,
  onClose,
  onSaveMeasurement,
}) => {
  const [actualValueInput, setActualValueInput] = useState(sla.actualValue || '');
  const [evidenceFileName, setEvidenceFileName] = useState(sla.evidence || '');
  const [commentsInput, setCommentsInput] = useState(sla.comments || '');
  const [reviewerDecision, setReviewerDecision] = useState<'Approved / Met' | 'Rejected / Not Met' | 'Under Review'>(
    sla.status === 'Met' ? 'Approved / Met' : sla.status === 'Not Met' ? 'Rejected / Not Met' : 'Under Review'
  );
  const submittedBy = 'Faisal Al-Harbi';

  // Preview compliance calculation in real-time
  const previewStatus = sla.manualInputEligible
    ? evaluateCompliance(sla.target, actualValueInput)
    : reviewerDecision === 'Approved / Met'
    ? 'Met'
    : reviewerDecision === 'Rejected / Not Met'
    ? 'Not Met'
    : 'Pending / Not Measured';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const newAuditEntry = {
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: submittedBy,
      action: sla.manualInputEligible ? 'Manual Actual Value Entry' : 'Evidence & Review Assessment',
      previousValue: sla.actualValue || 'None',
      newValue: sla.manualInputEligible ? actualValueInput : reviewerDecision,
      notes: commentsInput,
    };

    const updatedRecord: SLARecord = {
      ...sla,
      actualValue: sla.manualInputEligible ? actualValueInput : (reviewerDecision === 'Approved / Met' ? '100.00%' : '0.00%'),
      status: previewStatus,
      evidence: evidenceFileName,
      comments: commentsInput,
      lastUpdated: new Date().toISOString().split('T')[0],
      auditHistory: [newAuditEntry, ...(sla.auditHistory || [])],
    };

    onSaveMeasurement(updatedRecord);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 22, 40, 0.5)',
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
          maxWidth: 620,
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
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border, #E4E7EC)',
            background: 'var(--card-bg, #FFFFFF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: 'rgba(7, 74, 118, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--ncgr-deep-blue, #074A76)',
              }}
            >
              <Save size={16} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
                {sla.manualInputEligible ? 'Enter SLA Measurement' : 'Record Review & Evidence'}
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                SLA Ref: <strong>{sla.slaId}</strong> (No. {sla.slaNumber}) • {sla.domain}
              </span>
            </div>
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

        {/* Modal Form Body */}
        <form onSubmit={handleSave} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Target & Metric Banner */}
          <div
            style={{
              padding: '12px 14px',
              borderRadius: 8,
              background: 'var(--bg-secondary, #F8FAFC)',
              border: '1px solid var(--border, #E4E7EC)',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
              {sla.name}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
              <span>Target Commitment: <strong style={{ color: '#074A76' }}>{sla.target}</strong></span>
              <span>Mode: <strong>{sla.manualInputEligible ? 'Manual Input Eligible' : 'Evidence / Review Only'}</strong></span>
            </div>
          </div>

          {/* Conditional Input: Manual Eligible vs Evidence/Review Only */}
          {sla.manualInputEligible ? (
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginBottom: 6 }}>
                Actual Measured Value (e.g. 99.20%, 100%, 1.4%, 3.5 Hours, Yes) *
              </label>
              <input
                type="text"
                required
                placeholder="Enter measured actual value..."
                value={actualValueInput}
                onChange={(e) => setActualValueInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--border, #D0D5DD)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  outline: 'none',
                  background: 'var(--input-bg, #FFFFFF)',
                  color: 'var(--text, #101828)',
                }}
              />
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)', marginTop: 4, display: 'block' }}>
                Metric Definition: {sla.measurableMetric}
              </span>
            </div>
          ) : (
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginBottom: 6 }}>
                Reviewer Evaluation & Finding *
              </label>
              <select
                value={reviewerDecision}
                onChange={(e) => setReviewerDecision(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--border, #D0D5DD)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  background: 'var(--input-bg, #FFFFFF)',
                  color: 'var(--text, #101828)',
                }}
              >
                <option value="Approved / Met">✓ Approved & Verified (MET)</option>
                <option value="Rejected / Not Met">✗ Deficient / Non-Compliant (NOT MET)</option>
                <option value="Under Review">⏳ Pending Review / In Progress</option>
              </select>
            </div>
          )}

          {/* Real-time Status Preview */}
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              background: previewStatus === 'Met' ? '#E3FCEF' : previewStatus === 'Not Met' ? '#FFEBE6' : '#FFF7E6',
              border: `1px solid ${previewStatus === 'Met' ? '#22A06B' : previewStatus === 'Not Met' ? '#DE350B' : '#E97F0A'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
              Calculated Compliance Outcome:
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: previewStatus === 'Met' ? '#22A06B' : previewStatus === 'Not Met' ? '#DE350B' : '#E97F0A',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {previewStatus === 'Met' && <Check size={14} />}
              {previewStatus === 'Not Met' && <AlertCircle size={14} />}
              {previewStatus}
            </span>
          </div>

          {/* Evidence Upload / Link */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginBottom: 6 }}>
              Evidence File Attachment / Document Reference
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                placeholder="e.g. SLA_Report_August2026_Approved.pdf or DMS link..."
                value={evidenceFileName}
                onChange={(e) => setEvidenceFileName(e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--border, #D0D5DD)',
                  fontSize: '0.8125rem',
                  outline: 'none',
                  background: 'var(--input-bg, #FFFFFF)',
                }}
              />
              <button
                type="button"
                onClick={() => setEvidenceFileName(`SLA_Evidence_${sla.slaId}_${new Date().toISOString().split('T')[0]}.pdf`)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--border, #E4E7EC)',
                  background: 'var(--bg-secondary, #F8FAFC)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <Upload size={13} />
                <span>Attach</span>
              </button>
            </div>
            {sla.manualEvidenceRequired && (
              <span style={{ fontSize: '0.6875rem', color: '#074A76', marginTop: 4, display: 'block' }}>
                Required Evidence Standard: {sla.manualEvidenceRequired}
              </span>
            )}
          </div>

          {/* Comments & Justification */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginBottom: 6 }}>
              Notes & Review Justification
            </label>
            <textarea
              rows={3}
              placeholder="Provide context, verification steps, or rationale..."
              value={commentsInput}
              onChange={(e) => setCommentsInput(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid var(--border, #D0D5DD)',
                fontSize: '0.8125rem',
                outline: 'none',
                background: 'var(--input-bg, #FFFFFF)',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Modal Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 10,
              borderTop: '1px solid var(--border, #E4E7EC)',
              paddingTop: 16,
              marginTop: 4,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                borderRadius: 6,
                border: '1px solid var(--border, #D0D5DD)',
                background: 'var(--card-bg, #FFFFFF)',
                color: 'var(--text-secondary, #475467)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={{
                padding: '8px 18px',
                borderRadius: 6,
                background: 'var(--ncgr-deep-blue, #074A76)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '0.8125rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Check size={15} />
              <span>Save & Calculate Compliance</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export const UpdateSLAMeasurementModal: React.FC<UpdateSLAMeasurementModalProps> = ({
  sla,
  isOpen,
  onClose,
  onSaveMeasurement,
}) => {
  if (!isOpen || !sla) return null;

  return (
    <UpdateSLAMeasurementDialog
      sla={sla}
      onClose={onClose}
      onSaveMeasurement={onSaveMeasurement}
    />
  );
};

export default UpdateSLAMeasurementModal;
