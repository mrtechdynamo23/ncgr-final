import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

interface VendorItem {
  id: string;
  vendorName: string;
  serviceDomain: string;
  contractStatus: string;
  annualValue: string;
  slaPerformance: string;
  health: 'Healthy' | 'Attention Required' | 'Critical';
  riskScore: 'Low' | 'Medium' | 'High';
  contractExpiry: string;
  openActions: number;
  serviceOwner: string;
}

const vendorsList: VendorItem[] = [
  { id: 'VND-01', vendorName: 'Gulf Technology Services', serviceDomain: 'Managed Infrastructure & Cloud Support', contractStatus: 'Active', annualValue: 'SAR 14,200,000', slaPerformance: '98.6%', health: 'Healthy', riskScore: 'Low', contractExpiry: '2027-12-31', openActions: 2, serviceOwner: 'Ahmed Al-Qahtani' },
  { id: 'VND-02', vendorName: 'Riyadh Infrastructure Solutions', serviceDomain: 'Data Center Maintenance & Hardware', contractStatus: 'Active', annualValue: 'SAR 8,500,000', slaPerformance: '97.2%', health: 'Healthy', riskScore: 'Low', contractExpiry: '2026-11-30', openActions: 1, serviceOwner: 'Ahmed Al-Qahtani' },
  { id: 'VND-03', vendorName: 'Enterprise Cloud Partners', serviceDomain: 'GCP & Azure Managed Services', contractStatus: 'Active', annualValue: 'SAR 11,800,000', slaPerformance: '96.8%', health: 'Attention Required', riskScore: 'Medium', contractExpiry: '2026-09-30', openActions: 3, serviceOwner: 'Priya Nair' },
  { id: 'VND-04', vendorName: 'Digital Network Services', serviceDomain: 'WAN Links & SD-WAN Management', contractStatus: 'Active', annualValue: 'SAR 6,400,000', slaPerformance: '95.4%', health: 'Attention Required', riskScore: 'Medium', contractExpiry: '2027-03-31', openActions: 2, serviceOwner: 'Mohammed Al-Dosari' },
  { id: 'VND-05', vendorName: 'SecureOps Arabia', serviceDomain: 'SOC L2/L3 & Threat Intelligence', contractStatus: 'Active', annualValue: 'SAR 9,100,000', slaPerformance: '99.1%', health: 'Healthy', riskScore: 'Low', contractExpiry: '2028-06-30', openActions: 0, serviceOwner: 'Daniel Mathew' },
  { id: 'VND-06', vendorName: 'Application Support Partners', serviceDomain: 'SAP & Custom App Maintenance', contractStatus: 'Active', annualValue: 'SAR 12,600,000', slaPerformance: '97.8%', health: 'Healthy', riskScore: 'Low', contractExpiry: '2027-05-31', openActions: 1, serviceOwner: 'Sara Al-Otaibi' },
  { id: 'VND-07', vendorName: 'Data Platform Services', serviceDomain: 'Oracle RAC & DB Administration', contractStatus: 'Active', annualValue: 'SAR 7,900,000', slaPerformance: '98.2%', health: 'Healthy', riskScore: 'Low', contractExpiry: '2026-12-31', openActions: 1, serviceOwner: 'Omar Al-Mutairi' },
  { id: 'VND-08', vendorName: 'Workplace Technology Solutions', serviceDomain: 'Digital Workplace & Endpoint Services', contractStatus: 'Active', annualValue: 'SAR 5,300,000', slaPerformance: '96.5%', health: 'Healthy', riskScore: 'Low', contractExpiry: '2027-08-31', openActions: 1, serviceOwner: 'Layla Hassan' },
  { id: 'VND-09', vendorName: 'Managed Automation Services', serviceDomain: 'ServiceNow & Ansible Automation', contractStatus: 'Active', annualValue: 'SAR 4,800,000', slaPerformance: '98.9%', health: 'Healthy', riskScore: 'Low', contractExpiry: '2027-10-31', openActions: 0, serviceOwner: 'Arjun Menon' },
  { id: 'VND-10', vendorName: 'Enterprise Integration Services', serviceDomain: 'API Management & ESB Middleware', contractStatus: 'Active', annualValue: 'SAR 6,200,000', slaPerformance: '97.4%', health: 'Healthy', riskScore: 'Low', contractExpiry: '2026-10-31', openActions: 1, serviceOwner: 'Sara Al-Otaibi' },
];

const VendorManagementView: React.FC = () => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVendors = vendorsList.filter(v =>
    v.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.serviceDomain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.serviceOwner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Vendor Governance & SIAM Overview</h1>
            <p className="page-subtitle">Third-Party Managed Services Contracts, Vendor SLA, Risk Scorecards & Escalations</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* KPI Overview (Section 10) */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Vendors Managed</div>
          <div className="kpi-card-value">10</div>
          <div className="kpi-card-trend neutral">SIAM Multi-Vendor Model</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">Avg Vendor SLA</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>97.6%</div>
          <div className="kpi-card-trend up">SLA Target 95.0%</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">Contracts Expiring 2026</div>
          <div className="kpi-card-value" style={{ color: '#E97F0A' }}>3</div>
          <div className="kpi-card-trend neutral">Renewal Process Initiated</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#4AA6DC' }} />
          <div className="kpi-card-label">Total Annual Contract Value</div>
          <div className="kpi-card-value">SAR 86.8M</div>
          <div className="kpi-card-trend neutral">Managed Operational Budget</div>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Managed Vendor Roster (10 Strategic Vendors)</h2>
          <div className="header-search" style={{ width: 280 }}>
            <Search size={16} className="header-search-icon" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Vendor ID</th>
                <th>Vendor Name</th>
                <th style={{ minWidth: 220 }}>Service Domain</th>
                <th>Annual Value</th>
                <th>Vendor SLA</th>
                <th>Risk Level</th>
                <th>Expiry Date</th>
                <th>Open Actions</th>
                <th>Service Owner</th>
                <th>Health Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map((v) => (
                <tr key={v.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{v.id}</td>
                  <td style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{v.vendorName}</td>
                  <td style={{ fontSize: '0.8125rem' }}>{v.serviceDomain}</td>
                  <td style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{v.annualValue}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--status-healthy)', fontWeight: 600 }}>{v.slaPerformance}</td>
                  <td>
                    <span className={`health-badge ${v.riskScore === 'High' ? 'critical' : v.riskScore === 'Medium' ? 'at-risk' : 'healthy'}`}>
                      {v.riskScore} Risk
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{v.contractExpiry}</td>
                  <td style={{ fontSize: '0.75rem', fontWeight: 600 }}>{v.openActions}</td>
                  <td style={{ fontSize: '0.75rem' }}>{v.serviceOwner}</td>
                  <td>
                    <span className={`health-badge ${v.health === 'Healthy' ? 'healthy' : 'at-risk'}`}>
                      {v.health}
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

export default VendorManagementView;
