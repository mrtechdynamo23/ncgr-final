import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

const band1Items = [
  { name: 'Routine Backup & Log Cleanup Automation', tool: 'Ansible Tower', hoursSaved: '380 hrs/mo', status: 'In Production' },
  { name: 'Daily Operational Health Check Scripting', tool: 'Python / SolarWinds', hoursSaved: '210 hrs/mo', status: 'In Production' },
  { name: 'Incident Ticket Auto-Enrichment', tool: 'ServiceNow Integration Hub', hoursSaved: '180 hrs/mo', status: 'In Production' },
  { name: 'Automated Password Reset Bot via MobilePASS', tool: 'SafeNet / BeyondTrust', hoursSaved: '320 hrs/mo', status: 'In Production' },
];

const band2Items = [
  { name: 'ServiceNow & OpenShift Auto-Scaling Workflow', tool: 'Kubernetes Operator', hoursSaved: '160 hrs/mo', status: 'Testing' },
  { name: 'Predictive Storage Capacity Analytics', tool: 'Splunk ITSI', hoursSaved: '140 hrs/mo', status: 'Testing' },
  { name: 'Cross-Platform CMDB Auto-Reconciliation', tool: 'Discovery / AppDynamics', hoursSaved: '220 hrs/mo', status: 'Development' },
];

const band3Items = [
  { name: 'AI Incident Triage & Root Cause Assist (NCGR Bot)', tool: 'NCGR Assistant AI Engine', hoursSaved: '240 hrs/mo', status: 'Testing' },
  { name: 'AIOps Event Correlation Engine', tool: 'Splunk ITSI + AppDynamics', hoursSaved: '300 hrs/mo', status: 'Development' },
  { name: 'Generative AI Weekly Management Status Generator', tool: 'LLM Orchestrator', hoursSaved: '90 hrs/mo', status: 'Planned' },
];

const TransformationAccelerator: React.FC = () => {
  const { t } = useTranslation(['common', 'transformation']);
  const [selectedBand, setSelectedBand] = useState<'band1' | 'band2' | 'band3'>('band1');

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Digital Transformation & AI Accelerator</h1>
            <p className="page-subtitle">Three-Band Accelerator Model: Stabilize & Automate → Optimize & Integrate → Transform & AI</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* THREE-BAND ACCELERATOR VISUALIZATION (Section 14) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {/* Band 1 Tile */}
        <div
          onClick={() => setSelectedBand('band1')}
          style={{
            padding: 20,
            background: selectedBand === 'band1' ? 'var(--card-bg)' : 'var(--bg-secondary)',
            border: `2px solid ${selectedBand === 'band1' ? '#40904F' : 'var(--border)'}`,
            borderRadius: 'var(--border-radius-xl)',
            cursor: 'pointer',
            boxShadow: selectedBand === 'band1' ? 'var(--card-shadow-hover)' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: '#40904F', letterSpacing: '0.05em' }}>
              BAND 1
            </span>
            <span className="health-badge healthy" style={{ fontSize: '0.625rem' }}>4 INITIATIVES</span>
          </div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
            STABILIZE & AUTOMATE
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            Manual task automation, routine health checks, ticket enrichment & basic scripting.
          </p>
          <div style={{ marginTop: 16, fontSize: '0.75rem', fontWeight: 600, color: '#40904F', display: 'flex', alignItems: 'center', gap: 4 }}>
            View Band Details <ArrowRight size={14} />
          </div>
        </div>

        {/* Band 2 Tile */}
        <div
          onClick={() => setSelectedBand('band2')}
          style={{
            padding: 20,
            background: selectedBand === 'band2' ? 'var(--card-bg)' : 'var(--bg-secondary)',
            border: `2px solid ${selectedBand === 'band2' ? '#4AA6DC' : 'var(--border)'}`,
            borderRadius: 'var(--border-radius-xl)',
            cursor: 'pointer',
            boxShadow: selectedBand === 'band2' ? 'var(--card-shadow-hover)' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: '#4AA6DC', letterSpacing: '0.05em' }}>
              BAND 2
            </span>
            <span className="health-badge healthy" style={{ fontSize: '0.625rem' }}>3 INITIATIVES</span>
          </div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
            OPTIMIZE & INTEGRATE
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            Cross-platform integration, ServiceNow workflows & predictive analytics.
          </p>
          <div style={{ marginTop: 16, fontSize: '0.75rem', fontWeight: 600, color: '#4AA6DC', display: 'flex', alignItems: 'center', gap: 4 }}>
            View Band Details <ArrowRight size={14} />
          </div>
        </div>

        {/* Band 3 Tile */}
        <div
          onClick={() => setSelectedBand('band3')}
          style={{
            padding: 20,
            background: selectedBand === 'band3' ? 'var(--card-bg)' : 'var(--bg-secondary)',
            border: `2px solid ${selectedBand === 'band3' ? '#671E75' : 'var(--border)'}`,
            borderRadius: 'var(--border-radius-xl)',
            cursor: 'pointer',
            boxShadow: selectedBand === 'band3' ? 'var(--card-shadow-hover)' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: '#671E75', letterSpacing: '0.05em' }}>
              BAND 3
            </span>
            <span className="health-badge healthy" style={{ fontSize: '0.625rem' }}>3 INITIATIVES</span>
          </div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
            TRANSFORM & AI
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            AI-assisted operations, intelligent triage, generative reporting & predictive failure detection.
          </p>
          <div style={{ marginTop: 16, fontSize: '0.75rem', fontWeight: 600, color: '#671E75', display: 'flex', alignItems: 'center', gap: 4 }}>
            View Band Details <ArrowRight size={14} />
          </div>
        </div>
      </div>

      {/* BAND INITIATIVES DETAIL CARD */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            {selectedBand === 'band1'
              ? 'Band 1 — Stabilize & Automate Initiatives'
              : selectedBand === 'band2'
              ? 'Band 2 — Optimize & Integrate Initiatives'
              : 'Band 3 — Transform & AI Initiatives'}
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(selectedBand === 'band1' ? band1Items : selectedBand === 'band2' ? band2Items : band3Items).map((item) => (
            <div
              key={item.name}
              style={{
                padding: '14px 18px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--border-radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text)' }}>{item.name}</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginTop: 2 }}>
                  Technology / Platform: {item.tool}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--status-healthy)' }}>
                  {item.hoursSaved}
                </div>
                <span className={`health-badge ${item.status === 'In Production' ? 'healthy' : 'at-risk'}`} style={{ fontSize: '0.625rem', marginTop: 4 }}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransformationAccelerator;
