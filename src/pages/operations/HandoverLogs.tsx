import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { handoverLogsList, type HandoverRecord } from '../../data/master-employees';
import { Search } from 'lucide-react';

const HandoverLogs: React.FC = () => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<HandoverRecord | null>(null);

  const filteredLogs = handoverLogsList.filter(log =>
    log.tower.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.outgoingEngineer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.incomingEngineer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.criticalEvents.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Shift Handover Logs</h1>
            <p className="page-subtitle">Cross-Shift Operational Continuity, Risk Transfer & Pending Action Log</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Total Handover Logs</div>
          <div className="kpi-card-value">15</div>
          <div className="kpi-card-trend neutral">Across All 12 Towers</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Clean Handovers</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>14</div>
          <div className="kpi-card-trend up">No Escalate Warnings</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">Attention Required</div>
          <div className="kpi-card-value" style={{ color: '#E97F0A' }}>1</div>
          <div className="kpi-card-trend down">Database Replication Lag</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#4AA6DC' }} />
          <div className="kpi-card-label">Shift Coverage</div>
          <div className="kpi-card-value">24/7</div>
          <div className="kpi-card-trend neutral">Riyadh Primary & DR</div>
        </div>
      </div>

      {/* Data Table */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Recent Shift Handovers (15 Records)</h2>
          <div className="header-search" style={{ width: 280 }}>
            <Search size={16} className="header-search-icon" />
            <input
              type="text"
              placeholder="Search handover logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Handover ID</th>
                <th>Date / Shift</th>
                <th>Tower</th>
                <th>Outgoing Engineer</th>
                <th>Incoming Engineer</th>
                <th style={{ minWidth: 200 }}>Critical Events</th>
                <th>Open Incidents</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} onClick={() => setSelectedRecord(log)} style={{ cursor: 'pointer' }}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{log.id}</td>
                  <td style={{ fontSize: '0.75rem' }}>{log.date}<br /><span style={{ color: 'var(--text-tertiary)' }}>{log.shift}</span></td>
                  <td><span className="health-badge healthy" style={{ fontSize: '0.625rem' }}>{log.tower}</span></td>
                  <td style={{ fontSize: '0.75rem', fontWeight: 600 }}>{log.outgoingEngineer}</td>
                  <td style={{ fontSize: '0.75rem', fontWeight: 600 }}>{log.incomingEngineer}</td>
                  <td style={{ fontSize: '0.8125rem' }}>{log.criticalEvents}</td>
                  <td style={{ fontSize: '0.75rem', color: log.openIncidents === 'None' ? 'var(--text-tertiary)' : 'var(--status-critical)' }}>{log.openIncidents}</td>
                  <td>
                    <span className={`health-badge ${log.status === 'Completed' ? 'healthy' : 'at-risk'}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Detail Drawer Modal */}
      {selectedRecord && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 'var(--border-radius-xl)', padding: 24, maxWidth: 600, width: '100%', color: 'var(--text)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Handover Record {selectedRecord.id}</h3>
              <button onClick={() => setSelectedRecord(null)} style={{ cursor: 'pointer', fontWeight: 700 }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: '0.8125rem', marginBottom: 16 }}>
              <div><strong>Tower:</strong> {selectedRecord.tower}</div>
              <div><strong>Date:</strong> {selectedRecord.date}</div>
              <div><strong>Outgoing:</strong> {selectedRecord.outgoingEngineer}</div>
              <div><strong>Incoming:</strong> {selectedRecord.incomingEngineer}</div>
              <div><strong>Shift:</strong> {selectedRecord.shift}</div>
              <div><strong>Status:</strong> {selectedRecord.status}</div>
            </div>
            <div style={{ fontSize: '0.8125rem', lineHeight: 1.5 }}>
              <p style={{ marginBottom: 8 }}><strong>Critical Events:</strong> {selectedRecord.criticalEvents}</p>
              <p style={{ marginBottom: 8 }}><strong>Open Incidents:</strong> {selectedRecord.openIncidents}</p>
              <p style={{ marginBottom: 8 }}><strong>Pending Actions:</strong> {selectedRecord.pendingActions}</p>
              <p style={{ marginBottom: 8 }}><strong>Risks:</strong> {selectedRecord.risks}</p>
              <p><strong>Dependencies:</strong> {selectedRecord.dependencies}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HandoverLogs;
