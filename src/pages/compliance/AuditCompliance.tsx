import React, { useState } from 'react';
import { audits, governanceCommitments, getAuditStats, type AuditRecord, type GovernanceCommitment } from '../../data/audits';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import { X } from 'lucide-react';

const AuditCompliance: React.FC = () => {
  const [selectedAudit, setSelectedAudit] = useState<AuditRecord | null>(null);
  const [activeTab, setActiveTab] = useState<'audits' | 'governance'>('audits');
  const stats = getAuditStats();

  const auditColumns: ColumnDef<AuditRecord>[] = [
    {
      header: 'Audit ID',
      accessorKey: 'id',
      width: '100px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Audit Name & Scope',
      accessorKey: 'audit',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.audit}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', marginTop: 2 }}>{row.description}</div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessorKey: 'category',
      cell: (row) => (
        <span style={{ padding: '2px 8px', borderRadius: 4, background: '#E6F4FC', color: '#074A76', fontSize: '0.75rem', fontWeight: 600 }}>
          {row.category}
        </span>
      ),
    },
    {
      header: 'Findings',
      accessorKey: 'numberOfFindings',
      cell: (row) => (
        <span style={{ fontWeight: 800, color: row.numberOfFindings > 6 ? '#DE350B' : '#074A76' }}>
          {row.numberOfFindings} Findings
        </span>
      ),
    },
    {
      header: 'Audit Type',
      accessorKey: 'auditType',
      width: '90px',
      cell: (row) => <span style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{row.auditType}</span>,
    },
    {
      header: 'Audit Owner',
      accessorKey: 'auditOwner',
      cell: (row) => <span style={{ fontWeight: 600 }}>{row.auditOwner}</span>,
    },
    {
      header: 'Due Date',
      accessorKey: 'dueDate',
      cell: (row) => <span style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{row.dueDate}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
        const bg = row.status === 'Completed' ? '#E3FCEF' : row.status === 'In Progress' ? '#E6F4FC' : row.status === 'Overdue' ? '#FFEBE6' : '#FFF7E6';
        const color = row.status === 'Completed' ? '#22A06B' : row.status === 'In Progress' ? '#074A76' : row.status === 'Overdue' ? '#DE350B' : '#E97F0A';
        return (
          <span
            className="status-badge"
            style={{
              background: bg,
              color: color,
            }}
          >
            {row.status}
          </span>
        );
      },
    },
  ];

  const uniqueCategories = Array.from(new Set(audits.map(a => a.category))).map(c => ({ label: c, value: c }));

  const auditFilters: FilterDef<AuditRecord>[] = [
    { key: 'category', label: 'Categories', options: uniqueCategories },
    {
      key: 'auditType',
      label: 'Audit Types',
      options: [
        { label: 'Internal', value: 'Internal' },
        { label: 'External', value: 'External' },
      ],
    },
    {
      key: 'status',
      label: 'Statuses',
      options: [
        { label: 'Completed', value: 'Completed' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Overdue', value: 'Overdue' },
      ],
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 4px' }}>
          Audit & Compliance Governance
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #475467)', margin: 0 }}>
          Tracking 21 statutory and operational audits, finding remediations, and soft-SLA governance commitments
        </p>
      </div>

      {/* KPI Cards Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Audits Monitored</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{stats.total}</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>{stats.closed} Completed</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#074A76', textTransform: 'uppercase' }}>Active In Progress</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 4 }}>{stats.inProgress}</div>
          <div style={{ fontSize: '0.75rem', color: '#074A76', marginTop: 2, fontWeight: 600 }}>Ongoing fieldwork</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ncgr-deep-blue, #074A76)', textTransform: 'uppercase' }}>Total Findings</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{stats.totalFindings}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Logged items</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>Overdue Audits</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{stats.overdue}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', marginTop: 2, fontWeight: 600 }}>Past due date</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 10, borderBottom: '1px solid var(--border, #E4E7EC)', marginBottom: 20 }}>
        <button
          onClick={() => setActiveTab('audits')}
          style={{
            padding: '10px 18px',
            border: 'none',
            background: 'transparent',
            borderBottom: activeTab === 'audits' ? '3px solid var(--ncgr-deep-blue, #074A76)' : '3px solid transparent',
            color: activeTab === 'audits' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--text-secondary, #475467)',
            fontWeight: activeTab === 'audits' ? 800 : 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          Statutory & Technical Audits ({audits.length})
        </button>
        <button
          onClick={() => setActiveTab('governance')}
          style={{
            padding: '10px 18px',
            border: 'none',
            background: 'transparent',
            borderBottom: activeTab === 'governance' ? '3px solid var(--ncgr-deep-blue, #074A76)' : '3px solid transparent',
            color: activeTab === 'governance' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--text-secondary, #475467)',
            fontWeight: activeTab === 'governance' ? 800 : 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          Governance Commitments & Soft-SLAs ({governanceCommitments.length})
        </button>
      </div>

      {/* TAB 1: AUDITS */}
      {activeTab === 'audits' && (
        <DataTable
          data={audits}
          columns={auditColumns}
          filters={auditFilters}
          searchPlaceholder="Search audits by title, description, category, owner..."
          searchKeys={['audit', 'description', 'category', 'auditOwner', 'dataSource', 'id']}
          pageSize={10}
          onRowClick={(row) => setSelectedAudit(row)}
          title="Active Enterprise Audit Register"
          subtitle="Click any audit row to inspect scope, findings, and remediation details"
          exportFilename="ncgr_audits"
        />
      )}

      {/* TAB 2: GOVERNANCE COMMITMENTS */}
      {activeTab === 'governance' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          {governanceCommitments.map((gov: GovernanceCommitment) => (
            <div
              key={gov.id}
              className="card"
              style={{
                padding: 20,
                borderRadius: 12,
                background: 'var(--card-bg, #FFFFFF)',
                border: '1px solid var(--border, #E4E7EC)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
                  {gov.id} • {gov.frequency}
                </span>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: 12,
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    background: gov.complianceStatus === 'Compliant' ? '#E3FCEF' : gov.complianceStatus === 'Partially Compliant' ? '#FFF7E6' : '#FFEBE6',
                    color: gov.complianceStatus === 'Compliant' ? '#22A06B' : gov.complianceStatus === 'Partially Compliant' ? '#E97F0A' : '#DE350B',
                  }}
                >
                  {gov.complianceStatus}
                </span>
              </div>

              <h4 style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
                {gov.commitment}
              </h4>
              <p style={{ margin: '0 0 14px', fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)', lineHeight: 1.4 }}>
                {gov.evidence}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', paddingTop: 10, borderTop: '1px solid var(--border, #E4E7EC)', color: 'var(--text-tertiary, #98A2B3)' }}>
                <span>Owner: <strong>{gov.owner}</strong></span>
                <span>Next Review: <strong>{gov.nextReviewDate}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Audit Detail Modal */}
      {selectedAudit && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 999,
            }}
            onClick={() => setSelectedAudit(null)}
          />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: 640,
              background: 'var(--surface-raised, #FFFFFF)',
              borderRadius: 14,
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              zIndex: 1000,
              padding: 24,
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
                  {selectedAudit.id} • {selectedAudit.auditType} Audit
                </span>
                <h3 style={{ margin: '4px 0 0', fontSize: '1.125rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
                  {selectedAudit.audit}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAudit(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                <X size={20} color="var(--text-tertiary, #98A2B3)" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.875rem' }}>
              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ color: 'var(--text-secondary, #475467)' }}>Audit Scope & Description:</strong>
                <div style={{ marginTop: 4, lineHeight: 1.4 }}>{selectedAudit.description}</div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'rgba(64,144,79,0.08)', border: '1px solid rgba(64,144,79,0.3)' }}>
                <strong style={{ color: '#40904F' }}>Governance Scope & Category:</strong>
                <div style={{ marginTop: 4, color: '#2E6B39', fontWeight: 600 }}>Category: {selectedAudit.category} • Findings: {selectedAudit.numberOfFindings} recorded</div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ color: 'var(--text-secondary, #475467)' }}>Governance Metadata:</strong>
                <div style={{ marginTop: 4 }}>
                  Audited by: <strong>{selectedAudit.auditType} Audit Team</strong> ({selectedAudit.dataSource}) • Audit Owner: <strong>{selectedAudit.auditOwner}</strong>
                  <div style={{ marginTop: 2, fontSize: '0.8125rem', color: 'var(--text-tertiary, #98A2B3)' }}>
                    Target Due Date: {selectedAudit.dueDate} • Status: {selectedAudit.status}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuditCompliance;
