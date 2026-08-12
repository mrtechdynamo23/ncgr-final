import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { attendanceRecordsList } from '../../data/master-employees';
import { Search } from 'lucide-react';

const towerBreakdown = [
  { tower: 'Service Desk', total: 28, present: 26, leave: 1, absent: 0, remote: 1, rate: '94%' },
  { tower: 'NOC', total: 20, present: 19, leave: 1, absent: 0, remote: 0, rate: '97%' },
  { tower: 'Infrastructure', total: 27, present: 24, leave: 2, absent: 1, remote: 0, rate: '91%' },
  { tower: 'Network', total: 18, present: 17, leave: 1, absent: 0, remote: 0, rate: '96%' },
  { tower: 'Database', total: 12, present: 11, leave: 1, absent: 0, remote: 0, rate: '93%' },
  { tower: 'Cloud', total: 14, present: 13, leave: 0, absent: 0, remote: 1, rate: '95%' },
  { tower: 'Application Support', total: 24, present: 21, leave: 1, absent: 1, remote: 1, rate: '90%' },
  { tower: 'Security', total: 9, present: 8, leave: 0, absent: 0, remote: 1, rate: '92%' },
  { tower: 'Digital Workplace', total: 10, present: 9, leave: 0, absent: 1, remote: 0, rate: '94%' },
];

const AttendanceView: React.FC = () => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = attendanceRecordsList.filter(rec =>
    rec.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.tower.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.workLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Workforce Attendance & Shift Verification</h1>
            <p className="page-subtitle">Real-Time Operations Attendance Dashboard, Shift Check-ins & Location Tracking</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* Reconciled Summary Dashboard (Section 5) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Total Workforce</div>
          <div className="kpi-card-value">148</div>
          <div className="kpi-card-trend neutral">All 12 ITMS Towers</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Present On-Site</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>132</div>
          <div className="kpi-card-trend up">Riyadh Primary & DR</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">On Approved Leave</div>
          <div className="kpi-card-value" style={{ color: '#E97F0A' }}>8</div>
          <div className="kpi-card-trend neutral">Roster Substituted</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#DE350B' }} />
          <div className="kpi-card-label">Unexcused Absent</div>
          <div className="kpi-card-value" style={{ color: '#DE350B' }}>3</div>
          <div className="kpi-card-trend down">Follow-up Initiated</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#4AA6DC' }} />
          <div className="kpi-card-label">Remote / Standby</div>
          <div className="kpi-card-value" style={{ color: '#4AA6DC' }}>5</div>
          <div className="kpi-card-trend neutral">On-Call Coverage</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#1FBBB0' }} />
          <div className="kpi-card-label">Attendance Rate</div>
          <div className="kpi-card-value" style={{ color: '#1FBBB0' }}>89.2%</div>
          <div className="kpi-card-trend up">SLA Benchmark 85%</div>
        </div>
      </div>

      {/* Tower Breakdown Table */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <h2 className="card-title">Tower Attendance Breakdown</h2>
        </div>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Tower Name</th>
                <th>Total Assigned</th>
                <th>Present On-Site</th>
                <th>On Leave</th>
                <th>Absent</th>
                <th>Remote</th>
                <th>Tower Attendance Rate</th>
              </tr>
            </thead>
            <tbody>
              {towerBreakdown.map((t) => (
                <tr key={t.tower}>
                  <td style={{ fontWeight: 600 }}>{t.tower}</td>
                  <td>{t.total}</td>
                  <td style={{ color: 'var(--status-healthy)', fontWeight: 600 }}>{t.present}</td>
                  <td>{t.leave}</td>
                  <td style={{ color: t.absent > 0 ? 'var(--status-critical)' : 'inherit' }}>{t.absent}</td>
                  <td>{t.remote}</td>
                  <td><span className="health-badge healthy" style={{ fontSize: '0.625rem' }}>{t.rate}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Level Table */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Key Staff Attendance Log (15 Master Employees)</h2>
          <div className="header-search" style={{ width: 260 }}>
            <Search size={16} className="header-search-icon" />
            <input
              type="text"
              placeholder="Search staff attendance..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee Name</th>
                <th>Tower</th>
                <th>Shift</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Status</th>
                <th>Work Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((rec) => (
                <tr key={rec.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{rec.id}</td>
                  <td style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{rec.employee}</td>
                  <td><span className="health-badge healthy" style={{ fontSize: '0.625rem' }}>{rec.tower}</span></td>
                  <td style={{ fontSize: '0.75rem' }}>{rec.shift}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--status-healthy)', fontWeight: 600 }}>{rec.checkIn}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{rec.checkOut}</td>
                  <td>
                    <span className={`health-badge ${rec.status === 'Present' ? 'healthy' : rec.status === 'Remote' ? 'info' : 'at-risk'}`}>
                      {rec.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem' }}>{rec.workLocation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceView;
