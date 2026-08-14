import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '../../data/mockDataStore';
import { Users, Layers, Phone, CalendarDays, UserCheck, ChevronRight } from 'lucide-react';

const OperationalServices: React.FC = () => {
  const navigate = useNavigate();
  const { employees, leaveRecords } = useDataStore();

  const activeCount = employees.filter(e => e.status === 'Active' || e.status === 'Remote').length;
  const pendingLeaves = leaveRecords.filter(l => l.status === 'Pending').length;

  const modules = [
    {
      title: 'Resource Data',
      subtitle: 'Complete master employee roster and technical skill classifications',
      icon: <Users size={24} />,
      color: '#074A76',
      path: '/team-overview/resource-data',
      metric: `${employees.length} Staff`,
      badge: '355+ Profiles',
    },
    {
      title: 'Team Structure',
      subtitle: 'Organizational hierarchy, tower distribution, and leadership tiers',
      icon: <Layers size={24} />,
      color: '#40904F',
      path: '/team-overview/team-structure',
      metric: '9 Towers',
      badge: 'Org Chart',
    },
    {
      title: 'Contact Directory',
      subtitle: 'Verified phone numbers with privacy masking & direct escalation pathways',
      icon: <Phone size={24} />,
      color: '#4AA6DC',
      path: '/team-overview/contacts',
      metric: `${employees.length} Contacts`,
      badge: 'Protected',
    },
    {
      title: 'Leave Management',
      subtitle: 'Real-time workflow transitions, lead approvals, and standby backup rosters',
      icon: <CalendarDays size={24} />,
      color: '#E97F0A',
      path: '/team-overview/leave',
      metric: `${pendingLeaves} Pending`,
      badge: 'Live Workflow',
    },
    {
      title: 'Attendance Verification',
      subtitle: 'Biometric verification, shift presence tracking, and location logging',
      icon: <UserCheck size={24} />,
      color: '#671E75',
      path: '/team-overview/attendance',
      metric: `${activeCount} On-Duty`,
      badge: 'Real-Time',
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 40 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 6px' }}>
          Team Overview
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #475467)', margin: 0 }}>
          Central hub for NCGR ITMS workforce management, organizational hierarchy, leave approvals, and shift attendance
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
                <span>Open Module</span>
                <ChevronRight size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperationalServices;
