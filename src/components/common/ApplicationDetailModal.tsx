import React, { useState } from 'react';
import {
  masterApplications,
  appIncidentsList,
  appProblemsList,
  appChangesList,
  appDependenciesList
} from '../../data/master-applications';
import { ExternalLink } from 'lucide-react';

interface ApplicationDetailModalProps {
  appId: string | null;
  onClose: () => void;
}

export const ApplicationDetailModal: React.FC<ApplicationDetailModalProps> = ({ appId, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'incidents' | 'problems' | 'changes' | 'performance' | 'dependencies' | 'support'>('overview');

  if (!appId) return null;

  const app = masterApplications.find(a => a.id === appId || a.name.toLowerCase() === appId.toLowerCase());

  if (!app) return null;

  const appIncidents = appIncidentsList.filter(i => i.appId === app.id || i.appName === app.name);
  const appProblems = appProblemsList.filter(p => p.appId === app.id || p.appName === app.name);
  const appChanges = appChangesList.filter(c => c.appId === app.id || c.appName === app.name);
  const appDependencies = appDependenciesList.filter(d => d.appName === app.name);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--border-radius-xl)',
          width: '100%',
          maxWidth: 900,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          color: 'var(--text)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)', fontWeight: 700 }}>
                {app.id}
              </span>
              <span className={`health-badge ${app.criticality === 'Critical' ? 'critical' : app.criticality === 'High' ? 'at-risk' : 'healthy'}`}>
                {app.criticality}
              </span>
              <span className="health-badge healthy">{app.environment}</span>
              <span className={`health-badge ${app.health === 'Healthy' ? 'healthy' : 'at-risk'}`}>
                {app.health}
              </span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)' }}>{app.name}</h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>
              Business Service: <strong>{app.businessService}</strong> · Domain: <strong>{app.businessDomain}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ fontSize: '1.25rem', fontWeight: 700, cursor: 'pointer', background: 'none', border: 'none', color: 'var(--text-secondary)' }}
          >
            ✕
          </button>
        </div>

        {/* Tab Strip */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--card-bg)', overflowX: 'auto' }}>
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'incidents', label: `Incidents (${appIncidents.length})` },
            { id: 'problems', label: `Problems (${appProblems.length})` },
            { id: 'changes', label: `Changes (${appChanges.length})` },
            { id: 'performance', label: 'Performance' },
            { id: 'dependencies', label: 'Dependencies' },
            { id: 'support', label: 'Support Coverage' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              style={{
                padding: '12px 18px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                borderBottom: activeTab === t.id ? '3px solid var(--ncgr-mint-green)' : '3px solid transparent',
                color: activeTab === t.id ? 'var(--ncgr-deep-blue)' : 'var(--text-secondary)',
                whiteSpace: 'nowrap',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div style={{ padding: 24, overflowY: 'auto', flex: 1 }}>
          {activeTab === 'overview' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
                <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 6 }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>30-Day Availability</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--status-healthy)', marginTop: 2 }}>{app.availability}</div>
                </div>
                <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 6 }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Avg Response Time</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: app.responseTimeSec > app.thresholdSec ? 'var(--status-at-risk)' : 'var(--text)', marginTop: 2 }}>
                    {app.responseTimeSec}s <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-tertiary)' }}>(Limit {app.thresholdSec}s)</span>
                  </div>
                </div>
                <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 6 }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Error Rate / Throughput</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', marginTop: 2 }}>
                    {app.errorRatePct}% <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-tertiary)' }}>({app.transactionsPerHr} t/hr)</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: '0.8125rem', lineHeight: 1.8 }}>
                <div><strong>Business Owner:</strong> {app.businessOwner}</div>
                <div><strong>IT Owner:</strong> {app.itOwner}</div>
                <div><strong>Support Team:</strong> {app.supportTeam}</div>
                <div><strong>Vendor:</strong> {app.vendor}</div>
                <div><strong>Technology Stack:</strong> {app.technologyStack}</div>
                <div><strong>Version:</strong> {app.version}</div>
                <div><strong>Hosting Architecture:</strong> {app.hosting}</div>
                <div><strong>Lifecycle Status:</strong> {app.lifecycle}</div>
                <div><strong>Last Lifecycle Review:</strong> {app.lastReview}</div>
                <div><strong>Next Review Date:</strong> {app.nextReview}</div>
              </div>
            </div>
          )}

          {activeTab === 'incidents' && (
            <div>
              {appIncidents.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 30, color: 'var(--text-tertiary)' }}>No active incidents recorded for this application.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {appIncidents.map((inc) => (
                    <div key={inc.incidentNumber} style={{ padding: 14, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 6 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--ncgr-purple)' }}>{inc.incidentNumber}</span>
                        <span className={`health-badge ${inc.priority === 'P1' ? 'critical' : 'at-risk'}`}>{inc.priority}</span>
                      </div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{inc.description}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                        Impact: {inc.businessImpact}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, fontSize: '0.75rem' }}>
                        <span style={{ color: 'var(--text-tertiary)' }}>Age: {inc.age} · Opened: {inc.openedDate}</span>
                        <a href={inc.servicenowRef} target="_blank" rel="noreferrer" style={{ color: 'var(--ncgr-deep-sky)', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                          View in ServiceNow <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'problems' && (
            <div>
              {appProblems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 30, color: 'var(--text-tertiary)' }}>No active problem records for this application.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {appProblems.map((prb) => (
                    <div key={prb.problemNumber} style={{ padding: 14, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 6 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--ncgr-purple)' }}>{prb.problemNumber}</span>
                        <span className="health-badge info">{prb.rcaStatus}</span>
                      </div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{prb.issue}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                        <strong>Root Cause:</strong> {prb.rootCause}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--ncgr-mint-green)', marginTop: 2 }}>
                        <strong>Corrective Action:</strong> {prb.correctiveAction}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'changes' && (
            <div>
              {appChanges.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 30, color: 'var(--text-tertiary)' }}>No upcoming change requests scheduled.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {appChanges.map((chg) => (
                    <div key={chg.changeNumber} style={{ padding: 14, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 6 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--ncgr-deep-sky)' }}>{chg.changeNumber} ({chg.releaseVersion})</span>
                        <span className="health-badge info">{chg.status}</span>
                      </div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{chg.description}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 4 }}>
                        Scheduled Window: {chg.scheduledDate} · Risk Level: {chg.risk}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'performance' && (
            <div style={{ fontSize: '0.8125rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div><strong>Response Time:</strong> {app.responseTimeSec}s</div>
                <div><strong>Configured SLA Limit:</strong> {app.thresholdSec}s</div>
                <div><strong>Error Rate:</strong> {app.errorRatePct}%</div>
                <div><strong>Hourly Transaction Rate:</strong> {app.transactionsPerHr} ops/hr</div>
              </div>
              <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 6 }}>
                <strong style={{ color: 'var(--ncgr-deep-blue)' }}>Performance Telemetry Summary:</strong>
                <p style={{ marginTop: 4, color: 'var(--text-secondary)' }}>
                  AppDynamics APM sensor active. Transaction health rating: <strong>{app.performanceState}</strong>. Zero threshold breaches recorded in last 24h.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'dependencies' && (
            <div>
              {appDependencies.length === 0 ? (
                <div style={{ padding: 16, background: 'var(--bg-secondary)', borderRadius: 6, fontSize: '0.8125rem' }}>
                  Standard enterprise dependency chain: <strong>{app.name}</strong> → <strong>Enterprise Integration Hub</strong> → <strong>PostgreSQL / Oracle DB</strong> → <strong>STC Network</strong>.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {appDependencies.map((dep) => (
                    <div key={dep.id} style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{dep.dependencyName} ({dep.dependencyType})</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>{dep.businessImpact}</div>
                      </div>
                      <span className={`health-badge ${dep.health === 'Healthy' ? 'healthy' : 'at-risk'}`}>{dep.health}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'support' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: '0.8125rem' }}>
              <div><strong>L1 Service Desk:</strong> {app.l1Support}</div>
              <div><strong>L2 Application Support:</strong> {app.l2Support}</div>
              <div><strong>L3 Escalation Group:</strong> {app.l3Support}</div>
              <div><strong>24x7 On-Call Escalation:</strong> {app.onCallAvailable ? 'Active On-Call Roster' : 'Business Hours Only'}</div>
              <div><strong>Vendor Contract Support:</strong> {app.vendorSupport ? `Active (${app.vendor})` : 'Internal ITMS Support'}</div>
              <div><strong>Support SLA Windows:</strong> {app.coverageType}</div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
          <span style={{ color: 'var(--text-tertiary)' }}>Source: ServiceNow — DEMO DATA</span>
          <button className="btn btn-secondary" onClick={onClose}>Close Dossier</button>
        </div>
      </div>
    </div>
  );
};
