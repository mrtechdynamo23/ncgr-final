import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Users, Clock, ClipboardCheck, ArrowRightLeft,
  MessageSquare, CalendarDays, UserCheck, Phone
} from 'lucide-react';

const tiles = [
  { key: 'resourceRoster', icon: <Users size={22} />, color: '#074A76', path: '/operations/resource-roster', count: '1,347 staff' },
  { key: 'shiftRoster', icon: <Clock size={22} />, color: '#4AA6DC', path: '/operations/shift-roster', count: '4 shifts' },
  { key: 'activityChecklist', icon: <ClipboardCheck size={22} />, color: '#40904F', path: '/operations/activity-checklist', count: '28 items today' },
  { key: 'handoverLogs', icon: <ArrowRightLeft size={22} />, color: '#671E75', path: '/operations/handover-logs', count: '3 handovers' },
  { key: 'operationsMOM', icon: <MessageSquare size={22} />, color: '#CE813C', path: '/operations/mom', count: '5 open actions' },
  { key: 'leaveManagement', icon: <CalendarDays size={22} />, color: '#1FBBB0', path: '/operations/leave', count: '12 upcoming' },
  { key: 'attendance', icon: <UserCheck size={22} />, color: '#074A76', path: '/operations/attendance', count: '96.8% today' },
  { key: 'contactDirectory', icon: <Phone size={22} />, color: '#4AA6DC', path: '/operations/contacts', count: '342 contacts' },
];

const OperationalServices: React.FC = () => {
  const { t } = useTranslation(['common', 'operations']);
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">{t('nav.operationalServices')}</h1>
            <p className="page-subtitle">
              Operational hub — select a module to manage
            </p>
          </div>
          <span className="simulated-badge">{t('app.demoData')}</span>
        </div>
      </div>

      <div className="tile-grid">
        {tiles.map((tile) => (
          <div
            key={tile.key}
            className="tile"
            onClick={() => navigate(tile.path)}
            role="button"
            tabIndex={0}
          >
            <div className="tile-icon" style={{ background: tile.color }}>
              {tile.icon}
            </div>
            <div className="tile-title">{t(`nav.${tile.key}`)}</div>
            <div className="tile-count">{tile.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperationalServices;
