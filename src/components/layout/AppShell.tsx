import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import NotificationDrawer from './NotificationDrawer';
import CustomerCornerDrawer from '../common/CustomerCornerDrawer';
import ChatAssistant from '../chat-assistant/ChatAssistant';
import CommandPalette from '../command-palette/CommandPalette';

const AppShell: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [customerCornerOpen, setCustomerCornerOpen] = useState(false);

  const location = useLocation();
  const contentRef = useRef<HTMLElement>(null);

  // Automatically scroll to the top of the page on route change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname, location.search]);

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

  const openCustomerCorner = useCallback(() => {
    setCustomerCornerOpen(true);
  }, []);

  const closeCustomerCorner = useCallback(() => {
    setCustomerCornerOpen(false);
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
          onOpenCustomerCorner={openCustomerCorner}
        />
        <main className="app-content" ref={contentRef} role="main">
          <div key={location.pathname} className="app-page-fluid-wrapper">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Intelligence Floating Widgets & Drawers */}
      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={closeNotifications}
      />
      <CustomerCornerDrawer
        isOpen={customerCornerOpen}
        onClose={closeCustomerCorner}
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
