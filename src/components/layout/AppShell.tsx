import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import NotificationDrawer from './NotificationDrawer';
import ChatAssistant from '../chat-assistant/ChatAssistant';
import CommandPalette from '../command-palette/CommandPalette';

const AppShell: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const openMobileSidebar = useCallback(() => {
    setMobileOpen(true);
  }, []);

  const closeMobileSidebar = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const openCommandPalette = useCallback(() => {
    setCommandPaletteOpen(true);
  }, []);

  const closeCommandPalette = useCallback(() => {
    setCommandPaletteOpen(false);
  }, []);

  const openNotifications = useCallback(() => {
    setNotificationsOpen(true);
  }, []);

  const closeNotifications = useCallback(() => {
    setNotificationsOpen(false);
  }, []);

  return (
    <div className="app-layout">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        mobileOpen={mobileOpen}
        onMobileClose={closeMobileSidebar}
      />
      <div className="app-main">
        <TopHeader
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={toggleSidebar}
          onOpenMobileSidebar={openMobileSidebar}
          onOpenCommandPalette={openCommandPalette}
          onOpenNotifications={openNotifications}
        />
        <main className="app-content" role="main">
          <Outlet />
        </main>
      </div>

      {/* Global Intelligence Floating Widgets & Drawers */}
      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={closeNotifications}
      />
      <ChatAssistant />
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={closeCommandPalette}
      />
    </div>
  );
};

export default AppShell;
