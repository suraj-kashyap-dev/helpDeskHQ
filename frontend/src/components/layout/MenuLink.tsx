import React from 'react';
import { MenuItem } from '../../types/menu.types';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface MenuLinkProps {
  item: MenuItem;
  isActive: boolean;
  hasSubMenu: boolean;
  isExpanded: boolean;
  onClick: () => void;
}

const MenuLink: React.FC<MenuLinkProps> = ({
  item,
  isActive,
  hasSubMenu,
  isExpanded,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full px-4 py-2.5 text-sm 
        ${
          isActive
            ? 'text-white bg-gray-700'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }
        rounded-lg transition-all duration-200`}
    >
      <div className="flex items-center">
        {item.icon}
        <span>{item.label}</span>
      </div>
      {hasSubMenu && (
        <div className="ml-auto pl-3">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>
      )}
    </button>
  );
};

export default MenuLink;
