import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDataStore } from '../../data/mockDataStore';
import {
  Users, Layers, Phone, CalendarDays, UserCheck,
  ClipboardList, ArrowRightLeft, FileSpreadsheet
} from 'lucide-react';

import ResourceRoster from './ResourceRoster';
import TeamStructurePage from './TeamStructurePage';
import ContactDirectory from './ContactDirectory';
import LeaveManagement from './LeaveManagement';
import AttendanceView from './AttendanceView';
import ActivityChecklist from './ActivityChecklist';
import HandoverLogs from './HandoverLogs';
import OperationsMOM from './OperationsMOM';

type MainTab = 'roster' | 'structure' | 'contacts' | 'leave' | 'attendance' | 'shift-ops';
type ShiftSubTab = 'checklist' | 'handover' | 'mom';

const OperationalServices: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as MainTab) || 'roster';
  const [activeTab, setActiveTab] = useState<MainTab>(initialTab);
  const [shiftSubTab, setShiftSubTab] = useState<ShiftSubTab>('checklist');

  const { employees, leaveRecords } = useDataStore();
  const pendingLeaves = leaveRecords.filter(l => l.status === 'Pending').length;
  const activeCount = employees.filter(e => e.status === 'Active' || e.status === 'Remote').length;

  const handleTabChange = (tab: MainTab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const tabs: { id: MainTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'roster',
      label: 'Resource Data',
      icon: <Users size={16} />,
      badge: `${employees.length}`,
    },
    {
      id: 'structure',
      label: 'Team Structure',
      icon: <Layers size={16} />,
      badge: '9 Towers',
    },
    {
      id: 'contacts',
      label: 'Contact Directory',
      icon: <Phone size={16} />,
    },
    {
      id: 'leave',
      label: 'Leave Management',
      icon: <CalendarDays size={16} />,
      badge: pendingLeaves > 0 ? `${pendingLeaves} Pending` : undefined,
    },
    {
      id: 'attendance',
      label: 'Attendance & Roster',
      icon: <UserCheck size={16} />,
      badge: `${activeCount} On-Duty`,
    },
    {
      id: 'shift-ops',
      label: 'Shift Operations Log',
      icon: <ClipboardList size={16} />,
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: 48 }}>
      {/* ─── TEAM OVERVIEW TAB NAVIGATION BAR ───────────────────── */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 6,
          padding: '6px 8px',
          background: 'var(--card-bg, #FFFFFF)',
          borderRadius: 12,
          border: '1px solid var(--border, #E4E7EC)',
          marginBottom: 20,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 8,
                border: 'none',
                background: isActive ? 'var(--ncgr-deep-blue, #074A76)' : 'transparent',
                color: isActive ? '#FFFFFF' : 'var(--text-secondary, #475467)',
                fontWeight: isActive ? 700 : 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: 10,
                    background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--bg-secondary, #F7F8FA)',
                    color: isActive ? '#FFFFFF' : 'var(--text-tertiary, #98A2B3)',
                    border: isActive ? 'none' : '1px solid var(--border, #E4E7EC)',
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ─── TAB CONTENT RENDERING ──────────────────────────────── */}
      {activeTab === 'roster' && <ResourceRoster />}
      {activeTab === 'structure' && <TeamStructurePage />}
      {activeTab === 'contacts' && <ContactDirectory />}
      {activeTab === 'leave' && <LeaveManagement />}
      {activeTab === 'attendance' && <AttendanceView />}

      {/* Shift Operations Log Tab with sub-tabs */}
      {activeTab === 'shift-ops' && (
        <div>
          {/* Sub-tab Navigation */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              marginBottom: 18,
              borderBottom: '1px solid var(--border, #E4E7EC)',
              paddingBottom: 8,
            }}
          >
            <button
              onClick={() => setShiftSubTab('checklist')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 6,
                border: 'none',
                background: shiftSubTab === 'checklist' ? 'rgba(7, 74, 118, 0.1)' : 'transparent',
                color: shiftSubTab === 'checklist' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--text-secondary, #475467)',
                fontWeight: shiftSubTab === 'checklist' ? 700 : 500,
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              <ClipboardList size={14} />
              <span>Activity Checklist</span>
            </button>

            <button
              onClick={() => setShiftSubTab('handover')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 6,
                border: 'none',
                background: shiftSubTab === 'handover' ? 'rgba(7, 74, 118, 0.1)' : 'transparent',
                color: shiftSubTab === 'handover' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--text-secondary, #475467)',
                fontWeight: shiftSubTab === 'handover' ? 700 : 500,
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              <ArrowRightLeft size={14} />
              <span>Shift Handover Logs</span>
            </button>

            <button
              onClick={() => setShiftSubTab('mom')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 6,
                border: 'none',
                background: shiftSubTab === 'mom' ? 'rgba(7, 74, 118, 0.1)' : 'transparent',
                color: shiftSubTab === 'mom' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--text-secondary, #475467)',
                fontWeight: shiftSubTab === 'mom' ? 700 : 500,
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              <FileSpreadsheet size={14} />
              <span>Operations MOM</span>
            </button>
          </div>

          {shiftSubTab === 'checklist' && <ActivityChecklist />}
          {shiftSubTab === 'handover' && <HandoverLogs />}
          {shiftSubTab === 'mom' && <OperationsMOM />}
        </div>
      )}
    </div>
  );
};

export default OperationalServices;
