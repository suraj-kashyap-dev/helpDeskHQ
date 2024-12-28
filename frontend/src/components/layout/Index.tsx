import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <Sidebar />
      <main className="pt-16 lg:pl-64">
        <div className="bg-slate-100 px-6 mt-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
