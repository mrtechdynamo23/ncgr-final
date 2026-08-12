import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { masterApplications } from '../../data/master-applications';
import { ApplicationDetailModal } from '../../components/common/ApplicationDetailModal';
import { Search } from 'lucide-react';

const ApplicationSupportPage: React.FC = () => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const filteredApps = masterApplications.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.supportTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.itOwner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Application Support Coverage & Ownership</h1>
            <p className="page-subtitle">L1/L2/L3 Escalation Matrix, 24x7 Shift Coverage, Vendor Support Contracts & Coverage Gaps</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* KPI Overview (Module 9 Spec) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Applications Covered</div>
          <div className="kpi-card-value">48</div>
          <div className="kpi-card-trend neutral">100% L2 Coverage</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">24×7 Coverage</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>31</div>
          <div className="kpi-card-trend up">Critical & High Portals</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#4AA6DC' }} />
          <div className="kpi-card-label">Business Hours Support</div>
          <div className="kpi-card-value">17</div>
          <div className="kpi-card-trend neutral">Medium & Low Portals</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#671E75' }} />
          <div className="kpi-card-label">L3 Coverage Level</div>
          <div className="kpi-card-value">94%</div>
          <div className="kpi-card-trend neutral">Vendor & Internal Experts</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">Coverage Gaps Identified</div>
          <div className="kpi-card-value" style={{ color: '#E97F0A' }}>2</div>
          <div className="kpi-card-trend down">Vendor L3 On-Call Backups</div>
        </div>
      </div>

      {/* Main Support Coverage Table (Module 9 Spec) */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Application Support Matrix & Escalation Roster</h2>
          <div className="header-search" style={{ width: 280 }}>
            <Search size={16} className="header-search-icon" />
            <input
              type="text"
              placeholder="Search app or support team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Application Name</th>
                <th>L1 Support</th>
                <th>L2 Support Team</th>
                <th>L3 Support Team</th>
                <th>On-Call Status</th>
                <th>Vendor Support</th>
                <th>Coverage Window</th>
                <th>IT Lead Owner</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.slice(0, 15).map((a) => (
                <tr key={a.id} onClick={() => setSelectedAppId(a.id)} style={{ cursor: 'pointer' }}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{a.id}</td>
                  <td style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--ncgr-deep-blue)' }}>{a.name}</td>
                  <td style={{ fontSize: '0.75rem' }}>{a.l1Support}</td>
                  <td style={{ fontSize: '0.75rem', fontWeight: 600 }}>{a.l2Support}</td>
                  <td style={{ fontSize: '0.75rem' }}>{a.l3Support}</td>
                  <td>
                    <span className={`health-badge ${a.onCallAvailable ? 'healthy' : 'info'}`}>
                      {a.onCallAvailable ? 'Active On-Call' : 'Standby'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem' }}>{a.vendorSupport ? `Yes (${a.vendor})` : 'No (Internal)'}</td>
                  <td>
                    <span className={`health-badge ${a.coverageType === '24x7' ? 'healthy' : 'info'}`}>
                      {a.coverageType}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem' }}>{a.itOwner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ApplicationDetailModal appId={selectedAppId} onClose={() => setSelectedAppId(null)} />
    </div>
  );
};

export default ApplicationSupportPage;
