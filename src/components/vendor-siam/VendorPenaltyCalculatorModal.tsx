import React, { useState } from 'react';
import {
  X, Calculator, AlertTriangle
} from 'lucide-react';
import { VENDOR_SLA_RECORDS } from '../../data/vendor-sla-data';

interface VendorPenaltyCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VendorPenaltyCalculatorModal: React.FC<VendorPenaltyCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [selectedVendor, setSelectedVendor] = useState(VENDOR_SLA_RECORDS[0].vendorName);
  const [monthlyInvoiceSAR, setMonthlyInvoiceSAR] = useState<number>(350000);
  const [breachShortfallPct, setBreachShortfallPct] = useState<number>(0.25);
  const [p1BreachesCount, setP1BreachesCount] = useState<number>(1);
  const [penaltyTier, setPenaltyTier] = useState<'Standard (5% credit / 0.1% breach)' | 'Severe (10% credit / 0.1% breach)' | 'Liquidated Damages Flat Fee'>('Standard (5% credit / 0.1% breach)');

  // Calculation Logic
  let calculatedCreditSAR = 0;
  if (penaltyTier === 'Standard (5% credit / 0.1% breach)') {
    const multiplier = (breachShortfallPct / 0.1) * 0.05;
    calculatedCreditSAR = Math.round(monthlyInvoiceSAR * multiplier);
  } else if (penaltyTier === 'Severe (10% credit / 0.1% breach)') {
    const multiplier = (breachShortfallPct / 0.1) * 0.10;
    calculatedCreditSAR = Math.round(monthlyInvoiceSAR * multiplier);
  } else {
    calculatedCreditSAR = p1BreachesCount * 25000;
  }

  // Cap at 25% of monthly invoice per standard NCGR procurement framework
  const maxAllowableCapSAR = Math.round(monthlyInvoiceSAR * 0.25);
  const finalPayableCreditSAR = Math.min(calculatedCreditSAR, maxAllowableCapSAR);
  const isCapped = calculatedCreditSAR > maxAllowableCapSAR;

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
          maxWidth: 600,
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
                background: 'rgba(222, 53, 11, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#DE350B',
              }}
            >
              <Calculator size={16} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
                SIAM Contractual Penalty & Service Credit Calculator
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                Simulate liquidated damages according to NCGR Master Services Agreement
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

        {/* Calculator Body */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' }}>
          {/* Supplier Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginBottom: 4 }}>
              Target Supplier / Partner
            </label>
            <select
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid var(--border, #D0D5DD)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                background: 'var(--input-bg, #FFFFFF)',
              }}
            >
              {Array.from(new Set(VENDOR_SLA_RECORDS.map(v => v.vendorName))).map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          {/* Monthly Value & Shortfall Inputs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginBottom: 4 }}>
                Monthly Invoice Value (SAR)
              </label>
              <input
                type="number"
                value={monthlyInvoiceSAR}
                onChange={(e) => setMonthlyInvoiceSAR(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--border, #D0D5DD)',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  background: 'var(--input-bg, #FFFFFF)',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginBottom: 4 }}>
                {penaltyTier === 'Liquidated Damages Flat Fee' ? 'P1 Major Incidents Count' : 'Availability / MTTR Shortfall (%)'}
              </label>
              {penaltyTier === 'Liquidated Damages Flat Fee' ? (
                <input
                  type="number"
                  min="1"
                  value={p1BreachesCount}
                  onChange={(e) => setP1BreachesCount(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 6,
                    border: '1px solid var(--border, #D0D5DD)',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    background: 'var(--input-bg, #FFFFFF)',
                  }}
                />
              ) : (
                <input
                  type="number"
                  step="0.05"
                  value={breachShortfallPct}
                  onChange={(e) => setBreachShortfallPct(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 6,
                    border: '1px solid var(--border, #D0D5DD)',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    background: 'var(--input-bg, #FFFFFF)',
                  }}
                />
              )}
            </div>
          </div>

          {/* Penalty Clause Formula Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginBottom: 4 }}>
              Contractual Penalty Matrix Tier
            </label>
            <select
              value={penaltyTier}
              onChange={(e) => setPenaltyTier(e.target.value as any)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid var(--border, #D0D5DD)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                background: 'var(--input-bg, #FFFFFF)',
              }}
            >
              <option value="Standard (5% credit / 0.1% breach)">Standard: 5% monthly fee credit per 0.1% availability shortfall</option>
              <option value="Severe (10% credit / 0.1% breach)">Severe Outage: 10% monthly fee credit per 0.1% shortfall</option>
              <option value="Liquidated Damages Flat Fee">P1 Major Outage: SAR 25,000 flat deduction per incident</option>
            </select>
          </div>

          {/* Calculation Result Summary Card */}
          <div
            style={{
              padding: 16,
              borderRadius: 10,
              background: 'linear-gradient(135deg, rgba(7, 74, 118, 0.06) 0%, rgba(222, 53, 11, 0.08) 100%)',
              border: '1px solid var(--border, #E4E7EC)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>
                Total Service Credit Deduction:
              </span>
              <span style={{ fontSize: '1.375rem', fontWeight: 900, color: '#DE350B' }}>
                SAR {finalPayableCreditSAR.toLocaleString()}
              </span>
            </div>

            <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Monthly Contract Cap (25% maximum):</span>
              <strong>SAR {maxAllowableCapSAR.toLocaleString()}</strong>
            </div>

            {isCapped && (
              <div style={{ fontSize: '0.6875rem', color: '#E97F0A', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                <AlertTriangle size={12} />
                <span>Contractual monthly liability cap reached (SAR {maxAllowableCapSAR.toLocaleString()})</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid var(--border, #E4E7EC)',
            background: 'var(--bg-secondary, #F8FAFC)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 10,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '7px 16px',
              borderRadius: 6,
              background: 'var(--ncgr-deep-blue, #074A76)',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
};

export default VendorPenaltyCalculatorModal;
