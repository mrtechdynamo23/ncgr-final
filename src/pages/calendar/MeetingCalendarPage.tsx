import React, { useState, useMemo, useEffect } from 'react';
import {
  Calendar as CalendarIcon, Clock, Plus, Search,
  FileText, CheckSquare, ChevronLeft, ChevronRight,
  Video, User, CheckCircle2, CalendarDays
} from 'lucide-react';
import { INITIAL_MEETINGS, type MeetingRecord, type MeetingPriority } from '../../data/master-meetings';
import MeetingDetailDrawer from '../../components/calendar/MeetingDetailDrawer';
import ScheduleMeetingModal from '../../components/calendar/ScheduleMeetingModal';

type CalendarViewMode = 'calendar' | 'upcoming' | 'history' | 'employee' | 'actions';

const STORAGE_KEY = 'ncgr_calendar_meetings_v3';

export const getTodayDateStr = (d: Date = new Date()): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const MeetingCalendarPage: React.FC = () => {
  // Today and Tomorrow dynamic strings
  const todayStr = useMemo(() => getTodayDateStr(), []);
  const tomorrowStr = useMemo(() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return getTodayDateStr(t);
  }, []);

  // Load meetings from localStorage or fallback to INITIAL_MEETINGS
  const [meetings, setMeetings] = useState<MeetingRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_MEETINGS;
  });

  const [viewMode, setViewMode] = useState<CalendarViewMode>('calendar');
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // Selected Day for interactive Day-Wise Inspection (Defaults dynamically to today's date)
  const [selectedDate, setSelectedDate] = useState<string>(() => getTodayDateStr());

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Month navigation (Defaults dynamically to current month)
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  // Sync to localStorage whenever meetings change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings));
    } catch {
      // ignore
    }
  }, [meetings]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = currentMonthDate.getFullYear();
  const currentMonthIndex = currentMonthDate.getMonth();
  const currentMonthName = monthNames[currentMonthIndex];

  const handlePrevMonth = () => {
    setCurrentMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Day Navigation helpers
  const handlePrevDay = () => {
    const d = new Date(selectedDate + 'T00:00:00');
    d.setDate(d.getDate() - 1);
    const newDateStr = getTodayDateStr(d);
    setSelectedDate(newDateStr);
    setCurrentMonthDate(new Date(d.getFullYear(), d.getMonth(), 1));
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate + 'T00:00:00');
    d.setDate(d.getDate() + 1);
    const newDateStr = getTodayDateStr(d);
    setSelectedDate(newDateStr);
    setCurrentMonthDate(new Date(d.getFullYear(), d.getMonth(), 1));
  };

  const handleSelectToday = () => {
    const today = new Date();
    const tStr = getTodayDateStr(today);
    setSelectedDate(tStr);
    setCurrentMonthDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  // Unique lists for filters
  const allEmployeeNames = useMemo(() => {
    const fromMeetings = new Set<string>();
    meetings.forEach(m => {
      if (m.owner) fromMeetings.add(m.owner);
      m.participants.forEach(p => {
        if (p.name) fromMeetings.add(p.name);
      });
    });
    return Array.from(fromMeetings).sort();
  }, [meetings]);

  // Handle Meeting Creation & Guaranteed Calendar Reflection
  const handleSaveNewMeeting = (newMeeting: MeetingRecord) => {
    const updatedMeetings = [newMeeting, ...meetings];
    setMeetings(updatedMeetings);

    // Parse the date to jump the calendar to the target month & select that day
    if (newMeeting.date) {
      setSelectedDate(newMeeting.date);
      const parts = newMeeting.date.split('-');
      if (parts.length >= 2) {
        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10) - 1;
        if (!isNaN(y) && !isNaN(m)) {
          setCurrentMonthDate(new Date(y, m, 1));
        }
      }
    }

    // Reset filters to ensure the newly scheduled meeting is not filtered out
    setSearchTerm('');
    setSelectedEmployee('ALL');
    setSelectedType('ALL');
    setSelectedPriority('ALL');
    setSelectedStatus('ALL');

    // Immediately open drawer and focus
    setSelectedMeeting(newMeeting);
    setIsDrawerOpen(true);
  };

  // Toggle Action Status
  const handleToggleActionStatus = (meetingId: string, actionId: string) => {
    setMeetings(prev =>
      prev.map(m => {
        if (m.id === meetingId && m.mom) {
          const updatedActions = m.mom.actionItems.map(act => {
            if (act.id === actionId) {
              const newStatus = act.status === 'Completed' ? 'Open' : 'Completed';
              return { ...act, status: newStatus as any };
            }
            return act;
          });
          return {
            ...m,
            mom: {
              ...m.mom,
              actionItems: updatedActions,
            },
          };
        }
        return m;
      })
    );

    if (selectedMeeting && selectedMeeting.id === meetingId && selectedMeeting.mom) {
      setSelectedMeeting(prev => {
        if (!prev || !prev.mom) return prev;
        const updatedActions = prev.mom.actionItems.map(act => {
          if (act.id === actionId) {
            const newStatus = act.status === 'Completed' ? 'Open' : 'Completed';
            return { ...act, status: newStatus as any };
          }
          return act;
        });
        return {
          ...prev,
          mom: {
            ...prev.mom,
            actionItems: updatedActions,
          },
        };
      });
    }
  };

  // Filtered dataset
  const filteredMeetings = useMemo(() => {
    return meetings.filter(m => {
      // Search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchTitle = m.title.toLowerCase().includes(query);
        const matchId = m.id.toLowerCase().includes(query);
        const matchOwner = m.owner.toLowerCase().includes(query);
        const matchAgenda = m.agenda ? m.agenda.toLowerCase().includes(query) : false;
        const matchParticipant = m.participants.some(p => p.name.toLowerCase().includes(query));
        if (!matchTitle && !matchId && !matchOwner && !matchAgenda && !matchParticipant) {
          return false;
        }
      }

      // Employee Filter
      if (selectedEmployee !== 'ALL') {
        const isOwner = m.owner === selectedEmployee;
        const isParticipant = m.participants.some(p => p.name === selectedEmployee);
        if (!isOwner && !isParticipant) return false;
      }

      // Type Filter
      if (selectedType !== 'ALL' && m.type !== selectedType) {
        return false;
      }

      // Priority Filter
      if (selectedPriority !== 'ALL' && m.priority !== selectedPriority) {
        return false;
      }

      // Status Filter
      if (selectedStatus !== 'ALL' && m.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [meetings, searchTerm, selectedEmployee, selectedType, selectedPriority, selectedStatus]);

  // Key Aggregated Metrics
  const totalCount = filteredMeetings.length;
  const upcomingCount = filteredMeetings.filter(m => m.status === 'Upcoming' || m.status === 'In Progress').length;
  const completedCount = filteredMeetings.filter(m => m.status === 'Completed').length;
  const momCount = filteredMeetings.filter(m => m.mom !== undefined).length;
  const highPriorityCount = filteredMeetings.filter(m => m.priority === 'Critical' || m.priority === 'High Priority').length;

  // Selected Day Meetings
  const selectedDayMeetings = useMemo(() => {
    return filteredMeetings.filter(m => m.date === selectedDate);
  }, [filteredMeetings, selectedDate]);

  // Total Action Items across filtered meetings
  const allActionItems = useMemo(() => {
    const list: Array<{ action: any; meeting: MeetingRecord }> = [];
    filteredMeetings.forEach(m => {
      if (m.mom && m.mom.actionItems) {
        m.mom.actionItems.forEach(act => {
          list.push({ action: act, meeting: m });
        });
      }
    });
    return list;
  }, [filteredMeetings]);

  const openActionCount = allActionItems.filter(item => item.action.status !== 'Completed').length;

  // Open meeting detail
  const handleOpenMeetingDetail = (m: MeetingRecord) => {
    setSelectedMeeting(m);
    setIsDrawerOpen(true);
  };

  // Helper for priority color tag
  const getPriorityBadge = (priority: MeetingPriority) => {
    const isCritical = priority === 'Critical';
    const isHigh = priority === 'High Priority';
    const isImp = priority === 'Important';

    const bg = isCritical ? '#FFEBE6' : isHigh ? '#FFF7E6' : isImp ? '#E6F4FC' : '#F4F5F7';
    const color = isCritical ? '#DE350B' : isHigh ? '#E97F0A' : isImp ? '#074A76' : '#64748B';

    return (
      <span
        style={{
          fontSize: '0.6875rem',
          fontWeight: 800,
          padding: '2px 8px',
          borderRadius: 4,
          background: bg,
          color: color,
          border: `1px solid ${color}`,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
        {priority}
      </span>
    );
  };

  // ─── STYLING HELPER FOR FULL CARD TILE HIGHLIGHTING ───────────────
  const getCardPriorityStyle = (priority: MeetingPriority) => {
    if (priority === 'Critical') {
      return {
        background: '#FFF5F5',
        border: '2px solid #DE350B',
        borderTop: '5px solid #DE350B',
        boxShadow: '0 4px 14px rgba(222, 53, 11, 0.12)',
        titleColor: '#991B1B',
        badgeBg: '#FFEBE6',
        badgeColor: '#DE350B',
      };
    }
    if (priority === 'High Priority') {
      return {
        background: '#FFFAF0',
        border: '2px solid #E97F0A',
        borderTop: '5px solid #E97F0A',
        boxShadow: '0 4px 14px rgba(233, 127, 10, 0.12)',
        titleColor: '#9A3412',
        badgeBg: '#FFF7E6',
        badgeColor: '#E97F0A',
      };
    }
    if (priority === 'Important') {
      return {
        background: '#F0F9FF',
        border: '1.5px solid #074A76',
        borderTop: '4px solid #074A76',
        boxShadow: '0 2px 8px rgba(7, 74, 118, 0.08)',
        titleColor: '#074A76',
        badgeBg: '#E6F0FA',
        badgeColor: '#074A76',
      };
    }
    return {
      background: 'var(--card-bg, #FFFFFF)',
      border: '1px solid var(--border, #E4E7EC)',
      borderTop: '3px solid #64748B',
      boxShadow: 'none',
      titleColor: 'var(--text, #101828)',
      badgeBg: 'var(--bg-secondary, #F1F5F9)',
      badgeColor: 'var(--text-secondary, #475467)',
    };
  };

  // ─── CALENDAR GRID BUILDER ─────────────────────────────────────
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1).getDay(); // 0 is Sunday
    const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();

    const days: Array<{ dayNumber: number; dateStr: string; meetings: MeetingRecord[] }> = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayMeetings = filteredMeetings.filter(m => m.date === dateStr);
      days.push({
        dayNumber: i,
        dateStr,
        meetings: dayMeetings,
      });
    }

    return { firstDayOfMonth, days };
  }, [currentYear, currentMonthIndex, filteredMeetings]);

  return (
    <div className="page-container" style={{ paddingBottom: 48 }}>
      {/* Top Header & Overview */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 20,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text, #101828)', margin: 0 }}>
              Central Meeting Governance & Calendar
            </h1>
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 12,
                background: 'rgba(7, 74, 118, 0.1)',
                color: 'var(--ncgr-deep-blue, #074A76)',
                border: '1px solid rgba(7, 74, 118, 0.2)',
              }}
            >
              ENTERPRISE GOVERNANCE
            </span>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => setIsScheduleModalOpen(true)}
          style={{
            padding: '9px 18px',
            borderRadius: 8,
            background: 'var(--ncgr-deep-blue, #074A76)',
            color: '#FFFFFF',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 2px 6px rgba(7, 74, 118, 0.25)',
          }}
        >
          <Plus size={16} />
          <span>+ Schedule Meeting</span>
        </button>
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
        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #074A76' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary, #475467)', textTransform: 'uppercase' }}>Total Scheduled Calls</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', marginTop: 2 }}>{totalCount}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>
            {selectedEmployee === 'ALL' ? 'Across 2-month horizon' : `Associated with ${selectedEmployee}`}
          </div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #E97F0A' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#E97F0A', textTransform: 'uppercase' }}>Upcoming Sessions</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E97F0A', marginTop: 2 }}>{upcomingCount}</div>
          <div style={{ fontSize: '0.6875rem', color: '#E97F0A', fontWeight: 600, marginTop: 2 }}>Future (No MOM yet)</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #22A06B' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#22A06B', textTransform: 'uppercase' }}>Completed with MOM</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22A06B', marginTop: 2 }}>{completedCount}</div>
          <div style={{ fontSize: '0.6875rem', color: '#22A06B', fontWeight: 600, marginTop: 2 }}>{momCount} signed-off archives</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #DE350B' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#DE350B', textTransform: 'uppercase' }}>High Priority Calls</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DE350B', marginTop: 2 }}>{highPriorityCount}</div>
          <div style={{ fontSize: '0.6875rem', color: '#DE350B', fontWeight: 600, marginTop: 2 }}>Highlighted in full tiles</div>
        </div>

        <div className="card" style={{ padding: 14, borderRadius: 10, background: 'var(--card-bg, #FFFFFF)', border: '1px solid var(--border, #E4E7EC)', borderTop: '3px solid #671E75' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#671E75', textTransform: 'uppercase' }}>Open MOM Action Items</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#671E75', marginTop: 2 }}>{openActionCount}</div>
          <div style={{ fontSize: '0.6875rem', color: '#671E75', fontWeight: 600, marginTop: 2 }}>From completed meetings</div>
        </div>
      </div>

      {/* Primary Navigation Tabs & Search Controls */}
      <div
        style={{
          background: 'var(--card-bg, #FFFFFF)',
          border: '1px solid var(--border, #E4E7EC)',
          borderRadius: 12,
          padding: '14px 18px',
          marginBottom: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {/* Top Row: View Mode Tabs & Month Stepper */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            borderBottom: '1px solid var(--border, #E4E7EC)',
            paddingBottom: 12,
          }}
        >
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button
              onClick={() => setViewMode('calendar')}
              style={{
                padding: '7px 14px',
                borderRadius: 8,
                border: viewMode === 'calendar' ? '1px solid var(--ncgr-deep-blue, #074A76)' : '1px solid var(--border, #E4E7EC)',
                background: viewMode === 'calendar' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--bg-secondary, #F8FAFC)',
                color: viewMode === 'calendar' ? '#FFFFFF' : 'var(--text-secondary, #475467)',
                fontWeight: viewMode === 'calendar' ? 700 : 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <CalendarIcon size={15} />
              <span>Calendar View</span>
            </button>

            <button
              onClick={() => setViewMode('upcoming')}
              style={{
                padding: '7px 14px',
                borderRadius: 8,
                border: viewMode === 'upcoming' ? '1px solid var(--ncgr-deep-blue, #074A76)' : '1px solid var(--border, #E4E7EC)',
                background: viewMode === 'upcoming' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--bg-secondary, #F8FAFC)',
                color: viewMode === 'upcoming' ? '#FFFFFF' : 'var(--text-secondary, #475467)',
                fontWeight: viewMode === 'upcoming' ? 700 : 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Clock size={15} />
              <span>Upcoming Meetings ({upcomingCount})</span>
            </button>

            <button
              onClick={() => setViewMode('history')}
              style={{
                padding: '7px 14px',
                borderRadius: 8,
                border: viewMode === 'history' ? '1px solid var(--ncgr-deep-blue, #074A76)' : '1px solid var(--border, #E4E7EC)',
                background: viewMode === 'history' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--bg-secondary, #F8FAFC)',
                color: viewMode === 'history' ? '#FFFFFF' : 'var(--text-secondary, #475467)',
                fontWeight: viewMode === 'history' ? 700 : 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <FileText size={15} />
              <span>Meeting History & MOM ({completedCount})</span>
            </button>

            <button
              onClick={() => setViewMode('employee')}
              style={{
                padding: '7px 14px',
                borderRadius: 8,
                border: viewMode === 'employee' ? '1px solid var(--ncgr-deep-blue, #074A76)' : '1px solid var(--border, #E4E7EC)',
                background: viewMode === 'employee' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--bg-secondary, #F8FAFC)',
                color: viewMode === 'employee' ? '#FFFFFF' : 'var(--text-secondary, #475467)',
                fontWeight: viewMode === 'employee' ? 700 : 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <User size={15} />
              <span>Employee Meeting View</span>
            </button>

            <button
              onClick={() => setViewMode('actions')}
              style={{
                padding: '7px 14px',
                borderRadius: 8,
                border: viewMode === 'actions' ? '1px solid var(--ncgr-deep-blue, #074A76)' : '1px solid var(--border, #E4E7EC)',
                background: viewMode === 'actions' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--bg-secondary, #F8FAFC)',
                color: viewMode === 'actions' ? '#FFFFFF' : 'var(--text-secondary, #475467)',
                fontWeight: viewMode === 'actions' ? 700 : 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <CheckSquare size={15} />
              <span>MOM Action Items ({allActionItems.length})</span>
            </button>
          </div>

          {/* Month Stepper (Always accessible) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={handlePrevMonth}
              style={{
                padding: '5px 8px',
                borderRadius: 6,
                border: '1px solid var(--border, #E4E7EC)',
                background: 'var(--card-bg, #FFFFFF)',
                cursor: 'pointer',
                color: 'var(--text-secondary, #475467)',
              }}
              title="Previous Month"
            >
              <ChevronLeft size={16} />
            </button>
            <span style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--text, #101828)', minWidth: 130, textAlign: 'center' }}>
              {currentMonthName} {currentYear}
            </span>
            <button
              onClick={handleNextMonth}
              style={{
                padding: '5px 8px',
                borderRadius: 6,
                border: '1px solid var(--border, #E4E7EC)',
                background: 'var(--card-bg, #FFFFFF)',
                cursor: 'pointer',
                color: 'var(--text-secondary, #475467)',
              }}
              title="Next Month"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Row: Filter Controls */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          {/* Search Box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid var(--border, #E4E7EC)',
              background: 'var(--bg-secondary, #F8FAFC)',
              flex: 1,
              minWidth: 220,
            }}
          >
            <Search size={15} color="var(--text-tertiary, #98A2B3)" />
            <input
              type="text"
              placeholder="Search meetings by Title, Meeting ID, Owner, Participant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.8125rem',
                width: '100%',
                color: 'var(--text, #101828)',
              }}
            />
          </div>

          {/* Employee Filter */}
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            style={{
              padding: '7px 10px',
              borderRadius: 6,
              border: '1px solid var(--border, #E4E7EC)',
              fontSize: '0.8125rem',
              background: 'var(--card-bg, #FFFFFF)',
              color: 'var(--text, #101828)',
              fontWeight: 600,
            }}
          >
            <option value="ALL">👤 All Employees</option>
            {allEmployeeNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>

          {/* Meeting Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              padding: '7px 10px',
              borderRadius: 6,
              border: '1px solid var(--border, #E4E7EC)',
              fontSize: '0.8125rem',
              background: 'var(--card-bg, #FFFFFF)',
              color: 'var(--text, #101828)',
              fontWeight: 600,
            }}
          >
            <option value="ALL">All Meeting Types</option>
            <option value="WSR">WSR (Weekly Status Review)</option>
            <option value="MSR">MSR (Monthly Status Review)</option>
            <option value="DSR">DSR (Daily Status Review)</option>
            <option value="Daily Scrum">Daily Scrum</option>
            <option value="Governance Meeting">Governance Meeting</option>
            <option value="Customer Meeting">Customer Meeting</option>
            <option value="Operational Review">Operational Review</option>
            <option value="Internal Review">Internal Review</option>
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            style={{
              padding: '7px 10px',
              borderRadius: 6,
              border: '1px solid var(--border, #E4E7EC)',
              fontSize: '0.8125rem',
              background: 'var(--card-bg, #FFFFFF)',
              color: 'var(--text, #101828)',
              fontWeight: 600,
            }}
          >
            <option value="ALL">All Priorities</option>
            <option value="Critical">● Critical</option>
            <option value="High Priority">● High Priority</option>
            <option value="Important">● Important</option>
            <option value="Normal">● Normal</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: '7px 10px',
              borderRadius: 6,
              border: '1px solid var(--border, #E4E7EC)',
              fontSize: '0.8125rem',
              background: 'var(--card-bg, #FFFFFF)',
              color: 'var(--text, #101828)',
              fontWeight: 600,
            }}
          >
            <option value="ALL">All Statuses</option>
            <option value="Upcoming">Upcoming</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* ─── VIEW MODE 1: CALENDAR GRID WITH ALL 7 COLUMNS (INCL. SATURDAY) ────── */}
      {viewMode === 'calendar' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Scrollable Container Ensuring Saturday is 100% visible */}
          <div
            style={{
              background: 'var(--card-bg, #FFFFFF)',
              border: '1px solid var(--border, #E4E7EC)',
              borderRadius: 12,
              overflowX: 'auto',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ minWidth: 840 }}>
              {/* Days Header: Explicitly 7 Columns from SUN to SAT */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, minmax(120px, 1fr))',
                  background: 'var(--bg-secondary, #F8FAFC)',
                  borderBottom: '1px solid var(--border, #E4E7EC)',
                  textAlign: 'center',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary, #475467)',
                  padding: '10px 0',
                }}
              >
                <div>SUN</div>
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div style={{ color: 'var(--ncgr-deep-blue, #074A76)', fontWeight: 800 }}>SAT</div>
              </div>

              {/* Month Days Grid: 7 Columns with Saturday fully rendered */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, minmax(120px, 1fr))',
                  minHeight: 520,
                }}
              >
                {/* Blank padding days for start of month */}
                {Array.from({ length: calendarDays.firstDayOfMonth }).map((_, idx) => (
                  <div
                    key={`blank-${idx}`}
                    style={{
                      borderRight: '1px solid var(--border, #E4E7EC)',
                      borderBottom: '1px solid var(--border, #E4E7EC)',
                      background: 'var(--bg-secondary, #FAFAFA)',
                      opacity: 0.4,
                      minHeight: 115,
                    }}
                  />
                ))}

                {/* Days in current month */}
                {calendarDays.days.map((day) => {
                  const isToday = day.dateStr === todayStr;
                  const isSelected = day.dateStr === selectedDate;

                  return (
                    <div
                      key={day.dateStr}
                      onClick={() => setSelectedDate(day.dateStr)}
                      style={{
                        borderRight: '1px solid var(--border, #E4E7EC)',
                        borderBottom: '1px solid var(--border, #E4E7EC)',
                        padding: 8,
                        minHeight: 115,
                        background: isSelected
                          ? 'rgba(7, 74, 118, 0.08)'
                          : isToday
                          ? 'rgba(64, 144, 79, 0.05)'
                          : 'var(--card-bg, #FFFFFF)',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        outline: isSelected ? '2.5px solid var(--ncgr-deep-blue, #074A76)' : 'none',
                        outlineOffset: '-2.5px',
                        zIndex: isSelected ? 2 : 1,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: (isSelected || isToday) ? 800 : 600,
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: isSelected
                                ? 'var(--ncgr-deep-blue, #074A76)'
                                : isToday
                                ? '#40904F'
                                : 'transparent',
                              color: (isSelected || isToday) ? '#FFFFFF' : 'var(--text-secondary, #475467)',
                            }}
                          >
                            {day.dayNumber}
                          </span>

                          {isToday && (
                            <span style={{ fontSize: '0.5625rem', fontWeight: 800, padding: '1px 4px', borderRadius: 4, background: '#E3FCEF', color: '#22A06B' }}>
                              TODAY
                            </span>
                          )}

                          {isSelected && !isToday && (
                            <span style={{ fontSize: '0.5625rem', fontWeight: 800, padding: '1px 4px', borderRadius: 4, background: '#E6F0FA', color: '#074A76' }}>
                              ACTIVE
                            </span>
                          )}
                        </div>

                        {day.meetings.length > 0 && (
                          <span style={{ fontSize: '0.625rem', color: 'var(--text-tertiary, #98A2B3)', fontWeight: 700 }}>
                            {day.meetings.length} calls
                          </span>
                        )}
                      </div>

                      {/* Meetings List inside Day Cell with Full High-Priority Tile Coloring */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, overflowY: 'auto' }}>
                        {day.meetings.map((m) => {
                          const isCritical = m.priority === 'Critical';
                          const isHigh = m.priority === 'High Priority';
                          const isImportant = m.priority === 'Important';

                          // Full Tile Coloring for High Priority & Critical
                          let pillBg = 'var(--bg-secondary, #F1F5F9)';
                          let pillBorder = '1px solid var(--border, #CBD5E1)';
                          let pillTextColor = 'var(--text, #101828)';
                          let pillSubColor = 'var(--text-secondary, #475467)';

                          if (isCritical) {
                            pillBg = '#FFEBE6';
                            pillBorder = '1.5px solid #DE350B';
                            pillTextColor = '#991B1B';
                            pillSubColor = '#B91C1C';
                          } else if (isHigh) {
                            pillBg = '#FFF7E6';
                            pillBorder = '1.5px solid #E97F0A';
                            pillTextColor = '#9A3412';
                            pillSubColor = '#C2410C';
                          } else if (isImportant) {
                            pillBg = '#E6F4FC';
                            pillBorder = '1px solid #074A76';
                            pillTextColor = '#074A76';
                            pillSubColor = '#0369A1';
                          }

                          return (
                            <div
                              key={m.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenMeetingDetail(m);
                              }}
                              style={{
                                padding: '5px 7px',
                                borderRadius: 6,
                                background: pillBg,
                                border: pillBorder,
                                fontSize: '0.6875rem',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                                boxShadow: (isCritical || isHigh) ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                              }}
                              title={`${m.title} (${m.startTime} - ${m.owner})`}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                                <span style={{ fontWeight: (isCritical || isHigh) ? 800 : 700, color: pillTextColor, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {m.title}
                                </span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: pillSubColor, fontSize: '0.625rem', marginTop: 2, fontWeight: 600 }}>
                                <span>{m.startTime}</span>
                                <span style={{ fontWeight: 800 }}>{m.type}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── INTERACTIVE DAY-WISE SCHEDULE INSPECTOR PANEL ─────────────── */}
          <div
            style={{
              background: 'var(--card-bg, #FFFFFF)',
              border: '1px solid var(--border, #E4E7EC)',
              borderRadius: 12,
              padding: 20,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            {/* Day Bar Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 12,
                borderBottom: '1px solid var(--border, #E4E7EC)',
                paddingBottom: 14,
                marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CalendarDays size={22} color="var(--ncgr-deep-blue, #074A76)" />
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
                    Schedule for {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                    {selectedDayMeetings.length} sessions scheduled for this date
                  </span>
                </div>
              </div>

              {/* Day Navigation Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  onClick={handlePrevDay}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: '1px solid var(--border, #E4E7EC)',
                    background: 'var(--bg-secondary, #F8FAFC)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    color: 'var(--text-secondary, #475467)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <ChevronLeft size={14} />
                  <span>Previous Day</span>
                </button>

                <button
                  onClick={handleSelectToday}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: '1px solid #40904F',
                    background: selectedDate === todayStr ? '#40904F' : 'rgba(64, 144, 79, 0.1)',
                    color: selectedDate === todayStr ? '#FFFFFF' : '#40904F',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Today ({new Date(todayStr + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })})
                </button>

                <button
                  onClick={() => {
                    setSelectedDate(tomorrowStr);
                    const tDate = new Date(tomorrowStr + 'T00:00:00');
                    setCurrentMonthDate(new Date(tDate.getFullYear(), tDate.getMonth(), 1));
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: '1px solid var(--ncgr-deep-blue, #074A76)',
                    background: selectedDate === tomorrowStr ? 'var(--ncgr-deep-blue, #074A76)' : 'rgba(7, 74, 118, 0.1)',
                    color: selectedDate === tomorrowStr ? '#FFFFFF' : 'var(--ncgr-deep-blue, #074A76)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {new Date(tomorrowStr + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} (Tomorrow)
                </button>

                <button
                  onClick={handleNextDay}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: '1px solid var(--border, #E4E7EC)',
                    background: 'var(--bg-secondary, #F8FAFC)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    color: 'var(--text-secondary, #475467)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span>Next Day</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* List of Meetings for the Selected Day */}
            {selectedDayMeetings.length === 0 ? (
              <div
                style={{
                  padding: 32,
                  textAlign: 'center',
                  background: 'var(--bg-secondary, #F8FAFC)',
                  borderRadius: 10,
                  border: '1px dashed var(--border, #E4E7EC)',
                }}
              >
                <Clock size={32} color="var(--text-tertiary, #98A2B3)" style={{ margin: '0 auto 8px' }} />
                <h4 style={{ margin: '0 0 4px', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                  No Meetings Scheduled for this Date
                </h4>
                <p style={{ margin: '0 0 12px', fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)' }}>
                  You can schedule a governance call or operational review for this date.
                </p>
                <button
                  onClick={() => setIsScheduleModalOpen(true)}
                  style={{
                    padding: '7px 16px',
                    borderRadius: 6,
                    background: 'var(--ncgr-deep-blue, #074A76)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  + Schedule for {selectedDate}
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {selectedDayMeetings.map((m) => {
                  const cardStyle = getCardPriorityStyle(m.priority);
                  return (
                    <div
                      key={m.id}
                      className="card"
                      style={{
                        padding: '16px 20px',
                        borderRadius: 10,
                        background: cardStyle.background,
                        border: cardStyle.border,
                        borderTop: cardStyle.borderTop,
                        boxShadow: cardStyle.boxShadow,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 16,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                        <div
                          style={{
                            padding: '10px 14px',
                            borderRadius: 8,
                            background: cardStyle.badgeBg,
                            color: cardStyle.badgeColor,
                            border: `1px solid ${cardStyle.badgeColor}`,
                            textAlign: 'center',
                            minWidth: 75,
                          }}
                        >
                          <div style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase' }}>
                            {m.type}
                          </div>
                          <div style={{ fontSize: '0.9375rem', fontWeight: 800, marginTop: 2 }}>
                            {m.startTime}
                          </div>
                          <div style={{ fontSize: '0.625rem', fontWeight: 600 }}>
                            {m.durationMinutes} min
                          </div>
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                            <span style={{ fontFamily: 'monospace', fontSize: '0.6875rem', fontWeight: 800, color: '#074A76', background: 'var(--bg-secondary, #F1F5F9)', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--border, #E4E7EC)' }}>
                              {m.id}
                            </span>
                            {getPriorityBadge(m.priority)}
                            <span
                              style={{
                                fontSize: '0.6875rem',
                                fontWeight: 700,
                                padding: '2px 6px',
                                borderRadius: 4,
                                background: m.status === 'Completed' ? '#E3FCEF' : '#FFF7E6',
                                color: m.status === 'Completed' ? '#22A06B' : '#E97F0A',
                              }}
                            >
                              {m.status}
                            </span>
                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)' }}>• {m.tower}</span>
                          </div>

                          <h3
                            onClick={() => handleOpenMeetingDetail(m)}
                            style={{
                              fontSize: '1rem',
                              fontWeight: 800,
                              color: cardStyle.titleColor,
                              margin: '0 0 4px',
                              cursor: 'pointer',
                            }}
                          >
                            {m.title}
                          </h3>

                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                            Organizer: <strong>{m.owner}</strong> • Location: {m.location || 'Microsoft Teams'} • {m.participants.length} invited
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {m.meetingLink && (
                          <a
                            href={m.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '7px 14px',
                              borderRadius: 6,
                              background: 'rgba(64, 144, 79, 0.1)',
                              color: '#22A06B',
                              border: '1px solid rgba(64, 144, 79, 0.2)',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                            }}
                          >
                            <Video size={14} />
                            <span>Teams Bridge</span>
                          </a>
                        )}

                        <button
                          onClick={() => handleOpenMeetingDetail(m)}
                          style={{
                            padding: '7px 14px',
                            borderRadius: 6,
                            background: 'var(--ncgr-deep-blue, #074A76)',
                            color: '#FFFFFF',
                            border: 'none',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {m.mom ? 'View MOM →' : 'Meeting Details →'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── VIEW MODE 2: UPCOMING MEETINGS ────────────────────────── */}
      {viewMode === 'upcoming' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredMeetings.filter(m => m.status === 'Upcoming' || m.status === 'In Progress').length === 0 ? (
            <div
              style={{
                padding: 40,
                textAlign: 'center',
                background: 'var(--card-bg, #FFFFFF)',
                borderRadius: 12,
                border: '1px solid var(--border, #E4E7EC)',
              }}
            >
              <Clock size={36} color="var(--text-tertiary, #98A2B3)" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 6px', color: 'var(--text, #101828)' }}>
                No Upcoming Meetings Found
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)', margin: 0 }}>
                Adjust your filters or click <strong>+ Schedule Meeting</strong> to create a new session.
              </p>
            </div>
          ) : (
            filteredMeetings
              .filter(m => m.status === 'Upcoming' || m.status === 'In Progress')
              .map((m) => {
                const cardStyle = getCardPriorityStyle(m.priority);
                return (
                  <div
                    key={m.id}
                    className="card"
                    style={{
                      padding: '16px 20px',
                      borderRadius: 10,
                      background: cardStyle.background,
                      border: cardStyle.border,
                      borderTop: cardStyle.borderTop,
                      boxShadow: cardStyle.boxShadow,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 16,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                      <div
                        style={{
                          padding: '10px 14px',
                          borderRadius: 8,
                          background: cardStyle.badgeBg,
                          color: cardStyle.badgeColor,
                          border: `1px solid ${cardStyle.badgeColor}`,
                          textAlign: 'center',
                          minWidth: 75,
                        }}
                      >
                        <div style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase' }}>
                          {m.type}
                        </div>
                        <div style={{ fontSize: '0.9375rem', fontWeight: 800, marginTop: 2 }}>
                          {new Date(m.date + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </div>
                        <div style={{ fontSize: '0.625rem', fontWeight: 600 }}>
                          {m.startTime}
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                          <span style={{ fontFamily: 'monospace', fontSize: '0.6875rem', fontWeight: 800, color: '#074A76', background: 'var(--bg-secondary, #F1F5F9)', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--border, #E4E7EC)' }}>
                            {m.id}
                          </span>
                          {getPriorityBadge(m.priority)}
                          <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)' }}>• {m.tower}</span>
                        </div>

                        <h3
                          onClick={() => handleOpenMeetingDetail(m)}
                          style={{
                            fontSize: '1rem',
                            fontWeight: 800,
                            color: cardStyle.titleColor,
                            margin: '0 0 6px',
                            cursor: 'pointer',
                          }}
                        >
                          {m.title}
                        </h3>

                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                          <span>Date: <strong>{m.date}</strong></span>
                          <span>•</span>
                          <span>Organizer: <strong style={{ color: 'var(--text, #101828)' }}>{m.owner}</strong></span>
                          <span>•</span>
                          <span>Duration: {m.durationMinutes} min</span>
                          <span>•</span>
                          <span>{m.participants.length} invited participants</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {m.meetingLink && (
                        <a
                          href={m.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '7px 14px',
                            borderRadius: 6,
                            background: 'rgba(64, 144, 79, 0.1)',
                            color: '#22A06B',
                            border: '1px solid rgba(64, 144, 79, 0.2)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                          }}
                        >
                          <Video size={14} />
                          <span>Join Teams</span>
                        </a>
                      )}

                      <button
                        onClick={() => handleOpenMeetingDetail(m)}
                        style={{
                          padding: '7px 14px',
                          borderRadius: 6,
                          background: 'var(--ncgr-deep-blue, #074A76)',
                          color: '#FFFFFF',
                          border: 'none',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Meeting Details →
                      </button>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      )}

      {/* ─── VIEW MODE 3: MEETING HISTORY & MOM ────────────────────── */}
      {viewMode === 'history' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredMeetings.filter(m => m.status === 'Completed').length === 0 ? (
            <div
              style={{
                padding: 40,
                textAlign: 'center',
                background: 'var(--card-bg, #FFFFFF)',
                borderRadius: 12,
                border: '1px solid var(--border, #E4E7EC)',
              }}
            >
              <FileText size={36} color="var(--text-tertiary, #98A2B3)" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 6px', color: 'var(--text, #101828)' }}>
                No Completed Meetings Recorded
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)', margin: 0 }}>
                Completed sessions with signed-off minutes and action items will appear in this archive.
              </p>
            </div>
          ) : (
            filteredMeetings
              .filter(m => m.status === 'Completed')
              .map((m) => {
                const cardStyle = getCardPriorityStyle(m.priority);
                return (
                  <div
                    key={m.id}
                    className="card"
                    style={{
                      padding: '16px 20px',
                      borderRadius: 10,
                      background: cardStyle.background,
                      border: cardStyle.border,
                      borderTop: cardStyle.borderTop,
                      boxShadow: cardStyle.boxShadow,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 16,
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.6875rem', fontWeight: 800, color: '#074A76', background: 'var(--bg-secondary, #F1F5F9)', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--border, #E4E7EC)' }}>
                          {m.id}
                        </span>
                        <span style={{ fontSize: '0.6875rem', fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: cardStyle.badgeBg, color: cardStyle.badgeColor }}>
                          {m.type}
                        </span>
                        {getPriorityBadge(m.priority)}
                        <span style={{ fontSize: '0.6875rem', color: '#22A06B', fontWeight: 700, background: '#E3FCEF', padding: '2px 6px', borderRadius: 4 }}>
                          ✓ Completed & Signed-off
                        </span>
                      </div>

                      <h3
                        onClick={() => handleOpenMeetingDetail(m)}
                        style={{
                          fontSize: '1rem',
                          fontWeight: 800,
                          color: cardStyle.titleColor,
                          margin: '0 0 6px',
                          cursor: 'pointer',
                        }}
                      >
                        {m.title}
                      </h3>

                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                        <span>Date: <strong>{m.date} ({m.startTime} - {m.endTime})</strong></span>
                        <span>•</span>
                        <span>Organizer: <strong>{m.owner}</strong></span>
                        <span>•</span>
                        <span>{m.participants.length} attendees</span>
                        {m.mom && (
                          <>
                            <span>•</span>
                            <span style={{ color: '#074A76', fontWeight: 700 }}>
                              {m.mom.decisionsMade.length} decisions • {m.mom.actionItems.length} action items
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenMeetingDetail(m)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 6,
                        background: 'var(--bg-secondary, #F1F5F9)',
                        color: 'var(--ncgr-deep-blue, #074A76)',
                        border: '1px solid var(--border, #E4E7EC)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <FileText size={14} />
                      <span>View MOM & Actions →</span>
                    </button>
                  </div>
                );
              })
          )}
        </div>
      )}

      {/* ─── VIEW MODE 4: EMPLOYEE MEETING VIEW ────────────────────── */}
      {viewMode === 'employee' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Employee Selector Bar & Stats */}
          <div
            style={{
              padding: 16,
              borderRadius: 10,
              background: 'var(--card-bg, #FFFFFF)',
              border: '1px solid var(--border, #E4E7EC)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
              <div>
                <h3 style={{ margin: '0 0 2px', fontSize: '1.125rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
                  Individual Employee Meeting Timeline
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                  Trace meeting attendance, ownership, minutes, and assigned operational action items
                </span>
              </div>

              {/* Employee Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)' }}>Selected Employee:</span>
                <select
                  value={selectedEmployee === 'ALL' ? (allEmployeeNames[0] || 'Faisal Al-Harbi') : selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 6,
                    border: '1px solid var(--ncgr-deep-blue, #074A76)',
                    background: 'var(--card-bg, #FFFFFF)',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'var(--ncgr-deep-blue, #074A76)',
                  }}
                >
                  {allEmployeeNames.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Individual Employee Metrics Strip */}
            {(() => {
              const activeEmp = selectedEmployee === 'ALL' ? (allEmployeeNames[0] || 'Faisal Al-Harbi') : selectedEmployee;
              const empMeetings = meetings.filter(m => m.owner === activeEmp || m.participants.some(p => p.name === activeEmp));
              const empCompleted = empMeetings.filter(m => m.status === 'Completed').length;
              const empUpcoming = empMeetings.filter(m => m.status === 'Upcoming' || m.status === 'In Progress').length;
              const empHighPri = empMeetings.filter(m => m.priority === 'Critical' || m.priority === 'High Priority').length;
              const empActions = allActionItems.filter(item => item.action.owner === activeEmp).length;

              return (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: 10,
                    padding: 12,
                    borderRadius: 8,
                    background: 'var(--bg-secondary, #F8FAFC)',
                    border: '1px solid var(--border, #E4E7EC)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>Total Meetings</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)' }}>{empMeetings.length}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>Completed</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#22A06B' }}>{empCompleted}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>Upcoming</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#E97F0A' }}>{empUpcoming}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>High Priority</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#DE350B' }}>{empHighPri}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>Action Items Owned</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#671E75' }}>{empActions}</div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Chronological Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(() => {
              const activeEmp = selectedEmployee === 'ALL' ? (allEmployeeNames[0] || 'Faisal Al-Harbi') : selectedEmployee;
              const empMeetings = meetings.filter(m => m.owner === activeEmp || m.participants.some(p => p.name === activeEmp));

              return empMeetings.map((m) => {
                const participantObj = m.participants.find(p => p.name === activeEmp);
                const attendance = m.owner === activeEmp ? 'Organizer' : participantObj?.attendanceStatus || 'Expected';
                const cardStyle = getCardPriorityStyle(m.priority);

                return (
                  <div
                    key={m.id}
                    className="card"
                    style={{
                      padding: '16px 20px',
                      borderRadius: 10,
                      background: cardStyle.background,
                      border: cardStyle.border,
                      borderTop: cardStyle.borderTop,
                      boxShadow: cardStyle.boxShadow,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 16,
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.6875rem', fontWeight: 800, color: '#074A76', background: 'var(--bg-secondary, #F1F5F9)', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--border, #E4E7EC)' }}>
                          {m.id}
                        </span>
                        <span style={{ fontSize: '0.6875rem', fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: cardStyle.badgeBg, color: cardStyle.badgeColor }}>
                          {m.type}
                        </span>
                        {getPriorityBadge(m.priority)}
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: 6,
                            background:
                              attendance === 'Organizer'
                                ? 'rgba(7, 74, 118, 0.1)'
                                : attendance === 'Attended'
                                ? 'rgba(64, 144, 79, 0.1)'
                                : 'rgba(233, 127, 10, 0.1)',
                            color:
                              attendance === 'Organizer'
                                ? '#074A76'
                                : attendance === 'Attended'
                                ? '#22A06B'
                                : '#E97F0A',
                          }}
                        >
                          Role: {attendance}
                        </span>
                      </div>

                      <h3
                        onClick={() => handleOpenMeetingDetail(m)}
                        style={{
                          fontSize: '1rem',
                          fontWeight: 800,
                          color: cardStyle.titleColor,
                          margin: '0 0 4px',
                          cursor: 'pointer',
                        }}
                      >
                        {m.title}
                      </h3>

                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                        Date: <strong>{m.date} ({m.startTime} - {m.endTime})</strong> • Organizer: {m.owner} • Status: {m.status}
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenMeetingDetail(m)}
                      style={{
                        padding: '7px 14px',
                        borderRadius: 6,
                        background: 'var(--ncgr-deep-blue, #074A76)',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {m.mom ? 'View MOM →' : 'View Details →'}
                    </button>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

      {/* ─── VIEW MODE 5: MOM ACTION ITEMS TRACKER ─────────────────── */}
      {viewMode === 'actions' && (
        <div
          style={{
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid var(--border, #E4E7EC)',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border, #E4E7EC)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 2px', fontSize: '1rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
                Master MOM Action Items & Governance Deliverables
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                Direct traceability from Meeting ID → Minutes → Decisions → Action Items → Responsible Resource
              </span>
            </div>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 6,
                background: '#E6F4FC',
                color: '#074A76',
              }}
            >
              {openActionCount} Pending / {allActionItems.length} Total
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary, #F8FAFC)', borderBottom: '1px solid var(--border, #E4E7EC)', textAlign: 'left' }}>
                  <th style={{ padding: '10px 16px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 50 }}>Done</th>
                  <th style={{ padding: '10px 16px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 140 }}>Action ID</th>
                  <th style={{ padding: '10px 16px', fontWeight: 700, color: 'var(--text-secondary, #475467)' }}>Action Description</th>
                  <th style={{ padding: '10px 16px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 150 }}>Meeting Reference</th>
                  <th style={{ padding: '10px 16px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 140 }}>Owner</th>
                  <th style={{ padding: '10px 16px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 100 }}>Due Date</th>
                  <th style={{ padding: '10px 16px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 110 }}>Priority</th>
                  <th style={{ padding: '10px 16px', fontWeight: 700, color: 'var(--text-secondary, #475467)', width: 110 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {allActionItems.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary, #475467)' }}>
                      No action items matching filter criteria.
                    </td>
                  </tr>
                ) : (
                  allActionItems.map(({ action, meeting }) => {
                    const isDone = action.status === 'Completed';
                    return (
                      <tr
                        key={action.id}
                        style={{
                          borderBottom: '1px solid var(--border, #E4E7EC)',
                          background: isDone ? 'var(--bg-secondary, #FAFAFA)' : 'transparent',
                        }}
                      >
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                          <button
                            onClick={() => handleToggleActionStatus(meeting.id, action.id)}
                            style={{
                              border: 'none',
                              background: 'transparent',
                              cursor: 'pointer',
                              padding: 0,
                              color: isDone ? '#22A06B' : 'var(--text-tertiary, #98A2B3)',
                            }}
                          >
                            {isDone ? <CheckCircle2 size={18} /> : <CheckSquare size={18} />}
                          </button>
                        </td>
                        <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)' }}>
                          {action.id}
                        </td>
                        <td style={{ padding: '12px 16px', fontWeight: 600, color: isDone ? 'var(--text-secondary, #475467)' : 'var(--text, #101828)', textDecoration: isDone ? 'line-through' : 'none' }}>
                          {action.description}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <button
                            onClick={() => handleOpenMeetingDetail(meeting)}
                            style={{
                              padding: '2px 8px',
                              borderRadius: 4,
                              background: 'var(--bg-secondary, #F1F5F9)',
                              border: '1px solid var(--border, #E4E7EC)',
                              fontFamily: 'monospace',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: 'var(--ncgr-deep-blue, #074A76)',
                              cursor: 'pointer',
                            }}
                            title="Open Meeting MOM & Transcript"
                          >
                            {meeting.id}
                          </button>
                        </td>
                        <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text, #101828)' }}>
                          {action.owner}
                        </td>
                        <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #475467)' }}>
                          {action.dueDate}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          {getPriorityBadge(action.priority)}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span
                            style={{
                              fontSize: '0.6875rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: 6,
                              background: isDone ? '#E3FCEF' : action.status === 'In Progress' ? '#E6F4FC' : '#FFF7E6',
                              color: isDone ? '#22A06B' : action.status === 'In Progress' ? '#074A76' : '#E97F0A',
                            }}
                          >
                            {action.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Meeting Detail Slide-Over Drawer */}
      <MeetingDetailDrawer
        meeting={selectedMeeting}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onToggleActionStatus={handleToggleActionStatus}
      />

      {/* Schedule Meeting Modal */}
      <ScheduleMeetingModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSaveMeeting={handleSaveNewMeeting}
      />
    </div>
  );
};

export default MeetingCalendarPage;
