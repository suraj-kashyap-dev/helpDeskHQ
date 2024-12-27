import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="pt-8">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
