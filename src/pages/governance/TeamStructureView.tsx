import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { masterEmployees } from '../../data/master-employees';

const towerDetails = [
  { tower: 'Service Management', lead: 'Faisal Al-Harbi', count: 8, open: 0, shift: '24/7 Cover', contact: '+966 55 284 7316' },
  { tower: 'Infrastructure', lead: 'Ahmed Al-Qahtani', count: 25, open: 2, shift: '24/7 On-Call', contact: '+966 54 671 9284' },
  { tower: 'Network', lead: 'Mohammed Al-Dosari', count: 16, open: 2, shift: '24/7 On-Call', contact: '+966 50 394 6158' },
  { tower: 'Application Support', lead: 'Sara Al-Otaibi', count: 23, open: 1, shift: 'Morning & Evening', contact: '+966 55 728 4163' },
  { tower: 'NOC', lead: 'Khalid Al-Shammari', count: 20, open: 0, shift: '24/7 3-Shifts', contact: '+966 53 641 9275' },
  { tower: 'Cloud', lead: 'Priya Nair', count: 12, open: 2, shift: 'Morning & Standby', contact: '+966 56 318 4729' },
  { tower: 'Database', lead: 'Omar Al-Mutairi', count: 11, open: 1, shift: 'Morning & Evening', contact: '+966 54 285 7319' },
  { tower: 'Service Desk', lead: 'Aisha Rahman', count: 28, open: 0, shift: '24/7 3-Shifts', contact: '+966 55 416 8293' },
  { tower: 'Automation & AI', lead: 'Arjun Menon', count: 5, open: 1, shift: 'Morning', contact: '+966 56 729 3154' },
  { tower: 'Program Management', lead: 'Noura Al-Qahtani', count: 6, open: 0, shift: 'Morning', contact: '+966 55 831 4627' },
  { tower: 'Digital Workplace', lead: 'Layla Hassan', count: 10, open: 0, shift: 'Morning & On-Call', contact: '+966 55 692 4173' },
  { tower: 'Security', lead: 'Daniel Mathew', count: 9, open: 0, shift: '24/7 On-Call', contact: '+966 56 483 9217' },
];

const TeamStructureView: React.FC = () => {
  const { t } = useTranslation('common');
  const [selectedTower, setSelectedTower] = useState<string>('Infrastructure');

  const selectedStaff = masterEmployees.filter(e => e.tower.toLowerCase() === selectedTower.toLowerCase());

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Interactive ITMS Team & Org Structure</h1>
            <p className="page-subtitle">Interactive Organization Chart, Tower Structure, Leadership & Resource Distribution</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* Leadership Executive Banner (Section 13) */}
      <div className="card" style={{ marginBottom: 24, padding: 20, background: 'linear-gradient(135deg, var(--ncgr-deep-blue) 0%, #053558 100%)', color: '#FFFFFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ncgr-deep-sky)' }}>
              PROGRAM LEADERSHIP
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: 4 }}>NCGR ITMS Managed Operations Org Chart</h2>
            <p style={{ fontSize: '0.8125rem', opacity: 0.85, marginTop: 4 }}>
              Service Delivery Director: <strong>Faisal Al-Harbi</strong> · Program Manager: <strong>Noura Al-Qahtani</strong>
            </p>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ncgr-mint-green)' }}>148</div>
              <div style={{ fontSize: '0.6875rem', opacity: 0.7 }}>Active Staff</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ncgr-lemon)' }}>12</div>
              <div style={{ fontSize: '0.6875rem', opacity: 0.7 }}>Operational Towers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tower Selector Buttons */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <h2 className="card-title">Select Operational Tower to View Structure & Staff</h2>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {towerDetails.map((t) => (
            <button
              key={t.tower}
              onClick={() => setSelectedTower(t.tower)}
              className="btn btn-secondary"
              style={{
                background: selectedTower === t.tower ? 'var(--ncgr-deep-blue)' : 'var(--bg-secondary)',
                color: selectedTower === t.tower ? '#FFFFFF' : 'var(--text)',
                border: `1px solid ${selectedTower === t.tower ? 'var(--ncgr-deep-blue)' : 'var(--border)'}`,
                fontSize: '0.75rem',
                padding: '6px 12px',
              }}
            >
              {t.tower} ({t.count})
            </button>
          ))}
        </div>
      </div>

      {/* Tower Detail & Staff Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20 }}>
        {/* Tower Summary Card */}
        {(() => {
          const detail = towerDetails.find(t => t.tower.toLowerCase() === selectedTower.toLowerCase());
          if (!detail) return null;
          return (
            <div className="card" style={{ padding: 20, borderTop: '3px solid var(--ncgr-mint-green)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 12 }}>{detail.tower} Tower</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.8125rem' }}>
                <div><strong>Tower Lead:</strong><br />{detail.lead}</div>
                <div><strong>Assigned Headcount:</strong><br />{detail.count} Staff</div>
                <div><strong>Open Positions:</strong><br />{detail.open} Roles</div>
                <div><strong>Shift Coverage:</strong><br />{detail.shift}</div>
                <div><strong>Lead Mobile:</strong><br /><span style={{ fontFamily: 'var(--font-mono)' }}>{detail.contact}</span></div>
              </div>
            </div>
          );
        })()}

        {/* Assigned Staff Members */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">{selectedTower} Tower Key Personnel</h2>
          </div>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Location</th>
                  <th>Shift</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedStaff.map((s) => (
                  <tr key={s.employeeId}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{s.employeeId}</td>
                    <td style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{s.name}</td>
                    <td style={{ fontSize: '0.75rem' }}>{s.role}</td>
                    <td style={{ fontSize: '0.75rem' }}>{s.location}</td>
                    <td style={{ fontSize: '0.75rem' }}>{s.shift.split(' ')[0]}</td>
                    <td style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>{s.mobile}</td>
                    <td style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>{s.email}</td>
                    <td>
                      <span className={`health-badge ${s.status === 'Active' ? 'healthy' : 'at-risk'}`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStructureView;
