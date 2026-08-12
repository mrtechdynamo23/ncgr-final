import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginPage from '../../pages/LoginPage';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import ChatAssistant from '../chat-assistant/ChatAssistant';
import CommandPalette from '../command-palette/CommandPalette';

const AppShell: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [, setNotificationsOpen] = useState(false);

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

  // ALL HOOKS ARE CALLED FIRST BEFORE ANY CONDITIONAL RETURN
  if (!isAuthenticated) {
    return <LoginPage />;
  }

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

      {/* Global Intelligence Floating Widgets */}
      <ChatAssistant />
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={closeCommandPalette}
      />
    </div>
  );
};

export default AppShell;
