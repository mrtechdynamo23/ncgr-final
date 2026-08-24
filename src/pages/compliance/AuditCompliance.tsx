import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  audits, governanceCommitments, getAuditStats, upcomingAudits,
  auditFindings, getFindingsForAudit,
  type AuditRecord, type GovernanceCommitment, type UpcomingAudit
} from '../../data/audits';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import { X, Eye, Search } from 'lucide-react';

const AuditCompliance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'audits' | 'upcoming' | 'governance'>('audits');
  const [selectedAuditForScope, setSelectedAuditForScope] = useState<AuditRecord | null>(null);
  const [selectedAuditForFindings, setSelectedAuditForFindings] = useState<AuditRecord | null>(null);
  const [showAllFindingsModal, setShowAllFindingsModal] = useState<boolean>(false);
  const [findingSearchQuery, setFindingSearchQuery] = useState<string>('');

  const stats = getAuditStats();

  // ─── AUDIT COLUMNS ──────────────────────────────────────────
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
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedAuditForFindings(row);
            setFindingSearchQuery('');
          }}
          style={{
            background: row.numberOfFindings > 6 ? 'rgba(222, 53, 11, 0.1)' : 'rgba(7, 74, 118, 0.08)',
            border: `1px solid ${row.numberOfFindings > 6 ? 'rgba(222, 53, 11, 0.3)' : 'rgba(7, 74, 118, 0.2)'}`,
            borderRadius: 6,
            padding: '4px 10px',
            color: row.numberOfFindings > 6 ? '#DE350B' : '#074A76',
            fontWeight: 800,
            fontSize: '0.75rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            transition: 'all var(--duration-fast, 200ms) var(--ease-out-expo)',
          }}
          title={`Click to view ${row.numberOfFindings} itemized findings for ${row.id}`}
        >
          <Eye size={13} />
          <span>{row.numberOfFindings} Findings</span>
        </button>
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

  // ─── UPCOMING AUDITS COLUMNS ────────────────────────────────
  const upcomingColumns: ColumnDef<UpcomingAudit>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      width: '90px',
      cell: (row) => (
        <span style={{ fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace', fontSize: '0.8125rem' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Audit Name',
      accessorKey: 'auditName',
      cell: (row) => <span style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.auditName}</span>,
    },
    {
      header: 'Audit Type',
      accessorKey: 'auditType',
      width: '100px',
      cell: (row) => (
        <span style={{ padding: '2px 8px', borderRadius: 4, background: row.auditType === 'External' ? 'rgba(103, 30, 117, 0.1)' : 'rgba(7, 74, 118, 0.08)', color: row.auditType === 'External' ? '#671E75' : '#074A76', fontWeight: 600, fontSize: '0.75rem' }}>
          {row.auditType}
        </span>
      ),
    },
    {
      header: 'Tower / Domain',
      accessorKey: 'towerDomain',
      cell: (row) => <span style={{ fontWeight: 600 }}>{row.towerDomain}</span>,
    },
    {
      header: 'Assigned Owner',
      accessorKey: 'assignedOwner',
      cell: (row) => <span style={{ fontWeight: 600 }}>{row.assignedOwner}</span>,
    },
    {
      header: 'Planned Start',
      accessorKey: 'plannedDate',
      cell: (row) => <span style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{row.plannedDate}</span>,
    },
    {
      header: 'Target Deadline',
      accessorKey: 'deadline',
      cell: (row) => <span style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{row.deadline}</span>,
    },
    {
      header: 'Priority',
      accessorKey: 'priority',
      width: '90px',
      cell: (row) => {
        const isCrit = row.priority === 'Critical';
        const isHigh = row.priority === 'High';
        return (
          <span style={{ fontWeight: 800, fontSize: '0.75rem', color: isCrit ? '#DE350B' : isHigh ? '#E97F0A' : '#074A76' }}>
            {row.priority}
          </span>
        );
      },
    },
    {
      header: 'Status',
      accessorKey: 'status',
      width: '110px',
      cell: (row) => {
        const isReady = row.status === 'Ready';
        const isPrep = row.status === 'Preparation';
        const isAtRisk = row.status === 'At Risk';
        return (
          <span
            style={{
              padding: '3px 8px',
              borderRadius: 12,
              fontSize: '0.75rem',
              fontWeight: 700,
              background: isReady ? '#E3FCEF' : isAtRisk ? '#FFEBE6' : isPrep ? '#FFF7E6' : '#E6F4FC',
              color: isReady ? '#22A06B' : isAtRisk ? '#DE350B' : isPrep ? '#E97F0A' : '#074A76',
            }}
          >
            {row.status}
          </span>
        );
      },
    },
  ];

  // Current findings for selected audit modal
  const currentModalFindings = selectedAuditForFindings
    ? getFindingsForAudit(selectedAuditForFindings.id).filter(f => {
        if (!findingSearchQuery) return true;
        const q = findingSearchQuery.toLowerCase();
        return (
          f.findingId.toLowerCase().includes(q) ||
          f.finding.toLowerCase().includes(q) ||
          f.owner.toLowerCase().includes(q) ||
          f.status.toLowerCase().includes(q) ||
          f.severity.toLowerCase().includes(q) ||
          f.remarks.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 4px' }}>
          Audit & Compliance Governance
        </h1>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)', margin: 0 }}>
          Statutory audit tracking, itemized findings register, scheduled reviews, and formal compliance commitments
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
        <div
          className="card"
          style={{
            padding: 16,
            borderRadius: 10,
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
            borderTop: '3px solid #22A06B',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Total Audits Completed</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>
            {stats.closed}/{stats.total} ({stats.total > 0 ? Math.round((stats.closed / stats.total) * 100) : 0}%)
          </div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>Formal sign-off achieved</div>
        </div>

        <div
          className="card"
          style={{
            padding: 16,
            borderRadius: 10,
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
            borderTop: '3px solid #074A76',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#074A76', textTransform: 'uppercase' }}>Active In Progress</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 4 }}>{stats.inProgress}</div>
          <div style={{ fontSize: '0.75rem', color: '#074A76', marginTop: 2, fontWeight: 600 }}>Ongoing fieldwork</div>
        </div>

        {/* Tracked Findings KPI Card — Click opens Findings box inside page */}
        <div
          className="card"
          onClick={() => setShowAllFindingsModal(true)}
          style={{
            padding: 16,
            borderRadius: 10,
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
            borderTop: '3px solid #074A76',
            cursor: 'pointer',
            transition: 'all var(--duration-fast, 200ms) var(--ease-out-expo)',
          }}
          title="Click to inspect all itemized findings"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Tracked Findings</span>
            <Eye size={14} color="var(--ncgr-deep-blue, #074A76)" />
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{stats.totalFindings}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 2, fontWeight: 600 }}>
            Click to inspect all {stats.totalFindings} findings →
          </div>
        </div>

        <div
          className="card"
          onClick={() => setActiveTab('upcoming')}
          style={{
            padding: 16,
            borderRadius: 10,
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
            borderTop: '3px solid #4AA6DC',
            cursor: 'pointer',
          }}
          title="Click to view Upcoming Audits Schedule"
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Upcoming Audits</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 4 }}>{upcomingAudits.length}</div>
          <div style={{ fontSize: '0.75rem', color: '#074A76', marginTop: 2, fontWeight: 600 }}>Scheduled Q3/Q4</div>
        </div>

        <div
          className="card"
          style={{
            padding: 16,
            borderRadius: 10,
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
            borderTop: '3px solid #DE350B',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>Overdue Audits</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{stats.overdue}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', marginTop: 2, fontWeight: 600 }}>Past target due date</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, borderBottom: '1px solid var(--border, #E4E7EC)', marginBottom: 20, overflowX: 'auto' }}>
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
            whiteSpace: 'nowrap',
            transition: 'all var(--duration-fast, 200ms) var(--ease-out-expo)',
          }}
        >
          Statutory & Technical Audits ({audits.length})
        </button>

        <button
          onClick={() => setActiveTab('upcoming')}
          style={{
            padding: '10px 18px',
            border: 'none',
            background: 'transparent',
            borderBottom: activeTab === 'upcoming' ? '3px solid var(--ncgr-deep-blue, #074A76)' : '3px solid transparent',
            color: activeTab === 'upcoming' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--text-secondary, #475467)',
            fontWeight: activeTab === 'upcoming' ? 800 : 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all var(--duration-fast, 200ms) var(--ease-out-expo)',
          }}
        >
          Upcoming Audits ({upcomingAudits.length})
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
            whiteSpace: 'nowrap',
            transition: 'all var(--duration-fast, 200ms) var(--ease-out-expo)',
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
          onRowClick={(row) => setSelectedAuditForScope(row)}
          title="Active Enterprise Audit Register"
          subtitle="Click any audit row to view scope details, or click 'Findings' to view itemized findings box"
          exportFilename="ncgr_audits"
        />
      )}

      {/* TAB 2: UPCOMING AUDITS */}
      {activeTab === 'upcoming' && (
        <DataTable
          data={upcomingAudits}
          columns={upcomingColumns}
          searchPlaceholder="Search upcoming audits by name, owner, domain..."
          searchKeys={['auditName', 'assignedOwner', 'towerDomain', 'auditType', 'priority', 'status']}
          pageSize={10}
          title="Planned & Upcoming Enterprise Audit Schedule"
          subtitle="Forward-looking statutory and operational compliance roadmap for Q3 and Q4"
          exportFilename="ncgr_upcoming_audits"
        />
      )}

      {/* TAB 3: GOVERNANCE COMMITMENTS */}
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

      {/* ─── 1. CENTERED AUDIT FINDINGS MODAL BOX (PORTAL) ────────── */}
      {selectedAuditForFindings && createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 22, 40, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box',
          }}
          onClick={() => setSelectedAuditForFindings(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 960,
              maxHeight: '90vh',
              background: 'var(--surface-raised, #FFFFFF)',
              borderRadius: 16,
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid var(--border, #E4E7EC)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '20px 24px',
                background: 'linear-gradient(135deg, #074A76 0%, #05263F 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      fontSize: '0.8125rem',
                      background: 'rgba(255,255,255,0.18)',
                      padding: '2px 8px',
                      borderRadius: 4,
                      color: '#FFFFFF',
                    }}
                  >
                    {selectedAuditForFindings.id}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      padding: '2px 8px',
                      borderRadius: 10,
                      background: 'rgba(64, 144, 79, 0.3)',
                      color: '#FFFFFF',
                      fontWeight: 700,
                    }}
                  >
                    {selectedAuditForFindings.category}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      padding: '2px 8px',
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.15)',
                      color: '#FFFFFF',
                      fontWeight: 600,
                    }}
                  >
                    {selectedAuditForFindings.auditType} Audit
                  </span>
                </div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.3 }}>
                  Itemized Findings: {selectedAuditForFindings.audit}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAuditForFindings(null)}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: 34,
                  height: 34,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
                title="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body: Search + Findings List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
              {/* Scope summary note */}
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: 8,
                  background: 'var(--bg-secondary, #F8FAFC)',
                  border: '1px solid var(--border, #E4E7EC)',
                  marginBottom: 16,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)' }}>
                  Audit Owner: <strong style={{ color: 'var(--text, #101828)' }}>{selectedAuditForFindings.auditOwner}</strong> • Target Date: <strong style={{ color: 'var(--text, #101828)' }}>{selectedAuditForFindings.dueDate}</strong> • Status: <strong style={{ color: 'var(--text, #101828)' }}>{selectedAuditForFindings.status}</strong>
                </div>

                {/* Quick Search */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, position: 'relative' }}>
                  <Search size={14} color="var(--text-tertiary, #98A2B3)" style={{ position: 'absolute', left: 10 }} />
                  <input
                    type="text"
                    value={findingSearchQuery}
                    onChange={(e) => setFindingSearchQuery(e.target.value)}
                    placeholder="Search findings in this audit..."
                    style={{
                      padding: '6px 10px 6px 30px',
                      borderRadius: 6,
                      border: '1px solid var(--border, #E4E7EC)',
                      fontSize: '0.75rem',
                      background: 'var(--card-bg, #FFFFFF)',
                      color: 'var(--text, #101828)',
                      outline: 'none',
                      width: 220,
                    }}
                  />
                </div>
              </div>

              {/* Itemized Findings Table */}
              <div style={{ border: '1px solid var(--border, #E4E7EC)', borderRadius: 8, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-secondary, #F1F5F9)', borderBottom: '1px solid var(--border, #E4E7EC)' }}>
                      <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 90 }}>ID</th>
                      <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>Finding Description</th>
                      <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 90 }}>Severity</th>
                      <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 120 }}>Owner</th>
                      <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 95 }}>Target Due</th>
                      <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 100 }}>Status</th>
                      <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>Remediation Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentModalFindings.length > 0 ? (
                      currentModalFindings.map((f, i) => {
                        const isCrit = f.severity === 'Critical';
                        const isHigh = f.severity === 'High';
                        const isDone = f.status === 'Remediated';
                        const isInProg = f.status === 'In Progress';
                        const isOpen = f.status === 'Open';

                        return (
                          <tr
                            key={f.findingId}
                            style={{
                              borderBottom: i === currentModalFindings.length - 1 ? 'none' : '1px solid var(--border, #E4E7EC)',
                              background: i % 2 === 0 ? 'var(--card-bg, #FFFFFF)' : 'var(--bg-secondary, #FAFAFA)',
                            }}
                          >
                            <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)' }}>
                              {f.findingId}
                            </td>
                            <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--text, #101828)' }}>
                              {f.finding}
                            </td>
                            <td style={{ padding: '10px 12px' }}>
                              <span
                                style={{
                                  padding: '2px 8px',
                                  borderRadius: 6,
                                  fontSize: '0.6875rem',
                                  fontWeight: 800,
                                  background: isCrit ? '#FFEBE6' : isHigh ? '#FFF7E6' : '#E6F4FC',
                                  color: isCrit ? '#DE350B' : isHigh ? '#E97F0A' : '#074A76',
                                }}
                              >
                                {f.severity}
                              </span>
                            </td>
                            <td style={{ padding: '10px 12px', fontWeight: 500, color: 'var(--text, #101828)' }}>
                              {f.owner}
                            </td>
                            <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                              {f.dueDate}
                            </td>
                            <td style={{ padding: '10px 12px' }}>
                              <span
                                style={{
                                  padding: '2px 8px',
                                  borderRadius: 10,
                                  fontSize: '0.6875rem',
                                  fontWeight: 700,
                                  background: isDone ? '#E3FCEF' : isInProg ? '#E6F4FC' : isOpen ? '#FFEBE6' : '#F3E8FF',
                                  color: isDone ? '#22A06B' : isInProg ? '#074A76' : isOpen ? '#DE350B' : '#671E75',
                                }}
                              >
                                {f.status}
                              </span>
                            </td>
                            <td style={{ padding: '10px 12px', fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                              {f.remarks}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={7} style={{ padding: 24, textAlign: 'center', color: 'var(--text-tertiary, #98A2B3)' }}>
                          No findings match your search filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '14px 24px',
                borderTop: '1px solid var(--border, #E4E7EC)',
                background: 'var(--bg-secondary, #F8FAFC)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', fontWeight: 600 }}>
                Showing {currentModalFindings.length} of {selectedAuditForFindings.numberOfFindings} itemized findings recorded
              </div>
              <button
                onClick={() => setSelectedAuditForFindings(null)}
                style={{
                  padding: '7px 18px',
                  borderRadius: 6,
                  background: 'var(--ncgr-deep-blue, #074A76)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ─── 2. CENTERED AUDIT SCOPE DETAIL MODAL BOX (PORTAL) ───── */}
      {selectedAuditForScope && createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 22, 40, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box',
          }}
          onClick={() => setSelectedAuditForScope(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 680,
              maxHeight: '90vh',
              background: 'var(--surface-raised, #FFFFFF)',
              borderRadius: 16,
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid var(--border, #E4E7EC)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid var(--border, #E4E7EC)',
                background: 'var(--card-bg, #FFFFFF)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 16,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: 6,
                      background: 'var(--bg-secondary, #F1F5F9)',
                      color: 'var(--ncgr-deep-blue, #074A76)',
                      border: '1px solid var(--border, #E4E7EC)',
                    }}
                  >
                    {selectedAuditForScope.id}
                  </span>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 6,
                      background: '#E6F4FC',
                      color: '#074A76',
                    }}
                  >
                    {selectedAuditForScope.category}
                  </span>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 6,
                      background: selectedAuditForScope.status === 'Completed' ? '#E3FCEF' : '#FFF7E6',
                      color: selectedAuditForScope.status === 'Completed' ? '#22A06B' : '#E97F0A',
                    }}
                  >
                    {selectedAuditForScope.status}
                  </span>
                </div>
                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
                  {selectedAuditForScope.audit}
                </h2>
              </div>
              <button
                onClick={() => setSelectedAuditForScope(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-tertiary, #98A2B3)',
                  cursor: 'pointer',
                  padding: 6,
                  borderRadius: 6,
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ padding: 14, borderRadius: 8, background: 'var(--bg-secondary, #F8FAFC)', border: '1px solid var(--border, #E4E7EC)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase', marginBottom: 4 }}>
                  Audit Scope & Description
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text, #101828)', lineHeight: 1.5 }}>
                  {selectedAuditForScope.description}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                <div style={{ padding: 12, borderRadius: 8, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', fontWeight: 600 }}>AUDIT OWNER</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)', marginTop: 2 }}>{selectedAuditForScope.auditOwner}</div>
                </div>

                <div style={{ padding: 12, borderRadius: 8, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', fontWeight: 600 }}>AUDIT TYPE</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)', marginTop: 2 }}>{selectedAuditForScope.auditType} Audit</div>
                </div>

                <div style={{ padding: 12, borderRadius: 8, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', fontWeight: 600 }}>TARGET DUE DATE</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: 'monospace', color: 'var(--text, #101828)', marginTop: 2 }}>{selectedAuditForScope.dueDate}</div>
                </div>

                <div style={{ padding: 12, borderRadius: 8, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', fontWeight: 600 }}>DATA PLATFORM SOURCE</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)', marginTop: 2 }}>{selectedAuditForScope.dataSource}</div>
                </div>
              </div>

              {/* Action Button: View Itemized Findings */}
              <div style={{ padding: 16, borderRadius: 10, background: 'rgba(7, 74, 118, 0.05)', border: '1px solid rgba(7, 74, 118, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)' }}>
                    {selectedAuditForScope.numberOfFindings} Itemized Findings
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', marginTop: 2 }}>
                    Click below to open the itemized findings box
                  </div>
                </div>
                <button
                  onClick={() => {
                    const audit = selectedAuditForScope;
                    setSelectedAuditForScope(null);
                    setSelectedAuditForFindings(audit);
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 6,
                    background: 'var(--ncgr-deep-blue, #074A76)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <Eye size={14} />
                  <span>Inspect Findings</span>
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ─── 3. ALL TRACKED FINDINGS MASTER MODAL (PORTAL) ────────── */}
      {showAllFindingsModal && createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 22, 40, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box',
          }}
          onClick={() => setShowAllFindingsModal(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 1080,
              maxHeight: '90vh',
              background: 'var(--surface-raised, #FFFFFF)',
              borderRadius: 16,
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid var(--border, #E4E7EC)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '20px 24px',
                background: 'linear-gradient(135deg, #074A76 0%, #05263F 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    borderRadius: 10,
                    background: 'rgba(64, 144, 79, 0.3)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                  }}
                >
                  Master Audit Repository
                </span>
                <h3 style={{ margin: '4px 0 0', fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                  All Tracked Audit Findings ({auditFindings.length} Items)
                </h3>
              </div>
              <button
                onClick={() => setShowAllFindingsModal(false)}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: 34,
                  height: 34,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body DataTable */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
              <DataTable
                data={auditFindings}
                columns={[
                  {
                    header: 'Finding ID',
                    accessorKey: 'findingId',
                    width: '90px',
                    cell: (row) => <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)' }}>{row.findingId}</span>,
                  },
                  {
                    header: 'Audit ID',
                    accessorKey: 'auditId',
                    width: '95px',
                    cell: (row) => <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)' }}>{row.auditId}</span>,
                  },
                  {
                    header: 'Finding Description',
                    accessorKey: 'finding',
                    cell: (row) => <span style={{ fontWeight: 600, color: 'var(--text, #101828)' }}>{row.finding}</span>,
                  },
                  {
                    header: 'Severity',
                    accessorKey: 'severity',
                    width: '95px',
                    cell: (row) => {
                      const isCrit = row.severity === 'Critical';
                      const isHigh = row.severity === 'High';
                      return (
                        <span
                          style={{
                            padding: '2px 8px',
                            borderRadius: 6,
                            fontSize: '0.6875rem',
                            fontWeight: 800,
                            background: isCrit ? '#FFEBE6' : isHigh ? '#FFF7E6' : '#E6F4FC',
                            color: isCrit ? '#DE350B' : isHigh ? '#E97F0A' : '#074A76',
                          }}
                        >
                          {row.severity}
                        </span>
                      );
                    },
                  },
                  {
                    header: 'Owner',
                    accessorKey: 'owner',
                    cell: (row) => <span style={{ fontWeight: 600 }}>{row.owner}</span>,
                  },
                  {
                    header: 'Due Date',
                    accessorKey: 'dueDate',
                    cell: (row) => <span style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{row.dueDate}</span>,
                  },
                  {
                    header: 'Status',
                    accessorKey: 'status',
                    width: '105px',
                    cell: (row) => {
                      const isDone = row.status === 'Remediated';
                      const isInProg = row.status === 'In Progress';
                      return (
                        <span
                          style={{
                            padding: '2px 8px',
                            borderRadius: 10,
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            background: isDone ? '#E3FCEF' : isInProg ? '#E6F4FC' : '#FFEBE6',
                            color: isDone ? '#22A06B' : isInProg ? '#074A76' : '#DE350B',
                          }}
                        >
                          {row.status}
                        </span>
                      );
                    },
                  },
                ]}
                searchPlaceholder="Search all 114 findings by ID, description, owner, audit ID..."
                searchKeys={['finding', 'owner', 'severity', 'status', 'findingId', 'auditId', 'remarks']}
                pageSize={8}
                exportFilename="all_audit_findings"
              />
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '14px 24px',
                borderTop: '1px solid var(--border, #E4E7EC)',
                background: 'var(--bg-secondary, #F8FAFC)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                flexShrink: 0,
              }}
            >
              <button
                onClick={() => setShowAllFindingsModal(false)}
                style={{
                  padding: '7px 18px',
                  borderRadius: 6,
                  background: 'var(--ncgr-deep-blue, #074A76)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default AuditCompliance;

