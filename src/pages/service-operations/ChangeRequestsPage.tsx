import React, { useState, useMemo } from 'react';
import SubPageHeader from '../../components/navigation/SubPageHeader';
import { COMMAND_CENTER_SIBLINGS } from './CommandCenterLandingPage';
import { appChangesList, type AppChangeRecord } from '../../data/master-applications';
import DataTable, { type ColumnDef, type FilterDef } from '../../components/common/DataTable';
import {
  Flame, ShieldAlert, X, ExternalLink
} from 'lucide-react';

const ChangeRequestsPage: React.FC = () => {
  const [selectedChange, setSelectedChange] = useState<AppChangeRecord | null>(null);
  const [filteredChanges, setFilteredChanges] = useState<AppChangeRecord[]>(appChangesList);

  const totalChanges = filteredChanges.length;
  const approvedChanges = filteredChanges.filter(c => c.approvalStatus === 'Approved' || c.status === 'CAB Approved').length;
  const emergencyChanges = filteredChanges.filter(c => c.changeType === 'Emergency').length;
  const scheduledChanges = filteredChanges.filter(c => c.status === 'Scheduled' || c.status === 'Planned').length;
  const completedChanges = filteredChanges.filter(c => c.status === 'Completed').length;

  const columns: ColumnDef<AppChangeRecord>[] = [
    {
      header: 'Change #',
      accessorKey: 'changeNumber',
      width: '120px',
      cell: (row) => (
        <span
          style={{
            fontFamily: 'monospace',
            fontWeight: 800,
            color: 'var(--ncgr-deep-blue, #074A76)',
            fontSize: '0.8125rem',
          }}
        >
          {row.changeNumber}
        </span>
      ),
    },
    {
      header: 'Application & Tower',
      accessorKey: 'appName',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text, #101828)' }}>{row.appName}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
            Tower: <span style={{ fontWeight: 600 }}>{row.tower}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Description',
      accessorKey: 'description',
      cell: (row) => (
        <div style={{ maxWidth: 300, fontSize: '0.8125rem', color: 'var(--text, #101828)' }}>
          {row.description}
        </div>
      ),
    },
    {
      header: 'Type',
      accessorKey: 'changeType',
      width: '110px',
      cell: (row) => {
        const isEmergency = row.changeType === 'Emergency';
        const isStandard = row.changeType === 'Standard';
        return (
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 6,
              fontSize: '0.75rem',
              fontWeight: 700,
              background: isEmergency ? 'rgba(222, 53, 11, 0.1)' : isStandard ? 'rgba(64, 144, 79, 0.1)' : 'rgba(7, 74, 118, 0.08)',
              color: isEmergency ? '#DE350B' : isStandard ? '#40904F' : '#074A76',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {isEmergency && <Flame size={12} />}
            {row.changeType}
          </span>
        );
      },
    },
    {
      header: 'Priority',
      accessorKey: 'priority',
      width: '80px',
      cell: (row) => {
        const isP1 = row.priority === 'P1';
        const isP2 = row.priority === 'P2';
        return (
          <span
            style={{
              fontWeight: 800,
              fontSize: '0.75rem',
              color: isP1 ? '#DE350B' : isP2 ? '#E97F0A' : 'var(--text-secondary, #475467)',
            }}
          >
            {row.priority}
          </span>
        );
      },
    },
    {
      header: 'Risk',
      accessorKey: 'risk',
      width: '90px',
      cell: (row) => {
        const isHigh = row.risk === 'High';
        const isMed = row.risk === 'Medium';
        return (
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: isHigh ? '#DE350B' : isMed ? '#E97F0A' : '#40904F',
            }}
          >
            {row.risk}
          </span>
        );
      },
    },
    {
      header: 'Approval',
      accessorKey: 'approvalStatus',
      width: '110px',
      cell: (row) => {
        const isApproved = row.approvalStatus === 'Approved';
        const isReview = row.approvalStatus === 'CAB Review';
        return (
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 10,
              fontSize: '0.6875rem',
              fontWeight: 700,
              background: isApproved ? 'rgba(64, 144, 79, 0.12)' : isReview ? 'rgba(233, 127, 10, 0.12)' : 'rgba(103, 30, 117, 0.12)',
              color: isApproved ? '#22A06B' : isReview ? '#E97F0A' : '#671E75',
            }}
          >
            {row.approvalStatus}
          </span>
        );
      },
    },
    {
      header: 'Scheduled Date',
      accessorKey: 'scheduledDate',
      width: '140px',
      cell: (row) => (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
          {row.scheduledDate}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      width: '110px',
      cell: (row) => {
        const isDone = row.status === 'Completed';
        const isSched = row.status === 'Scheduled' || row.status === 'CAB Approved';
        return (
          <span
            style={{
              padding: '3px 8px',
              borderRadius: 12,
              fontSize: '0.75rem',
              fontWeight: 700,
              background: isDone ? '#E3FCEF' : isSched ? '#E6F0FA' : '#FFF7E6',
              color: isDone ? '#22A06B' : isSched ? '#074A76' : '#E97F0A',
            }}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      header: 'Actions',
      sortable: false,
      width: '90px',
      cell: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedChange(row);
          }}
          style={{
            padding: '4px 8px',
            borderRadius: 4,
            background: 'var(--bg-secondary, #F7F8FA)',
            border: '1px solid var(--border, #E4E7EC)',
            color: 'var(--ncgr-deep-blue, #074A76)',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Details
        </button>
      ),
    },
  ];

  const uniqueTowers = useMemo(() => {
    return Array.from(new Set(appChangesList.map(c => c.tower))).filter(Boolean).map(t => ({ label: t, value: t }));
  }, []);

  const filters: FilterDef<AppChangeRecord>[] = [
    { key: 'tower', label: 'Tower', options: uniqueTowers },
    { key: 'changeType', label: 'Type', options: [{ label: 'Normal', value: 'Normal' }, { label: 'Standard', value: 'Standard' }, { label: 'Emergency', value: 'Emergency' }] },
    { key: 'risk', label: 'Risk', options: [{ label: 'High', value: 'High' }, { label: 'Medium', value: 'Medium' }, { label: 'Low', value: 'Low' }] },
    { key: 'approvalStatus', label: 'Approval', options: [{ label: 'Approved', value: 'Approved' }, { label: 'CAB Review', value: 'CAB Review' }, { label: 'Pending', value: 'Pending' }] },
    { key: 'status', label: 'Status', options: [{ label: 'Scheduled', value: 'Scheduled' }, { label: 'CAB Approved', value: 'CAB Approved' }, { label: 'Planned', value: 'Planned' }, { label: 'Completed', value: 'Completed' }] },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 48 }}>
      {/* Sub-Page Header with Breadcrumbs & Sibling Tabs */}
      <SubPageHeader
        moduleTitle="Command Center"
        modulePath="/command-center"
        pageTitle="Change Requests"
        siblingPages={COMMAND_CENTER_SIBLINGS}
      />

      {/* KPI Cards Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #074A76' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Total Change Requests</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 2 }}>{totalChanges}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>
            {totalChanges === appChangesList.length ? 'Tracked change records' : `Filtered (${totalChanges} of ${appChangesList.length})`}
          </div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #40904F' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#40904F', textTransform: 'uppercase' }}>CAB Approved</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#40904F', marginTop: 2 }}>{approvedChanges}</div>
          <div style={{ fontSize: '0.6875rem', color: '#40904F', fontWeight: 600, marginTop: 2 }}>Ready for deployment</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #4AA6DC' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Upcoming Scheduled</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#074A76', marginTop: 2 }}>{scheduledChanges}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)', marginTop: 2 }}>Planned release windows</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #DE350B' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>Emergency Changes</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 2 }}>{emergencyChanges}</div>
          <div style={{ fontSize: '0.6875rem', color: '#DE350B', fontWeight: 600, marginTop: 2 }}>Critical fix deployments</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #22A06B' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Executed & Closed</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 2 }}>{completedChanges}</div>
          <div style={{ fontSize: '0.6875rem', color: '#22A06B', fontWeight: 600, marginTop: 2 }}>100% backout test verified</div>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        data={appChangesList}
        columns={columns}
        filters={filters}
        onFilteredDataChange={setFilteredChanges}
        searchPlaceholder="Search change number, application, description, owner..."
        searchKeys={['changeNumber', 'appName', 'description', 'owner', 'requestor', 'tower']}
        pageSize={10}
        onRowClick={(row) => setSelectedChange(row)}
        title="Change Advisory Board (CAB) Schedule & Release Pipeline"
        subtitle="Click any change record to inspect full implementation parameters, backout plan, and ServiceNow references"
        exportFilename="ncgr_change_requests"
      />

      {/* Change Request Detail Modal */}
      {selectedChange && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10, 22, 40, 0.5)',
              backdropFilter: 'blur(3px)',
              zIndex: 1100,
            }}
            onClick={() => setSelectedChange(null)}
          />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90vw',
              maxWidth: 680,
              maxHeight: '90vh',
              background: 'var(--surface-raised, #FFFFFF)',
              borderRadius: 14,
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              zIndex: 1101,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid var(--border, #E4E7EC)',
            }}
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
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '1rem', background: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: 4 }}>
                    {selectedChange.changeNumber}
                  </span>
                  <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: 10, background: selectedChange.changeType === 'Emergency' ? '#DE350B' : '#40904F', fontWeight: 700 }}>
                    {selectedChange.changeType}
                  </span>
                </div>
                <h3 style={{ margin: '6px 0 0', fontSize: '1.125rem', fontWeight: 800 }}>
                  {selectedChange.appName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedChange(null)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase', marginBottom: 4 }}>
                  Change Summary
                </div>
                <p style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text, #101828)' }}>
                  {selectedChange.description}
                </p>
              </div>

              {/* Grid of parameters */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)', border: '1px solid var(--border, #E4E7EC)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)', fontWeight: 600 }}>TOWER / DOMAIN</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)', marginTop: 2 }}>{selectedChange.tower}</div>
                </div>

                <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)', border: '1px solid var(--border, #E4E7EC)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)', fontWeight: 600 }}>APPROVAL STATUS</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#40904F', marginTop: 2 }}>{selectedChange.approvalStatus}</div>
                </div>

                <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)', border: '1px solid var(--border, #E4E7EC)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)', fontWeight: 600 }}>REQUESTOR</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)', marginTop: 2 }}>{selectedChange.requestor}</div>
                </div>

                <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)', border: '1px solid var(--border, #E4E7EC)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)', fontWeight: 600 }}>ASSIGNED OWNER</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)', marginTop: 2 }}>{selectedChange.owner}</div>
                </div>

                <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)', border: '1px solid var(--border, #E4E7EC)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)', fontWeight: 600 }}>SCHEDULED WINDOW</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)', marginTop: 2 }}>{selectedChange.scheduledDate}</div>
                </div>

                <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg-secondary, #F7F8FA)', border: '1px solid var(--border, #E4E7EC)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)', fontWeight: 600 }}>RELEASE VERSION</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)', marginTop: 2 }}>{selectedChange.releaseVersion || 'N/A'}</div>
                </div>
              </div>

              {/* Backout Plan */}
              <div style={{ padding: 14, borderRadius: 8, background: 'rgba(233, 127, 10, 0.06)', border: '1px solid rgba(233, 127, 10, 0.25)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, color: '#E97F0A' }}>
                  <ShieldAlert size={16} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Rollback / Backout Strategy</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text, #101828)', lineHeight: 1.5 }}>
                  {selectedChange.backoutPlan || 'Standard rollback: restore VM snapshot and revert code release to previous baseline.'}
                </p>
              </div>

              {/* External Link */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 8 }}>
                <a
                  href={selectedChange.servicenowRef}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 16px',
                    borderRadius: 6,
                    background: 'var(--ncgr-deep-blue, #074A76)',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                  }}
                >
                  <span>Open in ServiceNow</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChangeRequestsPage;
