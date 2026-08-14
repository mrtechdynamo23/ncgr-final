import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '../../data/mockDataStore';
import { ClipboardCheck, ArrowRightLeft, MessageSquare, ChevronRight } from 'lucide-react';

const ShiftOperationsLog: React.FC = () => {
  const navigate = useNavigate();
  const { activityItems, handoverLogs, momActions } = useDataStore();

  const completedActivities = activityItems.filter(a => a.status === 'Completed').length;
  const openMomActions = momActions.filter(a => a.status === 'Open' || a.status === 'In Progress').length;

  const modules = [
    {
      title: 'Activity Checklist',
      subtitle: 'Daily and weekly mandatory checklists across all 9 towers with instant verification',
      icon: <ClipboardCheck size={24} />,
      color: '#40904F',
      path: '/shift-operations/activity-checklist',
      metric: `${completedActivities}/${activityItems.length} Done`,
      badge: 'Live Status',
    },
    {
      title: 'Shift Handover Logs',
      subtitle: 'Cross-shift operational continuity, critical events, and open incident transfers',
      icon: <ArrowRightLeft size={24} />,
      color: '#074A76',
      path: '/shift-operations/handover-logs',
      metric: `${handoverLogs.length} Records`,
      badge: '24x7 Logging',
    },
    {
      title: 'Operations MOM & Action Tracker',
      subtitle: 'Decisions from daily ops standups, weekly tower governance, and CAB meetings',
      icon: <MessageSquare size={24} />,
      color: '#E97F0A',
      path: '/shift-operations/mom',
      metric: `${openMomActions} Active`,
      badge: 'Governance',
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 6px' }}>
          Shift Operations Log
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #475467)', margin: 0 }}>
          Central operational execution logs: activity checklists, shift handover records, and governance action items
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 16,
        }}
      >
        {modules.map((m, idx) => (
          <div
            key={idx}
            onClick={() => navigate(m.path)}
            className="card"
            style={{
              padding: 24,
              borderRadius: 14,
              border: '1px solid var(--border, #E4E7EC)',
              background: 'var(--card-bg, #FFFFFF)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: m.color,
              }}
            />

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: `${m.color}15`,
                    color: m.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {m.icon}
                </div>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 12,
                    background: 'var(--bg-secondary, #F7F8FA)',
                    color: 'var(--text-secondary, #475467)',
                    border: '1px solid var(--border, #E4E7EC)',
                  }}
                >
                  {m.badge}
                </span>
              </div>

              <h3 style={{ margin: '0 0 6px', fontSize: '1.125rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
                {m.title}
              </h3>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)', lineHeight: 1.4 }}>
                {m.subtitle}
              </p>
            </div>

            <div style={{ marginTop: 20, paddingTop: 12, borderTop: '1px solid var(--border, #E4E7EC)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: m.color }}>
                {m.metric}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary, #98A2B3)' }}>
                <span>Open Log</span>
                <ChevronRight size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShiftOperationsLog;
