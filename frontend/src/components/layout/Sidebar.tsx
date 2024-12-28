import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { menuItems } from '../../Data/menuItems';
import MenuLink from './MenuLink';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMenuItem = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const isActiveLink = (path?: string) => {
    return path ? location.pathname.startsWith(path) : false;
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-2 left-4 z-50 p-2 rounded-lg bg-gray-700 lg:hidden"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Menu className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed border-t border-x-gray-300 top-14 left-0 bg-gray-800 w-64 h-screen flex-shrink-0 flex flex-col shadow-lg transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-4 space-y-2">
            {menuItems.map((item) => (
              <div key={item.id} className="space-y-1">
                <MenuLink
                  item={item}
                  isActive={isActiveLink(item.path)}
                  hasSubMenu={Boolean(item.subMenus?.length)}
                  isExpanded={expandedItem === item.id}
                  onClick={() => toggleMenuItem(item.id)}
                />

                {item.subMenus && expandedItem === item.id && (
                  <div className="pl-12 space-y-1">
                    {item.subMenus.map((subItem) => (
                      <a
                        key={subItem.id}
                        href={subItem.path}
                        className={`block px-4 py-2 text-sm ${
                          isActiveLink(subItem.path)
                            ? 'text-white'
                            : 'text-gray-400 hover:text-white'
                        } transition-colors`}
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
