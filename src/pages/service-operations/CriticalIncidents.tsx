import React, { useState, useMemo } from 'react';
import { useDataStore } from '../../data/mockDataStore';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import type { Incident } from '../../data/incidents';
import { X, CheckCircle2, Cpu } from 'lucide-react';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { COMMAND_CENTER_SIBLINGS } from './CommandCenterLandingPage';

const CriticalIncidents: React.FC = () => {
  const { incidents } = useDataStore();
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const criticalList = useMemo(() => incidents.filter(i => i.priority === 'P1' || i.priority === 'P2'), [incidents]);
  const [filteredCriticalList, setFilteredCriticalList] = useState<Incident[]>(criticalList);

  const p1Active = filteredCriticalList.filter(i => i.priority === 'P1' && (i.status === 'Open' || i.status === 'In Progress')).length;
  const p2Active = filteredCriticalList.filter(i => i.priority === 'P2' && (i.status === 'Open' || i.status === 'In Progress')).length;
  const resolvedCount = filteredCriticalList.filter(i => i.status === 'Resolved' || i.status === 'Closed').length;
  const totalCount = filteredCriticalList.length;

  const handleOpenAiBrief = (incident: Incident, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIncident(incident);
  };

  const columns: ColumnDef<Incident>[] = [
    {
      header: 'Incident ID',
      accessorKey: 'id',
      width: '110px',
      cell: (row) => (
        <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', fontFamily: 'monospace' }}>
          {row.id}
        </span>
      ),
    },
    {
      header: 'Severity',
      accessorKey: 'priority',
      width: '80px',
      cell: (row) => (
        <span
          style={{
            padding: '3px 8px',
            borderRadius: 4,
            background: row.priority === 'P1' ? '#FFEBE6' : '#FFF7E6',
            color: row.priority === 'P1' ? '#DE350B' : '#E97F0A',
            fontWeight: 800,
            fontSize: '0.6875rem',
          }}
        >
          {row.priority} {row.priority === 'P1' ? 'CRITICAL' : 'MAJOR'}
        </span>
      ),
    },
    {
      header: 'Incident Title & Impact',
      accessorKey: 'title',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.title}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', fontWeight: 600 }}>{row.businessImpact}</div>
        </div>
      ),
    },
    {
      header: 'Tower',
      accessorKey: 'tower',
      cell: (row) => (
        <span
          style={{
            padding: '2px 8px',
            borderRadius: 4,
            background: 'var(--bg-secondary, #F7F8FA)',
            fontWeight: 600,
            fontSize: '0.75rem',
            border: '1px solid var(--border, #E4E7EC)',
          }}
        >
          {row.tower}
        </span>
      ),
    },
    {
      header: 'Incident Commander',
      accessorKey: 'assignedEngineer',
      cell: (row) => <span style={{ fontWeight: 600 }}>{row.assignedEngineer}</span>,
    },
    {
      header: 'Resolution By',
      accessorKey: 'resolutionBy',
      width: '130px',
      cell: (row) => {
        const isAi = row.resolutionBy === 'AI Assistant';
        if (isAi) {
          return (
            <button
              onClick={(e) => handleOpenAiBrief(row, e)}
              title="Click to view AI Resolution Brief"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px 10px',
                borderRadius: 6,
                background: 'rgba(7, 74, 118, 0.08)',
                color: 'var(--ncgr-deep-blue, #074A76)',
                border: '1px solid rgba(7, 74, 118, 0.22)',
                fontWeight: 700,
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(7, 74, 118, 0.16)';
                e.currentTarget.style.borderColor = 'var(--ncgr-deep-blue, #074A76)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(7, 74, 118, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(7, 74, 118, 0.22)';
              }}
            >
              AI Assistant
            </button>
          );
        }

        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '3px 10px',
              borderRadius: 6,
              background: 'var(--bg-secondary, #F1F5F9)',
              color: 'var(--text-secondary, #475569)',
              border: '1px solid var(--border, #CBD5E1)',
              fontWeight: 600,
              fontSize: '0.75rem',
            }}
          >
            Human
          </span>
        );
      },
    },
    {
      header: 'Duration',
      accessorKey: 'duration',
      cell: (row) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--ncgr-deep-blue, #074A76)' }}>
          {row.duration}
        </span>
      ),
    },
    {
      header: 'RCA Status',
      accessorKey: 'rcaStatus',
      cell: (row) => (
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: row.rcaStatus === 'Completed' ? '#22A06B' : '#E97F0A',
          }}
        >
          {row.rcaStatus || 'Pending'}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
        const bg = row.status === 'Resolved' || row.status === 'Closed' ? '#E3FCEF' : row.status === 'In Progress' ? '#FFEBE6' : '#FFF7E6';
        const color = row.status === 'Resolved' || row.status === 'Closed' ? '#22A06B' : row.status === 'In Progress' ? '#DE350B' : '#E97F0A';
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

  const filters: FilterDef<Incident>[] = useMemo(() => [
    {
      key: 'priority',
      label: 'Severity',
      options: [
        { label: 'P1 Critical', value: 'P1' },
        { label: 'P2 Major', value: 'P2' },
      ],
    },
    {
      key: 'resolutionBy',
      label: 'Resolution By',
      options: [
        { label: 'Human', value: 'Human' },
        { label: 'AI Assistant', value: 'AI Assistant' },
      ],
    },
    {
      key: 'tower',
      label: 'Towers',
      options: Array.from(new Set(criticalList.map((e: Incident) => e.tower))).filter(Boolean).map(t => ({ label: String(t), value: String(t) })),
    },
    {
      key: 'status',
      label: 'Status',
      options: [
        { label: 'Open', value: 'Open' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Resolved', value: 'Resolved' },
        { label: 'Closed', value: 'Closed' },
      ],
    },
  ], [criticalList]);

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      {/* Sub-Page Header with Breadcrumb and Sibling Navigation */}
      <SubPageHeader
        moduleTitle="Command Center"
        modulePath="/command-center"
        pageTitle="Critical Incidents"
        siblingPages={COMMAND_CENTER_SIBLINGS}
      />

      {/* KPI Overview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Critical Incidents Log</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 4 }}>{totalCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>P1 Critical + P2 Major</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>Active P1 Critical</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 4 }}>{p1Active}</div>
          <div style={{ fontSize: '0.75rem', color: '#DE350B', marginTop: 2, fontWeight: 600 }}>Emergency war rooms</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E97F0A', textTransform: 'uppercase' }}>Active P2 Major</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E97F0A', marginTop: 4 }}>{p2Active}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>Under investigation</div>
        </div>

        <div className="card" style={{ padding: 16, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>Restored / Recovered</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 4 }}>{resolvedCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#22A06B', marginTop: 2, fontWeight: 600 }}>RCA phase underway</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={criticalList}
        columns={columns}
        filters={filters}
        onFilteredDataChange={setFilteredCriticalList}
        searchPlaceholder="Search critical incidents by ID, title, commander, CI..."
        searchKeys={['id', 'title', 'description', 'assignedEngineer', 'owner', 'relatedCI', 'service', 'tower', 'resolutionBy']}
        pageSize={15}
        onRowClick={(row) => setSelectedIncident(row)}
        title="Critical & Major Incidents Log (P1/P2)"
        subtitle="Authoritative log of severity 1 and severity 2 operational disruptions"
        exportFilename="ncgr_critical_incidents"
      />

      {/* Incident Detail Drawer */}
      {selectedIncident && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10, 22, 40, 0.45)',
              backdropFilter: 'blur(3px)',
              zIndex: 1000,
            }}
            onClick={() => setSelectedIncident(null)}
          />
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 560,
              maxWidth: '92vw',
              background: 'var(--surface-raised, #FFFFFF)',
              boxShadow: '-8px 0 30px rgba(0, 0, 0, 0.15)',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              padding: 24,
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    background: selectedIncident.priority === 'P1' ? '#FFEBE6' : '#FFF7E6',
                    color: selectedIncident.priority === 'P1' ? '#DE350B' : '#E97F0A',
                  }}
                >
                  {selectedIncident.priority} CRITICAL
                </span>
                <span style={{ fontSize: '0.8125rem', fontFamily: 'monospace', fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)' }}>
                  {selectedIncident.id}
                </span>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    background: selectedIncident.resolutionBy === 'AI Assistant' ? 'rgba(7, 74, 118, 0.1)' : 'var(--bg-secondary, #F1F5F9)',
                    color: selectedIncident.resolutionBy === 'AI Assistant' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--text-secondary, #475569)',
                    border: `1px solid ${selectedIncident.resolutionBy === 'AI Assistant' ? 'rgba(7, 74, 118, 0.25)' : 'var(--border, #CBD5E1)'}`,
                  }}
                >
                  Resolution: {selectedIncident.resolutionBy}
                </span>
              </div>
              <button
                onClick={() => setSelectedIncident(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                aria-label="Close critical incident drawer"
              >
                <X size={20} color="var(--text-tertiary, #98A2B3)" />
              </button>
            </div>

            <h3 style={{ margin: '0 0 8px', fontSize: '1.125rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
              {selectedIncident.title}
            </h3>

            <p style={{ margin: '0 0 16px', fontSize: '0.875rem', color: 'var(--text-secondary, #475467)', lineHeight: 1.5 }}>
              {selectedIncident.description}
            </p>

            {/* AI Resolution Brief Section */}
            {selectedIncident.resolutionBy === 'AI Assistant' && selectedIncident.aiResolutionBrief && (
              <div
                style={{
                  margin: '0 0 20px',
                  padding: 16,
                  borderRadius: 10,
                  background: 'linear-gradient(180deg, rgba(7, 74, 118, 0.04) 0%, rgba(7, 74, 118, 0.01) 100%)',
                  border: '1px solid rgba(7, 74, 118, 0.2)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Cpu size={16} color="var(--ncgr-deep-blue, #074A76)" />
                    <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      AI Resolution Brief
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: 'rgba(7, 74, 118, 0.12)',
                      color: 'var(--ncgr-deep-blue, #074A76)',
                    }}
                  >
                    Sovereign AI
                  </span>
                </div>

                {/* Structured Key Fields */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8, marginBottom: 12 }}>
                  <div style={{ padding: 10, borderRadius: 6, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 700 }}>Resolution Method</div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginTop: 2 }}>
                      {selectedIncident.aiResolutionBrief.resolutionMethod}
                    </div>
                  </div>

                  <div style={{ padding: 10, borderRadius: 6, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 700 }}>AI Capability</div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 2 }}>
                      {selectedIncident.aiResolutionBrief.aiCapability}
                    </div>
                  </div>

                  <div style={{ padding: 10, borderRadius: 6, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 700 }}>AI Foundation</div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginTop: 2 }}>
                      {selectedIncident.aiResolutionBrief.aiFoundation}
                    </div>
                  </div>

                  <div style={{ padding: 10, borderRadius: 6, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)' }}>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 700 }}>Human Validation</div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#22A06B', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <CheckCircle2 size={14} color="#22A06B" />
                      {selectedIncident.aiResolutionBrief.humanValidation}
                    </div>
                  </div>
                </div>

                {/* What AI Identified */}
                <div style={{ padding: 10, borderRadius: 6, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', marginBottom: 10 }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 700 }}>What AI Identified</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text, #101828)', lineHeight: 1.45, marginTop: 4 }}>
                    {selectedIncident.aiResolutionBrief.whatAiIdentified}
                  </div>
                </div>

                {/* Evidence Used */}
                <div style={{ padding: 10, borderRadius: 6, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', marginBottom: 10 }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Evidence Used</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {selectedIncident.aiResolutionBrief.evidenceUsed.map((ev, i) => (
                      <div key={i} style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                        <span style={{ color: 'var(--ncgr-deep-blue, #074A76)', fontWeight: 700 }}>•</span>
                        <span>{ev}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Contribution */}
                <div style={{ padding: 10, borderRadius: 6, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', marginBottom: 10 }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 700 }}>AI Contribution</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text, #101828)', lineHeight: 1.45, marginTop: 4 }}>
                    {selectedIncident.aiResolutionBrief.aiContribution}
                  </div>
                </div>

                {/* Resolution Outcome */}
                <div style={{ padding: 10, borderRadius: 6, background: 'rgba(34, 160, 107, 0.08)', border: '1px solid rgba(34, 160, 107, 0.25)' }}>
                  <div style={{ fontSize: '0.6875rem', color: '#22A06B', textTransform: 'uppercase', fontWeight: 700 }}>Resolution Outcome</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text, #101828)', lineHeight: 1.45, marginTop: 4 }}>
                    {selectedIncident.aiResolutionBrief.resolutionOutcome}
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              <div style={{ padding: 12, borderRadius: 8, background: '#FFEBE6', border: '1px solid rgba(222,53,11,0.2)' }}>
                <strong style={{ fontSize: '0.75rem', color: '#DE350B', textTransform: 'uppercase' }}>Business Impact Statement</strong>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#DE350B', marginTop: 2 }}>{selectedIncident.businessImpact}</div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase' }}>Incident Commander & Tower</strong>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text, #101828)', marginTop: 2 }}>
                  {selectedIncident.assignedEngineer} • {selectedIncident.tower} ({selectedIncident.assignmentGroup})
                </div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase' }}>Affected Service & CI</strong>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text, #101828)', marginTop: 2 }}>
                  {selectedIncident.service} • CI: {selectedIncident.relatedCI}
                </div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase' }}>Duration & Timestamps</strong>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)', marginTop: 2 }}>
                  Opened: {selectedIncident.createdDate} • Outage Elapsed: <strong>{selectedIncident.duration}</strong>
                </div>
              </div>

              <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)' }}>
                <strong style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase' }}>RCA Governance State</strong>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#40904F', marginTop: 2 }}>
                  {selectedIncident.rcaStatus || 'In Progress'} — Target: 5 business days from resolution
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CriticalIncidents;
