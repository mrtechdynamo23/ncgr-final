import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

interface ServiceRequest {
  id: string;
  requestedBy: string;
  requestType: string;
  service: string;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  submittedDate: string;
  assignedGroup: string;
  status: 'New' | 'In Progress' | 'Fulfilled' | 'Pending Approval';
  age: string;
}

const serviceRequestsList: ServiceRequest[] = [
  { id: 'REQ-40101', requestedBy: 'Faisal Al-Harbi', requestType: 'PAM Privileged Access Token', service: 'Identity Services', priority: 'P2', submittedDate: '2026-08-12 08:30', assignedGroup: 'Security Operations', status: 'In Progress', age: '3 hrs' },
  { id: 'REQ-40102', requestedBy: 'Aisha Rahman', requestType: 'New Staff Laptop Provisioning', service: 'Digital Workplace', priority: 'P3', submittedDate: '2026-08-12 09:15', assignedGroup: 'Digital Workplace', status: 'In Progress', age: '2 hrs' },
  { id: 'REQ-40103', requestedBy: 'Omar Al-Mutairi', requestType: 'Oracle DB Schema Export Quota', service: 'Database Platform', priority: 'P2', submittedDate: '2026-08-11 14:00', assignedGroup: 'Database Tower', status: 'Pending Approval', age: '21 hrs' },
  { id: 'REQ-40104', requestedBy: 'Sara Al-Otaibi', requestType: 'AppDynamics Agent License', service: 'Monitoring Platform', priority: 'P3', submittedDate: '2026-08-11 11:30', assignedGroup: 'Automation & AI', status: 'Fulfilled', age: '1 day' },
  { id: 'REQ-40105', requestedBy: 'Khalid Al-Shammari', requestType: 'SolarWinds Alert Whitelist', service: 'NOC Observability', priority: 'P3', submittedDate: '2026-08-10 16:45', assignedGroup: 'NOC Tower', status: 'Fulfilled', age: '2 days' },
  { id: 'REQ-40106', requestedBy: 'Priya Nair', requestType: 'GCP Project Quota Increase', service: 'Cloud Platforms', priority: 'P2', submittedDate: '2026-08-10 10:00', assignedGroup: 'Cloud Ops', status: 'In Progress', age: '2 days' },
  { id: 'REQ-40107', requestedBy: 'Daniel Mathew', requestType: 'SSL Certificate Renewal', service: 'NCGR Portal', priority: 'P1', submittedDate: '2026-08-12 07:00', assignedGroup: 'Security Ops', status: 'In Progress', age: '4 hrs' },
  { id: 'REQ-40108', requestedBy: 'Layla Hassan', requestType: 'Teams Phone Extension Allocation', service: 'Collaboration', priority: 'P4', submittedDate: '2026-08-09 13:20', assignedGroup: 'Digital Workplace', status: 'Fulfilled', age: '3 days' },
  { id: 'REQ-40109', requestedBy: 'Arjun Menon', requestType: 'ServiceNow Integration Webhook', service: 'Service Management', priority: 'P2', submittedDate: '2026-08-09 09:00', assignedGroup: 'Service Management', status: 'Fulfilled', age: '3 days' },
  { id: 'REQ-40110', requestedBy: 'Rakesh Kumar', requestType: 'SAN Storage Volume Allocation 2TB', service: 'Infrastructure Platform', priority: 'P2', submittedDate: '2026-08-08 15:30', assignedGroup: 'Infrastructure Tower', status: 'Fulfilled', age: '4 days' },
  { id: 'REQ-40111', requestedBy: 'Huda Al-Salem', requestType: 'CAB Workflow Authorization', service: 'Service Management', priority: 'P3', submittedDate: '2026-08-08 11:00', assignedGroup: 'Service Management', status: 'Fulfilled', age: '4 days' },
  { id: 'REQ-40112', requestedBy: 'Mohammed Al-Dosari', requestType: 'STC SD-WAN Firewall Rule', service: 'Enterprise Network', priority: 'P2', submittedDate: '2026-08-07 14:15', assignedGroup: 'Network Ops', status: 'Fulfilled', age: '5 days' },
  { id: 'REQ-40113', requestedBy: 'Noura Al-Qahtani', requestType: 'PowerBI Executive Workspace', service: 'Reporting Platform', priority: 'P3', submittedDate: '2026-08-06 10:45', assignedGroup: 'Automation & AI', status: 'Fulfilled', age: '6 days' },
  { id: 'REQ-40114', requestedBy: 'Vivek Srinivasan', requestType: 'Anodot Cloud Cost Export Access', service: 'FinOps Platform', priority: 'P3', submittedDate: '2026-08-05 16:00', assignedGroup: 'Cloud Ops', status: 'Fulfilled', age: '7 days' },
  { id: 'REQ-40115', requestedBy: 'Ahmed Al-Qahtani', requestType: 'OpenShift Namespace Quota 50-Pods', service: 'Container Platform', priority: 'P2', submittedDate: '2026-08-05 09:30', assignedGroup: 'Cloud Ops', status: 'Fulfilled', age: '7 days' },
];

const ServiceRequests: React.FC = () => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRequests = serviceRequestsList.filter(r =>
    r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.requestType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Service Request Management</h1>
            <p className="page-subtitle">User Access, Hardware Provisioning, Software Licenses & Cloud Quotas</p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#074A76' }} />
          <div className="kpi-card-label">Total Requests (Month)</div>
          <div className="kpi-card-value">142</div>
          <div className="kpi-card-trend neutral">Avg Fulfillment 4.2 hrs</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#4AA6DC' }} />
          <div className="kpi-card-label">In Progress</div>
          <div className="kpi-card-value" style={{ color: '#4AA6DC' }}>4</div>
          <div className="kpi-card-trend neutral">Active Fulfillment</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#E97F0A' }} />
          <div className="kpi-card-label">Pending Approval</div>
          <div className="kpi-card-value" style={{ color: '#E97F0A' }}>1</div>
          <div className="kpi-card-trend neutral">Approver: Ahmed Al-Qahtani</div>
        </div>
        <div className="kpi-card" style={{ cursor: 'default' }}>
          <div className="kpi-card-accent" style={{ background: '#40904F' }} />
          <div className="kpi-card-label">SLA Compliance</div>
          <div className="kpi-card-value" style={{ color: '#40904F' }}>97.4%</div>
          <div className="kpi-card-trend up">Target 95%</div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Recent Service Requests (15 Records)</h2>
          <div className="header-search" style={{ width: 280 }}>
            <Search size={16} className="header-search-icon" />
            <input
              type="text"
              placeholder="Search service requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Requested By</th>
                <th style={{ minWidth: 200 }}>Request Type</th>
                <th>Target Service</th>
                <th>Priority</th>
                <th>Submitted Date</th>
                <th>Assigned Group</th>
                <th>Status</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ncgr-deep-sky)' }}>{req.id}</td>
                  <td style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{req.requestedBy}</td>
                  <td style={{ fontSize: '0.8125rem' }}>{req.requestType}</td>
                  <td><span className="health-badge healthy" style={{ fontSize: '0.625rem' }}>{req.service}</span></td>
                  <td>
                    <span className={`health-badge ${req.priority === 'P1' ? 'critical' : req.priority === 'P2' ? 'at-risk' : 'healthy'}`}>
                      {req.priority}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{req.submittedDate}</td>
                  <td style={{ fontSize: '0.75rem' }}>{req.assignedGroup}</td>
                  <td>
                    <span className={`health-badge ${req.status === 'Fulfilled' ? 'healthy' : req.status === 'In Progress' ? 'info' : 'at-risk'}`}>
                      {req.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{req.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequests;
