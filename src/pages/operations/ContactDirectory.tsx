import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { masterEmployees } from '../../data/master-employees';
import { Phone, Mail, MapPin, Building, Search } from 'lucide-react';

const ContactDirectory: React.FC = () => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [towerFilter, setTowerFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const filteredContacts = masterEmployees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.mobile.includes(searchTerm);
    const matchesTower = towerFilter === 'all' || emp.tower.toLowerCase() === towerFilter.toLowerCase();
    const matchesLocation = locationFilter === 'all' || emp.location.toLowerCase() === locationFilter.toLowerCase();
    return matchesSearch && matchesTower && matchesLocation;
  });

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">ITMS Operational Contact Directory</h1>
            <p className="page-subtitle">Master Roster, Escalation Contacts, Shift Leads & Saudi Phone Directory</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="header-search" style={{ flex: 1, minWidth: 260 }}>
            <Search size={16} className="header-search-icon" />
            <input
              type="text"
              placeholder="Search by name, role, email, or mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={towerFilter}
            onChange={(e) => setTowerFilter(e.target.value)}
            style={{ width: 180, padding: '8px 12px', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)' }}
          >
            <option value="all">All Towers</option>
            <option value="service management">Service Management</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="network">Network</option>
            <option value="application support">Application Support</option>
            <option value="noc">NOC</option>
            <option value="cloud">Cloud</option>
            <option value="database">Database</option>
            <option value="service desk">Service Desk</option>
            <option value="automation & ai">Automation & AI</option>
            <option value="program management">Program Management</option>
            <option value="digital workplace">Digital Workplace</option>
            <option value="security">Security</option>
          </select>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            style={{ width: 160, padding: '8px 12px', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)' }}
          >
            <option value="all">All Locations</option>
            <option value="riyadh primary">Riyadh Primary</option>
            <option value="riyadh dr">Riyadh DR</option>
            <option value="jeddah">Jeddah</option>
          </select>
        </div>
      </div>

      {/* Grid of Contact Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {filteredContacts.map((contact) => (
          <div
            key={contact.employeeId}
            className="card"
            style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12, borderTop: '3px solid var(--ncgr-mint-green)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--ncgr-deep-sky)' }}>
                  {contact.employeeId}
                </span>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>{contact.name}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{contact.role}</p>
              </div>
              <span className="health-badge healthy" style={{ fontSize: '0.625rem' }}>{contact.status}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Building size={14} style={{ color: 'var(--ncgr-deep-sky)' }} />
                <span>Tower: <strong>{contact.tower}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Phone size={14} style={{ color: 'var(--ncgr-mint-green)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{contact.mobile}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Mail size={14} style={{ color: 'var(--ncgr-purple)' }} />
                <span style={{ fontFamily: 'var(--font-mono)' }}>{contact.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MapPin size={14} style={{ color: 'var(--ncgr-tiffany-blue)' }} />
                <span>{contact.location}</span>
              </div>
            </div>

            <div style={{ paddingTop: 8, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>
              <span>Shift: {contact.shift.split(' ')[0]}</span>
              <span>Reports To: {contact.manager}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactDirectory;
