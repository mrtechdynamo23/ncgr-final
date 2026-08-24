import React, { useState } from 'react';
import {
  X, Calendar, Clock, MapPin, Video, CheckCircle2,
  FileText, CheckSquare, Hash, ArrowUpRight
} from 'lucide-react';
import type { MeetingRecord } from '../../data/master-meetings';

interface MeetingDetailDrawerProps {
  meeting: MeetingRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleActionStatus?: (meetingId: string, actionId: string) => void;
}

export const MeetingDetailDrawer: React.FC<MeetingDetailDrawerProps> = ({
  meeting,
  isOpen,
  onClose,
  onToggleActionStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'mom'>('overview');

  if (!isOpen || !meeting) return null;

  const priorityColor =
    meeting.priority === 'Critical'
      ? '#DE350B'
      : meeting.priority === 'High Priority'
      ? '#E97F0A'
      : meeting.priority === 'Important'
      ? '#074A76'
      : '#64748B';

  const priorityBg =
    meeting.priority === 'Critical'
      ? '#FFEBE6'
      : meeting.priority === 'High Priority'
      ? '#FFF7E6'
      : meeting.priority === 'Important'
      ? '#E6F4FC'
      : '#F4F5F7';

  const statusBg =
    meeting.status === 'Completed'
      ? '#E3FCEF'
      : meeting.status === 'In Progress'
      ? '#E6F4FC'
      : meeting.status === 'Cancelled'
      ? '#FFEBE6'
      : '#FFF7E6';

  const statusColor =
    meeting.status === 'Completed'
      ? '#22A06B'
      : meeting.status === 'In Progress'
      ? '#074A76'
      : meeting.status === 'Cancelled'
      ? '#DE350B'
      : '#E97F0A';

  const mom = meeting.mom;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 22, 40, 0.45)',
          backdropFilter: 'blur(3px)',
          zIndex: 1200,
        }}
        onClick={onClose}
      />

      {/* Slide-Over Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: 680,
          background: 'var(--surface-raised, #FFFFFF)',
          boxShadow: '-8px 0 24px rgba(0, 0, 0, 0.15)',
          zIndex: 1201,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideInRight 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Drawer Header */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
              {/* Meeting ID Badge */}
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
                {meeting.id}
              </span>

              {/* Type Badge */}
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: '#E6F0FA',
                  color: '#074A76',
                  textTransform: 'uppercase',
                }}
              >
                {meeting.type}
              </span>

              {/* Priority Badge */}
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: priorityBg,
                  color: priorityColor,
                }}
              >
                ● {meeting.priority}
              </span>

              {/* Status Badge */}
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: statusBg,
                  color: statusColor,
                }}
              >
                {meeting.status}
              </span>
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text, #101828)', margin: '0 0 4px', lineHeight: 1.3 }}>
              {meeting.title}
            </h2>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)' }}>
              Organized by <strong style={{ color: 'var(--text, #101828)' }}>{meeting.owner}</strong> • {meeting.tower}
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-secondary, #F1F5F9)',
              border: 'none',
              borderRadius: 8,
              padding: 6,
              cursor: 'pointer',
              color: 'var(--text-secondary, #475467)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border, #E4E7EC)',
            background: 'var(--card-bg, #FFFFFF)',
            padding: '0 24px',
          }}
        >
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: 'transparent',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: activeTab === 'overview' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--text-secondary, #475467)',
              borderBottom: activeTab === 'overview' ? '2px solid var(--ncgr-deep-blue, #074A76)' : '2px solid transparent',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Calendar size={16} />
            <span>Meeting Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('mom')}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: 'transparent',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: activeTab === 'mom' ? 'var(--ncgr-deep-blue, #074A76)' : 'var(--text-secondary, #475467)',
              borderBottom: activeTab === 'mom' ? '2px solid var(--ncgr-deep-blue, #074A76)' : '2px solid transparent',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <FileText size={16} />
            <span>MOM & Action Items</span>
            {mom && (
              <span
                style={{
                  fontSize: '0.625rem',
                  padding: '1px 6px',
                  borderRadius: 10,
                  background: '#E3FCEF',
                  color: '#22A06B',
                  fontWeight: 700,
                }}
              >
                MOM Ready
              </span>
            )}
          </button>
        </div>

        {/* Drawer Body Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {activeTab === 'overview' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Meta Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 12,
                  padding: 16,
                  borderRadius: 10,
                  background: 'var(--bg-secondary, #F8FAFC)',
                  border: '1px solid var(--border, #E4E7EC)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Calendar size={18} color="var(--ncgr-deep-blue, #074A76)" />
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>Date</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)' }}>{meeting.date}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Clock size={18} color="var(--ncgr-deep-blue, #074A76)" />
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>Time & Duration</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                      {meeting.startTime} - {meeting.endTime} ({meeting.durationMinutes} min)
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <MapPin size={18} color="var(--ncgr-deep-blue, #074A76)" />
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>Location</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)' }}>{meeting.location || 'Microsoft Teams'}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Hash size={18} color="var(--ncgr-deep-blue, #074A76)" />
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)', textTransform: 'uppercase', fontWeight: 600 }}>Recurrence</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text, #101828)' }}>{meeting.recurrence || 'One-time Meeting'}</div>
                  </div>
                </div>
              </div>

              {/* Join Link CTA */}
              {meeting.meetingLink && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 8,
                    background: 'rgba(7, 74, 118, 0.05)',
                    border: '1px solid rgba(7, 74, 118, 0.15)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Video size={18} color="#074A76" />
                    <div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#074A76' }}>Enterprise Video Bridge Available</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>Microsoft Teams Secure Meeting Room</div>
                    </div>
                  </div>
                  <a
                    href={meeting.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 14px',
                      borderRadius: 6,
                      background: 'var(--ncgr-deep-blue, #074A76)',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    <span>Join Call</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              )}

              {/* Agenda Section */}
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text, #101828)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Meeting Agenda & Scope
                </h4>
                <div
                  style={{
                    padding: 14,
                    borderRadius: 8,
                    background: 'var(--card-bg, #FFFFFF)',
                    border: '1px solid var(--border, #E4E7EC)',
                    fontSize: '0.8125rem',
                    lineHeight: 1.6,
                    color: 'var(--text, #101828)',
                  }}
                >
                  {meeting.agenda}
                </div>
              </div>

              {/* Participants Section */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text, #101828)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Participants & Attendance ({meeting.participants.length})
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>Verified enterprise resources</span>
                </div>

                <div
                  style={{
                    borderRadius: 8,
                    border: '1px solid var(--border, #E4E7EC)',
                    background: 'var(--card-bg, #FFFFFF)',
                    overflow: 'hidden',
                  }}
                >
                  {meeting.participants.map((p, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderBottom: idx < meeting.participants.length - 1 ? '1px solid var(--border, #E4E7EC)' : 'none',
                        background: idx % 2 === 0 ? 'transparent' : 'var(--bg-secondary, #F9FAFB)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: 'var(--ncgr-deep-blue, #074A76)',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                          }}
                        >
                          {p.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #101828)' }}>{p.name}</div>
                          <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #475467)' }}>
                            {p.role || 'Enterprise Team Member'} {p.tower ? `• ${p.tower}` : ''}
                          </div>
                        </div>
                      </div>

                      {/* Attendance Badge */}
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 6,
                          background:
                            p.attendanceStatus === 'Organizer'
                              ? 'rgba(7, 74, 118, 0.1)'
                              : p.attendanceStatus === 'Attended'
                              ? 'rgba(64, 144, 79, 0.1)'
                              : p.attendanceStatus === 'Expected'
                              ? 'rgba(233, 127, 10, 0.1)'
                              : 'rgba(222, 53, 11, 0.1)',
                          color:
                            p.attendanceStatus === 'Organizer'
                              ? '#074A76'
                              : p.attendanceStatus === 'Attended'
                              ? '#22A06B'
                              : p.attendanceStatus === 'Expected'
                              ? '#E97F0A'
                              : '#DE350B',
                        }}
                      >
                        {p.attendanceStatus}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* View MOM CTA Box */}
              {mom ? (
                <div
                  style={{
                    padding: 16,
                    borderRadius: 10,
                    background: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#166534' }}>
                      Minutes of Meeting (MOM) Available
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#15803D' }}>
                      Includes {mom.decisionsMade.length} decisions and {mom.actionItems.length} trackable action items.
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('mom')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 6,
                      background: '#166534',
                      color: '#FFFFFF',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                    }}
                  >
                    View Minutes (MOM) →
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    padding: 14,
                    borderRadius: 8,
                    background: 'var(--bg-secondary, #F8FAFC)',
                    border: '1px dashed var(--border, #E4E7EC)',
                    textAlign: 'center',
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary, #475467)',
                  }}
                >
                  This meeting is upcoming or in-flight. MOM will be generated and signed-off upon conclusion.
                </div>
              )}
            </div>
          ) : (
            /* MOM & Action Items Tab */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {mom ? (
                <>
                  {/* MOM Header Summary Card */}
                  <div
                    style={{
                      padding: 16,
                      borderRadius: 10,
                      background: 'var(--card-bg, #FFFFFF)',
                      border: '1px solid var(--border, #E4E7EC)',
                      borderLeft: '4px solid var(--ncgr-deep-blue, #074A76)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)', textTransform: 'uppercase' }}>
                        Executive Meeting Summary
                      </span>
                      <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)' }}>
                        Signed off by: {mom.signOffBy}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text, #101828)' }}>
                      {mom.summary}
                    </p>
                  </div>

                  {/* Key Discussion Points */}
                  <div>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text, #101828)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Key Discussion Points
                    </h4>
                    <div
                      style={{
                        padding: '12px 16px',
                        borderRadius: 8,
                        background: 'var(--bg-secondary, #F8FAFC)',
                        border: '1px solid var(--border, #E4E7EC)',
                      }}
                    >
                      <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.8125rem', lineHeight: 1.7, color: 'var(--text, #101828)' }}>
                        {mom.keyDiscussionPoints.map((pt, i) => (
                          <li key={i} style={{ marginBottom: 4 }}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Decisions Made */}
                  <div>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#074A76', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Formal Decisions Made ({mom.decisionsMade.length})
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {mom.decisionsMade.map((decision, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 10,
                            padding: '10px 14px',
                            borderRadius: 8,
                            background: '#F0F9FF',
                            border: '1px solid #BAE6FD',
                            fontSize: '0.8125rem',
                            color: '#0369A1',
                            fontWeight: 600,
                          }}
                        >
                          <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                          <span>{decision}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Items List */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text, #101828)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Trackable Action Items ({mom.actionItems.length})
                      </h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>
                        Traceable to Meeting ID: {meeting.id}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {mom.actionItems.map((act) => {
                        const isDone = act.status === 'Completed';
                        return (
                          <div
                            key={act.id}
                            style={{
                              padding: '12px 14px',
                              borderRadius: 8,
                              background: isDone ? '#F9FAFB' : 'var(--card-bg, #FFFFFF)',
                              border: `1px solid ${isDone ? '#E4E7EC' : 'var(--border, #E4E7EC)'}`,
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 8,
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                <button
                                  onClick={() => onToggleActionStatus?.(meeting.id, act.id)}
                                  style={{
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    padding: 0,
                                    marginTop: 2,
                                    color: isDone ? '#22A06B' : 'var(--text-tertiary, #98A2B3)',
                                  }}
                                  title="Toggle action completion status"
                                >
                                  {isDone ? <CheckCircle2 size={18} /> : <CheckSquare size={18} />}
                                </button>
                                <div>
                                  <div
                                    style={{
                                      fontSize: '0.8125rem',
                                      fontWeight: 700,
                                      color: isDone ? 'var(--text-secondary, #475467)' : 'var(--text, #101828)',
                                      textDecoration: isDone ? 'line-through' : 'none',
                                    }}
                                  >
                                    {act.description}
                                  </div>
                                  <div style={{ fontSize: '0.71875rem', color: 'var(--text-tertiary, #98A2B3)', marginTop: 2 }}>
                                    Owner: <strong style={{ color: 'var(--text-secondary, #475467)' }}>{act.owner}</strong> • Due: {act.dueDate}
                                  </div>
                                </div>
                              </div>

                              <span
                                style={{
                                  fontSize: '0.6875rem',
                                  fontWeight: 700,
                                  padding: '2px 8px',
                                  borderRadius: 6,
                                  background: isDone ? '#E3FCEF' : act.status === 'In Progress' ? '#E6F4FC' : '#FFF7E6',
                                  color: isDone ? '#22A06B' : act.status === 'In Progress' ? '#074A76' : '#E97F0A',
                                  flexShrink: 0,
                                }}
                              >
                                {act.status}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Discussion Transcription Highlights */}
                  {mom.transcriptionHighlights && mom.transcriptionHighlights.length > 0 && (
                    <div>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text, #101828)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Discussion Highlights & Transcripts
                      </h4>
                      <div
                        style={{
                          borderRadius: 8,
                          border: '1px solid var(--border, #E4E7EC)',
                          background: 'var(--bg-secondary, #F8FAFC)',
                          padding: 12,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 10,
                        }}
                      >
                        {mom.transcriptionHighlights.map((t, idx) => (
                          <div key={idx} style={{ fontSize: '0.75rem', lineHeight: 1.5 }}>
                            <span style={{ fontWeight: 700, color: 'var(--ncgr-deep-blue, #074A76)' }}>
                              [{t.timestamp}] {t.speaker}:
                            </span>{' '}
                            <span style={{ color: 'var(--text, #101828)' }}>{t.note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div
                  style={{
                    padding: 32,
                    textAlign: 'center',
                    borderRadius: 10,
                    background: 'var(--bg-secondary, #F8FAFC)',
                    border: '1px dashed var(--border, #E4E7EC)',
                  }}
                >
                  <FileText size={32} color="var(--text-tertiary, #98A2B3)" style={{ margin: '0 auto 12px' }} />
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 6px', color: 'var(--text, #101828)' }}>
                    MOM Not Yet Generated
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary, #475467)', maxWidth: 360, margin: '0 auto' }}>
                    This meeting is scheduled for <strong>{meeting.date}</strong>. Once completed, meeting minutes, recorded transcript, and action items will be archived here.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MeetingDetailDrawer;
