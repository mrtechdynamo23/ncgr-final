import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '../../data/mockDataStore';
import {
  X, Bell, AlertTriangle, ShieldAlert, CalendarClock,
  KeyRound, Users, Cpu, Check, CheckCheck, Trash2, ExternalLink
} from 'lucide-react';
import type { NotificationType } from '../../data/notifications';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'critical_incident':
      return <AlertTriangle size={18} className="text-red-500" style={{ color: '#DE350B' }} />;
    case 'risk_escalation':
      return <ShieldAlert size={18} className="text-amber-500" style={{ color: '#E97F0A' }} />;
    case 'pending_approval':
      return <CalendarClock size={18} className="text-blue-500" style={{ color: '#4AA6DC' }} />;
    case 'license_expiry':
      return <KeyRound size={18} className="text-purple-500" style={{ color: '#671E75' }} />;
    case 'resource_gap':
      return <Users size={18} className="text-orange-500" style={{ color: '#CE813C' }} />;
    case 'technology_exception':
      return <Cpu size={18} className="text-red-500" style={{ color: '#DE350B' }} />;
    default:
      return <Bell size={18} style={{ color: '#074A76' }} />;
  }
};

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const {
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    markAllNotificationsRead,
    dismissNotification
  } = useDataStore();

  if (!isOpen) return null;

  const handleActionClick = (id: string, url?: string) => {
    markNotificationRead(id);
    if (url) {
      navigate(url);
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="drawer-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 22, 40, 0.45)',
          backdropFilter: 'blur(3px)',
          zIndex: 1000,
        }}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className="notification-drawer"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 440,
          maxWidth: '90vw',
          background: 'var(--surface-raised, #FFFFFF)',
          boxShadow: '-8px 0 30px rgba(0, 0, 0, 0.15)',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid var(--border, #E4E7EC)',
          animation: 'slideInRight 0.25s ease-out',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border, #E4E7EC)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--header-bg, #FFFFFF)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'rgba(7, 74, 118, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--ncgr-deep-blue, #074A76)',
              }}
            >
              <Bell size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text, #101828)' }}>
                Operational Alerts & Notifications
              </h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary, #475467)' }}>
                {unreadNotificationCount} unread actionable items
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-icon"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-tertiary, #98A2B3)',
              padding: 6,
              borderRadius: 6,
            }}
            title="Close drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Action Controls Bar */}
        <div
          style={{
            padding: '10px 24px',
            background: 'var(--bg-secondary, #F7F8FA)',
            borderBottom: '1px solid var(--border, #E4E7EC)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8125rem',
          }}
        >
          <span style={{ color: 'var(--text-secondary, #475467)', fontWeight: 600 }}>
            Active Feeds ({notifications.length})
          </span>
          {unreadNotificationCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--ncgr-deep-blue, #074A76)',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: '0.8125rem',
              }}
            >
              <CheckCheck size={16} /> Mark all read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {notifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-tertiary, #98A2B3)' }}>
              <Bell size={48} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
              <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>No Active Notifications</p>
              <p style={{ fontSize: '0.8125rem' }}>All operational alerts and exceptions have been addressed.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                style={{
                  padding: '14px 16px',
                  borderRadius: 10,
                  border: `1px solid ${notif.isRead ? 'var(--border, #E4E7EC)' : 'rgba(7, 74, 118, 0.25)'}`,
                  background: notif.isRead ? 'var(--card-bg, #FFFFFF)' : 'rgba(7, 74, 118, 0.03)',
                  boxShadow: notif.isRead ? 'none' : '0 2px 8px rgba(7, 74, 118, 0.06)',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Priority / Source Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {getNotificationIcon(notif.type)}
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '2px 6px',
                        borderRadius: 4,
                        background: notif.priority === 'critical' ? '#FFEBE6' : notif.priority === 'high' ? '#FFF7E6' : '#E6F4FC',
                        color: notif.priority === 'critical' ? '#DE350B' : notif.priority === 'high' ? '#E97F0A' : '#074A76',
                      }}
                    >
                      {notif.priority}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary, #98A2B3)' }}>
                      • {notif.source}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary, #98A2B3)' }}>
                    {notif.timestamp}
                  </span>
                </div>

                {/* Title & Message */}
                <h4
                  style={{
                    margin: '0 0 4px',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'var(--text, #101828)',
                  }}
                >
                  {notif.title}
                </h4>
                <p
                  style={{
                    margin: '0 0 12px',
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary, #475467)',
                    lineHeight: 1.4,
                  }}
                >
                  {notif.message}
                </p>

                {/* Card Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--border, #E4E7EC)' }}>
                  {notif.actionUrl ? (
                    <button
                      onClick={() => handleActionClick(notif.id, notif.actionUrl)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--ncgr-mint-green, #40904F)',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: 0,
                      }}
                    >
                      <span>Investigate Details</span>
                      <ExternalLink size={12} />
                    </button>
                  ) : <div />}

                  <div style={{ display: 'flex', gap: 6 }}>
                    {!notif.isRead && (
                      <button
                        onClick={() => markNotificationRead(notif.id)}
                        title="Mark as read"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-tertiary, #98A2B3)',
                          cursor: 'pointer',
                          padding: 4,
                        }}
                      >
                        <Check size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => dismissNotification(notif.id)}
                      title="Dismiss notification"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-tertiary, #98A2B3)',
                        cursor: 'pointer',
                        padding: 4,
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationDrawer;
