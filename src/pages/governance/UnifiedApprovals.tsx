import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { approvalsList } from '../../data/governance';
import { Filter } from 'lucide-react';

const categories = ['All', 'Change', 'Access', 'Leave', 'Procurement', 'Resource', 'Vendor', 'Project'];

const UnifiedApprovals: React.FC = () => {
  const { t } = useTranslation(['common', 'governance']);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = approvalsList.filter((a) => selectedCategory === 'All' || a.category === selectedCategory);

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Unified Approvals</h1>
            <p className="page-subtitle">Centralized inbox for Leave, Access, Procurement, Change, Resource, Vendor, and Project approvals</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* Counters */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#671E75' }} />
          <div className="kpi-card-label">Pending Inbox</div>
          <div className="kpi-card-value">{approvalsList.filter((a) => a.status === 'Pending').length}</div>
          <div className="kpi-card-trend neutral">Awaiting Review</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#DE350B' }} />
          <div className="kpi-card-label">Urgent Priority</div>
          <div className="kpi-card-value" style={{ color: '#DE350B' }}>
            {approvalsList.filter((a) => a.priority === 'Urgent').length}
          </div>
          <div className="kpi-card-trend down">Requires Immediate Action</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Approved Today</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>12</div>
          <div className="kpi-card-trend up">Cleared</div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="filter-bar">
        <Filter size={14} style={{ color: 'var(--text-tertiary)' }} />
        <select
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginLeft: 'auto' }}>
          Showing {filtered.length} approval requests
        </span>
      </div>

      {/* Approval Requests Table */}
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Category</th>
              <th style={{ minWidth: 260 }}>Title / Description</th>
              <th>Requester</th>
              <th>Approver</th>
              <th>Age</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((apr) => (
              <tr key={apr.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>
                  {apr.id}
                </td>
                <td>
                  <span className="health-badge healthy" style={{ fontSize: '0.625rem' }}>
                    {apr.category}
                  </span>
                </td>
                <td style={{ fontWeight: 500 }}>{apr.title}</td>
                <td>{apr.requester}</td>
                <td style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{apr.approver}</td>
                <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{apr.age}</td>
                <td>
                  <span
                    className={`health-badge ${
                      apr.priority === 'Urgent' ? 'critical' : apr.priority === 'High' ? 'at-risk' : 'healthy'
                    }`}
                  >
                    {apr.priority}
                  </span>
                </td>
                <td>
                  <button className="btn btn-primary btn-sm" style={{ padding: '4px 8px', fontSize: '0.6875rem' }}>
                    Review Request
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnifiedApprovals;
