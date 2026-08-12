import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { activityChecklistItems } from '../../data/master-employees';
import { Search } from 'lucide-react';

const ActivityChecklist: React.FC = () => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredItems = activityChecklistItems.filter((item) => {
    const matchesSearch = item.activity.toLowerCase().includes(searchTerm.toLowerCase()) || item.owner.toLowerCase().includes(searchTerm.toLowerCase()) || item.tower.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const completedCount = activityChecklistItems.filter(i => i.status === 'Completed').length;
  const pendingCount = activityChecklistItems.filter(i => i.status === 'Pending').length;
  const overdueCount = activityChecklistItems.filter(i => i.status === 'Overdue').length;
  const completionPct = ((completedCount / activityChecklistItems.length) * 100).toFixed(1);

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Operational Activity Checklist</h1>
            <p className="page-subtitle">Daily & Weekly Operational Tasks, Health Checks & Shift Verification</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* Summary KPI Cards (Section 5) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Total Scheduled Activities</div>
          <div className="kpi-card-value">{activityChecklistItems.length}</div>
          <div className="kpi-card-trend neutral">Daily & Weekly Checklists</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Completed Tasks</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>{completedCount}</div>
          <div className="kpi-card-trend up">On Schedule</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#4AA6DC' }} />
          <div className="kpi-card-label">Pending Verification</div>
          <div className="kpi-card-value" style={{ color: '#4AA6DC' }}>{pendingCount}</div>
          <div className="kpi-card-trend neutral">Due Today</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#DE350B' }} />
          <div className="kpi-card-label">Overdue Tasks</div>
          <div className="kpi-card-value" style={{ color: '#DE350B' }}>{overdueCount}</div>
          <div className="kpi-card-trend down">Requires Action</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#1FBBB0' }} />
          <div className="kpi-card-label">Completion Rate</div>
          <div className="kpi-card-value" style={{ color: '#1FBBB0' }}>{completionPct}%</div>
          <div className="kpi-card-trend up">Operational SLA Target 95%</div>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 12, flex: 1, minWidth: 280 }}>
            <div className="header-search" style={{ width: '100%', maxWidth: 360 }}>
              <Search size={16} className="header-search-icon" />
              <input
                type="text"
                placeholder="Search activity, owner, tower..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select"
              style={{ width: 160, padding: '8px 12px', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)' }}
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Showing {filteredItems.length} of {activityChecklistItems.length} activities</span>
        </div>
      </div>

      {/* Detail Data Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Activity Execution Log</h2>
        </div>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Activity Description</th>
                <th>Tower</th>
                <th>Owner</th>
                <th>Frequency</th>
                <th>Due Time</th>
                <th>Status</th>
                <th>Last Completed</th>
                <th>Next Due</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{item.id}</td>
                  <td style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{item.activity}</td>
                  <td><span className="health-badge healthy" style={{ fontSize: '0.625rem' }}>{item.tower}</span></td>
                  <td style={{ fontSize: '0.75rem' }}>{item.owner}</td>
                  <td style={{ fontSize: '0.75rem' }}>{item.frequency}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{item.dueTime}</td>
                  <td>
                    <span className={`health-badge ${item.status === 'Completed' ? 'healthy' : item.status === 'Pending' ? 'at-risk' : 'critical'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{item.lastCompleted}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{item.nextDue}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityChecklist;
