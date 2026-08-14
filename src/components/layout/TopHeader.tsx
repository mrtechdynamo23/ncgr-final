import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../providers/ThemeProvider';
import { useLanguageDirection } from '../../hooks/useLanguageDirection';
import { useAuth } from '../../context/AuthContext';
import { useDataStore } from '../../data/mockDataStore';
import {
  Search, Bell, Sun, Moon, Languages, Menu,
  PanelLeftClose, PanelLeftOpen, LogOut
} from 'lucide-react';

interface TopHeaderProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onOpenMobileSidebar: () => void;
  onOpenCommandPalette: () => void;
  onOpenNotifications: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({
  sidebarCollapsed,
  onToggleSidebar,
  onOpenMobileSidebar,
  onOpenCommandPalette,
  onOpenNotifications,
}) => {
  const { t } = useTranslation('common');
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguageDirection();
  const { logout } = useAuth();
  const { unreadNotificationCount } = useDataStore();

  return (
    <header className="app-header" role="banner">
      {/* Mobile menu button */}
      <button
        className="header-action-btn"
        onClick={onOpenMobileSidebar}
        aria-label="Open menu"
        style={{ display: 'none' }}
        id="mobile-menu-btn"
      >
        <Menu size={20} />
      </button>

      {/* Desktop sidebar toggle */}
      <button
        className="header-action-btn"
        onClick={onToggleSidebar}
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
      </button>

      {/* Search Bar */}
      <div className="header-search">
        <Search size={16} className="header-search-icon" />
        <input
          type="text"
          placeholder={t('common.searchPlaceholder')}
          onClick={onOpenCommandPalette}
          readOnly
          aria-label={t('common.search')}
          id="global-search-input"
        />
        <span className="header-search-shortcut">⌘K</span>
      </div>

      {/* Right Actions */}
      <div className="header-actions">
        {/* Environment Badge */}
        <span className="header-env-badge">{t('app.env')}</span>

        <div className="header-divider" />

        {/* Language Toggle */}
        <button
          className="header-action-btn"
          onClick={toggleLanguage}
          aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
          title={language === 'en' ? 'العربية' : 'English'}
        >
          <Languages size={18} />
        </button>

        {/* Theme Toggle */}
        <button
          className="header-action-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Notifications */}
        <button
          className="header-action-btn"
          onClick={onOpenNotifications}
          aria-label="Notifications"
          id="notifications-btn"
          style={{ position: 'relative' }}
        >
          <Bell size={18} />
          {unreadNotificationCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                minWidth: 16,
                height: 16,
                padding: '0 4px',
                borderRadius: 8,
                background: '#DE350B',
                color: '#FFFFFF',
                fontSize: '0.625rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
                border: '2px solid var(--header-bg, #FFFFFF)',
              }}
            >
              {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
            </span>
          )}
        </button>

        {/* Lock / Logout Button */}
        <button
          className="header-action-btn"
          onClick={logout}
          aria-label="Lock / Sign Out"
          title="Sign Out / Lock Session"
          style={{ color: '#DE350B' }}
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default TopHeader;
