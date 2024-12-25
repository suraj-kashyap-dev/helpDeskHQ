import React from 'react';
import { Home, Building2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Item from './Item';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { t } = useTranslation();

  const navItems = [
    {
      icon: <Home className="h-5 w-5" />,
      label: t('dashboard'),
      path: '/dashboard',
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      label: t('Organizations'),
      path: '/dashboard/organizations',
    },
  ];

  return (
    <aside
      className={`
        fixed top-16 bottom-0 left-0 z-40
        w-64 bg-gray-50 border-r border-gray-200 shadow-lg
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}
    >
      <nav className="flex flex-col mt-4">
        <div className="space-y-1 px-3">
          {navItems.map((item, index) => (
            <Item
              key={index}
              icon={item.icon}
              label={item.label}
              path={item.path}
            />
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
