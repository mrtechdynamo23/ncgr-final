import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import type { MeetingRecord, MeetingType, MeetingPriority, MeetingParticipant } from '../../data/master-meetings';
import { masterEmployees } from '../../data/master-employees';

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveMeeting: (newMeeting: MeetingRecord) => void;
}

const MEETING_TYPES: MeetingType[] = [
  'WSR',
  'MSR',
  'DSR',
  'Daily Scrum',
  'Scrum Call',
  'Governance Meeting',
  'Customer Meeting',
  'Operational Review',
  'Internal Review',
  'Other',
];

const TOWERS = [
  'Cross-Tower Governance',
  'Applications',
  'Infrastructure',
  'Network',
  'Security',
  'Database',
  'Cloud',
  'Digital Workplace',
  'Service Desk Mgmt',
  'Program Management',
];

export const ScheduleMeetingModal: React.FC<ScheduleMeetingModalProps> = ({
  isOpen,
  onClose,
  onSaveMeeting,
}) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<MeetingType>('WSR');
  const [date, setDate] = useState(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  });
  const [startTime, setStartTime] = useState('10:00 AM');
  const [endTime, setEndTime] = useState('11:00 AM');
  const [durationMinutes] = useState(60);
  const [location] = useState('Microsoft Teams & Executive Boardroom');
  const [owner, setOwner] = useState('Faisal Al-Harbi');
  const [tower, setTower] = useState('Cross-Tower Governance');
  const [priority, setPriority] = useState<MeetingPriority>('High Priority');
  const [recurrence, setRecurrence] = useState<'None' | 'Daily' | 'Weekly' | 'Bi-Weekly' | 'Monthly'>('Weekly');
  const [agenda, setAgenda] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([
    'Faisal Al-Harbi',
    'Sara Al-Otaibi',
    'Ahmed Al-Qahtani',
    'Mohammed Al-Dosari',
  ]);

  if (!isOpen) return null;

  // Auto-generate Meeting ID
  const prefix = type.replace(/\s+/g, '').toUpperCase().slice(0, 4);
  const autoMeetingId = `${prefix}-${date.slice(0, 4)}-${date.slice(5, 7)}${date.slice(8, 10)}-${Math.floor(100 + Math.random() * 900)}`;

  const employeeNames = Array.from(new Set(masterEmployees.map(e => e.name))).slice(0, 40);

  const toggleParticipant = (name: string) => {
    if (selectedParticipants.includes(name)) {
      setSelectedParticipants(prev => prev.filter(n => n !== name));
    } else {
      setSelectedParticipants(prev => [...prev, name]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const participantsList: MeetingParticipant[] = selectedParticipants.map(name => {
      const emp = masterEmployees.find(e => e.name === name);
      return {
        name,
        role: emp?.position || 'Team Member',
        tower: emp?.tower || tower,
        attendanceStatus: name === owner ? 'Organizer' : 'Expected',
      };
    });

    // If owner is not in participants list, prepend
    if (!participantsList.some(p => p.name === owner)) {
      const ownerEmp = masterEmployees.find(e => e.name === owner);
      participantsList.unshift({
        name: owner,
        role: ownerEmp?.position || 'Operations Lead',
        tower: ownerEmp?.tower || tower,
        attendanceStatus: 'Organizer',
      });
    }

    const newMeeting: MeetingRecord = {
      id: autoMeetingId,
      title: title.trim(),
      type,
      date,
      startTime,
      endTime,
      durationMinutes,
      owner,
      tower,
      priority,
      status: 'Upcoming',
      recurrence,
      location,
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/ncgr-bridge-' + autoMeetingId.toLowerCase(),
      agenda: agenda.trim() || `Operational review and governance discussion for ${title.trim()}.`,
      participants: participantsList,
    };

    onSaveMeeting(newMeeting);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10, 22, 40, 0.55)',
        backdropFilter: 'blur(4px)',
        zIndex: 1300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 640,
          maxHeight: '90vh',
          background: 'var(--surface-raised, #FFFFFF)',
          borderRadius: 12,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--border, #E4E7EC)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--card-bg, #FFFFFF)',
          }}
        >
          <div>
            <h3 style={{ margin: '0 0 2px', fontSize: '1.125rem', fontWeight: 800, color: 'var(--text, #101828)' }}>
              Schedule Governance Meeting / Call
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
              Auto-generates Meeting ID with MOM traceability link
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-secondary, #475467)',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Title */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginBottom: 6 }}>
                Meeting Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. WSR Week 34 Operational Assurance & SLA Review"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--border, #E4E7EC)',
                  fontSize: '0.875rem',
                  background: 'var(--card-bg, #FFFFFF)',
                  color: 'var(--text, #101828)',
                }}
              />
            </div>

            {/* Type & Tower */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginBottom: 6 }}>
                  Meeting Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as MeetingType)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 6,
                    border: '1px solid var(--border, #E4E7EC)',
                    fontSize: '0.8125rem',
                    background: 'var(--card-bg, #FFFFFF)',
                    color: 'var(--text, #101828)',
                  }}
                >
                  {MEETING_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginBottom: 6 }}>
                  Governing Tower
                </label>
                <select
                  value={tower}
                  onChange={(e) => setTower(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 6,
                    border: '1px solid var(--border, #E4E7EC)',
                    fontSize: '0.8125rem',
                    background: 'var(--card-bg, #FFFFFF)',
                    color: 'var(--text, #101828)',
                  }}
                >
                  {TOWERS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Time */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginBottom: 6 }}>
                  Meeting Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 6,
                    border: '1px solid var(--border, #E4E7EC)',
                    fontSize: '0.8125rem',
                    background: 'var(--card-bg, #FFFFFF)',
                    color: 'var(--text, #101828)',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginBottom: 6 }}>
                  Start Time
                </label>
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="10:00 AM"
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 6,
                    border: '1px solid var(--border, #E4E7EC)',
                    fontSize: '0.8125rem',
                    background: 'var(--card-bg, #FFFFFF)',
                    color: 'var(--text, #101828)',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginBottom: 6 }}>
                  End Time
                </label>
                <input
                  type="text"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  placeholder="11:00 AM"
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 6,
                    border: '1px solid var(--border, #E4E7EC)',
                    fontSize: '0.8125rem',
                    background: 'var(--card-bg, #FFFFFF)',
                    color: 'var(--text, #101828)',
                  }}
                />
              </div>
            </div>

            {/* Owner & Priority & Recurrence */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginBottom: 6 }}>
                  Meeting Organizer / Owner
                </label>
                <select
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 6,
                    border: '1px solid var(--border, #E4E7EC)',
                    fontSize: '0.8125rem',
                    background: 'var(--card-bg, #FFFFFF)',
                    color: 'var(--text, #101828)',
                  }}
                >
                  <option value="Faisal Al-Harbi">Faisal Al-Harbi</option>
                  <option value="Sara Al-Otaibi">Sara Al-Otaibi</option>
                  <option value="Ahmed Al-Qahtani">Ahmed Al-Qahtani</option>
                  <option value="Mohammed Al-Dosari">Mohammed Al-Dosari</option>
                  <option value="Omar Al-Mutairi">Omar Al-Mutairi</option>
                  <option value="Aisha Rahman">Aisha Rahman</option>
                  <option value="Priya Nair">Priya Nair</option>
                  <option value="Daniel Mathew">Daniel Mathew</option>
                  <option value="Noura Al-Qahtani">Noura Al-Qahtani</option>
                  <option value="Arjun Menon">Arjun Menon</option>
                  <option value="Rakesh Kumar">Rakesh Kumar</option>
                  {employeeNames.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginBottom: 6 }}>
                  Priority Level
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as MeetingPriority)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 6,
                    border: '1px solid var(--border, #E4E7EC)',
                    fontSize: '0.8125rem',
                    background: 'var(--card-bg, #FFFFFF)',
                    color: 'var(--text, #101828)',
                  }}
                >
                  <option value="Normal">Normal</option>
                  <option value="Important">Important</option>
                  <option value="High Priority">High Priority</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginBottom: 6 }}>
                  Recurrence
                </label>
                <select
                  value={recurrence}
                  onChange={(e) => setRecurrence(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 6,
                    border: '1px solid var(--border, #E4E7EC)',
                    fontSize: '0.8125rem',
                    background: 'var(--card-bg, #FFFFFF)',
                    color: 'var(--text, #101828)',
                  }}
                >
                  <option value="None">None (One-time)</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-Weekly">Bi-Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
            </div>

            {/* Agenda */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)', marginBottom: 6 }}>
                Agenda & Discussion Topics
              </label>
              <textarea
                rows={3}
                value={agenda}
                onChange={(e) => setAgenda(e.target.value)}
                placeholder="Key objectives, deliverables review, open issues to resolve..."
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--border, #E4E7EC)',
                  fontSize: '0.8125rem',
                  background: 'var(--card-bg, #FFFFFF)',
                  color: 'var(--text, #101828)',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Participants Selector */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                  Invited Participants ({selectedParticipants.length} selected)
                </label>
                <span style={{ fontSize: '0.71875rem', color: 'var(--text-tertiary, #98A2B3)' }}>
                  Click chips to add/remove
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 6,
                  maxHeight: 120,
                  overflowY: 'auto',
                  padding: 8,
                  borderRadius: 6,
                  border: '1px solid var(--border, #E4E7EC)',
                  background: 'var(--bg-secondary, #F9FAFB)',
                }}
              >
                {['Faisal Al-Harbi', 'Sara Al-Otaibi', 'Ahmed Al-Qahtani', 'Mohammed Al-Dosari', 'Omar Al-Mutairi', 'Aisha Rahman', 'Priya Nair', 'Daniel Mathew', 'Noura Al-Qahtani', 'Arjun Menon', 'Rakesh Kumar', 'Layla Hassan', 'Tariq Al-Ghamdi', 'Fahad Al-Shehri', 'Mona Al-Zahrani'].map((name) => {
                  const isSelected = selectedParticipants.includes(name);
                  return (
                    <button
                      type="button"
                      key={name}
                      onClick={() => toggleParticipant(name)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: 14,
                        border: isSelected ? '1px solid var(--ncgr-deep-blue, #074A76)' : '1px solid var(--border, #E4E7EC)',
                        background: isSelected ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--card-bg, #FFFFFF)',
                        color: isSelected ? '#FFFFFF' : 'var(--text-secondary, #475467)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      {isSelected && <Check size={12} />}
                      <span>{name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generated Meeting ID Preview */}
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 6,
                background: 'var(--bg-secondary, #F1F5F9)',
                border: '1px solid var(--border, #E4E7EC)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                Assigned Meeting ID:
              </span>
              <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--ncgr-deep-blue, #074A76)', fontSize: '0.8125rem' }}>
                {autoMeetingId}
              </span>
            </div>
          </div>

          {/* Footer Actions */}
          <div
            style={{
              marginTop: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 10,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '9px 16px',
                borderRadius: 6,
                border: '1px solid var(--border, #E4E7EC)',
                background: 'var(--card-bg, #FFFFFF)',
                color: 'var(--text-secondary, #475467)',
                fontWeight: 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '9px 20px',
                borderRadius: 6,
                border: 'none',
                background: 'var(--ncgr-deep-blue, #074A76)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              Schedule Meeting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleMeetingModal;
