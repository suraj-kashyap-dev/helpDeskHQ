import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useMenuState } from '../../hooks/useMenuState';
// import { mainMenus } from '../../Data/menuData';

const Layout: React.FC = () => {
  // const { isSidebarOpen, setIsSidebarOpen, activeMenu, setActiveMenu } =
  useMenuState();

  return (
    <div className="min-h-screen bg-slate-100">
      <Header
      // isSidebarOpen={isSidebarOpen}
      // setIsSidebarOpen={setIsSidebarOpen}
      // activeMenu={activeMenu}
      // setActiveMenu={setActiveMenu}
      // mainMenus={mainMenus}
      />

      <Sidebar
      // isSidebarOpen={isSidebarOpen}
      // setIsSidebarOpen={setIsSidebarOpen}
      // activeMenu={activeMenu}
      // mainMenus={mainMenus}
      />

      {/* Main content */}
      <main className="pt-16 lg:pl-64">
        <div className="bg-slate-100 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
