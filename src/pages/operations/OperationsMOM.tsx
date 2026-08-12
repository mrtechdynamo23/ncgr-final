import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { momActionsList } from '../../data/master-employees';
import { Search } from 'lucide-react';

const OperationsMOM: React.FC = () => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredActions = momActionsList.filter(act => {
    const matchesSearch = act.action.toLowerCase().includes(searchTerm.toLowerCase()) || act.owner.toLowerCase().includes(searchTerm.toLowerCase()) || act.meeting.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || act.priority.toLowerCase() === priorityFilter.toLowerCase();
    return matchesSearch && matchesPriority;
  });

  const openCount = momActionsList.filter(a => a.status === 'Open').length;
  const inProgressCount = momActionsList.filter(a => a.status === 'In Progress').length;
  const completedCount = momActionsList.filter(a => a.status === 'Completed').length;
  const overdueCount = momActionsList.filter(a => a.status === 'Overdue').length;
  const highPriorityCount = momActionsList.filter(a => a.priority === 'High').length;

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Operations MOM & Action Tracker</h1>
            <p className="page-subtitle">Minutes of Meetings, Operational Decisions, Action Items & Governance Tracking</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* KPI Cards (Section 5) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Total Actions</div>
          <div className="kpi-card-value">15</div>
          <div className="kpi-card-trend neutral">Across Standups & CAB</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#4AA6DC' }} />
          <div className="kpi-card-label">In Progress</div>
          <div className="kpi-card-value" style={{ color: '#4AA6DC' }}>{inProgressCount}</div>
          <div className="kpi-card-trend neutral">Active Remediation</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">Open Actions</div>
          <div className="kpi-card-value" style={{ color: '#E97F0A' }}>{openCount}</div>
          <div className="kpi-card-trend neutral">Pending Owner Start</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#DE350B' }} />
          <div className="kpi-card-label">High Priority / Overdue</div>
          <div className="kpi-card-value" style={{ color: '#DE350B' }}>{highPriorityCount} / {overdueCount}</div>
          <div className="kpi-card-trend down">Requires Management Focus</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Completed</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>{completedCount}</div>
          <div className="kpi-card-trend up">Closed This Week</div>
        </div>
      </div>

      {/* Action Table */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">MOM Action Tracker (15 Operational Actions)</h2>
          <div style={{ display: 'flex', gap: 12 }}>
            <div className="header-search" style={{ width: 240 }}>
              <Search size={16} className="header-search-icon" />
              <input
                type="text"
                placeholder="Search action or owner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="form-select"
              style={{ width: 140, padding: '6px 10px', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)' }}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Action ID</th>
                <th>Meeting Source</th>
                <th style={{ minWidth: 260 }}>Action Description</th>
                <th>Owner</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Age</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredActions.map((act) => (
                <tr key={act.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{act.id}</td>
                  <td style={{ fontSize: '0.75rem', fontWeight: 500 }}>{act.meeting}<br /><span style={{ color: 'var(--text-tertiary)' }}>{act.date}</span></td>
                  <td style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{act.action}</td>
                  <td style={{ fontSize: '0.75rem' }}>{act.owner}</td>
                  <td>
                    <span className={`health-badge ${act.priority === 'High' ? 'critical' : act.priority === 'Medium' ? 'at-risk' : 'healthy'}`}>
                      {act.priority}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{act.dueDate}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{act.age}</td>
                  <td>
                    <span className={`health-badge ${act.status === 'Completed' ? 'healthy' : act.status === 'In Progress' ? 'info' : act.status === 'Overdue' ? 'critical' : 'at-risk'}`}>
                      {act.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OperationsMOM;
