import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useMenuState = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  return {
    isSidebarOpen,
    setIsSidebarOpen,
    activeMenu,
    setActiveMenu,
  };
};
