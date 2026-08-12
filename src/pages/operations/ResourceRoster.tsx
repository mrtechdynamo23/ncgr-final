import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter } from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  tower: string;
  role: string;
  headcount?: number;
  certification: string;
  experience: string;
  status: 'Active' | 'On Leave' | 'Training' | 'Notice Period';
  availability: string;
  location: string;
}

const towers = [
  'All', 'Service Desk', 'NOC', 'Network', 'Infrastructure', 'Cloud',
  'Application Support', 'Security', 'Database', 'Program Management',
];

const resources: Resource[] = [
  { id: 'RES-001', name: 'Ahmed Al-Farsi', tower: 'Network', role: 'Senior Network Engineer', certification: 'CCNP, JNCIA', experience: '8 years', status: 'Active', availability: 'Available', location: 'Riyadh' },
  { id: 'RES-002', name: 'Fatima Al-Hassan', tower: 'Application Support', role: 'Application Support Lead', certification: 'ITIL 4, SAP Certified', experience: '10 years', status: 'Active', availability: 'Available', location: 'Riyadh' },
  { id: 'RES-003', name: 'Khalid Ibrahim', tower: 'Database', role: 'Database Administrator', certification: 'OCA, OCP', experience: '7 years', status: 'Active', availability: 'Available', location: 'Riyadh' },
  { id: 'RES-004', name: 'Sara Al-Mutairi', tower: 'Security', role: 'Security Analyst', certification: 'CISSP, CEH', experience: '5 years', status: 'Active', availability: 'Available', location: 'Riyadh' },
  { id: 'RES-005', name: 'Nasser Al-Qahtani', tower: 'Cloud', role: 'Platform Engineer', certification: 'CKA, GCP Professional', experience: '6 years', status: 'Active', availability: 'Available', location: 'Riyadh' },
  { id: 'RES-006', name: 'Mohammed Al-Rashid', tower: 'NOC', role: 'NOC Engineer', certification: 'CCNA, ITIL', experience: '4 years', status: 'Active', availability: 'Available', location: 'Riyadh' },
  { id: 'RES-007', name: 'Layla Al-Saud', tower: 'Service Desk', role: 'Service Desk Analyst', certification: 'ITIL 4 Foundation', experience: '3 years', status: 'On Leave', availability: 'Returns Aug 15', location: 'Riyadh' },
  { id: 'RES-008', name: 'Omar Al-Dosari', tower: 'Infrastructure', role: 'Infrastructure Engineer', certification: 'VCP, RHCSA', experience: '6 years', status: 'Active', availability: 'Available', location: 'Jeddah' },
  { id: 'RES-009', name: 'Noura Al-Harbi', tower: 'Program Management', role: 'Program Manager', certification: 'PMP, PRINCE2', experience: '12 years', status: 'Active', availability: 'Available', location: 'Riyadh' },
  { id: 'RES-010', name: 'Yusuf Al-Zahrani', tower: 'Cloud', role: 'Cloud Architect', certification: 'AWS SA Pro, Azure Expert', experience: '9 years', status: 'Active', availability: 'Available', location: 'Riyadh' },
  { id: 'RES-011', name: 'Aisha Al-Otaibi', tower: 'Security', role: 'Security Operations Lead', certification: 'CISM, CRISC', experience: '8 years', status: 'Active', availability: 'Available', location: 'Riyadh' },
  { id: 'RES-012', name: 'Hassan Al-Ghamdi', tower: 'Network', role: 'Network Administrator', certification: 'CCNA, SolarWinds', experience: '5 years', status: 'Training', availability: 'Training until Aug 14', location: 'Riyadh' },
  { id: 'RES-013', name: 'Maryam Al-Shehri', tower: 'Application Support', role: 'Application Developer', certification: 'Java, SAP ABAP', experience: '4 years', status: 'Active', availability: 'Available', location: 'Dammam' },
  { id: 'RES-014', name: 'Abdullah Al-Malki', tower: 'Service Desk', role: 'Service Desk Lead', certification: 'ITIL 4, HDI', experience: '7 years', status: 'Active', availability: 'Available', location: 'Riyadh' },
  { id: 'RES-015', name: 'Reem Al-Tamimi', tower: 'Database', role: 'Senior DBA', certification: 'OCP, MCDBA', experience: '9 years', status: 'Active', availability: 'Available', location: 'Riyadh' },
];

// Tower headcount summary
const towerSummary = towers.filter(t => t !== 'All').map(tower => ({
  tower,
  total: resources.filter(r => r.tower === tower).length,
  active: resources.filter(r => r.tower === tower && r.status === 'Active').length,
  onLeave: resources.filter(r => r.tower === tower && r.status === 'On Leave').length,
}));

const ResourceRoster: React.FC = () => {
  const { t } = useTranslation(['common', 'operations']);
  const [selectedTower, setSelectedTower] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = resources.filter(r => {
    const matchTower = selectedTower === 'All' || r.tower === selectedTower;
    const matchSearch = searchQuery === '' ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTower && matchSearch;
  });

  const statusBadge = (status: string) => {
    const cls = status === 'Active' ? 'healthy' : status === 'On Leave' ? 'at-risk' : status === 'Training' ? 'attention' : 'critical';
    return <span className={`health-badge ${cls}`}><span className="badge-dot" />{status}</span>;
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">{t('operations:resourceRoster.title')}</h1>
            <p className="page-subtitle">
              <span className="simulated-badge">{t('app.demoData')}</span>
              <span style={{ marginLeft: 8 }}>{t('app.referenceEstateScale')}: 1,347 support staff</span>
            </p>
          </div>
        </div>
      </div>

      {/* Tower Summary Cards */}
      <div className="kpi-grid" style={{ marginBottom: 16 }}>
        {towerSummary.slice(0, 6).map(ts => (
          <div
            key={ts.tower}
            className="kpi-card"
            onClick={() => setSelectedTower(ts.tower)}
            style={{ cursor: 'pointer', borderColor: selectedTower === ts.tower ? 'var(--ncgr-deep-sky)' : undefined }}
          >
            <div className="kpi-card-label">{ts.tower}</div>
            <div className="kpi-card-value">{ts.total}</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>
              {ts.active} active · {ts.onLeave} on leave
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <Filter size={14} style={{ color: 'var(--text-tertiary)' }} />
        <select
          className="filter-select"
          value={selectedTower}
          onChange={(e) => setSelectedTower(e.target.value)}
        >
          {towers.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <div style={{ position: 'relative', flex: 1, maxWidth: 300 }}>
          <Search size={14} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            placeholder="Search by name or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '6px 10px 6px 28px',
              background: 'var(--input-bg)', border: '1px solid var(--input-border)',
              borderRadius: 'var(--border-radius-md)', color: 'var(--text)', fontSize: '0.75rem',
              outline: 'none',
            }}
          />
        </div>
        <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginLeft: 'auto' }}>
          {t('common.showing')} {filtered.length} {t('common.of')} {resources.length}
        </span>
      </div>

      {/* Data Table */}
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>{t('operations:resourceRoster.name')}</th>
              <th>{t('operations:resourceRoster.tower')}</th>
              <th>{t('operations:resourceRoster.role')}</th>
              <th>{t('operations:resourceRoster.certification')}</th>
              <th>{t('operations:resourceRoster.experience')}</th>
              <th>{t('operations:resourceRoster.status')}</th>
              <th>{t('operations:resourceRoster.availability')}</th>
              <th>{t('operations:resourceRoster.location')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td style={{ fontWeight: 500 }}>{r.name}</td>
                <td>{r.tower}</td>
                <td style={{ fontSize: '0.75rem' }}>{r.role}</td>
                <td style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{r.certification}</td>
                <td>{r.experience}</td>
                <td>{statusBadge(r.status)}</td>
                <td style={{ fontSize: '0.75rem' }}>{r.availability}</td>
                <td>{r.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResourceRoster;
