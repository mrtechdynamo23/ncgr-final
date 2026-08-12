import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { leaveRecordsList } from '../../data/master-employees';
import { Search } from 'lucide-react';

const LeaveManagement: React.FC = () => {
  const { t } = useTranslation('common');
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeave = leaveRecordsList.filter(l =>
    l.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.tower.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const approvedCount = leaveRecordsList.filter(l => l.status === 'Approved').length;
  const pendingCount = leaveRecordsList.filter(l => l.status === 'Pending').length;
  const upcomingCount = leaveRecordsList.filter(l => l.status === 'Upcoming').length;

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Workforce Leave Management</h1>
            <p className="page-subtitle">Shift Resource Availability, Leave Approvals, Standby & Backup Coverage</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* KPI Overview (Section 5) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Active Leave Requests</div>
          <div className="kpi-card-value">15</div>
          <div className="kpi-card-trend neutral">August - October 2026</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Approved Leave</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>{approvedCount}</div>
          <div className="kpi-card-trend up">Backup Assigned</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">Pending Approval</div>
          <div className="kpi-card-value" style={{ color: '#E97F0A' }}>{pendingCount}</div>
          <div className="kpi-card-trend neutral">Under Lead Review</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#4AA6DC' }} />
          <div className="kpi-card-label">Upcoming Scheduled</div>
          <div className="kpi-card-value" style={{ color: '#4AA6DC' }}>{upcomingCount}</div>
          <div className="kpi-card-trend neutral">Next 30 Days</div>
        </div>
      </div>

      {/* View Selector & Search */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setViewMode('table')}
              className="btn btn-secondary"
              style={{ background: viewMode === 'table' ? 'var(--ncgr-deep-blue)' : undefined, color: viewMode === 'table' ? '#FFFFFF' : undefined }}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className="btn btn-secondary"
              style={{ background: viewMode === 'calendar' ? 'var(--ncgr-deep-blue)' : undefined, color: viewMode === 'calendar' ? '#FFFFFF' : undefined }}
            >
              Calendar Schedule
            </button>
          </div>

          <div className="header-search" style={{ width: 280 }}>
            <Search size={16} className="header-search-icon" />
            <input
              type="text"
              placeholder="Search employee or tower..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Employee Leave Roster (15 Records)</h2>
          </div>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Leave ID</th>
                  <th>Employee Name</th>
                  <th>Tower</th>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Days</th>
                  <th>Approver</th>
                  <th>Status</th>
                  <th>Backup Resource</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeave.map((l) => (
                  <tr key={l.id}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{l.id}</td>
                    <td style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{l.employee}</td>
                    <td><span className="health-badge healthy" style={{ fontSize: '0.625rem' }}>{l.tower}</span></td>
                    <td style={{ fontSize: '0.75rem' }}>{l.leaveType}</td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{l.startDate}</td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{l.endDate}</td>
                    <td style={{ fontSize: '0.75rem', fontWeight: 600 }}>{l.days} days</td>
                    <td style={{ fontSize: '0.75rem' }}>{l.approver}</td>
                    <td>
                      <span className={`health-badge ${l.status === 'Approved' ? 'healthy' : l.status === 'Pending' ? 'at-risk' : 'info'}`}>
                        {l.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ncgr-mint-green)' }}>{l.backupResource}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Calendar View (Section 5) */
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">August 2026 Leave Schedule Calendar</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, textAlign: 'center' }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} style={{ fontWeight: 700, padding: 8, background: 'var(--bg-secondary)', borderRadius: 4, fontSize: '0.75rem' }}>{d}</div>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
              const dayStr = `2026-08-${day.toString().padStart(2, '0')}`;
              const activeLeaves = leaveRecordsList.filter(l => l.startDate <= dayStr && dayStr <= l.endDate);
              return (
                <div key={day} style={{ minHeight: 70, border: '1px solid var(--border)', borderRadius: 4, padding: 6, textAlign: 'left', background: activeLeaves.length > 0 ? 'rgba(64,144,79,0.05)' : 'var(--card-bg)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>{day}</div>
                  {activeLeaves.map(al => (
                    <div key={al.id} style={{ fontSize: '0.625rem', background: 'var(--ncgr-mint-green)', color: '#FFF', padding: '2px 4px', borderRadius: 2, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {al.employee}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveManagement;
